/**
 * The hero dragon as an actor: loads the baked GLB (tools/build_hero_dragon_v5.py),
 * dresses it and flies it. Same contract as the creatures built in code beside it.
 */
import { applyHideMaterials } from '../dragonLook.js'
import { createFlight } from '../dragonFlight.js'

const FLAP_HEADROOM = 1.35 // raised wings stand this much taller than the rest pose
// How far the animal reaches above and below its centre at the top of a hard
// wing beat, in model units (wingspan 2), read off the test stage at energy 1.
// The raised tips go far higher than the feet hang, so a box fit centres this
// envelope, not the rest pose.
const REACH = { up: 0.9, down: 0.46 }

/**
 * @param {typeof import('three')} THREE
 * @param {{ envMap: import('three').Texture, lite: boolean, modelUrl: string, onProgress?: (ratio: number) => void }} options
 */
export async function createCreature(THREE, { envMap, lite, modelUrl, onProgress = () => {} }) {
  const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/loaders/DRACOLoader.js'),
  ])
  const draco = new DRACOLoader()
  draco.setDecoderPath('/draco/')
  const loader = new GLTFLoader()
  loader.setDRACOLoader(draco)
  const gltf = await new Promise((resolve, reject) => {
    loader.load(
      modelUrl,
      resolve,
      (e) => {
        if (e.lengthComputable && e.total > 0) onProgress(Math.min(1, e.loaded / e.total))
      },
      reject,
    )
  })
  draco.dispose()

  const model = gltf.scene
  applyHideMaterials(model, THREE, { envMap, lite })

  // Rest-pose bounds only: Box3.setFromObject also swallows every wing shape,
  // which inflates the box by the whole flap and shrinks the fit.
  model.updateMatrixWorld(true)
  const box = new THREE.Box3()
  const part = new THREE.Box3()
  model.traverse((child) => {
    if (!child.isMesh) return
    part.setFromBufferAttribute(child.geometry.attributes.position).applyMatrix4(child.matrixWorld)
    box.union(part)
  })
  const size = box.getSize(new THREE.Vector3())
  model.position.sub(box.getCenter(new THREE.Vector3()))

  const body = new THREE.Group()
  body.add(model)
  const group = new THREE.Group()
  group.add(body)
  const flight = createFlight(model, body)

  return {
    group,
    size: { x: size.x, y: size.y * FLAP_HEADROOM },
    reach: REACH,
    update: (_time, dt, energy) => flight.update(dt, energy),
    dispose() {},
  }
}
