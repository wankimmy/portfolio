// A filmstrip of each creature's signature move as it plays on the real page.
//   node tools/shoot_moves.mjs [baseUrl] [outDir] [sizes] [stops]
// For every size and stop it scrolls there, waits for the creature to arrive
// (the page starts the move by itself about a second later) and saves six
// frames side by side: <outDir>/moves-<WxH>-<stop>.png
// Run it against the built preview (port 4173).
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const base = process.argv[2] || 'http://localhost:4173'
const outDir = path.resolve(process.argv[3] || path.join(here, '..', '.bossku', 'shots', 'moves'))
const sizes = (process.argv[4] || '390x844,1440x900').split(',').map((s) => s.split('x').map(Number))
const stops = (process.argv[5] || 'home,encounter-naga,encounter-whale,encounter-phoenix,contact').split(',')
const { chromium } = createRequire(path.join(here, '..', '..', 'sepang-rush', 'package.json'))('playwright')

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })

for (const [width, height] of sizes) {
  const phone = width < 800
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: phone, isMobile: phone })
  const page = await context.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(`${base}/?intro=0`, { waitUntil: 'load' })
  await page.waitForTimeout(7000)

  for (const stop of stops) {
    await page.evaluate((target) => {
      const el = document.getElementById(target)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const top = rect.top + window.scrollY
      if (target === 'home') {
        // leave and come back, so the hero's move starts fresh
        window.scrollTo(0, window.innerHeight * 1.6)
        setTimeout(() => window.scrollTo(0, 0), 900)
      } else if (target === 'contact') window.scrollTo(0, document.documentElement.scrollHeight)
      else window.scrollTo(0, top - (window.innerHeight - rect.height) / 2)
    }, stop)
    await page.waitForTimeout(stop === 'home' ? 3300 : 2500)

    const frames = []
    for (let i = 0; i < 6; i += 1) {
      frames.push((await page.screenshot({ type: 'jpeg', quality: 82 })).toString('base64'))
      await page.waitForTimeout(650)
    }
    const sheet = await context.newPage()
    const cell = phone ? 300 : 640
    const cols = phone ? 6 : 3
    await sheet.setViewportSize({ width: cell * cols, height: Math.ceil(6 / cols) * Math.round((cell * height) / width) })
    await sheet.setContent(
      `<body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(${cols},${cell}px)">${frames
        .map((f) => `<img src="data:image/jpeg;base64,${f}" style="width:${cell}px;display:block">`)
        .join('')}</body>`,
    )
    await sheet.screenshot({ path: path.join(outDir, `moves-${width}x${height}-${stop}.png`) })
    await sheet.close()
  }
  console.log(`${width}x${height}: console errors ${errors.length}`)
  errors.slice(0, 4).forEach((e) => console.log('   ', e.slice(0, 220)))
  await context.close()
}
await browser.close()
