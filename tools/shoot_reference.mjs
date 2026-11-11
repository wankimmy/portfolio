// Save the concept picture of one creature for the 3D generator: pale faceted
// clay on a transparent ground, square (see mode=ref in tools/creature-harness.js).
//   node tools/shoot_reference.mjs <name> [extraQuery] [outFile]
//   extraQuery: for example "yaw=0.4&pitch=0.1&t=3.2&energy=1&fill=0.9&size=1536"
// Needs the dev server on http://localhost:5173.
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const [name, extra = '', outArg] = process.argv.slice(2)
if (!name) {
  console.error('usage: node tools/shoot_reference.mjs <name> [extraQuery] [outFile]')
  process.exit(2)
}
const base = process.env.HARNESS_URL || 'http://localhost:5173'
const out = path.resolve(outArg || path.join(here, 'ref', `creature-${name}-ref.png`))
const { chromium } = createRequire(path.join(here, '..', '..', 'sepang-rush', 'package.json'))('playwright')

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1600, height: 1600 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto(`${base}/tools/creature-harness.html?c=${encodeURIComponent(name)}&mode=ref${extra ? `&${extra}` : ''}`, { waitUntil: 'load' })
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 })
const failure = await page.evaluate(() => window.__error || null)
const png = await page.evaluate(() => window.__png || null)
await browser.close()

errors.slice(0, 8).forEach((e) => console.log('console error:', e.slice(0, 300)))
if (failure || !png) {
  console.log('FAILED:', (failure || 'no picture').slice(0, 600))
  process.exit(1)
}
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, Buffer.from(png.split(',')[1], 'base64'))
console.log(out)
