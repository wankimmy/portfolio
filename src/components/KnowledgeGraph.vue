<template>
  <section id="star-map" ref="sectionRef" class="section star-map">
    <div class="wrap star-map__header">
      <header class="section__head section__head--center">
        <p class="label">Star map</p>
        <h2 class="h2" data-split>Every skill, quest, and tool, mapped as constellations.</h2>
      </header>

      <div class="star-map__legend" data-reveal>
        <span
          v-for="d in domains"
          :key="d.key"
          class="star-map__legend-item"
          :style="{ '--domain-color': domainsByKey[d.key]?.color }"
        >
          <i aria-hidden="true"></i>
          {{ domainsByKey[d.key]?.label }}
        </span>
      </div>
    </div>

    <div class="star-map__stage">
      <div ref="graphRef" class="star-map__canvas">
        <canvas ref="canvasRef"></canvas>

        <div class="star-map__labels" aria-hidden="true">
          <span
            v-for="n in nodes"
            :key="n.id"
            :ref="(el) => setLabelRef(n.id, el)"
            class="star-map__label"
            :data-id="n.id"
          >{{ n.name }}</span>
        </div>

        <div
          v-if="hovered"
          ref="tooltipRef"
          class="star-map__tooltip"
          :style="{ left: tooltipPos.x + 'px', top: tooltipPos.y + 'px' }"
        >
          <p class="star-map__tooltip-name">{{ hovered.name }}</p>
          <p class="star-map__tooltip-meta">{{ domainsByKey[hovered.domain]?.label }} · Lv {{ hovered.level }}</p>
        </div>
      </div>

      <aside v-if="focused" ref="panelRef" class="star-map__panel">
        <button type="button" class="star-map__panel-close" aria-label="Close node panel" @click="clearFocus">
          &times;
        </button>
        <p class="star-map__panel-kicker">{{ domainsByKey[focused.domain]?.label }}</p>
        <h3 class="star-map__panel-title">{{ focused.name }}</h3>
        <dl class="star-map__panel-stats">
          <div>
            <dt>Mastery</dt>
            <dd>Lv {{ focused.level }}</dd>
          </div>
          <div>
            <dt>Years</dt>
            <dd>{{ focused.years }}+</dd>
          </div>
        </dl>
        <p class="star-map__panel-usage">
          <span>Used in:</span>
          {{ focused.usedIn.join(' · ') }}
        </p>
        <div class="star-map__panel-links">
          <p v-for="link in neighborNames" :key="link">- {{ link }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { createGraphForce } from '../lib/graphForce.js'
import { domains, edges, nodes } from '../lib/knowledgeData.js'

const domainsByKey = Object.fromEntries(domains.map((d) => [d.key, d]))

const sectionRef = ref(null)
const graphRef = ref(null)
const canvasRef = ref(null)
const tooltipRef = ref(null)
const panelRef = ref(null)

const hovered = ref(null)
const focused = ref(null)
const tooltipPos = ref({ x: 0, y: 0 })

const labelEls = {}
const setLabelRef = (id, el) => {
  if (el) labelEls[id] = el
  else delete labelEls[id]
}

let THREE = null
let renderer = null
let scene = null
let camera = null
let nodeMeshes = []
let edgeLine = null
let edgePosAttr = null
let edgeColAttr = null
let raycaster = null
let pointer = null
let graphGroup = null
let rafId = 0
let disposed = false
let reduceMotion = false
let autoRotate = true
let focusedMesh = null
let cameraTween = null
let clock = null
let force = null
let dragState = null
let orbitState = null
let neighborSet = new Set()
let maxDegree = 1
let domainRgb = {}
let pointerMoved = false
let graphReady = false
let resizeObserver = null
let intersectionObserver = null
let homeCam = { x: 0, y: 8, z: 22 }
let homeLookAt = { x: 0, y: 0, z: 0 }
let homeDist = 22
let zoomFactor = 1
const ZOOM_MIN = 0.45
const ZOOM_MAX = 2.4
const activePointers = new Map()
let pinchStartDist = 0
let pinchStartZoom = 1
let touchOrbitCandidate = null
const TOUCH_ORBIT_THRESHOLD = 10

const SCALE = 2.35

function isNarrowViewport() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(max-width: 640px)').matches) return true
  return (graphRef.value?.clientWidth ?? window.innerWidth) < 640
}

function clampZoom(value) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value))
}

function updateHomeDist() {
  const dx = homeCam.x - homeLookAt.x
  const dy = homeCam.y - homeLookAt.y
  const dz = homeCam.z - homeLookAt.z
  homeDist = Math.max(0.5, Math.sqrt(dx * dx + dy * dy + dz * dz))
}

/** Camera pose for current zoom around the fit home framing. */
function getZoomedHomeCam() {
  const dx = homeCam.x - homeLookAt.x
  const dy = homeCam.y - homeLookAt.y
  const dz = homeCam.z - homeLookAt.z
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1
  const dist = homeDist / zoomFactor
  return {
    x: homeLookAt.x + (dx / len) * dist,
    y: homeLookAt.y + (dy / len) * dist,
    z: homeLookAt.z + (dz / len) * dist,
  }
}

function applyZoom(immediate = true) {
  if (!camera) return
  const pose = getZoomedHomeCam()
  if (immediate) {
    if (cameraTween) {
      cameraTween.kill()
      cameraTween = null
    }
    camera.position.set(pose.x, pose.y, pose.z)
    camera.lookAt(homeLookAt.x, homeLookAt.y, homeLookAt.z)
  }
}

function setZoomFactor(next, { apply = true } = {}) {
  zoomFactor = clampZoom(next)
  if (apply && !focused.value) applyZoom(true)
}

const neighborNames = computed(() => {
  if (!focused.value) return []
  const others = edges
    .filter(([a, b]) => a === focused.value.id || b === focused.value.id)
    .map(([a, b]) => (a === focused.value.id ? b : a))
  return others
    .map((id) => nodes.find((n) => n.id === id)?.name)
    .filter(Boolean)
})

function neighborsOf(id) {
  const set = new Set()
  edges.forEach(([a, b]) => {
    if (a === id) set.add(b)
    if (b === id) set.add(a)
  })
  return set
}

function syncRendererSize() {
  if (!renderer || !camera || !graphRef.value) return
  const w = graphRef.value.clientWidth
  const h = graphRef.value.clientHeight
  if (w < 2 || h < 2) return
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h, false)
  if (nodeMeshes.length && !focused.value) {
    // Resize re-frames the full brain and resets zoom
    fitCameraToGraph(true, { resetZoom: true })
  }
}

/** Pull camera back so the constellation fills most of the frame. */
function fitCameraToGraph(applyImmediately = true, { resetZoom: doResetZoom = false } = {}) {
  if (!camera || !nodeMeshes.length || !THREE) return

  const box = new THREE.Box3()
  nodeMeshes.forEach((m) => box.expandByObject(m))
  if (box.isEmpty()) return

  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)

  const maxDim = Math.max(size.x, size.y, size.z, 1)
  const fovRad = (camera.fov * Math.PI) / 180
  const fitHeightDist = maxDim / (2 * Math.tan(fovRad / 2))
  const fitWidthDist = fitHeightDist / Math.max(camera.aspect, 0.01)
  // Tight framing so the brain fills the canvas by default (no scroll-zoom)
  const pad = isNarrowViewport() ? 1.08 : 0.98
  const dist = Math.max(fitHeightDist, fitWidthDist) * pad

  homeLookAt = { x: center.x, y: center.y, z: center.z }
  // Isometric view so the lobe ring reads as a brain, not a stick
  homeCam = {
    x: center.x + maxDim * 0.55,
    y: center.y + maxDim * 0.42,
    z: center.z + dist * 0.9,
  }
  updateHomeDist()
  if (doResetZoom) zoomFactor = 1

  if (applyImmediately) {
    const pose = getZoomedHomeCam()
    camera.position.set(pose.x, pose.y, pose.z)
    camera.near = 0.1
    camera.far = Math.max(200, homeDist * 4)
    camera.updateProjectionMatrix()
    camera.lookAt(homeLookAt.x, homeLookAt.y, homeLookAt.z)
  }
}

function initGraph(THREEModule) {
  if (graphReady || disposed) return
  THREE = THREEModule
  const canvas = canvasRef.value
  if (!canvas || !graphRef.value) return

  const w = graphRef.value.clientWidth
  const h = graphRef.value.clientHeight
  if (w < 2 || h < 2) return

  graphReady = true
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
  renderer.setSize(w, h, false)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 200)
  camera.position.set(homeCam.x, homeCam.y, homeCam.z)
  camera.lookAt(0, 0, 0)

  graphGroup = new THREE.Group()
  scene.add(graphGroup)

  scene.add(new THREE.AmbientLight(0xffffff, 0.85))
  const key = new THREE.DirectionalLight(0xe2e8f0, 0.6)
  key.position.set(3, 6, 4)
  scene.add(key)

  force = createGraphForce(nodes, edges, domains, { seed: 42 })
  maxDegree = Math.max(1, ...Object.values(force.degree))

  // Settle from lobe seeds — do not crush toward origin
  force.settle(reduceMotion ? 720 : 560)

  const sharedGeo = new THREE.SphereGeometry(1, 16, 14)
  // Slightly smaller nodes on phone so focus framing stays readable
  const radiusBoost = isNarrowViewport() ? 0.95 : 1
  force.nodes.forEach((sim) => {
    const data = force.byId[sim.id]
    const deg = force.degree[sim.id] ?? 1
    const radius = (0.22 + (deg / maxDegree) * 0.38) * radiusBoost
    const color = domainsByKey[data.domain]?.color ?? '#4a90e2'
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.95,
    })
    const mesh = new THREE.Mesh(sharedGeo, mat)
    mesh.scale.setScalar(radius)
    mesh.position.set(sim.x * SCALE, sim.y * SCALE, sim.z * SCALE)
    mesh.userData = {
      node: data,
      sim,
      baseRadius: radius,
      baseEmissive: 1,
      baseOpacity: 0.95,
    }
    nodeMeshes.push(mesh)
    graphGroup.add(mesh)
  })

  domainRgb = Object.fromEntries(
    domains.map((d) => {
      const c = new THREE.Color(d.color)
      return [d.key, [c.r, c.g, c.b]]
    }),
  )

  const linkCount = force.links.length
  const posArr = new Float32Array(linkCount * 2 * 3)
  const colArr = new Float32Array(linkCount * 2 * 3)
  edgePosAttr = new THREE.BufferAttribute(posArr, 3)
  edgeColAttr = new THREE.BufferAttribute(colArr, 3)
  const edgeGeo = new THREE.BufferGeometry()
  edgeGeo.setAttribute('position', edgePosAttr)
  edgeGeo.setAttribute('color', edgeColAttr)
  const edgeMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  })
  edgeLine = new THREE.LineSegments(edgeGeo, edgeMat)
  graphGroup.add(edgeLine)
  writeEdges(null)
  applyHoverDim(null)
  fitCameraToGraph(true, { resetZoom: true })

  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()

  clock = new THREE.Clock()
  const animate = () => {
    if (disposed) return
    rafId = requestAnimationFrame(animate)
    const dt = Math.min(clock.getDelta(), 0.05)

    if (!reduceMotion && force && (force.alpha > 0.001 || dragState)) {
      force.tick()
    }

    nodeMeshes.forEach((m) => {
      const s = m.userData.sim
      m.position.set(s.x * SCALE, s.y * SCALE, s.z * SCALE)
    })
    writeEdges(hovered.value?.id ?? focused.value?.id ?? null)

    if (!reduceMotion && autoRotate && !dragState && !orbitState) {
      graphGroup.rotation.y += dt * 0.06
    }

    projectLabels()
    renderer.render(scene, camera)
  }
  animate()

  bindPointer()

  resizeObserver = new ResizeObserver(() => {
    syncRendererSize()
  })
  resizeObserver.observe(graphRef.value)
}

function writeEdges(highlightId) {
  if (!edgePosAttr || !force || !domainRgb) return
  const pos = edgePosAttr.array
  const col = edgeColAttr.array

  force.links.forEach((link, i) => {
    const i6 = i * 6
    pos[i6] = link.a.x * SCALE
    pos[i6 + 1] = link.a.y * SCALE
    pos[i6 + 2] = link.a.z * SCALE
    pos[i6 + 3] = link.b.x * SCALE
    pos[i6 + 4] = link.b.y * SCALE
    pos[i6 + 5] = link.b.z * SCALE

    let bright = 0.6
    if (highlightId) {
      const connected =
        link.a.id === highlightId ||
        link.b.id === highlightId
      bright = connected ? 0.95 : 0.1
    }

    const ca = domainRgb[link.a.domain] ?? [0.29, 0.56, 0.89]
    const cb = domainRgb[link.b.domain] ?? [0.29, 0.56, 0.89]
    col[i6] = ca[0] * bright
    col[i6 + 1] = ca[1] * bright
    col[i6 + 2] = ca[2] * bright
    col[i6 + 3] = cb[0] * bright
    col[i6 + 4] = cb[1] * bright
    col[i6 + 5] = cb[2] * bright
  })

  edgePosAttr.needsUpdate = true
  edgeColAttr.needsUpdate = true
}

function applyHoverDim(hitId) {
  neighborSet = hitId ? neighborsOf(hitId) : new Set()
  nodeMeshes.forEach((m) => {
    const id = m.userData.node.id
    const isHit = id === hitId
    const isNeighbor = neighborSet.has(id)
    let opacity = 0.95
    let scale = m.userData.baseRadius
    if (hitId) {
      if (isHit) {
        opacity = 1
        scale = m.userData.baseRadius * 1.35
      } else if (isNeighbor) {
        opacity = 0.9
        scale = m.userData.baseRadius * 1.1
      } else {
        opacity = 0.12
      }
    }
    m.material.opacity = opacity
    m.scale.setScalar(scale)

    const label = labelEls[id]
    if (label) {
      const deg = force?.degree[id] ?? 0
      const showByDefault = deg >= 4 || (force?.byId[id]?.size ?? 0) >= 3
      let op = '0'
      if (!hitId) {
        op = showByDefault ? '0.75' : '0'
      } else if (isHit || isNeighbor) {
        op = '1'
      } else {
        op = '0.08'
      }
      label.dataset.opacity = op
      label.style.opacity = op
    }
  })
}

function projectLabels() {
  if (!camera || !graphRef.value || !graphGroup) return
  const rect = graphRef.value.getBoundingClientRect()
  const v = new THREE.Vector3()

  nodeMeshes.forEach((m) => {
    const id = m.userData.node.id
    const el = labelEls[id]
    if (!el) return
    v.copy(m.position)
    graphGroup.localToWorld(v)
    v.project(camera)
    const x = (v.x * 0.5 + 0.5) * rect.width
    const y = (-v.y * 0.5 + 0.5) * rect.height
    const behind = v.z > 1
    el.style.transform = `translate(-50%, -120%) translate(${x}px, ${y}px)`
    const target = Number(el.dataset.opacity ?? '0')
    el.style.opacity = behind ? '0' : String(target)
  })
}

function bindPointer() {
  const el = graphRef.value
  if (!el) return

  const pointerDistance = () => {
    const pts = [...activePointers.values()]
    if (pts.length < 2) return 0
    const a = pts[0]
    const b = pts[1]
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.hypot(dx, dy)
  }

  const onMove = (e) => {
    if (activePointers.has(e.pointerId)) {
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    }

    if (activePointers.size >= 2 && pinchStartDist > 0) {
      touchOrbitCandidate = null
      const dist = pointerDistance()
      if (dist > 0) {
        setZoomFactor(pinchStartZoom * (dist / pinchStartDist))
        pointerMoved = true
      }
      return
    }

    // Mobile: promote horizontal-dominant drag into orbit; vertical stays page scroll
    if (touchOrbitCandidate && e.pointerId === touchOrbitCandidate.pointerId && !orbitState) {
      const dx = e.clientX - touchOrbitCandidate.x
      const dy = e.clientY - touchOrbitCandidate.y
      if (Math.abs(dx) > TOUCH_ORBIT_THRESHOLD || Math.abs(dy) > TOUCH_ORBIT_THRESHOLD) {
        if (Math.abs(dx) > Math.abs(dy)) {
          orbitState = { x: e.clientX, y: e.clientY }
          autoRotate = false
          pointerMoved = true
          el.setPointerCapture?.(e.pointerId)
          touchOrbitCandidate = null
        } else {
          // Vertical wins — abandon orbit so the page can scroll
          touchOrbitCandidate = null
        }
      }
    }

    const rect = el.getBoundingClientRect()
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    tooltipPos.value = { x: e.clientX - rect.left + 14, y: e.clientY - rect.top - 8 }

    if (dragState) {
      const dx = e.clientX - dragState.x
      const dy = e.clientY - dragState.y
      if (Math.abs(dx) + Math.abs(dy) > 4) pointerMoved = true
      const world = pointerToPlane(e)
      if (world) {
        force.pin(dragState.id, world.x / SCALE, world.y / SCALE, world.z / SCALE)
      }
      return
    }

    if (orbitState) {
      const dx = e.clientX - orbitState.x
      const dy = e.clientY - orbitState.y
      if (Math.abs(dx) + Math.abs(dy) > 4) pointerMoved = true
      graphGroup.rotation.y += dx * 0.005
      graphGroup.rotation.x += dy * 0.004
      graphGroup.rotation.x = Math.max(-0.6, Math.min(0.6, graphGroup.rotation.x))
      orbitState.x = e.clientX
      orbitState.y = e.clientY
      return
    }

    if (e.pointerType === 'touch') return

    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(nodeMeshes)
    const hit = hits[0]?.object ?? null
    hovered.value = hit ? hit.userData.node : null
    applyHoverDim(hit?.userData.node.id ?? null)
    autoRotate = !hovered.value
  }

  const onDown = (e) => {
    if (!raycaster || !pointer || !camera) return
    pointerMoved = false
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (e.pointerType === 'touch') {
      if (activePointers.size === 2) {
        touchOrbitCandidate = null
        pinchStartDist = pointerDistance()
        pinchStartZoom = zoomFactor
        autoRotate = false
      } else if (activePointers.size === 1) {
        // Candidate only — vertical swipe scrolls the page until horizontal wins
        touchOrbitCandidate = { pointerId: e.pointerId, x: e.clientX, y: e.clientY }
      }
      return
    }

    const rect = el.getBoundingClientRect()
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(nodeMeshes)

    if (hits.length) {
      const mesh = hits[0].object
      dragState = { id: mesh.userData.node.id, mesh, x: e.clientX, y: e.clientY }
      autoRotate = false
      el.setPointerCapture?.(e.pointerId)
    } else {
      orbitState = { x: e.clientX, y: e.clientY }
      autoRotate = false
      el.setPointerCapture?.(e.pointerId)
    }
  }

  const onUp = (e) => {
    activePointers.delete(e.pointerId)
    if (activePointers.size < 2) {
      pinchStartDist = 0
    }
    if (touchOrbitCandidate?.pointerId === e.pointerId) {
      touchOrbitCandidate = null
    }
    if (dragState) {
      force.unpin(dragState.id)
      dragState = null
    }
    if (orbitState) {
      orbitState = null
    }
    el.releasePointerCapture?.(e.pointerId)
    autoRotate = !hovered.value && !focused.value
  }

  el.addEventListener('pointermove', onMove, { passive: true })
  el.addEventListener('pointerdown', onDown)
  el.addEventListener('pointerup', onUp)
  el.addEventListener('pointercancel', onUp)
  el._handlers = { onMove, onDown, onUp }
}

function pointerToPlane(e) {
  if (!camera || !graphRef.value || !dragState) return null
  const rect = graphRef.value.getBoundingClientRect()
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)

  // Plane facing camera through the dragged node
  const mesh = dragState.mesh
  const plane = new THREE.Plane()
  const camDir = new THREE.Vector3()
  camera.getWorldDirection(camDir)
  plane.setFromNormalAndCoplanarPoint(camDir.negate(), mesh.getWorldPosition(new THREE.Vector3()))
  const hit = new THREE.Vector3()
  if (raycaster.ray.intersectPlane(plane, hit)) {
    // Convert to graphGroup local
    graphGroup.worldToLocal(hit)
    return hit
  }
  return null
}

function initRenderer() {
  if (disposed || graphReady) return
  const tryInit = (mod) => {
    if (disposed || graphReady) return
    const el = graphRef.value
    if (!el || el.clientWidth < 2 || el.clientHeight < 2) {
      requestAnimationFrame(() => tryInit(mod))
      return
    }
    initGraph(mod)
  }

  if (!THREE) {
    import('three').then((mod) => tryInit(mod))
  } else {
    tryInit(THREE)
  }
}

const focusNode = (mesh) => {
  const n = mesh.userData.node
  focused.value = n
  focusedMesh = mesh
  applyHoverDim(n.id)

  const world = mesh.getWorldPosition(new THREE.Vector3())
  const dir = world.clone().normalize()
  // Stay farther so focus keeps neighbors in frame (not one giant sphere)
  const pull = isNarrowViewport() ? 11 : 9.5
  const lift = isNarrowViewport() ? 3.0 : 2.4
  const camTarget = world.clone().add(new THREE.Vector3(dir.x * pull, lift, dir.z * pull))
  if (cameraTween) cameraTween.kill()
  cameraTween = gsap.to(camera.position, {
    x: camTarget.x,
    y: camTarget.y,
    z: camTarget.z,
    duration: 0.9,
    ease: 'power3.inOut',
    onUpdate: () => camera.lookAt(world),
  })
}

const clearFocus = () => {
  focused.value = null
  focusedMesh = null
  applyHoverDim(hovered.value?.id ?? null)
  const pose = getZoomedHomeCam()
  if (cameraTween) cameraTween.kill()
  cameraTween = gsap.to(camera.position, {
    x: pose.x,
    y: pose.y,
    z: pose.z,
    duration: 0.8,
    ease: 'power3.inOut',
    onUpdate: () => camera.lookAt(homeLookAt.x, homeLookAt.y, homeLookAt.z),
  })
}

watch(hovered, (value) => {
  if (tooltipRef.value) {
    tooltipRef.value.style.opacity = value ? '1' : '0'
  }
})

watch(focused, async () => {
  if (!isNarrowViewport()) return
  await nextTick()
  ScrollTrigger.refresh()
})

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        initRenderer()
      }
    },
    { threshold: 0.15 },
  )
  if (sectionRef.value) {
    intersectionObserver.observe(sectionRef.value)
  }

  const onCanvasClick = (e) => {
    if (!raycaster || !pointer || !graphRef.value || !camera) return
    if (pointerMoved) {
      pointerMoved = false
      return
    }
    const rect = graphRef.value.getBoundingClientRect()
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(nodeMeshes)
    if (hits.length) {
      focusNode(hits[0].object)
    } else if (focused.value) {
      clearFocus()
    }
  }

  graphRef.value?.addEventListener('click', onCanvasClick)
  graphRef.value._clickHandler = onCanvasClick
})

onUnmounted(() => {
  disposed = true
  if (rafId) cancelAnimationFrame(rafId)

  intersectionObserver?.disconnect()
  intersectionObserver = null
  resizeObserver?.disconnect()
  resizeObserver = null

  const el = graphRef.value
  if (el?._handlers) {
    el.removeEventListener('pointermove', el._handlers.onMove)
    el.removeEventListener('pointerdown', el._handlers.onDown)
    el.removeEventListener('pointerup', el._handlers.onUp)
    el.removeEventListener('pointercancel', el._handlers.onUp)
  }
  el?.removeEventListener('click', el._clickHandler)
  activePointers.clear()

  nodeMeshes.forEach((m) => {
    m.material.dispose()
  })
  if (nodeMeshes[0]) {
    nodeMeshes[0].geometry.dispose()
  }
  nodeMeshes = []

  if (edgeLine) {
    edgeLine.geometry.dispose()
    edgeLine.material.dispose()
    edgeLine = null
  }

  if (renderer) {
    renderer.dispose()
    renderer = null
  }
  scene = null
  camera = null
  raycaster = null
  pointer = null
  graphGroup = null
  clock = null
  force = null
  graphReady = false
  cameraTween?.kill()
  cameraTween = null
})
</script>

<style>
.star-map {
  overflow: hidden;
}

.star-map__header {
  position: relative;
  z-index: 2;
}

.star-map__legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem 1.25rem;
  margin: 1.2rem auto 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.star-map__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.star-map__legend-item i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--domain-color);
  box-shadow: 0 0 10px var(--domain-color);
}

.star-map__stage {
  position: relative;
  margin-top: -2.2rem;
}

.star-map__canvas {
  position: relative;
  height: min(92vh, 980px);
  cursor: grab;
  touch-action: none;
}

.star-map__canvas:active {
  cursor: grabbing;
}

.star-map__canvas canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.star-map__labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
}

.star-map__label {
  position: absolute;
  top: 0;
  left: 0;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: var(--text-soft);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.85);
  will-change: transform;
}

.star-map__tooltip {
  position: absolute;
  z-index: 4;
  pointer-events: none;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  background: rgba(10, 14, 23, 0.88);
  backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.star-map__tooltip-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.98rem;
  color: var(--text-main);
}

.star-map__tooltip-meta {
  margin: 0.15rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.star-map__panel {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 5;
  width: min(320px, calc(100% - 2.4rem));
  padding: 1.15rem 1.2rem 1.2rem;
  border: 1px solid var(--line-strong);
  border-radius: 16px;
  background: rgba(10, 14, 23, 0.88);
  backdrop-filter: blur(14px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.55);
}

.star-map__panel-kicker {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent);
}

.star-map__panel-title {
  margin: 0.3rem 0 0.8rem;
  font-family: var(--font-display);
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  color: var(--text-main);
}

.star-map__panel-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
  margin: 0 0 0.8rem;
}

.star-map__panel-stats div {
  padding: 0.55rem 0.7rem;
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 10px;
  background: rgba(26, 36, 54, 0.5);
}

.star-map__panel-stats dt {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.star-map__panel-stats dd {
  margin: 0.18rem 0 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--text-main);
}

.star-map__panel-usage {
  margin: 0 0 0.75rem;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--text-soft);
}

.star-map__panel-usage span {
  color: var(--accent);
  font-weight: 600;
}

.star-map__panel-links p {
  margin: 0.2rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}

.star-map__panel-close {
  position: absolute;
  top: 0.55rem;
  right: 0.7rem;
  font-size: 1.4rem;
  color: var(--text-muted);
  line-height: 1;
  transition: color 0.2s ease;
}

.star-map__panel-close:hover {
  color: var(--accent);
}

@media (max-width: 640px) {
  .star-map {
    padding-bottom: 1.5rem;
  }

  .star-map__header .section__title {
    font-size: clamp(1.35rem, 5.5vw, 1.85rem);
  }

  .star-map__legend {
    gap: 0.45rem 0.85rem;
    margin: 0.7rem auto 0.15rem;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
  }

  .star-map__stage {
    margin-top: -0.6rem;
  }

  .star-map__canvas {
    height: min(52vh, 420px);
    touch-action: pan-y;
  }

  .star-map__label {
    font-size: 0.65rem;
    letter-spacing: 0.05em;
  }

  .star-map__panel {
    position: static;
    top: auto;
    right: auto;
    width: auto;
    max-width: none;
    max-height: min(42vh, 320px);
    margin: 0.75rem 0.5rem 0;
    padding: 0.7rem 0.8rem 0.75rem;
    border-radius: 14px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  }

  .star-map__panel-kicker {
    font-size: 0.58rem;
    letter-spacing: 0.18em;
  }

  .star-map__panel-title {
    margin: 0.2rem 0 0.55rem;
    font-size: 1.05rem;
  }

  .star-map__panel-stats {
    gap: 0.35rem;
    margin: 0 0 0.55rem;
  }

  .star-map__panel-stats div {
    padding: 0.35rem 0.5rem;
  }

  .star-map__panel-stats dd {
    font-size: 0.95rem;
  }

  .star-map__panel-usage {
    margin: 0 0 0.5rem;
    font-size: 0.8rem;
  }

  .star-map__panel-links p {
    font-size: 0.78rem;
  }

  .star-map__panel-close {
    top: 0.4rem;
    right: 0.55rem;
    font-size: 1.35rem;
    min-width: 2rem;
    min-height: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .star-map__canvas {
    height: min(70vh, 720px);
  }

  @media (max-width: 640px) {
    .star-map__canvas {
      height: min(48vh, 380px);
    }
  }

  .star-map__label {
    transition: none;
  }
}
</style>
