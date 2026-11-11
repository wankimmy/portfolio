// Dev-only stage for one creature, under the site's own light, sky and bloom.
//
//   /tools/creature-harness.html?c=naga                 contact sheet: six views
//   /tools/creature-harness.html?c=naga&mode=strip      eight frames in a row of time, one view
//   /tools/creature-harness.html?c=naga&mode=live       running, to watch the motion
//
// Options: yaw, pitch (radians, strip and live), t (start second), span (strip
// length in seconds), energy (0..1), lite=1 (phone build: no bloom), fill
// (share of the frame the creature may take, default 0.78), kick=1 (strip and
// live: the creature is told it was shoved sideways and spun for 0.4 s just
// after the start, to show how its loose parts swing and settle), act=1 (strip
// and live: the creature is asked for its signature move just after the start),
// room=phone (the creature is told it has only a phone band's worth of space
// above and below it; each frame then shows that band as two red lines: use it
// with fill=1 so the creature spans the frame the way it spans a phone).
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
  const ref = mode === 'ref'
  const renderer = new THREE.WebGLRenderer({
    canvas: gl,
    antialias: lite || ref,
    alpha: ref,
    preserveDrawingBuffer: ref,
    powerPreference: 'high-performance',
  })
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

  // ?glb=/tools/ref/creature-naga-raw.glb looks at a raw sculpt instead: pale faceted clay, no motion
  const rawSculpt = async () => {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
    const gltf = await new GLTFLoader().loadAsync(query.get('glb'))
    const box = new THREE.Box3().setFromObject(gltf.scene)
    const size = box.getSize(new THREE.Vector3())
    const unit = 2 / Math.max(size.x, size.y, size.z)
    gltf.scene.position.sub(box.getCenter(new THREE.Vector3())).multiplyScalar(unit)
    gltf.scene.scale.setScalar(unit)
    const clay = new THREE.MeshStandardMaterial({ color: 0xcfd6e6, roughness: 0.7, flatShading: true, envMap: env.envMap, envMapIntensity: 0.4 })
    gltf.scene.traverse((child) => child.isMesh && (child.material = clay))
    const group = new THREE.Group()
    group.add(gltf.scene)
    return { group, size: { x: size.x * unit, y: size.y * unit }, update() {}, dispose() {} }
  }
  const module = query.has('glb')
    ? { createCreature: rawSculpt }
    : await import(/* @vite-ignore */ `/src/world/creatures/${name}.js`)
  const creature = await module.createCreature(THREE, {
    envMap: env.envMap,
    lite,
    modelUrl: `/models/dragon-hero${lite ? '-lite' : ''}.glb`,
  })
  if (!creature?.group || !creature.size || typeof creature.update !== 'function') {
    throw new Error('createCreature must return { group, size: { x, y }, update(time, dt, energy, motion), dispose() } (optional: reach: { up, down }, ready: Promise, act())')
  }
  // a creature may finish loading a model after it is first shown: wait for it here
  if (creature.ready) await creature.ready

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
    // one creature width in pixels of this frame: the unit the room numbers are in
    widthPx = (fit * creature.size.x * h) / (2 * halfH)
    rig.scale.setScalar(fit)
    lights.group.scale.setScalar(fit)
    lights.fitShadow(fit)
  }

  let widthPx = 0
  let clock = 0
  // what the site tells a creature about its own movement (createWorld.js): here it holds
  // still, unless kick=1 shoves and spins it for a moment so the springs have something to answer
  const kick = query.get('kick') === '1'
  const kickAt = num('t', 1.2) + 0.15
  // open space round the creature in creature widths (createWorld.js). On a phone the creature
  // fills the width of the screen and its band is short: about 0.42 widths above its centre and
  // 0.38 below, with the header above that and the caption below.
  const phoneRoom = query.get('room') === 'phone'
  const motion = {
    vx: 0,
    vy: 0,
    spin: 0,
    yaw: 0,
    pitch: 0,
    roomUp: phoneRoom ? 0.42 : 1.1,
    roomDown: phoneRoom ? 0.38 : 1.1,
    roomLeft: phoneRoom ? 0.5 : 1.4,
    roomRight: phoneRoom ? 0.5 : 1.4,
  }
  let acted = query.get('act') !== '1'
  const feel = () => {
    const on = kick && clock > kickAt && clock < kickAt + 0.4
    motion.vx = on ? 1.6 : 0
    motion.vy = on ? -0.5 : 0
    motion.spin = on ? 3.2 : 0
    motion.yaw = rig.rotation.y
    motion.pitch = rig.rotation.x
    if (!acted && clock > kickAt) {
      acted = true
      creature.act?.()
    }
    return motion
  }
  const advanceTo = (seconds, level = energy) => {
    while (clock < seconds - 1e-6) {
      clock += STEP
      creature.update(clock, STEP, level, feel())
    }
  }
  const draw = () => (composer ? composer.render(STEP) : renderer.render(scene, camera))

  if (ref) {
    // One clean picture for the 3D generator (tools/generate_creature_hunyuan.py):
    // the creature alone as pale faceted clay on a transparent ground, the way
    // the dragon's own concept picture looked. Glows and loose particles are
    // left out, they would be sculpted as floating lumps.
    const side = num('size', 1536)
    composer = null
    scene.background = null
    renderer.setClearColor(0x000000, 0)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x7c8494, 1.15))
    const clay = new THREE.MeshStandardMaterial({ color: 0xe4e8f0, roughness: 0.82, flatShading: true, side: THREE.DoubleSide })
    const eye = new THREE.MeshBasicMaterial({ color: 0x35c8ff })
    advanceTo(num('t', 1.2))
    rig.traverse((child) => {
      if (child.isPoints || child.isSprite || child.isLine) child.visible = false
      if (!child.isMesh) return
      const glows = (Array.isArray(child.material) ? child.material : [child.material]).some((m) => m.isMeshBasicMaterial)
      if (glows && child.isInstancedMesh) child.visible = false
      else child.material = glows ? eye : clay
    })
    resize(side, side)
    rig.rotation.set(num('pitch', 0), num('yaw', 0), 0)
    renderer.render(scene, camera)
    document.body.classList.add('live')
    window.__png = gl.toDataURL('image/png')
    window.__stats = { name, size: creature.size }
    window.__ready = true
  } else if (mode === 'live') {
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
      creature.update(clock, dt, energy, feel())
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
      if (phoneRoom) {
        // the phone band: the header sits above the top line, the caption below the bottom one
        ctx.strokeStyle = 'rgba(255,90,90,0.75)'
        for (const edge of [cellH / 2 - motion.roomUp * widthPx, cellH / 2 + motion.roomDown * widthPx]) {
          ctx.beginPath()
          ctx.moveTo(x, y + edge)
          ctx.lineTo(x + cellW, y + edge)
          ctx.stroke()
        }
      }
    })

    renderer.render(scene, camera)
    const triangles = renderer.info.render.triangles
    const calls = renderer.info.render.calls
    const t0 = performance.now()
    for (let i = 0; i < 240; i += 1) {
      clock += STEP
      creature.update(clock, STEP, energy, feel())
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
