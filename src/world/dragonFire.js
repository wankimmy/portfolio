/**
 * The dragon's breath, built on the flame module (flame.js).
 *
 * A tight white-hot jet leaves the lips and, within a body length, turns
 * turbulent: a hot core runs down the middle, an envelope of cooler, larger
 * puffs billows round it and opens into a cone that curls upward. Late in the
 * breath the far end breaks into detached wisps, and smoke drifts up from it.
 * Around the stream: a soft heat glow at the mouth, fast sparks thrown out
 * along the aim (streaked along their velocity, arcing and dying), embers that
 * drift up afterwards, and motes drawn in before the breath.
 *
 * Everything lives in the creature's group space, so the fire stays where it
 * was sent when the body turns back. `room` (move.room, 0..1) says how much
 * vertical space the page leaves: with little room the cone is slimmer and
 * aimed level, and the puffs fade out before the band's top and bottom lines.
 *
 * Nothing allocates per frame: the pools are typed arrays and the vectors are
 * reused. The randomness is a seeded LCG, so a replay of the same act() gives
 * the same fire.
 */
import { createFlame } from './flame.js'

const FLAME_DESKTOP = 300
const FLAME_LITE = 110
const SPARK_DESKTOP = 56
const SPARK_LITE = 18
const FLAME_RATE = 170 // envelope and core puffs per second at full breath (desktop)
const LITE_RATE = 0.4 // lite spawns this share of the desktop rate
const SPARK_RATE = 30 // sparks per second at full breath (desktop)
const MOTE_RATE = 34 // motes drawn in per second while gathering (desktop)
const EMBER_RATE = 9 // embers per second while the breath gutters and after
const SMOKE_RATE = 2.5 // smoke puffs per second at the far end of a strong breath
const SPARK_GRAVITY = 3.2
const DRAG = 1.7

const SEED = 0x2f6b1d

const clamp = (x, lo, hi) => (x < lo ? lo : x > hi ? hi : x)
const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const lerp = (a, b, t) => a + (b - a) * t

/** A soft round sprite texture, white to clear. */
function glowTexture(THREE) {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,0.9)')
  g.addColorStop(0.2, 'rgba(255,255,255,0.45)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.12)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(canvas)
}

/**
 * @param {typeof import('three')} THREE
 * @param {{ lite?: boolean }} [options]
 */
export function createFire(THREE, { lite = false } = {}) {
  const FLAME_N = lite ? FLAME_LITE : FLAME_DESKTOP
  const SPARK_N = lite ? SPARK_LITE : SPARK_DESKTOP
  const k = lite ? LITE_RATE : 1

  const group = new THREE.Group()
  group.visible = false

  // ---- the flame itself: puffs for the stream, the cone, motes and smoke
  const flame = createFlame(THREE, { count: FLAME_N, lite, drag: DRAG, turbulence: 1, buoyancy: 1 })
  group.add(flame.mesh)

  // ---- sparks and embers: small streaked shards, additive, HDR colour
  const sparkGeo = new THREE.TetrahedronGeometry(1, 0)
  const sparkMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  })
  const sparks = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_N)
  sparks.frustumCulled = false
  sparks.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const black = new THREE.Color(0, 0, 0)
  for (let i = 0; i < SPARK_N; i++) sparks.setColorAt(i, black)
  sparks.instanceColor.setUsage(THREE.DynamicDrawUsage)
  group.add(sparks)

  const sx = new Float32Array(SPARK_N)
  const sy = new Float32Array(SPARK_N)
  const sz = new Float32Array(SPARK_N)
  const svx = new Float32Array(SPARK_N)
  const svy = new Float32Array(SPARK_N)
  const svz = new Float32Array(SPARK_N)
  const sage = new Float32Array(SPARK_N)
  const slife = new Float32Array(SPARK_N) // 0 = dead
  const ssize = new Float32Array(SPARK_N)
  const skind = new Uint8Array(SPARK_N) // 0 spark, 1 ember
  const sseed = new Float32Array(SPARK_N)

  // ---- glow at the mouth
  const tex = glowTexture(THREE)
  const mouthMat = new THREE.SpriteMaterial({
    map: tex,
    color: new THREE.Color(2.6, 1.4, 0.5),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  })
  const mouthSprite = new THREE.Sprite(mouthMat)
  mouthSprite.frustumCulled = false
  mouthSprite.visible = false
  group.add(mouthSprite)

  // ---- reused scratch, so nothing allocates per frame
  const origin = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const right = new THREE.Vector3()
  const up = new THREE.Vector3()
  const upAxis = new THREE.Vector3(0, 1, 0)
  const mtx = new THREE.Matrix4()
  const quat = new THREE.Quaternion()
  const alignQ = new THREE.Quaternion()
  const pos = new THREE.Vector3()
  const scl = new THREE.Vector3()
  const scratch = new THREE.Vector3()
  const Z_AXIS = new THREE.Vector3(0, 0, 1)
  const col = new THREE.Color()

  // a seeded LCG: deterministic, cheap, no Math.random
  let rng = SEED
  const rand = () => {
    rng = (Math.imul(rng, 1664525) + 1013904223) >>> 0
    return rng / 4294967296
  }

  let sparkCursor = 0
  let flameAcc = 0
  let sparkAcc = 0
  let moteAcc = 0
  let emberAcc = 0
  let smokeAcc = 0

  const killSpark = (i) => {
    slife[i] = 0
    ssize[i] = 0
    mtx.makeScale(0, 0, 0)
    sparks.setMatrixAt(i, mtx)
  }
  for (let i = 0; i < SPARK_N; i++) killSpark(i)

  const emitSpark = (x, y, z, dx, dy, dz, size, life, kind) => {
    const i = sparkCursor
    sparkCursor = (sparkCursor + 1) % SPARK_N
    sx[i] = x
    sy[i] = y
    sz[i] = z
    svx[i] = dx
    svy[i] = dy
    svz[i] = dz
    sage[i] = 0
    slife[i] = life
    ssize[i] = size
    skind[i] = kind
    sseed[i] = rand()
  }

  /**
   * One puff of the breath. Envelope and core share the stream; the core is
   * tighter, hotter and smaller, the envelope wider, cooler and bigger.
   */
  const spawnBreath = (breath, bt, room) => {
    const opening = smooth(0, 1.1, bt)
    const spread = (0.03 + 0.3 * opening) * (0.45 + 0.55 * room)
    const u = rand() * 2 - 1
    const v = rand() * 2 - 1
    // the jet at the lips is mostly core; the core thins out as the stream opens
    const core = rand() < 0.42 * (1 - 0.6 * opening)
    let lat
    let speed
    let heat
    let size
    let life
    if (core) {
      // the hot core: small, fast, white-hot only at the lips; it cools as it leaves
      lat = 0.02 + spread * 0.25
      speed = 4.8 * (0.9 + 0.2 * rand()) * (0.85 + 0.25 * breath)
      heat = 0.8 + 0.1 * rand()
      size = 0.05 + 0.03 * rand()
      life = 0.75 + 0.35 * rand()
    } else {
      // the envelope: larger, cooler orange puffs that billow round the core and let it show through
      lat = spread * (0.6 + 0.8 * rand())
      speed = 3.7 * (0.8 + 0.4 * rand()) * (0.85 + 0.25 * breath)
      heat = 0.3 + 0.32 * rand()
      size = 0.1 + 0.08 * rand() * (0.5 + opening)
      life = 1.0 + 0.5 * rand()
    }
    // the far end of a long breath runs cooler and shorter-lived: wisps
    if (bt > 0.9) {
      heat *= 1 - 0.25 * smooth(0.9, 1.5, bt)
      life *= 1 - 0.2 * smooth(0.9, 1.5, bt)
    }
    // the top edge tongues curl up: a little extra lift on the upper half
    const lift = Math.max(0, v) * lat * speed * 0.8 + 0.12 * opening
    const vxo = dir.x * speed + (right.x * u + up.x * v) * lat * speed + up.x * lift
    const vyo = dir.y * speed + (right.y * u + up.y * v) * lat * speed + up.y * lift
    const vzo = dir.z * speed + (right.z * u + up.z * v) * lat * speed + up.z * lift
    flame.emit(
      origin.x + right.x * u * 0.04 + up.x * v * 0.04,
      origin.y + right.y * u * 0.04 + up.y * v * 0.04,
      origin.z + right.z * u * 0.04 + up.z * v * 0.04,
      vxo,
      vyo,
      vzo,
      size,
      life,
      heat,
    )
  }

  /** A spark along the aim: fast, thin, arcing under gravity. */
  const spawnSpark = (breath) => {
    const u = rand() * 2 - 1
    const v = rand() * 2 - 1
    const speed = 5.5 + 4.5 * rand()
    const lat = 0.6 + 1.2 * rand()
    emitSpark(
      origin.x,
      origin.y,
      origin.z,
      dir.x * speed + (right.x * u + up.x * v) * lat,
      dir.y * speed + (right.y * u + up.y * v) * lat,
      dir.z * speed + (right.z * u + up.z * v) * lat,
      0.011 + 0.009 * rand() * (0.6 + 0.4 * breath),
      0.35 + 0.45 * rand(),
      0,
    )
  }

  /** An ember: slow, drifting up from the cone, cooling to nothing. */
  const spawnEmber = (ember) => {
    const d = 0.6 + 2.0 * rand()
    const s = (rand() - 0.5) * 1.6
    emitSpark(
      origin.x + dir.x * d + right.x * s,
      origin.y + dir.y * d + right.y * s,
      origin.z + dir.z * d + right.z * s,
      dir.x * 0.4 + (rand() - 0.5) * 0.7,
      0.45 + 0.6 * rand(),
      dir.z * 0.4 + (rand() - 0.5) * 0.7,
      0.022 + 0.02 * rand() * ember,
      1.8 + 0.9 * rand(),
      1,
    )
  }

  /** A mote, drawn in from around the mouth to the lips before the breath. */
  const spawnMote = () => {
    const x = rand() * 2 - 1
    const y = rand() * 2 - 1
    const z = rand() * 2 - 1
    const r = 0.6 + 0.45 * rand()
    const px = origin.x + x * r
    const py = origin.y + y * r
    const pz = origin.z + z * r
    const life = 0.45 + 0.15 * rand()
    flame.emit(px, py, pz, ((origin.x - px) / life) * 0.85, ((origin.y - py) / life) * 0.85, ((origin.z - pz) / life) * 0.85, 0.015 + 0.01 * rand(), life, 1)
  }

  /** Smoke: big, cool puffs that rise off the far end of the cone. */
  const spawnSmoke = (far, rise) => {
    const s = (rand() - 0.5) * 0.5
    const life = 2.2 + 0.8 * rand()
    flame.emit(
      far.x + right.x * s,
      far.y + right.y * s,
      far.z + right.z * s,
      dir.x * 0.3 + (rand() - 0.5) * 0.4,
      0.35 + rise * 0.3 + rand() * 0.25,
      dir.z * 0.3 + (rand() - 0.5) * 0.4,
      0.14 + 0.1 * rand(),
      life,
      0.02 + 0.06 * rand(),
    )
  }

  const farPoint = new THREE.Vector3()

  return {
    group,
    mouthSprite,

    /** Drop everything (used when the creature is disposed or reset). */
    reset() {
      flame.clear()
      for (let i = 0; i < SPARK_N; i++) killSpark(i)
      sparks.instanceMatrix.needsUpdate = true
      flameAcc = sparkAcc = moteAcc = emberAcc = smokeAcc = 0
      mouthMat.opacity = 0
      mouthSprite.visible = false
      group.visible = false
    },

    /** Start a new move from the same seed, so the same act() gives the same fire. */
    seed() {
      rng = SEED
      flame.seed()
    },

    /**
     * Advance the fire one frame.
     * @param {number} dt seconds, <= 0.05
     * @param {import('three').Object3D} body the body that turns (parent of the model)
     * @param {import('three').Vector3} mouth the mouth, in body space
     * @param {import('three').Vector3} forward the fire's aim, in body space (unit)
     * @param {{ active: number, gather: number, breath: number, breathT: number, ember: number, glow: number, aim: number, room: number }} move the move's state
     * @param {number} [top] highest y the page allows, in the group's space (Infinity: no limit)
     * @param {number} [bottom] lowest y the page allows, in the group's space (-Infinity: no limit)
     * @param {number} [time] the creature's own clock in seconds: it drives the flame's scroll, so the fire keeps moving between moves
     */
    update(dt, body, mouth, forward, move, top = Infinity, bottom = -Infinity, time = 0) {
      body.updateMatrix()
      origin.copy(mouth).applyMatrix4(body.matrix)
      dir.copy(forward).applyQuaternion(body.quaternion).normalize()
      // the turn lifts the aim toward the upper left of the page, but only with room above
      const roomF = clamp(move.lift === undefined ? move.room : move.lift, 0, 1)
      dir.y += 0.9 * move.aim * roomF * roomF
      dir.normalize()
      right.crossVectors(dir, upAxis)
      if (right.lengthSq() < 1e-6) right.set(1, 0, 0)
      right.normalize()
      up.crossVectors(right, dir).normalize()
      // the head sweeps a few degrees side to side as it pushes through
      const sweep = Math.sin(move.breathT * 2.1) * 0.06 * move.breath
      dir.addScaledVector(right, sweep).normalize()
      farPoint.copy(origin).addScaledVector(dir, 2.0)

      // ---- emission
      const room = clamp(move.room, 0, 1)
      if (move.gather > 0.001) {
        moteAcc += dt * MOTE_RATE * k * move.gather
        while (moteAcc >= 1) {
          moteAcc -= 1
          spawnMote()
        }
      }
      if (move.breath > 0.02) {
        flameAcc += dt * FLAME_RATE * k * move.breath
        while (flameAcc >= 1) {
          flameAcc -= 1
          spawnBreath(move.breath, move.breathT, room)
        }
        sparkAcc += dt * SPARK_RATE * k * move.breath
        while (sparkAcc >= 1) {
          sparkAcc -= 1
          spawnSpark(move.breath)
        }
        const farShare = smooth(0.6, 1.2, move.breathT)
        smokeAcc += dt * SMOKE_RATE * k * move.breath * farShare
        while (smokeAcc >= 1) {
          smokeAcc -= 1
          spawnSmoke(farPoint, 0.5)
        }
      }
      if (move.ember > 0.001) {
        emberAcc += dt * EMBER_RATE * k * move.ember
        while (emberAcc >= 1) {
          emberAcc -= 1
          spawnEmber(move.ember)
        }
        smokeAcc += dt * SMOKE_RATE * 0.5 * k * move.ember
        while (smokeAcc >= 1) {
          smokeAcc -= 1
          spawnSmoke(farPoint, 1)
        }
      }

      // ---- the flame
      flame.update(dt, time, top, bottom)

      // ---- sparks and embers
      let alive = 0
      for (let i = 0; i < SPARK_N; i++) {
        const L = slife[i]
        if (L <= 0) continue
        const a = sage[i] + dt
        if (a >= L) {
          killSpark(i)
          continue
        }
        sage[i] = a
        alive++
        const f = a / L
        const isEmber = skind[i] === 1
        const drag = isEmber ? 1.2 : 0.9
        const damp = Math.max(0, 1 - drag * dt)
        svx[i] *= damp
        svy[i] *= damp
        svz[i] *= damp
        // sparks fall and arc; embers float
        svy[i] += (isEmber ? 0.5 : -SPARK_GRAVITY) * dt
        sx[i] += svx[i] * dt
        sy[i] += svy[i] * dt
        sz[i] += svz[i] * dt
        // the page limits: a spark or ember fades out over the last stretch before a line, never pops
        // and one that flies at the viewer fades before it grows into a slab on the lens
        const edge = Math.min(clamp((top - sy[i]) / 0.25, 0, 1), clamp((sy[i] - bottom) / 0.25, 0, 1)) * clamp((1.0 - sz[i]) / 0.5, 0, 1)
        if (edge <= 0) {
          killSpark(i)
          continue
        }
        const s = ssize[i] * Math.min(1, a / 0.03) * (1 - f * f * 0.6) * edge
        if (isEmber) {
          col.setRGB(lerp(2.2, 0.7, f), lerp(0.85, 0.12, f), lerp(0.2, 0.02, f))
          col.multiplyScalar(1 - f * f)
        } else {
          const flick = 0.85 + 0.15 * Math.sin(a * 53 + sseed[i] * 9)
          col.setRGB(lerp(2.4, 1.9, f), lerp(1.4, 0.7, f), lerp(0.45, 0.12, f))
          col.multiplyScalar(flick * (1 - f * f))
        }
        pos.set(sx[i], sy[i], sz[i])
        scratch.set(svx[i], svy[i], svz[i])
        const speed = scratch.length()
        if (speed > 1e-4) {
          alignQ.setFromUnitVectors(Z_AXIS, scratch.multiplyScalar(1 / speed))
          quat.copy(alignQ)
        } else {
          quat.identity()
        }
        // a spark streaks with its speed; an ember stays round
        // a spark streaks a little with its speed, never into a hard bar
        const stretch = isEmber ? 1 : Math.min(7, 1.5 + 0.7 * speed)
        scl.set(s, s, s * stretch)
        mtx.compose(pos, quat, scl)
        sparks.setMatrixAt(i, mtx)
        sparks.setColorAt(i, col)
      }
      sparks.instanceMatrix.needsUpdate = true
      if (sparks.instanceColor) sparks.instanceColor.needsUpdate = true

      // ---- glow at the lips
      const flick = 0.85 + 0.15 * Math.sin(move.breathT * 29)
      const mouthOp = clampOp(0.25 * move.breath * flick + move.gather * 0.15)
      const glowR = 0.14 + 0.1 * move.breath + 0.12 * move.gather
      // the glow stays inside the page's band too: it is hidden where it would cross a line
      const inBand = origin.y + glowR < top && origin.y - glowR > bottom
      mouthSprite.visible = mouthOp > 0.01 && inBand
      mouthSprite.position.copy(origin)
      mouthSprite.scale.setScalar(glowR)
      mouthMat.opacity = mouthOp

      group.visible = true
    },

    dispose() {
      flame.dispose()
      group.remove(sparks)
      sparkGeo.dispose()
      sparkMat.dispose()
      mouthMat.dispose()
      tex.dispose()
      group.removeFromParent()
    },
  }
}

const clampOp = (x) => Math.max(0, Math.min(1, x))
