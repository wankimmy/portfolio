/**
 * Material and light rig for the hero dragon.
 *
 * The GLB (tools/build_hero_dragon_v5.py) carries a baked scaled hide: albedo,
 * ORM and a tangent normal map baked against the flat low-poly faces. The mesh
 * ships without normals, so every material stays flat-shaded: the fragment
 * shader derives the face normal (still correct while the wings morph) and the
 * normal map puts the smooth hi-res surface and the scales back on top.
 */

const EYE_GLOW = [0.55, 2.6, 3.4] // HDR cyan: bright enough for the bloom pass to pick up
const BODY_TINT = 0xc4cfe8 // takes the chalk out of the pale plates
const MEMBRANE_TINT = 0xb4bfdc
const RIM = 0x6fd2ff

export function isEyeMesh(mesh) {
  const n = (mesh.name || '').toLowerCase()
  if (n.includes('eye')) return true
  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
  return mats.some((m) => m && (m.name || '').toLowerCase().includes('eye'))
}

const isMembrane = (mat) => /membrane|wing/i.test(mat?.name || '')

/** Soft studio reflections so the scales have something to catch. */
export async function createEnvironment(renderer, THREE) {
  const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
  const pmrem = new THREE.PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const envMap = pmrem.fromScene(room, 0.04).texture
  room.dispose?.()
  return {
    envMap,
    dispose() {
      envMap.dispose()
      pmrem.dispose()
    },
  }
}

/**
 * @param {import('three').Object3D} root
 * @param {typeof import('three')} THREE
 * @param {{ envMap: import('three').Texture, lite: boolean }} opts lite = phone build: no clearcoat or iridescence
 */
export function applyHideMaterials(root, THREE, { envMap, lite }) {
  root.traverse((child) => {
    if (!child.isMesh || !child.material) return
    const eye = isEyeMesh(child)
    const sources = Array.isArray(child.material) ? child.material : [child.material]

    const next = sources.map((src) => {
      if (eye) {
        const mat = new THREE.MeshBasicMaterial()
        mat.color.setRGB(...EYE_GLOW)
        mat.name = 'DragonEye'
        return mat
      }

      const membrane = isMembrane(src)
      const mat = new THREE.MeshPhysicalMaterial({
        color: membrane ? MEMBRANE_TINT : BODY_TINT,
        map: src.map,
        aoMap: src.aoMap,
        aoMapIntensity: membrane ? 0.75 : 1,
        roughnessMap: src.roughnessMap,
        roughness: 1, // the baked channel already holds 0.36 (plate) to 0.72 (groove)
        metalness: membrane ? 0 : 0.1,
        normalMap: src.normalMap,
        flatShading: true,
        side: membrane ? THREE.DoubleSide : THREE.FrontSide,
        envMap,
        envMapIntensity: membrane ? 0.3 : 0.45,
      })
      // GLTFLoader already flipped Y for derivative tangents: reuse its scale
      if (src.normalMap) mat.normalScale.copy(src.normalScale)

      if (membrane) {
        // thin skin lit from behind: a cool sheen and a faint inner glow
        mat.sheen = 0.4
        mat.sheenColor = new THREE.Color(RIM)
        mat.sheenRoughness = 0.5
        mat.emissive = new THREE.Color(0x122a4a)
        mat.emissiveIntensity = 0.22
      } else if (!lite) {
        // pearl: a thin wet coat and a little colour shift across each plate
        mat.clearcoat = 0.38
        mat.clearcoatRoughness = 0.42
        mat.iridescence = 0.42
        mat.iridescenceIOR = 1.32
        mat.iridescenceThicknessRange = [140, 420]
      }
      mat.name = src.name
      return mat
    })

    sources.forEach((m) => m?.dispose?.())
    child.material = next.length === 1 ? next[0] : next
    child.castShadow = !eye
    child.receiveShadow = !eye
  })
}

/**
 * Moonlit rig: one warm key that casts the only shadow, two cool rims from
 * behind for the wing edges, and a low gold kicker that ties the animal to the
 * page accent.
 */
export function createLightRig(THREE, { lite }) {
  const group = new THREE.Group()
  group.add(new THREE.HemisphereLight(0x8fb2ff, 0x0a0f1e, 0.38))

  const key = new THREE.DirectionalLight(0xfff3e2, 2.1)
  key.position.set(-2.6, 3.4, 3.2)
  key.castShadow = true
  const size = lite ? 1024 : 2048
  key.shadow.mapSize.set(size, size)
  key.shadow.camera.left = -1.7
  key.shadow.camera.right = 1.7
  key.shadow.camera.top = 1.7
  key.shadow.camera.bottom = -1.7
  key.shadow.camera.near = 0.5
  key.shadow.camera.far = 12
  key.shadow.bias = -0.0004
  key.shadow.normalBias = 0.02

  const rim = new THREE.DirectionalLight(RIM, 2.6)
  rim.position.set(1.4, 1.6, -3.4)

  const rimLow = new THREE.DirectionalLight(0x3d7dff, 1.5)
  rimLow.position.set(-2.4, -0.8, -2.6)

  const kicker = new THREE.DirectionalLight(0xd9b24a, 0.5)
  kicker.position.set(2.2, -2.4, 1.6)

  // The group follows the dragon's position and size (never its rotation), so
  // the animal is lit the same wherever it perches and stays inside the
  // shadow frustum. Targets live in the group for the same reason.
  for (const light of [key, rim, rimLow, kicker]) {
    group.add(light)
    group.add(light.target)
  }

  /** Shadow frustum is not scaled by the parent: resize it with the dragon. */
  const fitShadow = (scale) => {
    const half = 1.7 * scale
    const cam = key.shadow.camera
    cam.left = -half
    cam.right = half
    cam.top = half
    cam.bottom = -half
    cam.near = 0.5 * scale
    cam.far = 12 * scale
    cam.updateProjectionMatrix()
    key.shadow.normalBias = 0.02 * scale
  }

  return { group, fitShadow }
}
