/**
 * Sculpt wrap: makes a sculpted mesh (a dense, generator-made model of a creature)
 * follow a rig built from ordinary three.js meshes (the code-built creature).
 * Dependency-free: THREE is passed in, nothing is imported.
 *
 * HOW TO USE, in this order:
 *
 *   1. Build the rig (the code-built creature) and step it to the picture's pose:
 *      update(time, dt, energy) until the clock reaches the picture's time T.
 *
 *   2. const wrap = createSculptWrap(THREE, {
 *        sculpt,            // BufferGeometry of the sculpt, in the picture's camera axes
 *                           //   (+X screen right, +Y up, +Z toward the viewer), any centre and scale
 *        group,             // the Group that holds the rig's meshes; the sculpt is placed in this frame
 *        yaw, pitch,        // the picture's rotation: rotation.set(pitch, yaw, 0) with order 'YXZ'
 *        exclude,           // optional (mesh) => true for rig meshes that are not body (glows, particles)
 *        depth,             // 'auto' (default): also try a separate depth scale, keep it only if it
 *                           //   clearly helps; false: uniform scale only
 *      })
 *      Points, lines and sprites are never part of the body.
 *      The sculpt's own position attribute is rewritten in place, so it is safe to
 *      read it straight after fit().
 *
 *   3. const stats = wrap.fit()
 *      Runs align() then bind(). Or call them one by one:
 *        wrap.align()  - finds the uniform scale (and a depth scale if it helps) and the
 *                        translation that lay the sculpt over the rig, by bounding boxes and
 *                        then a few rounds of closest-point fitting (ICP). Undoes the picture's
 *                        rotation, so the sculpt is now in the rig's own axes.
 *        wrap.bind()   - for every sculpt vertex, the nearest point on the rig surface, stored so it
 *                        survives the rig moving: a triangle, barycentric weights and the offset in
 *                        that triangle's own frame (for an InstancedMesh: the instance and the
 *                        vertex position in that instance's frame).
 *      stats: { scale, depthScale, iterations, alignMs, bindMs, sculptVerts, rigTriangles,
 *               instances, boundInstanced, meanPct, p95Pct, maxPct, creatureSize }.
 *      meanPct, p95Pct, maxPct: distance from sculpt vertices to the rig surface, as a
 *      percent of the creature's size (its largest extent in the rig's own axes).
 *
 *   4. Each frame, AFTER the rig has been updated (creature.update(...)):
 *        wrap.update()
 *      Recomputes every sculpt vertex from the rig's current vertex positions and
 *      instance matrices, into the sculpt's position attribute. No allocation, typed
 *      arrays only. Nothing needs normals: the sculpt is shaded flat.
 *
 *   5. wrap.dispose() drops the bindings and the working buffers. The sculpt's
 *      geometry is left alone (its owner disposes it).
 *
 * Notes: the rig must keep the same mesh and vertex counts between fit() and update()
 * (it does, for the creatures in this site). A sculpt vertex bound to an InstancedMesh
 * follows that one instance only: no blending between instances yet.
 */

// barycentric output of the closest-point test: [u, v, w] on triangle (a, b, c)
const NB = new Float64Array(3)

function invAff(e, out) {
  const a00 = e[0]
  const a10 = e[1]
  const a20 = e[2]
  const a01 = e[4]
  const a11 = e[5]
  const a21 = e[6]
  const a02 = e[8]
  const a12 = e[9]
  const a22 = e[10]
  const tx = e[12]
  const ty = e[13]
  const tz = e[14]
  const det = a00 * (a11 * a22 - a12 * a21) - a01 * (a10 * a22 - a12 * a20) + a02 * (a10 * a21 - a11 * a20)
  const inv = 1 / det
  const i00 = (a11 * a22 - a12 * a21) * inv
  const i01 = (a02 * a21 - a01 * a22) * inv
  const i02 = (a01 * a12 - a02 * a11) * inv
  const i10 = (a12 * a20 - a10 * a22) * inv
  const i11 = (a00 * a22 - a02 * a20) * inv
  const i12 = (a02 * a10 - a00 * a12) * inv
  const i20 = (a10 * a21 - a11 * a20) * inv
  const i21 = (a01 * a20 - a00 * a21) * inv
  const i22 = (a00 * a11 - a01 * a10) * inv
  out[0] = i00
  out[1] = i10
  out[2] = i20
  out[3] = 0
  out[4] = i01
  out[5] = i11
  out[6] = i21
  out[7] = 0
  out[8] = i02
  out[9] = i12
  out[10] = i22
  out[11] = 0
  out[12] = -(i00 * tx + i01 * ty + i02 * tz)
  out[13] = -(i10 * tx + i11 * ty + i12 * tz)
  out[14] = -(i20 * tx + i21 * ty + i22 * tz)
  out[15] = 1
  return out
}

// out = A * B for column-major 4x4 matrices (A from aOff, B from bOff)
function compose16(A, aOff, B, bOff, out) {
  for (let c = 0; c < 4; c += 1) {
    const b0 = B[bOff + c * 4]
    const b1 = B[bOff + c * 4 + 1]
    const b2 = B[bOff + c * 4 + 2]
    const b3 = B[bOff + c * 4 + 3]
    for (let r = 0; r < 4; r += 1) {
      out[c * 4 + r] = A[aOff + r] * b0 + A[aOff + 4 + r] * b1 + A[aOff + 8 + r] * b2 + A[aOff + 12 + r] * b3
    }
  }
  return out
}

/**
 * @param {typeof import('three')} THREE
 * @param {{ sculpt: import('three').BufferGeometry, group: import('three').Group, yaw?: number, pitch?: number, exclude?: (mesh: any) => boolean, depth?: 'auto' | false }} options
 */
export function createSculptWrap(THREE, options) {
  const { sculpt, group, yaw = 0, pitch = 0, exclude = null, depth = 'auto' } = options
  const posAttr = sculpt.attributes.position
  const N = posAttr.count
  const out = posAttr.array // Float32Array, written in place
  const orig = Float32Array.from(out) // the sculpt as it arrived
  const RE = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ')).elements

  // ---- rig sources --------------------------------------------------------
  const normals = []
  const insts = []
  group.traverse((mesh) => {
    if (!mesh.isMesh || mesh.geometry === sculpt) return
    if (exclude && exclude(mesh)) return
    const p = mesh.geometry.attributes.position
    if (!p) return
    const index = mesh.geometry.index ? mesh.geometry.index.array : null
    if (mesh.isInstancedMesh) {
      insts.push({ mesh, pos: p.array, index, count: mesh.count, first: 0 })
    } else {
      normals.push({ mesh, pos: p.array, index, count: p.count, off: 0 })
    }
  })
  let nVerts = 0
  for (const s of normals) {
    s.off = nVerts
    nVerts += s.count
  }
  let nInst = 0
  for (const s of insts) {
    s.first = nInst
    nInst += s.count
  }
  const cur = new Float64Array(nVerts * 3) // rig vertices in the group's frame, now
  const instM = new Float64Array(nInst * 12) // instance matrices in the group's frame, now (3x4 column-major)
  const instInv = new Float64Array(nInst * 12)
  const GI = new Float64Array(16)
  const REL = new Float64Array(16)
  const TMP = new Float64Array(16)
  const scratchInv = new Float64Array(16)
  const instMat16 = new Float64Array(16)

  // grid over the rig's triangles at bind time (local frame)
  let triV = null
  let triId = null
  let triInst = null
  let grid = null
  let stamp = null
  let stampId = 0

  // binding (per sculpt vertex)
  let bIdx = null
  let bW = null
  let bOff = null
  let bInst = null
  let bLoc = null
  let bound = false
  let disposed = false
  let stats = null
  let rigSize = 1

  // sampled sculpt points for the alignment
  let sampO = null
  let sampQ = null
  let M = 0
  let stride = 1
  let nearT = -1

  // ---- rig state -----------------------------------------------------------
  // bring cur, instM to the rig's present pose
  function refresh() {
    group.updateMatrixWorld(true)
    invAff(group.matrixWorld.elements, GI)
    for (const s of normals) {
      compose16(GI, 0, s.mesh.matrixWorld.elements, 0, REL)
      const p = s.pos
      const o = s.off * 3
      for (let v = 0; v < s.count; v += 1) {
        const x = p[3 * v]
        const y = p[3 * v + 1]
        const z = p[3 * v + 2]
        cur[o + 3 * v] = REL[0] * x + REL[4] * y + REL[8] * z + REL[12]
        cur[o + 3 * v + 1] = REL[1] * x + REL[5] * y + REL[9] * z + REL[13]
        cur[o + 3 * v + 2] = REL[2] * x + REL[6] * y + REL[10] * z + REL[14]
      }
    }
    for (const s of insts) {
      compose16(GI, 0, s.mesh.matrixWorld.elements, 0, REL)
      const im = s.mesh.instanceMatrix.array
      for (let i = 0; i < s.count; i += 1) {
        compose16(REL, 0, im, 16 * i, TMP)
        const o = (s.first + i) * 12
        for (let c = 0; c < 4; c += 1) {
          for (let r = 0; r < 3; r += 1) instM[o + c * 3 + r] = TMP[c * 4 + r]
        }
      }
    }
  }

  // closest point on triangle (triV at offset o) to p; sets NB = [u, v, w]; returns squared distance
  function triClosest(px, py, pz, o) {
    const ax = triV[o]
    const ay = triV[o + 1]
    const az = triV[o + 2]
    const bx = triV[o + 3]
    const by = triV[o + 4]
    const bz = triV[o + 5]
    const cx = triV[o + 6]
    const cy = triV[o + 7]
    const cz = triV[o + 8]
    const abx = bx - ax
    const aby = by - ay
    const abz = bz - az
    const acx = cx - ax
    const acy = cy - ay
    const acz = cz - az
    const apx = px - ax
    const apy = py - ay
    const apz = pz - az
    const d1 = abx * apx + aby * apy + abz * apz
    const d2 = acx * apx + acy * apy + acz * apz
    let u
    let v
    let w
    if (d1 <= 0 && d2 <= 0) {
      u = 1
      v = 0
      w = 0
    } else {
      const bpx = px - bx
      const bpy = py - by
      const bpz = pz - bz
      const d3 = abx * bpx + aby * bpy + abz * bpz
      const d4 = acx * bpx + acy * bpy + acz * bpz
      const cpx = px - cx
      const cpy = py - cy
      const cpz = pz - cz
      const d5 = abx * cpx + aby * cpy + abz * cpz
      const d6 = acx * cpx + acy * cpy + acz * cpz
      const vc = d1 * d4 - d3 * d2
      const vb = d5 * d2 - d1 * d6
      const va = d3 * d6 - d5 * d4
      if (d3 >= 0 && d4 <= d3) {
        u = 0
        v = 1
        w = 0
      } else if (vc <= 0 && d1 >= 0 && d3 <= 0) {
        v = d1 / (d1 - d3)
        u = 1 - v
        w = 0
      } else if (d6 >= 0 && d5 <= d6) {
        u = 0
        v = 0
        w = 1
      } else if (vb <= 0 && d2 >= 0 && d6 <= 0) {
        w = d2 / (d2 - d6)
        u = 1 - w
        v = 0
      } else if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
        w = (d4 - d3) / (d4 - d3 + (d5 - d6))
        u = 0
        v = 1 - w
      } else {
        const denom = 1 / (va + vb + vc)
        v = vb * denom
        w = vc * denom
        u = 1 - v - w
      }
    }
    NB[0] = u
    NB[1] = v
    NB[2] = w
    const qx = u * ax + v * bx + w * cx
    const qy = u * ay + v * by + w * cy
    const qz = u * az + v * bz + w * cz
    return (px - qx) * (px - qx) + (py - qy) * (py - qy) + (pz - qz) * (pz - qz)
  }

  // nearest rig triangle to p (local frame): sets nearT and NB, returns squared distance
  function nearest(px, py, pz) {
    const { minX, minY, minZ, h, NX, NY, NZ, cellStart, cellTris } = grid
    let cx = Math.floor((px - minX) / h)
    let cy = Math.floor((py - minY) / h)
    let cz = Math.floor((pz - minZ) / h)
    cx = cx < 0 ? 0 : cx >= NX ? NX - 1 : cx
    cy = cy < 0 ? 0 : cy >= NY ? NY - 1 : cy
    cz = cz < 0 ? 0 : cz >= NZ ? NZ - 1 : cz
    stampId += 1
    let best = Infinity
    let bestT = -1
    let bestU = 0
    let bestV = 0
    let bestW = 0
    const maxR = Math.max(NX, NY, NZ)
    for (let r = 0; r <= maxR; r += 1) {
      for (let k = cz - r; k <= cz + r; k += 1) {
        if (k < 0 || k >= NZ) continue
        const edgeK = k === cz - r || k === cz + r
        for (let j = cy - r; j <= cy + r; j += 1) {
          if (j < 0 || j >= NY) continue
          const edgeJ = edgeK || j === cy - r || j === cy + r
          const step = edgeJ ? 1 : 2 * r
          for (let i = cx - r; i <= cx + r; i += step) {
            if (i < 0 || i >= NX) {
              if (step === 0) break
              continue
            }
            const cell = i + NX * (j + NY * k)
            for (let q = cellStart[cell]; q < cellStart[cell + 1]; q += 1) {
              const t = cellTris[q]
              if (stamp[t] === stampId) continue
              stamp[t] = stampId
              const d2 = triClosest(px, py, pz, 9 * t)
              if (d2 < best) {
                best = d2
                bestT = t
                bestU = NB[0]
                bestV = NB[1]
                bestW = NB[2]
              }
            }
            if (step === 0) break
          }
        }
      }
      if (bestT >= 0 && best <= (r * h) * (r * h)) break
    }
    nearT = bestT
    NB[0] = bestU
    NB[1] = bestV
    NB[2] = bestW
    return best
  }

  // the triangle set of the rig's rest pose, plus a uniform grid over it
  // a generator: yields when the turn's budget is spent, so the grid build is sliced like the fit
  function* buildGridSteps() {
    let T = 0
    for (const s of normals) T += Math.floor((s.index ? s.index.length : s.count) / 3)
    for (const s of insts) T += s.count * Math.floor(((s.index ? s.index.length : s.pos.length / 3)) / 3)
    triV = new Float32Array(9 * T)
    triId = new Int32Array(3 * T)
    triInst = new Int32Array(T)
    let m = 0
    const put = (ax, ay, az, bx, by, bz, cx, cy, cz) => {
      const e1x = bx - ax
      const e1y = by - ay
      const e1z = bz - az
      const e2x = cx - ax
      const e2y = cy - ay
      const e2z = cz - az
      const crx = e1y * e2z - e1z * e2y
      const cry = e1z * e2x - e1x * e2z
      const crz = e1x * e2y - e1y * e2x
      if (crx * crx + cry * cry + crz * crz < 1e-20) return false
      const o = 9 * m
      triV[o] = ax
      triV[o + 1] = ay
      triV[o + 2] = az
      triV[o + 3] = bx
      triV[o + 4] = by
      triV[o + 5] = bz
      triV[o + 6] = cx
      triV[o + 7] = cy
      triV[o + 8] = cz
      return true
    }
    for (const s of normals) {
      const nt = Math.floor((s.index ? s.index.length : s.count) / 3)
      for (let t = 0; t < nt; t += 1) {
        if ((t & 2047) === 0 && due()) yield
        const i0 = s.index ? s.index[3 * t] : 3 * t
        const i1 = s.index ? s.index[3 * t + 1] : 3 * t + 1
        const i2 = s.index ? s.index[3 * t + 2] : 3 * t + 2
        const a = s.off + i0
        const b = s.off + i1
        const c = s.off + i2
        if (
          put(
            cur[3 * a], cur[3 * a + 1], cur[3 * a + 2],
            cur[3 * b], cur[3 * b + 1], cur[3 * b + 2],
            cur[3 * c], cur[3 * c + 1], cur[3 * c + 2],
          )
        ) {
          triId[3 * m] = a
          triId[3 * m + 1] = b
          triId[3 * m + 2] = c
          triInst[m] = -1
          m += 1
        }
      }
    }
    for (const s of insts) {
      const nt = Math.floor((s.index ? s.index.length : s.pos.length / 3) / 3)
      const p = s.pos
      for (let i = 0; i < s.count; i += 1) {
        const g = s.first + i
        const q = instM.subarray(g * 12, g * 12 + 12)
        const corner = (v) => [
          q[0] * p[3 * v] + q[3] * p[3 * v + 1] + q[6] * p[3 * v + 2] + q[9],
          q[1] * p[3 * v] + q[4] * p[3 * v + 1] + q[7] * p[3 * v + 2] + q[10],
          q[2] * p[3 * v] + q[5] * p[3 * v + 1] + q[8] * p[3 * v + 2] + q[11],
        ]
        if (due()) yield
        for (let t = 0; t < nt; t += 1) {
          const A = corner(s.index ? s.index[3 * t] : 3 * t)
          const B = corner(s.index ? s.index[3 * t + 1] : 3 * t + 1)
          const C = corner(s.index ? s.index[3 * t + 2] : 3 * t + 2)
          if (put(A[0], A[1], A[2], B[0], B[1], B[2], C[0], C[1], C[2])) {
            triId[3 * m] = -1
            triId[3 * m + 1] = -1
            triId[3 * m + 2] = -1
            triInst[m] = g
            m += 1
          }
        }
      }
    }
    triV = triV.slice(0, 9 * m)
    triId = triId.slice(0, 3 * m)
    triInst = triInst.slice(0, m)
    stamp = new Int32Array(m)
    stampId = 0
    if (due()) yield

    let minX = Infinity
    let minY = Infinity
    let minZ = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    let maxZ = -Infinity
    for (let k = 0; k < 3 * m; k += 1) {
      if ((k & 8191) === 0 && due()) yield
      const x = triV[3 * k]
      const y = triV[3 * k + 1]
      const z = triV[3 * k + 2]
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
      if (z < minZ) minZ = z
      if (z > maxZ) maxZ = z
    }
    const ex = Math.max(maxX - minX, 1e-6)
    const ey = Math.max(maxY - minY, 1e-6)
    const ez = Math.max(maxZ - minZ, 1e-6)
    let h = Math.max(Math.cbrt((ex * ey * ez) / Math.max(m, 1)) * 1.5, Math.max(ex, ey, ez) / 200)
    let NX = 0
    let NY = 0
    let NZ = 0
    for (;;) {
      NX = Math.floor(ex / h) + 1
      NY = Math.floor(ey / h) + 1
      NZ = Math.floor(ez / h) + 1
      if (NX * NY * NZ <= 4e6) break
      h *= 1.25
    }
    const NC = NX * NY * NZ
    const cellStart = new Int32Array(NC + 1)
    const range = (t) => {
      const o = 9 * t
      const x0 = Math.min(triV[o], triV[o + 3], triV[o + 6])
      const x1 = Math.max(triV[o], triV[o + 3], triV[o + 6])
      const y0 = Math.min(triV[o + 1], triV[o + 4], triV[o + 7])
      const y1 = Math.max(triV[o + 1], triV[o + 4], triV[o + 7])
      const z0 = Math.min(triV[o + 2], triV[o + 5], triV[o + 8])
      const z1 = Math.max(triV[o + 2], triV[o + 5], triV[o + 8])
      return [
        Math.min(NX - 1, Math.max(0, Math.floor((x0 - minX) / h))), Math.min(NX - 1, Math.max(0, Math.floor((x1 - minX) / h))),
        Math.min(NY - 1, Math.max(0, Math.floor((y0 - minY) / h))), Math.min(NY - 1, Math.max(0, Math.floor((y1 - minY) / h))),
        Math.min(NZ - 1, Math.max(0, Math.floor((z0 - minZ) / h))), Math.min(NZ - 1, Math.max(0, Math.floor((z1 - minZ) / h))),
      ]
    }
    for (let t = 0; t < m; t += 1) {
      if ((t & 2047) === 0 && due()) yield
      const [i0, i1, j0, j1, k0, k1] = range(t)
      for (let k = k0; k <= k1; k += 1) {
        for (let j = j0; j <= j1; j += 1) {
          for (let i = i0; i <= i1; i += 1) cellStart[i + NX * (j + NY * k) + 1] += 1
        }
      }
    }
    for (let c = 0; c < NC; c += 1) cellStart[c + 1] += cellStart[c]
    const cursor = cellStart.slice(0, NC)
    const cellTris = new Int32Array(cellStart[NC])
    if (due()) yield
    for (let t = 0; t < m; t += 1) {
      if ((t & 2047) === 0 && due()) yield
      const [i0, i1, j0, j1, k0, k1] = range(t)
      for (let k = k0; k <= k1; k += 1) {
        for (let j = j0; j <= j1; j += 1) {
          for (let i = i0; i <= i1; i += 1) {
            const c = i + NX * (j + NY * k)
            cellTris[cursor[c]] = t
            cursor[c] += 1
          }
        }
      }
    }
    grid = { minX, minY, minZ, h, NX, NY, NZ, cellStart, cellTris }
    rigSize = Math.max(maxX - minX, maxY - minY, maxZ - minZ)
  }
  // runs the grid build to its end, in one go (the sliced fit uses buildGridSteps directly)
  function buildGrid() {
    runAll(buildGridSteps())
  }

  // ---- align ---------------------------------------------------------------
  // the sculpt's point after scale and translation, in the picture's frame -> the rig's own frame
  const RT = (x, y, z, o, dst) => {
    // inverse of the picture rotation (transpose)
    dst[0] = RE[0] * x + RE[1] * y + RE[2] * z
    dst[1] = RE[4] * x + RE[5] * y + RE[6] * z
    dst[2] = RE[8] * x + RE[9] * y + RE[10] * z
    return dst
  }
  const tmpP = new Float64Array(3)
  const tmpQ = new Float64Array(3)

  // time slicing: the align and bind passes are generators; they yield once the turn's budget is spent
  let sliceT = 0
  let sliceMs = Infinity
  const due = () => performance.now() - sliceT > sliceMs
  const EVAL_CHUNK = 8 // samples per check of the clock (a sample is one closest-point search)

  // closest rig point (local) for every sampled sculpt point, in the picture's frame
  function evaluateRange(P, j0, j1) {
    let sum = 0
    for (let j = j0; j < j1; j += 1) {
      const k = j * stride
      const sx = orig[3 * k]
      const sy = orig[3 * k + 1]
      const sz = orig[3 * k + 2]
      const px = P.s[0] * sx + P.t[0]
      const py = P.s[1] * sy + P.t[1]
      const pz = P.s[2] * sz + P.t[2]
      RT(px, py, pz, 0, tmpP)
      const d2 = nearest(tmpP[0], tmpP[1], tmpP[2])
      const o = 9 * nearT
      const u = NB[0]
      const v = NB[1]
      const w = NB[2]
      const qx = u * triV[o] + v * triV[o + 3] + w * triV[o + 6]
      const qy = u * triV[o + 1] + v * triV[o + 4] + w * triV[o + 7]
      const qz = u * triV[o + 2] + v * triV[o + 5] + w * triV[o + 8]
      // back to the picture's frame
      sampQ[3 * j] = RE[0] * qx + RE[4] * qy + RE[8] * qz
      sampQ[3 * j + 1] = RE[1] * qx + RE[5] * qy + RE[9] * qz
      sampQ[3 * j + 2] = RE[2] * qx + RE[6] * qy + RE[10] * qz
      sum += Math.sqrt(d2)
    }
    return sum
  }
  function evaluate(P) {
    return evaluateRange(P, 0, M) / Math.max(M, 1)
  }
  // the same as evaluate, in chunks, yielding when the turn's budget is spent
  function* evaluateSteps(P) {
    let sum = 0
    for (let j0 = 0; j0 < M; j0 += EVAL_CHUNK) {
      sum += evaluateRange(P, j0, Math.min(M, j0 + EVAL_CHUNK))
      if (due()) yield
    }
    return sum / Math.max(M, 1)
  }

  // least squares scale and translation that move the samples onto their closest rig points
  function solve(P, perAxis) {
    const mS = [0, 0, 0]
    const mQ = [0, 0, 0]
    for (let j = 0; j < M; j += 1) {
      const k = j * stride
      for (let a = 0; a < 3; a += 1) {
        mS[a] += orig[3 * k + a]
        mQ[a] += sampQ[3 * j + a]
      }
    }
    for (let a = 0; a < 3; a += 1) {
      mS[a] /= Math.max(M, 1)
      mQ[a] /= Math.max(M, 1)
    }
    const num = [0, 0, 0]
    const den = [0, 0, 0]
    for (let j = 0; j < M; j += 1) {
      const k = j * stride
      for (let a = 0; a < 3; a += 1) {
        const ds = orig[3 * k + a] - mS[a]
        num[a] += (sampQ[3 * j + a] - mQ[a]) * ds
        den[a] += ds * ds
      }
    }
    if (!perAxis) {
      const s = num[0] + num[1] + num[2] > 0 ? (num[0] + num[1] + num[2]) / Math.max(den[0] + den[1] + den[2], 1e-12) : P.s[0]
      P.s[0] = s
      P.s[1] = s
      P.s[2] = s
    } else {
      // the picture's x and y share one scale, the depth gets its own
      const sxy = (num[0] + num[1]) / Math.max(den[0] + den[1], 1e-12)
      const sz = num[2] / Math.max(den[2], 1e-12)
      P.s[0] = sxy
      P.s[1] = sxy
      P.s[2] = sz
    }
    for (let a = 0; a < 3; a += 1) P.t[a] = mQ[a] - P.s[a] * mS[a]
  }

  function* alignSteps() {
    const t0 = performance.now()
    refresh()
    yield* buildGridSteps()
    if (due()) yield
    // rig bounding box in the picture's frame, from the triangle corners
    const pmin = [Infinity, Infinity, Infinity]
    const pmax = [-Infinity, -Infinity, -Infinity]
    for (let k = 0; k < triV.length; k += 3) {
      const x = triV[k]
      const y = triV[k + 1]
      const z = triV[k + 2]
      const px = RE[0] * x + RE[4] * y + RE[8] * z
      const py = RE[1] * x + RE[5] * y + RE[9] * z
      const pz = RE[2] * x + RE[6] * y + RE[10] * z
      pmin[0] = Math.min(pmin[0], px)
      pmin[1] = Math.min(pmin[1], py)
      pmin[2] = Math.min(pmin[2], pz)
      pmax[0] = Math.max(pmax[0], px)
      pmax[1] = Math.max(pmax[1], py)
      pmax[2] = Math.max(pmax[2], pz)
    }
    // the sculpt's own bounding box
    const smin = [Infinity, Infinity, Infinity]
    const smax = [-Infinity, -Infinity, -Infinity]
    for (let k = 0; k < N; k += 1) {
      for (let a = 0; a < 3; a += 1) {
        const v = orig[3 * k + a]
        if (v < smin[a]) smin[a] = v
        if (v > smax[a]) smax[a] = v
      }
    }
    const ratio = (a) => (pmax[a] - pmin[a]) / Math.max(smax[a] - smin[a], 1e-9)
    const s0 = (ratio(0) + ratio(1)) / 2
    const s0z = ratio(2) || s0
    const P = { s: [s0, s0, s0], t: [0, 0, 0] }
    P.s[2] = s0z
    for (let a = 0; a < 3; a += 1) {
      P.t[a] = (pmin[a] + pmax[a]) / 2 - P.s[a] * (smin[a] + smax[a]) / 2
    }

    // closest-point samples
    M = Math.min(N, 4000)
    stride = Math.max(1, Math.floor(N / M))
    sampO = new Float64Array(3 * M)
    sampQ = new Float64Array(3 * M)
    let iterations = 0
    const ROUNDS = 8
    for (let r = 0; r < ROUNDS; r += 1) {
      yield* evaluateSteps(P)
      solve(P, false)
      iterations += 1
    }
    const uniformMean = yield* evaluateSteps(P)
    let depthScale = P.s[2] / P.s[0]
    let chosen = 'uniform'
    if (depth !== false) {
      const Q = { s: P.s.slice(), t: P.t.slice() }
      for (let r = 0; r < ROUNDS; r += 1) {
        yield* evaluateSteps(Q)
        solve(Q, true)
        iterations += 1
      }
      const depthMean = yield* evaluateSteps(Q)
      // a depth ratio far from 1 means the sculpt's guessed depth is being squashed or stretched to fit: refuse it
      const ratioZ = Q.s[2] / Q.s[0]
      if (depthMean < uniformMean * 0.93 && ratioZ > 0.6 && ratioZ < 1.6) {
        P.s = Q.s
        P.t = Q.t
        depthScale = P.s[2] / P.s[0]
        chosen = 'depth'
      }
    }
    yield* evaluateSteps(P)

    // express the sculpt in the rig's own axes
    for (let k = 0; k < N; k += 1) {
      if ((k & 4095) === 0 && due()) yield
      const px = P.s[0] * orig[3 * k] + P.t[0]
      const py = P.s[1] * orig[3 * k + 1] + P.t[1]
      const pz = P.s[2] * orig[3 * k + 2] + P.t[2]
      RT(px, py, pz, 0, tmpQ)
      out[3 * k] = tmpQ[0]
      out[3 * k + 1] = tmpQ[1]
      out[3 * k + 2] = tmpQ[2]
    }
    stats = {
      mode: chosen,
      scale: Number(P.s[0].toFixed(5)),
      depthScale: Number(depthScale.toFixed(4)),
      translation: P.t.map((v) => Number(v.toFixed(4))),
      iterations,
      alignMs: Number((performance.now() - t0).toFixed(1)),
      sampleMeanPct: 0,
    }
    stats.sampleMeanPct = Number(((100 * uniformMean) / rigSize).toFixed(2))
    sampQ = null
    sampO = null
    return stats
  }

  // ---- bind ----------------------------------------------------------------
  function* bindSteps() {
    if (!grid) throw new Error('wrapSculpt: call align() before bind()')
    const t0 = performance.now()
    const invDone = new Uint8Array(nInst)
    bIdx = new Int32Array(3 * N)
    bW = new Float32Array(2 * N)
    bOff = new Float32Array(3 * N)
    bInst = new Int32Array(N)
    bLoc = new Float32Array(3 * N)
    const dist = new Float64Array(N)
    let boundInstanced = 0
    for (let k = 0; k < N; k += 1) {
      if ((k & 63) === 0 && due()) yield
      const px = out[3 * k]
      const py = out[3 * k + 1]
      const pz = out[3 * k + 2]
      const d2 = nearest(px, py, pz)
      dist[k] = Math.sqrt(d2)
      const t = nearT
      const u = NB[0]
      const v = NB[1]
      const w = NB[2]
      const g = triInst[t]
      if (g < 0) {
        const a = triId[3 * t]
        const b = triId[3 * t + 1]
        const c = triId[3 * t + 2]
        const o = 9 * t
        // the triangle's frame at bind time: edge 1, its normal, and the third axis
        const e1x = triV[o + 3] - triV[o]
        const e1y = triV[o + 4] - triV[o + 1]
        const e1z = triV[o + 5] - triV[o + 2]
        const e1l = Math.hypot(e1x, e1y, e1z) || 1
        const ex = e1x / e1l
        const ey = e1y / e1l
        const ez = e1z / e1l
        const t2x = triV[o + 6] - triV[o]
        const t2y = triV[o + 7] - triV[o + 1]
        const t2z = triV[o + 8] - triV[o + 2]
        let nx = ey * t2z - ez * t2y
        let ny = ez * t2x - ex * t2z
        let nz = ex * t2y - ey * t2x
        const nl = Math.hypot(nx, ny, nz) || 1
        nx /= nl
        ny /= nl
        nz /= nl
        const tx = ny * ez - nz * ey
        const ty = nz * ex - nx * ez
        const tz = nx * ey - ny * ex
        const qx = u * triV[o] + v * triV[o + 3] + w * triV[o + 6]
        const qy = u * triV[o + 1] + v * triV[o + 4] + w * triV[o + 7]
        const qz = u * triV[o + 2] + v * triV[o + 5] + w * triV[o + 8]
        const ox = px - qx
        const oy = py - qy
        const oz = pz - qz
        bIdx[3 * k] = a
        bIdx[3 * k + 1] = b
        bIdx[3 * k + 2] = c
        bW[2 * k] = u
        bW[2 * k + 1] = v
        bOff[3 * k] = ox * ex + oy * ey + oz * ez
        bOff[3 * k + 1] = ox * tx + oy * ty + oz * tz
        bOff[3 * k + 2] = ox * nx + oy * ny + oz * nz
        bInst[k] = -1
      } else {
        // the instance's frame: inverse of its matrix, applied to the sculpt's point
        if (!invDone[g]) {
          invAff(instMatrixAt(g, instMat16), scratchInv)
          for (let q = 0; q < 12; q += 1) instInv[g * 12 + q] = scratchInv[q]
          invDone[g] = 1
        }
        const m = instInv
        const o = g * 12
        bLoc[3 * k] = m[o] * px + m[o + 3] * py + m[o + 6] * pz + m[o + 9]
        bLoc[3 * k + 1] = m[o + 1] * px + m[o + 4] * py + m[o + 7] * pz + m[o + 10]
        bLoc[3 * k + 2] = m[o + 2] * px + m[o + 5] * py + m[o + 8] * pz + m[o + 11]
        bInst[k] = g
        boundInstanced += 1
      }
    }
    // distances, sorted for the 95th percentile
    // a histogram instead of a full sort: one block of N log N would hold the thread for tens of ms
    let sum = 0
    let dmax = 0
    for (let k = 0; k < N; k += 1) {
      sum += dist[k]
      if (dist[k] > dmax) dmax = dist[k]
    }
    const BINS = 1024
    const hist = new Uint32Array(BINS)
    for (let k = 0; k < N; k += 1) hist[dmax > 0 ? Math.min(BINS - 1, Math.floor((dist[k] / dmax) * BINS)) : 0] += 1
    let acc = 0
    let p95 = dmax
    for (let b = 0; b < BINS; b += 1) {
      acc += hist[b]
      if (acc >= 0.95 * N) {
        p95 = ((b + 1) / BINS) * dmax
        break
      }
    }
    const pct = (x) => Number(((100 * x) / rigSize).toFixed(3))
    stats = {
      ...stats,
      sculptVerts: N,
      rigTriangles: triInst.length,
      instances: nInst,
      boundInstanced,
      meanPct: pct(sum / Math.max(N, 1)),
      p95Pct: pct(p95),
      maxPct: pct(dmax),
      creatureSize: Number(rigSize.toFixed(4)),
      bindMs: Number((performance.now() - t0).toFixed(1)),
    }
    bound = true
    return stats
  }

  // the instance matrix (mesh space) of instance g, as a 16-element column-major array
  function instMatrixAt(g, dst) {
    // instM holds the group-frame matrix; the group-frame matrix is what the inverse needs
    for (let c = 0; c < 4; c += 1) {
      for (let r = 0; r < 3; r += 1) dst[c * 4 + r] = instM[g * 12 + c * 3 + r]
    }
    dst[3] = 0
    dst[7] = 0
    dst[11] = 0
    dst[15] = 1
    return dst
  }

  // ---- per frame -----------------------------------------------------------
  function update() {
    if (!bound || disposed) return
    refresh()
    for (let k = 0; k < N; k += 1) {
      const g = bInst[k]
      if (g < 0) {
        const ia = 3 * bIdx[3 * k]
        const ib = 3 * bIdx[3 * k + 1]
        const ic = 3 * bIdx[3 * k + 2]
        const ax = cur[ia]
        const ay = cur[ia + 1]
        const az = cur[ia + 2]
        const bx = cur[ib]
        const by = cur[ib + 1]
        const bz = cur[ib + 2]
        const cx = cur[ic]
        const cy = cur[ic + 1]
        const cz = cur[ic + 2]
        let ex = bx - ax
        let ey = by - ay
        let ez = bz - az
        const el = Math.sqrt(ex * ex + ey * ey + ez * ez)
        if (el > 1e-12) {
          ex /= el
          ey /= el
          ez /= el
        } else {
          ex = 0
          ey = 0
          ez = 0
        }
        const t2x = cx - ax
        const t2y = cy - ay
        const t2z = cz - az
        let nx = ey * t2z - ez * t2y
        let ny = ez * t2x - ex * t2z
        let nz = ex * t2y - ey * t2x
        const nl = Math.sqrt(nx * nx + ny * ny + nz * nz)
        if (nl > 1e-12) {
          nx /= nl
          ny /= nl
          nz /= nl
        } else {
          nx = 0
          ny = 0
          nz = 0
        }
        const tx = ny * ez - nz * ey
        const ty = nz * ex - nx * ez
        const tz = nx * ey - ny * ex
        const u = bW[2 * k]
        const v = bW[2 * k + 1]
        const w = 1 - u - v
        const p1 = bOff[3 * k]
        const p2 = bOff[3 * k + 1]
        const d = bOff[3 * k + 2]
        out[3 * k] = u * ax + v * bx + w * cx + p1 * ex + p2 * tx + d * nx
        out[3 * k + 1] = u * ay + v * by + w * cy + p1 * ey + p2 * ty + d * ny
        out[3 * k + 2] = u * az + v * bz + w * cz + p1 * ez + p2 * tz + d * nz
      } else {
        const o = g * 12
        const qx = bLoc[3 * k]
        const qy = bLoc[3 * k + 1]
        const qz = bLoc[3 * k + 2]
        out[3 * k] = instM[o] * qx + instM[o + 3] * qy + instM[o + 6] * qz + instM[o + 9]
        out[3 * k + 1] = instM[o + 1] * qx + instM[o + 4] * qy + instM[o + 7] * qz + instM[o + 10]
        out[3 * k + 2] = instM[o + 2] * qx + instM[o + 5] * qy + instM[o + 8] * qz + instM[o + 11]
      }
    }
    posAttr.needsUpdate = true
  }

  function dispose() {
    disposed = true
    bound = false
    bIdx = null
    bW = null
    bOff = null
    bInst = null
    bLoc = null
    grid = null
    triV = null
    triId = null
    triInst = null
    stamp = null
    sampO = null
    sampQ = null
  }

  // runs a generator to its end in one go
  const runAll = (gen) => {
    let r = gen.next()
    while (!r.done) r = gen.next()
    return r.value
  }
  function align() {
    return runAll(alignSteps())
  }
  function bind() {
    return runAll(bindSteps())
  }
  // the fit in turns: step(budgetMs) works for about that long, then returns; true once the fit is done
  function fitSteps() {
    const gen = (function* fitGen() {
      yield* alignSteps()
      yield* bindSteps()
    })()
    let finished = false
    return {
      step(budgetMs) {
        if (finished) return true
        sliceT = performance.now()
        sliceMs = budgetMs
        const r = gen.next()
        if (r.done) finished = true
        return finished
      },
    }
  }
  function fit() {
    const job = fitSteps()
    while (!job.step(Infinity));
    return stats
  }

  return {
    fit,
    fitSteps,
    align,
    bind,
    update,
    dispose,
    get stats() {
      return stats
    },
  }
}
