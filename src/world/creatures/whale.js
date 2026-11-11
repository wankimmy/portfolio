/**
 * The sky whale: an enormous, slow humpback that swims through the night sky with
 * the traveller's quest log on its back. Self-contained: THREE is passed in and
 * nothing is imported.
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

const TAU = Math.PI * 2
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
// the snout rounds off to a blunt, rounded rostrum (no flat disc); the tail stock tapers
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

  function placeSpine(time, e) {
    const w = (TAU / PERIOD) * (1 + 1.1 * e)
    const amp = 1 + 0.8 * e
    for (let i = 0; i < NR; i += 1) DY[i] = AMP[i] * amp * Math.sin(w * time - K_WAVE * U[i])
    for (let i = 0; i < NR; i += 1) {
      const a = Math.max(0, i - 1)
      const b = Math.min(NR - 1, i + 1)
      const slope = (DY[b] - DY[a]) / (X[b] - X[a])
      const th = TH_REST[i] + Math.atan(slope)
      const ro = 0.05 * (1 + 0.5 * e) * Math.sin(0.55 * w * time - 1.1 * U[i])
      const cx = X[i]
      const cy = YC[i] + DY[i]
      CUR_TH[i] = th
      CUR_RO[i] = ro
      CUR_CX[i] = cx
      CUR_CY[i] = cy
      frames[i].position.set(cx, cy, 0)
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
        bodyPos[k * 3 + 2] = Zr
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
    out[o + 2] = Zr
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
  function buildFin(side, phase) {
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
        const flex = amp * q ** 1.3 * Math.sin(w * time + phase - 2.6 * q)
        const len = FIN_LEN * q
        const sweep = 0.06 * q * q
        f.P[s * 3] = root[0] + D[0] * len + f.N[s * 3] * flex + f.C[s * 3] * sweep
        f.P[s * 3 + 1] = root[1] + D[1] * len + f.N[s * 3 + 1] * flex + f.C[s * 3 + 1] * sweep
        f.P[s * 3 + 2] = root[2] + D[2] * len + f.N[s * 3 + 2] * flex + f.C[s * 3 + 2] * sweep
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
        const alpha = FLUKE_REST + amp * Math.sin(w * time - 2.2 - 1.0 * q) * q * 0.75
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
  {
    const b = Buf()
    const iris = new THREE.Color(0.02, 0.035, 0.09)
    const glint = lite ? new THREE.Color(1.5, 1.5, 1.6) : new THREE.Color(1.8, 1.84, 2.0)
    for (let side = 0; side < 2; side += 1) {
      const sgn = side === 0 ? 1 : -1
      const phi = side === 0 ? -0.22 : Math.PI + 0.22 // low on the side, behind the mouth corner
      sectionYZ(U[eyeRing], phi, sec, 0)
      const ey = sec[0]
      const ez = sec[1] * 0.99
      addSphere(b, 0, ey, ez + sgn * 0.004, 0.03, iris, 12, 8) // the dark iris, sunk in the skin
      addSphere(b, 0, ey + 0.008, ez + sgn * 0.024, 0.006, glint, 6, 4) // one small glint
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(b.c, 3))
    geo.setIndex(b.i)
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

  return {
    group,
    size,
    update(time, dt, energy) {
      const e = clamp(energy, 0, 1)
      placeSpine(time, e)
      bodyGeo.computeVertexNormals()
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
    },
    dispose() {
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
      group.traverse((child) => {
        if (child.geometry) child.geometry.dispose()
      })
    },
  }
}
