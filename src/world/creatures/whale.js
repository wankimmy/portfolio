/**
 * The sky whale: an enormous, slow humpback that swims through the night sky with
 * the traveller's quest log on its back. THREE is passed in; the only import is the
 * sculpt wrap (src/world/wrapSculpt.js).
 *
 * The code-built whale is the RIG: it holds the picture's pose and moves. The baked
 * sculpt (public/models/creature-whale.glb, made by tools/build_creature.py) is wrapped
 * onto it once the download lands, and then follows the rig every frame. Until then,
 * or if the download fails, the code-built whale is shown as it always was.
 *
 *
 * Anatomy, snout to tail:
 *  - body: one smooth lofted skin along a gently arching spine. Rings are denser
 *    at the head. The back has a shoulder hump over the front third, the head is
 *    flattened on top, a brow ridge sits above the eye, and a mouth groove sweeps
 *    down and back under the eye. The belly carries throat pleats.
 *  - pectoral fins: long narrow foils (airfoil sections lofted along a span),
 *    held out and down like wings, with a knobbly leading edge and a flexing,
 *    lagging tip.
 *  - flukes: two foil lobes with a centre notch and a scalloped trailing edge.
 *  - dorsal fin: a short, stubby, rounded foil on the hump.
 *  - tubercles: small instanced bumps on the head and jaw, sunk into the skin.
 *  - crystals: four instanced shards set into the back, ice blue with one gold.
 *  - freckles: one Points object of star points across the flanks.
 *  - surface: generated normal maps (mottling, scars, belly pleats, fin rays).
 */

import { createSculptWrap } from '../wrapSculpt.js'

const TAU = Math.PI * 2
const MODEL_URL = '/models/creature-whale.glb'
const MODEL_URL_LITE = '/models/creature-whale-lite.glb'
// the picture the sculpt was made from: the rig at this time, turned by (pitch, yaw)
const PICTURE = { t: 1.2, yaw: 0.55, pitch: 0.06 }
const SP_K = 40 // spring stiffness (rad/s squared), natural rate about 6.3 rad/s
const SP_C = 5 // damping: zeta about 0.4, so a shove overshoots a little and settles
const FIN_NODES = 4 // springs per pectoral fin: root, then three lagging nodes
const FLUKE_NODES = 3
const TAIL_NODES = 4
const TAIL_FROM = 0.55 // the tail springs start this far along the body
const BL = 2.3 // body length, snout (+x) to tail stock (-x)
const XH = BL / 2
const K_WAVE = 2.4 // spine wave number along the body
const PERIOD = 5.5 // seconds for one swim stroke at rest
const FRECKLES = 260
const TUB_N = 48
const CRYSTAL_F = [0.3, 0.3, 0.34, 0.34] // fraction along the body, on the hump
const CRYSTAL_Z = [-0.024, -0.008, 0.008, 0.024] // tight cluster along the spine
const CRYSTAL_H = [0.07, 0.06, 0.075, 0.055] // standing height
const CRYSTAL_W = [0.08, 0.07, 0.085, 0.065] // base radius, wider than tall
const GOLD = 2
const FIN_F = 0.19
const FIN_LEN = 0.8
const FIN_REST_PHI = -0.95 // ventral-lateral root on the flank
const FLUKE_LEN = 0.6
const FLUKE_REST = 0.3 // radians, tips raised at rest
const DORSAL_F = 0.72
const EYE_F = 0.2
const STRETCH_MAX = 2.2 // a sculpt triangle whose edges grow past this after binding is dropped (torn)
const SLICE_MS = 4 // the most work the sculpt fit does in one turn of the page
// the signature move, in seconds from act(); a width is the creature's own width (size.x)
const MOVE_LEN = 5.4
const ROLL_MAX = 1.33 // radians: a slow, nearly quarter turn of a forty-ton body
const SPOUT_T0 = 1.3 // when the first star leaves the blowhole
const BLOW_F = 0.17 // the blowhole: on the crown, just behind the head's highest point
const GRAV = 1.1 // widths per second squared: slow, like a heavy body in water
const RING_T0 = 2.3 // the first of three singing rings
const RING_LIFE = 2.1

// half height of the body along its length (u: 0 snout .. 1 tail stock), before caps
const HH_KEYS = [
  [0, 0.24],
  [0.05, 0.27],
  [0.14, 0.28],
  [0.24, 0.28],
  [0.36, 0.265],
  [0.5, 0.22],
  [0.64, 0.16],
  [0.78, 0.1],
  [0.9, 0.075],
  [1, 0.06],
]

const clamp = (x, a, b) => (x < a ? a : x > b ? b : x)
const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const hash = (n) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}
function curve(pts, u) {
  for (let k = 0; k < pts.length - 1; k += 1) {
    const u0 = pts[k][0]
    const v0 = pts[k][1]
    const u1 = pts[k + 1][0]
    const v1 = pts[k + 1][1]
    if (u <= u1) return v0 + (v1 - v0) * (1 - Math.cos((Math.PI * (u - u0)) / (u1 - u0))) * 0.5
  }
  return pts[pts.length - 1][1]
}
// a damped spring chain: node 0 (X[base]) is pinned to the body, nodes 1..n-1 are each
// pulled toward the node before them, so the tip lags last. drive is the motion input
// (clamped by the caller), gain sets how hard it pushes. Stable for dt up to 0.05.
function stepChain(X, V, base, n, drive, gain, time, dt, lim, phase) {
  for (let i = 1; i < n; i += 1) {
    const k = base + i
    const w = i / (n - 1)
    const idle = 0.3 * Math.sin(2.1 * time + phase + i) // a small life when nothing moves, so a kick settles
    const acc = -SP_K * (X[k] - X[k - 1]) - SP_C * V[k] + gain * drive * w + idle
    let v = V[k] + acc * dt
    let x = X[k] + v * dt
    if (x > lim) {
      x = lim
      v = 0
    } else if (x < -lim) {
      x = -lim
      v = 0
    }
    V[k] = v
    X[k] = x
  }
}
// the chain's value at q (0 root .. 1 tip), linearly between its nodes
function nodeAt(X, base, n, q) {
  const f = q * (n - 1)
  const i = Math.min(n - 2, Math.floor(f))
  const t = f - i
  return X[base + i] * (1 - t) + X[base + i + 1] * t
}

// the snout rounds off to a blunt, rounded rostrum (no flat disc); the tail stock tapers
// how much the head lifts and the back arches during the move, along the body (local units)
const archShape = (u) => 0.22 * (1 - smooth(0, 0.5, u)) + 0.16 * Math.exp(-(((u - 0.32) / 0.2) ** 2))

const capOf = (u) => {
  if (u < 0.14) return Math.max(0.07, Math.sqrt(Math.max(0, 1 - ((0.14 - u) / 0.14) ** 2)))
  if (u > 0.96) return Math.max(0.2, Math.sqrt(Math.max(0, 1 - ((u - 0.96) / 0.04) ** 2)))
  return 1
}

// plain geometry buffers for the static pieces (eye, crystals)
function Buf() {
  return { p: [], c: [], i: [] }
}
function vert(b, x, y, z, col) {
  b.p.push(x, y, z)
  b.c.push(col.r, col.g, col.b)
  return b.p.length / 3 - 1
}
function addSphere(b, cx, cy, cz, r, col, seg, rings) {
  const base = b.p.length / 3
  for (let ri = 0; ri <= rings; ri += 1) {
    const v = (Math.PI * ri) / rings
    for (let si = 0; si < seg; si += 1) {
      const h = (TAU * si) / seg
      vert(b, cx + r * Math.sin(v) * Math.cos(h), cy + r * Math.cos(v), cz + r * Math.sin(v) * Math.sin(h), col)
    }
  }
  for (let ri = 0; ri < rings; ri += 1) {
    for (let si = 0; si < seg; si += 1) {
      const a = base + ri * seg + si
      const bb = base + ri * seg + ((si + 1) % seg)
      b.i.push(a, a + seg, bb, bb, a + seg, bb + seg)
    }
  }
}

// periodic value noise on the unit square, cells per side
function hash2(ix, iy, seed) {
  return hash(ix * 127.13 + iy * 311.91 + seed * 74.7)
}
function vnoise(u, v, cells, seed) {
  const fx = u * cells
  const fy = v * cells
  const x0 = Math.floor(fx)
  const y0 = Math.floor(fy)
  const tx = fx - x0
  const ty = fy - y0
  const sx = tx * tx * (3 - 2 * tx)
  const sy = ty * ty * (3 - 2 * ty)
  const ax = ((x0 % cells) + cells) % cells
  const ay = ((y0 % cells) + cells) % cells
  const bx = (ax + 1) % cells
  const by = (ay + 1) % cells
  const n00 = hash2(ax, ay, seed)
  const n10 = hash2(bx, ay, seed)
  const n01 = hash2(ax, by, seed)
  const n11 = hash2(bx, by, seed)
  return (n00 * (1 - sx) + n10 * sx) * (1 - sy) + (n01 * (1 - sx) + n11 * sx) * sy
}

// a tangent-space normal map built from a height field, 512 x 256, no image files
function makeNormalTexture(THREE, kind) {
  const W = 512
  const H = 256
  const h = new Float32Array(W * H)
  for (let y = 0; y < H; y += 1) {
    const v = y / H
    for (let x = 0; x < W; x += 1) {
      const u = x / W
      let s = 0.5 * vnoise(u, v, 8, 1) + 0.25 * vnoise(u, v, 24, 2) + 0.12 * vnoise(u, v, 64, 3)
      s -= 0.22 * vnoise(u, v, 128, 4) ** 10 // small pits, like pores
      if (kind === 'skin') {
        // throat pleats: ridges that run from chin (u 0) to navel (u about 0.45) on the belly (v 0.5 to 1)
        const bm = smooth(0.42, 0.52, v) * (1 - smooth(0.95, 1, v))
        const pm = (1 - smooth(0.36, 0.5, u)) * smooth(0, 0.03, u)
        const pl = (0.5 + 0.5 * Math.cos(TAU * 24 * v)) ** 1.6
        s += 0.4 * pl * bm * pm
      } else {
        // fin rays: fine ribs running along the span
        s += 0.22 * (0.5 + 0.5 * Math.cos(TAU * 10 * v)) ** 4
      }
      h[y * W + x] = s
    }
  }
  if (kind === 'skin') {
    // scars: short grooves
    for (let k = 0; k < 14; k += 1) {
      const x0 = hash(k * 3 + 1) * W
      const y0 = hash(k * 3 + 2) * H
      const ang = hash(k * 3 + 3) * TAU
      const len = (0.04 + 0.08 * hash(k + 50)) * W
      const x1 = x0 + Math.cos(ang) * len
      const y1 = y0 + Math.sin(ang) * len * 0.5
      const dx = x1 - x0
      const dy = y1 - y0
      const l2 = dx * dx + dy * dy
      for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
          const t = clamp(((x - x0) * dx + (y - y0) * dy) / l2, 0, 1)
          const px = x0 + dx * t - x
          const py = y0 + dy * t - y
          const d2 = px * px + py * py
          h[y * W + x] -= 0.25 * Math.exp(-d2 / 18)
        }
      }
    }
  }
  const data = new Uint8Array(W * H * 4)
  const K = kind === 'skin' ? 1.2 : 1.2
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const xl = h[y * W + ((x - 1 + W) % W)]
      const xr = h[y * W + ((x + 1) % W)]
      const yd = h[((y - 1 + H) % H) * W + x]
      const yu = h[((y + 1) % H) * W + x]
      let nx = -(xr - xl) * K
      let ny = -(yu - yd) * K
      let nz = 1
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
      nx /= len
      ny /= len
      nz /= len
      const o = (y * W + x) * 4
      data[o] = (nx * 0.5 + 0.5) * 255
      data[o + 1] = (ny * 0.5 + 0.5) * 255
      data[o + 2] = (nz * 0.5 + 0.5) * 255
      data[o + 3] = 255
    }
  }
  const tex = new THREE.DataTexture(data, W, H)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.generateMipmaps = true
  tex.needsUpdate = true
  return tex
}

/**
 * @param {typeof import('three')} THREE
 * @param {{ envMap: import('three').Texture, lite: boolean }} options
 */
export function createCreature(THREE, { envMap, lite }) {
  const NR = lite ? 52 : 80 // rings along the body
  const NS = lite ? 24 : 40 // segments around each ring
  const FIN_S = lite ? 14 : 24
  const FIN_K = lite ? 10 : 16
  const FLUKE_S = lite ? 12 : 18
  const FLUKE_K = lite ? 10 : 16
  const DORSAL_S = lite ? 6 : 8
  const DORSAL_K = lite ? 6 : 8
  const ringOf = (u) => Math.round(Math.pow(u, 0.8) * (NR - 1))

  // ---- colours (sRGB hex, converted to linear by THREE.Color) --------------
  const cNavy = new THREE.Color('#0a1134')
  const cIndigo = new THREE.Color('#1b2a66')
  const cBelly = new THREE.Color('#7e9fd8')
  const cLead = new THREE.Color('#3a4f97')
  const cBand = new THREE.Color('#9fc2ff')
    const tmp = new THREE.Color()

  // ---- spine rest data -----------------------------------------------------
  const U = new Float32Array(NR)
  const X = new Float32Array(NR)
  const YC = new Float32Array(NR)
  const AMP = new Float32Array(NR)
  const TH_REST = new Float32Array(NR)
  for (let i = 0; i < NR; i += 1) {
    U[i] = Math.pow(i / (NR - 1), 1.25) // denser rings at the head
    X[i] = XH - BL * U[i]
    YC[i] = 0.05 * Math.sin(Math.PI * U[i]) - 0.05 * U[i]
    AMP[i] = 0.012 + 0.16 * Math.pow(U[i], 1.6)
  }
  for (let i = 0; i < NR; i += 1) {
    const a = Math.max(0, i - 1)
    const b = Math.min(NR - 1, i + 1)
    TH_REST[i] = Math.atan((YC[b] - YC[a]) / (X[b] - X[a]))
  }

  // local ring coordinates (Y up, Z lateral) of the rest surface at (u, phi)
  // phi = 0 is the side facing the viewer, pi/2 the top, -pi/2 the belly
  function sectionYZ(u, phi, out, o) {
    const base = curve(HH_KEYS, u)
    const cap = capOf(u)
    const hh = base * cap
    // the rostrum domes up but stays broad across: the width tapers half as fast as the height
    const ww = base * (0.5 + 0.5 * cap) * (0.95 - 0.15 * u) * (1 + 0.45 * (1 - smooth(0, 0.22, u)))
    const sp = Math.sin(phi)
    const cp = Math.cos(phi)
    let hy = hh
    if (sp > 0) {
      // shoulder hump over the front third, and a broad flattened rostrum on top
      const hump = 1 + 0.2 * Math.exp(-(((u - 0.25) / 0.16) ** 2)) * sp * sp
      const flat = 0.18 * (1 - smooth(0.04, 0.24, u)) * sp * sp
      hy = hh * (hump - flat)
    }
    // brow ridge above the eye, on both sides
    const brow = 1 + 0.07 * Math.exp(-(((u - 0.12) / 0.05) ** 2) - ((sp - 0.25) / 0.2) ** 2) * smooth(0, 0.3, Math.abs(cp))
    const ey = sp > 0 ? (u < 0.4 ? 0.6 : 0.8) : 0.9
    out[o] = Math.sign(sp) * hy * Math.abs(sp) ** ey * brow
    out[o + 1] = Math.sign(cp) * ww * Math.abs(cp) ** 0.9
  }

  // ---- the root group and the spine frames ---------------------------------
  const group = new THREE.Group()
  const holder = new THREE.Group()
  const bodyRoot = new THREE.Group()
  bodyRoot.rotation.y = -0.85 // three-quarter hero: head toward screen right and toward the viewer
  group.add(holder)
  holder.add(bodyRoot)

  const frames = []
  for (let i = 0; i < NR; i += 1) {
    const f = new THREE.Group()
    bodyRoot.add(f)
    frames.push(f)
  }

  // ---- body skin -----------------------------------------------------------
  const YO = new Float32Array(NR * NS)
  const ZO = new Float32Array(NR * NS)
  // NR * NS ring vertices, then two centre vertices that close the snout and the tail
  const NV = NR * NS + 2
  const SNOUT_C = NR * NS
  const TAIL_C = NR * NS + 1
  const bodyPos = new Float32Array(NV * 3)
  const bodyCol = new Float32Array(NV * 3)
  const bodyUV = new Float32Array(NV * 2)
  const bodyRim = new Float32Array(NV) // 0 on the head, 1 on the flank and tail
  const sec = new Float32Array(2)
  for (let i = 0; i < NR; i += 1) {
    const u = U[i]
    for (let j = 0; j < NS; j += 1) {
      const k = i * NS + j
      const phi = (TAU * j) / NS
      sectionYZ(u, phi, sec, 0)
      const sp = Math.sin(phi)
      const cp = Math.cos(phi)
      // the mouth groove: a real crease in the skin, sweeping down and back under the eye
      const smG = -0.1 - 0.45 * smooth(0.02, 0.22, u)
      const grooveG = Math.exp(-(((sp - smG) / 0.07) ** 2)) * smooth(0.1, 0.5, Math.abs(cp)) * smooth(0.05, 0.12, u) * (1 - smooth(0.28, 0.4, u))
      const g = 1 - 0.09 * grooveG
      YO[k] = sec[0] * g
      ZO[k] = sec[1] * g
      bodyUV[k * 2] = u
      bodyUV[k * 2 + 1] = j / NS
      bodyRim[k] = smooth(0.26, 0.46, u) // no rim on the head, so no headlamp
      // belly pale, flank indigo, back midnight navy
      tmp.copy(cBelly)
      tmp.lerp(cIndigo, smooth(-0.6, -0.15, sp))
      tmp.lerp(cNavy, smooth(-0.05, 0.55, sp))
      // a faint band of light along the flank, like the Milky Way
      const band = Math.exp(-(((sp - 0.05) / 0.2) ** 2)) * smooth(0.15, 0.3, u) * (1 - smooth(0.85, 0.98, u))
      tmp.lerp(cBand, 0.35 * band)
      // the groove is darker, so the crease reads in every view
      tmp.multiplyScalar(1 - 0.5 * grooveG)
      bodyCol[k * 3] = tmp.r
      bodyCol[k * 3 + 1] = tmp.g
      bodyCol[k * 3 + 2] = tmp.b
    }
  }
  // the two centre vertices take the ends' colour and uv
  for (const cv of [SNOUT_C, TAIL_C]) {
    bodyCol[cv * 3] = cIndigo.r
    bodyCol[cv * 3 + 1] = cIndigo.g
    bodyCol[cv * 3 + 2] = cIndigo.b
    bodyUV[cv * 2] = cv === SNOUT_C ? 0.5 : 1
    bodyUV[cv * 2 + 1] = 0.5
  }
  bodyRim[SNOUT_C] = 0
  bodyRim[TAIL_C] = 1
  const bodyIdx = []
  for (let i = 0; i < NR - 1; i += 1) {
    for (let j = 0; j < NS; j += 1) {
      const a = i * NS + j
      const b = i * NS + ((j + 1) % NS)
      const c = (i + 1) * NS + j
      const d = (i + 1) * NS + ((j + 1) % NS)
      bodyIdx.push(a, b, c, b, d, c)
    }
  }
  for (let j = 0; j < NS; j += 1) {
    const jn = (j + 1) % NS
    // snout face points +x, tail face points -x
    bodyIdx.push(SNOUT_C, jn, j)
    bodyIdx.push(TAIL_C, (NR - 1) * NS + j, (NR - 1) * NS + jn)
  }
  const bodyGeo = new THREE.BufferGeometry()
  const bodyPosAttr = new THREE.BufferAttribute(bodyPos, 3)
  bodyGeo.setAttribute('position', bodyPosAttr)
  bodyGeo.setAttribute('color', new THREE.BufferAttribute(bodyCol, 3))
  bodyGeo.setAttribute('uv', new THREE.BufferAttribute(bodyUV, 2))
  bodyGeo.setAttribute('aRim', new THREE.BufferAttribute(bodyRim, 1))
  bodyGeo.setIndex(bodyIdx)

  const bodyTex = makeNormalTexture(THREE, 'skin')
  bodyTex.repeat.set(2, 1)
  const finTex = makeNormalTexture(THREE, 'fin')
  finTex.repeat.set(3, 1)

  // the soft cyan fresnel rim is masked by aRim on the body, so the head does not glow
  const rimHead = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aRim;\nvarying float vRim;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n  vRim = aRim;')
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vRim;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
  float rimF = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 3.0);
  totalEmissiveRadiance += vec3(0.43, 0.82, 1.0) * rimF * 0.05 * vRim;`,
      )
  }
  const rimAll = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
  float rimF = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 3.0);
  totalEmissiveRadiance += vec3(0.43, 0.82, 1.0) * rimF * 0.06;`,
    )
  }
  const skin = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    side: THREE.FrontSide,
    normalMap: bodyTex,
    normalScale: new THREE.Vector2(0.6, 0.6),
    roughness: 0.42,
    metalness: 0.04,
    envMap,
    envMapIntensity: lite ? 0.5 : 0.6,
    clearcoat: lite ? 0 : 0.25,
    clearcoatRoughness: 0.35,
    iridescence: lite ? 0 : 0.15,
  })
  skin.onBeforeCompile = rimHead
  const finSkin = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    normalMap: finTex,
    normalScale: new THREE.Vector2(0.35, 0.35),
    roughness: 0.5,
    metalness: 0.03,
    envMap,
    envMapIntensity: lite ? 0.6 : 0.8,
    clearcoat: lite ? 0 : 0.3,
    clearcoatRoughness: 0.3,
  })
  finSkin.onBeforeCompile = rimAll

  const body = new THREE.Mesh(bodyGeo, skin)
  body.frustumCulled = false
  bodyRoot.add(body)

  // current spine state, used by the freckles, tubercles and crystals
  const DY = new Float32Array(NR)
  const CUR_TH = new Float32Array(NR)
  const CUR_RO = new Float32Array(NR)
  const CUR_CX = new Float32Array(NR)
  const CUR_CY = new Float32Array(NR)
  const CUR_CZ = new Float32Array(NR)
  const tailZ = new Float32Array(NR) // sideways lag of the tail stock, from its springs
  // the move's pose terms, set by updateMove each frame (all zero at rest)
  let mArch = 0 // the head lift and back arch
  let mRoll = 0 // the slow roll about the body's own axis
  let mFinSweep = 0 // the pectoral fins sweeping wide, late
  let mBeat = 0 // the fluke's one deep beat
  let mRoom = 1 // 1 with room to spare, 0 on a phone's narrow band: lowers and flattens the move
  let mUp = 1.5 // open space above and below the creature, in widths (the move keeps inside these)
  let mDown = 1.5
  let frameY = 0 // the centre of the framed sculpt, in group units: the screen centre (set by the bind)

  function placeSpine(time, e) {
    const w = (TAU / PERIOD) * (1 + 1.1 * e)
    const amp = 1 + 0.8 * e
    for (let i = 0; i < NR; i += 1) DY[i] = AMP[i] * amp * Math.sin(w * time - K_WAVE * U[i]) + mArch * archShape(U[i])
    for (let i = 0; i < NR; i += 1) {
      const a = Math.max(0, i - 1)
      const b = Math.min(NR - 1, i + 1)
      const slope = (DY[b] - DY[a]) / (X[b] - X[a])
      const th = TH_REST[i] + Math.atan(slope)
      const ro = 0.05 * (1 + 0.5 * e) * Math.sin(0.55 * w * time - 1.1 * U[i]) + mRoll
      const cx = X[i]
      const cy = YC[i] + DY[i]
      const cz = tailZ[i]
      CUR_TH[i] = th
      CUR_RO[i] = ro
      CUR_CX[i] = cx
      CUR_CY[i] = cy
      CUR_CZ[i] = cz
      frames[i].position.set(cx, cy, cz)
      frames[i].rotation.set(ro, 0, th, 'ZXY')
      frames[i].updateMatrix()

      const ct = Math.cos(th)
      const st = Math.sin(th)
      const cr = Math.cos(ro)
      const sr = Math.sin(ro)
      for (let j = 0; j < NS; j += 1) {
        const k = i * NS + j
        const Y = YO[k]
        const Z = ZO[k]
        const Yr = Y * cr - Z * sr
        const Zr = Y * sr + Z * cr
        bodyPos[k * 3] = cx - st * Yr
        bodyPos[k * 3 + 1] = cy + ct * Yr
        bodyPos[k * 3 + 2] = Zr + cz
      }
    }
    // centre vertices sit on the spine at each end
    bodyPos[SNOUT_C * 3] = CUR_CX[0] // the rostrum is a domed cap, closed on the spine
    bodyPos[SNOUT_C * 3 + 1] = CUR_CY[0]
    bodyPos[SNOUT_C * 3 + 2] = 0
    bodyPos[TAIL_C * 3] = CUR_CX[NR - 1]
    bodyPos[TAIL_C * 3 + 1] = CUR_CY[NR - 1]
    bodyPos[TAIL_C * 3 + 2] = 0
    bodyPosAttr.needsUpdate = true
  }
  // a point on the skin of ring i at ring-local (Y, Z), from the current spine state
  function ringPoint(i, Y, Z, out, o) {
    const ct = Math.cos(CUR_TH[i])
    const st = Math.sin(CUR_TH[i])
    const cr = Math.cos(CUR_RO[i])
    const sr = Math.sin(CUR_RO[i])
    const Yr = Y * cr - Z * sr
    const Zr = Y * sr + Z * cr
    out[o] = CUR_CX[i] - st * Yr
    out[o + 1] = CUR_CY[i] + ct * Yr
    out[o + 2] = Zr + CUR_CZ[i]
  }
  placeSpine(0, 0)

  // ---- foils: airfoil sections lofted along a span --------------------------
  // each foil keeps its own write() closure, built once, so update() does no lookups
  function makeFoil(S, K) {
    const n = S * K
    const pos = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const uv = new Float32Array(n * 2)
    const P = new Float32Array(S * 3) // span stations
    const C = new Float32Array(S * 3) // chord direction per station
    const N = new Float32Array(S * 3) // thickness direction per station
    const c = new Float32Array(S) // chord per station
    const t = new Float32Array(S) // half thickness per station
    const knob = new Float32Array(S) // leading-edge bumps per station
    const cA = new Float32Array(K)
    const sA = new Float32Array(K)
    for (let k = 0; k < K; k += 1) {
      const a = (TAU * k) / K
      cA[k] = Math.cos(a)
      sA[k] = Math.sin(a)
    }
    for (let s = 0; s < S; s += 1) {
      for (let k = 0; k < K; k += 1) {
        const idx = s * K + k
        uv[idx * 2] = s / (S - 1)
        uv[idx * 2 + 1] = k / K
        const edge = k === 0 || k === K - 1 ? cLead : cIndigo
        col[idx * 3] = edge.r
        col[idx * 3 + 1] = edge.g
        col[idx * 3 + 2] = edge.b
      }
    }
    const idx = []
    for (let s = 0; s < S - 1; s += 1) {
      for (let k = 0; k < K; k += 1) {
        const a = s * K + k
        const b = s * K + ((k + 1) % K)
        const cc = (s + 1) * K + k
        const d = (s + 1) * K + ((k + 1) % K)
        idx.push(a, cc, b, b, cc, d)
      }
    }
    const geo = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(pos, 3)
    geo.setAttribute('position', posAttr)
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
    geo.setIndex(idx)
    // writes the section points from the stations, then refreshes normals
    const write = () => {
      for (let s = 0; s < S; s += 1) {
        const sx = P[s * 3]
        const sy = P[s * 3 + 1]
        const sz = P[s * 3 + 2]
        const kn = knob[s]
        const cs = c[s]
        const ts = t[s]
        for (let k = 0; k < K; k += 1) {
          // leading edge at 0, trailing edge at the chord; knobs push the leading edge forward
          const xc = cs * 0.5 * (1 - cA[k]) - kn * (0.5 + 0.5 * cA[k]) ** 3
          const yc = ts * sA[k]
          const o = (s * K + k) * 3
          pos[o] = sx + C[s * 3] * xc + N[s * 3] * yc
          pos[o + 1] = sy + C[s * 3 + 1] * xc + N[s * 3 + 1] * yc
          pos[o + 2] = sz + C[s * 3 + 2] * xc + N[s * 3 + 2] * yc
        }
      }
      posAttr.needsUpdate = true
      geo.computeVertexNormals()
    }
    return { S, K, P, C, N, c, t, knob, geo, write }
  }
  const norm3 = (v) => {
    const l = Math.hypot(v[0], v[1], v[2])
    return [v[0] / l, v[1] / l, v[2] / l]
  }
  const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  // chord direction: the back vector with its span component removed
  const chordFor = (D) => {
    const back = [-1, 0, 0]
    const d = dot3(back, D)
    return norm3([back[0] - D[0] * d, back[1] - D[1] * d, back[2] - D[2] * d])
  }

  // ---- pectoral fins: long tapering foils held out and down like wings ------
  const finRing = ringOf(FIN_F)
  const finRoot = new Float32Array(2)
  sectionYZ(U[finRing], FIN_REST_PHI, finRoot, 0)
  const fins = []
  const finX = new Float64Array(2 * FIN_NODES) // flex springs, two fins x FIN_NODES
  const finV = new Float64Array(2 * FIN_NODES)
  function buildFin(side, phase) {
    const fi = fins.length
    const f = makeFoil(FIN_S, FIN_K)
    const D = norm3([-0.42, -0.5, 0.76 * side])
    const C = chordFor(D)
    const N = norm3(cross3(D, C))
    for (let s = 0; s < FIN_S; s += 1) {
      const q = s / (FIN_S - 1)
      f.c[s] = 0.25 * (1 - q) ** 0.75 + 0.02
      f.t[s] = 0.03 * (1 - q) ** 0.6 + 0.005
      // rounded knobs on the leading edge: five or six bumps, widest near the root
      f.knob[s] = 0.035 * (0.5 + 0.5 * Math.sin(TAU * 5.5 * q + 1)) ** 2 * (1 - q) ** 0.3 * smooth(0, 0.1, q)
      for (let d = 0; d < 3; d += 1) {
        f.C[s * 3 + d] = C[d]
        f.N[s * 3 + d] = N[d]
      }
    }
    const root = [-0.03 * D[0], finRoot[0] - 0.03 * D[1], side * finRoot[1] * 0.92 - 0.03 * D[2]]
    // the tip flexes and lags behind the root
    const update = (time, e) => {
      const w = (TAU / PERIOD) * (1 + 1.1 * e)
      const amp = 0.08 + 0.14 * e
      for (let s = 0; s < FIN_S; s += 1) {
        const q = s / (FIN_S - 1)
        // the spring lag adds to the flapping: the tip trails behind a shove
        const flex = amp * q ** 1.3 * Math.sin(w * time + phase - 2.6 * q) + 0.5 * nodeAt(finX, fi * FIN_NODES, FIN_NODES, q)
        const len = FIN_LEN * q
        const sweep = 0.06 * q * q
        f.P[s * 3] = root[0] + D[0] * len + f.N[s * 3] * flex + f.C[s * 3] * sweep
        f.P[s * 3 + 1] = root[1] + D[1] * len + f.N[s * 3 + 1] * flex + f.C[s * 3 + 1] * sweep
        f.P[s * 3 + 2] = root[2] + D[2] * len + f.N[s * 3 + 2] * flex + f.C[s * 3 + 2] * sweep + side * mFinSweep * 0.5 * q ** 1.2
      }
      f.write()
    }
    const fin = { f, update }
    fins.push(fin)
    return fin
  }
  const finA = buildFin(1, 0)
  const finB = buildFin(-1, 0.6)
  for (const fin of [finA, finB]) {
    const mesh = new THREE.Mesh(fin.f.geo, finSkin)
    mesh.frustumCulled = false
    frames[finRing].add(mesh)
  }
  finA.update(0, 0)
  finB.update(0, 0)

  // ---- flukes: two foil lobes with a centre notch and scalloped trailing edge --
  const flukeFoils = []
  const flukeUpdates = []
  const flukeX = new Float64Array(2 * FLUKE_NODES) // lag springs, two lobes x FLUKE_NODES
  const flukeV = new Float64Array(2 * FLUKE_NODES)
  for (let lobe = 0; lobe < 2; lobe += 1) {
    const f = makeFoil(FLUKE_S, FLUKE_K)
    const sgn = lobe === 0 ? 1 : -1
    for (let s = 0; s < FLUKE_S; s += 1) {
      const q = s / (FLUKE_S - 1)
      // lobes with four scallops on the trailing edge, and a notch at the centre
      // a wide triangular lobe: chord zero at the centre notch, widest at the outer third,
      // with a scalloped trailing edge
      f.c[s] = 0.42 * smooth(0.08, 0.4, q) * (1 - 0.35 * q) * (1 - 0.14 * (0.5 - 0.5 * Math.cos(TAU * 3 * q)))
      f.t[s] = 0.035 * (1 - 0.4 * q) + 0.005
      f.C[s * 3] = -1
      f.C[s * 3 + 1] = 0
      f.C[s * 3 + 2] = 0
    }
    flukeFoils.push(f)
    const mesh = new THREE.Mesh(f.geo, finSkin)
    mesh.frustumCulled = false
    frames[NR - 1].add(mesh)
    flukeUpdates.push((time, e) => {
      const w = (TAU / PERIOD) * (1 + 1.1 * e)
      const amp = 0.2 + 0.15 * e
      for (let s = 0; s < FLUKE_S; s += 1) {
        const q = s / (FLUKE_S - 1)
        // the tip lags, and the amplitude eases off toward the lobe tips for a smoother bend
        const alpha = FLUKE_REST + amp * Math.sin(w * time - 2.2 - 1.0 * q) * q * 0.75 + nodeAt(flukeX, lobe * FLUKE_NODES, FLUKE_NODES, q) - mBeat * 0.7 * q
        const dy = Math.sin(alpha)
        const dz = sgn * Math.cos(alpha)
        f.P[s * 3] = -0.02
        f.P[s * 3 + 1] = dy * FLUKE_LEN * q
        f.P[s * 3 + 2] = sgn * 0.03 + dz * FLUKE_LEN * q
        f.N[s * 3] = 0
        f.N[s * 3 + 1] = -dz
        f.N[s * 3 + 2] = dy
      }
      f.write()
    })
  }
  for (let lobe = 0; lobe < 2; lobe += 1) flukeUpdates[lobe](0, 0)

  // ---- dorsal fin: a short, stubby, rounded foil on the hump ---------------
  const dorsalRing = ringOf(DORSAL_F)
  const dorsalTop = new Float32Array(2)
  sectionYZ(U[dorsalRing], Math.PI / 2, dorsalTop, 0)
  {
    const f = makeFoil(DORSAL_S, DORSAL_K)
    const D = norm3([-0.5, 0.87, 0]) // leaning back about 30 degrees
    const C = chordFor(D)
    const N = norm3(cross3(D, C))
    for (let s = 0; s < DORSAL_S; s += 1) {
      const q = s / (DORSAL_S - 1)
      f.c[s] = 0.09 * (1 - q) ** 0.6 + 0.025
      f.t[s] = 0.03 * (1 - q) ** 0.5 + 0.012
      const sweep = 0.03 * q * q
      f.P[s * 3] = -0.03 * D[0] + D[0] * 0.09 * q + C[0] * sweep
      f.P[s * 3 + 1] = dorsalTop[0] - 0.03 + D[1] * 0.09 * q + C[1] * sweep
      f.P[s * 3 + 2] = D[2] * 0.09 * q + C[2] * sweep
      for (let d = 0; d < 3; d += 1) {
        f.C[s * 3 + d] = C[d]
        f.N[s * 3 + d] = N[d]
      }
    }
    f.write()
    const mesh = new THREE.Mesh(f.geo, finSkin)
    mesh.frustumCulled = false
    frames[dorsalRing].add(mesh)
  }

  // ---- eyes: small, dark, low on the side, a lighter lid and one HDR glint -------
  const eyeRing = ringOf(EYE_F)
  const eyeMat = new THREE.MeshBasicMaterial({ vertexColors: true })
  const eyeLocal = [] // [ey, ez] of each eye on its ring, for seating the eyes on the sculpt
  let eyeSplit = 0 // vertex index where the second eye starts
  let eyeGeo = null
  {
    const b = Buf()
    const iris = new THREE.Color(0.005, 0.01, 0.03)
    const glint = lite ? new THREE.Color(1.6, 1.25, 0.6) : new THREE.Color(2.0, 1.5, 0.7) // gold, like the crystal
    for (let side = 0; side < 2; side += 1) {
      const sgn = side === 0 ? 1 : -1
      const phi = side === 0 ? -0.22 : Math.PI + 0.22 // low on the side, behind the mouth corner
      sectionYZ(U[eyeRing], phi, sec, 0)
      const ey = sec[0]
      const ez = sec[1] * 0.99
      addSphere(b, 0, ey, ez + sgn * 0.004, 0.04, iris, 12, 8) // the dark iris, sunk in the skin
      addSphere(b, 0, ey + 0.012, ez + sgn * 0.03, 0.012, glint, 6, 4) // one gold glint, larger so it reads
      eyeLocal.push([ey, ez])
      if (side === 0) eyeSplit = b.p.length / 3
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(b.c, 3))
    geo.setIndex(b.i)
    eyeGeo = geo
    const eyes = new THREE.Mesh(geo, eyeMat)
    eyes.frustumCulled = false
    frames[eyeRing].add(eyes)
  }

  // ---- tubercles on the head and jaw: one instanced mesh, flattened and sunk ----
  const tubGeo = lite ? new THREE.SphereGeometry(1, 6, 4) : new THREE.SphereGeometry(1, 8, 6)
  const tubMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.04, envMap, envMapIntensity: 0.6 })
  const tubs = new THREE.InstancedMesh(tubGeo, tubMat, TUB_N)
  tubs.frustumCulled = false
  bodyRoot.add(tubs)
  const tubRing = new Uint16Array(TUB_N)
  const tubLocal = []
  const identQ = new THREE.Quaternion()
  const pTmp = new THREE.Vector3()
  const sTmp = new THREE.Vector3()
  const mTmp = new THREE.Matrix4()
  const instColor = new THREE.Color()
  for (let k = 0; k < TUB_N; k += 1) {
    const r = ringOf(0.02 + 0.24 * hash(k + 300))
    const jaw = k % 3 !== 0
    const sideSign = k % 2 === 0 ? 1 : -1
    let phi
    if (!jaw) phi = Math.PI / 2 + (hash(k + 400) - 0.5) * 1.3
    else {
      phi = -0.25 - 0.4 * hash(k + 500)
      if (sideSign < 0) phi = Math.PI - phi
    }
    sectionYZ(U[r], phi, sec, 0)
    const rad = 0.012 + 0.005 * hash(k + 600)
    pTmp.set(0, sec[0] * 0.998, sec[1] * 0.998) // half proud of the skin: flat bumps, not beads
    sTmp.set(rad, rad * 0.45, rad)
    tubLocal.push(new THREE.Matrix4().compose(pTmp, identQ, sTmp))
    tubRing[k] = r
    instColor.copy(cIndigo).lerp(cBelly, 0.12 + 0.08 * hash(k + 700)) // close to the skin, so they read as bumps not beads
    tubs.setColorAt(k, instColor)
  }
  tubs.instanceColor.needsUpdate = true

  // ---- crystals on the back: four flat-based shards, set into the skin ----------
  const crystalRing = CRYSTAL_F.map((f) => ringOf(f))
  const crystalGeo = (() => {
    const b = Buf()
    const c = new THREE.Color(1, 1, 1)
    const top = vert(b, 0, 1, 0, c)
    const bot = vert(b, 0, -0.5, 0, c)
    const e = [vert(b, 0.5, 0, 0, c), vert(b, 0, 0, 0.5, c), vert(b, -0.5, 0, 0, c), vert(b, 0, 0, -0.5, c)]
    for (let k = 0; k < 4; k += 1) {
      const n = (k + 1) % 4
      b.i.push(top, e[k], e[n], bot, e[n], e[k])
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3))
    geo.setIndex(b.i)
    return geo
  })()
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
    roughness: 0.22,
    metalness: 0.15,
    envMap,
    envMapIntensity: 0.55,
  })
  const crystals = new THREE.InstancedMesh(crystalGeo, crystalMat, CRYSTAL_F.length)
  crystals.frustumCulled = false
  bodyRoot.add(crystals)
  const crystalLocal = []
  const qTmp = new THREE.Quaternion()
  const eTmp = new THREE.Euler()
  for (let k = 0; k < CRYSTAL_F.length; k += 1) {
    const r = crystalRing[k]
    sectionYZ(U[r], Math.PI / 2, sec, 0)
    const tilt = 0.12 * hash(k + 3)
    const yaw = (hash(k + 9) - 0.5) * 0.5
    eTmp.set(0, yaw, tilt, 'ZXY')
    qTmp.setFromEuler(eTmp)
    pTmp.set(0, sec[0] * 1.0, CRYSTAL_Z[k])
    sTmp.set(CRYSTAL_W[k], CRYSTAL_H[k], CRYSTAL_W[k])
    crystalLocal.push(new THREE.Matrix4().compose(pTmp, qTmp, sTmp))
    if (k === GOLD) instColor.setRGB(1.1, 0.78, 0.36)
    else instColor.setRGB(0.12 + 0.08 * hash(k), 0.42, 0.78)
    crystals.setColorAt(k, instColor)
  }
  crystals.instanceColor.needsUpdate = true

  // ---- freckles: star points across the flanks and the back -----------------
  const frRing = new Uint8Array(FRECKLES)
  const frY = new Float32Array(FRECKLES)
  const frZ = new Float32Array(FRECKLES)
  const frCol = new Float32Array(FRECKLES * 3)
  for (let k = 0; k < FRECKLES; k += 1) {
    const r = ringOf(0.05 + 0.87 * hash(k + 100))
    frRing[k] = r
    const phi = -0.25 + hash(k + 7) * Math.PI * 1.1 // upper half only, fading toward the belly
    sectionYZ(U[r], phi, sec, 0)
    frY[k] = sec[0] * 1.03
    frZ[k] = sec[1] * 1.03
    const sp = Math.sin(phi)
    const hdr = k % 9 === 0 && !lite
    const fade = 0.35 + 0.65 * smooth(-0.3, 0.3, sp)
    const v = hdr ? 2.4 : 0.9
    frCol[k * 3] = v * fade * (hdr ? 1 : 0.85)
    frCol[k * 3 + 1] = v * fade * (hdr ? 1.02 : 0.95)
    frCol[k * 3 + 2] = v * fade
  }
  const frPos = new Float32Array(FRECKLES * 3)
  const frPosAttr = new THREE.BufferAttribute(frPos, 3)
  const frGeo = new THREE.BufferGeometry()
  frGeo.setAttribute('position', frPosAttr)
  frGeo.setAttribute('color', new THREE.BufferAttribute(frCol, 3))
  const freckleCanvas = document.createElement('canvas')
  freckleCanvas.width = 32
  freckleCanvas.height = 32
  {
    const ctx = freckleCanvas.getContext('2d')
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.7)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 32, 32)
  }
  const freckleTex = new THREE.CanvasTexture(freckleCanvas)
  const freckleMat = new THREE.PointsMaterial({
    map: freckleTex,
    vertexColors: true,
    size: 0.07,
    sizeAttenuation: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const freckles = new THREE.Points(frGeo, freckleMat)
  freckles.frustumCulled = false
  bodyRoot.add(freckles)
  const tmpPoint = new Float32Array(3)
  function placeFreckles() {
    for (let k = 0; k < FRECKLES; k += 1) {
      ringPoint(frRing[k], frY[k], frZ[k], tmpPoint, 0)
      frPos[k * 3] = tmpPoint[0]
      frPos[k * 3 + 1] = tmpPoint[1]
      frPos[k * 3 + 2] = tmpPoint[2]
    }
    frPosAttr.needsUpdate = true
  }
  placeFreckles()

  // ---- the signature move: the spout, the mist, the crown of stars and three singing rings ----
  // all of it sits in the rig's own frame (bodyRoot), so it rolls and rises with the body.
  // every piece is a pool: instances and points are placed each frame from pure functions of time
  const blowRing = ringOf(BLOW_F)
  const blowSec = new Float32Array(2)
  sectionYZ(U[blowRing], Math.PI / 2, blowSec, 0) // the top of the crown, at rest
  const blowP = new Float64Array(3) // the blowhole, rig frame, this frame
  const perWidth = () => size.x / (holder.scale.x * group.scale.x) // rig units per creature width
  const SH_N = lite ? 48 : 96 // star shards
  const SETTLE_N = lite ? 12 : 24 // the shards that come down onto the back and glint there
  const MIST_N = lite ? 40 : 110
  const shardGeo = new THREE.OctahedronGeometry(1, 0)
  shardGeo.scale(0.4, 1.8, 0.4) // long and thin, like a splinter of ice
  const shardMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
  const shards = new THREE.InstancedMesh(shardGeo, shardMat, SH_N)
  shards.frustumCulled = false
  shards.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const shardCol = new THREE.Color()
  const zeroM = new THREE.Matrix4().makeScale(0, 0, 0)
  for (let k = 0; k < SH_N; k += 1) {
    if (k % 12 === 5) shardCol.setRGB(lite ? 1.1 : 2.2, lite ? 0.85 : 1.6, lite ? 0.5 : 0.8) // one gold in twelve
    else {
      // most shards stay under the bloom threshold, a few are HDR so they catch the light
      const b = lite || k % 4 !== 0 ? 1.0 : 1.45 + 0.1 * hash(k + 40)
      shardCol.setRGB(b * 0.9, b * 0.98, b * 1.08) // ice white, a little blue
    }
    shards.setColorAt(k, shardCol)
    shards.setMatrixAt(k, zeroM)
  }
  shards.instanceColor.needsUpdate = true
  bodyRoot.add(shards)
  // a soft glow behind each shard: additive points on a generated radial texture, HDR so desktop blooms
  const glowCanvas = document.createElement('canvas')
  glowCanvas.width = 64
  glowCanvas.height = 64
  {
    const ctx = glowCanvas.getContext('2d')
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.16, 'rgba(255,255,255,0.6)')
    g.addColorStop(0.45, 'rgba(255,255,255,0.14)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
  }
  const glowTex = new THREE.CanvasTexture(glowCanvas)
  const glowPos = new Float32Array(SH_N * 3)
  const glowCol = new Float32Array(SH_N * 3)
  const glowGeo = new THREE.BufferGeometry()
  glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPos, 3))
  glowGeo.setAttribute('color', new THREE.BufferAttribute(glowCol, 3))
  const glowMat = new THREE.PointsMaterial({
    map: glowTex,
    vertexColors: true,
    size: 0.2,
    sizeAttenuation: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const glow = new THREE.Points(glowGeo, glowMat)
  glow.frustumCulled = false
  bodyRoot.add(glow)
  // the shards that settle: where each one lands on the back (rig frame, at rest)
  const setRing = new Uint16Array(SETTLE_N)
  const setY = new Float32Array(SETTLE_N)
  const setZ = new Float32Array(SETTLE_N)
  const setSec = new Float32Array(2)
  for (let k = 0; k < SETTLE_N; k += 1) {
    const r = ringOf(0.28 + 0.42 * hash(k + 900))
    const phi = Math.PI / 2 + (hash(k + 910) - 0.5) * 1.2
    sectionYZ(U[r], phi, setSec, 0)
    setRing[k] = r
    setY[k] = setSec[0] + 0.012 // a hair above the skin
    setZ[k] = setSec[1]
  }
  // the mist: soft points at the base of the spout
  const mistPos = new Float32Array(MIST_N * 3)
  const mistGeo = new THREE.BufferGeometry()
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3))
  const mistCanvas = document.createElement('canvas')
  mistCanvas.width = 64
  mistCanvas.height = 64
  {
    const ctx = mistCanvas.getContext('2d')
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,0.9)')
    g.addColorStop(0.4, 'rgba(255,255,255,0.25)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
  }
  const mistTex = new THREE.CanvasTexture(mistCanvas)
  const mistMat = new THREE.PointsMaterial({
    map: mistTex,
    color: lite ? new THREE.Color(0.7, 0.8, 0.95) : new THREE.Color(1.0, 1.1, 1.3),
    size: 0.34,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const mist = new THREE.Points(mistGeo, mistMat)
  mist.frustumCulled = false
  bodyRoot.add(mist)
  // the three rings: flat, thin, spreading from the head as they fade
  // a soft annulus: a generated alpha texture on a flat disc, so each ring is a wave of light with soft edges
  const ringCanvas = document.createElement('canvas')
  ringCanvas.width = 128
  ringCanvas.height = 128
  {
    const ctx = ringCanvas.getContext('2d')
    const img = ctx.createImageData(128, 128)
    for (let y = 0; y < 128; y += 1) {
      for (let x = 0; x < 128; x += 1) {
        const r = Math.hypot((x + 0.5 - 64) / 64, (y + 0.5 - 64) / 64)
        const a = Math.exp(-(((r - 0.8) / 0.1) ** 2)) * (1 - smooth(0.92, 1, r))
        const o = (y * 128 + x) * 4
        img.data[o] = 255
        img.data[o + 1] = 255
        img.data[o + 2] = 255
        img.data[o + 3] = Math.round(255 * a)
      }
    }
    ctx.putImageData(img, 0, 0)
  }
  const ringTex = new THREE.CanvasTexture(ringCanvas)
  const ringGeo = new THREE.PlaneGeometry(2, 2)
  ringGeo.rotateX(Math.PI / 2) // lies flat, in the plane of the sky
  const ringList = []
  for (let i = 0; i < 3; i += 1) {
    const mat = new THREE.MeshBasicMaterial({
      map: ringTex,
      color: lite ? new THREE.Color(0.8, 0.9, 1.0) : new THREE.Color(1.2, 1.35, 1.6),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(ringGeo, mat)
    mesh.frustumCulled = false
    mesh.visible = false
    bodyRoot.add(mesh)
    ringList.push({ mesh, mat })
  }
  // the spout's own meshes: the body wrap must not bind to them, and the rig hide must not hide them
  const spoutMeshes = new Set([shards, mist, ...ringList.map((r) => r.mesh)])

  const spQ = new THREE.Quaternion()
  const spAxis = new THREE.Vector3(0, 1, 0)
  const spP = new THREE.Vector3()
  const spS = new THREE.Vector3()
  const spM = new THREE.Matrix4()
  const surf = new Float64Array(3)
  let moveT0 = -1 // the clock time the move began, -1 when idle
  let pendingAct = false // act() was called: the move starts at the next update
  let clockNow = 0

  // the move's pose terms, at its time m (seconds into the move), and the room it has
  function updateMove(time, dt, motion) {
    if (pendingAct) {
      pendingAct = false
      moveT0 = time
    }
    const m = moveT0 < 0 ? -1 : time - moveT0
    if (m < 0 || m >= MOVE_LEN) {
      moveT0 = -1
      mArch = 0
      mRoll = 0
      mFinSweep = 0
      mBeat = 0
      return
    }
    // the move keeps to the band: on a narrow band (a phone) the arch, roll and spout are smaller
    mUp = motion && motion.roomUp !== undefined ? motion.roomUp : 1.5
    mDown = motion && motion.roomDown !== undefined ? motion.roomDown : 1.5
    mRoom += (clamp((mUp - 0.35) / 0.7, 0, 1) - mRoom) * Math.min(1, dt * 4)
    const env = smooth(0, 0.8, m) * (1 - smooth(4.4, MOVE_LEN, m))
    mArch = env * (0.08 + 0.2 * mRoom)
    mRoll = ROLL_MAX * (0.3 + 0.7 * mRoom) * smooth(0.5, 2.1, m) * (1 - smooth(2.7, 4.9, m))
    mFinSweep = smooth(1.5, 2.6, m) * (1 - smooth(4.0, 4.9, m))
    mBeat = Math.exp(-(((m - 3.5) / 0.3) ** 2))
  }

  // the spout, mist and rings, placed for this frame (after the spine is placed)
  function placeMove(time) {
    const m = moveT0 < 0 ? -1 : time - moveT0
    const uw = perWidth()
    ringPoint(blowRing, blowSec[0], 0, blowP, 0)
    const mr = mRoom
    // the screen centre (the group's origin) in rig units: the band is measured from it
    const yc = (frameY - holder.position.y) / holder.scale.y
    // apex height above the blowhole, in widths: short and wide on a phone, and never past the header line
    const blowW = (blowP[1] - yc) / uw
    // the margin covers the perspective: the crown is nearer the camera than the body's middle, so its
    // spout reads higher on the screen than its rig height says
    const H = Math.min(0.08 + 0.62 * mr, Math.max(0.03, 0.8 * (mUp - blowW - 0.2)))
    const L = 0.7 + 0.35 * (1 - mr) // how far the crown opens sideways, in widths
    const spread = 0.8 + 0.4 * mr
    const shardRGB = shards.instanceColor.array
    const flatZ = 0.35 + 0.65 * mr // the rings and crown flatten on a narrow band
    // star shards: each leaves the blowhole, opens like a crown and falls back under gravity
    for (let k = 0; k < SH_N; k += 1) {
      const birth = SPOUT_T0 + 1.3 * (k / SH_N) + 0.15 * hash(k + 1)
      const a0 = m - birth
      const life = 2.3 + 0.6 * hash(k + 2)
      if (m < 0 || a0 < 0 || a0 > life) {
        shards.setMatrixAt(k, zeroM)
        glowCol[k * 3] = 0
        glowCol[k * 3 + 1] = 0
        glowCol[k * 3 + 2] = 0
        continue
      }
      const v0 = Math.sqrt(2 * GRAV * H * (0.75 + 0.5 * hash(k + 3))) // widths per second, upward
      const th = TAU * hash(k + 4)
      const cLat = L * spread * (0.4 + 0.6 * hash(k + 5))
      const settle = k < SETTLE_N
      // a settler stops where it meets the back: the height where its ballistic path meets the skin
      let a = a0
      let landed = false
      if (settle) {
        ringPoint(setRing[k], setY[k], setZ[k], surf, 0)
        const hW = (surf[1] - blowP[1]) / uw
        const disc = v0 * v0 - 2 * GRAV * hW
        if (disc >= 0) {
          const aLand = (v0 + Math.sqrt(disc)) / GRAV
          if (a0 > aLand) {
            a = aLand
            landed = true
          }
        }
      }
      const lat = cLat * (1 - Math.exp(-2.4 * a))
      const ox = Math.cos(th) * lat
      const oz = Math.sin(th) * lat * flatZ
      const oy = v0 * a - 0.5 * GRAV * a * a
      // a shard that would leave the band (above the header or below the caption) goes out before it does
      const yw = (blowP[1] + oy * uw - yc) / uw
      const inside = (1 - smooth(mUp - 0.22, mUp - 0.1, yw)) * (1 - smooth(-mDown + 0.12, -mDown + 0.04, yw))
      const fade = smooth(0, 0.12, a0) * (1 - smooth(life - 0.7, life, a0)) * inside
      const glint = landed ? 0.5 + 0.5 * Math.sin(a0 * 13 + k) : 0
      const base = (0.01 + 0.007 * hash(k + 6)) * uw * (k % 12 === 5 ? 1.25 : 1)
      const sz = base * fade * (1 + 0.6 * glint)
      spP.set(blowP[0] + ox * uw, blowP[1] + oy * uw, blowP[2] + oz * uw)
      spS.setScalar(sz)
      spQ.setFromAxisAngle(spAxis, th + 2.5 * a0)
      spM.compose(spP, spQ, spS)
      shards.setMatrixAt(k, spM)
      // the glow follows the shard: a warm, bright halo that fades with it
      const gl = fade * (1 + 0.8 * glint) * (lite ? 0.8 : 1.6)
      glowPos[k * 3] = spP.x
      glowPos[k * 3 + 1] = spP.y
      glowPos[k * 3 + 2] = spP.z
      glowCol[k * 3] = shardRGB[k * 3] * gl
      glowCol[k * 3 + 1] = shardRGB[k * 3 + 1] * gl
      glowCol[k * 3 + 2] = shardRGB[k * 3 + 2] * gl
    }
    shards.instanceMatrix.needsUpdate = true
    glowGeo.attributes.position.needsUpdate = true
    glowGeo.attributes.color.needsUpdate = true
    // mist: rises slowly from the base of the spout and spreads, then goes out
    mistMat.opacity = m < 0 ? 0 : 0.6 * smooth(0.9, 1.5, m) * (1 - smooth(3.2, 4.4, m))
    for (let k = 0; k < MIST_N; k += 1) {
      const a = m - (1.0 + 2.2 * hash(k + 20))
      if (m < 0 || a < 0 || a > 2.6) {
        mistPos[k * 3] = blowP[0]
        mistPos[k * 3 + 1] = blowP[1] - 40 // parked far below the frame until it is born
        mistPos[k * 3 + 2] = blowP[2]
        continue
      }
      const th = TAU * hash(k + 21)
      const r = (0.05 + 0.3 * a) * spread * (0.4 + 0.6 * hash(k + 22)) * uw
      const rise = (0.05 + 0.25 * a) * (0.6 + 0.4 * hash(k + 23))
      const my = (blowP[1] - yc) / uw + rise
      if (my > mUp - 0.2 || my < -mDown + 0.12) {
        mistPos[k * 3] = blowP[0]
        mistPos[k * 3 + 1] = blowP[1] - 40 // out of the band: parked out of the frame
        mistPos[k * 3 + 2] = blowP[2]
        continue
      }
      mistPos[k * 3] = blowP[0] + Math.cos(th) * r
      mistPos[k * 3 + 1] = blowP[1] + rise * uw
      mistPos[k * 3 + 2] = blowP[2] + Math.sin(th) * r * flatZ
    }
    mistGeo.attributes.position.needsUpdate = true
    // rings: one after another as the fountain peaks, thin and slow, fading as they grow
    for (let i = 0; i < 3; i += 1) {
      const { mesh, mat } = ringList[i]
      const a = m - (RING_T0 + 0.45 * i)
      if (m < 0 || a < 0 || a > RING_LIFE) {
        mesh.visible = false
        continue
      }
      mesh.visible = true
      const t = a / RING_LIFE
      // the band: a ring may not grow its far edge past the room above the crown; on a phone it spreads sideways
      const capW = Math.max(0.04, (mUp - blowW - 0.12) / 0.6)
      const R = Math.min(0.1 + 0.42 * a, capW) * spread * uw
      const sx = 1 + 1.6 * (1 - mr)
      mesh.position.set(blowP[0], blowP[1] + 0.02 * uw * a, blowP[2])
      mesh.scale.set(R * sx, 1, R * flatZ)
      mat.opacity = 0.75 * (1 - t) ** 1.6 * smooth(0, 0.12, t)
    }
  }
  // at rest every shard is a zero matrix, every ring is hidden and the mist has no opacity

  // no shadows on anything the creature makes
  group.traverse((child) => {
    if (child.isMesh || child.isPoints || child.isInstancedMesh) {
      child.castShadow = false
      child.receiveShadow = false
    }
  })

  // ---- hero pose: body pitched gently up, then fit: centred, largest dimension 2
  holder.rotation.z = 0.08
  group.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(group)
  const centreZ = box.getCenter(new THREE.Vector3()).z
  // the silhouette from the front: every mesh and point vertex projected onto the XY plane,
  // so the box follows what the camera sees rather than the loose 3D bounds
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const vtx = new THREE.Vector3()
  group.traverse((child) => {
    const attr = child.geometry && child.geometry.attributes.position
    // instanced meshes are skipped: their base geometry is unit-sized at the origin, not where they sit
    if (!attr || child.isInstancedMesh || !(child.isMesh || child.isPoints)) return
    for (let k = 0; k < attr.count; k += 1) {
      vtx.fromBufferAttribute(attr, k).applyMatrix4(child.matrixWorld)
      if (vtx.x < minX) minX = vtx.x
      if (vtx.x > maxX) maxX = vtx.x
      if (vtx.y < minY) minY = vtx.y
      if (vtx.y > maxY) maxY = vtx.y
    }
  })
  const rawX = (maxX - minX) * 1.05
  const rawY = (maxY - minY) * 1.1
  const fit = 2 / Math.max(rawX, rawY)
  holder.scale.setScalar(fit)
  holder.position.set(-((minX + maxX) / 2) * fit, -((minY + maxY) / 2) * fit, -centreZ * fit)
  const size = { x: rawX * fit, y: rawY * fit }

  // ---- the rig's pose at a time: pure in time, no springs in here ------------
  let sculptOn = false
  let disposed = false
  function setPose(time, e) {
    placeSpine(time, e)
    if (!sculptOn) bodyGeo.computeVertexNormals() // the wrapped sculpt is flat-shaded: no rig normals needed
    placeFreckles()
    for (let k = 0; k < CRYSTAL_F.length; k += 1) {
      mTmp.multiplyMatrices(frames[crystalRing[k]].matrix, crystalLocal[k])
      crystals.setMatrixAt(k, mTmp)
    }
    crystals.instanceMatrix.needsUpdate = true
    for (let k = 0; k < TUB_N; k += 1) {
      mTmp.multiplyMatrices(frames[tubRing[k]].matrix, tubLocal[k])
      tubs.setMatrixAt(k, mTmp)
    }
    tubs.instanceMatrix.needsUpdate = true
    for (let k = 0; k < fins.length; k += 1) fins[k].update(time, e)
    for (let k = 0; k < flukeUpdates.length; k += 1) flukeUpdates[k](time, e)
    placeMove(time)
  }

  // ---- springs: fed by the creature's own motion; clamped, deterministic -------
  const tailX = new Float64Array(TAIL_NODES)
  const tailV = new Float64Array(TAIL_NODES)
  const tailQ = new Float32Array(NR)
  for (let i = 0; i < NR; i += 1) tailQ[i] = clamp((U[i] - TAIL_FROM) / (1 - TAIL_FROM), 0, 1)
  function resetSprings() {
    finX.fill(0)
    finV.fill(0)
    flukeX.fill(0)
    flukeV.fill(0)
    tailX.fill(0)
    tailV.fill(0)
    tailZ.fill(0)
  }
  function stepSprings(time, dt, motion) {
    const vx = clamp(motion ? motion.vx || 0 : 0, -3, 3)
    const vy = clamp(motion ? motion.vy || 0 : 0, -3, 3)
    const spin = clamp(motion ? motion.spin || 0 : 0, -8, 8)
    const h = clamp(dt, 0, 0.05)
    if (h > 0) {
      // pectoral fins: lag up and down with the rise and fall, and the turn throws them outward
      for (let s = 0; s < 2; s += 1) {
        const side = s === 0 ? 1 : -1
        stepChain(finX, finV, s * FIN_NODES, FIN_NODES, clamp(0.2 * vy + 0.15 * spin * side, -2, 2), 20, time, h, 0.5, s)
      }
      // flukes: the same, flapping with the lift, and the turn pushes one lobe ahead of the other
      for (let s = 0; s < 2; s += 1) {
        const sgn = s === 0 ? 1 : -1
        stepChain(flukeX, flukeV, s * FLUKE_NODES, FLUKE_NODES, clamp(0.15 * vy + 0.12 * spin * sgn, -2, 2), 20, time, h, 0.5, 2 + s)
      }
      // tail stock: sways sideways and trails the turn, the tip last
      stepChain(tailX, tailV, 0, TAIL_NODES, clamp(-0.12 * spin, -2, 2), 12, time, h, 0.25, 4)
    }
    for (let i = 0; i < NR; i += 1) tailZ[i] = tailQ[i] > 0 ? 0.8 * nodeAt(tailX, 0, TAIL_NODES, tailQ[i]) : 0
  }

  // ---- the sculpt: download, pose the rig, wrap, seat the eyes, swap ----------
  let sculptWrap = null
  let sculptMesh = null
  let sculptMat = null
  let sculptGeo = null
  let sculptTex = []
  let sculptStats = null
  // hands the thread back to the page for a moment, so scrolling and frames are not held up
  const nextTurn = () => new Promise((resolve) => setTimeout(resolve, 0))
  const bindSculpt = async () => {
    const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/loaders/DRACOLoader.js'),
    ])
    const draco = new DRACOLoader()
    draco.setDecoderPath('/draco/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(draco)
    let gltf = null
    try {
      gltf = await loader.loadAsync(lite ? MODEL_URL_LITE : MODEL_URL)
    } finally {
      // the decoder is freed on every exit, a failed download included
      draco.dispose()
    }
    // one cleanup for every early exit: the loaded scene's geometry, materials and textures
    const freeScene = () => {
      gltf.scene.traverse((c) => {
        c.geometry?.dispose()
        for (const mt of [].concat(c.material || [])) {
          for (const key in mt) if (mt[key] && mt[key].isTexture) mt[key].dispose()
          mt.dispose()
        }
      })
    }
    if (disposed) {
      freeScene()
      return
    }
    gltf.scene.updateMatrixWorld(true)
    let src = null
    let geo = null
    gltf.scene.traverse((c) => {
      if (!c.isMesh || src) return
      src = c
      geo = c.geometry.clone()
      geo.applyMatrix4(c.matrixWorld)
    })
    if (!src) throw new Error('whale sculpt has no mesh')

    // the rig at the picture's pose (springs at rest), so the wrap binds to the same shape
    resetSprings()
    setPose(PICTURE.t, 0)
    const wrap = createSculptWrap(THREE, {
      sculpt: geo,
      group,
      yaw: PICTURE.yaw,
      pitch: PICTURE.pitch,
      // instanced rig pieces (the tiny crystal shards and tubercles) are not bind sources: a sculpt
      // vertex that lands near a standing shard is pulled up into a blade, so the sculpt binds to the fins and body only.
      // the move's spout pieces are not body either
      exclude: (mesh) => mesh.material === eyeMat || mesh.isInstancedMesh || spoutMeshes.has(mesh),
      depth: 'auto',
    })
    // the fit runs in turns of SLICE_MS, so the page never waits on it for long. The rig is read at the
    // picture's pose in the first turn, before the rig moves on (the grid is a snapshot of it)
    const job = wrap.fitSteps()
    let finished = false
    let sliceMaxMs = 0
    let sliceCount = 0
    while (!finished) {
      const t0 = performance.now()
      finished = job.step(SLICE_MS)
      sliceMaxMs = Math.max(sliceMaxMs, performance.now() - t0)
      sliceCount += 1
      if (!finished) {
        await nextTurn()
        if (disposed) {
          wrap.dispose()
          geo.dispose()
          freeScene()
          return
        }
      }
    }
    const stats = wrap.stats
    const postT0 = performance.now()
    // the longest stretch of synchronous work after the fit (the waits between turns are not counted)
    const probe = (() => {
      let last = performance.now()
      let max = 0
      return {
        tick() {
          const now = performance.now()
          max = Math.max(max, now - last)
          last = now
        },
        reset() {
          last = performance.now()
        },
        get max() {
          return max
        },
      }
    })()

    // the sculpt's own triangles, as they stand at the picture's pose: the rig is still at rest here
    const aligned = Float32Array.from(geo.attributes.position.array)
    wrap.update()
    const bound = geo.attributes.position.array
    // a sculpt triangle whose corners were bound to far-apart parts of the rig is torn: its edges grow
    // many times over. Such triangles are dropped (the vertices stay, so the wrap is unchanged)
    const keep = []
    const edgeGrow = (a, b) => {
      const la = Math.hypot(aligned[3 * a] - aligned[3 * b], aligned[3 * a + 1] - aligned[3 * b + 1], aligned[3 * a + 2] - aligned[3 * b + 2])
      const lb = Math.hypot(bound[3 * a] - bound[3 * b], bound[3 * a + 1] - bound[3 * b + 1], bound[3 * a + 2] - bound[3 * b + 2])
      return la > 1e-6 ? lb / la : 1
    }
    const srcIdx = geo.index ? geo.index.array : null
    const triCount = srcIdx ? srcIdx.length / 3 : bound.length / 9
    let dropped = 0
    const TRI_CHUNK = 1500 // triangles per turn: the cull is sliced like the fit
    for (let t0 = 0; t0 < triCount; t0 += TRI_CHUNK) {
      const t1 = Math.min(triCount, t0 + TRI_CHUNK)
      for (let t = t0; t < t1; t += 1) {
        const a = srcIdx ? srcIdx[3 * t] : 3 * t
        const b = srcIdx ? srcIdx[3 * t + 1] : 3 * t + 1
        const c = srcIdx ? srcIdx[3 * t + 2] : 3 * t + 2
        if (Math.max(edgeGrow(a, b), edgeGrow(b, c), edgeGrow(c, a)) > STRETCH_MAX) {
          dropped += 1
          continue
        }
        keep.push(a, b, c)
      }
      probe.tick()
      if (t1 < triCount) {
        await nextTurn()
        probe.reset()
        if (disposed) {
          wrap.dispose()
          geo.dispose()
          freeScene()
          return
        }
      }
    }
    probe.tick()
    geo.setIndex(keep)
    probe.tick()

    // the baked hide, the dragon's recipe: flat-shaded, normal map, AO, roughness, clearcoat on desktop
    const m = src.material
    const mat = new THREE.MeshPhysicalMaterial({
      color: m.map ? 0xffffff : 0x1b2a66,
      map: m.map || null,
      aoMap: m.aoMap || null,
      aoMapIntensity: 1,
      roughnessMap: m.roughnessMap || null,
      roughness: 1,
      metalness: 0.05,
      normalMap: m.normalMap || null,
      flatShading: true,
      side: THREE.DoubleSide,
      envMap,
      envMapIntensity: lite ? 0.45 : 0.5,
    })
    if (m.normalMap) mat.normalScale.copy(m.normalScale)
    // the baked albedo is near white: the back takes midnight navy, the belly stays pale
    // (a tint by height on the rig's up axis, so no vertex colours or normals are needed)
    mat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nvarying float vBackY;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\n  vBackY = position.y;')
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying float vBackY;')
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
  float backT = smoothstep(-0.04, 0.12, vBackY);
  float lumT = dot(diffuseColor.rgb, vec3(0.333));
  diffuseColor.rgb = mix(vec3(0.6, 0.68, 0.84), vec3(0.13, 0.18, 0.38), backT) * max(lumT / 0.85, 0.6);`,
        )
    }
    if (!lite) {
      mat.clearcoat = 0.3
      mat.clearcoatRoughness = 0.4
      mat.iridescence = 0.2
      mat.iridescenceIOR = 1.3
      mat.iridescenceThicknessRange = [140, 400]
    }
    sculptTex = [m.map, m.aoMap, m.roughnessMap, m.normalMap].filter(Boolean)

    // frame the creature on the rig and the sculpt together, so nothing is cut at the edges
    let sx0 = Infinity
    let sx1 = -Infinity
    let sy0 = Infinity
    let sy1 = -Infinity
    for (let k = 0; k < keep.length; k += 1) {
      const v = keep[k]
      const px = bound[3 * v]
      const py = bound[3 * v + 1]
      if (px < sx0) sx0 = px
      if (px > sx1) sx1 = px
      if (py < sy0) sy0 = py
      if (py > sy1) sy1 = py
    }
    // the rig's box in group units (the holder maps unit space by fit and its position); the bindings
    // are kept in group units, so only the group's own scale and position change here
    const hp = holder.position
    const ux0 = Math.min(hp.x + fit * minX, sx0)
    const ux1 = Math.max(hp.x + fit * maxX, sx1)
    const uy0 = Math.min(hp.y + fit * minY, sy0)
    const uy1 = Math.max(hp.y + fit * maxY, sy1)
    const fw = (ux1 - ux0) * 1.05
    const fh = (uy1 - uy0) * 1.1
    const kf = 2 / Math.max(fw, fh)
    frameY = (uy0 + uy1) / 2
    group.scale.setScalar(kf)
    group.position.set(-((ux0 + ux1) / 2) * kf, -((uy0 + uy1) / 2) * kf, 0)
    size.x = fw * kf
    size.y = fh * kf
    group.updateMatrixWorld(true)

    // the eyes: seat each one on the nearest sculpt point, and move its geometry there
    group.updateMatrixWorld(true)
    const toGroup = new THREE.Matrix4().copy(group.matrixWorld).invert()
    const pos = geo.attributes.position.array
    const N = geo.attributes.position.count
    const eyeFrame = frames[eyeRing]
    eyeFrame.updateMatrixWorld(true)
    const toFrame = new THREE.Matrix4().copy(eyeFrame.matrixWorld).invert()
    const fromGroup = new THREE.Matrix4().copy(group.matrixWorld)
    const ep = eyeGeo.attributes.position.array
    for (let side = 0; side < 2; side += 1) {
      const [ey, ez] = eyeLocal[side]
      const c = new THREE.Vector3(0, ey, ez).applyMatrix4(eyeFrame.matrixWorld).applyMatrix4(toGroup)
      let best = 0
      let bd = Infinity
      for (let k = 0; k < N; k += 1) {
        const dx = pos[3 * k] - c.x
        const dy = pos[3 * k + 1] - c.y
        const dz = pos[3 * k + 2] - c.z
        const d = dx * dx + dy * dy + dz * dz
        if (d < bd) {
          bd = d
          best = k
        }
      }
      const t = new THREE.Vector3(pos[3 * best], pos[3 * best + 1], pos[3 * best + 2]).applyMatrix4(fromGroup).applyMatrix4(toFrame)
      // the eye's own centre is (0, ey, ez) in its frame: shift its vertices by the difference
      const ox = t.x
      const oy = t.y - ey
      const oz = t.z - ez
      const from = side === 0 ? 0 : eyeSplit
      const to = side === 0 ? eyeSplit : ep.length / 3
      for (let v = from; v < to; v += 1) {
        ep[3 * v] += ox
        ep[3 * v + 1] += oy
        ep[3 * v + 2] += oz
      }
    }
    eyeGeo.attributes.position.needsUpdate = true
    probe.tick()

    // the rig's body is hidden; the glowing eyes and the star freckles stay
    // the crystals stay: they sit on the spine as rig pieces, the sculpt's own surface carries the rest
    group.traverse((child) => {
      if ((child.isMesh || child.isInstancedMesh) && child.material !== eyeMat && child !== crystals && !spoutMeshes.has(child)) {
        child.visible = false
      }
    })
    sculptMesh = new THREE.Mesh(geo, mat)
    sculptMesh.frustumCulled = false
    sculptMesh.castShadow = false
    sculptMesh.receiveShadow = false
    group.add(sculptMesh)
    sculptGeo = geo
    sculptMat = mat
    sculptWrap = wrap
    sculptStats = {
      ...stats,
      sliceCount,
      sliceMaxMs: Number(sliceMaxMs.toFixed(2)),
      postMaxBlockMs: Number(probe.max.toFixed(2)),
      postWallMs: Number((performance.now() - postT0).toFixed(2)),
    }
    sculptOn = true
  }
  const ready = bindSculpt().catch((err) => {
    console.warn('whale sculpt not shown, the code-built whale stays:', err)
  })

  return {
    group,
    size,
    ready,
    get sculptStats() {
      return sculptStats
    },
    update(time, dt, energy, motion) {
      const e = clamp(energy, 0, 1)
      clockNow = time
      stepSprings(time, dt, motion)
      updateMove(time, dt, motion)
      setPose(time, e)
      if (sculptOn) sculptWrap.update()
    },
    // the signature move: starts at the next update, unless one is already playing
    act() {
      if (moveT0 < 0) pendingAct = true
    },
    dispose() {
      disposed = true
      sculptWrap?.dispose()
      sculptMesh?.geometry.dispose()
      sculptMat?.dispose()
      sculptTex.forEach((t) => t.dispose())
      bodyGeo.dispose()
      skin.dispose()
      finSkin.dispose()
      bodyTex.dispose()
      finTex.dispose()
      for (let k = 0; k < fins.length; k += 1) fins[k].f.geo.dispose()
      for (let k = 0; k < flukeFoils.length; k += 1) flukeFoils[k].geo.dispose()
      tubGeo.dispose()
      tubMat.dispose()
      tubs.dispose()
      crystalGeo.dispose()
      crystalMat.dispose()
      crystals.dispose()
      frGeo.dispose()
      freckleMat.dispose()
      freckleTex.dispose()
      eyeMat.dispose()
      shardGeo.dispose()
      shardMat.dispose()
      shards.dispose()
      mistGeo.dispose()
      mistMat.dispose()
      mistTex.dispose()
      ringGeo.dispose()
      ringTex.dispose()
      for (const r of ringList) r.mat.dispose()
      glowGeo.dispose()
      glowMat.dispose()
      glowTex.dispose()
      group.traverse((child) => {
        if (child.geometry) child.geometry.dispose()
      })
    },
  }
}
