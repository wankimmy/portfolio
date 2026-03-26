<template>
  <div class="matrix-bg" aria-hidden="true">
    <canvas ref="canvas" class="matrix-canvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId = null
let columns = []
const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>{}[]|/=&*#'
const fontSize = 14

function initMatrix() {
  const c = canvas.value
  if (!c) return

  const ctx = c.getContext('2d')
  c.width = window.innerWidth
  c.height = window.innerHeight

  const colCount = Math.floor(c.width / fontSize)
  columns = Array.from({ length: colCount }, () => Math.random() * c.height / fontSize)
}

function draw() {
  const c = canvas.value
  if (!c) return

  const ctx = c.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
  ctx.fillRect(0, 0, c.width, c.height)

  ctx.font = `${fontSize}px "JetBrains Mono", monospace`

  columns.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)]
    const x = i * fontSize
    const bright = Math.random() > 0.98
    ctx.fillStyle = bright ? '#00ff41' : 'rgba(0, 255, 65, 0.25)'
    ctx.fillText(char, x, y * fontSize)
    if (y * fontSize > c.height && Math.random() > 0.975) {
      columns[i] = 0
    } else {
      columns[i] = y + 0.5
    }
  })

  animationId = requestAnimationFrame(draw)
}

function onResize() {
  initMatrix()
}

onMounted(() => {
  initMatrix()
  draw()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.matrix-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.matrix-canvas {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
</style>
