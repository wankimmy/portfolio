/**
 * Real-time flame: a pool of camera-facing puffs drawn as one InstancedMesh.
 *
 * Each puff is a quad. The vertex shader billboards it in view space with its
 * own size and roll. The fragment shader builds the flame from layered noise:
 * a warp of two fbm fields (scrolled upward, so the body licks), an erosion
 * field that the puff's age pushes against (so it breaks into tongues and
 * wisps instead of fading like a round blob), and a temperature that comes
 * from the puff's heat and age, read through a blackbody-like ramp.
 *
 * Output is premultiplied: the rgb is emission (hot parts add light, because
 * their alpha is zero) plus smoke colour times smoke alpha, and the alpha is
 * only the smoke. So one material does both: the flame glows, the cooled
 * smoke darkens what is behind it. Blending is ONE / ONE_MINUS_SRC_ALPHA.
 *
 * The CPU side integrates each puff (drag, buoyancy, a seeded curl that grows
 * with age, swelling and roll) into typed arrays. Nothing allocates after
 * createFlame: emit() writes into a ring of slots, update() writes the
 * instance attributes in place. The randomness is a seeded LCG, so the same
 * emits give the same flame.
 *
 * Colours are linear HDR: above 1.3 the desktop bloom pass picks them up; on
 * phones (lite, no bloom) they simply clip to bright.
 *
 * API
 *   const flame = createFlame(THREE, { count, lite, drag, turbulence, buoyancy })
 *   scene.add(flame.mesh)                    // the mesh lives in the parent's space
 *   flame.emit(x, y, z, vx, vy, vz, size, life, heat)
 *       size: puff radius at birth (world units); life: seconds; heat: 0..1 (1 = white-hot)
 *   flame.update(dt, time, top?, bottom?)    // top / bottom: optional y limits in the mesh's space;
 *                                            // puffs fade out before them, so they never cross a line
 *   flame.clear()                            // every puff gone, seed reset
 *   flame.dispose()
 *
 * Nothing here is dragon-specific: the phoenix can call emit() the same way.
 */

const VERTEX = /* glsl */ `
attribute vec3 aPos;
attribute float aSize;
attribute float aRoll;
attribute float aAge;
attribute vec2 aSeed;
attribute float aHeat;
attribute vec3 aVel;
varying vec2 vP;
varying float vAge;
varying float vHeat;
varying vec2 vSeed;
#include <clipping_planes_pars_vertex>
void main() {
  vP = position.xy;
  vAge = aAge;
  vHeat = aHeat;
  vSeed = aSeed;
  vec4 mv = viewMatrix * modelMatrix * vec4(aPos, 1.0);
  // a puff streaks along its own motion on screen: long along the velocity, round across it
  vec2 d2 = (viewMatrix * modelMatrix * vec4(aVel, 0.0)).xy;
  float sp = length(d2);
  vec2 along = sp > 1e-5 ? d2 / sp : vec2(0.0, 1.0);
  vec2 across = vec2(-along.y, along.x);
  float stretch = 1.0 + clamp(length(aVel) * 0.06, 0.0, 0.45);
  vec2 corner = (across * position.x + along * position.y * stretch) * aSize;
  mv.xy += corner;
  vec4 mvPosition = mv;
  #include <clipping_planes_vertex>
  gl_Position = projectionMatrix * mv;
}
`

const FRAGMENT = /* glsl */ `
#include <clipping_planes_pars_fragment>
uniform float uTime;
uniform float uGain;
varying vec2 vP;
varying float vAge;
varying float vHeat;
varying vec2 vSeed;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return s;
}

// blackbody-like ramp in linear HDR: white-hot, pale yellow, orange, red
// white-hot is the small core only: most of the flame is orange, the rim red
vec3 ramp(float t) {
  vec3 c = mix(vec3(0.16, 0.025, 0.006), vec3(0.95, 0.24, 0.045), smoothstep(0.15, 0.36, t));
  c = mix(c, vec3(1.7, 0.66, 0.14), smoothstep(0.36, 0.56, t));
  c = mix(c, vec3(2.3, 1.3, 0.38), smoothstep(0.56, 0.78, t));
  c = mix(c, vec3(2.0, 1.55, 0.75), smoothstep(0.86, 1.1, t));
  return c;
}

void main() {
  #include <clipping_planes_fragment>
  float f = clamp(vAge, 0.0, 1.0);
  vec2 p = vP;
  // the flame rises: the noise scrolls up and is warped by a second field
  vec2 scroll = vec2(0.0, -uTime * 1.1 - vSeed.x * 4.0);
  vec2 sp = p * 1.25 + vSeed * 7.0;
  vec2 w = vec2(fbm(sp * 1.5 + scroll * 0.6), fbm(sp * 1.5 + vec2(5.2, 1.3) + scroll * 0.6));
  vec2 q = p + (w - 0.5) * (0.85 + 0.45 * f);
  float r = length(q * vec2(1.0, 0.8));
  float body = 1.0 - smoothstep(0.3, 1.0, r);
  float e = fbm(q * 2.7 + scroll * 1.3 + vSeed * 11.0);
  // fine tongues at the edge: a higher-frequency field pulls the ragged rim apart
  float fine = vnoise(q * 6.5 + scroll * 2.6 + vSeed * 17.0);
  e = e * 0.75 + fine * 0.35;

  // erosion: the puff breaks into tongues as its age pushes against the noise.
  // a hard circular limit keeps every puff round, whatever the warp does to its corners
  float disc = 1.0 - smoothstep(0.55, 0.98, length(p));
  float n = e * 1.15 + body * 0.5 - 0.5 - f * 0.95;
  float mask = smoothstep(0.0, 0.3, n) * disc;
  // hot edges: a thin band just inside the eroded rim burns brightest
  float rim = smoothstep(0.0, 0.12, n) * (1.0 - smoothstep(0.12, 0.3, n));

  // temperature: hotter at the core, cooler toward the ragged edge, cooling with age
  float temp = vHeat * (1.05 - 0.9 * f) + (e - 0.5) * 0.6 + body * 0.1 - (1.0 - body) * 0.12;
  temp = clamp(temp, 0.0, 1.2);

  // smoke: what has cooled below the glow and is old enough to be smoke
  float smoke = (1.0 - smoothstep(0.14, 0.4, temp)) * smoothstep(0.3, 0.75, f);
  // smoke is lit warm grey-brown, lighter than the night sky, so a trail shows against it
  vec3 smokeCol = vec3(0.34, 0.29, 0.25) * (0.55 + 0.6 * e) * (0.7 + 0.3 * rim);

  float glowMask = mask * (1.0 - smoke);
  vec3 emission = ramp(temp) * glowMask * (0.9 + 0.5 * rim) * uGain;
  float alpha = smoke * mask * 0.6;
  // premultiplied: emission adds light, smoke darkens what is behind it
  vec3 rgb = emission + smokeCol * alpha;
  gl_FragColor = vec4(rgb, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

const SEED = 0x51a3c7

/**
 * @param {typeof import('three')} THREE
 * @param {{ count?: number, lite?: boolean, drag?: number, turbulence?: number, buoyancy?: number }} [options]
 */
export function createFlame(THREE, { count = 220, lite = false, drag = 1.6, turbulence = 1, buoyancy = 1 } = {}) {
  const N = count

  // ---- instance attributes (typed, written in place)
  const aPos = new Float32Array(N * 3)
  const aSize = new Float32Array(N)
  const aRoll = new Float32Array(N)
  const aAge = new Float32Array(N).fill(1)
  const aSeed = new Float32Array(N * 2)
  const aHeat = new Float32Array(N)
  const aVel = new Float32Array(N * 3)

  // ---- CPU state
  const px = new Float32Array(N)
  const py = new Float32Array(N)
  const pz = new Float32Array(N)
  const vx = new Float32Array(N)
  const vy = new Float32Array(N)
  const vz = new Float32Array(N)
  const age = new Float32Array(N)
  const life = new Float32Array(N) // 0 = dead
  const size0 = new Float32Array(N)
  const roll0 = new Float32Array(N)
  const spin = new Float32Array(N)
  const seedA = new Float32Array(N)
  const seedB = new Float32Array(N)
  const heat = new Float32Array(N)

  const geometry = new THREE.PlaneGeometry(2, 2)
  const instAttr = (array, size, name) => {
    const attr = new THREE.InstancedBufferAttribute(array, size)
    attr.setUsage(THREE.DynamicDrawUsage)
    geometry.setAttribute(name, attr)
    return attr
  }
  const attrPos = instAttr(aPos, 3, 'aPos')
  const attrSize = instAttr(aSize, 1, 'aSize')
  const attrRoll = instAttr(aRoll, 1, 'aRoll')
  const attrAge = instAttr(aAge, 1, 'aAge')
  const attrSeed = instAttr(aSeed, 2, 'aSeed')
  const attrHeat = instAttr(aHeat, 1, 'aHeat')
  const attrVel = instAttr(aVel, 3, 'aVel')

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uGain: { value: lite ? 0.3 : 0.45 },
    },
    transparent: true,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.OneFactor,
    blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    depthWrite: false,
    side: THREE.DoubleSide,
    // the page may fence a creature into its band on phones (createWorld.js, setGuard)
    clipping: true,
  })

  const mesh = new THREE.InstancedMesh(geometry, material, N)
  mesh.frustumCulled = false
  mesh.name = 'flame'

  // a seeded LCG: deterministic, cheap, no Math.random
  let rng = SEED
  const rand = () => {
    rng = (Math.imul(rng, 1664525) + 1013904223) >>> 0
    return rng / 4294967296
  }

  let cursor = 0

  const kill = (i) => {
    life[i] = 0
    age[i] = 0
    size0[i] = 0
    aSize[i] = 0
    aAge[i] = 1
  }
  for (let i = 0; i < N; i++) kill(i)

  return {
    mesh,

    /**
     * Birth one puff. Writes into the next slot of the ring; when the pool is full the
     * oldest slot is reused.
     */
    emit(x, y, z, vxIn, vyIn, vzIn, size, lifeIn, heatIn) {
      if (!(lifeIn > 0) || !(size > 0)) return
      const i = cursor
      cursor = (cursor + 1) % N
      px[i] = x
      py[i] = y
      pz[i] = z
      vx[i] = vxIn
      vy[i] = vyIn
      vz[i] = vzIn
      age[i] = 0
      life[i] = lifeIn
      size0[i] = size
      heat[i] = heatIn < 0 ? 0 : heatIn > 1 ? 1 : heatIn
      roll0[i] = rand() * 6.283
      spin[i] = (rand() - 0.5) * 2.4
      seedA[i] = rand()
      seedB[i] = rand()
      aSeed[i * 2] = seedA[i]
      aSeed[i * 2 + 1] = seedB[i]
    },

    /**
     * Advance every puff. dt is clamped to 0.05 s; time drives the shader's scroll.
     * top / bottom (optional) are y limits in the mesh's space: a puff that rises above
     * top or sinks below bottom shrinks to nothing over the last 0.15 units before it.
     */
    update(dt, time, top = Infinity, bottom = -Infinity) {
      const h = dt > 0.05 ? 0.05 : dt > 0 ? dt : 0
      material.uniforms.uTime.value = time
      const fadeBand = 0.15
      for (let i = 0; i < N; i++) {
        if (life[i] <= 0) continue
        const a = age[i] + h
        if (a >= life[i]) {
          kill(i)
          continue
        }
        age[i] = a
        const f = a / life[i]
        const hot = heat[i]

        // drag, then a curl that grows as the puff ages (the cone opens into turbulence),
        // then buoyancy: hot air rises, and the cooler it gets the less it floats
        const damp = Math.max(0, 1 - drag * h)
        let ux = vx[i] * damp
        let uy = vy[i] * damp
        let uz = vz[i] * damp
        const curl = turbulence * (0.5 + 2.4 * f) * h
        ux += Math.sin(a * 5.3 + seedA[i] * 6.283) * curl
        uz += Math.cos(a * 4.1 + seedB[i] * 6.283) * curl
        uy += Math.cos(a * 6.7 + seedB[i] * 6.283) * curl * 0.45
        uy += buoyancy * (0.25 + 1.5 * hot * (1 - f)) * h
        vx[i] = ux
        vy[i] = uy
        vz[i] = uz
        px[i] += ux * h
        py[i] += uy * h
        pz[i] += uz * h

        // swell as it spreads, roll with its spin, and fade out at the limits
        let s = size0[i] * (1 + 0.6 * f)
        const y = py[i]
        if (y > top - fadeBand) s *= Math.max(0, (top - y) / fadeBand)
        if (y < bottom + fadeBand) s *= Math.max(0, (y - bottom) / fadeBand)
        if (s < 0) s = 0

        const k3 = i * 3
        aPos[k3] = px[i]
        aPos[k3 + 1] = py[i]
        aPos[k3 + 2] = pz[i]
        aSize[i] = s
        aRoll[i] = roll0[i] + spin[i] * a
        aAge[i] = f
        aHeat[i] = hot
        aVel[k3] = ux
        aVel[k3 + 1] = uy
        aVel[k3 + 2] = uz
      }
      attrPos.needsUpdate = true
      attrSize.needsUpdate = true
      attrRoll.needsUpdate = true
      attrAge.needsUpdate = true
      attrSeed.needsUpdate = true
      attrHeat.needsUpdate = true
      attrVel.needsUpdate = true
    },

    /** The seed back at its start: the same emits from here give the same flame. Live puffs keep living. */
    seed() {
      rng = SEED
    },

    /** Every puff gone, and the seed back at its start. */
    clear() {
      for (let i = 0; i < N; i++) kill(i)
      rng = SEED
      cursor = 0
      attrSize.needsUpdate = true
      attrAge.needsUpdate = true
    },

    dispose() {
      mesh.removeFromParent()
      geometry.dispose()
      material.dispose()
    },
  }
}
