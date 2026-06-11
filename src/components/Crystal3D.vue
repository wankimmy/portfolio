<template>
  <div
    ref="containerRef"
    class="crystal-container"
    role="application"
    aria-label="Interactive 3D crystal — rotates slowly; drag to turn"
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
let crystalMesh
let shardPivots = []
let dust
let clock
let isDragging = false
let lastClientX = 0
let lastClientY = 0

const DRAG_ROTATE = 0.007
const MAX_TILT_X = 0.52
/** Radians per second — slow idle spin when not dragging */
const AUTO_SPIN_SPEED = 0.22

const BASE_CAMERA_Z = 5.05
/** 0–1 scroll-driven cinematic offset (target) */
let cinematicTarget = 0
let cinematicSmooth = 0

const GOLD = 0xe8c97a
const GOLD_DEEP = 0x9a7430
const CRYSTAL_BLUE = 0x7fb4e6

const makeCrystal = () => {
  // Elongated faceted gem: octahedron stretched on Y, flat shading for hard facets.
  // detail must stay 0 — subdivision rounds the gem into a boulder.
  const geometry = new THREE.OctahedronGeometry(1, 0)
  const material = new THREE.MeshStandardMaterial({
    color: 0xcfa14e,
    metalness: 0.32,
    roughness: 0.28,
    emissive: 0x7a5418,
    emissiveIntensity: 0.4,
    flatShading: true,
    transparent: true,
    opacity: 0.97,
  })

  crystalMesh = new THREE.Mesh(geometry, material)
  crystalMesh.scale.set(0.66, 1.24, 0.66)

  // Faceted gold wire halo hugging the gem for an engraved, ornamental feel.
  // Child of the gem so it inherits the levitation bob and drag rotation.
  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, 12),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.4 }),
  )
  wire.scale.setScalar(1.004)
  crystalMesh.add(wire)

  // Inner light makes the gem read as "alive" (save-crystal glow)
  const coreLight = new THREE.PointLight(0xffd98a, 8, 7, 1.8)
  coreLight.position.set(0, 0, 0)

  spinGroup = new THREE.Group()
  spinGroup.add(crystalMesh)
  spinGroup.add(coreLight)

  // Orbiting shard fragments
  const shardGeometry = new THREE.OctahedronGeometry(0.13, 0)
  const shardMaterial = new THREE.MeshStandardMaterial({
    color: 0xb08c44,
    metalness: 0.55,
    roughness: 0.25,
    emissive: GOLD_DEEP,
    emissiveIntensity: 0.5,
    flatShading: true,
  })

  for (let index = 0; index < 6; index += 1) {
    const pivot = new THREE.Group()
    const shard = new THREE.Mesh(shardGeometry, shardMaterial)
    const radius = 1.7 + (index % 3) * 0.34
    shard.position.set(radius, (index % 2 === 0 ? 1 : -1) * (0.2 + index * 0.07), 0)
    shard.scale.setScalar(0.55 + (index % 3) * 0.3)
    shard.rotation.set(index * 0.9, index * 1.3, index * 0.5)
    pivot.rotation.y = (index / 6) * Math.PI * 2
    pivot.rotation.z = (index % 2 === 0 ? 1 : -1) * 0.16
    pivot.add(shard)
    shardPivots.push({ pivot, shard, speed: 0.28 + (index % 3) * 0.12 })
    spinGroup.add(pivot)
  }

  cinematicGroup = new THREE.Group()
  cinematicGroup.add(spinGroup)

  rootGroup = new THREE.Group()
  rootGroup.add(cinematicGroup)
  scene.add(rootGroup)
}

const makeDust = () => {
  const geometry = new THREE.BufferGeometry()
  const positions = []

  for (let index = 0; index < 320; index += 1) {
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
    opacity: 0.55,
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
  renderer.toneMappingExposure = 1.05

  containerRef.value.appendChild(renderer.domElement)

  // Warm key light (lantern gold) + cool crystal-blue rim from behind
  const keyLight = new THREE.DirectionalLight(0xffe2ad, 2.1)
  keyLight.position.set(2.4, 1.4, 3.2)
  scene.add(keyLight)

  const rimLight = new THREE.DirectionalLight(CRYSTAL_BLUE, 1.5)
  rimLight.position.set(-2.6, -0.8, -2.4)
  scene.add(rimLight)

  scene.add(new THREE.AmbientLight(0x4a3a24, 0.85))

  makeCrystal()
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
    cinematicGroup.position.z = k * -0.45
  }

  camera.position.z = BASE_CAMERA_Z - cinematicSmooth * 0.65

  if (!isDragging) {
    spinGroup.rotation.y += delta * AUTO_SPIN_SPEED
  }

  // Gentle levitation bob + breathing glow
  if (crystalMesh) {
    crystalMesh.position.y = Math.sin(elapsed * 0.9) * 0.12
    crystalMesh.material.emissiveIntensity = 0.4 + Math.sin(elapsed * 1.6) * 0.1
  }

  shardPivots.forEach(({ pivot, shard, speed }, index) => {
    pivot.rotation.y += delta * speed
    shard.rotation.x += delta * 0.6
    shard.rotation.y += delta * 0.4
    shard.position.y += Math.sin(elapsed * 1.1 + index) * 0.0012
  })

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
  crystalMesh = null
  shardPivots = []
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
 * Drive hero crystal from scroll (0 = default hero pose, 1 = full “arrival” push-in).
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
    console.error('Crystal3D init failed:', error)
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
.crystal-container {
  position: relative;
  display: block;
  width: min(720px, 100%);
  aspect-ratio: 1;
  isolation: isolate;
  cursor: grab;
  touch-action: none;
}

.crystal-container:active {
  cursor: grabbing;
}

.crystal-container::before {
  content: '';
  position: absolute;
  inset: 16%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(216, 175, 106, 0.24) 0%,
    rgba(127, 180, 230, 0.1) 46%,
    transparent 70%
  );
  filter: blur(40px);
  z-index: 0;
}

.crystal-container canvas {
  position: relative;
  z-index: 1;
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
