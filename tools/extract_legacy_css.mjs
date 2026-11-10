// One-off for the v6 redesign: pull the rules for the two components that keep
// their old markup (KnowledgeGraph `.star-map*`, ChatWidget `.chat-*`) out of the
// old monolithic stylesheet, so the rest of it can be replaced.
//   node tools/extract_legacy_css.mjs <old-style.css> <out.css>
import fs from 'node:fs'

const [, , inFile, outFile] = process.argv
const css = fs.readFileSync(inFile, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
const KEEP = /\.star-map|\.chat-/

// Split a block body into top-level `prelude { body }` pairs.
function blocks(text) {
  const out = []
  let i = 0
  while (i < text.length) {
    const open = text.indexOf('{', i)
    if (open === -1) break
    let depth = 1
    let j = open + 1
    while (j < text.length && depth > 0) {
      if (text[j] === '{') depth += 1
      else if (text[j] === '}') depth -= 1
      j += 1
    }
    const prelude = text.slice(i, open).trim()
    out.push({ prelude: prelude.slice(prelude.lastIndexOf(';') + 1).trim(), body: text.slice(open + 1, j - 1) })
    i = j
  }
  return out
}

const keyframes = new Map()
const kept = []

for (const b of blocks(css)) {
  if (/^@keyframes/.test(b.prelude)) {
    keyframes.set(b.prelude.split(/\s+/)[1], b)
  } else if (/^@(media|supports)/.test(b.prelude)) {
    const inner = blocks(b.body).filter((r) => KEEP.test(r.prelude))
    if (inner.length) {
      kept.push(`${b.prelude} {\n${inner.map((r) => `  ${r.prelude} {${r.body}}`).join('\n')}\n}`)
    }
  } else if (KEEP.test(b.prelude)) {
    // a selector list may mix kept and dropped selectors: keep only ours
    const selectors = b.prelude.split(',').map((s) => s.trim()).filter((s) => KEEP.test(s))
    kept.push(`${selectors.join(',\n')} {${b.body}}`)
  }
}

let out = kept.join('\n\n')
const used = [...keyframes.keys()].filter((name) => new RegExp(`\\b${name}\\b`).test(out))
out += '\n\n' + used.map((n) => `@keyframes ${n} {${keyframes.get(n).body}}`).join('\n\n') + '\n'

fs.writeFileSync(outFile, out)
console.log(`kept ${kept.length} rule blocks, ${used.length} keyframes -> ${outFile} (${out.length} bytes)`)
