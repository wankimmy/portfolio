/**
 * The brain drawn as a glassy 3D mesh: two cerebral hemispheres with the longitudinal fissure
 * between them, a temporal lobe under the Sylvian fissure, a two-lobed cerebellum with folia
 * and a brain stem with the pons. The macro shape is built here from BRAIN and cerebrumReach;
 * the folds (sulci) are a noise pattern in the shader, so they stay sharp at any zoom.
 */
import { BRAIN, cerebrumReach } from './graphForce.js'

const NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
// the fold field: a warped noise whose zero lines wind like sulci (p in brain units)
float folds(vec3 p) {
  float w = snoise(p * 0.7 + 3.1);
  return snoise(p * 1.85 + vec3(0.55, -0.4, 0.3) * w);
}
`

const VERT = /* glsl */ `
attribute vec3 aTint;
attribute float aKind;
uniform float uScale;
varying vec3 vTint;
varying vec3 vN;
varying vec3 vV;
varying vec3 vP;
varying float vKind;
${NOISE}
void main() {
  vec3 p = position / uScale;
  vec3 pos = position;
  if (aKind < 0.5) {
    // carve the sulci into the surface, so the outline is bumpy like a real brain
    float groove = 1.0 - smoothstep(0.0, 0.32, abs(folds(p)));
    pos -= normal * groove * 0.055 * uScale;
  }
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vTint = aTint;
  vN = normalize(normalMatrix * normal);
  vV = -mv.xyz;
  vP = p;
  vKind = aKind;
  gl_Position = projectionMatrix * mv;
}
`

const FRAG = /* glsl */ `
uniform vec3 uCereb;
varying vec3 vTint;
varying vec3 vN;
varying vec3 vV;
varying vec3 vP;
varying float vKind;
${NOISE}
void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(vV);
  float facing = abs(dot(N, V));
  float rim = pow(1.0 - facing, 2.4);
  float lam = max(dot(N, normalize(vec3(-0.35, 0.75, 0.55))), 0.0);
  // the folds glow: a thin hot core with a soft halo round it, like light running along the sulci
  float core = 0.0;
  float halo = 0.0;
  if (vKind < 0.5) {
    float n = abs(folds(vP));
    float aa = fwidth(n);
    core = 1.0 - smoothstep(0.008, 0.03 + aa * 1.5, n);
    halo = 1.0 - smoothstep(0.0, 0.16, n);
  } else if (vKind < 1.5) {
    // folia: fine curved stripes wrapping the cerebellum
    vec3 q = vP - uCereb;
    float f = sin((q.y - 0.22 * q.x * q.x) * 21.0);
    float aa = fwidth(f);
    core = smoothstep(0.8 - aa, 0.98, f);
    halo = smoothstep(0.2, 0.98, f);
  }
  float body = 0.04 + 0.1 * lam + 0.7 * rim + (vKind > 1.5 ? 0.14 : 0.0);
  float shine = (0.35 + 0.65 * facing) * (0.55 + 0.45 * lam);
  vec3 hot = mix(vTint, vec3(1.0), 0.55);
  vec3 col = vTint * (body + 0.22 * halo * shine) + hot * core * 0.75 * shine;
  gl_FragColor = vec4(col, 1.0);
}
`

const softplus = (v, k) => Math.log1p(Math.exp(v * k)) / k

const HOLO = [0.3, 0.86, 1.0] // the hologram's cyan
const HOLO_BACK = [0.42, 0.5, 1.0] // and the blue-violet it fades to at the back

// stardust on the surface: soft round motes that twinkle, cyan with a few violet ones
const DUST_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uDpr;
varying float vSeed;
varying float vTw;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vSeed = aSeed;
  vTw = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(uTime * (0.8 + 2.2 * fract(aSeed * 7.3)) + aSeed * 40.0), 3.0);
  gl_PointSize = (1.8 + 4.6 * fract(aSeed * 13.7) * fract(aSeed * 13.7)) * uDpr * (30.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`
const DUST_FRAG = /* glsl */ `
varying float vSeed;
varying float vTw;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  vec3 c = fract(vSeed * 3.1) > 0.82 ? vec3(0.75, 0.55, 1.0) : vec3(0.55, 0.95, 1.0);
  gl_FragColor = vec4(c * a * vTw * 1.8, 1.0);
}
`

// the glow round the outline: the same mesh pushed out a little, its back faces lit only at the rim
const HALO_VERT = /* glsl */ `
uniform float uScale;
varying vec3 vN;
varying vec3 vV;
void main() {
  vec4 mv = modelViewMatrix * vec4(position + normal * 0.16 * uScale, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`
const HALO_FRAG = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
void main() {
  float f = abs(dot(normalize(vN), normalize(vV)));
  float i = pow(clamp(0.7 - f, 0.0, 1.0), 2.2);
  gl_FragColor = vec4(vec3(0.25, 0.7, 1.0) * i * 0.55, 1.0);
}
`

/**
 * @param THREE the three.js module
 * @param {object} o
 * @param {number} o.scale simulation units to world units
 * @param {(x:number,y:number,z:number)=>string|null} o.regionAt region key for a cerebrum point
 * @param {Record<string, number[]>} o.rgb region key to [r, g, b]
 * @param {boolean} o.lite fewer vertices (phones)
 */
export function buildBrainShell(THREE, { scale, regionAt, rgb, lite }) {
  const pos = []
  const tint = []
  const kind = []
  const keys = []
  const index = []
  const seams = [] // [first, last] vertex of each grid row, welded after the normals

  /** A sphere grid mapped through fn(ux, uy, uz) -> [x, y, z] in brain units. */
  const addGrid = (w, h, fn, kindVal, keyOf) => {
    const base = pos.length / 3
    for (let j = 0; j <= h; j += 1) {
      const phi = (j / h) * Math.PI
      for (let i = 0; i <= w; i += 1) {
        const th = (i / w) * Math.PI * 2
        const ux = Math.sin(phi) * Math.cos(th)
        const uy = Math.cos(phi)
        const uz = Math.sin(phi) * Math.sin(th)
        const [x, y, z] = fn(ux, uy, uz)
        pos.push(x * scale, y * scale, z * scale)
        const key = keyOf(x, y, z)
        keys.push(key)
        // one hologram hue: cyan at the face shading to blue-violet at the back, a faint hint of the region
        const c = rgb[key] ?? HOLO
        const b = Math.min(1, Math.max(0, (x + 4.6) / 9.2))
        for (let a = 0; a < 3; a += 1) tint.push((HOLO[a] + (HOLO_BACK[a] - HOLO[a]) * b) * 0.88 + c[a] * 0.12)
        kind.push(kindVal)
      }
      seams.push([base + j * (w + 1), base + j * (w + 1) + w, j === 0 || j === h])
    }
    for (let j = 0; j < h; j += 1) {
      for (let i = 0; i < w; i += 1) {
        const a = base + j * (w + 1) + i
        const b = a + w + 1
        index.push(a, a + 1, b, b, a + 1, b + 1)
      }
    }
  }

  const C = BRAIN.cerebrum
  const B = BRAIN.cerebellum
  const S = BRAIN.stem

  // the two hemispheres: the full shape, with each half pressed flat against the midline
  const GAP = 0.08
  const hemisphere = (sg) => (ux, uy, uz) => {
    const s = cerebrumReach(ux, uy, uz)
    const z = C.c[2] + uz * C.r[2] * s
    return [
      C.c[0] + ux * C.r[0] * s,
      C.c[1] + uy * C.r[1] * s,
      sg * (GAP + softplus(sg * z - GAP, 7)),
    ]
  }
  const cw = lite ? 104 : 160
  const ch = lite ? 72 : 112
  addGrid(cw, ch, hemisphere(1), 0, regionAt)
  addGrid(cw, ch, hemisphere(-1), 0, regionAt)

  // the cerebellum: two lobes tucked under the occipital lobe, flatter on top
  const lobe = (sg) => (ux, uy, uz) => {
    const z = B.c[2] + uz * B.r[2]
    return [
      B.c[0] + ux * B.r[0],
      B.c[1] + uy * B.r[1] * (uy > 0 ? 0.82 : 1),
      sg * (0.04 + softplus(sg * z - 0.04, 9)),
    ]
  }
  const bw = lite ? 64 : 96
  const bh = lite ? 44 : 64
  addGrid(bw, bh, lobe(1), 1, () => 'iot')
  addGrid(bw, bh, lobe(-1), 1, () => 'iot')

  // the stem: a tapering column whose top hides inside the cerebrum, with the pons bulging forward
  const top = S.y1 + 0.5
  const stem = (ux, uy, uz) => {
    const t = (1 - uy) / 2
    const y = top + t * (S.y0 - top)
    const rho = Math.hypot(ux, uz)
    const pons = Math.exp(-(((y - (S.y1 - 0.75)) / 0.55) ** 2))
    const taper = 0.78 + 0.22 * ((y - S.y0) / (top - S.y0))
    const r = S.rad * (taper + 0.35 * pons) * Math.pow(rho, 0.35)
    const dx = rho > 1e-6 ? ux / rho : 0
    const dz = rho > 1e-6 ? uz / rho : 0
    return [S.x - 0.22 * pons + dx * r, y, S.z + dz * r]
  }
  addGrid(lite ? 36 : 48, lite ? 28 : 40, stem, 2, () => 'ventures')

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('aTint', new THREE.Float32BufferAttribute(tint, 3))
  geo.setAttribute('aKind', new THREE.Float32BufferAttribute(kind, 1))
  geo.setIndex(index)
  geo.computeVertexNormals()

  // weld the normals where each grid closes on itself (the seam and the poles), so no line shows
  const nrm = geo.attributes.normal.array
  const weld = (list) => {
    let x = 0
    let y = 0
    let z = 0
    for (const v of list) {
      x += nrm[3 * v]
      y += nrm[3 * v + 1]
      z += nrm[3 * v + 2]
    }
    const l = Math.hypot(x, y, z) || 1
    for (const v of list) {
      nrm[3 * v] = x / l
      nrm[3 * v + 1] = y / l
      nrm[3 * v + 2] = z / l
    }
  }
  for (const [first, last, pole] of seams) {
    if (pole) {
      const row = []
      for (let v = first; v <= last; v += 1) row.push(v)
      weld(row)
    } else {
      weld([first, last])
    }
  }

  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uScale: { value: scale },
      uCereb: { value: new THREE.Vector3(...B.c) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.userData.base = tint.slice()
  mesh.userData.keys = keys

  // stardust: motes scattered just above the cerebrum and cerebellum (seeded, the same every load)
  let t = 987654
  const rnd = () => {
    t = (Math.imul(t, 1664525) + 1013904223) >>> 0
    return t / 4294967296
  }
  const dustN = lite ? 1400 : 3200
  const dPos = []
  const dSeed = []
  const vCount = pos.length / 3
  for (let tries = 0; dSeed.length < dustN && tries < dustN * 6; tries += 1) {
    const v = Math.floor(rnd() * vCount)
    if (kind[v] > 1.5) continue
    const lift = (0.02 + 0.16 * rnd() * rnd()) * scale
    dPos.push(pos[3 * v] + nrm[3 * v] * lift, pos[3 * v + 1] + nrm[3 * v + 1] * lift, pos[3 * v + 2] + nrm[3 * v + 2] * lift)
    dSeed.push(rnd())
  }
  const dGeo = new THREE.BufferGeometry()
  dGeo.setAttribute('position', new THREE.Float32BufferAttribute(dPos, 3))
  dGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(dSeed, 1))
  const dMat = new THREE.ShaderMaterial({
    vertexShader: DUST_VERT,
    fragmentShader: DUST_FRAG,
    uniforms: { uTime: { value: 0 }, uDpr: { value: Math.min(window.devicePixelRatio || 1, 1.8) } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const dust = new THREE.Points(dGeo, dMat)
  dust.frustumCulled = false
  mesh.add(dust)

  const hMat = new THREE.ShaderMaterial({
    vertexShader: HALO_VERT,
    fragmentShader: HALO_FRAG,
    uniforms: { uScale: { value: scale } },
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const halo = new THREE.Mesh(geo, hMat)
  halo.raycast = () => {} // the glow is not a place to tap
  mesh.add(halo)

  mesh.userData.tick = (time) => {
    dMat.uniforms.uTime.value = time
  }
  mesh.userData.dispose = () => {
    hMat.dispose()
    dGeo.dispose()
    dMat.dispose()
    geo.dispose()
    mat.dispose()
  }
  return mesh
}
