/**
 * The dragon's flight, driven in code.
 *
 * The GLB ships six wing shapes (three hinges along each wing, each raised and
 * lowered) and two tail shapes. The clip baked beside them moved in straight
 * lines with a hold at both ends, which read as a puppet. Here every hinge
 * follows one smooth stroke: a quick push down, a slower recovery, and the
 * outer hinges a beat behind the shoulder so the tips trail the way a real
 * wing's do. The body rides the lift each stroke makes.
 *
 * On top of the beat sit three damped springs fed by how the dragon is being
 * moved (scroll, a flight to a new perch, a drag): the tail swings wide of a
 * turn and wobbles back, the body banks into sideways travel, and the wings
 * are pushed up by a drop and pressed down by a climb.
 *
 * The signature move (act) rides on the same beat. It is a timeline of about
 * 3.4 s: anticipation (wings up, chest lifts), the turn (snout to the upper
 * left of the screen), the breath (wings snap half down, body thrusts, the
 * fire leaves the mouth) and recovery (shake, back to the beat). It writes its
 * state into `move` for dragon.js to drive the fire and the glow.
 *
 * Room: the page's band is read every frame (motion.roomUp / roomDown). The
 * move's top edge is measured from sampled vertices of the wings and head,
 * posed the way the frame will pose them, and the wing overshoot is scaled back
 * toward the plain beat until that top sits inside the band. The lean and the
 * snout's upward tilt scale with the same room. Nothing is measured while the
 * move is not raising the wings, and the plain beat is never touched.
 */
const TAU = Math.PI * 2

// Hinge angles in degrees the shapes were modelled at: SEGMENTS in
// tools/build_hero_dragon_v4.py. Driving by angle keeps the wing's speed even
// where it passes from the raised shape to the lowered one.
const HINGES = [
  { tag: 'A', up: 21, down: 15, lag: 0 },
  { tag: 'B', up: 15, down: 10, lag: 0.075 },
  { tag: 'C', up: 11, down: 8, lag: 0.15 },
]
// the morph names, built once: the update runs every frame and must not allocate
const NAMES = HINGES.map((h) => ({ up: `FlapUp${h.tag}`, down: `FlapDown${h.tag}` }))
// the six wing keys in a flat order: up A, down A, up B, down B, up C, down C
const WING_KEYS = [NAMES[0].up, NAMES[0].down, NAMES[1].up, NAMES[1].down, NAMES[2].up, NAMES[2].down]
const WING_LIMIT = 1.45 // the morph weight never goes past this
// the camera's distance from the dragon, in the dragon's units (the page's camera is about 4 to 5.5 wingspans away)
const CAMERA_DEPTH = 4.5
const FIT_MARGIN = 0.94 // the measured top is held this far inside the band

const DOWNSTROKE = 0.42 // share of a beat spent pushing down
const HOVER_HZ = 0.72 // beats per second holding still
const TRAVEL_HZ = 1.25 // beats per second flying between perches
const BOB = 0.034 // body rise and fall, in model units (wingspan 2)
const NOD = 0.03 // radians the body pitches with each beat
const SAMPLES_TOP = 32 // vertices highest at rest (head, back) that can set the top edge
const SAMPLES_WING = 96 // vertices that rise furthest with every raised shape on
const SAMPLES_REACH = 128 // vertices furthest to the side, which a turn lifts
const SAMPLES_DEPTH = 64 // vertices furthest toward or away from the camera

// The move, in seconds from act(). Anticipation, turn, breath, recovery.
const TURN_AT = 0.6
const BREATH_AT = 1.0
const RECOVER_AT = 2.6
const MOVE_END = 3.4
const TURN_YAW = -1.38 // screen yaw the snout aims for: screen left, almost in profile, so the fire crosses the page and does not come at the viewer
const TURN_PITCH = 0.22 // and a little up

/** A damped spring: `x` chases `target`, overshoots a little and settles. */
const spring = (state, target, stiffness, damping, dt) => {
  state.v += (stiffness * (target - state.x) - damping * state.v) * dt
  state.x += state.v * dt
  return state.x
}
const clamp = (value, lo, hi) => Math.max(lo, Math.min(hi, value))
const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const wrapAngle = (a) => {
  let r = a % TAU
  if (r > Math.PI) r -= TAU
  if (r < -Math.PI) r += TAU
  return r
}
const STILL = { vx: 0, vy: 0, spin: 0, yaw: 0, pitch: 0 }

/** 0 = wings at the top, 1 = at the bottom. Zero speed at both ends. */
const stroke = (beat) => {
  const t = beat - Math.floor(beat)
  const half = t < DOWNSTROKE ? (t / DOWNSTROKE) * 0.5 : 0.5 + ((t - DOWNSTROKE) / (1 - DOWNSTROKE)) * 0.5
  return 0.5 - 0.5 * Math.cos(half * TAU)
}

/**
 * Picks the vertices that will show the top edge, from every vertex of the
 * model. Each vertex keeps its rest position in the body's space (the body is
 * still at identity when this runs: dragon.js resets it before any move) and
 * its displacement under each of the six wing shapes, so the top edge can be
 * measured for any pose with a few multiplications. Kept: the vertices highest
 * at rest (head and back) and the vertices that rise furthest with every raised
 * shape on (the wing tips and leading edges). Runs once, at creation.
 */
function sampleTop(model) {
  model.updateMatrixWorld(true)
  const K = WING_KEYS.length
  const meshes = []
  let total = 0
  model.traverse((child) => {
    if (!child.isMesh || !child.geometry?.attributes?.position) return
    meshes.push(child)
    total += child.geometry.attributes.position.count
  })

  const P = new Float32Array(total * 3)
  const D = new Float32Array(total * K * 3)
  const rise = new Float32Array(total) // the height with every raised shape fully on
  let n = 0
  for (const child of meshes) {
    const e = child.matrixWorld.elements
    const pos = child.geometry.attributes.position
    const dict = child.morphTargetInfluences ? child.morphTargetDictionary : null
    const morph = child.geometry.morphAttributes?.position
    const rel = child.geometry.morphTargetsRelative === true
    const keys = WING_KEYS.map((name) => (dict && morph && name in dict && morph[dict[name]] ? morph[dict[name]] : null))
    for (let v = 0; v < pos.count; v++, n++) {
      const x = pos.getX(v)
      const y = pos.getY(v)
      const z = pos.getZ(v)
      P[n * 3] = e[0] * x + e[4] * y + e[8] * z + e[12]
      P[n * 3 + 1] = e[1] * x + e[5] * y + e[9] * z + e[13]
      P[n * 3 + 2] = e[2] * x + e[6] * y + e[10] * z + e[14]
      let up = P[n * 3 + 1]
      for (let k = 0; k < K; k++) {
        const m = keys[k]
        if (!m) continue
        const dx = rel ? m.getX(v) : m.getX(v) - x
        const dy = rel ? m.getY(v) : m.getY(v) - y
        const dz = rel ? m.getZ(v) : m.getZ(v) - z
        const o = (n * K + k) * 3
        // the displacement in body space: the mesh's rotation and scale only
        D[o] = e[0] * dx + e[4] * dy + e[8] * dz
        D[o + 1] = e[1] * dx + e[5] * dy + e[9] * dz
        D[o + 2] = e[2] * dx + e[6] * dy + e[10] * dz
        // the up shapes (even keys) at full weight
        if (k % 2 === 0) up += D[o + 1]
      }
      rise[n] = up
    }
  }

  const order = new Array(total)
  for (let i = 0; i < total; i++) order[i] = i
  // the turned, pitched body lifts the far wing tips into the top edge, so the widest reach counts too
  const byRest = order.slice().sort((a, b) => P[b * 3 + 1] - P[a * 3 + 1]).slice(0, SAMPLES_TOP)
  const byUp = order.slice().sort((a, b) => rise[b] - rise[a]).slice(0, SAMPLES_WING)
  const byReach = order.slice().sort((a, b) => Math.abs(P[b * 3]) - Math.abs(P[a * 3])).slice(0, SAMPLES_REACH)
  const byDepth = order.slice().sort((a, b) => Math.abs(P[b * 3 + 2]) - Math.abs(P[a * 3 + 2])).slice(0, SAMPLES_DEPTH)
  const picked = byRest.concat(byUp, byReach, byDepth)

  const count = picked.length
  const Ps = new Float32Array(count * 3)
  const Ds = new Float32Array(count * K * 3)
  picked.forEach((src, s) => {
    Ps[s * 3] = P[src * 3]
    Ps[s * 3 + 1] = P[src * 3 + 1]
    Ps[s * 3 + 2] = P[src * 3 + 2]
    for (let k = 0; k < K; k++) {
      const o = (src * K + k) * 3
      const so = (s * K + k) * 3
      Ds[so] = D[o]
      Ds[so + 1] = D[o + 1]
      Ds[so + 2] = D[o + 2]
    }
  })
  return { count, P: Ps, D: Ds }
}

/**
 * @param {import('three').Object3D} model the loaded dragon
 * @param {import('three').Object3D} body a group around the model that takes the bob
 * @param {{ width?: number }} [options] width = the model's wingspan (its box width), in model units
 */
export function createFlight(model, body, { width = 2 } = {}) {
  // one mesh per material: each carries its own copy of the shape weights
  const skins = []
  model.traverse((child) => {
    const names = child.isMesh && child.morphTargetDictionary
    if (names && 'FlapUpA' in names) skins.push({ weights: child.morphTargetInfluences, names })
  })
  const top = sampleTop(model)

  let clock = 0
  let beat = 0
  let tail = 0
  const tailSwing = { x: 0, v: 0 }
  const bank = { x: 0, v: 0 }
  const flare = { x: 0, v: 0 }
  // scratch for the wing weights, reused every frame
  const wBase = new Float32Array(WING_KEYS.length)
  const wMove = new Float32Array(WING_KEYS.length)
  const wFinal = new Float32Array(WING_KEYS.length)

  // the signature move's state, read by dragon.js (fire and glow)
  const move = {
    active: 0, // 1 while the move plays
    t: 0, // seconds since act()
    gather: 0, // 0..1 motes drawn in before the breath
    breath: 0, // 0..1 strength of the fire leaving the mouth
    breathT: 0, // seconds into the breath, 0..1.6
    lick: 0, // 1 for the first instant of the breath: a cold lick at the lips
    ember: 0, // 0..1 embers drift up after the breath
    glow: 0, // 0..1 warm firelight on the body
    aim: 0, // 0..1 how far the snout is turned up toward the page's upper left
    room: 1, // 0..1 how much of the move the page's space above allows (1 = plenty)
    lift: 1, // 0..1 how far the fire is tipped up beyond the snout (0 when the page gives the aim)
  }

  /** The top edge of the body in its own space, for the wing weights in `w`, under the body's current pose. */
  const topEdge = (w) => {
    const e = body.matrix.elements
    const { count, P, D } = top
    const K = WING_KEYS.length
    let best = -Infinity
    for (let s = 0; s < count; s++) {
      let x = P[s * 3]
      let y = P[s * 3 + 1]
      let z = P[s * 3 + 2]
      for (let k = 0; k < K; k++) {
        const wk = w[k]
        if (wk === 0) continue
        const o = (s * K + k) * 3
        x += wk * D[o]
        y += wk * D[o + 1]
        z += wk * D[o + 2]
      }
      let h = e[1] * x + e[5] * y + e[9] * z + e[13]
      // the camera looks at the dragon from in front: a point turned toward it is drawn larger
      const depth = e[2] * x + e[6] * y + e[10] * z + e[14]
      if (h > 0 && depth < CAMERA_DEPTH - 1) h *= CAMERA_DEPTH / (CAMERA_DEPTH - depth)
      if (h > best) {
        best = h
      }
    }
    return best
  }

  const applyWings = (w) => {
    for (const skin of skins) {
      for (let k = 0; k < WING_KEYS.length; k++) {
        const idx = skin.names[WING_KEYS[k]]
        if (idx !== undefined) skin.weights[idx] = w[k]
      }
    }
  }

  const set = (name, value) => {
    for (const skin of skins) skin.weights[skin.names[name]] = value
  }

  return {
    move,

    /** Start the signature move. Ignored while it is already playing. */
    act() {
      if (move.active) return
      move.active = 1
      move.t = 0
    },

    /**
     * @param {number} dt seconds since the last frame
     * @param {number} energy 0 hovering .. 1 flying hard
     * @param {{ vx: number, vy: number, spin: number, yaw?: number, pitch?: number, roomUp?: number, roomDown?: number }} [motion] how the dragon itself is moving (createWorld.js)
     */
    update(dt, energy, motionIn = STILL) {
      const motion = motionIn || STILL
      const yawParent = motion.yaw || 0
      const pitchParent = motion.pitch || 0
      dt = clamp(dt, 0, 0.05)
      clock += dt
      // the tail trails a turn and sideways travel; the wings give under a drop (degrees at the shoulder)
      const swing = spring(tailSwing, clamp(-motion.spin * 0.3 - motion.vx * 0.5, -1.1, 1.1), 42, 5.5, dt)
      const lean = spring(bank, clamp(-motion.vx * 0.22, -0.3, 0.3), 30, 7, dt)
      const give = spring(flare, clamp(-motion.vy * 9, -7, 11), 55, 9, dt)
      // never quite the same beat twice
      const breath = 1 + 0.07 * Math.sin(clock * 0.37) + 0.04 * Math.sin(clock * 0.83 + 1.3)
      beat += dt * (HOVER_HZ + (TRAVEL_HZ - HOVER_HZ) * energy) * breath
      const reach = (0.92 + 0.2 * energy) * (1 + 0.05 * Math.sin(clock * 0.53 + 0.4))

      // the room the page allows above and below, in model units (width = wingspan)
      const topRoom = motion.roomUp === undefined ? Infinity : motion.roomUp * width
      const botRoom = motion.roomDown === undefined ? Infinity : motion.roomDown * width
      const fitUp = clamp((topRoom - 0.45) / 0.9, 0, 1)
      const fitDown = clamp((botRoom - 0.3) / 0.6, 0, 1)

      // ---- the move: timeline weights (all zero when idle, so the beat is untouched)
      let wPose = 0 // how far the wings are handed to the move
      let snap = 0 // wings snap from raised to half down
      let lift = 0 // chest lean back and lift (anticipation)
      let thrust = 0 // body drives forward and down (breath)
      let turnW = 0 // snout swings toward the screen's upper left
      let shake = 0
      let tailExtra = 0
      let yawMove = 0
      let pitchMove = 0
      // the page may say where the fire should go (createWorld.js, setAim): NaN means choose
      const aimed = motion.aimYaw === motion.aimYaw && motion.aimYaw !== undefined
      if (move.active) {
        move.t += dt
        move.room = aimed ? 1 : fitUp
        move.lift = aimed ? 0 : fitUp
        const t = move.t
        const bt = clamp(t - BREATH_AT, 0, 1.6)
        // the fire: surge, hold, then gutter out with a few flickers
        const surge = smooth(0, 0.14, bt)
        const gutter = 1 - smooth(1.1, 1.6, bt)
        const flick = 0.85 + 0.15 * Math.sin(bt * 37) * Math.sin(bt * 13 + 0.7)
        const strength = surge * gutter * flick

        wPose = smooth(0, 0.5, t) * (1 - smooth(RECOVER_AT, MOVE_END, t))
        snap = smooth(BREATH_AT - 0.05, BREATH_AT + 0.12, t)
        lift = smooth(0, TURN_AT, t) * (1 - smooth(BREATH_AT - 0.1, BREATH_AT + 0.05, t))
        thrust = smooth(BREATH_AT, BREATH_AT + 0.2, t) * (1 - smooth(2.4, 3.0, t))
        turnW = smooth(TURN_AT, BREATH_AT, t) * (1 - smooth(RECOVER_AT, MOVE_END, t))
        shake = t > RECOVER_AT ? t - RECOVER_AT : 0
        tailExtra = thrust * Math.sin(t * 11) * 0.3
        // the turn: the shortest way round from wherever the parent has turned the dragon
        // clamped to a sane turn of the body, so a parent spun backwards does not send the fire at the viewer's back
        yawMove = clamp(wrapAngle((aimed ? motion.aimYaw : TURN_YAW) - yawParent), -1.6, 1.6) * turnW
        // with little room above, the snout stays level
        pitchMove = (-(aimed ? motion.aimPitch : TURN_PITCH * fitUp) + pitchParent * 0.5) * turnW
        // the lean back and the lift only as far as the room allows
        lift *= 0.35 + 0.65 * fitUp
        thrust *= 0.5 + 0.5 * fitDown

        move.gather = smooth(0.25, TURN_AT, t) * (1 - smooth(0.9, BREATH_AT + 0.05, t))
        move.breath = strength
        move.breathT = bt
        move.lick = t >= BREATH_AT && t < BREATH_AT + 0.3 ? 1 : 0
        move.ember = smooth(2.5, 2.8, t) * (1 - smooth(3.0, MOVE_END, t))
        move.glow = clamp(strength * (1 - 0.5 * (bt / 1.6)) + move.gather * 0.35, 0, 1)
        move.aim = turnW * (1 - smooth(BREATH_AT + 0.5, BREATH_AT + 1.4, t))

        if (t >= MOVE_END) {
          move.active = 0
          move.t = 0
          move.gather = 0
          move.breath = 0
          move.breathT = 0
          move.lick = 0
          move.ember = 0
          move.glow = 0
          move.aim = 0
          move.room = 1
          move.lift = 1
          wPose = snap = lift = thrust = turnW = shake = tailExtra = 0
          yawMove = pitchMove = 0
        }
      }

      // ---- the body: the bob, the lean, the thrust, the shake (set before the wings are measured)
      // lift builds through the push, so the body tops out just after the wings bottom
      const liftBeat = stroke(beat - 0.09) * 2 - 1
      body.position.y = BOB * (1 + 0.5 * energy) * liftBeat + lift * 0.05 - thrust * 0.06
      body.position.z = thrust * 0.07
      // chest up in the lean back, nose down into the thrust, a shake after the breath
      body.rotation.x = -NOD * (stroke(beat - 0.16) * 2 - 1) - lift * 0.2 + thrust * 0.14 + pitchMove
      body.rotation.y = yawMove
      body.rotation.z = lean + Math.sin(shake * 34) * 0.16 * Math.exp(-shake * 4.5)

      // ---- the wings: the plain beat, and the move's raised and snapped shapes on top
      for (let h = 0; h < HINGES.length; h++) {
        const hinge = HINGES[h]
        // the give reaches the tips last and strongest, like a membrane filling
        const base = (hinge.up - (hinge.up + hinge.down) * stroke(beat - hinge.lag)) * reach + give * (0.6 + hinge.lag * 4)
        let angle = base
        if (wPose > 0) {
          // raised high at the start, but no higher than the page has room for; snapped half down and trembling in the breath
          const upOv = hinge.up * (1 + 0.35 * fitUp)
          const downOv = -hinge.down * 0.5 + Math.sin(move.t * 52 + hinge.lag * 40) * 0.26 * hinge.up * smooth(BREATH_AT + 0.1, BREATH_AT + 0.25, move.t)
          const ov = upOv + (downOv - upOv) * snap
          // the beat keeps a quarter of its swing under the move, so the wings never freeze
          const target = ov * 0.75 + base * 0.25
          angle = base + (target - base) * wPose
        }
        // the weights for the beat alone, and for the move as it is posed
        wBase[h * 2] = clamp(Math.max(base, 0) / hinge.up, 0, WING_LIMIT)
        wBase[h * 2 + 1] = clamp(Math.max(-base, 0) / hinge.down, 0, WING_LIMIT)
        wMove[h * 2] = clamp(Math.max(angle, 0) / hinge.up, 0, WING_LIMIT)
        wMove[h * 2 + 1] = clamp(Math.max(-angle, 0) / hinge.down, 0, WING_LIMIT)
      }

      // the wing overshoot goes only as far as the top edge stays in the page's band:
      // measured on the posed body, then scaled back from the move toward the plain beat
      wFinal.set(wMove)
      if (move.active && wPose > 0.001 && topRoom < Infinity) {
        body.updateMatrix()
        const ta = topEdge(wMove)
        const room = topRoom * FIT_MARGIN
        if (ta > room) {
          const tb = topEdge(wBase)
          const s = tb >= room ? 0 : clamp((room - tb) / (ta - tb), 0, 1)
          for (let k = 0; k < WING_KEYS.length; k++) wFinal[k] = wBase[k] + (wMove[k] - wBase[k]) * s
        }
      }
      applyWings(wFinal)

      tail += dt * (0.33 + 0.25 * energy)
      const sway = clamp(Math.sin(tail * TAU) * 0.6 + Math.sin(tail * Math.PI + 1) * 0.25 + swing + tailExtra, -1.5, 1.5)
      set('TailL', Math.max(0, sway) * 0.75)
      set('TailR', Math.max(0, -sway) * 0.75)
    },
  }
}
