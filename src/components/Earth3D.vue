<template>
  <div ref="containerRef" class="earth-container cursor-grab active:cursor-grabbing">
    <!-- Canvas mounted here -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Earth3D - Centred, interactive Earth (inspired by threejs.org/examples webgpu_tsl_earth).
 * Drag to spin the earth; WebGL + OrbitControls. Bigger, brighter, mobile responsive.
 */

const containerRef = ref(null)
let scene = null
let camera = null
let renderer = null
let earth = null
let atmosphere = null
let controls = null
let frameId = null

const EARTH_TEXTURE =
  'https://cdn.apewebapps.com/threejs/160/examples/textures/planets/earth_atmos_2048.jpg'

// Start with Japan (~138° E) facing the camera (longitude to radians, negated for texture convention)
const JAPAN_INITIAL_ROTATION = -(138 * Math.PI) / 180

const init = () => {
  if (!containerRef.value) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  if (width <= 0 || height <= 0) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.z = 3.5

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  const loader = new THREE.TextureLoader()
  loader.load(
    EARTH_TEXTURE,
    (map) => {
      map.colorSpace = THREE.SRGBColorSpace
      const geometry = new THREE.SphereGeometry(1, 64, 64)
      const material = new THREE.MeshPhongMaterial({
        map,
        specularMap: null,
        shininess: 0,
        specular: new THREE.Color(0x000000),
        emissive: new THREE.Color(0x051525),
        color: new THREE.Color(0xffffff),
      })
      earth = new THREE.Mesh(geometry, material)
      earth.rotation.y = JAPAN_INITIAL_ROTATION
      scene.add(earth)
    },
    undefined,
    () => {
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: 0x87ceeb,
        emissive: 0x204060,
        specular: 0x000000,
        shininess: 0,
      })
      earth = new THREE.Mesh(geometry, material)
      earth.rotation.y = JAPAN_INITIAL_ROTATION
      scene.add(earth)
    }
  )

  const atmosphereGeometry = new THREE.SphereGeometry(1.018, 64, 64)
  const atmosphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xadd8e6,
    emissive: 0x307090,
    transparent: true,
    opacity: 0.26,
    side: THREE.BackSide,
    shininess: 0,
    specular: 0x000000,
  })
  atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
  atmosphere.rotation.y = JAPAN_INITIAL_ROTATION
  scene.add(atmosphere)

  const ambient = new THREE.AmbientLight(0xadd8e6, 0.85)
  scene.add(ambient)
  const dirLight = new THREE.DirectionalLight(0xd4edf7, 1.9)
  dirLight.position.set(5, 3, 5)
  scene.add(dirLight)
  const fillLight = new THREE.DirectionalLight(0xb8e4f0, 0.7)
  fillLight.position.set(-3, 2, 3)
  scene.add(fillLight)
  const rimLight = new THREE.DirectionalLight(0x87ceeb, 0.6)
  rimLight.position.set(-5, -2, -5)
  scene.add(rimLight)
  const topLight = new THREE.DirectionalLight(0xc8e6f5, 0.4)
  topLight.position.set(0, 5, 2)
  scene.add(topLight)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableZoom = false
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.8

  animate()
}

const animate = () => {
  frameId = requestAnimationFrame(animate)
  if (!scene || !camera || !renderer) return
  if (controls) controls.update()
  if (earth) earth.rotation.y += 0.0008
  if (atmosphere) atmosphere.rotation.y += 0.0008
  renderer.render(scene, camera)
}

const resize = () => {
  if (!containerRef.value || !camera || !renderer) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

const cleanup = () => {
  if (frameId) cancelAnimationFrame(frameId)
  window.removeEventListener('resize', resize)
  if (controls) {
    controls.dispose()
    controls = null
  }
  if (atmosphere) {
    if (atmosphere.geometry) atmosphere.geometry.dispose()
    if (atmosphere.material) atmosphere.material.dispose()
    atmosphere = null
  }
  if (earth) {
    if (earth.geometry) earth.geometry.dispose()
    if (earth.material) {
      if (earth.material.map) earth.material.map.dispose()
      earth.material.dispose()
    }
  }
  if (renderer && containerRef.value?.contains(renderer.domElement)) {
    containerRef.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
  scene = null
  camera = null
  renderer = null
  earth = null
  atmosphere = null
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})

onUnmounted(cleanup)
</script>

<style scoped>
.earth-container {
  position: relative;
  display: block;
  isolation: isolate;
  width: min(280px, 88vw);
  height: min(280px, 88vw);
  min-height: 200px;
}

.earth-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  position: relative;
}

@media (min-width: 481px) {
  .earth-container {
    width: min(420px, 92vw);
    height: min(420px, 92vw);
    min-height: 320px;
  }
}

@media (min-width: 769px) {
  .earth-container {
    width: min(480px, 42vw);
    height: min(480px, 42vw);
    min-height: 360px;
  }
}
</style>
