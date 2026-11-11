/**
 * The hero dragon as an actor: loads the baked GLB (tools/build_hero_dragon_v5.py),
 * dresses it, flies it, and breathes fire on act(). Same contract as the
 * creatures built in code beside it.
 */
import { applyHideMaterials, isEyeMesh } from '../dragonLook.js'
import { createFlight } from '../dragonFlight.js'
import { createFire } from '../dragonFire.js'

const FLAP_HEADROOM = 1.35 // raised wings stand this much taller than the rest pose
// How far the animal reaches above and below its centre at the top of a hard
// wing beat, in model units (wingspan 2), read off the test stage at energy 1.
// The raised tips go far higher than the feet hang, so a box fit centres this
// envelope, not the rest pose.
const REACH = { up: 0.9, down: 0.46 }

const FIRE_TINT = [1.0, 0.42, 0.12] // the firelight on the pearl body
const FIRE_GLOW = 0.25 // emissive intensity added at full glow
const FIRE_TINT_MIX = 0.35 // how far the pearl leans toward the firelight at full glow
const SNOUT_TO_LIPS = [0, -0.06, -0.1] // the lips sit just under and behind the snout tip

/**
 * Where the breath leaves the dragon, in body space: the forward-most point of
 * the head (the snout tip, found from the mesh vertices near the eyes) pulled
 * down and back to the lips. Also returns the aim: from the eyes toward the snout.
 */
function findMouth(THREE, model, body) {
  body.updateMatrixWorld(true)
  model.updateMatrixWorld(true)
  const p = new THREE.Vector3()
  const eyeMid = new THREE.Vector3()
  let eyes = 0
  model.traverse((child) => {
    if (!child.isMesh || !isEyeMesh(child)) return
    child.getWorldPosition(p)
    body.worldToLocal(p)
    eyeMid.add(p)
    eyes++
  })
  if (eyes) eyeMid.multiplyScalar(1 / eyes)

  const tip = new THREE.Vector3()
  let best = -Infinity
  model.traverse((child) => {
    if (!child.isMesh || isEyeMesh(child)) return
    const attr = child.geometry?.attributes?.position
    if (!attr) return
    for (let i = 0; i < attr.count; i++) {
      p.fromBufferAttribute(attr, i).applyMatrix4(child.matrixWorld)
      body.worldToLocal(p)
      if (p.distanceTo(eyeMid) < 0.55 && p.z > best) {
        best = p.z
        tip.copy(p)
      }
    }
  })
  const mouth = tip.clone().add(new THREE.Vector3(...SNOUT_TO_LIPS))
  const forward = tip.clone().sub(eyeMid).normalize()
  // a breath that leaves a little above the snout line reads as a roar
  forward.y += 0.1
  forward.normalize()
  return { mouth, forward }
}

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
  const flight = createFlight(model, body, { width: size.x })

  // the mouth is found from the model with the body at rest, before any move turns it
  body.position.set(0, 0, 0)
  body.rotation.set(0, 0, 0)
  const { mouth, forward } = findMouth(THREE, model, body)
  const fire = createFire(THREE, { lite })
  group.add(fire.group)

  // the body's own materials, remembered so the firelight can be taken off exactly
  const glowMats = []
  model.traverse((child) => {
    if (!child.isMesh || !child.material) return
    const list = Array.isArray(child.material) ? child.material : [child.material]
    for (const mat of list) {
      if (!mat || !mat.emissive || isEyeMesh(child)) continue
      glowMats.push({ mat, base: mat.emissive.clone(), baseIntensity: mat.emissiveIntensity ?? 0 })
    }
  })
  const fireTint = new THREE.Color(FIRE_TINT[0], FIRE_TINT[1], FIRE_TINT[2])
  let glowOn = false
  const setGlow = (k) => {
    if (k > 0) {
      glowOn = true
      for (const g of glowMats) {
        g.mat.emissive.copy(g.base).lerp(fireTint, k * FIRE_TINT_MIX)
        g.mat.emissiveIntensity = g.baseIntensity + FIRE_GLOW * k
      }
    } else if (glowOn) {
      for (const g of glowMats) {
        g.mat.emissive.copy(g.base)
        g.mat.emissiveIntensity = g.baseIntensity
      }
      glowOn = false
    }
  }

  return {
    group,
    size: { x: size.x, y: size.y * FLAP_HEADROOM },
    reach: REACH,
    update(time, dt, energy, motion) {
      // motion may be undefined: then the creature assumes stillness and plenty of room (below)
      const step = Math.min(Math.max(dt, 0), 0.05)
      flight.update(step, energy, motion)
      const move = flight.move
      // the page's band, in model units from the centre: the fire and its smoke stay inside it
      const top = motion && motion.roomUp !== undefined ? motion.roomUp * size.x : Infinity
      const bottom = motion && motion.roomDown !== undefined ? -motion.roomDown * size.x : -Infinity
      fire.update(step, body, mouth, forward, move, top, bottom, time)
      setGlow(move.glow)
    },
    act() {
      if (flight.move.active) return
      fire.seed()
      flight.act()
    },
    dispose() {
      setGlow(0)
      fire.reset()
      fire.dispose()
      group.remove(fire.group)
    },
  }
}
