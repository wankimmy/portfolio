// Naga: the serpent-dragon of Tasik Chini. Self-contained: THREE is handed in.
//
// Build: a coiled spine with one full loop that passes in front of and behind
// itself, a smooth lofted body with a generated shingle normal map that follows
// the form, a webbed dorsal crest, a ribbed tail fan, and a sculpted head (rounded
// skull, brow ridges, cheek bones, nostril bumps, a hinged jaw with teeth, horns,
// spines, webbed cheek frills, whiskers) with small HDR gold eyes.
// Update: a wave runs from behind the head to the tail, the head and the coil
// hold, the crest and fan flutter a beat behind the body, the whiskers trail.
// Normals of the body, crest and fan are refreshed on every call.

export function createCreature(THREE, { envMap, lite }) {
  const TAU = Math.PI * 2
  const N = lite ? 84 : 128 // body rings, tail tip (0) to neck (N-1)
  const SEG = lite ? 14 : 22 // body segments around
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
  const PALE = [0.5, 0.72, 0.6]
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
    const K = (10 * S) / 512
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
      bLc[v] = ca * R[i]
      bDc[v] = sa * R[i] * (sa < 0 ? 0.94 : 1.0)
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
    const shape = 0.3 + 0.7 * wave3 * wave3
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

  // cheek frills: four ribs per side with webbing between them
  for (const s of [1, -1]) {
    const B = [0.0, -0.02, 0.13 * s]
    const tips = [
      [-0.3, 0.15, 0.26 * s],
      [-0.38, 0.05, 0.34 * s],
      [-0.36, -0.05, 0.33 * s],
      [-0.26, -0.13, 0.24 * s],
    ]
    for (const tp of tips) {
      const mid = [(B[0] + tp[0]) / 2, (B[1] + tp[1]) / 2 + 0.02, (B[2] + tp[2]) / 2]
      curveTube(HEAD, B, mid, tp, 4, 0.013, 0.005, (q, k) => (k === 0 ? JADE : GOLD))
    }
    for (let k = 0; k < tips.length - 1; k++) {
      const tk = tips[k]
      const tk1 = tips[k + 1]
      const M = [
        (tk[0] + tk1[0]) * 0.5 * 0.75 + B[0] * 0.25,
        (tk[1] + tk1[1]) * 0.5 * 0.75 + B[1] * 0.25,
        (tk[2] + tk1[2]) * 0.5 * 0.75 + B[2] * 0.25,
      ]
      const a = vert(HEAD, B[0], B[1], B[2], JADE)
      const b = vert(HEAD, tk[0], tk[1], tk[2], GOLD)
      const c = vert(HEAD, tk1[0], tk1[1], tk1[2], GOLD)
      const m = vert(HEAD, M[0], M[1], M[2], mix(JADE, GOLD, 0.35))
      HEAD.i.push(a, b, m, b, c, m, c, a, m)
    }
  }

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
      const bc = mix([0.9, 0.5, 0.12], WHISK_TIP, smooth(0.2, 1.0, s))
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
    normalScale: new THREE.Vector2(0.9, 0.9),
    roughness: 0.46,
    metalness: 0.05,
    envMap,
    envMapIntensity: 0.55,
    clearcoat: lite ? 0 : 0.4,
    clearcoatRoughness: 0.3,
    iridescence: lite ? 0 : 0.2,
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
  for (const m of [bodyMesh, finMesh, tailMesh, headMesh, jawMesh, eyeMesh, barbelMesh]) {
    m.castShadow = false
    m.receiveShadow = false
    m.frustumCulled = false
  }
  headNod.add(headMesh, eyeMesh, barbelMesh, jawPivot)
  headRoot.add(headNod)
  group.add(bodyMesh, finMesh, tailMesh, headRoot)

  // ---- per-frame state (preallocated)
  const CX = new Float32Array(N)
  const CY = new Float32Array(N)
  const CZ = new Float32Array(N)
  const G = new Float32Array(N).fill(1)
  const FL = new Float32Array(N)
  let eS = 0
  const THICK = 0.012

  const update = (time, dt, energy) => {
    eS += (energy - eS) * Math.min(1, dt * 4)
    const e = eS
    const omega = 2.0 + 3.0 * e
    const amp = 0.9 + 0.5 * e
    // spine: wave from behind the head to the tail, head stays still
    for (let i = 0; i < N; i++) {
      const u = U[i]
      const fade = smooth(1.0, 0.8, u)
      const A = fade * (0.1 + 0.07 * (1 - u)) * amp
      const phi = KWAVE * (1 - u) - omega * time
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
    bodyGeo.computeVertexNormals()
    // average the normals across the duplicated seam so it does not show
    {
      const nrm = bodyGeo.attributes.normal.array
      for (let i = 0; i < N; i++) {
        const a = i * SV * 3
        const b = (i * SV + SEG) * 3
        const x = nrm[a] + nrm[b]
        const y = nrm[a + 1] + nrm[b + 1]
        const z = nrm[a + 2] + nrm[b + 2]
        const l = Math.hypot(x, y, z) || 1
        nrm[a] = nrm[b] = x / l
        nrm[a + 1] = nrm[b + 1] = y / l
        nrm[a + 2] = nrm[b + 2] = z / l
      }
      bodyGeo.attributes.normal.needsUpdate = true
    }

    // dorsal crest: flutters a beat behind the body
    const fp = finGeo.attributes.position.array
    for (let v = 0; v < FN; v++) {
      const i = fRing[v]
      const k3 = i * 3
      const g = G[i]
      const lc = fLc[v] * g
      const dc = fDc[v] * g + fFw[v] * FL[i]
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
        const lenE = lenBase * (0.7 + 0.3 * ca) * scal * wob
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
    headNod.rotation.set(0.025 * Math.sin(time * 0.6) * (1 + e), 0.035 * Math.sin(time * 0.45), 0.02 * Math.sin(time * 0.7))
    jawPivot.rotation.z = -(0.1 + 0.03 * Math.sin(time * 0.9) + 0.12 * e)

    // whiskers: a beat behind, the sway grows toward the tips
    const sway = 0.05 + 0.06 * e
    for (let b = 0; b < bar.length; b++) {
      const bb = bar[b]
      const root = bb.root
      const len = bb.len
      for (let j = 0; j <= BK; j++) {
        const s = j / BK
        const rad = 0.024 * (1 - 0.6 * s) + 0.003
        const sw = sway * s * s * Math.sin(2.6 * (time - 0.2) - 2.0 * s + b * 0.7)
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
  for (let v = 0; v < barbelPos.length / 3; v++) {
    const w = headWorld(barbelPos[v * 3], barbelPos[v * 3 + 1], barbelPos[v * 3 + 2])
    grow(w[0], w[1])
  }
  const w = maxX - minX
  const h = maxY - minY
  // room for the wave, the whiskers and the fan's flutter; tighter than the first pass so the coil fills the frame
  const SLACK_X = 0.12
  const SLACK_Y = 0.28
  const s = 2 / Math.max(w + SLACK_X, h + SLACK_Y)
  const cxB = (minX + maxX) / 2
  const cyB = (minY + maxY) / 2
  group.scale.setScalar(s)
  group.position.set(-cxB * s, -cyB * s, 0)
  const size = { x: (w + SLACK_X) * s, y: (h + SLACK_Y) * s }

  const dispose = () => {
    for (const g of [bodyGeo, finGeo, tailGeo, headGeo, jawGeo, eyeGeo, barbelGeo]) g.dispose()
    for (const m of [bodyMat, finMat, eyeMat]) m.dispose()
    normalTex.dispose()
    colorTex.dispose()
  }

  return { group, size, update, dispose }
}
