// Gergasi, the river colossus, in the naga's place. Self-contained: THREE is handed in.
// What shows is a Hunyuan3D sculpt (public/models/creature-kaiju*.glb) deformed by smooth weights;
// the code-built serpent below is its fallback and still drives the springs and PEARL TIDE.
//
// The code serpent: the serpent-dragon of Tasik Chini.
//
// Build: a coiled spine with one full loop that passes in front of and behind
// itself, a smooth lofted body with a generated shingle normal map that follows
// the form, a webbed dorsal crest, a ribbed tail fan, and a sculpted head (rounded
// skull, brow ridges, cheek bones, nostril bumps, a hinged jaw with teeth, horns,
// spines, webbed cheek frills, whiskers) with small HDR gold eyes.
// Look: flat-shaded like the dragon (the shader derives each facet, so the body needs no normals),
// with a seeded jitter on the ring vertices so the facets are irregular, and a pearl-jade palette.
// Update: a wave runs from behind the head to the tail, the head and the coil hold, the crest,
// fan, frills and whiskers ride springs that whip on a kick.
// Signature move, act(): PEARL TIDE (about 4 s). The coil gathers and the head draws back, then
// it strikes and exhales a spiralling ribbon of pearls and droplets that sweep round the coil,
// fall as slow rain and fade, with ripples where the stream broke and a soft mist (sprites).
// Every offset is scaled by the room the page gives (roomUp, roomDown), so nothing crosses the band.

const KAIJU_URL = '/models/creature-kaiju.glb'
const KAIJU_URL_LITE = '/models/creature-kaiju-lite.glb'

export async function createCreature(THREE, { envMap, lite }) {
  const TAU = Math.PI * 2
  const N = lite ? 140 : 200 // body rings, tail tip (0) to neck (N-1)
  const SEG = lite ? 24 : 48 // body segments around
  const ROOM_PAD = 0.12 // the model's width is padded by this much for room (matches the size slack)
  const SV = SEG + 1 // the seam column is duplicated so the uv can run 0..1
  // head, horns, frills, barbels and eyes use the same counts in both builds so the bounds agree
  const HSEG = 24
  const TS = 8
  const BK = 4
  const BSEG = 4
  const TEXS = lite ? 256 : 512 // generated surface texture size
  const NX = 20 // shingle columns around the body
  const NY = 20 // shingle rows per turn of the body
  const FR = 4 // tail fan radial rows
  const FM = 32 // tail fan angular samples (8 ribs, 4 samples between ribs)
  const FRIB = 4
  const KWAVE = TAU * 1.2

  const JADE = [0.03, 0.28, 0.22]
  const TEAL = [0.03, 0.2, 0.26]
  const INDIGO = [0.06, 0.07, 0.24]
  const PALE = [0.66, 0.8, 0.74]
  const GOLD = [1.0, 0.56, 0.12]
  const HORN = [0.95, 0.46, 0.1]
  const HSCALE = 1.16 // the head is drawn a little larger than the first pass
  const HEAD_TOP = [0.02, 0.2, 0.22]
  const JAW_DARK = [0.02, 0.06, 0.07]
  const JAW_BELLY = [0.3, 0.55, 0.45]
  const TOOTH = [0.86, 0.9, 0.84]
  const NOSTRIL = [0.01, 0.02, 0.025]
  const PUPIL = [0.015, 0.02, 0.025]
  const FAN_BASE = [0.1, 0.2, 0.22]
  const WHISK_TIP = [0.05, 0.2, 0.18]
  const EYE_GOLD = lite ? [1.0, 0.7, 0.25] : [1.6, 1.1, 0.35]

  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)
  const smooth = (e0, e1, x) => {
    const t = clamp01((x - e0) / (e1 - e0))
    return t * t * (3 - 2 * t)
  }
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
  const hash = (n) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
    return s - Math.floor(s)
  }
  const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  const norm3 = (a) => {
    const l = Math.hypot(a[0], a[1], a[2]) || 1
    return [a[0] / l, a[1] / l, a[2] / l]
  }
  // side and down vectors for a tube running along t
  const frameOf = (t) => {
    const ref = Math.abs(t[1]) > 0.9 ? [0, 0, 1] : [0, 1, 0]
    const L = norm3(cross3(t, ref))
    const D = norm3(cross3(t, L))
    return { L, D }
  }

  // body radius along the spine (u = 0 tail tip, 1 neck): a thick muscular neck and chest
  const RAD = [
    [0, 0.012],
    [0.06, 0.055],
    [0.18, 0.11],
    [0.35, 0.135],
    [0.55, 0.15],
    [0.75, 0.145],
    [0.92, 0.14],
    [1, 0.135],
  ]
  const radiusAt = (u) => {
    for (let k = 1; k < RAD.length; k++) {
      if (u <= RAD[k][0]) {
        const a = RAD[k - 1]
        const b = RAD[k]
        return a[1] + (b[1] - a[1]) * ((u - a[0]) / (b[0] - a[0]))
      }
    }
    return RAD[RAD.length - 1][1]
  }

  // ---- spine: tail at the lower left, one loop (back at the top, front on the left), neck up to the right
  const CP = [
    [-1.1, -0.6, 0.0],
    [-0.8, -0.6, 0.22],
    [-0.44, -0.5, 0.42],
    [-0.04, -0.42, 0.3],
    [0.36, -0.34, 0.02],
    [0.64, -0.12, -0.32],
    [0.7, 0.2, -0.5],
    [0.44, 0.5, -0.46],
    [-0.05, 0.5, -0.24],
    [-0.36, 0.36, 0.08],
    [-0.44, 0.06, 0.36],
    [-0.24, -0.16, 0.5],
    [0.04, -0.02, 0.34],
    [0.36, 0.1, 0.16],
    [0.5, 0.36, 0.12],
    [0.6, 0.6, 0.1],
    [0.86, 0.72, 0.14],
  ]
  const spine = new THREE.CatmullRomCurve3(
    CP.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
    false,
    'centripetal',
  )

  const U = new Float32Array(N)
  const R = new Float32Array(N)
  const C0 = new Float32Array(N * 3)
  const T0 = new Float32Array(N * 3)
  const L0 = new Float32Array(N * 3)
  const D0 = new Float32Array(N * 3)
  // the frame is transported on a fixed grid, so the head frame and the bounds do not depend on the ring count
  const GRID = 256
  const gC = new Float32Array(GRID * 3)
  const gT = new Float32Array(GRID * 3)
  const gL = new Float32Array(GRID * 3)
  const gD = new Float32Array(GRID * 3)
  const pv = new THREE.Vector3()
  const tv = new THREE.Vector3()
  const dv = new THREE.Vector3(0, 1, 0)
  const lv = new THREE.Vector3()
  for (let g = 0; g < GRID; g++) {
    const u = g / (GRID - 1)
    spine.getPointAt(u, pv)
    spine.getTangentAt(u, tv).normalize()
    // parallel transport: the dorsal side (D) stays continuous round the loop
    dv.addScaledVector(tv, -dv.dot(tv))
    dv.normalize()
    lv.crossVectors(tv, dv).normalize()
    gC.set([pv.x, pv.y, pv.z], g * 3)
    gT.set([tv.x, tv.y, tv.z], g * 3)
    gL.set([lv.x, lv.y, lv.z], g * 3)
    gD.set([dv.x, dv.y, dv.z], g * 3)
  }
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1)
    const g = Math.round(u * (GRID - 1)) * 3
    U[i] = u
    R[i] = radiusAt(u)
    C0.set([gC[g], gC[g + 1], gC[g + 2]], i * 3)
    T0.set([gT[g], gT[g + 1], gT[g + 2]], i * 3)
    L0.set([gL[g], gL[g + 1], gL[g + 2]], i * 3)
    D0.set([gD[g], gD[g + 1], gD[g + 2]], i * 3)
  }
  const ENDK = (N - 1) * 3
  const Fv = new THREE.Vector3(T0[ENDK], T0[ENDK + 1], T0[ENDK + 2])
  const Uv = new THREE.Vector3(D0[ENDK], D0[ENDK + 1], D0[ENDK + 2])
  const Sv = new THREE.Vector3(L0[ENDK], L0[ENDK + 1], L0[ENDK + 2])
  const Pe = [C0[ENDK], C0[ENDK + 1], C0[ENDK + 2]]
  // head-local (x forward, y up the back, z to the side) to group space at rest
  const headWorld = (x, y, z) => [
    Pe[0] + Fv.x * x + Uv.x * y + Sv.x * z,
    Pe[1] + Fv.y * x + Uv.y * y + Sv.y * z,
    Pe[2] + Fv.z * x + Uv.z * y + Sv.z * z,
  ]

  // ---- generated surface textures: overlapping shingles, normal map and a light colour map
  const makeTextures = (S) => {
    const cw = S / NX
    const ch = S / NY
    const rx = 0.66 * cw // a shingle is narrower than its column, so the gaps read as grooves
    const ry = 1.0 * ch // and taller than its row, so each row overlaps the next
    const hgt = new Float32Array(S * S)
    for (let y = 0; y < S; y++) {
      const gy = (y + 0.5) / ch
      const r0 = Math.floor(gy)
      for (let x = 0; x < S; x++) {
        const gx = (x + 0.5) / cw
        let best = 0
        for (let dr = -1; dr <= 1; dr++) {
          const r = r0 + dr
          const rr = ((r % NY) + NY) % NY
          const off = (rr % 2) * 0.5 // half-shingle offset on alternate rows
          const cy = r + 0.5
          const k0 = Math.round(gx - off - 0.5)
          for (let dk = -1; dk <= 1; dk++) {
            const cx = k0 + dk + 0.5 + off
            const dx = ((gx - cx) * cw) / rx
            const dy = ((gy - cy) * ch) / ry
            const nd = dx * dx + dy * dy
            if (nd < 1) {
              // a domed scale with a steep free edge
              const hh = Math.pow(1 - nd, 0.4)
              if (hh > best) best = hh
            }
          }
        }
        hgt[y * S + x] = best
      }
    }
    const at = (x, y) => hgt[((y + S) % S) * S + ((x + S) % S)]
    const nData = new Uint8Array(S * S * 4)
    const cData = new Uint8Array(S * S * 4)
    const K = (14 * S) / 512 // stronger scale relief
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const dhx = ((at(x + 1, y) - at(x - 1, y)) * 0.5) * K
        const dhy = ((at(x, y + 1) - at(x, y - 1)) * 0.5) * K
        const n = norm3([-dhx, -dhy, 1])
        const o = (y * S + x) * 4
        nData[o] = (n[0] * 0.5 + 0.5) * 255
        nData[o + 1] = (n[1] * 0.5 + 0.5) * 255
        nData[o + 2] = (n[2] * 0.5 + 0.5) * 255
        nData[o + 3] = 255
        const sh = Math.round(255 * (0.82 + 0.18 * hgt[y * S + x]))
        cData[o] = sh
        cData[o + 1] = sh
        cData[o + 2] = Math.round(sh * 0.98)
        cData[o + 3] = 255
      }
    }
    const normalTex = new THREE.DataTexture(nData, S, S, THREE.RGBAFormat)
    normalTex.wrapS = THREE.RepeatWrapping
    normalTex.wrapT = THREE.RepeatWrapping
    normalTex.generateMipmaps = true
    normalTex.minFilter = THREE.LinearMipmapLinearFilter
    normalTex.magFilter = THREE.LinearFilter
    normalTex.needsUpdate = true
    const colorTex = new THREE.DataTexture(cData, S, S, THREE.RGBAFormat)
    colorTex.wrapS = THREE.RepeatWrapping
    colorTex.wrapT = THREE.RepeatWrapping
    colorTex.colorSpace = THREE.SRGBColorSpace
    colorTex.generateMipmaps = true
    colorTex.minFilter = THREE.LinearMipmapLinearFilter
    colorTex.magFilter = THREE.LinearFilter
    colorTex.needsUpdate = true
    return { normalTex, colorTex }
  }
  const { normalTex, colorTex } = makeTextures(TEXS)

  // ---- body: smooth loft, rebuilt each frame from per-vertex coefficients
  // along the rest frame; normals are recomputed each frame.
  // the scale texture's v runs along the body: one tile is one turn of the body
  // (so the scales shrink toward the tail with the radius)
  const uvY = new Float32Array(N)
  let acc = 0
  for (let i = 1; i < N; i++) {
    const a = i * 3
    const b = (i - 1) * 3
    const ds = Math.hypot(C0[a] - C0[b], C0[a + 1] - C0[b + 1], C0[a + 2] - C0[b + 2])
    acc += ds / (6.29 * Math.max(R[i], 0.02))
    uvY[i] = acc
  }
  const BV = N * SV
  const bLc = new Float32Array(BV)
  const bDc = new Float32Array(BV)
  const bRing = new Uint16Array(BV)
  const bCol = new Float32Array(BV * 3)
  const bUv = new Float32Array(BV * 2)
  for (let i = 0; i < N; i++) {
    const u = U[i]
    for (let j = 0; j < SV; j++) {
      const v = i * SV + j
      const a = ((j % SEG) * TAU) / SEG
      const ca = Math.cos(a)
      const sa = Math.sin(a)
      bRing[v] = i
      // seeded jitter per (ring, segment): the seam column reuses its segment's value so it stays closed
      const jk = j % SEG
      const jit = 1 + 0.018 * (hash(i * 0.731 + jk * 1.913 + 3.3) * 2 - 1)
      bLc[v] = ca * R[i] * jit
      bDc[v] = sa * R[i] * jit * (sa < 0 ? 0.94 : 1.0)
      // jade and teal back, indigo tail, pale belly plates
      const base = u < 0.5 ? mix(INDIGO, TEAL, smooth(0, 0.5, u)) : mix(TEAL, JADE, smooth(0.5, 1, u))
      const belly = smooth(-0.3, -0.85, sa) * (1 - smooth(0.85, 0.97, u))
      // wide transverse plate bands on the belly
      const band = Math.floor(i / 4) % 2 === 0 ? 1.0 : 0.88
      const plate = (1 - belly * (1 - band)) * (0.97 + 0.06 * hash(v * 0.7))
      let c = mix(base, PALE, belly)
      const shade = (0.84 + 0.16 * (0.5 + 0.5 * sa)) * plate
      c = [c[0] * shade, c[1] * shade, c[2] * shade]
      bCol[v * 3] = c[0]
      bCol[v * 3 + 1] = c[1]
      bCol[v * 3 + 2] = c[2]
      bUv[v * 2] = j / SEG
      bUv[v * 2 + 1] = uvY[i]
    }
  }
  const bIdx = []
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < SEG; j++) {
      const a = i * SV + j
      const c = (i + 1) * SV + j
      bIdx.push(a, c, a + 1, a + 1, c, c + 1)
    }
  }
  const bodyPos = new Float32Array(BV * 3)
  const bodyGeo = new THREE.BufferGeometry()
  bodyGeo.setAttribute('position', new THREE.BufferAttribute(bodyPos, 3).setUsage(THREE.DynamicDrawUsage))
  bodyGeo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(BV * 3), 3).setUsage(THREE.DynamicDrawUsage))
  bodyGeo.setAttribute('color', new THREE.BufferAttribute(bCol, 3))
  bodyGeo.setAttribute('uv', new THREE.BufferAttribute(bUv, 2))
  bodyGeo.setIndex(bIdx)

  // ---- dorsal crest: webbed spines with a bowed membrane between them, gold tips fading to teal at the base
  // loop centre (mean of the spine): crest spines that face into the loop are lowered
  let mcx = 0
  let mcy = 0
  let mcz = 0
  for (let i = 0; i < N; i++) {
    mcx += C0[i * 3]
    mcy += C0[i * 3 + 1]
    mcz += C0[i * 3 + 2]
  }
  mcx /= N
  mcy /= N
  mcz /= N
  const FS = Math.floor(0.08 * (N - 1))
  const fRing = []
  const fLc = []
  const fDc = []
  const fFw = []
  const fCol = []
  const fIdx = []
  let pb = -1
  let pt = -1
  for (let i = FS; i < N; i++) {
    const u = U[i]
    let hgt = (0.018 + 0.07 * smooth(0.08, 0.4, u)) * (1 - 0.45 * smooth(0.85, 1, u)) * (0.85 + 0.3 * hash(i * 7.3))
    {
      const ix = mcx - C0[i * 3]
      const iy = mcy - C0[i * 3 + 1]
      const iz = mcz - C0[i * 3 + 2]
      const il = Math.hypot(ix, iy, iz) || 1
      const facing = (D0[i * 3] * ix + D0[i * 3 + 1] * iy + D0[i * 3 + 2] * iz) / il
      hgt *= 1 - 0.7 * smooth(0.2, 0.7, facing)
    }
    // one spine every third ring; the membrane between them bows out to about 30 percent of the spine height
    const wave3 = 0.5 + 0.5 * Math.cos((TAU * i) / 3)
    const shape = 0.45 + 0.55 * wave3 // softer spine rhythm: no sawtooth on the inner curve
    const baseCol = mix(INDIGO, TEAL, smooth(0.1, 0.5, u))
    const b = fRing.length
    fRing.push(i)
    fLc.push(0)
    fDc.push(R[i] * 0.8)
    fFw.push(0)
    fCol.push(baseCol[0], baseCol[1], baseCol[2])
    const t = fRing.length
    fRing.push(i)
    fLc.push(0)
    fDc.push(R[i] * 0.8 + hgt * shape)
    fFw.push(1)
    fCol.push(GOLD[0], GOLD[1], GOLD[2])
    if (pb >= 0) {
      fIdx.push(pb, pt, b, pt, t, b)
    }
    pb = b
    pt = t
  }
  const FN = fRing.length
  const finPos = new Float32Array(FN * 3)
  const finGeo = new THREE.BufferGeometry()
  finGeo.setAttribute('position', new THREE.BufferAttribute(finPos, 3).setUsage(THREE.DynamicDrawUsage))
  finGeo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(FN * 3), 3).setUsage(THREE.DynamicDrawUsage))
  finGeo.setAttribute('color', new THREE.Float32BufferAttribute(fCol, 3))
  finGeo.setIndex(fIdx)

  // ---- tail fan: two crossed fans (vertical and sideways). Each is a cupped membrane,
  // a grid of FR rows by FM+1 samples, with raised ribs along the spokes and a scalloped edge.
  // Two layers (front and back) give it thickness and depth edge-on.
  const FV = 2 * 2 * FR * (FM + 1)
  const tailPos = new Float32Array(FV * 3)
  const tailCol = new Float32Array(FV * 3)
  const tailIdx = []
  const fanIdx = (f, layer, rr, m) => ((f * 2 + layer) * FR + rr) * (FM + 1) + m
  for (let f = 0; f < 2; f++) {
    for (let layer = 0; layer < 2; layer++) {
      for (let rr = 0; rr < FR; rr++) {
        const t = rr / (FR - 1)
        const col = mix(FAN_BASE, GOLD, t)
        const cc = layer === 0 ? col : mix(col, FAN_BASE, 0.25)
        for (let m = 0; m <= FM; m++) tailCol.set(cc, fanIdx(f, layer, rr, m) * 3)
      }
      for (let rr = 0; rr < FR - 1; rr++) {
        for (let m = 0; m < FM; m++) {
          const a = fanIdx(f, layer, rr, m)
          const b = fanIdx(f, layer, rr, m + 1)
          const c = fanIdx(f, layer, rr + 1, m)
          const d = fanIdx(f, layer, rr + 1, m + 1)
          if (layer === 0) tailIdx.push(a, c, b, b, c, d)
          else tailIdx.push(a, b, c, b, d, c)
        }
      }
    }
  }
  const tailGeo = new THREE.BufferGeometry()
  tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPos, 3).setUsage(THREE.DynamicDrawUsage))
  tailGeo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(FV * 3), 3).setUsage(THREE.DynamicDrawUsage))
  tailGeo.setAttribute('color', new THREE.BufferAttribute(tailCol, 3))
  tailGeo.setIndex(tailIdx)

  // ---- head: loft sections along the head x axis (x forward, y up, z to the side)
  // top and bot are the half-heights above and below the section centre
  const HS = [
    { x: -0.16, cy: 0.0, top: 0.1, bot: 0.09, hw: 0.095 }, // inside the neck
    { x: -0.06, cy: 0.04, top: 0.15, bot: 0.1, hw: 0.135 }, // back of the skull, rounded crown
    { x: 0.05, cy: 0.06, top: 0.165, bot: 0.1, hw: 0.15 }, // temple and cheek bones
    { x: 0.14, cy: 0.05, top: 0.155, bot: 0.095, hw: 0.14 }, // eye line
    { x: 0.26, cy: 0.03, top: 0.12, bot: 0.075, hw: 0.115 },
    { x: 0.38, cy: 0.01, top: 0.09, bot: 0.055, hw: 0.09 }, // muzzle
    { x: 0.48, cy: 0.0, top: 0.07, bot: 0.045, hw: 0.068 },
    { x: 0.56, cy: -0.01, top: 0.05, bot: 0.035, hw: 0.05 },
    { x: 0.62, cy: -0.015, top: 0.035, bot: 0.028, hw: 0.03 }, // snout tip
  ]
  const PJ = [-0.06, -0.06, 0] // jaw hinge
  const JAW_SEC = [
    { x: -0.12, cy: -0.1, hw: 0.085, hh: 0.04 },
    { x: 0.02, cy: -0.11, hw: 0.09, hh: 0.045 },
    { x: 0.2, cy: -0.11, hw: 0.065, hh: 0.035 },
    { x: 0.34, cy: -0.1, hw: 0.04, hh: 0.025 },
    { x: 0.46, cy: -0.085, hw: 0.02, hh: 0.015 },
  ]
  const HEAD = newAcc()
  const JAW = newAcc()
  const EYE = newAcc()
  function newAcc() {
    return { p: [], c: [], uv: [], i: [] }
  }
  // (the accumulators above are created before use; the helpers below only push into them)
  const vert = (A, x, y, z, col) => {
    A.p.push(x, y, z)
    A.c.push(col[0], col[1], col[2])
    A.uv.push(x * 2.4, y * 2.4 + z * 0.8)
    return A.p.length / 3 - 1
  }
  // generic surface: K rings of S points, pt(k, j) gives the point, colFn(q, k) the colour
  const surface = (A, K, S, pt, colFn, cap0 = false, cap1 = false) => {
    const base = A.p.length / 3
    for (let k = 0; k < K; k++) {
      for (let j = 0; j < S; j++) {
        const q = pt(k, j)
        vert(A, q[0], q[1], q[2], colFn(q, k))
      }
    }
    for (let k = 0; k < K - 1; k++) {
      for (let j = 0; j < S; j++) {
        const a = base + k * S + j
        const b = base + k * S + ((j + 1) % S)
        const c = a + S
        const d = b + S
        A.i.push(a, c, b, b, c, d)
      }
    }
    const cap = (k, flip) => {
      let cx = 0
      let cy = 0
      let cz = 0
      for (let j = 0; j < S; j++) {
        const q = pt(k, j)
        cx += q[0]
        cy += q[1]
        cz += q[2]
      }
      cx /= S
      cy /= S
      cz /= S
      const ci = vert(A, cx, cy, cz, colFn([cx, cy, cz], k))
      for (let j = 0; j < S; j++) {
        const a = base + k * S + j
        const b = base + k * S + ((j + 1) % S)
        if (flip) A.i.push(ci, b, a)
        else A.i.push(ci, a, b)
      }
    }
    if (cap0) cap(0, false)
    if (cap1) cap(K - 1, true)
  }
  // tube along rings {c, L, D, r}
  const tube = (A, rings, S, colFn, cap0 = true, cap1 = true) => {
    surface(
      A,
      rings.length,
      S,
      (k, j) => {
        const r = rings[k]
        const a = (j / S) * TAU
        const ca = Math.cos(a) * r.r
        const sa = Math.sin(a) * r.r
        return [
          r.c[0] + r.L[0] * ca + r.D[0] * sa,
          r.c[1] + r.L[1] * ca + r.D[1] * sa,
          r.c[2] + r.L[2] * ca + r.D[2] * sa,
        ]
      },
      colFn,
      cap0,
      cap1,
    )
  }
  const bez = (b, c, e, t) => {
    const o = 1 - t
    return [0, 1, 2].map((ax) => o * o * b[ax] + 2 * o * t * c[ax] + t * t * e[ax])
  }
  const bezTan = (b, c, e, t) => {
    const o = 1 - t
    return [0, 1, 2].map((ax) => 2 * o * (c[ax] - b[ax]) + 2 * t * (e[ax] - c[ax]))
  }
  // a tapered tube along a quadratic curve
  const curveTube = (A, b, c, e, K, r0, r1, colFn) => {
    const rings = []
    for (let k = 0; k < K; k++) {
      const t = k / (K - 1)
      const fr = frameOf(bezTan(b, c, e, t))
      rings.push({ c: bez(b, c, e, t), L: fr.L, D: fr.D, r: r0 + (r1 - r0) * t })
    }
    tube(A, rings, TS, colFn)
  }
  const ellipsoid = (A, c, r, col, K = 6, S = 8) => {
    surface(
      A,
      K,
      S,
      (k, j) => {
        const th = (k / (K - 1)) * Math.PI
        const ph = (j / S) * TAU
        return [
          c[0] + r[0] * Math.sin(th) * Math.cos(ph),
          c[1] + r[1] * Math.cos(th),
          c[2] + r[2] * Math.sin(th) * Math.sin(ph),
        ]
      },
      () => col,
    )
  }

  // main skull: elliptical sections, with brow ridges over the eyes and cheek bones at the sides
  const headPt = (k, j) => {
    const sec = HS[k]
    const a = (j / HSEG) * TAU
    const sa = Math.sin(a)
    const ca = Math.cos(a)
    let y = sec.cy + (sa > 0 ? sec.top * sa : sec.bot * sa)
    let z = sec.hw * ca
    // brow ridge: a swell on the upper side corners, over each deep-set eye
    const bx = (sec.x - 0.13) / 0.08
    y += 0.035 * Math.exp(-bx * bx) * smooth(0.0, 0.5, sa) * smooth(0.5, 0.95, Math.abs(ca))
    // cheek bone: a bulge on the lower side, behind the eye
    const cxk = (sec.x - 0.02) / 0.09
    z += 0.022 * Math.exp(-cxk * cxk) * smooth(-0.05, -0.5, sa) * smooth(0.4, 0.9, Math.abs(ca)) * Math.sign(ca)
    return [sec.x, y, z]
  }
  const headCol = (q) => {
    const up = smooth(0.0, 0.12, q[1])
    const under = smooth(-0.02, -0.1, q[1])
    let c = mix(JADE, HEAD_TOP, up * 0.8)
    c = mix(c, PALE, under * 0.35)
    return c
  }
  surface(HEAD, HS.length, HSEG, headPt, headCol, true, true)

  // horns: a pair swept back over the crown, and a smaller pair of spines behind them
  for (const s of [1, -1]) {
    curveTube(HEAD, [-0.02, 0.17, 0.09 * s], [-0.16, 0.3, 0.15 * s], [-0.42, 0.34, 0.22 * s], 8, 0.04, 0.005, () => HORN)
    curveTube(HEAD, [0.08, 0.18, 0.06 * s], [-0.02, 0.25, 0.09 * s], [-0.16, 0.27, 0.11 * s], 5, 0.02, 0.003, () => HORN)
  }

  // cheek frills: built in their own dynamic buffer (see the frill block after the barbels)

  // nostril bumps on the snout (skin colour, with a dark nostril)
  for (const s of [1, -1]) {
    ellipsoid(HEAD, [0.5, 0.06, 0.03 * s], [0.018, 0.016, 0.018], HEAD_TOP, 5, 8)
    ellipsoid(EYE, [0.52, 0.064, 0.03 * s], [0.007, 0.006, 0.007], NOSTRIL, 4, 6)
  }

  // upper teeth, hanging from the palate
  for (const x of [0.1, 0.22, 0.34]) {
    for (const s of [1, -1]) ellipsoid(HEAD, [x, -0.05, 0.06 * s], [0.011, 0.018, 0.011], TOOTH, 4, 6)
  }

  // eyes (HDR gold, slit pupil) in a dark socket, so the gold reads as bright and small
  for (const s of [1, -1]) {
    ellipsoid(EYE, [0.14, 0.07, 0.13 * s], [0.046, 0.042, 0.04], JAW_DARK, 8, 12)
    ellipsoid(EYE, [0.14, 0.07, 0.15 * s], [0.031, 0.03, 0.03], EYE_GOLD, 10, 14)
    ellipsoid(EYE, [0.14, 0.07, 0.178 * s], [0.007, 0.024, 0.012], PUPIL, 6, 8)
  }

  // lower jaw: hinged at PJ, opened with rotation.z. Its geometry is in pivot space.
  const jawPt = (k, j) => {
    const sec = JAW_SEC[k]
    const a = (j / HSEG) * TAU
    return [sec.x - PJ[0], sec.cy + sec.hh * Math.sin(a) - PJ[1], sec.hw * Math.cos(a) - PJ[2]]
  }
  surface(JAW, JAW_SEC.length, HSEG, jawPt, (q) => (q[1] > -0.03 ? JAW_DARK : JAW_BELLY), true, true)
  // lower teeth stand up from the jaw line (head coordinates, converted to pivot space)
  for (const x of [0.04, 0.18, 0.3]) {
    for (const s of [1, -1]) {
      ellipsoid(JAW, [x - PJ[0], -0.072 - PJ[1], 0.055 * s - PJ[2]], [0.01, 0.018, 0.01], TOOTH, 4, 6)
    }
  }

  // whiskers and chin barbels: dynamic tubes in head space
  const BAR = [
    { root: [0.44, -0.01, 0.07], dir: [0.7, -0.3, 0.5], len: 0.34 },
    { root: [0.44, -0.01, -0.07], dir: [0.7, -0.3, -0.5], len: 0.34 },
    { root: [0.3, -0.12, 0.08], dir: [0.3, -0.9, 0.4], len: 0.26 },
    { root: [0.3, -0.12, -0.08], dir: [0.3, -0.9, -0.4], len: 0.26 },
  ]
  const barbelIdx = []
  const barbelPos = new Float32Array(BAR.length * (BK + 1) * BSEG * 3)
  const barbelCol = new Float32Array(BAR.length * (BK + 1) * BSEG * 3)
  const barbelNrm = new Float32Array(BAR.length * (BK + 1) * BSEG * 3)
  const bar = []
  for (let b = 0; b < BAR.length; b++) {
    const spec = BAR[b]
    const dl = Math.hypot(spec.dir[0], spec.dir[1], spec.dir[2])
    const d = spec.dir.map((v) => v / dl)
    const ref = Math.abs(d[2]) > 0.9 ? [1, 0, 0] : [0, 0, 1]
    const Lb = norm3(cross3(d, ref))
    const Db = norm3(cross3(d, Lb))
    const start = b * (BK + 1) * BSEG
    for (let j = 0; j <= BK; j++) {
      const s = j / BK
      const bc = mix([0.42, 0.78, 0.66], WHISK_TIP, smooth(0.2, 1.0, s))
      for (let k = 0; k < BSEG; k++) {
        const idx = (start + j * BSEG + k) * 3
        barbelCol[idx] = bc[0]
        barbelCol[idx + 1] = bc[1]
        barbelCol[idx + 2] = bc[2]
      }
    }
    for (let j = 0; j < BK; j++) {
      for (let k = 0; k < BSEG; k++) {
        const a = start + j * BSEG + k
        const b2 = start + j * BSEG + ((k + 1) % BSEG)
        const c = start + (j + 1) * BSEG + k
        const d2 = start + (j + 1) * BSEG + ((k + 1) % BSEG)
        barbelIdx.push(a, c, b2, b2, c, d2)
      }
    }
    bar.push({ root: spec.root.map((v) => v * HSCALE), len: spec.len * HSCALE, d, Lb, Db, start })
  }
  const barbelGeo = new THREE.BufferGeometry()
  barbelGeo.setAttribute('position', new THREE.BufferAttribute(barbelPos, 3).setUsage(THREE.DynamicDrawUsage))
  barbelGeo.setAttribute('color', new THREE.BufferAttribute(barbelCol, 3))
  barbelGeo.setAttribute('normal', new THREE.BufferAttribute(barbelNrm, 3))
  barbelGeo.setIndex(barbelIdx)

  // ---- cheek frills: webbed ribs, built in unscaled head space and scaled on write, so the tips
  // can ride springs. Each rib is a tube round a bowed curve from the cheek to its tip (4 rings,
  // 8 sides, two caps; ring frames fixed at rest). The webs are the triangles between neighbouring tips.
  const FRILL_K = 4
  const COS_TS = Array.from({ length: TS }, (_, j) => Math.cos((j / TS) * TAU))
  const SIN_TS = Array.from({ length: TS }, (_, j) => Math.sin((j / TS) * TAU))
  const frillRibs = []
  const frillWebs = []
  const frPos = []
  const frCol = []
  const frIdx = []
  const frv = (p, col) => {
    frPos.push(p[0], p[1], p[2])
    frCol.push(col[0], col[1], col[2])
    return frPos.length / 3 - 1
  }
  for (const side of [1, -1]) {
    const B = [0.0, -0.02, 0.13 * side]
    const tips = [
      [-0.3, 0.15, 0.26 * side],
      [-0.38, 0.05, 0.34 * side],
      [-0.36, -0.05, 0.33 * side],
      [-0.26, -0.13, 0.24 * side],
    ]
    const ribStart = frillRibs.length
    for (const tp of tips) {
      const mid = [(B[0] + tp[0]) / 2, (B[1] + tp[1]) / 2 + 0.02, (B[2] + tp[2]) / 2]
      const rings = []
      for (let k = 0; k < FRILL_K; k += 1) {
        const t = k / (FRILL_K - 1)
        const fr = frameOf(bezTan(B, mid, tp, t))
        rings.push({ L: fr.L, D: fr.D, r: 0.013 + (0.005 - 0.013) * t })
      }
      const base = frPos.length / 3
      for (let k = 0; k < FRILL_K; k += 1) {
        for (let j = 0; j < TS; j += 1) frv([0, 0, 0], k === 0 ? JADE : GOLD)
      }
      const cap0 = frv([0, 0, 0], JADE)
      const cap1 = frv([0, 0, 0], GOLD)
      for (let k = 0; k < FRILL_K - 1; k += 1) {
        for (let j = 0; j < TS; j += 1) {
          const a = base + k * TS + j
          const b = base + k * TS + ((j + 1) % TS)
          const c = a + TS
          const d = b + TS
          frIdx.push(a, c, b, b, c, d)
        }
      }
      for (let j = 0; j < TS; j += 1) {
        frIdx.push(cap0, base + j, base + ((j + 1) % TS))
        const a1 = base + (FRILL_K - 1) * TS + j
        const b1 = base + (FRILL_K - 1) * TS + ((j + 1) % TS)
        frIdx.push(cap1, b1, a1)
      }
      frillRibs.push({ side, B, tip: tp, base, rings, cap0, cap1 })
    }
    for (let k = 0; k < tips.length - 1; k += 1) {
      const a = frv(B, JADE)
      const b = frv(tips[k], GOLD)
      const c = frv(tips[k + 1], GOLD)
      const m = frv(B, mix(JADE, GOLD, 0.35))
      frIdx.push(a, b, m, b, c, m, c, a, m)
      frillWebs.push({ r: ribStart + k, B, a, b, c, m })
    }
  }
  const FRILL_N = frillRibs.length
  const frillTip = new Float64Array(FRILL_N * 3)
  const frillPos = Float32Array.from(frPos)
  const frillGeo = new THREE.BufferGeometry()
  frillGeo.setAttribute('position', new THREE.BufferAttribute(frillPos, 3).setUsage(THREE.DynamicDrawUsage))
  frillGeo.setAttribute('color', new THREE.Float32BufferAttribute(frCol, 3))
  frillGeo.setAttribute('normal', new THREE.Float32BufferAttribute(new Float32Array(frPos.length), 3))
  frillGeo.setIndex(frIdx)
  // write one head-space point (unscaled) into a scaled position array
  const put = (arr, o, x, y, z) => {
    arr[o] = x * HSCALE
    arr[o + 1] = y * HSCALE
    arr[o + 2] = z * HSCALE
  }

  const toGeo = (A) => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(A.p, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(A.c, 3))
    g.setAttribute('uv', new THREE.Float32BufferAttribute(A.uv, 2))
    g.setIndex(A.i)
    g.computeVertexNormals()
    return g
  }
  // scale the head, jaw and eyes about the neck joint (the jaw pivot is scaled the same way)
  for (const A of [HEAD, JAW, EYE]) for (let v = 0; v < A.p.length; v++) A.p[v] *= HSCALE
  const headGeo = toGeo(HEAD)
  const jawGeo = toGeo(JAW)
  const eyeGeo = new THREE.BufferGeometry()
  eyeGeo.setAttribute('position', new THREE.Float32BufferAttribute(EYE.p, 3))
  eyeGeo.setAttribute('color', new THREE.Float32BufferAttribute(EYE.c, 3))
  eyeGeo.setIndex(EYE.i)

  // ---- materials: shingles through the normal map, rim glow patched into the emissive term
  const rimPatch = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
  float rimTerm = pow(1.0 - saturate(dot(normalize(vViewPosition), normal)), 3.0);
  totalEmissiveRadiance += vec3(0.16, 0.5, 0.7) * rimTerm * 0.06;`,
    )
  }
  const bodyMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    map: colorTex,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(1.8, 1.8),
    flatShading: true, // the dragon's facets: the shader derives each face normal
    roughness: 0.5,
    metalness: 0.05,
    envMap,
    envMapIntensity: 0.55,
    clearcoat: lite ? 0 : 0.38,
    clearcoatRoughness: 0.42,
    iridescence: lite ? 0 : 0.42,
    iridescenceIOR: 1.32,
    iridescenceThicknessRange: [140, 420],
    side: THREE.DoubleSide,
  })
  bodyMat.onBeforeCompile = rimPatch
  const finMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.42,
    metalness: 0.0,
    envMap,
    envMapIntensity: 0.8,
    clearcoat: lite ? 0 : 0.4,
    clearcoatRoughness: 0.3,
    side: THREE.DoubleSide,
  })
  finMat.onBeforeCompile = rimPatch
  const eyeMat = new THREE.MeshBasicMaterial({ vertexColors: true })

  // ---- meshes and the head hierarchy
  const group = new THREE.Group()
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat)
  const finMesh = new THREE.Mesh(finGeo, finMat)
  const tailMesh = new THREE.Mesh(tailGeo, finMat)
  const headRoot = new THREE.Group()
  headRoot.position.set(Pe[0], Pe[1], Pe[2])
  headRoot.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(Fv, Uv, Sv))
  const headNod = new THREE.Group()
  const headMesh = new THREE.Mesh(headGeo, bodyMat)
  const jawPivot = new THREE.Group()
  jawPivot.position.set(PJ[0] * HSCALE, PJ[1] * HSCALE, PJ[2] * HSCALE)
  const jawMesh = new THREE.Mesh(jawGeo, bodyMat)
  jawPivot.add(jawMesh)
  const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat)
  const barbelMesh = new THREE.Mesh(barbelGeo, finMat)
  const frillMesh = new THREE.Mesh(frillGeo, bodyMat)
  for (const m of [bodyMesh, finMesh, tailMesh, headMesh, jawMesh, eyeMesh, barbelMesh, frillMesh]) {
    m.castShadow = false
    m.receiveShadow = false
    m.frustumCulled = false
  }
  headNod.add(headMesh, eyeMesh, barbelMesh, jawPivot, frillMesh)
  headRoot.add(headNod)
  group.add(bodyMesh, finMesh, tailMesh, headRoot)

  // ---- per-frame state (preallocated)
  const CX = new Float32Array(N)
  const CY = new Float32Array(N)
  const CZ = new Float32Array(N)
  const G = new Float32Array(N).fill(1)
  const FL = new Float32Array(N)
  let eS = 0
  let wavePh = 0 // integrated wave phase: omega changes with energy, so omega * time would jump on scroll
  const THICK = 0.012

  // ---- loose parts on springs. Each chain is a row of damped springs. A spring is pushed by the
  // creature's own acceleration (so the parts lag behind a shove or a turn and settle), a little idle
  // drive keeps them alive, and every offset is clamped so nothing folds or drifts.
  // Offsets are in creature widths; W (the model's width, set after the bounds) turns them into model units.
  let W = 1
  const STILL = { vx: 0, vy: 0, spin: 0 }
  const TAIL_U = [0, 0.07, 0.14, 0.22] // ascending along the body from the tip; node 3 sits on the body
  const CREST_U = [0.1, 0.35, 0.6, 0.85]
  const tailX = new Float64Array(4)
  const tailY = new Float64Array(4)
  const tailVX = new Float64Array(4)
  const tailVY = new Float64Array(4)
  const crX = new Float64Array(4)
  const crY = new Float64Array(4)
  const crVX = new Float64Array(4)
  const crVY = new Float64Array(4)
  const fanX = new Float64Array(1)
  const fanV = new Float64Array(1)
  const frX = new Float64Array(FRILL_N)
  const frY = new Float64Array(FRILL_N)
  const frVX = new Float64Array(FRILL_N)
  const frVY = new Float64Array(FRILL_N)
  const wX = new Float64Array(BAR.length * BK)
  const wV = new Float64Array(BAR.length * BK)
  const FX = new Float64Array(16)
  const FY = new Float64Array(16)
  const CRX = new Float32Array(N)
  const CRY = new Float32Array(N)
  let accX = 0
  let accY = 0
  let lastVX = 0
  let lastVY = 0

  const clampTo = (x, lim) => (x > lim ? lim : x < -lim ? -lim : x)
  // value of a chain (ascending knots us) at u, no allocation
  const chainAt = (arr, us, u) => {
    const n = arr.length
    if (u <= us[0]) return arr[0]
    for (let k = 1; k < n; k += 1) {
      if (u <= us[k]) return arr[k - 1] + ((arr[k] - arr[k - 1]) * (u - us[k - 1])) / (us[k] - us[k - 1])
    }
    return arr[n - 1]
  }
  // semi-implicit Euler in sub-steps of at most 12.5 ms; stable for any dt up to 0.05
  const springStep = (x, v, F, K, D, lim, dt) => {
    const sub = Math.ceil(dt / 0.0125)
    const h = dt / sub
    for (let s = 0; s < sub; s += 1) {
      for (let i = 0; i < x.length; i += 1) {
        v[i] += (F[i] - K * x[i] - D * v[i]) * h
        x[i] += v[i] * h
        if (x[i] > lim) {
          x[i] = lim
          v[i] = 0
        } else if (x[i] < -lim) {
          x[i] = -lim
          v[i] = 0
        }
      }
    }
  }
  const resetPhysics = () => {
    for (const a of [tailX, tailY, tailVX, tailVY, crX, crY, crVX, crVY, fanX, fanV, frX, frY, frVX, frVY, wX, wV]) a.fill(0)
    accX = 0
    accY = 0
    lastVX = 0
    lastVY = 0
  }
  const stepPhysics = (time, dt, motion) => {
    const vx = clampTo(motion.vx || 0, 3)
    const vy = clampTo(motion.vy || 0, 3)
    const spin = clampTo(motion.spin || 0, 8)
    const kx = clampTo((vx - lastVX) / dt, 20)
    const ky = clampTo((vy - lastVY) / dt, 20)
    lastVX = vx
    lastVY = vy
    const blend = Math.min(1, dt * 10)
    accX += (kx - accX) * blend
    accY += (ky - accY) * blend
    // tail: the tip (node 0) lags most, the node on the body least
    for (let k = 0; k < 4; k += 1) {
      const g = 0.08 * (1 + 0.6 * (3 - k))
      FX[k] = -accX * g - spin * 0.1 * (4 - k)
      FY[k] = -accY * g * 0.8 + 0.5 * Math.sin(time * 1.7 + k * 1.3) + kick * 0.9 * Math.sin(time * 9 - k * 0.8)
    }
    springStep(tailX, tailVX, FX, 25, 2.5, 0.16, dt)
    springStep(tailY, tailVY, FY, 25, 2.5, 0.16, dt)
    // fan flutter (one spring)
    FX[0] = -accY * 0.02 - spin * 0.03 + 0.25 * Math.sin(time * 2.2) + kick * 0.7 * Math.sin(time * 8)
    springStep(fanX, fanV, FX, 20, 3, 0.35, dt)
    // crest: further along the body, more lag
    for (let k = 0; k < 4; k += 1) {
      const g = 0.1 + 0.1 * k
      FX[k] = -accX * g - spin * 0.04 * (k + 1)
      FY[k] = -accY * g * 0.8 + 0.4 * Math.sin(time * 2.9 + k * 1.1)
    }
    springStep(crX, crVX, FX, 30, 3, 0.2, dt)
    springStep(crY, crVY, FY, 30, 3, 0.2, dt)
    // cheek frill tips: outer tips lag most
    for (let r = 0; r < FRILL_N; r += 1) {
      const g = 0.05 + 0.04 * (r & 3)
      FX[r] = -accX * g
      FY[r] = -accY * g * 0.8 + 0.3 * Math.sin(time * 2.1 + r * 0.9) + kick * 0.6 * Math.sin(time * 7 + r)
    }
    springStep(frX, frVX, FX, 40, 6, 0.12, dt)
    springStep(frY, frVY, FY, 40, 6, 0.12, dt)
    // whiskers: a chain per whisker, each joint pulled by the one before it
    for (let b = 0; b < BAR.length; b += 1) {
      for (let j = 1; j <= BK; j += 1) {
        const idx = b * BK + j - 1
        const s = j / BK
        const prev = j > 1 ? wX[idx - 1] : 0
        FX[idx] =
          -accX * 0.15 * s - spin * 0.05 * s + 1.5 * Math.sin(time * 2.3 + b * 1.9 + j * 0.8) * s + kick * 2.0 * Math.sin(time * 11 + idx) * s + 30 * (prev - wX[idx])
      }
    }
    springStep(wX, wV, FX, 50, 5, 0.2, dt)
  }

  // ---- PEARL TIDE: the signature move. Everything is made once here and only moved in update.
  const MOVE_T = 4.2
  const PN = lite ? 36 : 110 // pearls and droplets in the pool
  const MIST_N = lite ? 3 : 5
  const RIP_N = 3
  const hdr = lite ? 1 : 1.5 // HDR tint on desktop (blooms above 1.3), clamped in lite
  const mouthRest = headWorld(0.6 * HSCALE, -0.03 * HSCALE, 0)
  const pearlGeo = new THREE.IcosahedronGeometry(1, 1)
  const pearlMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
  const pearls = new THREE.InstancedMesh(pearlGeo, pearlMat, PN)
  pearls.frustumCulled = false
  pearls.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const pSpawn = new Float32Array(PN)
  const pLife = new Float32Array(PN)
  const pPhi = new Float32Array(PN)
  const pSize = new Float32Array(PN)
  const pSpeed = new Float32Array(PN)
  const tints = [
    [0.55, 1.0, 0.86], // pale jade
    [0.82, 0.94, 1.0], // ice white
    [1.0, 0.8, 0.4], // a little gold
  ]
  const tmpCol = new THREE.Color()
  for (let k = 0; k < PN; k += 1) {
    const h1 = hash(k * 1.73 + 0.31)
    const h2 = hash(k * 2.9 + 4.1)
    const h3 = hash(k * 0.61 + 9.7)
    pSpawn[k] = 1.0 + 1.4 * (k / PN) + 0.12 * h1
    pLife[k] = 1.2 + 0.5 * h2
    pPhi[k] = k * 2.39996 + h1 * 0.6
    pSize[k] = 0.012 + 0.012 * h3
    pSpeed[k] = 0.85 + 0.3 * h2
    const tn = tints[k % 3]
    tmpCol.setRGB(tn[0] * hdr, tn[1] * hdr, tn[2] * hdr)
    pearls.setColorAt(k, tmpCol)
  }
  pearls.instanceColor.needsUpdate = true
  group.add(pearls)
  const dummy = new THREE.Object3D()

  const mistCanvas = document.createElement('canvas')
  mistCanvas.width = 64
  mistCanvas.height = 64
  const mctx = mistCanvas.getContext('2d')
  const mg = mctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  mg.addColorStop(0, 'rgba(255,255,255,1)')
  mg.addColorStop(0.45, 'rgba(255,255,255,0.35)')
  mg.addColorStop(1, 'rgba(255,255,255,0)')
  mctx.fillStyle = mg
  mctx.fillRect(0, 0, 64, 64)
  const mistTex = new THREE.CanvasTexture(mistCanvas)
  mistTex.colorSpace = THREE.SRGBColorSpace
  const mists = []
  for (let i = 0; i < MIST_N; i += 1) {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: mistTex,
        color: new THREE.Color(0.5, 0.95, 0.85),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0,
      }),
    )
    sp.frustumCulled = false
    group.add(sp)
    mists.push(sp)
  }
  const ringGeo = new THREE.RingGeometry(0.8, 1, 48)
  const rings = []
  for (let j = 0; j < RIP_N; j += 1) {
    const rm = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.6 * hdr, 1.0 * hdr, 0.9 * hdr),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0,
        side: THREE.DoubleSide,
      }),
    )
    rm.frustumCulled = false
    group.add(rm)
    rings.push(rm)
  }

  let moveT = -1 // seconds into the move, -1 when idle
  let disposed = false
  let sculpt = null // the kaiju sculpt, once loaded (see loadSculpt)
  let kick = 0 // whip force on the springs while the move runs
  let hf = 0 // head offset forward (model units) while the move runs
  let hu = 0 // head offset up
  // every pearl's place: a spiralling ribbon out of the mouth, a slow sweep round the coil, then rain
  const placePearls = (t, lift, WR, floorY, ceilY) => {
    const mx = mouthRest[0] + Fv.x * hf + Uv.x * hu
    const my = mouthRest[1] + Fv.y * hf + Uv.y * hu
    const mz = mouthRest[2] + Fv.z * hf + Uv.z * hu
    for (let k = 0; k < PN; k += 1) {
      const age = t - pSpawn[k]
      let sc = 0
      let px = 0
      let py = 0
      let pz = 0
      if (age > 0 && age < pLife[k]) {
        const fade = Math.min(1, (pLife[k] - age) * 3)
        const s = (pSpeed[k] * WR * 1.3 * (1 - Math.exp(-2.2 * age))) / 2.2
        const fallT = Math.max(0, age - 1.0)
        const drop = 0.22 * WR * fallT * fallT
        const rad = (0.04 + 0.16 * Math.min(age, 1.2)) * WR * lift
        const th = pPhi[k] + 7.0 * age
        const sweep = 0.35 * WR * lift * Math.sin(1.6 * age + pPhi[k] * 0.3) * Math.min(1, age * 1.5)
        const side = sweep + rad * Math.cos(th)
        const upo = rad * Math.sin(th)
        px = mx + Fv.x * s + Sv.x * side + Uv.x * upo
        py = my + Fv.y * s + Sv.y * side + Uv.y * upo - drop
        pz = mz + Fv.z * s + Sv.z * side + Uv.z * upo
        // inside the band: a pearl fades as it nears the floor or the ceiling
        const edge = clamp01((py - floorY) / (0.2 * WR)) * clamp01((ceilY - py) / (0.1 * WR))
        sc = pSize[k] * WR * fade * edge
      }
      dummy.position.set(px, py, pz)
      dummy.scale.setScalar(sc)
      dummy.updateMatrix()
      pearls.setMatrixAt(k, dummy.matrix)
    }
    pearls.instanceMatrix.needsUpdate = true
  }

  const act = () => {
    if (moveT >= 0) return // already playing: never restart it
    moveT = 0
  }

  const update = (time, dt, energy, motion = STILL) => {
    eS += (energy - eS) * Math.min(1, dt * 4)
    const ru = motion.roomUp ?? 1
    const rd = motion.roomDown ?? 1
    // room squeezes the move: on a phone the head lifts less and the rain falls a shorter way
    const lift = 0.25 + 0.75 * clamp01((ru - 0.25) / 0.5)
    const WR = W + ROOM_PAD
    if (moveT >= 0) {
      moveT += dt
      if (moveT >= MOVE_T) moveT = -1
    }
    let g1 = 0 // gather: the coil tightens and the head draws back
    let s1 = 0 // strike and exhale
    let mist = 0
    if (moveT >= 0) {
      g1 = smooth(0, 0.9, moveT) * (1 - smooth(1.4, 1.9, moveT))
      s1 = smooth(1.0, 1.35, moveT) * (1 - smooth(2.2, 3.0, moveT))
      mist = smooth(0.5, 1.2, moveT) * (1 - smooth(3.4, 4.2, moveT))
    }
    kick = s1 * 0.8 + g1 * 0.15
    hf = lift * WR * (-0.05 * g1 + 0.08 * s1)
    hu = lift * WR * (0.045 * g1 - 0.02 * s1)
    if (dt > 0) stepPhysics(time, dt, motion)
    const e = eS
    const omega = 2.0 + 3.0 * e
    wavePh += omega * dt
    const amp = (0.9 + 0.5 * e) * (1 + 0.5 * s1 + 0.2 * g1)
    // spine: wave from behind the head to the tail, head stays still
    for (let i = 0; i < N; i++) {
      const u = U[i]
      const fade = smooth(1.0, 0.8, u)
      const A = fade * (0.1 + 0.07 * (1 - u)) * amp
      const phi = KWAVE * (1 - u) - wavePh
      const disp = A * Math.sin(phi)
      const lat = A * 0.5 * Math.cos(phi * 0.7 + 0.6)
      const stretch = -0.06 * e * (1 - u)
      const bu = (u - 0.62) / 0.18
      G[i] = 1 + 0.03 * Math.sin(time * 1.3) * Math.exp(-(bu * bu))
      FL[i] = (0.03 + 0.09 * e) * Math.sin(phi - 1.3)
      const k3 = i * 3
      CX[i] = C0[k3] + D0[k3] * disp + L0[k3] * lat + T0[k3] * stretch
      CY[i] = C0[k3 + 1] + D0[k3 + 1] * disp + L0[k3 + 1] * lat + T0[k3 + 1] * stretch
      CZ[i] = C0[k3 + 2] + D0[k3 + 2] * disp + L0[k3 + 2] * lat + T0[k3 + 2] * stretch
      // the coil gathers toward its middle while the move winds up (the neck stays on the head)
      const tight = lift * 0.07 * g1 * smooth(0.9, 0.7, u)
      CX[i] += (mcx - C0[k3]) * tight
      CY[i] += (mcy - C0[k3 + 1]) * tight
      CZ[i] += (mcz - C0[k3 + 2]) * tight
      // tail springs: the offset fades out toward the body; the crest reads its own springs
      const tw = smooth(0.34, 0.2, u) * W
      const ox = tw * chainAt(tailX, TAIL_U, u)
      const oy = tw * chainAt(tailY, TAIL_U, u)
      CX[i] += L0[k3] * ox + D0[k3] * oy
      CY[i] += L0[k3 + 1] * ox + D0[k3 + 1] * oy
      CZ[i] += L0[k3 + 2] * ox + D0[k3 + 2] * oy
      CRX[i] = chainAt(crX, CREST_U, u) * W
      CRY[i] = chainAt(crY, CREST_U, u) * W
    }
    // body
    for (let v = 0; v < BV; v++) {
      const i = bRing[v]
      const k3 = i * 3
      const g = G[i]
      const lc = bLc[v] * g
      const dc = bDc[v] * g
      const v3 = v * 3
      bodyPos[v3] = CX[i] + L0[k3] * lc + D0[k3] * dc
      bodyPos[v3 + 1] = CY[i] + L0[k3 + 1] * lc + D0[k3 + 1] * dc
      bodyPos[v3 + 2] = CZ[i] + L0[k3 + 2] * lc + D0[k3 + 2] * dc
    }
    bodyGeo.attributes.position.needsUpdate = true

    // dorsal crest: flutters a beat behind the body
    const fp = finGeo.attributes.position.array
    for (let v = 0; v < FN; v++) {
      const i = fRing[v]
      const k3 = i * 3
      const g = G[i]
      const lc = fLc[v] * g + fFw[v] * CRX[i]
      const dc = fDc[v] * g + fFw[v] * (FL[i] + CRY[i])
      const v3 = v * 3
      fp[v3] = CX[i] + L0[k3] * lc + D0[k3] * dc
      fp[v3 + 1] = CY[i] + L0[k3 + 1] * lc + D0[k3 + 1] * dc
      fp[v3 + 2] = CZ[i] + L0[k3 + 2] * lc + D0[k3 + 2] * dc
    }
    finGeo.attributes.position.needsUpdate = true
    finGeo.computeVertexNormals()

    // tail fan: spokes sweep around the tail tip and ripple
    const tp = tailGeo.attributes.position.array
    const t2 = 2 * 3
    const fanK = 1 + fanX[0]
    const cxp = CX[2]
    const cyp = CY[2]
    const czp = CZ[2]
    for (let f = 0; f < 2; f++) {
      // fan plane spans the tail direction and the side vector; its normal is the other side vector
      const sideX = f === 0 ? D0[t2] : L0[t2]
      const sideY = f === 0 ? D0[t2 + 1] : L0[t2 + 1]
      const sideZ = f === 0 ? D0[t2 + 2] : L0[t2 + 2]
      const nX = f === 0 ? L0[t2] : D0[t2]
      const nY = f === 0 ? L0[t2 + 1] : D0[t2 + 1]
      const nZ = f === 0 ? L0[t2 + 2] : D0[t2 + 2]
      const lenBase = f === 0 ? 0.36 : 0.2
      for (let m = 0; m <= FM; m++) {
        const a = -1.0 + (2.0 * m) / FM
        const ca = Math.cos(a)
        const sa = Math.sin(a)
        // ribs sit on every FRIB-th sample; the membrane dips between them (scalloped edge)
        const ribPhase = 0.5 + 0.5 * Math.cos((TAU * m) / FRIB)
        const ribP = ribPhase * ribPhase * ribPhase * ribPhase
        const scal = 0.9 + 0.1 * Math.cos((TAU * m) / FRIB)
        const wob = 1 + 0.1 * Math.sin(time * 2.6 - m * 0.22) * (0.4 + e)
        const lenE = lenBase * (0.7 + 0.3 * ca) * scal * wob * fanK
        const exX = -T0[t2] * ca + sideX * sa
        const exY = -T0[t2 + 1] * ca + sideY * sa
        const exZ = -T0[t2 + 2] * ca + sideZ * sa
        for (let rr = 0; rr < FR; rr++) {
          const t = rr / (FR - 1)
          const len = lenE * t
          // cupped membrane (deepest at the centre of the fan) with raised ribs
          const off = lenE * (0.28 * (1 - ca * ca) * t + 0.12 * ribP * t)
          const px = cxp + exX * len + nX * off
          const py = cyp + exY * len + nY * off
          const pz = czp + exZ * len + nZ * off
          const i0 = fanIdx(f, 0, rr, m) * 3
          tp[i0] = px
          tp[i0 + 1] = py
          tp[i0 + 2] = pz
          const i1 = fanIdx(f, 1, rr, m) * 3
          tp[i1] = px - nX * THICK
          tp[i1 + 1] = py - nY * THICK
          tp[i1 + 2] = pz - nZ * THICK
        }
      }
    }
    tailGeo.attributes.position.needsUpdate = true
    tailGeo.computeVertexNormals()

    // head: almost still, a slow breath and nod
    headNod.rotation.set(
      0.025 * Math.sin(time * 0.6) * (1 + e),
      0.035 * Math.sin(time * 0.45),
      0.02 * Math.sin(time * 0.7) + lift * (0.2 * g1 - 0.12 * s1),
    )
    jawPivot.rotation.z = -(0.1 + 0.03 * Math.sin(time * 0.9) + 0.12 * e + 0.3 * s1) // the jaw opens on the exhale
    headRoot.position.set(Pe[0] + Fv.x * hf + Uv.x * hu, Pe[1] + Fv.y * hf + Uv.y * hu, Pe[2] + Fv.z * hf + Uv.z * hu)

    // whiskers: a beat behind, the sway grows toward the tips
    const sway = 0.05 + 0.06 * e
    for (let b = 0; b < bar.length; b++) {
      const bb = bar[b]
      const root = bb.root
      const len = bb.len
      for (let j = 0; j <= BK; j++) {
        const s = j / BK
        const rad = 0.024 * (1 - 0.6 * s) + 0.003
        const sw = sway * s * s * Math.sin(2.6 * (time - 0.2) - 2.0 * s + b * 0.7) + (j > 0 ? wX[b * BK + j - 1] * W : 0)
        const cxw = root[0] + bb.d[0] * len * s + bb.Lb[0] * sw
        const cyw = root[1] + bb.d[1] * len * s + bb.Lb[1] * sw
        const czw = root[2] + bb.d[2] * len * s + bb.Lb[2] * sw
        for (let k = 0; k < BSEG; k++) {
          const a = (k * TAU) / BSEG
          const ca = Math.cos(a) * rad
          const sa = Math.sin(a) * rad
          const idx = (bb.start + j * BSEG + k) * 3
          barbelPos[idx] = cxw + bb.Lb[0] * ca + bb.Db[0] * sa
          barbelPos[idx + 1] = cyw + bb.Lb[1] * ca + bb.Db[1] * sa
          barbelPos[idx + 2] = czw + bb.Lb[2] * ca + bb.Db[2] * sa
          // analytic tube normal: the unit ring direction, no per-frame recompute
          const cu = Math.cos(a)
          const su = Math.sin(a)
          barbelNrm[idx] = cu * bb.Lb[0] + su * bb.Db[0]
          barbelNrm[idx + 1] = cu * bb.Lb[1] + su * bb.Db[1]
          barbelNrm[idx + 2] = cu * bb.Lb[2] + su * bb.Db[2]
        }
      }
    }
    barbelGeo.attributes.position.needsUpdate = true
    barbelGeo.attributes.normal.needsUpdate = true

    // cheek frills: each tip rides its spring; the rib curves and the webs follow
    const fr = frillGeo.attributes.position.array
    for (let r = 0; r < FRILL_N; r += 1) {
      const rib = frillRibs[r]
      const B = rib.B
      const tx = rib.tip[0]
      const ty = rib.tip[1] + frY[r] * W
      const tz = rib.tip[2] + frX[r] * W * rib.side
      frillTip[r * 3] = tx
      frillTip[r * 3 + 1] = ty
      frillTip[r * 3 + 2] = tz
      const mx = (B[0] + tx) / 2
      const my = (B[1] + ty) / 2 + 0.02
      const mz = (B[2] + tz) / 2
      for (let k = 0; k < FRILL_K; k += 1) {
        const t = k / (FRILL_K - 1)
        const o = 1 - t
        const w1 = o * o
        const w2 = 2 * o * t
        const w3 = t * t
        const cx = w1 * B[0] + w2 * mx + w3 * tx
        const cy = w1 * B[1] + w2 * my + w3 * ty
        const cz = w1 * B[2] + w2 * mz + w3 * tz
        const ring = rib.rings[k]
        for (let j = 0; j < TS; j += 1) {
          const ca = COS_TS[j] * ring.r
          const sa = SIN_TS[j] * ring.r
          put(fr, (rib.base + k * TS + j) * 3, cx + ring.L[0] * ca + ring.D[0] * sa, cy + ring.L[1] * ca + ring.D[1] * sa, cz + ring.L[2] * ca + ring.D[2] * sa)
        }
        if (k === 0) put(fr, rib.cap0 * 3, cx, cy, cz)
        if (k === FRILL_K - 1) put(fr, rib.cap1 * 3, cx, cy, cz)
      }
    }
    for (const web of frillWebs) {
      const B = web.B
      const i0 = web.r * 3
      const i1 = (web.r + 1) * 3
      const t0 = frillTip[i0]
      const t1 = frillTip[i0 + 1]
      const t2 = frillTip[i0 + 2]
      const u0 = frillTip[i1]
      const u1 = frillTip[i1 + 1]
      const u2 = frillTip[i1 + 2]
      put(fr, web.a * 3, B[0], B[1], B[2])
      put(fr, web.b * 3, t0, t1, t2)
      put(fr, web.c * 3, u0, u1, u2)
      put(fr, web.m * 3, (t0 + u0) * 0.375 + B[0] * 0.25, (t1 + u1) * 0.375 + B[1] * 0.25, (t2 + u2) * 0.375 + B[2] * 0.25)
    }
    frillGeo.attributes.position.needsUpdate = true
    frillGeo.computeVertexNormals()

    if (sculpt) deformSculpt(time, e, g1, s1)

    // the move's effects: pearls and droplets, ripples where the stream breaks, and the mist
    const floorY = -rd * WR * 0.92
    const ceilY = ru * WR * 0.92
    placePearls(moveT, lift, WR, floorY, ceilY) // moveT is -1 when idle: every pearl is hidden
    for (let j = 0; j < RIP_N; j += 1) {
      const rip = rings[j]
      const rt = moveT - (2.1 + 0.4 * j)
      const life = 1.2
      if (rt > 0 && rt < life) {
        const q = rt / life
        const along = (0.45 + 0.2 * j) * WR * (0.5 + 0.5 * lift)
        rip.position.set(
          mouthRest[0] + Fv.x * (hf + along),
          mouthRest[1] + Fv.y * (hf + along) - 0.05 * WR * lift,
          mouthRest[2] + Fv.z * (hf + along),
        )
        rip.scale.setScalar(WR * (0.05 + 0.2 * q))
        rip.material.opacity = 0.5 * (1 - q)
      } else {
        rip.material.opacity = 0
      }
    }
    const st = smooth(3.0, 4.2, moveT) // the settle: the mist drifts round the coil's middle
    for (let i = 0; i < MIST_N; i += 1) {
      const sp = mists[i]
      const along = (0.25 + 0.22 * i) * WR * (0.4 + 0.6 * lift)
      const ph = i * 1.7
      const sx = mouthRest[0] + Fv.x * (hf + along) + Uv.x * 0.12 * WR * Math.sin(moveT * 1.3 + ph)
      const sy = mouthRest[1] + Fv.y * (hf + along) + Uv.y * 0.12 * WR * Math.sin(moveT * 1.3 + ph)
      const sz = mouthRest[2] + Fv.z * (hf + along) + Uv.z * 0.12 * WR * Math.sin(moveT * 1.3 + ph)
      sp.position.set(sx + (mcx - sx) * st, sy + (mcy - sy) * st, sz + (mcz - sz) * st)
      sp.scale.setScalar(WR * (0.36 + 0.06 * i) * (1 + 0.3 * st))
      sp.material.opacity = 0.11 * mist * (1 - 0.4 * i / MIST_N)
    }
  }

  // ---- silhouette bounds at rest, for size and centring
  update(0, 0, 0)
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const grow = (x, y) => {
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
  // body and crest bounds from a fixed fine sample of the spine (with slack for the wave and the crest), so lite and full agree
  for (let k = 0; k <= 240; k++) {
    spine.getPointAt(k / 240, pv)
    const r = radiusAt(k / 240) + 0.1
    grow(pv.x - r, pv.y - r)
    // the dorsal crest and fin rise above the spine, so the top has extra room
    grow(pv.x + r, pv.y + r + 0.1)
  }
  // the tail fan is bounded from a fixed spine point (not the lite/full ring) so both builds report the same size
  spine.getPointAt(0.0163, pv)
  grow(pv.x - 0.4, pv.y - 0.4)
  grow(pv.x + 0.4, pv.y + 0.4)
  for (let v = 0; v < HEAD.p.length / 3; v++) {
    const w = headWorld(HEAD.p[v * 3], HEAD.p[v * 3 + 1], HEAD.p[v * 3 + 2])
    grow(w[0], w[1])
  }
  for (let v = 0; v < frillPos.length / 3; v++) {
    const w = headWorld(frillPos[v * 3], frillPos[v * 3 + 1], frillPos[v * 3 + 2])
    grow(w[0], w[1])
  }
  for (let v = 0; v < barbelPos.length / 3; v++) {
    const w = headWorld(barbelPos[v * 3], barbelPos[v * 3 + 1], barbelPos[v * 3 + 2])
    grow(w[0], w[1])
  }
  const w = maxX - minX
  const h = maxY - minY
  W = w
  // room for the wave, the whiskers and the fan's flutter; tighter than the first pass so the coil fills the frame
  const SLACK_X = 0.12
  const SLACK_Y = 0.28
  const s = 2 / Math.max(w + SLACK_X, h + SLACK_Y)
  const cxB = (minX + maxX) / 2
  const cyB = (minY + maxY) / 2
  group.scale.setScalar(s)
  group.position.set(-cxB * s, -cyB * s, 0)
  const size = { x: (w + SLACK_X) * s, y: (h + SLACK_Y) * s }
  // how far the rest silhouette reaches from the centre; the move stays inside the room the page gives
  const reach = { up: (maxY - cyB) * s + 0.1 * (w + SLACK_X) * s, down: (cyB - minY) * s + 0.25 * (w + SLACK_X) * s }

  // ---- the kaiju sculpt: the river colossus that holds this place now. Loaded once and deformed on
  // the CPU each frame by smooth weights from its rest shape (never bound to the serpent's rings, so it
  // cannot tear): it breathes, the tail sways on the tail springs, and on PEARL TIDE it rears back,
  // then lunges and exhales the pearls from its own mouth. The code serpent stays hidden as the fallback.
  async function loadSculpt() {
    const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/loaders/DRACOLoader.js'),
    ])
    const draco = new DRACOLoader()
    draco.setDecoderPath('/draco/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(draco)
    let gltf
    try {
      gltf = await loader.loadAsync(lite ? KAIJU_URL_LITE : KAIJU_URL)
    } finally {
      draco.dispose()
    }
    gltf.scene.updateMatrixWorld(true)
    let src = null
    gltf.scene.traverse((c) => {
      if (c.isMesh && !src) src = c
    })
    const freeScene = () =>
      gltf.scene.traverse((c) => {
        if (c.geometry) c.geometry.dispose()
        for (const mt of [].concat(c.material || [])) if (mt !== src?.material) mt.dispose()
      })
    if (!src) {
      freeScene()
      throw new Error('kaiju sculpt has no mesh')
    }
    const geo = src.geometry.clone()
    geo.applyMatrix4(src.matrixWorld)
    freeScene()
    const m = src.material
    const tex = [m.map, m.aoMap, m.roughnessMap, m.normalMap].filter(Boolean)
    if (disposed) {
      geo.dispose()
      for (const t of tex) t.dispose()
      m.dispose()
      return
    }
    // centre on the bounding box, largest side 2
    geo.computeBoundingBox()
    const bb = geo.boundingBox
    const sw = bb.max.x - bb.min.x
    const sh = bb.max.y - bb.min.y
    const sn = 2 / Math.max(sw, sh)
    geo.translate(-(bb.min.x + bb.max.x) / 2, -(bb.min.y + bb.max.y) / 2, -(bb.min.z + bb.max.z) / 2)
    geo.scale(sn, sn, sn)
    const pos = geo.attributes.position.array
    const n = geo.attributes.position.count
    const P0 = Float32Array.from(pos)
    const hw = (sw * sn) / 2
    const hh = (sh * sn) / 2

    // weights from the rest shape (u, v: -1..1 across the half width and height). The kaiju faces
    // screen left: head and jaws up at -u, the tail sweeping out to +u, the feet planted at -v.
    const wH = new Float32Array(n) // head and neck
    const wT = new Float32Array(n) // tail
    const wU = new Float32Array(n) // upper body: leans on the hips for the rear-back and the lunge
    let tipX = Infinity
    let tipY = 0
    for (let i = 0; i < n; i += 1) {
      const u = P0[3 * i] / hw
      const v = P0[3 * i + 1] / hh
      wH[i] = smooth(0.0, -0.45, u) * smooth(0.0, 0.45, v)
      wT[i] = smooth(0.12, 0.7, u) * smooth(0.55, 0.25, v)
      wU[i] = smooth(-0.3, 0.15, v) * smooth(0.5, 0.15, u)
      if (v > 0.3 && P0[3 * i] < tipX) {
        tipX = P0[3 * i]
        tipY = P0[3 * i + 1]
      }
    }
    geo.attributes.position.setUsage(THREE.DynamicDrawUsage)
    geo.deleteAttribute('normal') // flat-shaded: the shader derives each face

    const mat = new THREE.MeshPhysicalMaterial({
      map: m.map || null,
      aoMap: m.aoMap || null,
      roughnessMap: m.roughnessMap || null,
      roughness: 0.7,
      metalness: 0.1,
      normalMap: m.normalMap || null,
      flatShading: true,
      side: THREE.DoubleSide,
      envMap,
      envMapIntensity: lite ? 0.55 : 0.65,
      emissive: new THREE.Color(0, 0, 0),
    })
    if (m.normalMap) mat.normalScale.copy(m.normalScale)
    if (!lite) {
      mat.clearcoat = 0.35
      mat.clearcoatRoughness = 0.35
    }
    // a cold river rim on the silhouette, like moonlight off wet scales
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float rimF = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 3.0);
        totalEmissiveRadiance += vec3(0.1, 0.42, 0.36) * rimF * 0.2;`,
      )
    }
    m.dispose()

    // the frame in group units: the sculpt fills the creature's box with room for the sway and the lunge
    const fw = 2 * hw * 1.1
    const fh = 2 * hh * 1.08
    const hs = 2 / (Math.max(fw, fh) * s)
    const mesh = new THREE.Mesh(geo, mat)
    mesh.frustumCulled = false
    const holder = new THREE.Group()
    holder.position.set(cxB, cyB, 0)
    holder.scale.setScalar(hs)
    holder.add(mesh)
    group.add(holder)
    for (const c of [bodyMesh, finMesh, tailMesh, headRoot]) c.visible = false
    size.x = fw * hs * s
    size.y = fh * hs * s
    reach.up = size.y / 2 + 0.05 * size.x
    reach.down = size.y / 2 + 0.15 * size.x
    // the move now comes from the kaiju: its mouth, its facing, and its middle for the mist to settle on
    W = 2 * hw * hs
    const toG = (x, y) => [cxB + x * hs, cyB + y * hs]
    const [mx0, my0] = toG(tipX + 0.06 * hw, tipY - 0.05 * hh)
    mouthRest[0] = mx0
    mouthRest[1] = my0
    mouthRest[2] = 0.05 * W
    Fv.set(-0.97, -0.14, 0.2).normalize()
    Uv.set(-0.14, 0.99, 0).normalize()
    Sv.crossVectors(Fv, Uv).normalize()
    mcx = cxB
    mcy = cyB
    mcz = 0
    sculpt = { geo, mat, tex, P0, pos, wH, wT, wU, n, hw, hh, hs }
  }

  // one frame of the kaiju's motion: breath, tail sway with the springs' lag, the rear-back and the lunge
  function deformSculpt(time, e, g1, s1) {
    const S = sculpt
    const P0 = S.P0
    const p = S.pos
    const hw = S.hw
    const hh = S.hh
    const breath = Math.sin(time * 1.4)
    // the upper body leans about the hips: back as the move gathers, forward into the strike
    const lean = 0.02 * Math.sin(time * 0.7) - 0.16 * g1 + 0.2 * s1
    const cl = Math.cos(lean)
    const sl = Math.sin(lean)
    const hipX = 0.05 * hw
    const hipY = -0.15 * hh
    // the head pitches on top: up and back as it draws breath, snapping down and forward to exhale
    const nod = 0.03 * Math.sin(time * 0.9) * (1 + e) - 0.14 * g1 + 0.1 * s1
    const cn = Math.cos(nod)
    const sn = Math.sin(nod)
    const nkX = -0.28 * hw
    const nkY = 0.32 * hh
    // the head's own offset on the move, from the serpent's head path (group units back to sculpt units)
    const hx = (Fv.x * hf + Uv.x * hu) / S.hs
    const hy = (Fv.y * hf + Uv.y * hu) / S.hs
    const lag = (tailX[3] + 0.5 * tailX[1]) * 0.6
    const lagY = (tailY[3] + 0.5 * tailY[1]) * 0.6
    const tAmp = (0.045 + 0.03 * e) * (1 + 0.8 * s1)
    const shake = s1 * 0.006 * Math.sin(time * 37)
    for (let i = 0; i < S.n; i += 1) {
      const k3 = 3 * i
      let x = P0[k3]
      let y = P0[k3 + 1]
      let z = P0[k3 + 2]
      const wu = S.wU[i]
      if (wu > 0) {
        // breath swells the chest a touch, then the lean turns the whole upper body on the hips
        y += wu * 0.008 * breath * hh
        const dx = x - hipX
        const dy = y - hipY
        const c = 1 + (cl - 1) * wu
        const sv = sl * wu
        x = hipX + dx * c - dy * sv
        y = hipY + dx * sv + dy * c
        x += wu * shake
      }
      const wh = S.wH[i]
      if (wh > 0) {
        const dx = x - nkX
        const dy = y - nkY
        const c = 1 + (cn - 1) * wh
        const sv = sn * wh
        x = nkX + dx * c - dy * sv + wh * hx
        y = nkY + dx * sv + dy * c + wh * hy
      }
      const wt = S.wT[i]
      if (wt > 0) {
        const w2 = wt * wt
        const ph = time * 1.1 - x * 2.2
        z += w2 * (tAmp * 1.6 * Math.sin(ph) + lag)
        y += w2 * (tAmp * 0.5 * Math.sin(ph * 0.8 + 1.2) + lagY)
      }
      p[k3] = x
      p[k3 + 1] = y
      p[k3 + 2] = z
    }
    S.geo.attributes.position.needsUpdate = true
    // a cold glow wells up through the scales as it exhales
    const gl = 0.35 * s1 + 0.1 * g1
    S.mat.emissive.setRGB(0.04 * gl, 0.3 * gl, 0.26 * gl)
  }

  try {
    await loadSculpt()
  } catch (err) {
    console.warn('kaiju sculpt not shown, the code-built naga stays:', err)
  }

  const dispose = () => {
    disposed = true
    if (sculpt) {
      sculpt.geo.dispose()
      sculpt.mat.dispose()
      for (const t of sculpt.tex) t.dispose()
      sculpt = null
    }
    for (const g of [bodyGeo, finGeo, tailGeo, headGeo, jawGeo, eyeGeo, barbelGeo, frillGeo, pearlGeo, ringGeo]) g.dispose()
    for (const m of [bodyMat, finMat, eyeMat, pearlMat]) m.dispose()
    for (const r of rings) r.material.dispose()
    for (const sp of mists) sp.material.dispose()
    mistTex.dispose()
    normalTex.dispose()
    colorTex.dispose()
  }

  return {
    group,
    size,
    reach,
    update,
    act,
    dispose,
  }
}
