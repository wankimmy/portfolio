/**
 * Shapes the crystal swarm takes, one per chapter. The story they tell: loose
 * shards at the top of the page, a finished world at the bottom.
 *
 * A formation is an anchor (screen position in half-viewports, like a perch)
 * plus one offset per crystal, in units of half the viewport height so a shape
 * keeps its proportions on any screen. `spin` turns the whole shape slowly.
 */

/** Deterministic 0..1 noise, so every visit and every resize gets the same swarm. */
const rand = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const TAU = Math.PI * 2

const shapes = {
  /** loose shards across the whole sky, mostly behind the dragon */
  drift: (i) => [(rand(i, 1) - 0.5) * 4.6, (rand(i, 2) - 0.5) * 2.5, -1.5 - rand(i, 3) * 7],

  /** a tilted orbit, the ring a moon would leave */
  orbit: (i, n) => {
    const a = (i / n) * TAU
    const r = 0.8 + rand(i, 4) * 0.12
    return [Math.cos(a) * r * 1.3, Math.sin(a) * r * 0.34 + (rand(i, 5) - 0.5) * 0.05, Math.sin(a) * 1.1]
  },

  /** a rising double helix: the save point */
  pillar: (i, n) => {
    const t = i / n
    const a = t * TAU * 5 + (i % 2) * Math.PI
    return [Math.cos(a) * 0.1, (t - 0.5) * 2.3, Math.sin(a) * 0.5 - 1]
  },

  /** waypoints along the road: a low line with a cairn at every sixth step */
  trail: (i, n) => {
    const t = i / n
    const cairn = i % 6 === 0 ? rand(i, 6) * 0.16 : 0
    return [(t - 0.5) * 4.2, Math.sin(t * TAU * 1.5) * 0.06 + cairn, -1.2 - rand(i, 7) * 1.2]
  },

  /** the sigil: an octahedron drawn by crystals along its twelve edges */
  gem: (i, n) => {
    const V = [
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 1],
      [-1, 0, 0],
      [0, 0, -1],
      [0, -1, 0],
    ]
    const E = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1],
    ]
    const [a, b] = E[i % 12]
    const t = (Math.floor(i / 12) + 0.5) / Math.ceil(n / 12)
    const r = 0.42
    return [0, 1, 2].map((k) => (V[a][k] + (V[b][k] - V[a][k]) * t) * r * (k === 0 ? 0.72 : 1))
  },

  /** the finished world: an even shell (Fibonacci lattice) */
  world: (i, n) => {
    const y = 1 - ((i + 0.5) / n) * 2
    const ring = Math.sqrt(1 - y * y)
    const a = i * 2.399963 // golden angle
    const r = 0.36
    return [Math.cos(a) * ring * r, y * r, Math.sin(a) * ring * r]
  },
}

/**
 * @param {number} count crystals in the swarm
 * @returns {Record<string, Float32Array>} name -> xyz offsets
 */
export function buildFormations(count) {
  const out = {}
  for (const [name, shape] of Object.entries(shapes)) {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) data.set(shape(i, count), i * 3)
    out[name] = data
  }
  return out
}

/**
 * Which shape each scene gets and where it sits (scene ids: scenes.js).
 * x, y: anchor in half-viewports. z: depth, in spreads (negative = behind the creatures).
 * spin: radians per second around the vertical axis.
 * spread: scales the whole shape. size: scales each crystal. `tall` overrides for phones.
 * follow: a creature's name. The shape then travels with that creature: x, y
 * are offsets in half-creatures and spread 1 is the creature's own height.
 */
export const FORMATIONS = {
  home: { shape: 'drift', x: 0, y: 0 },
  about: { shape: 'pillar', x: -0.965, y: 0, spin: 0.25, size: 0.8, tall: { x: -0.9 } },
  'encounter-naga': { shape: 'drift', x: 0, y: 0, size: 0.8 },
  tech: { shape: 'orbit', x: 0, y: 0, spin: 0.12, tall: { y: 0.1, spread: 0.7 } },
  'encounter-whale': { shape: 'drift', x: 0, y: 0, size: 0.8 },
  experience: { shape: 'trail', x: 0, y: -0.9, size: 0.9 },
  projects: { shape: 'drift', x: 0, y: 0, size: 0.7 },
  'encounter-phoenix': { shape: 'drift', x: 0, y: 0, size: 0.8 },
  services: { shape: 'gem', x: -0.52, y: -0.38, spin: 0.3, tall: { x: 0.62, y: 0.74, spread: 0.5 } },
  pricing: { shape: 'drift', x: 0, y: 0, size: 0.7 },
  certificates: { shape: 'orbit', x: 0.88, y: -0.44, spin: 0.2, spread: 0.42, tall: { x: 0.6, y: 0.78 } },
  'star-map': { shape: 'drift', x: 0, y: 0, size: 0.6 },
  contact: {
    shape: 'world',
    x: 0.56,
    y: -0.06,
    spin: 0.16,
    spread: 0.9,
    // phones: the world sits behind the dragon like a halo and rides the page with it
    tall: { follow: 'dragon', x: 0, y: 0, z: -0.9, spread: 1.45 },
  },
}
