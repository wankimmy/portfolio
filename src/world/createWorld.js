/**
 * The night sky, its creatures and the crystal swarm, as one full-viewport
 * WebGL layer behind the page.
 *
 * The page never talks to three.js directly. Every creature is an actor with a
 * `pose` the page tweens with GSAP (see scenes.js); this module reads the poses
 * every tick of GSAP's ticker, the same clock that drives Lenis and
 * ScrollTrigger.
 */
import gsap from 'gsap'

import { createEnvironment, createLightRig } from './dragonLook.js'
import { buildFormations } from './formations.js'

const CAMERA_Z = 8
const FOV = 30
const TAU = Math.PI * 2

const DRAG_SPEED = 0.0075 // rad per px
const PITCH_LIMIT = 1.1
const FLICK_FRICTION = 2.6
const REST_AFTER_S = 1.4 // a spun creature turns back to its pose after this long

/** Every creature is its own lazy chunk: creatures/<name>.js exporting createCreature. */
const MODULES = import.meta.glob('./creatures/*.js')
const load = (name) => MODULES[`./creatures/${name}.js`]

/** The dragon loads first and opens the page. These are built in code once it is on screen. */
const LATER = ['naga', 'whale', 'phoenix']

/**
 * A pose is read two ways, blended by `stage`:
 *   stage 0  free flight. x, y: centre in half-viewports, (0, 0) the middle of
 *            the screen, +y up. scale 1 = fitted to the screen.
 *   stage 1  riding a box on the page (see setBox). x, y: in half-boxes from
 *            the box centre. scale 1 = fitted to the box.
 * yaw + turns the creature toward screen right. show 0 = parked: not drawn.
 */
const makeActor = (name) => ({
  name,
  pose: { x: 0, y: 2, scale: 1, yaw: 0, pitch: 0, roll: 0, stage: 0, show: 0 },
  box: null,
  rig: null,
  creature: null,
  freeFit: 1,
  energy: 0,
  lastX: 0,
  lastY: 0,
  dragYaw: 0,
  dragPitch: 0,
  velYaw: 0,
  velPitch: 0,
  dragging: false,
  lastDragTime: -Infinity,
})

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{
 *   lite?: boolean,
 *   modelUrl: string,
 *   onProgress?: (ratio: number) => void,
 *   onReady?: () => void,
 *   onError?: (err: unknown) => void,
 * }} options lite = phone build: smaller models, no bloom, cheaper materials
 */
export function createWorld(canvas, options) {
  const { lite = false, modelUrl, onProgress = () => {}, onReady = () => {}, onError = () => {} } = options

  const actors = { dragon: makeActor('dragon') }
  for (const name of LATER) actors[name] = makeActor(name)
  const cast = Object.values(actors)

  let THREE = null
  let renderer = null
  let scene = null
  let camera = null
  let composer = null
  let lights = null
  let envMap = null
  let starGroup = null
  let starLayers = []
  let disposeEnv = null
  let resizeObserver = null

  let disposed = false
  let ready = false
  let visible = true

  let viewW = 1
  let viewH = 1
  let halfW = 1
  let halfH = 1
  let shadowScale = 0

  let scrollProgress = 0
  let scrollVelocity = 0
  let bank = 0

  // Crystal swarm. Count is a multiple of 12 so the sigil's twelve edges fill evenly.
  const CRYSTALS = lite ? 72 : 156
  const formations = buildFormations(CRYSTALS)
  const morph = { t: 1 } // 0 = where the swarm was, 1 = the current formation
  const sigilShow = { k: 0 } // the gold sigil only exists inside the finished world
  let swarm = null
  let sigil = null
  let dummy = null
  let swarmNow = null // last drawn world positions, the start of the next morph
  let swarmFrom = null
  let sizeNow = 1
  let sizeFrom = 1
  let formation = { shape: 'drift', x: 0, y: 0, z: 0, spin: 0, spread: 1, size: 1, follow: null }
  let formationAngle = 0

  let hoverX = 0
  let hoverY = 0
  let easedHoverX = 0
  let easedHoverY = 0
  let starDrift = 0
  let clock = 0

  // frame-time watch: drop the bloom pass on machines that cannot hold it
  let sampled = 0
  let sampledMs = 0

  const fitFree = (actor) => {
    if (!actor.creature) return
    // Portrait screens let wings run off the sides so the body stays big;
    // landscape keeps the whole animal inside the right half of the stage.
    const portrait = camera.aspect < 0.8
    const widthShare = portrait ? 1.12 : 0.6
    const heightShare = portrait ? 0.44 : 0.84
    actor.freeFit = Math.min(
      (2 * halfW * widthShare) / actor.creature.size.x,
      (2 * halfH * heightShare) / actor.creature.size.y,
    )
  }

  const measure = () => {
    if (!renderer || !camera) return
    viewW = Math.max(1, canvas.clientWidth)
    viewH = Math.max(1, canvas.clientHeight)
    renderer.setSize(viewW, viewH, false)
    composer?.setSize(viewW, viewH)
    camera.aspect = viewW / viewH
    camera.updateProjectionMatrix()
    halfH = Math.tan((FOV * Math.PI) / 360) * CAMERA_Z
    halfW = halfH * camera.aspect
    cast.forEach(fitFree)
  }

  const place = (actor, time, dt) => {
    const { pose, rig, creature } = actor
    if (!rig) return
    const on = pose.show > 0
    rig.visible = on
    if (!on) return

    let x = pose.x * halfW
    let y = pose.y * halfH
    let fit = actor.freeFit
    const box = actor.box
    if (box && pose.stage > 0.001) {
      let top = box.fixed ? box.top : box.top - window.scrollY
      let height = box.height
      if (box.clipTop !== undefined && top < box.clipTop) {
        // the box is sliding under the header: the creature keeps to what is left of it
        height = Math.max(box.minHeight ?? 120, top + height - box.clipTop)
        top = box.clipTop
      }
      const hw = (box.width / viewW) * halfW
      const hh = (height / viewH) * halfH
      // a creature may reach further above its centre than below (raised wings):
      // fit and centre that whole envelope, so nothing pokes out of the top of the box
      const up = creature.reach?.up ?? creature.size.y / 2
      const down = creature.reach?.down ?? creature.size.y / 2
      const boxFit = Math.min((2 * hw) / creature.size.x, (2 * hh) / (up + down))
      const bx = (((box.left + box.width / 2) / viewW) * 2 - 1) * halfW + pose.x * hw
      const by =
        (1 - ((top + height / 2) / viewH) * 2) * halfH + pose.y * hh - ((up - down) / 2) * boxFit * pose.scale
      x += (bx - x) * pose.stage
      y += (by - y) * pose.stage
      fit += (boxFit - fit) * pose.stage
    }

    if (!actor.dragging) {
      actor.dragYaw += actor.velYaw * dt
      actor.dragPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, actor.dragPitch + actor.velPitch * dt))
      const decay = Math.exp(-FLICK_FRICTION * dt)
      actor.velYaw *= decay
      actor.velPitch *= decay
      if (time - actor.lastDragTime > REST_AFTER_S) {
        const back = 1 - Math.exp(-1.8 * dt)
        const restYaw = Math.round(actor.dragYaw / TAU) * TAU // nearest full turn, never unwinds
        actor.dragYaw += (restYaw - actor.dragYaw) * back
        actor.dragPitch -= actor.dragPitch * back
      }
    }

    const s = fit * pose.scale
    rig.position.set(x, y, 0)
    rig.scale.setScalar(s)
    rig.rotation.set(
      pose.pitch + easedHoverY * 0.07 + actor.dragPitch + bank * 0.2,
      pose.yaw + easedHoverX * 0.12 + actor.dragYaw,
      pose.roll - bank * 0.05,
    )

    // how hard it is flying: screen speed, quick to rise and slow to settle
    const speed = dt > 0 ? Math.hypot(x - actor.lastX, y - actor.lastY) / halfH / dt : 0
    actor.lastX = x
    actor.lastY = y
    const want = Math.min(1, speed * 0.8)
    actor.energy += (want - actor.energy) * (1 - Math.exp(-(want > actor.energy ? 5 : 1.5) * dt))
    creature.update(time, dt, actor.energy)

    if (actor === actors.dragon) {
      lights.group.position.copy(rig.position)
      lights.group.scale.setScalar(s)
      if (Math.abs(s - shadowScale) > shadowScale * 0.02) {
        shadowScale = s
        lights.fitShadow(s)
      }
    }
  }

  const tick = (time, deltaMs) => {
    if (disposed || !ready || !visible) return
    const dt = Math.min(deltaMs / 1000, 0.05)
    clock = time

    const follow = 1 - Math.exp(-6 * dt)
    easedHoverX += (hoverX - easedHoverX) * follow
    easedHoverY += (hoverY - easedHoverY) * follow
    bank += (scrollVelocity - bank) * (1 - Math.exp(-5 * dt))

    for (const actor of cast) place(actor, time, dt)
    drawSwarm(time, dt)

    starGroup.position.y = scrollProgress * 2.4
    starDrift += dt * 0.003
    starGroup.rotation.z = starDrift
    starLayers[0].material.opacity = 0.78 + 0.22 * Math.sin(time * 0.9)
    starLayers[1].material.opacity = 0.78 - 0.22 * Math.sin(time * 0.9)

    if (composer) {
      composer.render(dt)
      if (sampled < 90) {
        sampled += 1
        sampledMs += deltaMs
        if (sampled === 90 && sampledMs / 90 > 28) {
          composer.dispose()
          composer = null
          renderer.setPixelRatio(1)
          measure()
        }
      }
    } else {
      renderer.render(scene, camera)
    }
  }

  const onWindowPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    hoverX = (e.clientX / window.innerWidth - 0.5) * 2
    hoverY = (e.clientY / window.innerHeight - 0.5) * 2
  }

  /**
   * Let an element act as a creature's handle: drag spins it, a flick keeps it
   * turning, double-click snaps it back. Vertical touch scroll passes through.
   * @param {HTMLElement} el
   * @param {string} [name] which actor
   * @returns {() => void} unbind
   */
  const bindDrag = (el, name = 'dragon') => {
    const actor = actors[name]
    if (!actor) return () => {}
    let pointerId = null
    let lastX = 0
    let lastY = 0
    let lastT = 0

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      actor.dragging = true
      pointerId = e.pointerId
      lastX = e.clientX
      lastY = e.clientY
      lastT = e.timeStamp
      actor.velYaw = 0
      actor.velPitch = 0
      el.setPointerCapture?.(e.pointerId)
      el.classList.add('is-grabbing')
    }
    const move = (e) => {
      if (!actor.dragging || e.pointerId !== pointerId) return
      const dx = (e.clientX - lastX) * DRAG_SPEED
      const dy = (e.clientY - lastY) * DRAG_SPEED
      const dt = Math.max(1, e.timeStamp - lastT) / 1000
      actor.dragYaw += dx
      actor.dragPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, actor.dragPitch + dy))
      actor.velYaw = dx / dt
      actor.velPitch = dy / dt
      lastX = e.clientX
      lastY = e.clientY
      lastT = e.timeStamp
    }
    const up = (e) => {
      if (e.pointerId !== pointerId) return
      actor.dragging = false
      pointerId = null
      actor.lastDragTime = clock
      el.classList.remove('is-grabbing')
    }
    const reset = () => {
      actor.velYaw = 0
      actor.velPitch = 0
      actor.lastDragTime = -Infinity
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('dblclick', reset)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('dblclick', reset)
      el.classList.remove('is-grabbing')
      if (pointerId !== null) actor.dragging = false
    }
  }

  const softDot = () => {
    const size = 32
    const cv = document.createElement('canvas')
    cv.width = size
    cv.height = size
    const ctx = cv.getContext('2d')
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.55)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(cv)
  }

  const skyGradient = () => {
    const cv = document.createElement('canvas')
    cv.width = 4
    cv.height = 512
    const ctx = cv.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, 0, 512)
    g.addColorStop(0, '#04060d')
    g.addColorStop(0.45, '#0a1226')
    g.addColorStop(1, '#070a12')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 4, 512)
    const tex = new THREE.CanvasTexture(cv)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }

  const buildSky = () => {
    scene.background = skyGradient()
    starGroup = new THREE.Group()
    const dot = softDot()
    const perLayer = lite ? 420 : 900
    const tint = new THREE.Color()
    for (let layer = 0; layer < 2; layer += 1) {
      const positions = new Float32Array(perLayer * 3)
      const colors = new Float32Array(perLayer * 3)
      for (let i = 0; i < perLayer; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 36
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30
        positions[i * 3 + 2] = -4 - Math.random() * 20
        // mostly cold white, one in twelve a warm gold
        if (Math.random() < 0.085) tint.setRGB(1, 0.84, 0.5)
        else tint.setHSL(0.6, 0.55, 0.78 + Math.random() * 0.2)
        colors[i * 3] = tint.r
        colors[i * 3 + 1] = tint.g
        colors[i * 3 + 2] = tint.b
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      const material = new THREE.PointsMaterial({
        size: layer === 0 ? 0.085 : 0.13,
        map: dot,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const points = new THREE.Points(geometry, material)
      starLayers.push(points)
      starGroup.add(points)
    }

    // two soft nebula plumes far behind everything
    for (const [color, x, y, size, opacity] of [
      [0x1c3f8f, -7, 3.5, 22, 0.34],
      [0x123a6b, 8, -4.5, 26, 0.28],
    ]) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: dot,
          color,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      )
      sprite.position.set(x, y, -26)
      sprite.scale.set(size, size, 1)
      starGroup.add(sprite)
    }
    scene.add(starGroup)
  }

  const noise = (i, salt) => {
    const x = Math.sin(i * 91.7 + salt * 47.3) * 43758.5453
    return x - Math.floor(x)
  }

  const buildSwarm = () => {
    const geometry = new THREE.OctahedronGeometry(1, 0)
    geometry.scale(0.5, 1, 0.5) // a shard, not a die
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.16,
      metalness: 0.05,
      flatShading: true,
      envMap,
      envMapIntensity: 1.5,
      // lit from inside, so the swarm reads even where the sky is dimmed
      emissive: 0x1d3f86,
      emissiveIntensity: 0.6,
    })
    if (!lite) {
      material.iridescence = 0.7
      material.iridescenceIOR = 1.4
    }
    swarm = new THREE.InstancedMesh(geometry, material, CRYSTALS)
    swarm.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    swarm.frustumCulled = false
    const tint = new THREE.Color()
    for (let i = 0; i < CRYSTALS; i += 1) {
      // mostly ice, one in nine gold
      if (i % 9 === 4) tint.setRGB(1, 0.78, 0.36)
      else tint.setHSL(0.6, 0.5, 0.72 + noise(i, 1) * 0.2)
      swarm.setColorAt(i, tint)
    }
    scene.add(swarm)
    dummy = new THREE.Object3D()
    swarmNow = new Float32Array(CRYSTALS * 3)
    swarmFrom = new Float32Array(CRYSTALS * 3)

    // the site's sigil in three dimensions: gold edges and a ring, bright enough to bloom
    const gold = new THREE.Color().setRGB(2.2, 1.6, 0.55)
    sigil = new THREE.Group()
    sigil.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1, 0)),
        new THREE.LineBasicMaterial({ color: gold }),
      ),
    )
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.014, 8, 96), new THREE.MeshBasicMaterial({ color: gold }))
    ring.rotation.x = Math.PI / 2.4
    sigil.add(ring)
    sigil.visible = false
    scene.add(sigil)
  }

  const drawSwarm = (time, dt) => {
    formationAngle += formation.spin * dt
    const cos = Math.cos(formationAngle)
    const sin = Math.sin(formationAngle)
    const offsets = formations[formation.shape]
    let reach = halfH * formation.spread
    let ax = formation.x * halfW
    let ay = formation.y * halfH
    const lead = formation.follow ? actors[formation.follow] : null
    if (lead?.rig) {
      // anchored to a creature: the shape goes where it goes, sized against it
      const s = lead.rig.scale.x
      reach = s * lead.creature.size.y * formation.spread
      ax = lead.rig.position.x + formation.x * s * lead.creature.size.x * 0.5
      ay = lead.rig.position.y + formation.y * s * lead.creature.size.y * 0.5
    }
    const az = formation.z * reach
    sizeNow = sizeFrom + (formation.size - sizeFrom) * morph.t

    for (let i = 0; i < CRYSTALS; i += 1) {
      const j = i * 3
      // where this crystal belongs in the current shape, turned about the vertical axis
      const ox = offsets[j]
      const oz = offsets[j + 2]
      const tx = ax + (ox * cos + oz * sin) * reach
      const ty = ay + offsets[j + 1] * reach + Math.sin(time * 0.6 + i) * 0.012 * halfH
      const tz = az + (oz * cos - ox * sin) * reach

      // each crystal leaves a little after the one before it, so a morph ripples
      const lead = Math.min(1, Math.max(0, morph.t * 1.45 - (i / CRYSTALS) * 0.45))
      const k = lead * lead * (3 - 2 * lead)
      const x = swarmFrom[j] + (tx - swarmFrom[j]) * k
      const y = swarmFrom[j + 1] + (ty - swarmFrom[j + 1]) * k
      const z = swarmFrom[j + 2] + (tz - swarmFrom[j + 2]) * k
      swarmNow[j] = x
      swarmNow[j + 1] = y
      swarmNow[j + 2] = z

      dummy.position.set(x, y, z)
      dummy.rotation.set(i * 1.3 + time * (0.2 + noise(i, 2) * 0.5), i * 2.1 + time * (0.15 + noise(i, 3) * 0.4), 0)
      dummy.scale.setScalar(halfH * 0.03 * (0.55 + noise(i, 4) * 0.9) * sizeNow)
      dummy.updateMatrix()
      swarm.setMatrixAt(i, dummy.matrix)
    }
    swarm.instanceMatrix.needsUpdate = true

    sigil.visible = sigilShow.k > 0.001
    if (sigil.visible) {
      sigil.position.set(ax, ay, az)
      sigil.scale.setScalar(reach * 0.17 * sigilShow.k)
      sigil.rotation.y += dt * 0.5
    }
  }

  const buildBloom = async () => {
    const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] = await Promise.all([
      import('three/examples/jsm/postprocessing/EffectComposer.js'),
      import('three/examples/jsm/postprocessing/RenderPass.js'),
      import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
      import('three/examples/jsm/postprocessing/OutputPass.js'),
    ])
    const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 })
    composer = new EffectComposer(renderer, target)
    composer.addPass(new RenderPass(scene, camera))
    // high threshold: only the eyes and the hottest glints bleed
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.36, 0.6, 1.3))
    composer.addPass(new OutputPass())
  }

  /** Put a built creature on the stage, parked until the page calls for it. */
  const enlist = (actor, creature) => {
    const rig = new THREE.Group()
    rig.rotation.order = 'YXZ'
    rig.add(creature.group)
    rig.visible = false
    scene.add(rig)
    actor.creature = creature
    actor.rig = rig
    fitFree(actor)
  }

  /** Build the code-made creatures one at a time, between frames, without holding up the page. */
  const buildLater = async () => {
    for (const name of LATER) {
      await new Promise((resolve) => setTimeout(resolve, 120))
      if (disposed) return
      try {
        if (!load(name)) continue
        const { createCreature } = await load(name)()
        const creature = await createCreature(THREE, { envMap, lite })
        if (disposed) return creature.dispose?.()
        enlist(actors[name], creature)
        // compile its shaders now, so its first appearance does not stutter
        const rig = actors[name].rig
        rig.visible = true
        await renderer.compileAsync(rig, camera, scene).catch(() => {})
        rig.visible = actors[name].pose.show > 0
      } catch (err) {
        // the page reads the same without it: its band simply stays empty sky
        console.warn(`[world] ${name} could not be built`, err)
      }
    }
  }

  const disposeTree = (object) => {
    object.traverse((child) => {
      child.geometry?.dispose?.()
      const mats = Array.isArray(child.material) ? child.material : child.material ? [child.material] : []
      for (const m of mats) {
        for (const value of Object.values(m)) {
          if (value && value.isTexture) value.dispose()
        }
        m.dispose?.()
      }
    })
  }

  const dispose = () => {
    if (disposed) return
    disposed = true
    gsap.ticker.remove(tick)
    window.removeEventListener('pointermove', onWindowPointerMove)
    resizeObserver?.disconnect()
    for (const actor of cast) actor.creature?.dispose?.()
    if (scene) disposeTree(scene)
    scene?.background?.dispose?.()
    disposeEnv?.()
    composer?.dispose()
    renderer?.dispose()
  }

  const start = async () => {
    try {
      const [three, { createCreature: createDragon }] = await Promise.all([import('three'), load('dragon')()])
      if (disposed) return
      THREE = three

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: lite, // the bloom chain brings its own multisampled target
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.75))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 0.96

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 80)
      camera.position.set(0, 0, CAMERA_Z)
      buildSky()

      lights = createLightRig(THREE, { lite })
      scene.add(lights.group)

      const env = await createEnvironment(renderer, THREE)
      if (disposed) return env.dispose()
      disposeEnv = env.dispose
      envMap = env.envMap

      const dragon = await createDragon(THREE, { envMap, lite, modelUrl, onProgress })
      if (disposed) return
      measure()
      enlist(actors.dragon, dragon)

      buildSwarm()
      if (!lite) await buildBloom()
      if (disposed) return

      measure()
      // start already in place: there is no "before" to morph from on the first frame
      drawSwarm(0, 0)
      swarmFrom.set(swarmNow)
      resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(canvas)
      window.addEventListener('pointermove', onWindowPointerMove, { passive: true })

      ready = true
      gsap.ticker.add(tick)
      onProgress(1)
      onReady()
      buildLater()
    } catch (err) {
      onError(err)
      dispose()
    }
  }

  start()

  return {
    /** name -> { pose }: tween the pose, the world follows. */
    actors,
    bindDrag,
    dispose,
    /**
     * Give an actor a box on the page to ride while its pose.stage is above 0.
     * @param {string} name
     * @param {{ left: number, top: number, width: number, height: number, fixed?: boolean, clipTop?: number, minHeight?: number }} box
     *   px. top is measured from the top of the document, or of the screen when fixed is set.
     *   clipTop: the creature stays below this screen line as the box scrolls up under it.
     */
    setBox(name, box) {
      if (actors[name]) actors[name].box = box
    },
    /** @param {number} progress 0..1 down the page  @param {number} velocity -1..1, sign = direction */
    setScroll(progress, velocity) {
      scrollProgress = progress
      scrollVelocity = Math.max(-1, Math.min(1, velocity))
    },
    /**
     * Morph the crystal swarm into a chapter's shape (see formations.js).
     * Safe to call mid-morph: it always starts from where the crystals are now.
     * @param {{ shape: string, x: number, y: number, z?: number, spin?: number, spread?: number, size?: number, follow?: string }} next
     */
    setFormation(next, duration = 2) {
      const target = { z: 0, spin: 0, spread: 1, size: 1, follow: null, ...next }
      if (!ready) {
        formation = target
        return
      }
      swarmFrom.set(swarmNow)
      sizeFrom = sizeNow
      formation = target
      formationAngle = 0
      gsap.fromTo(morph, { t: 0 }, { t: 1, duration, ease: 'power2.inOut', overwrite: true })
      gsap.to(sigilShow, {
        k: target.shape === 'world' ? 1 : 0,
        duration: target.shape === 'world' ? 1.6 : 0.5,
        delay: target.shape === 'world' ? duration * 0.6 : 0,
        ease: 'expo.out',
        overwrite: true,
      })
    },
    /** Stop rendering while nothing of the layer can be seen. */
    setVisible(on) {
      visible = on
    },
  }
}
