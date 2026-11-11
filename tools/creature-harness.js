// Dev-only stage for one creature, under the site's own light, sky and bloom.
//
//   /tools/creature-harness.html?c=naga                 contact sheet: six views
//   /tools/creature-harness.html?c=naga&mode=strip      eight frames in a row of time, one view
//   /tools/creature-harness.html?c=naga&mode=live       running, to watch the motion
//
// Options: yaw, pitch (radians, strip and live), t (start second), span (strip
// length in seconds), energy (0..1), lite=1 (phone build: no bloom), fill
// (share of the frame the creature may take, default 0.78).
//
// When a sheet or strip is drawn, window.__ready is true and window.__stats
// holds triangle count, draw calls and the cost of one update() call.
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

import { createEnvironment, createLightRig } from '/src/world/dragonLook.js'

const query = new URLSearchParams(location.search)
const num = (key, fallback) => (query.has(key) ? Number(query.get(key)) : fallback)
const name = query.get('c') || 'dragon'
const mode = query.get('mode') || 'sheet'
const lite = query.get('lite') === '1'
const energy = num('energy', 0)
const fill = num('fill', 0.78)

const CAMERA_Z = 8
const FOV = 30
const STEP = 1 / 60

const gl = document.getElementById('gl')
const sheet = document.getElementById('sheet')
const fail = (err) => {
  console.error(err)
  document.body.insertAdjacentHTML('beforeend', `<pre style="padding:24px;color:#ff8a8a">${String(err?.stack || err)}</pre>`)
  window.__error = String(err?.stack || err)
  window.__ready = true
}

try {
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: lite, powerPreference: 'high-performance' })
  renderer.setPixelRatio(1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.96

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 80)
  camera.position.set(0, 0, CAMERA_Z)

  // the site's night sky, without the stars
  const sky = document.createElement('canvas')
  sky.width = 4
  sky.height = 512
  const skyCtx = sky.getContext('2d')
  const grad = skyCtx.createLinearGradient(0, 0, 0, 512)
  grad.addColorStop(0, '#04060d')
  grad.addColorStop(0.45, '#0a1226')
  grad.addColorStop(1, '#070a12')
  skyCtx.fillStyle = grad
  skyCtx.fillRect(0, 0, 4, 512)
  scene.background = new THREE.CanvasTexture(sky)
  scene.background.colorSpace = THREE.SRGBColorSpace

  const lights = createLightRig(THREE, { lite })
  scene.add(lights.group)
  const env = await createEnvironment(renderer, THREE)

  const module = await import(/* @vite-ignore */ `/src/world/creatures/${name}.js`)
  const creature = await module.createCreature(THREE, {
    envMap: env.envMap,
    lite,
    modelUrl: `/models/dragon-hero${lite ? '-lite' : ''}.glb`,
  })
  if (!creature?.group || !creature.size || typeof creature.update !== 'function') {
    throw new Error('createCreature must return { group, size: { x, y }, update(time, dt, energy), dispose() }')
  }

  const rig = new THREE.Group()
  rig.rotation.order = 'YXZ'
  rig.add(creature.group)
  scene.add(rig)

  let composer = null
  if (!lite) {
    composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }))
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.36, 0.6, 1.3))
    composer.addPass(new OutputPass())
  }

  const resize = (w, h) => {
    renderer.setSize(w, h, false)
    composer?.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const halfH = Math.tan((FOV * Math.PI) / 360) * CAMERA_Z
    const halfW = halfH * camera.aspect
    const fit = Math.min((2 * halfW * fill) / creature.size.x, (2 * halfH * fill) / creature.size.y)
    rig.scale.setScalar(fit)
    lights.group.scale.setScalar(fit)
    lights.fitShadow(fit)
  }

  let clock = 0
  const advanceTo = (seconds, level = energy) => {
    while (clock < seconds - 1e-6) {
      clock += STEP
      creature.update(clock, STEP, level)
    }
  }
  const draw = () => (composer ? composer.render(STEP) : renderer.render(scene, camera))

  if (mode === 'live') {
    document.body.classList.add('live')
    const fitWindow = () => resize(window.innerWidth, window.innerHeight)
    fitWindow()
    window.addEventListener('resize', fitWindow)
    rig.rotation.set(num('pitch', 0), num('yaw', 0), 0)
    let last = performance.now()
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      clock += dt
      creature.update(clock, dt, energy)
      draw()
      requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
    window.__ready = true
  } else {
    const start = num('t', 1.2)
    const strip = mode === 'strip'
    const cols = strip ? 4 : 3
    const cellW = strip ? 480 : 640
    const cellH = 540
    const span = num('span', 1.6)
    // sheet: front, both three-quarters, both sides (one from above), then the front again flying hard
    const cells = strip
      ? Array.from({ length: 8 }, (_, i) => ({
          t: start + (span * i) / 8,
          yaw: num('yaw', 0),
          pitch: num('pitch', 0),
          energy,
          label: `t ${(start + (span * i) / 8).toFixed(2)}s`,
        }))
      : [
          { t: start, yaw: 0, pitch: 0, energy, label: 'front' },
          { t: start + 0.5, yaw: 0.6, pitch: 0.08, energy, label: 'yaw +0.6' },
          { t: start + 1.0, yaw: -0.6, pitch: 0.08, energy, label: 'yaw -0.6' },
          { t: start + 1.5, yaw: 1.3, pitch: 0, energy, label: 'yaw +1.3' },
          { t: start + 2.0, yaw: -1.3, pitch: 0.4, energy, label: 'yaw -1.3, from above' },
          { t: start + 3.2, yaw: 0, pitch: 0, energy: 1, label: 'front, energy 1' },
        ]

    resize(cellW, cellH)
    sheet.width = cols * cellW
    sheet.height = 2 * cellH
    const ctx = sheet.getContext('2d')
    ctx.font = '600 15px system-ui, sans-serif'
    cells.forEach((cell, index) => {
      advanceTo(cell.t, cell.energy)
      rig.rotation.set(cell.pitch, cell.yaw, 0)
      draw()
      const x = (index % cols) * cellW
      const y = Math.floor(index / cols) * cellH
      ctx.drawImage(gl, x, y, cellW, cellH)
      ctx.fillStyle = 'rgba(232,236,244,0.75)'
      ctx.fillText(cell.label, x + 14, y + 26)
      ctx.strokeStyle = 'rgba(232,236,244,0.12)'
      ctx.strokeRect(x + 0.5, y + 0.5, cellW - 1, cellH - 1)
    })

    renderer.render(scene, camera)
    const triangles = renderer.info.render.triangles
    const calls = renderer.info.render.calls
    const t0 = performance.now()
    for (let i = 0; i < 240; i += 1) {
      clock += STEP
      creature.update(clock, STEP, energy)
    }
    const updateMs = (performance.now() - t0) / 240
    window.__stats = {
      name,
      lite,
      triangles,
      drawCalls: calls,
      updateMs: Number(updateMs.toFixed(3)),
      size: { x: Number(creature.size.x.toFixed(3)), y: Number(creature.size.y.toFixed(3)) },
    }
    ctx.fillStyle = 'rgba(217,178,74,0.95)'
    ctx.fillText(
      `${name}${lite ? ' (lite)' : ''} · ${triangles} tris · ${calls} draw calls · update ${updateMs.toFixed(2)} ms · size ${creature.size.x.toFixed(2)} x ${creature.size.y.toFixed(2)}`,
      14,
      sheet.height - 16,
    )
    window.__ready = true
  }
} catch (err) {
  fail(err)
}
