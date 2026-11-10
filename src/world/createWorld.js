/**
 * The night sky, the dragon and the crystal swarm, as one full-viewport WebGL
 * layer behind the page.
 *
 * The page never talks to three.js directly. It tweens `pose` (where the
 * dragon sits, in screen terms) with GSAP and feeds scroll progress in; this
 * module reads those every tick of GSAP's ticker, the same clock that drives
 * Lenis and ScrollTrigger.
 */
import gsap from 'gsap'

import { applyHideMaterials, createEnvironment, createLightRig } from './dragonLook.js'
import { buildFormations } from './formations.js'

const CAMERA_Z = 8
const FOV = 30
const TAU = Math.PI * 2

const DRAG_SPEED = 0.0075 // rad per px
const PITCH_LIMIT = 1.1
const FLICK_FRICTION = 2.6
const REST_AFTER_S = 1.4 // a spun dragon turns back to its perch after this long

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{
 *   lite?: boolean,
 *   modelUrl: string,
 *   onProgress?: (ratio: number) => void,
 *   onReady?: () => void,
 *   onError?: (err: unknown) => void,
 * }} options lite = phone build: smaller model, no bloom, cheaper material
 */
export function createWorld(canvas, options) {
  const { lite = false, modelUrl, onProgress = () => {}, onReady = () => {}, onError = () => {} } = options

  /** x, y: dragon centre in half-viewports (-1..1). scale 1 = hero size. Angles in radians. */
  const pose = { x: 0, y: 0, scale: 1, yaw: 0, pitch: 0, roll: 0 }

  let THREE = null
  let renderer = null
  let scene = null
  let camera = null
  let composer = null
  let rig = null
  let lights = null
  let mixer = null
  let starGroup = null
  let starLayers = []
  let disposeEnv = null
  let modelSize = null
  let resizeObserver = null

  let disposed = false
  let ready = false
  let visible = true
  let flapping = true

  let halfW = 1
  let halfH = 1
  let baseScale = 1
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
  let formation = { shape: 'drift', x: 0, y: 0, spin: 0, spread: 1, size: 1 }
  let formationAngle = 0

  let hoverX = 0
  let hoverY = 0
  let easedHoverX = 0
  let easedHoverY = 0

  let dragYaw = 0
  let dragPitch = 0
  let velYaw = 0
  let velPitch = 0
  let dragging = false
  let lastDragTime = -Infinity
  let clock = 0
  let starDrift = 0

  // frame-time watch: drop the bloom pass on machines that cannot hold it
  let sampled = 0
  let sampledMs = 0

  const measure = () => {
    if (!renderer || !camera) return
    const w = Math.max(1, canvas.clientWidth)
    const h = Math.max(1, canvas.clientHeight)
    renderer.setSize(w, h, false)
    composer?.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    halfH = Math.tan((FOV * Math.PI) / 360) * CAMERA_Z
    halfW = halfH * camera.aspect
    if (!modelSize) return
    // Portrait screens let the wings run off the sides so the body stays big;
    // landscape keeps the whole animal inside the right half of the stage.
    const portrait = camera.aspect < 0.8
    const widthShare = portrait ? 1.12 : 0.6
    const heightShare = portrait ? 0.44 : 0.84
    const flapHeadroom = 1.35 // the rest pose is shorter than the raised-wing pose
    baseScale = Math.min(
      (2 * halfW * widthShare) / modelSize.x,
      (2 * halfH * heightShare) / (modelSize.y * flapHeadroom),
    )
  }

  const tick = (time, deltaMs) => {
    if (disposed || !ready || !visible) return
    const dt = Math.min(deltaMs / 1000, 0.05)
    clock = time

    if (flapping) mixer.update(dt)

    const follow = 1 - Math.exp(-6 * dt)
    easedHoverX += (hoverX - easedHoverX) * follow
    easedHoverY += (hoverY - easedHoverY) * follow
    bank += (scrollVelocity - bank) * (1 - Math.exp(-5 * dt))

    if (!dragging) {
      dragYaw += velYaw * dt
      dragPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, dragPitch + velPitch * dt))
      const decay = Math.exp(-FLICK_FRICTION * dt)
      velYaw *= decay
      velPitch *= decay
      if (time - lastDragTime > REST_AFTER_S) {
        const back = 1 - Math.exp(-1.8 * dt)
        const restYaw = Math.round(dragYaw / TAU) * TAU // nearest full turn, never unwinds
        dragYaw += (restYaw - dragYaw) * back
        dragPitch -= dragPitch * back
      }
    }

    const s = baseScale * pose.scale
    rig.position.set(pose.x * halfW, pose.y * halfH, 0)
    rig.scale.setScalar(s)
    rig.rotation.set(
      pose.pitch + easedHoverY * 0.07 + dragPitch + bank * 0.2,
      pose.yaw + easedHoverX * 0.12 + dragYaw,
      pose.roll - bank * 0.05,
    )

    lights.group.position.copy(rig.position)
    lights.group.scale.setScalar(s)
    if (Math.abs(s - shadowScale) > shadowScale * 0.02) {
      shadowScale = s
      lights.fitShadow(s)
    }

    drawSwarm(time, dt)

    starGroup.position.y = scrollProgress * 2.4
    if (flapping) {
      starDrift += dt * 0.003
      starGroup.rotation.z = starDrift
      starLayers[0].material.opacity = 0.78 + 0.22 * Math.sin(time * 0.9)
      starLayers[1].material.opacity = 0.78 - 0.22 * Math.sin(time * 0.9)
    }

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
   * Let an element act as the dragon's handle: drag spins it, a flick keeps it
   * turning, double-click snaps it back. Vertical touch scroll passes through.
   * @returns {() => void} unbind
   */
  const bindDrag = (el) => {
    let pointerId = null
    let lastX = 0
    let lastY = 0
    let lastT = 0

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      dragging = true
      pointerId = e.pointerId
      lastX = e.clientX
      lastY = e.clientY
      lastT = e.timeStamp
      velYaw = 0
      velPitch = 0
      el.setPointerCapture?.(e.pointerId)
      el.classList.add('is-grabbing')
    }
    const move = (e) => {
      if (!dragging || e.pointerId !== pointerId) return
      const dx = (e.clientX - lastX) * DRAG_SPEED
      const dy = (e.clientY - lastY) * DRAG_SPEED
      const dt = Math.max(1, e.timeStamp - lastT) / 1000
      dragYaw += dx
      dragPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, dragPitch + dy))
      velYaw = dx / dt
      velPitch = dy / dt
      lastX = e.clientX
      lastY = e.clientY
      lastT = e.timeStamp
    }
    const up = (e) => {
      if (e.pointerId !== pointerId) return
      dragging = false
      pointerId = null
      lastDragTime = clock
      el.classList.remove('is-grabbing')
    }
    const reset = () => {
      velYaw = 0
      velPitch = 0
      lastDragTime = -Infinity
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
      dragging = false
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

  const buildSwarm = (envMap) => {
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
    if (flapping) formationAngle += formation.spin * dt
    const cos = Math.cos(formationAngle)
    const sin = Math.sin(formationAngle)
    const offsets = formations[formation.shape]
    const reach = halfH * formation.spread
    const ax = formation.x * halfW
    const ay = formation.y * halfH
    sizeNow = sizeFrom + (formation.size - sizeFrom) * morph.t

    for (let i = 0; i < CRYSTALS; i += 1) {
      const j = i * 3
      // where this crystal belongs in the current shape, turned about the vertical axis
      const ox = offsets[j]
      const oz = offsets[j + 2]
      const tx = ax + (ox * cos + oz * sin) * reach
      const ty = ay + offsets[j + 1] * reach + Math.sin(time * 0.6 + i) * 0.012 * halfH
      const tz = (oz * cos - ox * sin) * reach

      // each crystal leaves a little after the one before it, so a morph ripples
      const lead = Math.min(1, Math.max(0, morph.t * 1.45 - (i / CRYSTALS) * 0.45))
      const k = lead * lead * (3 - 2 * lead)
      const x = swarmFrom[j] + (tx - swarmFrom[j]) * k
      const y = swarmFrom[j + 1] + (ty - swarmFrom[j + 1]) * k
      const z = swarmFrom[j + 2] + (tz - swarmFrom[j + 2]) * k
      swarmNow[j] = x
      swarmNow[j + 1] = y
      swarmNow[j + 2] = z

      const turn = flapping ? time : 0
      dummy.position.set(x, y, z)
      dummy.rotation.set(i * 1.3 + turn * (0.2 + noise(i, 2) * 0.5), i * 2.1 + turn * (0.15 + noise(i, 3) * 0.4), 0)
      dummy.scale.setScalar(halfH * 0.03 * (0.55 + noise(i, 4) * 0.9) * sizeNow)
      dummy.updateMatrix()
      swarm.setMatrixAt(i, dummy.matrix)
    }
    swarm.instanceMatrix.needsUpdate = true

    sigil.visible = sigilShow.k > 0.001
    if (sigil.visible) {
      sigil.position.set(ax, ay, 0)
      sigil.scale.setScalar(halfH * 0.17 * formation.spread * sigilShow.k)
      if (flapping) sigil.rotation.y += dt * 0.5
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
    // high threshold: only the eyes and the hottest glints on the scales bleed
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.36, 0.6, 1.3))
    composer.addPass(new OutputPass())
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
    mixer?.stopAllAction()
    if (scene) disposeTree(scene)
    scene?.background?.dispose?.()
    disposeEnv?.()
    composer?.dispose()
    renderer?.dispose()
  }

  const start = async () => {
    try {
      const [three, { GLTFLoader }, { DRACOLoader }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/loaders/DRACOLoader.js'),
      ])
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

      const draco = new DRACOLoader()
      draco.setDecoderPath('/draco/')
      const loader = new GLTFLoader()
      loader.setDRACOLoader(draco)
      const gltf = await new Promise((resolve, reject) => {
        loader.load(
          modelUrl,
          resolve,
          (e) => {
            if (e.lengthComputable && e.total > 0) onProgress(Math.min(1, e.loaded / e.total))
          },
          reject,
        )
      })
      draco.dispose()
      if (disposed) return

      const model = gltf.scene
      applyHideMaterials(model, THREE, { envMap: env.envMap, lite })
      // Rest-pose bounds only: Box3.setFromObject also swallows every morph
      // target, which inflates the box by the whole flap and shrinks the fit.
      model.updateMatrixWorld(true)
      const box = new THREE.Box3()
      const part = new THREE.Box3()
      model.traverse((child) => {
        if (!child.isMesh) return
        part.setFromBufferAttribute(child.geometry.attributes.position).applyMatrix4(child.matrixWorld)
        box.union(part)
      })
      modelSize = box.getSize(new THREE.Vector3())
      model.position.sub(box.getCenter(new THREE.Vector3()))
      rig = new THREE.Group()
      rig.rotation.order = 'YXZ'
      rig.add(model)
      scene.add(rig)

      // baked flight cycle: wing flap, body bob, tail sway
      mixer = new THREE.AnimationMixer(model)
      if (gltf.animations.length) mixer.clipAction(gltf.animations[0]).play()

      buildSwarm(env.envMap)
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
    } catch (err) {
      onError(err)
      dispose()
    }
  }

  start()

  return {
    pose,
    bindDrag,
    dispose,
    /** @param {number} progress 0..1 down the page  @param {number} velocity -1..1, sign = direction */
    setScroll(progress, velocity) {
      scrollProgress = progress
      scrollVelocity = Math.max(-1, Math.min(1, velocity))
    },
    /**
     * Morph the crystal swarm into a chapter's shape (see formations.js).
     * Safe to call mid-morph: it always starts from where the crystals are now.
     * @param {{ shape: string, x: number, y: number, spin?: number, spread?: number, size?: number }} next
     */
    setFormation(next, duration = 2) {
      const target = { spin: 0, spread: 1, size: 1, ...next }
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
    /** Pause the flap, the crystal spin and the star twinkle (the page's motion switch). */
    setFlapping(on) {
      flapping = on
    },
    /** Stop rendering while nothing of the layer can be seen. */
    setVisible(on) {
      visible = on
    },
  }
}
