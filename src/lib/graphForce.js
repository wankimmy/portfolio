/**
 * Deterministic 3D force simulation for the knowledge graph.
 * Each domain lives in one region of a brain (side view, the face toward -x):
 * repulsion and link springs spread the nodes, a lobe pull groups them, and a
 * containment force keeps every node inside its part of the brain.
 * Seeded RNG so reloads produce the same layout.
 */

/**
 * The brain's parts in simulation units: ellipsoids (c centre, r radii) and the stem
 * (a vertical capsule). The component draws the shell from the same numbers.
 */
export const BRAIN = {
  cerebrum: { c: [0, 0.5, 0], r: [4.6, 3.0, 3.3] },
  cerebellum: { c: [2.75, -2.25, 0], r: [1.7, 1.0, 2.0] },
  stem: { x: 1.25, z: 0, y0: -4.7, y1: -1.4, rad: 0.75 },
}

/** Where each domain sits, and the part that holds it. */
export const REGIONS = {
  ai: { at: [-3.0, 1.3, 0], part: 'cerebrum' }, // frontal lobe
  backend: { at: [0.5, 2.0, 0], part: 'cerebrum' }, // parietal lobe
  frontend: { at: [3.1, 0.7, 0], part: 'cerebrum' }, // occipital lobe
  devops: { at: [-0.4, -1.5, 0], part: 'cerebrum' }, // temporal lobe
  iot: { at: [2.75, -2.25, 0], part: 'cerebellum' },
  ventures: { at: [1.25, -3.1, 0], part: 'stem' },
}

/** Pull (px, py, pz) back inside a part; returns the correction to add (zero when inside). */
function containOffset(part, x, y, z, margin) {
  if (part === 'stem') {
    const S = BRAIN.stem
    const cy = Math.min(S.y1, Math.max(S.y0, y))
    const dx = x - S.x
    const dz = z - S.z
    const d = Math.hypot(dx, dz)
    const lim = S.rad * margin
    let ox = 0
    let oz = 0
    if (d > lim) {
      ox = -dx * (1 - lim / d)
      oz = -dz * (1 - lim / d)
    }
    return [ox, cy - y, oz]
  }
  const E = BRAIN[part]
  const ux = (x - E.c[0]) / E.r[0]
  const uy = (y - E.c[1]) / E.r[1]
  const uz = (z - E.c[2]) / E.r[2]
  const e = Math.hypot(ux, uy, uz)
  if (e <= margin) return [0, 0, 0]
  const k = 1 - margin / e
  return [-(x - E.c[0]) * k, -(y - E.c[1]) * k, -(z - E.c[2]) * k]
}

function mulberry32(seed) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * @param {Array<{id: string, domain: string}>} nodes
 * @param {Array<[string, string, number]>} edges
 * @param {Array<{key: string}>} domains
 * @param {{seed?: number}} [opts]
 */
export function createGraphForce(nodes, edges, domains, opts = {}) {
  const seed = opts.seed ?? 42
  const rand = mulberry32(seed)

  const domainIndex = Object.fromEntries(domains.map((d, i) => [d.key, i]))
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

  // One brain region per domain (unknown domains sit in the middle of the cerebrum)
  const lobeCenters = Object.fromEntries(
    domains.map((d) => {
      const at = REGIONS[d.key]?.at ?? BRAIN.cerebrum.c
      return [d.key, { x: at[0], y: at[1], z: at[2], part: REGIONS[d.key]?.part ?? 'cerebrum' }]
    }),
  )

  const sims = nodes.map((n, idx) => {
    const lobe = lobeCenters[n.domain] ?? { x: 0, y: 0, z: 0 }
    const jitter = lobe.part === 'cerebrum' ? 0.55 + rand() * 1.1 : 0.2 + rand() * 0.5
    const theta = rand() * Math.PI * 2
    const phi = (rand() - 0.5) * Math.PI * 0.7
    return {
      id: n.id,
      domain: n.domain,
      x: lobe.x + Math.cos(theta) * Math.cos(phi) * jitter,
      y: lobe.y + Math.sin(phi) * jitter * 0.85,
      z: lobe.z + Math.sin(theta) * Math.cos(phi) * jitter,
      vx: 0,
      vy: 0,
      vz: 0,
      pinned: false,
      px: 0,
      py: 0,
      pz: 0,
      _seed: idx,
    }
  })

  const simById = Object.fromEntries(sims.map((s) => [s.id, s]))

  const links = edges
    .filter(([a, b]) => simById[a] && simById[b])
    .map(([a, b, weight]) => {
      const sa = simById[a]
      const sb = simById[b]
      return {
        a: sa,
        b: sb,
        weight: weight ?? 1,
        cross: sa.domain !== sb.domain,
      }
    })

  const degree = Object.fromEntries(nodes.map((n) => [n.id, 0]))
  links.forEach(({ a, b }) => {
    degree[a.id] += 1
    degree[b.id] += 1
  })

  let alpha = 1
  const alphaDecay = 0.022
  const alphaMin = 0.001
  const velocityDecay = 0.78
  const charge = -2.8
  const linkDistance = 1.85
  const linkStrength = 0.42
  const centerStrength = 0.004
  const clusterStrength = 0.085
  const containStrength = 0.35

  const tick = () => {
    if (alpha < alphaMin) return false
    alpha *= 1 - alphaDecay

    // Many-body repulsion
    for (let i = 0; i < sims.length; i++) {
      for (let j = i + 1; j < sims.length; j++) {
        const a = sims[i]
        const b = sims[j]
        let dx = b.x - a.x
        let dy = b.y - a.y
        let dz = b.z - a.z
        let distSq = dx * dx + dy * dy + dz * dz
        if (distSq < 0.0001) {
          dx = (rand() - 0.5) * 0.02
          dy = (rand() - 0.5) * 0.02
          dz = (rand() - 0.5) * 0.02
          distSq = dx * dx + dy * dy + dz * dz
        }
        const dist = Math.sqrt(distSq)
        // Soften same-domain repulsion a bit so lobes stay cohesive
        const same = a.domain === b.domain ? 0.72 : 1.15
        const force = ((charge * same) * alpha) / distSq
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        const fz = (dz / dist) * force
        if (!a.pinned) {
          a.vx += fx
          a.vy += fy
          a.vz += fz
        }
        if (!b.pinned) {
          b.vx -= fx
          b.vy -= fy
          b.vz -= fz
        }
      }
    }

    // Link springs — cross-domain links are longer / weaker so lobes don't collapse
    for (const link of links) {
      const { a, b, weight, cross } = link
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dz = b.z - a.z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001
      const rest = cross
        ? linkDistance * (1.7 + weight * 0.15)
        : linkDistance / (0.55 + weight * 0.3)
      const strength =
        linkStrength * (cross ? 0.22 : 0.55 + weight * 0.2) * alpha
      const force = ((dist - rest) / dist) * strength
      const fx = dx * force
      const fy = dy * force
      const fz = dz * force
      if (!a.pinned) {
        a.vx += fx
        a.vy += fy
        a.vz += fz
      }
      if (!b.pinned) {
        b.vx -= fx
        b.vy -= fy
        b.vz -= fz
      }
    }

    // Pull each node toward its domain lobe + weak global center
    for (const s of sims) {
      if (s.pinned) {
        s.x = s.px
        s.y = s.py
        s.z = s.pz
        s.vx = 0
        s.vy = 0
        s.vz = 0
        continue
      }

      const lobe = lobeCenters[s.domain]
      if (lobe) {
        // a soft pull across the midline, so a lobe fills both hemispheres
        s.vx += (lobe.x - s.x) * clusterStrength * alpha
        s.vy += (lobe.y - s.y) * clusterStrength * alpha
        s.vz += (lobe.z - s.z) * clusterStrength * 0.3 * alpha
      }

      s.vx -= s.x * centerStrength * alpha
      s.vy -= s.y * centerStrength * alpha
      s.vz -= s.z * centerStrength * alpha

      s.vx *= velocityDecay
      s.vy *= velocityDecay
      s.vz *= velocityDecay

      s.x += s.vx
      s.y += s.vy
      s.z += s.vz

      // stay inside the brain: a firm push back whatever alpha is, so a drag cannot leave it
      const [ox, oy, oz] = containOffset(lobe?.part ?? 'cerebrum', s.x, s.y, s.z, 0.86)
      s.x += ox * containStrength
      s.y += oy * containStrength
      s.z += oz * containStrength
    }

    return true
  }

  const settle = (maxSteps = 500) => {
    for (let i = 0; i < maxSteps; i++) {
      if (!tick()) break
    }
  }

  const reheat = (amount = 0.35) => {
    alpha = Math.max(alpha, amount)
  }

  const pin = (id, x, y, z) => {
    const s = simById[id]
    if (!s) return
    s.pinned = true
    s.px = x
    s.py = y
    s.pz = z
    s.x = x
    s.y = y
    s.z = z
    reheat(0.25)
  }

  const unpin = (id) => {
    const s = simById[id]
    if (!s) return
    s.pinned = false
    reheat(0.3)
  }

  return {
    nodes: sims,
    links,
    degree,
    byId,
    lobeCenters,
    tick,
    settle,
    reheat,
    pin,
    unpin,
    get alpha() {
      return alpha
    },
  }
}
