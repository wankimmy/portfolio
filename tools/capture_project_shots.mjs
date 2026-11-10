// Real screenshots of the live project sites for the "Completed quests" cards.
// Owner rule: project images must be the real site, never generated artwork.
//
//   node tools/capture_project_shots.mjs <outDir> [playwrightProjectDir]
//
// Playwright is not a dependency of this repo; it is borrowed from a sibling
// project that has it installed with its browser build (default ../sepang-rush). Each page is
// shot at 1440x900 exactly as a first-time visitor sees it: nothing is clicked.
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(process.argv[2] || path.join(here, 'ref', 'project-shots'))
const from = path.resolve(process.argv[3] || path.join(here, '..', '..', 'sepang-rush'))
const { chromium } = createRequire(path.join(from, 'package.json'))('playwright')

const SITES = [
  ['binaqi', 'https://binaqi.com/'],
  ['festivent', 'https://festivent.com.my/home'],
  ['bossku-superpowers', 'https://github.com/wankimmy/Bossku-Superpowers'],
  ['putra-ai', 'https://putra.ai/'],
  ['my-fresh-storage', 'https://www.myfreshstorage.com.my/'],
  ['makanbuddy', 'https://makanbuddy.com/'],
]

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

for (const [name, url] of SITES) {
  const page = await context.newPage()
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 45000 })
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {})
    await page.waitForTimeout(2500) // entrance animations and lazy hero images
    const file = path.join(outDir, `${name}.png`)
    await page.screenshot({ path: file })
    console.log(`ok   ${name} <- ${page.url()} (${await page.title()})`)
  } catch (err) {
    console.log(`FAIL ${name} <- ${url}: ${err.message.split('\n')[0]}`)
  } finally {
    await page.close()
  }
}

await browser.close()
