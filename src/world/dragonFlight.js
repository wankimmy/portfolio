/**
 * The dragon's flight, driven in code.
 *
 * The GLB ships six wing shapes (three hinges along each wing, each raised and
 * lowered) and two tail shapes. The clip baked beside them moved in straight
 * lines with a hold at both ends, which read as a puppet. Here every hinge
 * follows one smooth stroke: a quick push down, a slower recovery, and the
 * outer hinges a beat behind the shoulder so the tips trail the way a real
 * wing's do. The body rides the lift each stroke makes.
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

const DOWNSTROKE = 0.42 // share of a beat spent pushing down
const HOVER_HZ = 0.72 // beats per second holding still
const TRAVEL_HZ = 1.25 // beats per second flying between perches
const BOB = 0.034 // body rise and fall, in model units (wingspan 2)
const NOD = 0.03 // radians the body pitches with each beat

/** 0 = wings at the top, 1 = at the bottom. Zero speed at both ends. */
const stroke = (beat) => {
  const t = beat - Math.floor(beat)
  const half = t < DOWNSTROKE ? (t / DOWNSTROKE) * 0.5 : 0.5 + ((t - DOWNSTROKE) / (1 - DOWNSTROKE)) * 0.5
  return 0.5 - 0.5 * Math.cos(half * TAU)
}

/**
 * @param {import('three').Object3D} model the loaded dragon
 * @param {import('three').Object3D} body a group around the model that takes the bob
 */
export function createFlight(model, body) {
  // one mesh per material: each carries its own copy of the shape weights
  const skins = []
  model.traverse((child) => {
    const names = child.isMesh && child.morphTargetDictionary
    if (names && 'FlapUpA' in names) skins.push({ weights: child.morphTargetInfluences, names })
  })

  let clock = 0
  let beat = 0
  let tail = 0

  const set = (name, value) => {
    for (const skin of skins) skin.weights[skin.names[name]] = value
  }

  return {
    /**
     * @param {number} dt seconds since the last frame
     * @param {number} energy 0 hovering .. 1 flying hard
     */
    update(dt, energy) {
      clock += dt
      // never quite the same beat twice
      const breath = 1 + 0.07 * Math.sin(clock * 0.37) + 0.04 * Math.sin(clock * 0.83 + 1.3)
      beat += dt * (HOVER_HZ + (TRAVEL_HZ - HOVER_HZ) * energy) * breath
      const reach = (0.92 + 0.2 * energy) * (1 + 0.05 * Math.sin(clock * 0.53 + 0.4))

      for (const hinge of HINGES) {
        const angle = (hinge.up - (hinge.up + hinge.down) * stroke(beat - hinge.lag)) * reach
        set(`FlapUp${hinge.tag}`, Math.max(0, angle) / hinge.up)
        set(`FlapDown${hinge.tag}`, Math.max(0, -angle) / hinge.down)
      }

      // lift builds through the push, so the body tops out just after the wings bottom
      const lift = stroke(beat - 0.09) * 2 - 1
      body.position.y = BOB * (1 + 0.5 * energy) * lift
      body.rotation.x = -NOD * (stroke(beat - 0.16) * 2 - 1)

      tail += dt * (0.33 + 0.25 * energy)
      const sway = Math.sin(tail * TAU) * 0.6 + Math.sin(tail * Math.PI + 1) * 0.25
      set('TailL', Math.max(0, sway) * 0.75)
      set('TailR', Math.max(0, -sway) * 0.75)
    },
  }
}
