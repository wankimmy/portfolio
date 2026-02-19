<template>
  <div ref="containerRef" class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    <!-- Canvas will be mounted here -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

/**
 * Scene3D Component - Modern 3D Background
 * 
 * Features:
 * - Particle field with gradient colors matching purple/blue/indigo theme
 * - Smooth animations and camera movement
 * - Responsive resize handling
 * - Performance optimized with Page Visibility API
 * - Proper cleanup to prevent memory leaks
 */

const props = defineProps({
  // Particle count (lower for better performance)
  particleCount: {
    type: Number,
    default: 3000
  },
  // Animation speed multiplier
  speed: {
    type: Number,
    default: 1.0
  },
  // Color theme: 'purple', 'blue', 'indigo', 'gradient', or 'stars' (astronaut/space starfield)
  theme: {
    type: String,
    default: 'gradient'
  },
  // Whether to pause when tab is hidden
  pauseOnHidden: {
    type: Boolean,
    default: true
  }
})

const containerRef = ref(null)
let scene = null
let camera = null
let renderer = null
let particles = null
let animationId = null
let isVisible = true

// Color palettes matching the portfolio theme
const colorPalettes = {
  purple: [0x667eea, 0x764ba2, 0x9f7aea],
  blue: [0x3b82f6, 0x2563eb, 0x1d4ed8],
  indigo: [0x6366f1, 0x4f46e5, 0x4338ca],
  gradient: [0x667eea, 0x3b82f6, 0x6366f1, 0x764ba2],
  // Star colors: white, pale blue, pale yellow, soft white
  stars: [0xffffff, 0xe0e8ff, 0xfff4e0, 0xc8d4f0, 0xffffff]
}

const getColors = () => {
  return colorPalettes[props.theme] || colorPalettes.gradient
}

const initScene = () => {
  if (!containerRef.value) return

  // Scene setup
  scene = new THREE.Scene()

  // Camera setup
  const width = containerRef.value.clientWidth || window.innerWidth
  const height = containerRef.value.clientHeight || window.innerHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 100

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance
  renderer.setClearColor(0x000000, 0) // Transparent background
  containerRef.value.appendChild(renderer.domElement)

  // Create particle system
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(props.particleCount * 3)
  const colors = new Float32Array(props.particleCount * 3)
  const sizes = new Float32Array(props.particleCount)
  const isStars = props.theme === 'stars'
  const twinklePhases = isStars ? new Float32Array(props.particleCount) : null

  const colorArray = getColors()
  const color = new THREE.Color()

  for (let i = 0; i < props.particleCount; i++) {
    const i3 = i * 3

    if (isStars) {
      // Starfield: spread in a large sphere so stars surround the view
      const radius = 120 + Math.random() * 80
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      sizes[i] = Math.random() * 2.2 + 1.0
      twinklePhases[i] = Math.random() * Math.PI * 2
    } else {
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      sizes[i] = Math.random() * 2 + 0.5
    }

    const colorIndex = Math.floor(Math.random() * colorArray.length)
    color.setHex(colorArray[colorIndex])
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('particleColor', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  if (isStars) {
    geometry.setAttribute('twinklePhase', new THREE.BufferAttribute(twinklePhases, 1))
  }

  const material = isStars
    ? new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
        vertexShader: `
          precision mediump float;
          attribute float size;
          attribute vec3 particleColor;
          attribute float twinklePhase;
          varying vec3 vColor;
          varying float vTwinkle;
          uniform float time;
          uniform float pixelRatio;
          void main() {
            vColor = particleColor;
            vTwinkle = 0.15 + 0.85 * sin(time * 3.5 + twinklePhase);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float scale = size * (420.0 / -mvPosition.z) * pixelRatio;
            gl_PointSize = scale;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          precision mediump float;
          varying vec3 vColor;
          varying float vTwinkle;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * vTwinkle * 0.95;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false
      })
    : new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
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
            float scale = size * (300.0 / -mvPosition.z) * pixelRatio;
            gl_PointSize = scale * (1.0 + sin(time * 0.5) * 0.1);
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

  // Handle visibility changes
  if (props.pauseOnHidden) {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  // Start animation loop
  animate()
}

const handleVisibilityChange = () => {
  isVisible = !document.hidden
  if (isVisible && !animationId) {
    animate()
  }
}

const animate = () => {
  if (!isVisible && props.pauseOnHidden) {
    animationId = null
    return
  }

  animationId = requestAnimationFrame(animate)

  if (!scene || !camera || !renderer || !particles) return

  const time = performance.now() * 0.001 * props.speed

  // Update particle material time uniform
  if (particles.material.uniforms) {
    particles.material.uniforms.time.value = time
  }

  const isStars = props.theme === 'stars'
  if (!isStars) {
    particles.rotation.x = time * 0.1
    particles.rotation.y = time * 0.15
  }
  // Subtle camera movement (less for stars so starfield feels stable)
  camera.position.x = Math.sin(time * 0.2) * (isStars ? 2 : 5)
  camera.position.y = Math.cos(time * 0.15) * (isStars ? 2 : 5)
  camera.lookAt(scene.position)

  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!containerRef.value || !camera || !renderer) return

  const width = containerRef.value.clientWidth || window.innerWidth
  const height = containerRef.value.clientHeight || window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const cleanup = () => {
  // Cancel animation frame
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }

  // Remove visibility listener
  if (props.pauseOnHidden) {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }

  // Remove resize listener
  window.removeEventListener('resize', handleResize)

  // Dispose Three.js resources
  if (particles) {
    if (particles.geometry) particles.geometry.dispose()
    if (particles.material) {
      if (particles.material.uniforms) {
        // Clean up uniforms if needed
      }
      particles.material.dispose()
    }
    if (scene) scene.remove(particles)
    particles = null
  }

  if (renderer) {
    if (containerRef.value && renderer.domElement) {
      containerRef.value.removeChild(renderer.domElement)
    }
    renderer.dispose()
    renderer = null
  }

  scene = null
  camera = null
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cleanup()
})

// Watch for prop changes
watch(() => props.theme, () => {
  if (particles && particles.geometry) {
    const colors = particles.geometry.attributes.particleColor
    const colorArray = getColors()
    const color = new THREE.Color()

    for (let i = 0; i < props.particleCount; i++) {
      const i3 = i * 3
      const colorIndex = Math.floor(Math.random() * colorArray.length)
      color.setHex(colorArray[colorIndex])
      colors.array[i3] = color.r
      colors.array[i3 + 1] = color.g
      colors.array[i3 + 2] = color.b
    }
    colors.needsUpdate = true
  }
})
</script>

<style scoped>
div {
  z-index: 0;
}
</style>
