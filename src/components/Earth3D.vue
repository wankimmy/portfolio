<template>
  <div
    ref="containerRef"
    class="earth-container"
    role="application"
    aria-label="Interactive 3D Earth — spins slowly; drag to rotate"
    tabindex="0"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

import * as THREE from 'three/webgpu'
import {
  bumpMap,
  cameraPosition,
  color,
  max,
  mix,
  normalWorld,
  output,
  positionWorld,
  step,
  texture,
  uniform,
  uv,
  vec3,
  vec4,
} from 'three/webgpu'

const emit = defineEmits(['ready', 'error'])

const containerRef = ref(null)

const TEXTURE_BASE = '/textures/planets/'

let scene
let camera
let renderer
let frameId
let resizeObserver
let rootGroup
/** Extra roll / dolly applied from scroll choreography (damped each frame) */
let cinematicGroup
let earthMesh
let atmosphereMesh
let stars
let spinGroup
let clock
let isDragging = false
let lastClientX = 0
let lastClientY = 0
let loadedTextures = []

const DRAG_ROTATE = 0.007
const MAX_TILT_X = 0.52
/** Radians per second — slow idle spin when not dragging */
const AUTO_SPIN_SPEED = 0.09

const BASE_CAMERA_Z = 5.05
/** 0–1 scroll-driven cinematic offset (target) */
let cinematicTarget = 0
let cinematicSmooth = 0

/** Port of three.js webgpu_tsl_earth (r170): TSL day/night, clouds, atmosphere — adapted for hero layout. */
const makeStarField = () => {
  const geometry = new THREE.BufferGeometry()
  const positions = []

  for (let index = 0; index < 420; index += 1) {
    const radius = 2.8 + Math.random() * 2.8
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
    color: 0xa8d4ff,
    size: 0.017,
    transparent: true,
    opacity: 0.45,
  })

  stars = new THREE.Points(geometry, material)
  scene.add(stars)
}

const buildEarth = (dayTexture, nightTexture, bumpRoughnessCloudsTexture, sunDirection) => {
  const atmosphereDayColor = uniform(color('#4db2ff'))
  const atmosphereTwilightColor = uniform(color('#bc490b'))
  const roughnessLow = uniform(0.25)
  const roughnessHigh = uniform(0.35)

  const viewDirection = positionWorld.sub(cameraPosition).normalize()
  const fresnel = viewDirection.dot(normalWorld).abs().oneMinus().toVar()

  const sunOrientation = normalWorld.dot(sunDirection).toVar()

  const atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, sunOrientation.smoothstep(-0.25, 0.75))

  const globeMaterial = new THREE.MeshStandardNodeMaterial()

  const cloudsStrength = texture(bumpRoughnessCloudsTexture, uv()).b.smoothstep(0.2, 1)

  globeMaterial.colorNode = mix(texture(dayTexture), vec3(1), cloudsStrength.mul(2))

  const roughness = max(texture(bumpRoughnessCloudsTexture, uv()).g, step(0.01, cloudsStrength))
  globeMaterial.roughnessNode = roughness.remap(0, 1, roughnessLow, roughnessHigh)

  const night = texture(nightTexture)
  const dayStrength = sunOrientation.smoothstep(-0.25, 0.5)

  const atmosphereDayStrength = sunOrientation.smoothstep(-0.5, 1)
  const atmosphereMix = atmosphereDayStrength.mul(fresnel.pow(2)).clamp(0, 1)

  let finalOutput = mix(night.rgb, output.rgb, dayStrength)
  finalOutput = mix(finalOutput, atmosphereColor, atmosphereMix)

  globeMaterial.outputNode = vec4(finalOutput, output.a)

  const bumpElevation = max(texture(bumpRoughnessCloudsTexture, uv()).r, cloudsStrength)
  globeMaterial.normalNode = bumpMap(bumpElevation)

  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
  earthMesh = new THREE.Mesh(sphereGeometry, globeMaterial)

  const atmosphereMaterial = new THREE.MeshBasicNodeMaterial({ side: THREE.BackSide, transparent: true })
  let alpha = fresnel.remap(0.73, 1, 1, 0).pow(3)
  alpha = alpha.mul(sunOrientation.smoothstep(-0.5, 1))
  atmosphereMaterial.outputNode = vec4(atmosphereColor, alpha)

  atmosphereMesh = new THREE.Mesh(sphereGeometry, atmosphereMaterial)
  atmosphereMesh.scale.setScalar(1.04)

  spinGroup = new THREE.Group()
  spinGroup.add(earthMesh)
  spinGroup.add(atmosphereMesh)

  cinematicGroup = new THREE.Group()
  cinematicGroup.add(spinGroup)

  rootGroup = new THREE.Group()
  rootGroup.add(cinematicGroup)
  scene.add(rootGroup)
}

const initScene = async () => {
  if (!containerRef.value) {
    return
  }

  const width = containerRef.value.clientWidth || 420
  const height = containerRef.value.clientHeight || 420

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
  camera.position.set(0, 0.1, BASE_CAMERA_Z)

  renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  await renderer.init()

  containerRef.value.appendChild(renderer.domElement)

  const sun = new THREE.DirectionalLight('#ffffff', 2.2)
  sun.position.set(2.4, 0.6, 3.2)
  scene.add(sun)

  scene.add(new THREE.AmbientLight(0x8cb4d4, 0.22))

  const sunDirection = sun.position.clone().normalize()

  const textureLoader = new THREE.TextureLoader()

  const loadTex = (url) =>
    new Promise((resolve, reject) => {
      textureLoader.load(
        url,
        (tex) => {
          loadedTextures.push(tex)
          resolve(tex)
        },
        undefined,
        reject,
      )
    })

  const dayTexture = await loadTex(`${TEXTURE_BASE}earth_day_4096.jpg`)
  dayTexture.colorSpace = THREE.SRGBColorSpace
  dayTexture.anisotropy = Math.min(8, renderer.getMaxAnisotropy?.() ?? 8)

  const nightTexture = await loadTex(`${TEXTURE_BASE}earth_night_4096.jpg`)
  nightTexture.colorSpace = THREE.SRGBColorSpace
  nightTexture.anisotropy = Math.min(8, renderer.getMaxAnisotropy?.() ?? 8)

  const bumpRoughnessCloudsTexture = await loadTex(`${TEXTURE_BASE}earth_bump_roughness_clouds_4096.jpg`)
  bumpRoughnessCloudsTexture.anisotropy = Math.min(8, renderer.getMaxAnisotropy?.() ?? 8)

  const sunDirUniform = uniform(sunDirection)

  buildEarth(dayTexture, nightTexture, bumpRoughnessCloudsTexture, sunDirUniform)

  makeStarField()

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

  if (stars) {
    stars.rotation.y += 0.00022
    stars.rotation.x += 0.00009
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

  loadedTextures.forEach((tex) => tex.dispose())
  loadedTextures = []

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

  stars = null
  rootGroup = null
  cinematicGroup = null
  spinGroup = null
  earthMesh = null
  atmosphereMesh = null
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
 * Drive hero earth from scroll (0 = default hero pose, 1 = full “arrival” push-in).
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

onMounted(async () => {
  try {
    await initScene()
  } catch (error) {
    console.error('Earth3D WebGPU init failed:', error)
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
.earth-container {
  position: relative;
  display: block;
  width: min(720px, 100%);
  aspect-ratio: 1;
  isolation: isolate;
  cursor: grab;
  touch-action: none;
}

.earth-container:active {
  cursor: grabbing;
}

.earth-container::before {
  content: '';
  position: absolute;
  inset: 16%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(70, 140, 190, 0.22) 0%,
    rgba(40, 100, 75, 0.12) 42%,
    transparent 70%
  );
  filter: blur(40px);
  z-index: 0;
}

.earth-container canvas {
  position: relative;
  z-index: 1;
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
