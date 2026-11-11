// Screenshot one creature from the dev harness (tools/creature-harness.html).
//   node tools/shoot_creature.mjs <name> [mode] [extraQuery] [outFile]
//   mode: sheet (six views, default) or strip (eight frames of one view)
//   extraQuery: for example "yaw=0.5&span=1.4&energy=1" or "lite=1"
// Needs the dev server on http://localhost:5173. Prints the stats and any
// console errors, and exits 1 when the creature failed to build.
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const [name, mode = 'sheet', extra = '', outArg] = process.argv.slice(2)
if (!name) {
  console.error('usage: node tools/shoot_creature.mjs <name> [sheet|strip] [extraQuery] [outFile]')
  process.exit(2)
}
const base = process.env.HARNESS_URL || 'http://localhost:5173'
const tag = extra ? `-${extra.replace(/[^a-z0-9.]+/gi, '_')}` : ''
const out = path.resolve(outArg || path.join(here, '..', '.bossku', 'shots', 'creatures', `${name}-${mode}${tag}.png`))
const { chromium } = createRequire(path.join(here, '..', '..', 'sepang-rush', 'package.json'))('playwright')

fs.mkdirSync(path.dirname(out), { recursive: true })
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(`${base}/tools/creature-harness.html?c=${encodeURIComponent(name)}&mode=${mode}${extra ? `&${extra}` : ''}`, {
  waitUntil: 'load',
})
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 })
const failure = await page.evaluate(() => window.__error || null)
const stats = await page.evaluate(() => window.__stats || null)
await page.locator(failure ? 'body' : '#sheet').screenshot({ path: out })
await browser.close()

console.log(out)
if (stats) console.log(JSON.stringify(stats))
errors.slice(0, 8).forEach((e) => console.log('console error:', e.slice(0, 300)))
if (failure) {
  console.log('FAILED:', failure.slice(0, 600))
  process.exit(1)
}
