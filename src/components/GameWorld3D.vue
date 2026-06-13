<template>
  <div
    ref="containerRef"
    class="world-container"
    role="application"
    aria-label="Interactive low-poly 3D game world — spins slowly; drag to rotate"
    tabindex="0"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

import * as THREE from 'three'

const emit = defineEmits(['ready', 'error'])

const containerRef = ref(null)

let scene
let camera
let renderer
let frameId
let resizeObserver
let rootGroup
/** Extra roll / dolly applied from scroll choreography (damped each frame) */
let cinematicGroup
let spinGroup
let planetGroup
let cloudGroup
let ringGroup
let airship
let dust
let clock
let isDragging = false
let lastClientX = 0
let lastClientY = 0

const DRAG_ROTATE = 0.007
const MAX_TILT_X = 0.52
/** Radians per second — slow idle spin when not dragging */
const AUTO_SPIN_SPEED = 0.12

/** Pulled back so the 1.72-radius orbit ring and airship stay inside the frame */
const BASE_CAMERA_Z = 5.85
/** 0–1 scroll-driven cinematic offset (target) */
let cinematicTarget = 0
let cinematicSmooth = 0

const GOLD = 0xb98a36
const OCEAN = 0x2aa9c9
const SAND = new THREE.Color('#e7cb8c')
const LAND = new THREE.Color('#c2913f')
const HIGHLAND = new THREE.Color('#8f6a28')
const SNOW = new THREE.Color('#fbf7ec')

/** Deterministic layered trig noise — continents without a noise lib */
const terrainNoise = (x, y, z) => {
  let n = 0
  n += 0.55 * Math.sin(x * 2.1 + 1.3) * Math.cos(y * 2.4 - 0.7) * Math.sin(z * 1.9 + 2.2)
  n += 0.3 * Math.sin(x * 4.7 - 2.1) * Math.sin(y * 4.1 + 1.1) * Math.cos(z * 4.9 - 0.4)
  n += 0.15 * Math.sin(x * 9.3 + 0.5) * Math.cos(y * 8.7 + 3.1) * Math.sin(z * 9.1 + 1.7)
  return n
}

const colorForElevation = (e) => {
  if (e < 0.1) return SAND
  if (e < 0.24) return LAND
  if (e < 0.4) return HIGHLAND
  return SNOW
}

const makePlanet = () => {
  planetGroup = new THREE.Group()

  // Low-poly terrain: non-indexed so every facet keeps a hard edge + flat color
  const geometry = new THREE.IcosahedronGeometry(1, 5).toNonIndexed()
  const positions = geometry.getAttribute('position')
  const colors = new Float32Array(positions.count * 3)
  const vertex = new THREE.Vector3()

  // Displace vertices by elevation, then color each face by its average elevation
  const elevations = new Float32Array(positions.count)
  for (let i = 0; i < positions.count; i += 1) {
    vertex.fromBufferAttribute(positions, i).normalize()
    const e = terrainNoise(vertex.x, vertex.y, vertex.z)
    elevations[i] = e
    const r = 0.985 + Math.max(0, e) * 0.16
    positions.setXYZ(i, vertex.x * r, vertex.y * r, vertex.z * r)
  }

  const faceColor = new THREE.Color()
  for (let i = 0; i < positions.count; i += 3) {
    const e = (elevations[i] + elevations[i + 1] + elevations[i + 2]) / 3
    faceColor.copy(colorForElevation(e))
    for (let j = 0; j < 3; j += 1) {
      colors[(i + j) * 3] = faceColor.r
      colors[(i + j) * 3 + 1] = faceColor.g
      colors[(i + j) * 3 + 2] = faceColor.b
    }
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.computeVertexNormals()

  const terrainMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true,
    roughness: 0.85,
    metalness: 0.06,
  })
  planetGroup.add(new THREE.Mesh(geometry, terrainMaterial))

  // Ocean sphere — cyan, lightly glossy, sits at the coast line
  const oceanMaterial = new THREE.MeshStandardMaterial({
    color: OCEAN,
    roughness: 0.32,
    metalness: 0.08,
    transparent: true,
    opacity: 0.94,
  })
  planetGroup.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.004, 4), oceanMaterial))

  // Atmosphere halo
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.16, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0x8fdcef,
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  )
  planetGroup.add(atmosphere)

  return planetGroup
}

const makeClouds = () => {
  cloudGroup = new THREE.Group()

  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    transparent: true,
    opacity: 0.92,
    flatShading: true,
  })

  const puffGeometry = new THREE.IcosahedronGeometry(0.085, 0)

  for (let index = 0; index < 9; index += 1) {
    const cluster = new THREE.Group()
    const puffCount = 3 + (index % 3)

    for (let p = 0; p < puffCount; p += 1) {
      const puff = new THREE.Mesh(puffGeometry, cloudMaterial)
      puff.position.set((p - puffCount / 2) * 0.09, (p % 2) * 0.03, (p % 3) * 0.04)
      puff.scale.setScalar(0.7 + ((index + p) % 3) * 0.35)
      cluster.add(puff)
    }

    cluster.scale.y = 0.45

    // Deterministic spread across the sphere
    const theta = index * 2.399963 // golden angle
    const phi = Math.acos(1 - (2 * (index + 0.5)) / 9)
    cluster.position.setFromSphericalCoords(1.3, phi, theta)
    cluster.lookAt(0, 0, 0)
    cloudGroup.add(cluster)
  }

  return cloudGroup
}

const makeRing = () => {
  ringGroup = new THREE.Group()

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.72, 0.012, 8, 128),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 }),
  )
  ringGroup.add(ring)

  // Tiny gold "airship" beacon riding the ring — classic overworld map marker
  airship = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.07, 0),
    new THREE.MeshStandardMaterial({
      color: 0xd9af56,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x8a6420,
      emissiveIntensity: 0.6,
      flatShading: true,
    }),
  )
  airship.position.set(1.72, 0, 0)
  ringGroup.add(airship)

  ringGroup.rotation.x = 1.18
  ringGroup.rotation.y = -0.18

  return ringGroup
}

const makeDust = () => {
  const geometry = new THREE.BufferGeometry()
  const positions = []

  for (let index = 0; index < 280; index += 1) {
    const radius = 2.4 + Math.random() * 2.8
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    )
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: GOLD,
    size: 0.02,
    transparent: true,
    opacity: 0.5,
  })

  dust = new THREE.Points(geometry, material)
  scene.add(dust)
}

const initScene = () => {
  if (!containerRef.value) {
    return
  }

  const width = containerRef.value.clientWidth || 420
  const height = containerRef.value.clientHeight || 420

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
  camera.position.set(0, 0.1, BASE_CAMERA_Z)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12

  containerRef.value.appendChild(renderer.domElement)

  // Bright daylight: warm gold key + cyan fill, high ambient for the toy-world look
  const keyLight = new THREE.DirectionalLight(0xfff2d8, 2.4)
  keyLight.position.set(2.4, 1.6, 3.2)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x7fd8ee, 0.9)
  fillLight.position.set(-2.6, -0.6, -2.2)
  scene.add(fillLight)

  scene.add(new THREE.AmbientLight(0xeaf6fa, 0.85))

  spinGroup = new THREE.Group()
  spinGroup.add(makePlanet())
  spinGroup.add(makeClouds())

  cinematicGroup = new THREE.Group()
  cinematicGroup.add(spinGroup)
  cinematicGroup.add(makeRing())

  rootGroup = new THREE.Group()
  rootGroup.add(cinematicGroup)
  scene.add(rootGroup)

  makeDust()

  clock = new THREE.Clock()

  resizeObserver = new ResizeObserver(() => {
    resize()
  })
  resizeObserver.observe(containerRef.value)
}

const animate = () => {
  frameId = requestAnimationFrame(animate)

  if (!scene || !camera || !renderer || !rootGroup || !spinGroup || !clock) {
    return
  }

  const delta = clock.getDelta()
  const elapsed = clock.elapsedTime

  cinematicSmooth = THREE.MathUtils.damp(cinematicSmooth, cinematicTarget, 5.2, delta)

  if (cinematicGroup) {
    const k = cinematicSmooth
    cinematicGroup.rotation.y = k * -0.42
    cinematicGroup.rotation.x = k * 0.09
    cinematicGroup.position.z = k * -0.32
  }

  camera.position.z = BASE_CAMERA_Z - cinematicSmooth * 0.42

  if (!isDragging) {
    spinGroup.rotation.y += delta * AUTO_SPIN_SPEED
  }

  // Clouds drift slightly faster than the ground below them
  if (cloudGroup) {
    cloudGroup.rotation.y += delta * 0.04
  }

  if (ringGroup && airship) {
    ringGroup.rotation.z += delta * 0.3
    airship.rotation.y += delta * 1.4
    airship.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.12)
  }

  if (dust) {
    dust.rotation.y += 0.00028
    dust.rotation.x += 0.0001
  }

  renderer.render(scene, camera)
}

const resize = () => {
  if (!containerRef.value || !camera || !renderer) {
    return
  }

  const width = containerRef.value.clientWidth || 420
  const height = containerRef.value.clientHeight || 420

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const handlePointerDown = (event) => {
  if (event.button !== 0) {
    return
  }
  isDragging = true
  lastClientX = event.clientX
  lastClientY = event.clientY
  containerRef.value?.setPointerCapture(event.pointerId)
}

const handlePointerMove = (event) => {
  if (!containerRef.value || !spinGroup) {
    return
  }

  if (isDragging) {
    const dx = event.clientX - lastClientX
    const dy = event.clientY - lastClientY
    lastClientX = event.clientX
    lastClientY = event.clientY

    spinGroup.rotation.y += dx * DRAG_ROTATE
    spinGroup.rotation.x += dy * DRAG_ROTATE
    spinGroup.rotation.x = THREE.MathUtils.clamp(spinGroup.rotation.x, -MAX_TILT_X, MAX_TILT_X)
  }
}

const endDrag = (event) => {
  if (!isDragging) {
    return
  }
  isDragging = false
  try {
    containerRef.value?.releasePointerCapture(event.pointerId)
  } catch {
    /* already released */
  }
}

const handlePointerUp = (event) => {
  endDrag(event)
}

const handlePointerCancel = (event) => {
  endDrag(event)
}

const cleanup = () => {
  if (frameId) {
    cancelAnimationFrame(frameId)
  }

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (containerRef.value) {
    containerRef.value.removeEventListener('pointerdown', handlePointerDown)
    containerRef.value.removeEventListener('pointermove', handlePointerMove)
    containerRef.value.removeEventListener('pointerup', handlePointerUp)
    containerRef.value.removeEventListener('pointercancel', handlePointerCancel)
  }

  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose()
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }

  dust = null
  rootGroup = null
  cinematicGroup = null
  spinGroup = null
  planetGroup = null
  cloudGroup = null
  ringGroup = null
  airship = null
  clock = null
  isDragging = false

  if (renderer) {
    renderer.dispose()

    if (containerRef.value?.contains(renderer.domElement)) {
      containerRef.value.removeChild(renderer.domElement)
    }
  }

  scene = null
  camera = null
  renderer = null
}

/**
 * Drive hero world from scroll (0 = default hero pose, 1 = full “arrival” push-in).
 * @param {number} value
 */
const setCinematicProgress = (value) => {
  const v = Number(value)
  if (!Number.isFinite(v)) {
    return
  }
  cinematicTarget = Math.min(1, Math.max(0, v))
}

defineExpose({
  setCinematicProgress,
})

onMounted(() => {
  try {
    initScene()
  } catch (error) {
    console.error('GameWorld3D init failed:', error)
    emit('error', error)
    return
  }

  if (containerRef.value) {
    containerRef.value.addEventListener('pointerdown', handlePointerDown)
    containerRef.value.addEventListener('pointermove', handlePointerMove)
    containerRef.value.addEventListener('pointerup', handlePointerUp)
    containerRef.value.addEventListener('pointercancel', handlePointerCancel)
  }

  animate()

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      emit('ready')
    })
  })
})

onUnmounted(cleanup)
</script>

<style scoped>
.world-container {
  position: relative;
  display: block;
  width: 100%;
  max-width: none;
  aspect-ratio: 1;
  isolation: isolate;
  cursor: grab;
  touch-action: none;
}

.world-container:active {
  cursor: grabbing;
}

.world-container::before {
  content: '';
  position: absolute;
  inset: 16%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(42, 169, 201, 0.22) 0%,
    rgba(185, 138, 54, 0.12) 46%,
    transparent 70%
  );
  filter: blur(40px);
  z-index: 0;
}

.world-container canvas {
  position: relative;
  z-index: 1;
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
