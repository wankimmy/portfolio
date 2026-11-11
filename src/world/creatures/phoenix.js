/**
 * The phoenix: a firebird reborn, the sign for old systems rebuilt.
 *
 * Code-built and flat-shaded like the dragon: body, head, legs and chest feathers are
 * static meshes; the wings (arms plus layered cambered feathers), the crest and the tail
 * plumes are dynamic, rewritten each frame through preallocated typed arrays. The loose
 * parts (plumes, primaries, crest) run on damped springs fed by the creature's motion.
 *
 * Signature move, REBIRTH (about 5.2 s, from act()): gather (wings fold round the body,
 * the plumes draw in, real flame licks up from the chest and wing edges), burn (the flames
 * close over it into one fireball), flash (the bird goes into the light and is gone), ash
 * (sparks burst out, hang and swirl), spiral back to one point, a second softer flash, the
 * bird unfolds from that point in its proudest pose with flame streaming off wing and tail,
 * a ring of light rolls off, and it settles back into the beat. All flame comes from
 * ../flame.js. Everything in the move stays between the room lines the site passes in.
 */
import { createFlame } from '../flame.js'

// the sculpt (Hunyuan3D-2mini + Blender bake, tools/build_creature.py). It replaces the code-built
// bird on screen; the code bird stays as the fallback and as the skeleton the move's fire reads.
const MODEL_URL = '/models/creature-phoenix.glb'
const MODEL_URL_LITE = '/models/creature-phoenix-lite.glb'

const TAU = Math.PI * 2
const HALF_PI = Math.PI / 2

// Colours (linear, HDR above 1 blooms on desktop). Pearl and gold, molten amber, ember red
// only at the feather roots and deep in the tail, white-hot only at the very tips.
const EMBER = [0.5, 0.1, 0.03]
const DEEP = [0.3, 0.05, 0.02]
const AMBER = [0.9, 0.4, 0.1]
const GOLD = [0.98, 0.72, 0.36]
const PEARL = [0.95, 0.88, 0.76]
const HOT = [1.9, 1.2, 0.5]
const FLAME_GOLD = [0.95, 0.5, 0.1] // the sculpt's outer feathers: saturated, so the white albedo does not wash it out
const EYE_DARK = [0.16, 0.03, 0.012]

const SHOULDER = [0.12, 0.3, 0]
const UPPER = 0.6
const FORE = 0.6
const HEAD_PIVOT = [0.035, 0.56, 0.09]
const CREST_ROOT = [-0.03, 0.12, -0.02] // relative to the head pivot
const PLUME_ROOT = [0, -0.5, -0.04]
const PLUME_LEN = [0.95, 1.12, 1.25, 1.35, 1.25, 1.1, 0.95]
const ARM_RAD = [0.04, 0.034, 0.028, 0.022, 0.015]
const FOLD1 = 2.5 // wing angles when folded round the body (right wing)
const FOLD2 = -1.0
const MOVE_LEN = 5.2

// torso rings, bottom to neck: y, x, z, rx, rz, tone (0 = back and hips, 1 = breast)
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
// eased 0..1 between a and b (clamped)
function rampT(t, a, b) {
  return smooth01((t - a) / (b - a))
}
// a bump that rises and falls over dur from t0 (0 outside)
function flash01(t, t0, dur) {
  const x = (t - t0) / dur
  return x <= 0 || x >= 1 ? 0 : Math.sin(Math.PI * x)
}

// feather colour along its length (u: root 0 to tip 1) and across the vane (t: -1 to 1).
// Ember roots, amber and gold through the body of the feather, pearl, white-hot at the very tip.
function featherColor(u, t) {
  const c =
    u < 0.3
      ? mix(EMBER, AMBER, u / 0.3)
      : u < 0.75
        ? mix(AMBER, GOLD, (u - 0.3) / 0.45)
        : u < 0.97
          ? mix(GOLD, PEARL, (u - 0.75) / 0.22)
          : mix(PEARL, HOT, (u - 0.97) / 0.03)
  return shade(c, 1 - 0.14 * Math.abs(t))
}
// tail plumes: deep ember through the body, amber and white-hot at the eye
function tailColor(u, t) {
  const c = u < 0.85 ? mix(DEEP, AMBER, u / 0.85) : mix(AMBER, HOT, (u - 0.85) / 0.15)
  return shade(c, 1 - 0.14 * Math.abs(t))
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

// barbs: ridges across the vane with fine striations along the length
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

// soft radial glow (white, alpha falls off): the fireball and the flash are this, scaled and tinted
function makeGlowTex(THREE) {
  const N = 64
  const data = new Uint8Array(N * N * 4)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const dx = ((x + 0.5) / N) * 2 - 1
      const dy = ((y + 0.5) / N) * 2 - 1
      const r2 = dx * dx + dy * dy
      const a = r2 < 1 ? Math.exp(-r2 * 4.5) : 0
      const k = 4 * (y * N + x)
      data[k] = 255
      data[k + 1] = 255
      data[k + 2] = 255
      data[k + 3] = Math.round(a * 255)
    }
  }
  const tex = new THREE.DataTexture(data, N, N)
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearFilter
  tex.needsUpdate = true
  return tex
}

// a soft ring of light: a Gaussian across the ring's width, fading to nothing at its edge
function makeRingTex(THREE) {
  const N = 64
  const data = new Uint8Array(N * N * 4)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const dx = ((x + 0.5) / N) * 2 - 1
      const dy = ((y + 0.5) / N) * 2 - 1
      const r = Math.sqrt(dx * dx + dy * dy)
      const q = (r - 0.87) / 0.06
      const a = r < 1 ? Math.exp(-q * q) : 0
      const k = 4 * (y * N + x)
      data[k] = 255
      data[k + 1] = 255
      data[k + 2] = 255
      data[k + 3] = Math.round(a * 255)
    }
  }
  const tex = new THREE.DataTexture(data, N, N)
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearFilter
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
function allocFeather(b, rows, nc, flip, colorFn) {
  const cf = colorFn || featherColor
  const v0 = b.pos.length / 3
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c < nc; c++) {
      const u = r / rows
      const t = nc === 1 ? 0 : (2 * c) / (nc - 1) - 1
      vert(b, 0, 0, 0, cf(u, t), u, c / Math.max(1, nc - 1))
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
    const w = 0.014 + 0.085 * Math.pow(smooth01((t - 0.3) / 0.6), 1.3)
    for (let c = 0; c < nc; c++) {
      const s = nc === 1 ? 0 : (2 * c) / (nc - 1) - 1
      const off = s * w
      const k = 3 * (v0 + r * nc + c)
      arr[k] = cx[r] + lx * off
      arr[k + 1] = cy[r] + ly * off
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

function buildBody(b, nc, S) {
  const n = TORSO.length
  const v0 = b.pos.length / 3
  for (let i = 0; i < n; i++) {
    const R = TORSO[i]
    const tone = R[5]
    const back = mix(DEEP, EMBER, tone)
    const front = shade(mix(AMBER, GOLD, tone), 0.95)
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
    const lb = allocTube(b, 4, 10, (i) => [DEEP, AMBER, AMBER, GOLD][i], s > 0)
    writeTube(b.pos, lb, leg, 4, [0.07, 0.05, 0.04, 0.026], 10, 1)
    const toes = [
      [0.02, 0.1],
      [0.05, 0.08],
      [-0.03, 0.07],
    ]
    for (const t of toes) {
      const tb = allocTube(b, 3, 8, () => GOLD, s > 0)
      const pts = [s * 0.15, -0.8, 0.16, s * (0.15 + t[0] * 0.5), -0.82, 0.16 + t[1] * 0.5, s * (0.15 + t[0]), -0.83, 0.16 + t[1]]
      writeTube(b.pos, tb, pts, 3, [0.02, 0.014, 0.01], 8, 1)
      const tipX = s * (0.15 + t[0])
      const tipZ = 0.16 + t[1]
      const talb = allocTube(b, 3, 8, () => DEEP, s > 0)
      writeTube(
        b.pos,
        talb,
        [tipX, -0.83, tipZ, tipX, -0.85, tipZ + 0.012, tipX, -0.845, tipZ + 0.03],
        3,
        [0.014, 0.009, 0.004],
        8,
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
  // leg feathers: small plumes tucked down the shins
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

function buildHead(b, HS, HL) {
  // skull, heavy brow, jaw
  ellipsoid(b, rel(0, 0.67, 0.16), [0.19, 0.18, 0.22], HL, HS, (sx, sy, sz) =>
    mix(mix(GOLD, PEARL, 0.5 + 0.5 * sz), GOLD, clamp01(0.2 + 0.4 * sy + 0.2 * sz)),
  )
  ellipsoid(b, rel(0, 0.725, 0.26), [0.17, 0.034, 0.07], Math.max(4, HL >> 1), HS, () => DEEP)
  ellipsoid(b, rel(0, 0.6, 0.2), [0.12, 0.07, 0.16], Math.max(4, HL >> 1), HS, (sx, sy) => mix(EMBER, AMBER, 0.5 + 0.5 * sy))

  // hooked beak: upper mandible curls down at the tip, lower mandible tucks under
  const upper = flat([rel(0, 0.69, 0.28), rel(0, 0.67, 0.38), rel(0, 0.63, 0.46), rel(0, 0.57, 0.48)])
  const ub = allocTube(b, 4, 10, (i) => [GOLD, AMBER, EMBER, DEEP][i], true)
  writeTube(b.pos, ub, upper, 4, [0.062, 0.052, 0.036, 0.015], 10, 1)
  const lower = flat([rel(0, 0.64, 0.28), rel(0, 0.62, 0.36), rel(0, 0.6, 0.41)])
  const lb = allocTube(b, 3, 10, (i) => [AMBER, DEEP, EMBER][i], true)
  writeTube(b.pos, lb, lower, 3, [0.045, 0.032, 0.015], 10, 1)
}

function buildEyes(b, S) {
  // small, fierce eyes: a dark iris with one hot point of light in the front cap
  for (const s of [-1, 1]) {
    ellipsoid(b, rel(s * 0.085, 0.68, 0.315), [0.042, 0.036, 0.036], 6, S, (sx, sy, sz) => (sz > 0.75 ? HOT : EYE_DARK))
  }
}

// ---- the creature ---------------------------------------------------------

/**
 * @param {typeof import('three')} THREE
 * @param {{ envMap: import('three').Texture, lite: boolean }} options
 */
export async function createCreature(THREE, { envMap, lite }) {
  const NC = lite ? 7 : 13 // feather columns across the vane
  const RP = lite ? 13 : 16 // primary rows
  const RS = lite ? 3 : 4 // secondary rows
  const RV = lite ? 2 : 3 // covert rows
  const RCR = lite ? 3 : 4 // crest rows
  const PN = lite ? 8 : 16 // tail plume rows
  const NPRIM = lite ? 9 : 12
  const NSEC = lite ? 10 : 14
  const NCOVA = lite ? 10 : 16
  const NCOVB = lite ? 8 : 14
  const NMARG = lite ? 4 : 10
  const NTC = lite ? 3 : 7 // tail plume columns across the vane
  const BODY_S = lite ? 16 : 32 // body ring sides
  const HEAD_S = lite ? 12 : 24
  const HEAD_L = lite ? 8 : 16
  const EYE_S = lite ? 8 : 12
  const EMBER_N = lite ? 48 : 110
  const FLAME_N = lite ? 110 : 260
  const PROUD1 = lite ? 0.25 : 0.7 // proudest pose (the rebirth): wings thrown wide, level on phones
  const PROUD2 = lite ? 0.1 : 0.35
  const FLAT1 = 0.4 // resting wings on a phone band: open level
  const FLAT2 = 0.12

  // ---- textures
  const texSize = lite ? 256 : 512
  const bodyTex = makeNormalTex(THREE, texSize, scaleHeight, 2.6)
  const barbTex = makeNormalTex(THREE, texSize, barbHeight, 2.2)
  const glowTex = makeGlowTex(THREE)
  const ringTex = makeRingTex(THREE)

  // ---- static body, head and eyes
  const SB = newBuf()
  buildBody(SB, NC, BODY_S)
  const HB = newBuf()
  buildHead(HB, HEAD_S, HEAD_L)
  const EB = newBuf()
  buildEyes(EB, EYE_S)

  // ---- dynamic crest (child of the head pivot)
  const CB = newBuf()
  const CREST = []
  for (let i = 0; i < 7; i++) CREST.push(allocFeather(CB, RCR, NC, false))

  // ---- dynamic wings: arm tube plus layered feathers. Right wing first, left wing mirrored.
  const WB = newBuf()
  const WING = []
  for (let side = 0; side < 2; side++) {
    const rec = { mx: side === 0 ? 1 : -1, arm: 0, prim: [], sec: [], cova: [], covb: [], marg: [] }
    rec.arm = allocTube(WB, 5, 8, (i) => [DEEP, AMBER, AMBER, GOLD, GOLD][i], side === 0)
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
  for (let i = 0; i < 7; i++) TAIL.push(allocFeather(TB, PN, NTC, false, tailColor))
  const TE = newBuf()
  const EYE = []
  for (let i = 0; i < 7; i++) EYE.push(allocDisc(TE))
  const PC = []
  for (let i = 0; i < 7; i++) {
    PC.push({ x: new Float64Array(PN + 1), y: new Float64Array(PN + 1), z: new Float64Array(PN + 1) })
  }

  // ---- materials: the dragon's recipe (flat shading, normal relief, clearcoat, iridescence on desktop)
  const common = { vertexColors: true, envMap, envMapIntensity: 0.6, side: THREE.DoubleSide, flatShading: true }
  const skin = (map, s, rim) => {
    const m = lite
      ? new THREE.MeshStandardMaterial({
          ...common,
          roughness: 0.6,
          metalness: 0.12,
          normalMap: map,
          normalScale: new THREE.Vector2(s, s),
        })
      : new THREE.MeshPhysicalMaterial({
          ...common,
          roughness: 0.5,
          metalness: 0.12,
          normalMap: map,
          normalScale: new THREE.Vector2(s, s),
          clearcoat: 0.38,
          clearcoatRoughness: 0.35,
          iridescence: 0.42,
          iridescenceIOR: 1.3,
          iridescenceThicknessRange: [140, 420],
        })
    // soft fire rim on the silhouette
    m.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float rimF = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 3.0);
        totalEmissiveRadiance += vec3(${rim}) * rimF * 0.18;`,
      )
    }
    return m
  }
  const bodyMat = skin(bodyTex, 1.2, '1.0, 0.36, 0.08')
  const featherMat = skin(barbTex, 0.9, '1.0, 0.34, 0.06')
  const glowMat = new THREE.MeshBasicMaterial({ vertexColors: true })
  // sparks are soft additive points of light (HDR, so they bloom on desktop and read as points on phones)
  const embMat = new THREE.MeshBasicMaterial({
    map: glowTex,
    color: new THREE.Color(2.4, 1.1, 0.32),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const spriteMat = new THREE.MeshBasicMaterial({
    map: glowTex,
    color: new THREE.Color(1, 1, 1),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const ringMat = new THREE.MeshBasicMaterial({
    map: ringTex,
    color: new THREE.Color(1, 1, 1),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  })

  // ---- geometry objects
  const geo = (b, dynamic) => {
    const g = new THREE.BufferGeometry()
    const p = new THREE.BufferAttribute(Float32Array.from(b.pos), 3)
    if (dynamic) p.setUsage(THREE.DynamicDrawUsage)
    g.setAttribute('position', p)
    g.setAttribute('color', new THREE.BufferAttribute(Float32Array.from(b.col), 3))
    g.setAttribute('uv', new THREE.BufferAttribute(Float32Array.from(b.uv), 2))
    g.setIndex(b.idx)
    g.computeVertexNormals()
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

  // the move's glow and light: a soft sprite for the fireball and the flashes, a ring for the roll-off
  const planeGeo = new THREE.PlaneGeometry(1, 1)
  const glowSprite = new THREE.Mesh(planeGeo, spriteMat)
  glowSprite.frustumCulled = false
  glowSprite.renderOrder = 2
  const ring = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), ringMat)
  ring.frustumCulled = false
  ring.renderOrder = 2

  // sparks: one instanced draw, recycled from a pool. Small soft spheres, dimmer than the tips.
  const embGeo = new THREE.PlaneGeometry(1, 1)
  const embers = new THREE.InstancedMesh(embGeo, embMat, EMBER_N)
  embers.frustumCulled = false
  embers.castShadow = false
  embers.receiveShadow = false
  embers.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const dummy = new THREE.Object3D()
  const EX = new Float64Array(EMBER_N)
  const EY = new Float64Array(EMBER_N)
  const EZ = new Float64Array(EMBER_N)
  const EVX = new Float64Array(EMBER_N)
  const EVY = new Float64Array(EMBER_N)
  const EAGE = new Float64Array(EMBER_N)
  const ELIFE = new Float64Array(EMBER_N)
  const ESIZE = new Float64Array(EMBER_N)
  const EDRAG = new Float64Array(EMBER_N)
  const ESPIN = new Float64Array(EMBER_N)
  for (let i = 0; i < EMBER_N; i++) {
    EAGE[i] = 1
    ELIFE[i] = 0
    dummy.position.set(0, 0, 0)
    dummy.scale.setScalar(0)
    dummy.updateMatrix()
    embers.setMatrixAt(i, dummy.matrix)
  }

  // real flame, from flame.js: the same emit API as the dragon's breath
  const flame = createFlame(THREE, { count: FLAME_N, lite, drag: 1.6, turbulence: 1, buoyancy: 1 })

  // ---- scene graph
  const inner = new THREE.Group()
  inner.add(bodyMesh, headPivot, wingMesh, tailMesh, tailEyeMesh)
  const group = new THREE.Group()
  group.add(inner, glowSprite, ring, embers, flame.mesh)

  // ---- per-frame state (no allocation in update)
  let ex = 0
  let ey = 0
  let wx = 0
  let wy = 0
  let a1 = 0
  let a2 = 0
  let bb = 0
  const ARM_PTS = new Float64Array(15)
  let disposed = false

  // move envelopes, set each frame from the move clock (defaults = idle)
  let moveT = -1
  let mFold = 0 // wings folded round the body (0 .. 1)
  let mSpread = 0 // wings thrown wide (0 .. 1)
  let mBand = 0 // how little vertical room there is (0 = plenty, 1 = a phone band): wings level, plumes short
  let mGlow = 0 // body and feather emissive (0 .. 1)
  let mScale = 1 // whole body scale (the body goes into the light and back)
  let mTail = 1 // plume length
  let mGather = 0
  let mSpiral = 0
  let mStream = 0
  let mBurnA = 0 // fireball presence
  let curTop = 9 // room lines in group units (set per frame)
  let curBot = -9
  let fireR = 1
  let fireSX = 1
  let fireSY = 1
  let flameAcc = 0
  let emitAcc = 0
  let emitSeq = 0
  let fseq = 0
  let poolPtr = 0
  let burst1 = false
  let burst2 = false
  let sparkBurst = false
  let spiralDone = false
  let ringOn = false
  let kS = 1 // body scale this frame
  let innerY = 0 // bob this frame
  let gcx = 0 // group x of the body centre

  // the body points in group space this frame (no allocation: read gX, gY, gZ after toG)
  let gX = 0
  let gY = 0
  let gZ = 0
  function toG(x, y, z) {
    gX = -cxC * kS + kS * x
    gY = -cyC * kS + innerY + kS * y
    gZ = kS * z
  }

  // the body's emissive: raised for the move, restored to black exactly when idle
  const glowCol = [0, 0, 0]
  let glowOn = false
  function setGlow(v) {
    if (v <= 0) {
      if (glowOn) {
        bodyMat.emissive.setRGB(0, 0, 0)
        featherMat.emissive.setRGB(0, 0, 0)
        glowOn = false
      }
      return
    }
    glowOn = true
    glowCol[0] = 0.9 * v
    glowCol[1] = 0.36 * v
    glowCol[2] = 0.1 * v
    bodyMat.emissive.setRGB(glowCol[0], glowCol[1], glowCol[2])
    featherMat.emissive.setRGB(glowCol[0], glowCol[1], glowCol[2])
  }

  // ---- springs: loose parts lag behind the body, overshoot a little and settle.
  const SPRING_K = 46 // stiffness
  const SPRING_C = 30 // pull toward the part before
  const SPRING_D = 3.2 // damping per second
  const SUBSTEPS = 4
  const VMAX = 3 // displacement speed limit
  const PLUME_LIM = 0.45 // rig units
  const WING_LIM = 0.3 // radians
  const CREST_LIM = 0.35 // radians
  const NCREST = 7
  const PL_X = new Float64Array(21) // seven plumes, three springs each
  const PL_V = new Float64Array(21)
  const PL_D = new Float64Array(21)
  const WG_X = new Float64Array(NPRIM)
  const WG_V = new Float64Array(NPRIM)
  const WG_D = new Float64Array(NPRIM)
  const CR_X = new Float64Array(NCREST)
  const CR_V = new Float64Array(NCREST)
  const CR_D = new Float64Array(NCREST)
  let pvx = 0
  let pvy = 0
  let psp = 0

  function springChain(x, v, d, start, n, h, lim) {
    for (let j = start; j < start + n; j += 1) {
      const left = j > start ? x[j - 1] : 0
      let vel = v[j] + (SPRING_K * (d[j] - x[j]) + SPRING_C * (left - x[j]) - SPRING_D * v[j]) * h
      vel = vel > VMAX ? VMAX : vel < -VMAX ? -VMAX : vel
      v[j] = vel
      const p = x[j] + vel * h
      x[j] = p > lim ? lim : p < -lim ? -lim : p
    }
  }

  // sideways lag of a plume at t (0 root .. 1 tip), from its three springs (at t = 1/3, 2/3, 1)
  function plumeDisp(s, t) {
    if (t <= 1 / 3) return PL_X[s] * 3 * t
    if (t <= 2 / 3) return PL_X[s] + (PL_X[s + 1] - PL_X[s]) * (3 * t - 1)
    return PL_X[s + 1] + (PL_X[s + 2] - PL_X[s + 1]) * (3 * t - 2)
  }

  function physics(time, dt, motion) {
    const vx = motion && motion.vx ? motion.vx : 0
    const vy = motion && motion.vy ? motion.vy : 0
    const sp = motion && motion.spin ? motion.spin : 0
    // impulses from changes in motion (per frame), then steady drives
    const dvx = vx - pvx
    const dvy = vy - pvy
    const dsp = sp - psp
    pvx = vx
    pvy = vy
    psp = sp
    if (!(dt > 0)) return
    for (let i = 0; i < 21; i += 1) PL_V[i] -= 0.4 * dvx + 0.06 * dsp
    for (let i = 0; i < NPRIM; i += 1) WG_V[i] += -0.8 * dvy + 0.2 * dvx - 0.05 * dsp * ((i + 1) / NPRIM)
    for (let i = 0; i < NCREST; i += 1) CR_V[i] -= 0.15 * dvx

    const tail = Math.max(-0.4, Math.min(0.4, -0.1 * sp - 0.06 * vx))
    for (let i = 0; i < 7; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        PL_D[3 * i + j] = tail * ((j + 1) / 3) + 0.025 * Math.sin(time * 1.3 + i * 0.6 + j * 0.9)
      }
    }
    const lift = Math.max(-0.25, Math.min(0.25, -0.05 * vy))
    for (let i = 0; i < NPRIM; i += 1) {
      WG_D[i] = lift - 0.04 * sp * ((i + 1) / NPRIM) + 0.02 * Math.sin(time * 1.1 - i * 0.5)
    }
    for (let i = 0; i < NCREST; i += 1) {
      CR_D[i] = -0.05 * sp + 0.035 * Math.sin(time * 1.7 + i * 0.8)
    }

    const h = Math.min(dt, 0.05) / SUBSTEPS
    for (let s = 0; s < SUBSTEPS; s += 1) {
      for (let i = 0; i < 7; i += 1) springChain(PL_X, PL_V, PL_D, 3 * i, 3, h, PLUME_LIM)
      springChain(WG_X, WG_V, WG_D, 0, NPRIM, h, WING_LIM)
      springChain(CR_X, CR_V, CR_D, 0, NCREST, h, CREST_LIM)
    }
  }

  // one wing chain at a given lag: sets elbow (ex, ey), wrist (wx, wy), angles a1, a2, and beat bb.
  // The move blends the pose: folded round the body, or thrown wide. The beat stops while it does.
  function chain(ph, lag, e) {
    bb = beat(ph - lag) * (1 - 0.9 * mFold) * (1 - 0.9 * mSpread)
    const top1 = 1.38 - 0.12 * e
    const top2 = 1.62 - 0.1 * e
    // the low end of the beat stays above the shoulder: wings held up and open, never drooping
    let A1 = lerp(0.35, top1, bb)
    let A2 = lerp(-0.2, top2, bb)
    A1 = lerp(A1, FOLD1, mFold)
    A2 = lerp(A2, FOLD2, mFold)
    A1 = lerp(A1, PROUD1, mSpread)
    A2 = lerp(A2, PROUD2, mSpread)
    // a phone band: the wings open level instead of high, so the silhouette stays between the lines
    const level = mBand * (1 - mFold) * (1 - mSpread)
    A1 = lerp(A1, FLAT1, level)
    A2 = lerp(A2, FLAT2, level)
    a1 = A1
    a2 = A2
    ex = SHOULDER[0] + UPPER * Math.cos(a1)
    ey = SHOULDER[1] + UPPER * Math.sin(a1)
    wx = ex + FORE * Math.cos(a2)
    wy = ey + FORE * Math.sin(a2)
  }

  let headBob = 0
  // the whole pose, a pure function of beat phase, time, energy and the move envelopes.
  // live = add the springs' lag (off for the build-time bounds)
  function pose(ph, time, e, live) {
    headBob = 0.05 * Math.sin(TAU * (ph - 0.25)) + 0.03 * Math.sin(time * 0.9)
    headPivot.rotation.x = headBob
    headPivot.rotation.y = 0.06 * Math.sin(time * 0.55)

    // crest: a fan of seven plumes that sweep back with energy, and flatten in the fold
    for (let i = 0; i < 7; i++) {
      const d = i - 3
      const ang =
        HALF_PI + d * 0.2 - 0.3 * e - 0.6 * mFold + 0.1 * Math.sin(TAU * (ph - 0.3) - i * 0.6) + (live ? CR_X[i] : 0)
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
    for (const rec of WING) writeTube(wingArr, rec.arm, ARM_PTS, 5, ARM_RAD, 8, rec.mx)

    for (const rec of WING) {
      // primaries: fanned from the wrist, each one a beat behind the one before
      for (let i = 0; i < NPRIM; i++) {
        const f = i / (NPRIM - 1)
        chain(ph, 0.02 + 0.05 * f, e)
        const ang = a2 - 0.2 - 0.5 * f + 0.6 * (1 - bb) + (live ? WG_X[i] : 0)
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
    const amp = (1 - 0.5 * e) * (1 - 0.6 * mFold)
    for (let i = 0; i < 7; i++) {
      const P = PC[i]
      const L = PLUME_LEN[i] * mTail * (1 - 0.45 * mBand)
      const d = i - 3
      for (let r = 0; r <= PN; r++) {
        const t = r / PN
        const ang = ph2 - t * 4.0 + i * 0.45
        P.x[r] =
          PLUME_ROOT[0] + d * 0.05 + d * 0.16 * Math.pow(t, 1.2) + 0.12 * amp * t * t * Math.sin(ang) + (live ? plumeDisp(3 * i, t) : 0)
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
      pose(s / 16, 0, e, false)
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
  // the model's centre sits on the group origin: the body shrinks and grows about its middle
  kS = k
  innerY = 0
  // the body's transform before the first update: the same as update() sets it at scale 1
  inner.scale.setScalar(k)
  inner.position.set(-cxC * k, -cyC * k, 0)

  // ---- sparks
  function spawnSpark(x, y, vx, vy, life, size, drag, spin) {
    const i = poolPtr
    poolPtr = (poolPtr + 1) % EMBER_N
    EX[i] = x
    EY[i] = y
    EZ[i] = 0.02
    EVX[i] = vx
    EVY[i] = vy
    EAGE[i] = 0
    ELIFE[i] = life
    ESIZE[i] = size
    EDRAG[i] = drag
    ESPIN[i] = spin
  }
  // one wing-tip spark from the idle beat, in group space
  function emitIdleSpark() {
    emitSeq += 1
    const tv = emitSeq & 1 ? TIP[0] : TIP[1]
    if (emitSeq % 3 === 0) {
      toG((hash(emitSeq * 1.9) - 0.5) * 0.2, -0.1, 0.3)
    } else {
      toG(wingArr[3 * tv] + (hash(emitSeq * 1.3) - 0.5) * 0.04, wingArr[3 * tv + 1] + 0.01, 0)
    }
    spawnSpark(gX, gY, (hash(emitSeq * 2.7) - 0.5) * 0.12, 0.12 + hash(emitSeq * 5.1) * 0.22, 1.1 + hash(emitSeq * 3.3), 0.045 + hash(emitSeq * 7.7) * 0.02, 0.6, 0)
  }
  // the outer primary tips of each wing (vertex indices), where sparks leave: last row, middle column
  const MID = (NC - 1) >> 1
  const TIP = [WING[0].prim[2] + RP * NC + MID, WING[1].prim[2] + RP * NC + MID]

  // a flame puff in group space (the top line is never crossed by a birth)
  function emitFlame(x, y, z, vx, vy, vz, size, life, heat) {
    if (y > curTop - 0.12) return
    flame.emit(x, y, z, vx, vy, vz, size, life, heat)
  }
  function rnd(n) {
    return hash(n * 12.9898 + fseq * 0.37) * 2 - 1
  }

  function stepEmbers(dt, emitRate, pull, spin, top) {
    emitAcc += dt * emitRate
    while (emitAcc >= 1) {
      emitAcc -= 1
      emitIdleSpark()
    }
    const pk = Math.min(1, pull * dt)
    const cx = gcx
    const cy = -cyC * kS + innerY
    const sp = spin * dt
    for (let i = 0; i < EMBER_N; i++) {
      if (EAGE[i] < ELIFE[i]) {
        EAGE[i] += dt
        // swirl around the centre, drift outward on the velocity, slow with drag and lift a little
        const ca = Math.cos(ESPIN[i] * dt + sp)
        const sa = Math.sin(ESPIN[i] * dt + sp)
        const dx = EX[i] - cx
        const dy = EY[i] - cy
        EX[i] = cx + (dx * ca - dy * sa) * (1 - pk) + EVX[i] * dt
        EY[i] = cy + (dx * sa + dy * ca) * (1 - pk) + EVY[i] * dt
        const damp = 1 - EDRAG[i] * dt
        EVX[i] *= damp > 0 ? damp : 0
        EVY[i] *= damp > 0 ? damp : 0
        EVY[i] += 0.05 * dt
        const u = EAGE[i] / ELIFE[i]
        // a spark brightens, then cools: a short streak along its motion (scaled by speed)
        const streak = 1 + Math.min(1.6, Math.hypot(EVX[i], EVY[i]) * 0.6)
        let s = ESIZE[i] * Math.sin(Math.PI * u) * 2.2
        if (EY[i] > top - 0.1) s = 0
        dummy.position.set(EX[i], EY[i], EZ[i])
        dummy.scale.set(s > 0 ? s : 0, s > 0 ? s * streak : 0, 1)
      } else {
        dummy.position.set(0, 0, 0)
        dummy.scale.setScalar(0)
      }
      dummy.updateMatrix()
      embers.setMatrixAt(i, dummy.matrix)
    }
    embers.instanceMatrix.needsUpdate = true
  }

  // the move's flame and light, one frame. t = move clock, dt = step. Group space.
  function stepMove(t, dt) {
    const lim = Math.min(curTop, -curBot)
    // the fireball fills the room it has: wide, not tall, on a phone
    fireR = Math.max(0.2, Math.min(1.05, lim * 0.9))
    fireSX = lim < 1.2 ? fireR * 1.3 : fireR
    fireSY = lim < 1.2 ? fireR * 0.8 : fireR
    const cy = -cyC * kS + innerY
    const cx = gcx

    // gather: flame licks up from the breast and the wing edges
    if (mGather > 0 && t < 2.2) {
      const rate = 60 * mGather * (1 - rampT(t, 1.9, 2.2))
      flameAcc += dt * rate
      while (flameAcc >= 1) {
        flameAcc -= 1
        fseq += 1
        const r = hash(fseq * 3.1)
        if (r < 0.5) toG(rnd(fseq) * 0.12, -0.05 + 0.1 * r, 0.25)
        else toG(0.45 * rnd(fseq + 1), 0.2 + 0.3 * r, 0)
        const h = 0.5 + 0.35 * mGather
        emitFlame(gX, gY, gZ, rnd(fseq + 5) * 0.12, 0.35 + 0.2 * r, 0.05, 0.14 + 0.1 * r * mGather, 0.6 + 0.4 * r, h)
      }
    }

    // burn: the fireball closes over the bird
    if (mBurnA > 0 && t < 2.8) {
      const rate = 40 * mBurnA
      flameAcc += dt * rate
      while (flameAcc >= 1) {
        flameAcc -= 1
        fseq += 1
        const a = hash(fseq * 7.3) * TAU
        const rr = Math.sqrt(hash(fseq * 1.7))
        const px = Math.cos(a) * rr * fireSX * 0.6
        const py = Math.sin(a) * rr * fireSY * 0.6
        const out = 0.2 + 0.25 * hash(fseq * 2.2)
        // wide size and heat variance, so the fire breaks into hot cores and cooler tongues, not one plateau
        const hot = 0.45 + 0.5 * hash(fseq * 9.1)
        const sz = fireR * (0.1 + 0.3 * hash(fseq * 4.4))
        emitFlame(cx + px, cy + py, 0.1 * rnd(fseq), Math.cos(a) * out, Math.sin(a) * out + 0.12, 0, sz, 0.9 + 0.4 * hash(fseq * 6.6), fseq % 4 === 0 ? 0.2 : hot)
      }
    }

    // flash 1: a burst of fire outward as the bird goes into the light
    if (!burst1 && t >= 2.05) {
      burst1 = true
      for (let j = 0; j < 16; j++) {
        fseq += 1
        const a = (j / 16) * TAU + rnd(fseq) * 0.35
        const out = fireR * (0.8 + 0.5 * hash(fseq * 3.7))
        emitFlame(cx, cy, 0, Math.cos(a) * out, Math.sin(a) * out, 0, fireR * 0.2, 1.1 + 0.4 * hash(fseq * 2.1), 0.8)
      }
    }

    // ash: sparks burst out, hang, swirl. Slow, with drag.
    if (!sparkBurst && t >= 2.2) {
      sparkBurst = true
      for (let j = 0; j < 60; j++) {
        fseq += 1
        const a = hash(fseq * 5.5) * TAU
        const sp2 = (0.25 + 0.5 * hash(fseq * 8.8)) * (0.5 + 0.5 * fireR)
        spawnSpark(cx, cy, Math.cos(a) * sp2, Math.sin(a) * sp2, 1.8 + 1.2 * hash(fseq * 1.3), 0.06 + 0.03 * hash(fseq * 0.9), 1.6, 0.6 * rnd(fseq))
      }
    }

    // spiral in: the fire and the sparks draw in to one point
    if (mSpiral > 0 && t < 3.6) {
      const rate = 18 * mSpiral
      flameAcc += dt * rate
      while (flameAcc >= 1) {
        flameAcc -= 1
        fseq += 1
        const a = hash(fseq * 2.9) * TAU
        const rr = fireR * (0.9 - 0.5 * mSpiral) * (0.6 + 0.4 * hash(fseq * 3.3))
        const px = cx + Math.cos(a) * rr
        const py = cy + Math.sin(a) * rr
        // swirl in: mostly round the centre, a little inward, so the puffs do not pile up in one spot
        const sw = 0.9
        emitFlame(px, py, 0, -Math.sin(a) * sw - Math.cos(a) * 0.35, Math.cos(a) * sw - Math.sin(a) * 0.35, 0, fireR * 0.2, 0.4, 0.75)
      }
    }

    // flash 2: softer, at the one point
    if (!burst2 && t >= 3.5) {
      burst2 = true
      for (let j = 0; j < 10; j++) {
        fseq += 1
        const a = (j / 10) * TAU + rnd(fseq) * 0.4
        const out = fireR * (0.4 + 0.3 * hash(fseq * 1.9))
        emitFlame(cx, cy, 0, Math.cos(a) * out, Math.sin(a) * out, 0, fireR * 0.2, 0.7, 0.75)
      }
      // the sparks let go of the point
      for (let i = 0; i < EMBER_N; i++) {
        if (EAGE[i] < ELIFE[i]) ELIFE[i] = EAGE[i] + 0.4
      }
    }

    // unfolding: flame streams off the wing tips and the tail for a moment
    if (mStream > 0 && t < 4.9) {
      const rate = 34 * mStream
      flameAcc += dt * rate
      while (flameAcc >= 1) {
        flameAcc -= 1
        fseq += 1
        const pick = hash(fseq * 4.9)
        if (pick < 0.4) {
          const tv = fseq & 1 ? TIP[0] : TIP[1]
          toG(wingArr[3 * tv], wingArr[3 * tv + 1], wingArr[3 * tv + 2])
          emitFlame(gX, gY, gZ, rnd(fseq) * 0.3, 0.5 + 0.3 * hash(fseq), 0, 0.12 + 0.06 * hash(fseq * 3.3), 0.5 + 0.3 * hash(fseq * 1.3), 1)
        } else {
          const j = pick < 0.7 ? 3 : 4
          toG(PC[j].x[PN], PC[j].y[PN], PC[j].z[PN])
          emitFlame(gX, gY, gZ, rnd(fseq) * 0.2, -0.3 - 0.3 * hash(fseq), 0, 0.1 + 0.05 * hash(fseq * 2.2), 0.45 + 0.3 * hash(fseq * 1.7), 1)
        }
      }
    }
  }

  // the move's clock: set the envelopes from t (seconds) and the room
  function applyMove(t) {
    mGather = rampT(t, 0, 1.1)
    mFold = mGather * (1 - rampT(t, 3.0, 3.6))
    mTail = 1 - 0.3 * mGather * (1 - rampT(t, 2.0, 3.4))
    mGlow = mGather * (1 - rampT(t, 2.1, 2.3)) + 0.9 * rampT(t, 3.6, 3.9) * (1 - rampT(t, 4.5, 5.2))
    // the body goes into the flash (2.0 to 2.2), is gone, and comes back from the point (3.5 to 4.6)
    if (t < 2.0) mScale = 1
    else if (t < 2.2) mScale = 1 - smooth01((t - 2.0) / 0.2)
    else if (t < 3.5) mScale = 0
    else if (t < 4.6) {
      const x = clamp01((t - 3.5) / 1.1)
      mScale = 1 - (1 - x) * (1 - x) * (1 - x)
    } else mScale = 1
    mSpread = rampT(t, 3.6, 4.5) * (1 - rampT(t, 4.6, 5.2))
    mSpiral = rampT(t, 2.9, 3.5) * (1 - rampT(t, 3.5, 3.7))
    mStream = rampT(t, 3.7, 3.9) * (1 - rampT(t, 4.6, 4.9))
    mBurnA = rampT(t, 1.0, 2.0) * (1 - rampT(t, 2.6, 3.0))
  }

  function setIdleEnvelopes() {
    mFold = 0
    mSpread = 0
    mGlow = 0
    mScale = 1
    mTail = 1
    mGather = 0
    mSpiral = 0
    mStream = 0
    mBurnA = 0
  }

  // ---- the sculpt is gone: the code-built bird is the creature, desktop and lite.
  let phase = 0
  pose(0, 0, 0, false)
  // a glow with exact-restore: the body sprite and the ring are hidden until the move calls for them
  spriteMat.opacity = 0
  ringMat.opacity = 0

  // ---- the sculpt: loaded once, deformed on the CPU each frame by smooth weights (never bound to
  // rig triangles, so it cannot tear). Wings bend about the shoulders on the beat, the flame tail
  // sways and lags on the plume springs, the head nods. Fire tones come from the rest shape.
  const size = { x: W * k, y: H * k }
  const holder = new THREE.Group()
  let sculpt = null // { geo, mat, tex, P0, pos, wR, wL, wT, wH, pvX, pvY, hdY, n }
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
      gltf = await loader.loadAsync(lite ? MODEL_URL_LITE : MODEL_URL)
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
        for (const mt of [].concat(c.material || [])) {
          if (mt === src?.material) continue // its maps move to the new material
          mt.dispose()
        }
      })
    if (!src) {
      freeScene()
      throw new Error('phoenix sculpt has no mesh')
    }
    const geo = src.geometry.clone()
    geo.applyMatrix4(src.matrixWorld)
    freeScene()
    if (disposed) {
      geo.dispose()
      for (const key in src.material) if (src.material[key] && src.material[key].isTexture) src.material[key].dispose()
      src.material.dispose()
      return
    }
    // centre on the bounding box, largest side 2
    geo.computeBoundingBox()
    const bb0 = geo.boundingBox
    const cx = (bb0.min.x + bb0.max.x) / 2
    const cy = (bb0.min.y + bb0.max.y) / 2
    const cz = (bb0.min.z + bb0.max.z) / 2
    const sw = bb0.max.x - bb0.min.x
    const sh = bb0.max.y - bb0.min.y
    const s = 2 / Math.max(sw, sh)
    geo.translate(-cx, -cy, -cz)
    geo.scale(s, s, s)
    const pos = geo.attributes.position.array
    const n = geo.attributes.position.count
    const P0 = Float32Array.from(pos)
    const hw = (sw * s) / 2 // half width and half height, sculpt units
    const hh = (sh * s) / 2

    // weights from the rest shape (u, v: -1..1 across the half width and half height)
    const wR = new Float32Array(n) // right wing (screen right, +x)
    const wL = new Float32Array(n)
    const wT = new Float32Array(n) // flame tail
    const wH = new Float32Array(n) // head
    const col = new Float32Array(n * 3)
    const PIV_U = 0.13 // shoulders, as a share of the half width
    const PIV_V = 0.1
    for (let i = 0; i < n; i += 1) {
      const u = P0[3 * i] / hw
      const v = P0[3 * i + 1] / hh
      const au = Math.abs(u)
      // a wing: outboard of the shoulder and above the flames; graded so the bend is smooth
      const out = smooth01((au - PIV_U + 0.04) / 0.5)
      const above = smooth01((v + 0.18) / 0.22)
      const w = out * above
      if (u > 0) wR[i] = w
      else wL[i] = w
      // the tail: everything below the belly, more toward the bottom
      wT[i] = smooth01((-v - 0.05) / 0.7) * (1 - w)
      // the head and crest: high and near the middle
      wH[i] = smooth01((v - 0.22) / 0.12) * (1 - smooth01((au - 0.16) / 0.1))
      // fire tones: ember at the core, amber and gold outward, white-hot at the very tips
      const d = Math.min(1, Math.hypot(u * 0.95, (v - 0.05) * 1.05))
      const c =
        d < 0.22
          ? mix(DEEP, EMBER, d / 0.22)
          : d < 0.6
            ? mix(EMBER, AMBER, (d - 0.22) / 0.38)
            : d < 0.9
              ? mix(AMBER, FLAME_GOLD, (d - 0.6) / 0.3)
              : mix(FLAME_GOLD, HOT, smooth01((d - 0.9) / 0.1))
      // the head stays darker so the eye and beak read against it
      const hc = wH[i] > 0 ? mix(c, mix(EMBER, AMBER, 0.4), 0.6 * wH[i]) : c
      col[3 * i] = hc[0]
      col[3 * i + 1] = hc[1]
      col[3 * i + 2] = hc[2]
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    geo.attributes.position.setUsage(THREE.DynamicDrawUsage)
    geo.deleteAttribute('normal') // flat-shaded: the shader derives each face

    const m = src.material
    const mat = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      map: m.map || null,
      aoMap: m.aoMap || null,
      roughnessMap: m.roughnessMap || null,
      roughness: 0.75,
      metalness: 0.1,
      normalMap: m.normalMap || null,
      flatShading: true,
      side: THREE.DoubleSide,
      envMap,
      envMapIntensity: lite ? 0.5 : 0.6,
      emissive: new THREE.Color(0, 0, 0),
    })
    if (m.normalMap) mat.normalScale.copy(m.normalScale)
    if (!lite) {
      mat.clearcoat = 0.3
      mat.clearcoatRoughness = 0.4
    }
    // the hottest tones glow a little on their own, and a fire rim lights the silhouette
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float heatF = smoothstep(0.8, 1.2, vColor.g); // only the white-hot tips (HOT has g above 1)
        totalEmissiveRadiance += vColor.rgb * heatF * 0.3;
        float rimF = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 3.0);
        totalEmissiveRadiance += vec3(1.0, 0.36, 0.08) * rimF * 0.22;`,
      )
    }
    const tex = [m.map, m.aoMap, m.roughnessMap, m.normalMap].filter(Boolean)
    m.dispose()

    const mesh = new THREE.Mesh(geo, mat)
    mesh.frustumCulled = false
    holder.add(mesh)
    group.add(holder)
    for (const c of [bodyMesh, headPivot, wingMesh, tailMesh, tailEyeMesh]) c.visible = false
    // the frame: the sculpt with room for the beat and the flame sway; the move's fire keeps its own fit
    const fw = 2 * hw * 1.08
    const fh = 2 * hh * 1.1
    const kf = 2 / Math.max(fw, fh)
    holder.userData.k = kf
    holder.scale.setScalar(kf)
    size.x = Math.max(fw * kf, W * k * 0.9)
    size.y = Math.max(fh * kf, H * k * 0.9)
    sculpt = { geo, mat, tex, P0, pos, wR, wL, wT, wH, n, pvX: PIV_U * hw, pvY: PIV_V * hh, hdY: 0.3 * hh, hh }
  }

  // one frame of the sculpt's motion, from the same envelopes the code bird uses
  function deformSculpt(time, e) {
    const S = sculpt
    const b = beat(phase) * (1 - 0.9 * mFold) * (1 - 0.9 * mSpread)
    // the rest pose is the top of the stroke: the beat lowers the wings from there
    const stroke = (lite ? 0.38 : 0.46) * (1 - 0.35 * e) * (1 - 0.55 * mBand)
    let ang = -(1 - b) * stroke
    ang = lerp(ang, -1.15, mFold) // folded round the body for the burn
    ang = lerp(ang, 0.12, mSpread) // thrown wide on the rebirth
    ang += WG_X.length ? WG_X[NPRIM - 1] * 0.6 : 0 // the primaries' spring lag
    const ca = Math.cos(ang)
    const sa = Math.sin(ang)
    const fwdZ = 0.12 * (1 - b) + 0.25 * mFold // the downstroke and the fold sweep a little forward
    // tail: a slow wave down the flames, plus the plume springs (sideways lag on a turn or a shove)
    const lag = (PL_X[2] + PL_X[11] + PL_X[20]) / 3
    const tAmp = 0.05 * (1 + 0.6 * e) * (1 - 0.6 * mFold) * (1 - 0.4 * mBand)
    const nod = headBob * 0.6
    const P0 = S.P0
    const p = S.pos
    const px = S.pvX
    const py = S.pvY
    for (let i = 0; i < S.n; i += 1) {
      const k3 = 3 * i
      let x = P0[k3]
      let y = P0[k3 + 1]
      let z = P0[k3 + 2]
      const wr = S.wR[i]
      const wl = S.wL[i]
      if (wr > 0 || wl > 0) {
        // rotate about the shoulder, by the weight: the wing root bends softly, the tip swings fully
        const w = wr > 0 ? wr : wl
        const sgn = wr > 0 ? 1 : -1
        const dx = x - sgn * px
        const dy = y - py
        const c = 1 + (ca - 1) * w
        const s = sa * w * sgn
        x = sgn * px + dx * c - dy * s
        y = py + dx * s + dy * c
        z += fwdZ * w * Math.abs(dx)
      }
      const wt = S.wT[i]
      if (wt > 0) {
        const ph = time * 1.7 + y * 3.2
        x += wt * (tAmp * Math.sin(ph) + lag * 0.5)
        z += wt * tAmp * 0.6 * Math.cos(ph * 0.8)
      }
      const wh = S.wH[i]
      if (wh > 0) {
        const dy = y - S.hdY
        y += wh * dy * nod * 0.15
        z += wh * (dy * nod + 0.02 * Math.sin(time * 0.55))
      }
      p[k3] = x
      p[k3 + 1] = y
      p[k3 + 2] = z
    }
    S.geo.attributes.position.needsUpdate = true
  }

  try {
    await loadSculpt()
  } catch (err) {
    console.warn('phoenix sculpt not shown, the code-built phoenix stays:', err)
  }

  function act() {
    if (moveT >= 0) return
    moveT = 0
    burst1 = false
    burst2 = false
    sparkBurst = false
    ringOn = false
    flameAcc = 0
  }

  function update(time, dt, energy, motion) {
    if (disposed) return
    const e = clamp01(energy)
    const step = dt > 0 ? (dt > 0.05 ? 0.05 : dt) : 0
    phase += step * (0.42 + 0.7 * e)
    physics(time, step, motion)

    // room lines in group units: a creature width is size.x
    const roomUp = motion && motion.roomUp !== undefined ? motion.roomUp : 9
    const roomDown = motion && motion.roomDown !== undefined ? motion.roomDown : 9
    curTop = roomUp * (W * k)
    curBot = -roomDown * (W * k)

    // the room sets the pose: a phone band (roomUp + roomDown about 0.8 widths) flattens it
    mBand = clamp01((1.6 - (roomUp + roomDown)) / 0.8)

    // the move's clock
    if (moveT >= 0) {
      moveT += step
      if (moveT >= MOVE_LEN) moveT = -1
    }
    if (moveT >= 0) {
      applyMove(moveT)
    } else {
      setIdleEnvelopes()
    }

    // place the body: scaled about its middle, bobbing with the beat
    kS = k * (mScale > 0.001 ? mScale : 0.001)
    innerY = 0.03 * k * Math.sin(TAU * phase)
    inner.scale.setScalar(kS)
    inner.position.set(-cxC * kS, -cyC * kS + innerY, 0)
    gcx = -cxC * kS
    wingMesh.position.z = 0.22 * mFold

    pose(phase, time, e, true)
    if (sculpt) {
      // the sculpt shrinks into the flash and grows back with the body, and bobs on the beat
      const hk = holder.userData.k * (mScale > 0.001 ? mScale : 0.001)
      holder.scale.setScalar(hk)
      holder.position.set(0, innerY, 0)
      deformSculpt(time, e)
      sculpt.mat.emissive.setRGB(0.9 * mGlow, 0.36 * mGlow, 0.1 * mGlow)
    }
    setGlow(mGlow)

    wingGeo.attributes.position.needsUpdate = true
    crestGeo.attributes.position.needsUpdate = true
    tailGeo.attributes.position.needsUpdate = true
    tailEyeGeo.attributes.position.needsUpdate = true

    // the fireball sprite and the ring: sized and clamped to the room
    const lim = Math.min(curTop, -curBot)
    const flashAmt = Math.min(1.5, flash01(moveT >= 0 ? moveT : 0, 2.0, 0.5) + flash01(moveT >= 0 ? moveT : 0, 3.5, 0.5))
    const spriteOp = moveT >= 0 ? Math.min(0.85, 0.22 * mBurnA + 0.7 * flashAmt + 0.12 * mSpiral) : 0
    const cy0 = -cyC * kS + innerY
    if (moveT >= 0 && (mBurnA > 0 || flashAmt > 0 || mSpiral > 0)) {
      const sz = Math.min(fireR * 1.7 * (0.85 + 0.15 * mBurnA) + 0.6 * flashAmt * fireR, Math.max(0.2, 2 * lim * 0.7))
      glowSprite.position.set(gcx, cy0, 0.05)
      glowSprite.scale.set(sz * (fireSX / fireR), sz * (fireSY / fireR), 1)
      spriteMat.opacity = spriteOp
      const hot = 1 + 0.6 * flashAmt
      spriteMat.color.setRGB(hot * 1.5, hot * 0.7, hot * 0.22)
    } else {
      spriteMat.opacity = 0
    }

    // the ring rolls off the bird at 4.2 to 5.0 (and is always off outside that window)
    if (moveT < 4.2 || moveT >= 5.0) ringMat.opacity = 0
    if (moveT >= 4.2 && moveT < 5.0) {
      const x = (moveT - 4.2) / 0.8
      const rr = Math.max(0.05, Math.min(fireR * 1.3, lim * 0.9) * (0.25 + 0.75 * x))
      ring.position.set(gcx, cy0, 0.03)
      ring.scale.set(2 * rr, 2 * rr, 1)
      ringMat.opacity = 0.9 * Math.pow(1 - x, 1.2)
      ringMat.color.setRGB(3.2, 1.9, 0.8)
      ringOn = true
    } else if (ringOn) {
      ringOn = false
      ringMat.opacity = 0
    }

    // flame and sparks: emit during the move, step always
    if (moveT >= 0 && step > 0) stepMove(moveT, step)
    const emitRate = moveT >= 0 ? 4 + 10 * e + 10 * mStream : 4 + 10 * e
    const pull = 3.0 * mSpiral
    stepEmbers(step, emitRate, pull, 0.8 * mSpiral, curTop)
    // the flame's own limits are pulled in by its largest puff, so its ink stays off the lines
    flame.update(step, time, curTop - 0.3, curBot + 0.3)
  }

  function dispose() {
    disposed = true
    flame.dispose()
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
    spriteMat.dispose()
    ringMat.dispose()
    planeGeo.dispose()
    embGeo.dispose()
    embers.dispose()
    ring.geometry.dispose()
    bodyTex.dispose()
    barbTex.dispose()
    glowTex.dispose()
    ringTex.dispose()
    if (sculpt) {
      sculpt.geo.dispose()
      sculpt.mat.dispose()
      for (const t of sculpt.tex) t.dispose()
      sculpt = null
    }
    if (group.parent) group.removeFromParent()
  }

  return {
    group,
    size,
    update,
    act,
    dispose,
  }
}
