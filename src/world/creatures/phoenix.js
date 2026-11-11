/**
 * The phoenix: a firebird reborn, the sign for old systems rebuilt.
 *
 * Built in code, no imports. The body, head, legs and chest feathers are
 * static meshes. The wings (arms plus layered cambered feathers), the crest
 * and the tail plumes are dynamic: their vertices are rewritten each frame
 * through preallocated typed arrays and their normals are recomputed. The
 * head is a child pivot that nods with the beat. Surface detail comes from
 * two generated normal maps: overlapping scales on the body and barbs across
 * each feather vane.
 */

const TAU = Math.PI * 2
const HALF_PI = Math.PI / 2

// Colours. Values above 1 are HDR: they bloom on desktop and still read on phones.
const EMBER = [0.34, 0.05, 0.02]
const DEEP = [0.2, 0.035, 0.015]
const AMBER = [0.6, 0.15, 0.025]
const GOLD = [0.95, 0.4, 0.08]
const MOLTEN = [0.78, 0.22, 0.04]
const PALE = [1.0, 0.6, 0.26]
const HOT = [1.9, 1.12, 0.42]
const EYE_DARK = [0.16, 0.03, 0.012]

const SHOULDER = [0.12, 0.3, 0]
const UPPER = 0.6
const FORE = 0.6
const HEAD_PIVOT = [0.035, 0.56, 0.09]
const CREST_ROOT = [-0.03, 0.12, -0.02] // relative to the head pivot
const PLUME_ROOT = [0, -0.5, -0.04]
const PLUME_LEN = [0.95, 1.12, 1.25, 1.35, 1.25, 1.1, 0.95]
const EMBER_COUNT = 40
const ARM_RAD = [0.04, 0.034, 0.028, 0.022, 0.015]

// torso rings, bottom to neck: y, x, z, rx, rz, tone (0 = back and hips, 1 = breast)
// the neck (y above 0.15) bends in x: base, back, forward, into the head: an S-curve
const TORSO = [
  [-0.54, 0, -0.02, 0.05, 0.05, 0.0],
  [-0.46, 0, -0.01, 0.1, 0.095, 0.0],
  [-0.36, 0, 0.0, 0.18, 0.16, 0.2],
  [-0.24, 0, 0.03, 0.29, 0.24, 0.55],
  [-0.12, 0, 0.07, 0.34, 0.27, 0.85],
  [0.0, 0, 0.09, 0.3, 0.23, 0.95],
  [0.1, 0.03, 0.1, 0.19, 0.16, 0.75],
  [0.2, -0.05, 0.1, 0.14, 0.13, 0.5],
  [0.3, -0.03, 0.1, 0.1, 0.095, 0.55],
  [0.4, 0.04, 0.1, 0.09, 0.085, 0.65],
  [0.48, 0.05, 0.1, 0.08, 0.078, 0.7],
  [0.56, 0.05, 0.09, 0.075, 0.072, 0.7],
]

function fract(x) {
  return x - Math.floor(x)
}
function smooth(x) {
  return x * x * (3 - 2 * x)
}
function clamp01(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x
}
function lerp(a, b, t) {
  return a + (b - a) * t
}
function mix(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}
function shade(c, s) {
  return [c[0] * s, c[1] * s, c[2] * s]
}
function hash(n) {
  const s = Math.sin(n * 91.3458 + 17.17) * 47453.5453
  return s - Math.floor(s)
}
// 1 at the top of the stroke, 0 at the bottom. The downstroke is the short, fast half.
function beat(u) {
  const f = fract(u)
  return f < 0.4 ? 1 - smooth(f / 0.4) : smooth((f - 0.4) / 0.6)
}
function smooth01(x) {
  return smooth(clamp01(x))
}

// feather colour along its length (u: root 0 to tip 1) and across the vane (t: -1 to 1).
// Deep ember roots, amber and gold through the body of the feather, white-hot only at the tips.
function featherColor(u, t) {
  const c =
    u < 0.35
      ? mix(DEEP, EMBER, u / 0.35)
      : u < 0.62
        ? mix(EMBER, AMBER, (u - 0.35) / 0.27)
        : u < 0.88
          ? mix(AMBER, GOLD, (u - 0.62) / 0.26)
          : mix(GOLD, HOT, (u - 0.88) / 0.12)
  return shade(c, (1 - 0.16 * Math.abs(t)) * (u < 0.88 ? 0.9 : 1))
}

// ---- generated textures ----------------------------------------------------

// overlapping rounded scales on a 16 x 16 periodic lattice (height 0..1)
function scaleHeight(x, y) {
  const NX = 16
  const NY = 16
  const gx = x * NX
  const gy = y * NY
  const j0 = Math.floor(gy)
  let best = 0
  for (let jj = j0 - 1; jj <= j0 + 1; jj++) {
    const off = jj & 1 ? 0.5 : 0
    const dy = (gy - (jj + 0.5)) * 1.15
    const i0 = Math.floor(gx - off)
    for (let ii = i0 - 1; ii <= i0 + 1; ii++) {
      const dx = gx - (ii + 0.5 + off)
      const d = Math.sqrt(dx * dx + dy * dy) / 0.78
      if (d < 1) {
        const h = Math.sqrt(1 - d * d)
        if (h > best) best = h
      }
    }
  }
  return Math.pow(best, 0.4)
}

// barbs: the ridges run ACROSS the vane (they vary with y, the vane's width), with
// fine striations along the length. u (x) runs along the feather, v (y) across it.
function barbHeight(x, y) {
  const ridges = Math.sin(TAU * (y * 22 + 0.04 * Math.sin(TAU * x)))
  const fine = Math.sin(TAU * (y * 66 + x * 3))
  return 0.5 + 0.32 * ridges + 0.1 * fine
}

function makeNormalTex(THREE, size, height, strength) {
  const h = new Float32Array(size * size)
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) h[y * size + x] = height(x / size, y / size)
  const data = new Uint8Array(size * size * 4)
  for (let y = 0; y < size; y++) {
    const rowC = y * size
    const rowM = ((y - 1 + size) % size) * size
    const rowP = ((y + 1) % size) * size
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size
      const xp = (x + 1) % size
      const nx = -(h[rowC + xp] - h[rowC + xm]) * strength
      const ny = -(h[rowP + x] - h[rowM + x]) * strength
      const l = Math.hypot(nx, ny, 1)
      const k = 4 * (rowC + x)
      data[k] = Math.round((nx / l) * 127.5 + 127.5)
      data[k + 1] = Math.round((ny / l) * 127.5 + 127.5)
      data[k + 2] = Math.round((1 / l) * 127.5 + 127.5)
      data[k + 3] = 255
    }
  }
  const tex = new THREE.DataTexture(data, size, size)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.generateMipmaps = true
  tex.needsUpdate = true
  return tex
}

// ---- mesh building helpers (build time) -----------------------------------

function newBuf() {
  return { pos: [], col: [], uv: [], idx: [] }
}
function vert(b, x, y, z, c, u, v) {
  const n = b.pos.length / 3
  b.pos.push(x, y, z)
  b.col.push(c[0], c[1], c[2])
  b.uv.push(u, v)
  return n
}
// quads of a grid of vertices: rows x cols quads, rows of `stride` vertices
function grid(b, v0, rows, stride, cols, flip) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const a = v0 + i * stride + j
      const p = a + 1
      const d = a + stride
      const e = d + 1
      if (flip) b.idx.push(a, e, d, a, p, e)
      else b.idx.push(a, d, e, a, e, p)
    }
  }
}
// a feather vane: rows+1 by nc vertices across the vane (nc odd keeps a shaft column)
function allocFeather(b, rows, nc, flip) {
  const v0 = b.pos.length / 3
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c < nc; c++) {
      const u = r / rows
      const t = nc === 1 ? 0 : (2 * c) / (nc - 1) - 1
      vert(b, 0, 0, 0, featherColor(u, t), u, c / Math.max(1, nc - 1))
    }
  }
  grid(b, v0, rows, nc, nc - 1, flip)
  return v0
}
// a tube with duplicated seam vertices: n rings of sides+1 vertices
function allocTube(b, n, sides, colAt, flip) {
  const v0 = b.pos.length / 3
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= sides; j++) vert(b, 0, 0, 0, colAt(i), i / (n - 1), j / sides)
  }
  grid(b, v0, n - 1, sides + 1, sides, flip)
  return v0
}
// eye disc: centre, inner ring (hot ring), outer ring (molten)
function allocDisc(b) {
  const v0 = b.pos.length / 3
  vert(b, 0, 0, 0, EYE_DARK, 0.5, 0.5)
  for (let j = 0; j < 12; j++) vert(b, 0, 0, 0, HOT, 0.5, 0.5)
  for (let j = 0; j < 12; j++) vert(b, 0, 0, 0, [0.55, 0.14, 0.03], 0.5, 0.5)
  for (let j = 0; j < 12; j++) {
    const k = (j + 1) % 12
    b.idx.push(v0, v0 + 1 + j, v0 + 1 + k)
    b.idx.push(v0 + 1 + j, v0 + 13 + j, v0 + 13 + k, v0 + 1 + j, v0 + 13 + k, v0 + 1 + k)
  }
  return v0
}
function ellipsoid(b, c, r, L, S, colAt) {
  const v0 = b.pos.length / 3
  for (let i = 0; i <= L; i++) {
    for (let j = 0; j <= S; j++) {
      const phi = (Math.PI * i) / L
      const th = (TAU * j) / S
      const sx = Math.sin(phi) * Math.cos(th)
      const sy = Math.cos(phi)
      const sz = Math.sin(phi) * Math.sin(th)
      vert(b, c[0] + r[0] * sx, c[1] + r[1] * sy, c[2] + r[2] * sz, colAt(sx, sy, sz), j / S, i / L)
    }
  }
  grid(b, v0, L, S + 1, S, true)
}

// write a feather. Positions go into arr (a plain array or a Float32Array).
// root (rx, ry, rz), ang = direction, L = length, W = half width, bend = curl
// (positive curls toward the left of the feather), ridge = camber lift at the shaft.
function writeFeather(arr, v0, rows, nc, mx, rx, ry, rz, ang, L, W, bend, ridge) {
  const dx = Math.cos(ang)
  const dy = Math.sin(ang)
  for (let r = 0; r <= rows; r++) {
    const u = r / rows
    const a = ang + bend * u
    const nx = -Math.sin(a)
    const ny = Math.cos(a)
    const s = L * u
    const off = 0.5 * bend * L * u * u
    const sx = rx + dx * s - dy * off
    const sy = ry + dy * s + dx * off
    const w = W * (0.15 + 0.85 * Math.min(1, u * 4)) * Math.pow(Math.max(0, 1 - u), 0.35)
    for (let c = 0; c < nc; c++) {
      const t = nc === 1 ? 0 : (2 * c) / (nc - 1) - 1
      const lat = t * w
      const k = 3 * (v0 + r * nc + c)
      arr[k] = mx * (sx + nx * lat)
      arr[k + 1] = sy + ny * lat
      arr[k + 2] = rz + ridge * (1 - t * t)
    }
  }
}

// write a tube along a flat point list P (3 numbers per point)
function writeTube(arr, v0, P, n, rad, sides, mx) {
  const stride = sides + 1
  for (let i = 0; i < n; i++) {
    const a = 3 * Math.max(0, i - 1)
    const q = 3 * Math.min(n - 1, i + 1)
    const p = 3 * i
    let tx = P[q] - P[a]
    let ty = P[q + 1] - P[a + 1]
    let tz = P[q + 2] - P[a + 2]
    const tl = Math.hypot(tx, ty, tz) || 1
    tx /= tl
    ty /= tl
    tz /= tl
    let nx = ty
    let ny = -tx
    let nz = 0
    let nl = Math.hypot(nx, ny)
    if (nl < 1e-6) {
      nx = 1
      ny = 0
      nz = 0
      nl = 1
    }
    nx /= nl
    ny /= nl
    nz /= nl
    const bx = ty * nz - tz * ny
    const by = tz * nx - tx * nz
    const bz = tx * ny - ty * nx
    for (let j = 0; j <= sides; j++) {
      const th = (TAU * j) / sides
      const c = Math.cos(th) * rad[i]
      const s = Math.sin(th) * rad[i]
      const k = 3 * (v0 + i * stride + j)
      arr[k] = mx * (P[p] + nx * c + bx * s)
      arr[k + 1] = P[p + 1] + ny * c + by * s
      arr[k + 2] = P[p + 2] + nz * c + bz * s
    }
  }
}

// a ribbon tail plume along centreline arrays cx, cy, cz (PN + 1 entries).
// Narrow shaft, widening in its last third into an eye-shaped tip.
function writeRibbon(arr, v0, PN, nc, cx, cy, cz) {
  for (let r = 0; r <= PN; r++) {
    const a = r > 0 ? r - 1 : 0
    const q = r < PN ? r + 1 : PN
    const tx = cx[q] - cx[a]
    const ty = cy[q] - cy[a]
    const tl = Math.hypot(tx, ty) || 1
    const lx = -ty / tl
    const ly = tx / tl
    const t = r / PN
    // the vane stays a narrow shaft, then opens into the eye: a cambered, double-sided ribbon
    const w = 0.014 + 0.085 * Math.pow(smooth01((t - 0.3) / 0.6), 1.3)
    for (let c = 0; c < nc; c++) {
      const s = nc === 1 ? 0 : (2 * c) / (nc - 1) - 1
      const off = s * w
      const k = 3 * (v0 + r * nc + c)
      arr[k] = cx[r] + lx * off
      arr[k + 1] = cy[r] + ly * off
      // camber: the vane bows out toward the viewer, the shaft sits on the crest
      arr[k + 2] = cz[r] + 0.03 * (1 - s * s) * smooth01((t - 0.1) / 0.5)
    }
  }
}

function writeDisc(arr, v0, cx, cy, cz, rx, ry) {
  arr[3 * v0] = cx
  arr[3 * v0 + 1] = cy
  arr[3 * v0 + 2] = cz + 0.03
  for (let j = 0; j < 12; j++) {
    const th = (TAU * j) / 12
    const c = Math.cos(th)
    const s = Math.sin(th)
    // hot pupil at 0.42 of the radius, a dark ring out to the molten edge
    const k1 = 3 * (v0 + 1 + j)
    arr[k1] = cx + 0.42 * rx * c
    arr[k1 + 1] = cy + 0.42 * ry * s
    arr[k1 + 2] = cz + 0.034
    const k2 = 3 * (v0 + 13 + j)
    arr[k2] = cx + rx * c
    arr[k2 + 1] = cy + ry * s
    arr[k2 + 2] = cz + 0.026
  }
}

function rel(x, y, z) {
  return [x - HEAD_PIVOT[0], y - HEAD_PIVOT[1], z - HEAD_PIVOT[2]]
}
function flat(list) {
  const out = []
  for (const p of list) out.push(p[0], p[1], p[2])
  return out
}

// ---- static builders ------------------------------------------------------

function buildBody(b, nc) {
  const S = 20
  const n = TORSO.length
  const v0 = b.pos.length / 3
  for (let i = 0; i < n; i++) {
    const R = TORSO[i]
    const tone = R[5]
    const back = mix(DEEP, EMBER, tone)
    const front = shade(mix(AMBER, MOLTEN, tone), 0.8)
    for (let j = 0; j <= S; j++) {
      const th = (TAU * j) / S
      const f = 0.5 + 0.5 * Math.sin(th)
      const col = mix(back, front, Math.pow(f, 1.6) * (0.35 + 0.65 * tone))
      vert(b, R[1] + R[3] * Math.cos(th), R[0], R[2] + R[4] * Math.sin(th), col, (j / S) * 2, (i / (n - 1)) * 3)
    }
  }
  grid(b, v0, n - 1, S + 1, S, false)
  // vent cap, facing down
  const r0 = TORSO[0]
  const cap = vert(b, r0[1], r0[0], r0[2], EMBER, 0.5, 0)
  for (let j = 0; j < S; j++) b.idx.push(cap, v0 + j, v0 + j + 1)

  // legs: thigh, shin, ankle, with three toes each and a hooked talon, tucked under the body
  for (const s of [-1, 1]) {
    const leg = [s * 0.12, -0.42, 0.02, s * 0.14, -0.5, 0.04, s * 0.18, -0.66, 0.1, s * 0.15, -0.8, 0.16]
    const lb = allocTube(b, 4, 8, (i) => [EMBER, AMBER, AMBER, GOLD][i], s > 0)
    writeTube(b.pos, lb, leg, 4, [0.07, 0.05, 0.04, 0.026], 8, 1)
    const toes = [
      [0.02, 0.1],
      [0.05, 0.08],
      [-0.03, 0.07],
    ]
    for (const t of toes) {
      const tb = allocTube(b, 2, 6, () => GOLD, s > 0)
      const pts = [s * 0.15, -0.8, 0.16, s * (0.15 + t[0]), -0.83, 0.16 + t[1]]
      writeTube(b.pos, tb, pts, 2, [0.02, 0.012], 6, 1)
      const tipX = s * (0.15 + t[0])
      const tipZ = 0.16 + t[1]
      const talb = allocTube(b, 3, 6, () => DEEP, s > 0)
      writeTube(
        b.pos,
        talb,
        [tipX, -0.83, tipZ, tipX, -0.85, tipZ + 0.012, tipX, -0.845, tipZ + 0.03],
        3,
        [0.014, 0.009, 0.004],
        6,
        1,
      )
    }
  }

  // breast: three layered rows of feather tips, fanned down over the chest
  const rows = [
    { y: 0.02, n: 7, z: 0.3, len: 0.2 },
    { y: -0.1, n: 8, z: 0.32, len: 0.2 },
    { y: -0.22, n: 8, z: 0.32, len: 0.2 },
    { y: -0.34, n: 7, z: 0.28, len: 0.2 },
  ]
  for (const row of rows) {
    for (let i = 0; i < row.n; i++) {
      const o = i - (row.n - 1) / 2
      const fb = allocFeather(b, 4, nc, false)
      writeFeather(b.pos, fb, 4, nc, 1, o * 0.05, row.y, row.z, -HALF_PI + o * 0.22, row.len, 0.07, 0.1, 0.035)
    }
  }
  // leg feathers: small plumes tucked down the shins, a little offset per row, so the legs read as feathered
  for (const s of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const fb = allocFeather(b, 3, nc, false)
      const y = -0.5 - 0.06 * i
      writeFeather(b.pos, fb, 3, nc, 1, s * (0.12 + 0.02 * i), y, 0.1 + 0.01 * i, -HALF_PI + s * 0.25, 0.16, 0.05, 0.06 * s, 0.02)
    }
  }
  // rump coverts over the tail roots
  for (let i = 0; i < 5; i++) {
    const rb = allocFeather(b, 4, nc, false)
    writeFeather(b.pos, rb, 4, nc, 1, PLUME_ROOT[0] + (i - 2) * 0.07, -0.44, 0.06, -HALF_PI + (i - 2) * 0.28, 0.24, 0.07, 0.05, 0.03)
  }
}

function buildHead(b) {
  // skull (about a quarter larger), heavy brow, jaw
  ellipsoid(b, rel(0, 0.67, 0.16), [0.19, 0.18, 0.22], 10, 16, (sx, sy, sz) =>
    mix(mix(EMBER, AMBER, 0.5 + 0.5 * sz), GOLD, clamp01(0.25 + 0.5 * sy + 0.25 * sz)),
  )
  ellipsoid(b, rel(0, 0.725, 0.26), [0.17, 0.034, 0.07], 4, 12, () => DEEP)
  ellipsoid(b, rel(0, 0.6, 0.2), [0.12, 0.07, 0.16], 6, 12, (sx, sy) => mix(EMBER, AMBER, 0.5 + 0.5 * sy))

  // hooked beak: upper mandible curls down at the tip, lower mandible tucks under
  const upper = flat([rel(0, 0.69, 0.28), rel(0, 0.67, 0.38), rel(0, 0.63, 0.46), rel(0, 0.57, 0.48)])
  const ub = allocTube(b, 4, 8, (i) => [GOLD, AMBER, EMBER, DEEP][i], true)
  writeTube(b.pos, ub, upper, 4, [0.062, 0.052, 0.036, 0.015], 8, 1)
  const lower = flat([rel(0, 0.64, 0.28), rel(0, 0.62, 0.36), rel(0, 0.6, 0.41)])
  const lb = allocTube(b, 3, 8, (i) => [AMBER, DEEP, EMBER][i], true)
  writeTube(b.pos, lb, lower, 3, [0.045, 0.032, 0.015], 8, 1)
}

function buildEyes(b) {
  // small, fierce eyes: a dark ember iris with one hot point of light in the front cap
  for (const s of [-1, 1]) {
    ellipsoid(b, rel(s * 0.085, 0.68, 0.315), [0.03, 0.026, 0.026], 6, 12, (sx, sy, sz) =>
      sz > 0.75 ? HOT : EYE_DARK,
    )
  }
}

// ---- the creature ---------------------------------------------------------

/**
 * @param {typeof import('three')} THREE
 * @param {{ envMap: import('three').Texture, lite: boolean }} options
 */
export function createCreature(THREE, { envMap, lite }) {
  const NC = lite ? 3 : 5 // feather columns across the vane
  const RP = lite ? 4 : 6 // primary rows
  const RS = lite ? 3 : 4 // secondary rows
  const RV = lite ? 2 : 3 // covert rows
  const RCR = lite ? 3 : 4 // crest rows
  const PN = lite ? 8 : 14
  const NPRIM = lite ? 9 : 12
  const NSEC = lite ? 10 : 14
  const NCOVA = lite ? 10 : 16
  const NCOVB = lite ? 8 : 14
  const NMARG = lite ? 4 : 10 // marginal coverts, the row over the primaries' roots
  const NTC = lite ? 3 : 5 // tail plume columns across the vane

  // ---- textures
  const texSize = lite ? 256 : 512
  const bodyTex = makeNormalTex(THREE, texSize, scaleHeight, 2.6)
  const barbTex = makeNormalTex(THREE, texSize, barbHeight, 2.2)

  // ---- static body, head and eyes
  const SB = newBuf()
  buildBody(SB, NC)
  const HB = newBuf()
  buildHead(HB)
  const EB = newBuf()
  buildEyes(EB)

  // ---- dynamic crest (child of the head pivot)
  const CB = newBuf()
  const CREST = []
  for (let i = 0; i < 7; i++) CREST.push(allocFeather(CB, RCR, NC, false))

  // ---- dynamic wings: arm tube plus layered feathers. Right wing first, left wing mirrored.
  const WB = newBuf()
  const WING = []
  for (let side = 0; side < 2; side++) {
    const rec = { mx: side === 0 ? 1 : -1, arm: 0, prim: [], sec: [], cova: [], covb: [], marg: [] }
    rec.arm = allocTube(WB, 5, 6, (i) => [EMBER, AMBER, AMBER, GOLD, GOLD][i], side === 0)
    const flip = side === 1
    for (let i = 0; i < NPRIM; i++) rec.prim.push(allocFeather(WB, RP, NC, flip))
    for (let j = 0; j < NSEC; j++) rec.sec.push(allocFeather(WB, RS, NC, flip))
    for (let j = 0; j < NCOVA; j++) rec.cova.push(allocFeather(WB, RV, NC, flip))
    for (let j = 0; j < NCOVB; j++) rec.covb.push(allocFeather(WB, RV, NC, flip))
    for (let j = 0; j < NMARG; j++) rec.marg.push(allocFeather(WB, RV, NC, flip))
    WING.push(rec)
  }

  // ---- dynamic tail plumes and their eyes
  const TB = newBuf()
  const TAIL = []
  for (let i = 0; i < 7; i++) TAIL.push(allocFeather(TB, PN, NTC, false))
  const TE = newBuf()
  const EYE = []
  for (let i = 0; i < 7; i++) EYE.push(allocDisc(TE))
  const PC = []
  for (let i = 0; i < 7; i++) {
    PC.push({ x: new Float64Array(PN + 1), y: new Float64Array(PN + 1), z: new Float64Array(PN + 1) })
  }

  // ---- materials
  const common = { vertexColors: true, envMap, envMapIntensity: 0.5, side: THREE.DoubleSide }
  const skin = (map, s, rim) => {
    const m = lite
      ? new THREE.MeshStandardMaterial({
          ...common,
          roughness: 0.5,
          metalness: 0.15,
          normalMap: map,
          normalScale: new THREE.Vector2(s, s),
        })
      : new THREE.MeshPhysicalMaterial({
          ...common,
          roughness: 0.42,
          metalness: 0.15,
          normalMap: map,
          normalScale: new THREE.Vector2(s, s),
          clearcoat: 0.2,
          clearcoatRoughness: 0.3,
        })
    // soft fire rim on the silhouette
    m.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float rimF = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 3.0);
        totalEmissiveRadiance += vec3(${rim}) * rimF * 0.22;`,
      )
    }
    return m
  }
  const bodyMat = skin(bodyTex, 1.4, '1.0, 0.36, 0.08')
  const featherMat = skin(barbTex, 0.9, '1.0, 0.34, 0.06')
  const glowMat = new THREE.MeshBasicMaterial({ vertexColors: true })
  const embMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.5, 0.5, 0.12) })

  // ---- geometry objects
  const geo = (b, dynamic) => {
    const g = new THREE.BufferGeometry()
    const p = new THREE.BufferAttribute(Float32Array.from(b.pos), 3)
    if (dynamic) p.setUsage(THREE.DynamicDrawUsage)
    g.setAttribute('position', p)
    g.setAttribute('color', new THREE.BufferAttribute(Float32Array.from(b.col), 3))
    g.setAttribute('uv', new THREE.BufferAttribute(Float32Array.from(b.uv), 2))
    g.setIndex(b.idx)
    if (!dynamic) g.computeVertexNormals()
    return g
  }
  const bodyGeo = geo(SB, false)
  const headGeo = geo(HB, false)
  const eyeGeo = geo(EB, false)
  const crestGeo = geo(CB, true)
  const wingGeo = geo(WB, true)
  const tailGeo = geo(TB, true)
  const tailEyeGeo = geo(TE, true)
  const bodyArr = bodyGeo.attributes.position.array
  const headArr = headGeo.attributes.position.array
  const eyeArr = eyeGeo.attributes.position.array
  const crestArr = crestGeo.attributes.position.array
  const wingArr = wingGeo.attributes.position.array
  const tailArr = tailGeo.attributes.position.array
  const teArr = tailEyeGeo.attributes.position.array

  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat)
  const headPivot = new THREE.Group()
  headPivot.position.set(HEAD_PIVOT[0], HEAD_PIVOT[1], HEAD_PIVOT[2])
  const headMesh = new THREE.Mesh(headGeo, bodyMat)
  const eyeMesh = new THREE.Mesh(eyeGeo, glowMat)
  const crestMesh = new THREE.Mesh(crestGeo, featherMat)
  headPivot.add(headMesh, eyeMesh, crestMesh)
  const wingMesh = new THREE.Mesh(wingGeo, featherMat)
  const tailMesh = new THREE.Mesh(tailGeo, featherMat)
  const tailEyeMesh = new THREE.Mesh(tailEyeGeo, glowMat)
  for (const m of [bodyMesh, headMesh, eyeMesh, crestMesh, wingMesh, tailMesh, tailEyeMesh]) {
    m.castShadow = false
    m.receiveShadow = false
    m.frustumCulled = false
  }

  // embers: one instanced draw, recycled from a pool. Small soft spheres, dimmer than the tips.
  const embGeo = new THREE.SphereGeometry(1, 6, 4)
  const embers = new THREE.InstancedMesh(embGeo, embMat, EMBER_COUNT)
  embers.frustumCulled = false
  embers.castShadow = false
  embers.receiveShadow = false
  embers.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const dummy = new THREE.Object3D()
  const EX = new Float64Array(EMBER_COUNT)
  const EY = new Float64Array(EMBER_COUNT)
  const EZ = new Float64Array(EMBER_COUNT)
  const EVX = new Float64Array(EMBER_COUNT)
  const EVY = new Float64Array(EMBER_COUNT)
  const EAGE = new Float64Array(EMBER_COUNT)
  const ELIFE = new Float64Array(EMBER_COUNT)
  const ESIZE = new Float64Array(EMBER_COUNT)
  for (let i = 0; i < EMBER_COUNT; i++) {
    dummy.position.set(0, 0, 0)
    dummy.scale.setScalar(0)
    dummy.updateMatrix()
    embers.setMatrixAt(i, dummy.matrix)
  }
  let emitAcc = 0
  let emitSeq = 0
  let poolPtr = 0
  // the outer primary tips of each wing (vertex indices), where embers leave: last row, middle column
  const MID = (NC - 1) >> 1
  const TIP = [WING[0].prim[2] + RP * NC + MID, WING[1].prim[2] + RP * NC + MID]

  // ---- scene graph
  const inner = new THREE.Group()
  inner.add(bodyMesh, headPivot, wingMesh, tailMesh, tailEyeMesh, embers)
  const group = new THREE.Group()
  group.add(inner)

  // ---- per-frame state (no allocation in update)
  let ex = 0
  let ey = 0
  let wx = 0
  let wy = 0
  let a1 = 0
  let a2 = 0
  let bb = 0
  const ARM_PTS = new Float64Array(15)

  // one wing chain at a given lag: sets elbow (ex, ey), wrist (wx, wy), angles a1, a2, and beat bb
  function chain(ph, lag, e) {
    bb = beat(ph - lag)
    const top1 = 1.38 - 0.12 * e
    const top2 = 1.62 - 0.1 * e
    a1 = lerp(-0.4, top1, bb)
    a2 = lerp(-0.7, top2, bb)
    ex = SHOULDER[0] + UPPER * Math.cos(a1)
    ey = SHOULDER[1] + UPPER * Math.sin(a1)
    wx = ex + FORE * Math.cos(a2)
    wy = ey + FORE * Math.sin(a2)
  }

  let headBob = 0
  // the whole pose, a pure function of beat phase, time and energy
  function pose(ph, time, e) {
    headBob = 0.05 * Math.sin(TAU * (ph - 0.25)) + 0.03 * Math.sin(time * 0.9)
    headPivot.rotation.x = headBob
    headPivot.rotation.y = 0.06 * Math.sin(time * 0.55)

    // crest: a fan of seven plumes that sweep back with energy
    for (let i = 0; i < 7; i++) {
      const d = i - 3
      const ang = HALF_PI + d * 0.2 - 0.3 * e + 0.1 * Math.sin(TAU * (ph - 0.3) - i * 0.6)
      const L = 0.38 + (0.12 * (3 - Math.abs(d))) / 3
      writeFeather(crestArr, CREST[i], RCR, NC, 1, CREST_ROOT[0] + d * 0.012, CREST_ROOT[1], CREST_ROOT[2], ang, L, 0.1, -0.55, 0.03)
    }

    // arm tube, from the shoulder through elbow and wrist
    chain(ph, 0, e)
    ARM_PTS[0] = SHOULDER[0]
    ARM_PTS[1] = SHOULDER[1]
    ARM_PTS[2] = 0
    ARM_PTS[3] = (SHOULDER[0] + ex) / 2
    ARM_PTS[4] = (SHOULDER[1] + ey) / 2
    ARM_PTS[5] = 0
    ARM_PTS[6] = ex
    ARM_PTS[7] = ey
    ARM_PTS[8] = 0
    ARM_PTS[9] = (ex + wx) / 2
    ARM_PTS[10] = (ey + wy) / 2
    ARM_PTS[11] = 0
    ARM_PTS[12] = wx
    ARM_PTS[13] = wy
    ARM_PTS[14] = 0
    for (const rec of WING) writeTube(wingArr, rec.arm, ARM_PTS, 5, ARM_RAD, 6, rec.mx)

    for (const rec of WING) {
      // primaries: fanned from the wrist, each one a beat behind the one before
      for (let i = 0; i < NPRIM; i++) {
        const f = i / (NPRIM - 1)
        chain(ph, 0.02 + 0.05 * f, e)
        const ang = a2 - 0.2 - 0.5 * f + 0.6 * (1 - bb)
        const L = 0.82 + 0.34 * Math.sin(Math.PI * (0.15 + 0.7 * f))
        writeFeather(wingArr, rec.prim[i], RP, NC, rec.mx, wx, wy, -0.02 - 0.006 * i, ang, L, 0.075, lerp(-0.25, 0.85, bb), 0.04)
      }
    }
    for (const rec of WING) {
      chain(ph, 0.02, e)
      // secondaries: along the forearm, trailing back and down
      for (let j = 0; j < NSEC; j++) {
        const t = 0.1 + 0.85 * (j / (NSEC - 1))
        const rx = ex + (wx - ex) * t
        const ry = ey + (wy - ey) * t
        const L = 0.6 - 0.16 * t
        writeFeather(wingArr, rec.sec[j], RS, NC, rec.mx, rx, ry, -0.06 - 0.004 * j, a2 - 0.85, L, 0.085, 0.2, 0.025)
      }
      // greater coverts: over the arm bones, in front
      for (let j = 0; j < NCOVA; j++) {
        const t = (j + 0.5) / NCOVA
        let rx
        let ry
        let ang
        if (t < 0.5) {
          rx = SHOULDER[0] + (ex - SHOULDER[0]) * 2 * t
          ry = SHOULDER[1] + (ey - SHOULDER[1]) * 2 * t
          ang = a1 - 0.2
        } else {
          rx = ex + (wx - ex) * (2 * t - 1)
          ry = ey + (wy - ey) * (2 * t - 1)
          ang = a2 - 0.2
        }
        writeFeather(wingArr, rec.cova[j], RV, NC, rec.mx, rx, ry, 0.05 + 0.002 * j, ang, 0.27, 0.1, 0.12, 0.025)
      }
      // lesser coverts: a second row, shorter, lying over the first
      for (let j = 0; j < NCOVB; j++) {
        const t = (j + 0.5) / NCOVB
        let rx
        let ry
        let ang
        if (t < 0.5) {
          rx = SHOULDER[0] + (ex - SHOULDER[0]) * 2 * t
          ry = SHOULDER[1] + (ey - SHOULDER[1]) * 2 * t
          ang = a1 - 0.5
        } else {
          rx = ex + (wx - ex) * (2 * t - 1)
          ry = ey + (wy - ey) * (2 * t - 1)
          ang = a2 - 0.5
        }
        writeFeather(wingArr, rec.covb[j], RV, NC, rec.mx, rx, ry, 0.075, ang, 0.2, 0.08, 0.1, 0.02)
      }
      // marginal coverts: a third row, short and offset along the wrist, roofing the primary roots
      for (let j = 0; j < NMARG; j++) {
        const t = (j + 0.5) / NMARG
        const f = 0.15 + 0.8 * t
        const rx = ex + (wx - ex) * f * 0.6
        const ry = ey + (wy - ey) * f * 0.6
        writeFeather(wingArr, rec.marg[j], RV, NC, rec.mx, rx, ry, 0.1 + 0.002 * j, a2 - 0.35 - 0.1 * t, 0.18, 0.09, 0.1, 0.02)
      }
    }

    // tail plumes: a travelling wave that runs down each plume, a beat behind the body
    const ph2 = TAU * (ph - 0.12)
    const amp = 1 - 0.5 * e
    for (let i = 0; i < 7; i++) {
      const P = PC[i]
      const L = PLUME_LEN[i]
      const d = i - 3
      for (let r = 0; r <= PN; r++) {
        const t = r / PN
        const ang = ph2 - t * 4.0 + i * 0.45
        P.x[r] = PLUME_ROOT[0] + d * 0.05 + d * 0.16 * Math.pow(t, 1.2) + 0.12 * amp * t * t * Math.sin(ang)
        P.y[r] = PLUME_ROOT[1] - L * t * (1 - 0.1 * t)
        P.z[r] = PLUME_ROOT[2] + 0.04 * t + 0.08 * amp * t * t * Math.cos(ang)
      }
      writeRibbon(tailArr, TAIL[i], PN, NTC, P.x, P.y, P.z)
      writeDisc(teArr, EYE[i], P.x[PN], P.y[PN], P.z[PN], 0.1, 0.15)
    }
  }

  // ---- fit: bounds over the whole beat (both energies, several phases), centred and scaled so the largest side is 2
  const BOX = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  const grow = (arr, ox, oy) => {
    for (let k = 0; k < arr.length; k += 3) {
      const x = arr[k] + ox
      const y = arr[k + 1] + oy
      if (x < BOX.minX) BOX.minX = x
      if (x > BOX.maxX) BOX.maxX = x
      if (y < BOX.minY) BOX.minY = y
      if (y > BOX.maxY) BOX.maxY = y
    }
  }
  grow(bodyArr, 0, 0)
  grow(headArr, HEAD_PIVOT[0], HEAD_PIVOT[1])
  grow(eyeArr, HEAD_PIVOT[0], HEAD_PIVOT[1])
  for (const e of [0, 1]) {
    for (let s = 0; s < 16; s += 2) {
      pose(s / 16, 0, e)
      grow(wingArr, 0, 0)
      grow(tailArr, 0, 0)
      grow(teArr, 0, 0)
      grow(crestArr, HEAD_PIVOT[0], HEAD_PIVOT[1])
    }
  }
  const PAD = 0.06
  const minX = BOX.minX - PAD
  const maxX = BOX.maxX + PAD
  const minY = BOX.minY - PAD
  const maxY = BOX.maxY + PAD
  const W = maxX - minX
  const H = maxY - minY
  const k = 2 / Math.max(W, H)
  const cxC = (minX + maxX) / 2
  const cyC = (minY + maxY) / 2
  const baseY = -cyC * k
  inner.scale.setScalar(k)
  inner.position.set(-cxC * k, baseY, 0)

  // embers
  function stepEmbers(dt, e) {
    emitAcc += dt * (4 + 10 * e)
    while (emitAcc >= 1) {
      emitAcc -= 1
      const i = poolPtr
      poolPtr = (poolPtr + 1) % EMBER_COUNT
      emitSeq += 1
      // most embers leave the wing tips; every third one rises from the breast
      const fromBody = emitSeq % 3 === 0
      const tv = emitSeq & 1 ? TIP[0] : TIP[1]
      EX[i] = fromBody ? (hash(emitSeq * 1.9) - 0.5) * 0.2 : wingArr[3 * tv] + (hash(emitSeq * 1.3) - 0.5) * 0.04
      EY[i] = fromBody ? -0.1 : wingArr[3 * tv + 1] + 0.01
      EZ[i] = fromBody ? 0.3 : wingArr[3 * tv + 2] + 0.02
      EVX[i] = (hash(emitSeq * 2.7) - 0.5) * 0.12
      EVY[i] = 0.12 + hash(emitSeq * 5.1) * 0.22
      EAGE[i] = 0
      ELIFE[i] = 1.1 + hash(emitSeq * 3.3) * 1.0
      ESIZE[i] = 0.03 + hash(emitSeq * 7.7) * 0.014
    }
    for (let i = 0; i < EMBER_COUNT; i++) {
      if (EAGE[i] < ELIFE[i]) {
        EAGE[i] += dt
        EX[i] += EVX[i] * dt
        EY[i] += EVY[i] * dt
        EVX[i] *= 1 - 0.6 * dt
        EVY[i] += 0.04 * dt
        const u = EAGE[i] / ELIFE[i]
        dummy.position.set(EX[i], EY[i], EZ[i])
        dummy.scale.setScalar(ESIZE[i] * Math.sin(Math.PI * u))
      } else {
        dummy.position.set(0, 0, 0)
        dummy.scale.setScalar(0)
      }
      dummy.updateMatrix()
      embers.setMatrixAt(i, dummy.matrix)
    }
    embers.instanceMatrix.needsUpdate = true
  }

  let phase = 0
  pose(0, 0, 0)
  for (const g of [wingGeo, crestGeo, tailGeo]) g.computeVertexNormals()

  function update(time, dt, energy) {
    const e = clamp01(energy)
    phase += dt * (0.42 + 0.7 * e)
    pose(phase, time, e)
    inner.position.y = baseY + 0.03 * k * Math.sin(TAU * phase)
    wingGeo.attributes.position.needsUpdate = true
    wingGeo.computeVertexNormals()
    crestGeo.attributes.position.needsUpdate = true
    crestGeo.computeVertexNormals()
    tailGeo.attributes.position.needsUpdate = true
    tailGeo.computeVertexNormals()
    tailEyeGeo.attributes.position.needsUpdate = true
    stepEmbers(dt, e)
  }

  function dispose() {
    bodyGeo.dispose()
    headGeo.dispose()
    eyeGeo.dispose()
    crestGeo.dispose()
    wingGeo.dispose()
    tailGeo.dispose()
    tailEyeGeo.dispose()
    bodyMat.dispose()
    featherMat.dispose()
    glowMat.dispose()
    embMat.dispose()
    embGeo.dispose()
    embers.dispose()
    bodyTex.dispose()
    barbTex.dispose()
  }

  return {
    group,
    size: { x: W * k, y: H * k },
    update,
    dispose,
  }
}
