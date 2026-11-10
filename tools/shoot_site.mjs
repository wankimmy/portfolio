// Screenshots of the local site for visual review, plus the social share image.
//   node tools/shoot_site.mjs [baseUrl] [outDir] [playwrightProjectDir]
// Writes phone (390x844) and desktop (1440x900) shots, first screen and full
// page, with motion on and with prefers-reduced-motion, and og-cover.jpg.
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const base = process.argv[2] || 'http://localhost:5173'
const outDir = path.resolve(process.argv[3] || path.join(here, '..', '.bossku', 'shots'))
const from = path.resolve(process.argv[4] || path.join(here, '..', '..', 'sepang-rush'))
const { chromium } = createRequire(path.join(from, 'package.json'))('playwright')

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })

const SIZES = [
  ['phone-390', 390, 844],
  ['desktop-1440', 1440, 900],
]

for (const reduced of [false, true]) {
  for (const [name, width, height] of SIZES) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      reducedMotion: reduced ? 'reduce' : 'no-preference',
      hasTouch: width < 800,
      isMobile: width < 800,
    })
    const page = await context.newPage()
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto(`${base}/?intro=0`, { waitUntil: 'load' })
    await page.waitForTimeout(reduced ? 1500 : 9000)
    const tag = `${name}${reduced ? '-reduced' : ''}`
    await page.screenshot({ path: path.join(outDir, `${tag}.png`) })
    if (reduced || width < 800) {
      // full page only where nothing is pinned or scroll-driven
      await page.screenshot({ path: path.join(outDir, `${tag}-full.png`), fullPage: true })
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    console.log(`${tag}: horizontal overflow ${overflow}px, console errors ${errors.length}`)
    errors.slice(0, 5).forEach((e) => console.log('   ', e.slice(0, 200)))
    await context.close()
  }
}

// social share image: the hero at 1200x630
const og = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
const page = await og.newPage()
await page.goto(`${base}/?intro=0`, { waitUntil: 'load' })
await page.waitForTimeout(9000)
await page.addStyleTag({ content: '.nav, .chat-widget, .hero__hint, .progress { visibility: hidden !important; }' })
await page.screenshot({ path: path.join(outDir, 'og-cover.jpg'), type: 'jpeg', quality: 84 })
console.log('og-cover.jpg written')
await browser.close()
