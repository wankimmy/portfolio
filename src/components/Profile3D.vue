<template>
  <div ref="containerRef" class="relative w-full h-full min-h-[320px] rounded-3xl overflow-hidden bg-slate-900/50">
    <!-- Fallback if WebGL or texture load fails -->
    <img
      v-if="fallback"
      :src="fallbackSrc"
      :alt="alt"
      class="absolute inset-0 w-full h-full object-cover"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

/**
 * Profile3D - Displays profile image on a 3D plane (portrait style) using Three.js.
 * Use a professional/stylized profile image (e.g. 3D-rendered avatar) for best effect.
 */

const props = defineProps({
  src: { type: String, default: '/profile-3d.png' },
  fallbackSrc: { type: String, default: '/assets/profile.png' },
  alt: { type: String, default: 'Profile' },
})

const containerRef = ref(null)
let scene = null
let camera = null
let renderer = null
let mesh = null
let frameId = null
const fallback = ref(false)

const init = () => {
  if (!containerRef.value) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  if (width <= 0 || height <= 0) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  const loader = new THREE.TextureLoader()
  loader.load(
    props.src,
    (texture) => {
      if (!scene) return
      texture.colorSpace = THREE.SRGBColorSpace
      const aspect = texture.image ? texture.image.width / texture.image.height : 1
      const scale = 3.6
      const w = aspect > 1 ? scale : scale * aspect
      const h = aspect > 1 ? scale / aspect : scale
      const geometry = new THREE.PlaneGeometry(w, h)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
      mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.y = 0.1
      scene.add(mesh)
      // Subtle frame (quad behind)
      const frameGeo = new THREE.PlaneGeometry(w * 1.08, h * 1.08)
      const frameMat = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        side: THREE.DoubleSide,
      })
      const frame = new THREE.Mesh(frameGeo, frameMat)
      frame.position.z = -0.02
      scene.add(frame)
    },
    undefined,
    () => { if (containerRef.value) fallback.value = true }
  )

  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)
  const dir = new THREE.DirectionalLight(0xffffff, 0.8)
  dir.position.set(2, 2, 5)
  scene.add(dir)

  animate()
}

const animate = () => {
  frameId = requestAnimationFrame(animate)
  if (!scene || !camera || !renderer) return
  if (mesh) {
    mesh.rotation.y += 0.002
    mesh.rotation.x = Math.sin(performance.now() * 0.001) * 0.05
  }
  renderer.render(scene, camera)
}

const resize = () => {
  if (!containerRef.value || !camera || !renderer) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const cleanup = () => {
  if (frameId) cancelAnimationFrame(frameId)
  window.removeEventListener('resize', resize)
  if (mesh) {
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material && mesh.material.map) mesh.material.map.dispose()
    if (mesh.material) mesh.material.dispose()
  }
  scene?.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (obj.material.map) obj.material.map.dispose()
      obj.material.dispose()
    }
  })
  if (renderer && containerRef.value) {
    if (renderer.domElement) containerRef.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
  scene = null
  camera = null
  renderer = null
  mesh = null
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})

onUnmounted(cleanup)

watch(() => props.src, () => {
  if (fallback.value) fallback.value = false
  cleanup()
  init()
})
</script>

<style scoped>
</style>
