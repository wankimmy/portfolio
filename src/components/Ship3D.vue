<template>
  <div ref="containerRef" class="ship-container cursor-grab active:cursor-grabbing">
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const containerRef = ref(null)
let scene = null
let camera = null
let renderer = null
let controls = null
let shipGroup = null
let waterMesh = null
let frameId = null
let clock = null

const WOOD_DARK = 0x5D3A1A
const WOOD_MED = 0x8B5E34
const WOOD_LIGHT = 0xA67C52
const SAIL_WHITE = 0xFFF8E7
const FLAG_RED = 0xCC0000
const GOLD = 0xF5C518
const OCEAN_COLOR = 0x0EA5E9
const OCEAN_DEEP = 0x0369A1

const buildShip = () => {
  const ship = new THREE.Group()

  const matDark = new THREE.MeshPhongMaterial({ color: WOOD_DARK })
  const matMed = new THREE.MeshPhongMaterial({ color: WOOD_MED })
  const matLight = new THREE.MeshPhongMaterial({ color: WOOD_LIGHT })
  const matSail = new THREE.MeshPhongMaterial({ color: SAIL_WHITE, side: THREE.DoubleSide })
  const matFlag = new THREE.MeshPhongMaterial({ color: FLAG_RED, side: THREE.DoubleSide })
  const matGold = new THREE.MeshPhongMaterial({ color: GOLD })

  // Hull - box with tapered bow and keel
  const hullGeo = new THREE.BoxGeometry(2.2, 1.0, 5.0, 4, 2, 8)
  const pos = hullGeo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)

    if (z < -1.0) {
      const t = Math.pow((-z - 1.0) / 1.5, 0.8) * 0.75
      x *= (1 - t)
    }
    if (z > 1.5) {
      x *= 1 - ((z - 1.5) / 1.0) * 0.2
    }
    if (y < 0) {
      x *= 1 - (-y / 0.5) * 0.35
    }
    pos.setX(i, x)
  }
  hullGeo.computeVertexNormals()
  const hull = new THREE.Mesh(hullGeo, matDark)
  hull.position.y = -0.1
  ship.add(hull)

  // Hull accent stripe
  const stripeGeo = new THREE.BoxGeometry(2.25, 0.12, 4.5)
  const stripePos = stripeGeo.attributes.position
  for (let i = 0; i < stripePos.count; i++) {
    let x = stripePos.getX(i)
    const z = stripePos.getZ(i)
    if (z < -0.8) {
      x *= 1 - Math.pow((-z - 0.8) / 1.45, 0.8) * 0.7
    }
    stripePos.setX(i, x)
  }
  stripeGeo.computeVertexNormals()
  const stripe = new THREE.Mesh(stripeGeo, new THREE.MeshPhongMaterial({ color: FLAG_RED }))
  stripe.position.y = 0.15
  ship.add(stripe)

  // Deck
  const deckGeo = new THREE.BoxGeometry(1.9, 0.08, 4.0)
  const deckPos = deckGeo.attributes.position
  for (let i = 0; i < deckPos.count; i++) {
    let x = deckPos.getX(i)
    const z = deckPos.getZ(i)
    if (z < -0.5) {
      x *= 1 - Math.pow((-z - 0.5) / 1.5, 0.8) * 0.65
    }
    deckPos.setX(i, x)
  }
  deckGeo.computeVertexNormals()
  const deck = new THREE.Mesh(deckGeo, matLight)
  deck.position.y = 0.45
  ship.add(deck)

  // Stern cabin
  const cabinGeo = new THREE.BoxGeometry(1.5, 0.9, 1.2)
  const cabin = new THREE.Mesh(cabinGeo, matMed)
  cabin.position.set(0, 0.9, 1.6)
  ship.add(cabin)

  // Cabin roof
  const roofGeo = new THREE.BoxGeometry(1.7, 0.08, 1.4)
  const roof = new THREE.Mesh(roofGeo, matDark)
  roof.position.set(0, 1.4, 1.6)
  ship.add(roof)

  // Cabin windows
  const windowMat = new THREE.MeshPhongMaterial({ color: 0x87CEEB, emissive: 0x204060 })
  for (let wx = -0.4; wx <= 0.4; wx += 0.4) {
    const winGeo = new THREE.BoxGeometry(0.18, 0.18, 0.02)
    const win = new THREE.Mesh(winGeo, windowMat)
    win.position.set(wx, 0.9, 2.21)
    ship.add(win)
  }

  // Main mast
  const mastGeo = new THREE.CylinderGeometry(0.06, 0.09, 3.5, 8)
  const mast = new THREE.Mesh(mastGeo, matDark)
  mast.position.set(0, 2.2, -0.3)
  ship.add(mast)

  // Crow's nest
  const nestGeo = new THREE.CylinderGeometry(0.3, 0.25, 0.15, 12)
  const nest = new THREE.Mesh(nestGeo, matMed)
  nest.position.set(0, 3.6, -0.3)
  ship.add(nest)

  // Yard (cross beam)
  const yardGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.2, 6)
  const yard = new THREE.Mesh(yardGeo, matDark)
  yard.rotation.z = Math.PI / 2
  yard.position.set(0, 2.8, -0.3)
  ship.add(yard)

  // Lower yard
  const yard2 = yard.clone()
  yard2.position.set(0, 1.5, -0.3)
  yard2.scale.set(0.85, 0.85, 0.85)
  ship.add(yard2)

  // Main sail
  const sailGeo = new THREE.PlaneGeometry(2.0, 1.2, 8, 4)
  const sailPos = sailGeo.attributes.position
  for (let i = 0; i < sailPos.count; i++) {
    const x = sailPos.getX(i)
    const y = sailPos.getY(i)
    sailPos.setZ(i, Math.sin(x * 1.5) * 0.15 + Math.cos(y * 2) * 0.05)
  }
  sailGeo.computeVertexNormals()
  const sail = new THREE.Mesh(sailGeo, matSail)
  sail.position.set(0, 2.15, -0.3)
  ship.add(sail)

  // Fore mast (shorter)
  const foreMastGeo = new THREE.CylinderGeometry(0.05, 0.07, 2.5, 8)
  const foreMast = new THREE.Mesh(foreMastGeo, matDark)
  foreMast.position.set(0, 1.7, -1.5)
  ship.add(foreMast)

  // Fore yard
  const foreYardGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.6, 6)
  const foreYard = new THREE.Mesh(foreYardGeo, matDark)
  foreYard.rotation.z = Math.PI / 2
  foreYard.position.set(0, 2.4, -1.5)
  ship.add(foreYard)

  // Fore sail
  const foreSailGeo = new THREE.PlaneGeometry(1.4, 1.0, 6, 3)
  const fsp = foreSailGeo.attributes.position
  for (let i = 0; i < fsp.count; i++) {
    fsp.setZ(i, Math.sin(fsp.getX(i) * 1.8) * 0.1)
  }
  foreSailGeo.computeVertexNormals()
  const foreSail = new THREE.Mesh(foreSailGeo, matSail)
  foreSail.position.set(0, 1.85, -1.5)
  ship.add(foreSail)

  // Bowsprit
  const bowGeo = new THREE.CylinderGeometry(0.04, 0.03, 1.8, 6)
  const bowsprit = new THREE.Mesh(bowGeo, matDark)
  bowsprit.rotation.x = -Math.PI / 5
  bowsprit.position.set(0, 0.5, -3.1)
  ship.add(bowsprit)

  // Lion figurehead (simplified as golden sphere + cone)
  const headGeo = new THREE.SphereGeometry(0.2, 10, 10)
  const head = new THREE.Mesh(headGeo, matGold)
  head.position.set(0, 0.25, -3.8)
  ship.add(head)
  const maneGeo = new THREE.ConeGeometry(0.28, 0.35, 8)
  const mane = new THREE.Mesh(maneGeo, matGold)
  mane.rotation.x = Math.PI / 2
  mane.position.set(0, 0.25, -3.65)
  ship.add(mane)

  // Jolly Roger flag at top
  const flagGeo = new THREE.PlaneGeometry(0.6, 0.4, 4, 2)
  const flagPos = flagGeo.attributes.position
  for (let i = 0; i < flagPos.count; i++) {
    const x = flagPos.getX(i)
    flagPos.setZ(i, Math.sin(x * 4) * 0.04)
  }
  flagGeo.computeVertexNormals()
  const flag = new THREE.Mesh(flagGeo, matFlag)
  flag.position.set(0.35, 3.85, -0.3)
  ship.add(flag)

  // Railing posts
  const postMat = matDark
  const railPositions = []
  for (let z = -2.0; z <= 2.0; z += 0.5) {
    railPositions.push([-0.9, z], [0.9, z])
  }
  railPositions.forEach(([x, z]) => {
    const pGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4)
    const p = new THREE.Mesh(pGeo, postMat)
    p.position.set(x, 0.7, z)
    ship.add(p)
  })

  // Railing horizontal bars
  const railGeo = new THREE.CylinderGeometry(0.015, 0.015, 4.0, 4)
  const railL = new THREE.Mesh(railGeo, postMat)
  railL.position.set(-0.9, 0.85, 0)
  ship.add(railL)
  const railR = railL.clone()
  railR.position.set(0.9, 0.85, 0)
  ship.add(railR)

  return ship
}

const createOcean = () => {
  const geo = new THREE.PlaneGeometry(30, 30, 48, 48)
  const mat = new THREE.MeshPhongMaterial({
    color: OCEAN_COLOR,
    transparent: true,
    opacity: 0.75,
    shininess: 120,
    specular: new THREE.Color(0xBAE6FD),
    side: THREE.DoubleSide,
  })
  const water = new THREE.Mesh(geo, mat)
  water.rotation.x = -Math.PI / 2
  water.position.y = -0.7
  return water
}

const init = () => {
  if (!containerRef.value) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  if (w <= 0 || h <= 0) return

  clock = new THREE.Clock()
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 200)
  camera.position.set(4, 3.5, 7)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  // Lighting - sunny day
  const ambient = new THREE.AmbientLight(0xFFF8E1, 0.6)
  scene.add(ambient)
  const sun = new THREE.DirectionalLight(0xFFFACD, 1.6)
  sun.position.set(5, 8, 3)
  scene.add(sun)
  const fill = new THREE.DirectionalLight(0x87CEEB, 0.5)
  fill.position.set(-3, 2, -2)
  scene.add(fill)
  const hemi = new THREE.HemisphereLight(0x87CEEB, OCEAN_DEEP, 0.4)
  scene.add(hemi)

  shipGroup = buildShip()
  scene.add(shipGroup)

  waterMesh = createOcean()
  scene.add(waterMesh)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 1.2, 0)
  controls.enableZoom = false
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.6
  controls.minPolarAngle = Math.PI * 0.2
  controls.maxPolarAngle = Math.PI * 0.55

  animate()
}

const animate = () => {
  frameId = requestAnimationFrame(animate)
  if (!scene || !camera || !renderer) return

  const t = clock.getElapsedTime()

  if (controls) controls.update()

  // Ship bobbing
  if (shipGroup) {
    shipGroup.position.y = Math.sin(t * 0.8) * 0.12
    shipGroup.rotation.z = Math.sin(t * 0.6) * 0.03
    shipGroup.rotation.x = Math.cos(t * 0.5) * 0.02
  }

  // Animate ocean waves
  if (waterMesh) {
    const wPos = waterMesh.geometry.attributes.position
    for (let i = 0; i < wPos.count; i++) {
      const x = wPos.getX(i)
      const y = wPos.getY(i)
      wPos.setZ(i,
        Math.sin(x * 0.4 + t * 0.8) * 0.15 +
        Math.cos(y * 0.3 + t * 0.6) * 0.1 +
        Math.sin((x + y) * 0.2 + t * 1.1) * 0.05
      )
    }
    wPos.needsUpdate = true
    waterMesh.geometry.computeVertexNormals()
  }

  renderer.render(scene, camera)
}

const resize = () => {
  if (!containerRef.value || !camera || !renderer) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

const cleanup = () => {
  if (frameId) cancelAnimationFrame(frameId)
  window.removeEventListener('resize', resize)
  if (controls) { controls.dispose(); controls = null }
  if (renderer && containerRef.value?.contains(renderer.domElement)) {
    containerRef.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
  scene = null
  camera = null
  renderer = null
  shipGroup = null
  waterMesh = null
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})

onUnmounted(cleanup)
</script>

<style scoped>
.ship-container {
  position: relative;
  display: block;
  isolation: isolate;
  width: min(340px, 88vw);
  height: min(300px, 78vw);
  min-height: 220px;
}

.ship-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  position: relative;
}

@media (min-width: 481px) {
  .ship-container {
    width: min(440px, 80vw);
    height: min(380px, 70vw);
    min-height: 300px;
  }
}

@media (min-width: 769px) {
  .ship-container {
    width: min(520px, 42vw);
    height: min(440px, 36vw);
    min-height: 340px;
  }
}
</style>
