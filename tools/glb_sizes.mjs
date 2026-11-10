// Print what takes the bytes inside a GLB: images, Draco mesh data, morph targets, animation.
//   node tools/glb_sizes.mjs <file.glb>
import fs from 'node:fs'

const file = process.argv[2]
const buf = fs.readFileSync(file)
const jsonLen = buf.readUInt32LE(12)
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'))
const views = json.bufferViews || []
const kb = (n) => `${(n / 1024).toFixed(0)} KB`

let images = 0
for (const img of json.images || []) {
  const v = views[img.bufferView]
  images += v.byteLength
  console.log(`image ${img.name || ''} ${img.mimeType} ${kb(v.byteLength)}`)
}

let draco = 0
let morph = 0
for (const mesh of json.meshes || []) {
  for (const prim of mesh.primitives) {
    const d = prim.extensions?.KHR_draco_mesh_compression
    if (d) draco += views[d.bufferView].byteLength
    for (const target of prim.targets || []) {
      for (const acc of Object.values(target)) {
        const a = json.accessors[acc]
        if (a.sparse) {
          morph += views[a.sparse.indices.bufferView].byteLength + views[a.sparse.values.bufferView].byteLength
        } else if (a.bufferView != null) {
          morph += views[a.bufferView].byteLength
        }
      }
    }
  }
}

console.log(`images total ${kb(images)}`)
console.log(`draco mesh  ${kb(draco)}`)
console.log(`morph data  ${kb(morph)} (may double-count shared sparse views)`)
console.log(`file        ${kb(buf.length)}`)
console.log(`animations  ${(json.animations || []).map((a) => `${a.name}:${a.channels.length}ch`).join(', ')}`)
console.log(`meshes      ${(json.meshes || []).map((m) => `${m.name}(${m.primitives.length} prims)`).join(', ')}`)
