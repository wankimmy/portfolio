<template>
  <div ref="containerRef" class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  particleCount: { type: Number, default: 3000 },
  speed: { type: Number, default: 1.0 },
  theme: { type: String, default: 'ocean' },
  pauseOnHidden: { type: Boolean, default: true }
})

const containerRef = ref(null)
let scene = null
let camera = null
let renderer = null
let particles = null
let animationId = null
let isVisible = true

const colorPalettes = {
  ocean: [0xFFFFFF, 0x92BFE7, 0x016FB7, 0xF4EBDF, 0xB8DAF8, 0xF5C518, 0xF4EBDF],
  stars: [0xffffff, 0xfff8f0, 0xe8f0ff, 0xffeedd, 0xd0e0ff, 0xfff4e0, 0xffe0c0, 0xc0d8ff],
  gradient: [0x667eea, 0x3b82f6, 0x6366f1, 0x764ba2],
}

const getColors = () => colorPalettes[props.theme] || colorPalettes.ocean

const initScene = () => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  const width = containerRef.value.clientWidth || window.innerWidth
  const height = containerRef.value.clientHeight || window.innerHeight
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  if (props.theme === 'ocean') {
    createOceanSparkles()
  } else {
    createDefaultParticles()
  }

  if (props.pauseOnHidden) {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }
  animate()
}

const createOceanSparkles = () => {
  const count = props.particleCount
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const driftSpeeds = new Float32Array(count)
  const phases = new Float32Array(count)

  const colorArray = getColors()
  const color = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 300
    positions[i3 + 1] = (Math.random() - 0.5) * 200
    positions[i3 + 2] = (Math.random() - 0.5) * 200

    const mag = Math.pow(Math.random(), 2.0)
    sizes[i] = 0.4 + mag * 2.5
    driftSpeeds[i] = 0.2 + Math.random() * 0.8
    phases[i] = Math.random() * Math.PI * 2

    const ci = Math.floor(Math.random() * colorArray.length)
    color.setHex(colorArray[ci])
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('particleColor', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('driftSpeed', new THREE.BufferAttribute(driftSpeeds, 1))
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1))

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      precision highp float;
      attribute float size;
      attribute vec3 particleColor;
      attribute float driftSpeed;
      attribute float phase;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float time;
      uniform float pixelRatio;
      void main() {
        vColor = particleColor;
        float shimmer = sin(time * driftSpeed * 2.0 + phase) * 0.4 + 0.6;
        vAlpha = shimmer * 0.5;
        vec3 pos = position;
        pos.y += sin(time * driftSpeed * 0.5 + phase) * 3.0;
        pos.x += cos(time * driftSpeed * 0.3 + phase * 1.4) * 2.0;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = max(size * (350.0 / -mvPosition.z) * pixelRatio, 0.5);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float core = 1.0 - smoothstep(0.0, 0.25, d);
        float glow = (1.0 - smoothstep(0.0, 0.5, d)) * 0.3;
        float alpha = (core + glow) * vAlpha;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

const createDefaultParticles = () => {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(props.particleCount * 3)
  const colors = new Float32Array(props.particleCount * 3)
  const sizes = new Float32Array(props.particleCount)
  const colorArray = getColors()
  const color = new THREE.Color()

  for (let i = 0; i < props.particleCount; i++) {
    const i3 = i * 3
    const r = 50 + Math.random() * 50
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    positions[i3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = r * Math.cos(phi)
    sizes[i] = Math.random() * 2 + 0.5
    const ci = Math.floor(Math.random() * colorArray.length)
    color.setHex(colorArray[ci])
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('particleColor', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, pixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
    vertexShader: `
      precision mediump float;
      attribute float size;
      attribute vec3 particleColor;
      varying vec3 vColor;
      uniform float time;
      uniform float pixelRatio;
      void main() {
        vColor = particleColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z) * pixelRatio * (1.0 + sin(time * 0.5) * 0.1);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      precision mediump float;
      varying vec3 vColor;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * 0.8;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

const handleVisibilityChange = () => {
  isVisible = !document.hidden
  if (isVisible && !animationId) animate()
}

const animate = () => {
  if (!isVisible && props.pauseOnHidden) { animationId = null; return }
  animationId = requestAnimationFrame(animate)
  if (!scene || !camera || !renderer || !particles) return

  const time = performance.now() * 0.001 * props.speed
  if (particles.material.uniforms) {
    particles.material.uniforms.time.value = time
  }

  camera.position.x = Math.sin(time * 0.04) * 2
  camera.position.y = Math.cos(time * 0.03) * 1.5
  camera.lookAt(scene.position)

  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!containerRef.value || !camera || !renderer) return
  const w = containerRef.value.clientWidth || window.innerWidth
  const h = containerRef.value.clientHeight || window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

const cleanup = () => {
  if (animationId) { cancelAnimationFrame(animationId); animationId = null }
  if (props.pauseOnHidden) document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('resize', handleResize)
  if (particles) {
    if (particles.geometry) particles.geometry.dispose()
    if (particles.material) particles.material.dispose()
    if (scene) scene.remove(particles)
    particles = null
  }
  if (renderer) {
    if (containerRef.value && renderer.domElement) containerRef.value.removeChild(renderer.domElement)
    renderer.dispose()
    renderer = null
  }
  scene = null
  camera = null
}

onMounted(() => { initScene(); window.addEventListener('resize', handleResize) })
onUnmounted(cleanup)

watch(() => props.theme, () => {
  if (particles && particles.geometry) {
    const colors = particles.geometry.attributes.particleColor
    const colorArray = getColors()
    const color = new THREE.Color()
    for (let i = 0; i < props.particleCount; i++) {
      const i3 = i * 3
      color.setHex(colorArray[Math.floor(Math.random() * colorArray.length)])
      colors.array[i3] = color.r
      colors.array[i3 + 1] = color.g
      colors.array[i3 + 2] = color.b
    }
    colors.needsUpdate = true
  }
})
</script>

<style scoped>
div { z-index: 0; }
</style>
