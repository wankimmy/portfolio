<template>
  <div v-if="!dismissed" class="launch-overlay" @click="skip">
    <canvas ref="canvas"></canvas>
    <div class="skip-hint">Click anywhere to skip</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['complete'])
const canvas = ref(null)
const dismissed = ref(false)
let animId = null

function skip() {
  dismissed.value = true
  if (animId) cancelAnimationFrame(animId)
  emit('complete')
}

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
})

onMounted(() => {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  const dpr = window.devicePixelRatio || 1

  function resize() {
    c.width = window.innerWidth * dpr
    c.height = window.innerHeight * dpr
    c.style.width = window.innerWidth + 'px'
    c.style.height = window.innerHeight + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  const W = () => window.innerWidth
  const H = () => window.innerHeight

  // --- Realistic rocket drawn with paths ---
  function drawRocket(x, y, scale, flameFrame, thrust) {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)

    // Shadow / glow from engines
    if (thrust > 0) {
      const glow = ctx.createRadialGradient(0, 25, 0, 0, 25, 60 * thrust)
      glow.addColorStop(0, `rgba(255, 200, 50, ${0.3 * thrust})`)
      glow.addColorStop(0.5, `rgba(255, 100, 20, ${0.1 * thrust})`)
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(-80, -20, 160, 120)
    }

    // Main body
    ctx.beginPath()
    ctx.moveTo(0, -48) // nose tip
    ctx.quadraticCurveTo(14, -30, 14, -15)
    ctx.lineTo(14, 22)
    ctx.lineTo(-14, 22)
    ctx.lineTo(-14, -15)
    ctx.quadraticCurveTo(-14, -30, 0, -48)
    ctx.closePath()
    const bodyGrad = ctx.createLinearGradient(-14, 0, 14, 0)
    bodyGrad.addColorStop(0, '#c8ccd0')
    bodyGrad.addColorStop(0.3, '#f0f2f4')
    bodyGrad.addColorStop(0.7, '#e8eaed')
    bodyGrad.addColorStop(1, '#a0a4a8')
    ctx.fillStyle = bodyGrad
    ctx.fill()
    ctx.strokeStyle = 'rgba(100, 110, 120, 0.4)'
    ctx.lineWidth = 0.5
    ctx.stroke()

    // Nose cone accent
    ctx.beginPath()
    ctx.moveTo(0, -48)
    ctx.quadraticCurveTo(8, -34, 8, -22)
    ctx.lineTo(-8, -22)
    ctx.quadraticCurveTo(-8, -34, 0, -48)
    ctx.closePath()
    const noseGrad = ctx.createLinearGradient(0, -48, 0, -22)
    noseGrad.addColorStop(0, '#ef4444')
    noseGrad.addColorStop(1, '#dc2626')
    ctx.fillStyle = noseGrad
    ctx.fill()

    // Window
    ctx.beginPath()
    ctx.arc(0, -8, 5, 0, Math.PI * 2)
    ctx.closePath()
    const winGrad = ctx.createRadialGradient(-1, -9, 1, 0, -8, 5)
    winGrad.addColorStop(0, '#7dd3fc')
    winGrad.addColorStop(0.6, '#38bdf8')
    winGrad.addColorStop(1, '#0e7490')
    ctx.fillStyle = winGrad
    ctx.fill()
    ctx.strokeStyle = 'rgba(200, 210, 220, 0.6)'
    ctx.lineWidth = 0.8
    ctx.stroke()

    // Window highlight
    ctx.beginPath()
    ctx.arc(-1.5, -9.5, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fill()

    // Left fin
    ctx.beginPath()
    ctx.moveTo(-14, 14)
    ctx.lineTo(-24, 26)
    ctx.lineTo(-22, 26)
    ctx.lineTo(-14, 22)
    ctx.closePath()
    const finGrad = ctx.createLinearGradient(-24, 14, -14, 14)
    finGrad.addColorStop(0, '#b91c1c')
    finGrad.addColorStop(1, '#ef4444')
    ctx.fillStyle = finGrad
    ctx.fill()

    // Right fin
    ctx.beginPath()
    ctx.moveTo(14, 14)
    ctx.lineTo(24, 26)
    ctx.lineTo(22, 26)
    ctx.lineTo(14, 22)
    ctx.closePath()
    const finGrad2 = ctx.createLinearGradient(14, 14, 24, 14)
    finGrad2.addColorStop(0, '#ef4444')
    finGrad2.addColorStop(1, '#b91c1c')
    ctx.fillStyle = finGrad2
    ctx.fill()

    // Engine nozzle
    ctx.beginPath()
    ctx.moveTo(-8, 22)
    ctx.lineTo(-10, 28)
    ctx.lineTo(10, 28)
    ctx.lineTo(8, 22)
    ctx.closePath()
    ctx.fillStyle = '#64748b'
    ctx.fill()

    // Flame (only when thrust > 0)
    if (thrust > 0) {
      const flameLen = 25 + thrust * 40 + Math.sin(flameFrame * 0.6) * 8
      const flameWidth = 8 + thrust * 4 + Math.sin(flameFrame * 0.8) * 2

      // Outer flame
      ctx.beginPath()
      ctx.moveTo(-flameWidth, 28)
      ctx.quadraticCurveTo(-flameWidth * 0.3, 28 + flameLen * 0.6, 0, 28 + flameLen)
      ctx.quadraticCurveTo(flameWidth * 0.3, 28 + flameLen * 0.6, flameWidth, 28)
      ctx.closePath()
      const flameGrad = ctx.createLinearGradient(0, 28, 0, 28 + flameLen)
      flameGrad.addColorStop(0, `rgba(255, 255, 200, ${0.9 * thrust})`)
      flameGrad.addColorStop(0.2, `rgba(255, 200, 50, ${0.8 * thrust})`)
      flameGrad.addColorStop(0.5, `rgba(255, 120, 20, ${0.6 * thrust})`)
      flameGrad.addColorStop(0.8, `rgba(200, 50, 10, ${0.3 * thrust})`)
      flameGrad.addColorStop(1, 'rgba(100, 20, 5, 0)')
      ctx.fillStyle = flameGrad
      ctx.fill()

      // Inner hot core
      const coreLen = flameLen * 0.5
      const coreW = flameWidth * 0.4
      ctx.beginPath()
      ctx.moveTo(-coreW, 28)
      ctx.quadraticCurveTo(0, 28 + coreLen * 0.8, 0, 28 + coreLen)
      ctx.quadraticCurveTo(0, 28 + coreLen * 0.8, coreW, 28)
      ctx.closePath()
      const coreGrad = ctx.createLinearGradient(0, 28, 0, 28 + coreLen)
      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.8 * thrust})`)
      coreGrad.addColorStop(0.5, `rgba(200, 220, 255, ${0.4 * thrust})`)
      coreGrad.addColorStop(1, 'rgba(255, 200, 100, 0)')
      ctx.fillStyle = coreGrad
      ctx.fill()

      // Flame particles
      for (let i = 0; i < 6; i++) {
        const px = (Math.sin(flameFrame * 0.4 + i * 1.8) * flameWidth * 0.8)
        const py = 28 + flameLen * (0.3 + Math.random() * 0.5)
        const pr = 1 + Math.random() * 2
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, ${150 + Math.random() * 100}, 0, ${0.3 * thrust})`
        ctx.fill()
      }
    }

    ctx.restore()
  }

  // --- Stars with realistic distribution ---
  const stars = []
  for (let i = 0; i < 350; i++) {
    const mag = Math.pow(Math.random(), 2.2) // magnitude distribution
    stars.push({
      x: Math.random(),
      y: Math.random(),
      size: 0.3 + mag * 2.5,
      brightness: 0.1 + mag * 0.9,
      twinkleSpeed: (1 - mag) * 0.025 + 0.003,
      twinklePhase: Math.random() * Math.PI * 2,
      // Color temperature: bright=blue-white, dim=warm
      colorR: mag > 0.6 ? 200 + Math.random() * 55 : 255,
      colorG: mag > 0.6 ? 210 + Math.random() * 45 : 240 + Math.random() * 15,
      colorB: 255
    })
  }

  // --- Warp streaks ---
  const streaks = []
  for (let i = 0; i < 180; i++) {
    streaks.push({
      angle: Math.random() * Math.PI * 2,
      dist: 0.1 + Math.random() * 0.9,
      len: Math.random() * 0.015 + 0.003,
      speed: Math.random() * 0.5 + 0.3,
      brightness: Math.random() * 0.6 + 0.4,
      colorShift: Math.random()
    })
  }

  // --- Exhaust particles ---
  const exhaustParticles = []

  // --- Launch pad ---
  function drawLaunchPad(shakeX, groundY) {
    // Sky gradient near horizon
    const skyGrad = ctx.createLinearGradient(0, groundY - 80, 0, groundY)
    skyGrad.addColorStop(0, 'rgba(5, 5, 16, 0)')
    skyGrad.addColorStop(1, 'rgba(15, 20, 40, 0.6)')
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, groundY - 80, W(), 80)

    // Ground
    const groundGrad = ctx.createLinearGradient(0, groundY, 0, H())
    groundGrad.addColorStop(0, '#1a2332')
    groundGrad.addColorStop(0.3, '#151d28')
    groundGrad.addColorStop(1, '#0a0f16')
    ctx.fillStyle = groundGrad
    ctx.fillRect(0 + shakeX, groundY, W(), H() - groundY)

    // Launch pad surface
    const padW = 120
    const padX = W() / 2 - padW / 2 + shakeX
    ctx.fillStyle = '#2d3748'
    ctx.fillRect(padX, groundY - 2, padW, 8)
    ctx.fillStyle = '#4a5568'
    ctx.fillRect(padX + 4, groundY - 1, padW - 8, 2)

    // Warning stripes
    ctx.fillStyle = '#eab308'
    for (let i = 0; i < padW; i += 16) {
      ctx.fillRect(padX + i, groundY + 4, 8, 2)
    }

    // Support structure
    ctx.strokeStyle = '#475569'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(W() / 2 - 20 + shakeX, groundY)
    ctx.lineTo(W() / 2 - 30 + shakeX, groundY - 35)
    ctx.moveTo(W() / 2 + 20 + shakeX, groundY)
    ctx.lineTo(W() / 2 + 30 + shakeX, groundY - 35)
    ctx.stroke()
  }

  // --- Countdown text ---
  function drawCountdown(num, alpha) {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = '#38bdf8'
    ctx.font = 'bold 140px "Courier New", monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = '#38bdf8'
    ctx.shadowBlur = 40
    ctx.fillText(num, W() / 2, H() / 2 - 40)
    // Double glow
    ctx.shadowBlur = 80
    ctx.globalAlpha = alpha * 0.3
    ctx.fillText(num, W() / 2, H() / 2 - 40)
    ctx.restore()
  }

  function drawStars(warpProgress) {
    stars.forEach(s => {
      const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7
      const alpha = s.brightness * twinkle

      if (warpProgress > 0) {
        const streakLen = warpProgress * 250 * s.brightness
        const gradient = ctx.createLinearGradient(
          s.x * W(), s.y * H() - streakLen / 2,
          s.x * W(), s.y * H() + streakLen / 2
        )
        gradient.addColorStop(0, `rgba(${s.colorR}, ${s.colorG}, 255, 0)`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha})`)
        gradient.addColorStop(1, `rgba(${s.colorR}, ${s.colorG}, 255, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(s.x * W() - 0.5, s.y * H() - streakLen / 2, 1 + warpProgress * 2, streakLen)
      } else {
        // Realistic star rendering with glow
        const sx = s.x * W()
        const sy = s.y * H()

        if (s.brightness > 0.5) {
          // Bright stars get a soft glow
          const glowR = s.size * 4
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR)
          glow.addColorStop(0, `rgba(${s.colorR}, ${s.colorG}, 255, ${alpha * 0.3})`)
          glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = glow
          ctx.fillRect(sx - glowR, sy - glowR, glowR * 2, glowR * 2)
        }

        // Star core
        ctx.beginPath()
        ctx.arc(sx, sy, s.size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.colorR}, ${s.colorG}, 255, ${alpha})`
        ctx.fill()
      }
    })
  }

  // --- Smoke cloud system ---
  const smokeClouds = []

  function spawnSmoke(x, y, vx, vy, size) {
    smokeClouds.push({ x, y, vx, vy, size, life: 1, maxLife: 80 + Math.random() * 40 })
  }

  function updateAndDrawSmoke() {
    for (let i = smokeClouds.length - 1; i >= 0; i--) {
      const s = smokeClouds[i]
      s.x += s.vx
      s.y += s.vy
      s.vx *= 0.98
      s.vy -= 0.02 // smoke rises
      s.size += 0.3
      s.life -= 1 / s.maxLife
      if (s.life <= 0) { smokeClouds.splice(i, 1); continue }

      const alpha = s.life * 0.25
      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size)
      grad.addColorStop(0, `rgba(160, 170, 180, ${alpha})`)
      grad.addColorStop(0.6, `rgba(100, 110, 120, ${alpha * 0.5})`)
      grad.addColorStop(1, 'rgba(50, 55, 60, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const totalDuration = 8500
  let startTime = null
  let frame = 0

  function render(timestamp) {
    if (dismissed.value) return
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    frame++

    const w = W()
    const h = H()

    // Clear
    ctx.fillStyle = '#050510'
    ctx.fillRect(0, 0, w, h)

    const warpProgress = Math.max(0, Math.min(1, (elapsed - 5400) / 1500))

    // Draw stars
    drawStars(warpProgress)

    // Phase 0: Countdown (0 - 2400ms)
    if (elapsed < 2400) {
      const countPhase = elapsed / 800
      const countNum = 3 - Math.floor(countPhase)
      const phaseProgress = countPhase % 1
      const alpha = phaseProgress < 0.15 ? phaseProgress / 0.15 : phaseProgress > 0.7 ? (1 - phaseProgress) / 0.3 : 1

      if (countNum >= 1) {
        drawCountdown(countNum, alpha)
      }

      const groundY = h * 0.75
      drawLaunchPad(0, groundY)
      drawRocket(w / 2, groundY - 30, 1.8, frame, 0)

      ctx.fillStyle = `rgba(148, 163, 184, ${0.5 + Math.sin(frame * 0.05) * 0.3})`
      ctx.font = '13px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.letterSpacing = '2px'
      ctx.fillText('INITIATING LAUNCH SEQUENCE', w / 2, h * 0.9)
    }

    // Phase 1: Ignition + liftoff (2400 - 4400ms)
    else if (elapsed < 4400) {
      const liftProgress = (elapsed - 2400) / 2000
      const groundY = h * 0.75
      const shake = liftProgress < 0.3
        ? Math.sin(frame * 0.8) * 4 * (liftProgress / 0.3)
        : Math.sin(frame * 1.2) * (1 - liftProgress) * 3

      const rocketY = groundY - 30 - liftProgress * liftProgress * h * 0.8
      const thrust = Math.min(1, liftProgress * 2)

      drawLaunchPad(shake, groundY)

      // Spawn exhaust smoke at the base
      if (liftProgress > 0.05 && frame % 2 === 0) {
        spawnSmoke(
          w / 2 + shake + (Math.random() - 0.5) * 20,
          Math.min(rocketY + 50 * 1.8, groundY),
          (Math.random() - 0.5) * 2,
          Math.random() * 0.5,
          8 + Math.random() * 12
        )
      }

      // Exhaust light on ground
      if (liftProgress > 0.05 && rocketY + 80 > groundY - 50) {
        const glowAlpha = Math.min(0.4, thrust * 0.5) * Math.max(0, 1 - liftProgress * 1.5)
        const glow = ctx.createRadialGradient(w / 2 + shake, groundY, 0, w / 2 + shake, groundY, 120)
        glow.addColorStop(0, `rgba(255, 180, 50, ${glowAlpha})`)
        glow.addColorStop(0.5, `rgba(255, 100, 20, ${glowAlpha * 0.3})`)
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, groundY - 120, w, 240)
      }

      updateAndDrawSmoke()
      drawRocket(w / 2 + shake, rocketY, 1.8, frame, thrust)

      // "LIFTOFF!" text
      if (liftProgress > 0.05 && liftProgress < 0.6) {
        const textAlpha = liftProgress < 0.15 ? (liftProgress - 0.05) / 0.1 : liftProgress > 0.4 ? (0.6 - liftProgress) / 0.2 : 1
        ctx.save()
        ctx.globalAlpha = textAlpha
        ctx.fillStyle = '#fbbf24'
        ctx.font = 'bold 56px "Courier New", monospace'
        ctx.textAlign = 'center'
        ctx.shadowColor = '#fbbf24'
        ctx.shadowBlur = 30
        ctx.fillText('LIFTOFF!', w / 2, h * 0.3)
        ctx.restore()
      }
    }

    // Phase 2: Ascending through space (4400 - 5400ms)
    else if (elapsed < 5400) {
      const ascendProgress = (elapsed - 4400) / 1000
      const rocketY = h * 0.5 - ascendProgress * h * 0.15
      const rocketScale = 1.8 - ascendProgress * 0.3

      updateAndDrawSmoke()
      drawRocket(w / 2, rocketY, rocketScale, frame, 1)

      // "ENTERING LIGHTSPEED" text
      if (ascendProgress > 0.4) {
        const flickerAlpha = (Math.sin(frame * 0.4) > 0 ? 0.8 : 0.3) * Math.min(1, (ascendProgress - 0.4) / 0.3)
        ctx.save()
        ctx.globalAlpha = flickerAlpha
        ctx.fillStyle = '#818cf8'
        ctx.font = 'bold 24px "Courier New", monospace'
        ctx.textAlign = 'center'
        ctx.shadowColor = '#818cf8'
        ctx.shadowBlur = 20
        ctx.fillText('ENTERING LIGHTSPEED', w / 2, h * 0.18)
        ctx.restore()
      }
    }

    // Phase 3: Lightspeed warp (5400 - 7200ms)
    else if (elapsed < 7200) {
      const warpT = (elapsed - 5400) / 1800
      const cx = w / 2
      const cy = h / 2

      // Warp streaks from center
      streaks.forEach(s => {
        const dist = s.dist * Math.max(w, h) * 0.8
        const streakLen = (s.len * Math.max(w, h)) * (1 + warpT * 18)

        const r = dist * (0.2 + warpT * 0.8)
        const x1 = cx + Math.cos(s.angle) * r
        const y1 = cy + Math.sin(s.angle) * r
        const x2 = cx + Math.cos(s.angle) * (r + streakLen * (1 + warpT * 4))
        const y2 = cy + Math.sin(s.angle) * (r + streakLen * (1 + warpT * 4))

        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        const isBlue = s.colorShift > 0.4
        const baseColor = isBlue ? '100, 180, 255' : '180, 160, 255'
        grad.addColorStop(0, `rgba(${baseColor}, 0)`)
        grad.addColorStop(0.3, `rgba(${baseColor}, ${s.brightness * warpT * 0.7})`)
        grad.addColorStop(0.7, `rgba(220, 230, 255, ${s.brightness * warpT * 0.9})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.brightness * warpT * 0.6})`)

        ctx.strokeStyle = grad
        ctx.lineWidth = 0.8 + warpT * 3 * s.brightness
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      })

      // Central glow
      const glowR = 60 + warpT * 250
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR)
      glowGrad.addColorStop(0, `rgba(255, 255, 255, ${0.7 * warpT})`)
      glowGrad.addColorStop(0.2, `rgba(180, 210, 255, ${0.3 * warpT})`)
      glowGrad.addColorStop(0.5, `rgba(100, 140, 220, ${0.1 * warpT})`)
      glowGrad.addColorStop(1, 'rgba(5, 5, 16, 0)')
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, w, h)

      // Tiny rocket in center during warp
      if (warpT < 0.5) {
        const rocketScale = 1.5 * (1 - warpT * 2)
        if (rocketScale > 0.2) {
          drawRocket(cx, cy, rocketScale, frame, 1)
        }
      }
    }

    // Phase 4: Flash + Fade out (7200 - 8500ms)
    else if (elapsed < 8500) {
      const fadeT = (elapsed - 7200) / 1300

      // White flash
      if (fadeT < 0.35) {
        const flashAlpha = fadeT < 0.1 ? fadeT / 0.1 : (0.35 - fadeT) / 0.25
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.85})`
        ctx.fillRect(0, 0, w, h)
      }

      // Fade to transparent
      ctx.fillStyle = `rgba(5, 5, 16, ${Math.max(0, 1 - fadeT * 1.2)})`
      ctx.fillRect(0, 0, w, h)
    }

    // Done
    if (elapsed >= totalDuration) {
      dismissed.value = true
      emit('complete')
      window.removeEventListener('resize', resize)
      return
    }

    animId = requestAnimationFrame(render)
  }

  animId = requestAnimationFrame(render)
})
</script>

<style scoped>
.launch-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  cursor: pointer;
  background: #050510;
}

.launch-overlay canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.skip-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(148, 163, 184, 0.4);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 0.15em;
  pointer-events: none;
  animation: pulse-hint 2s ease-in-out infinite;
}

@keyframes pulse-hint {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
</style>
