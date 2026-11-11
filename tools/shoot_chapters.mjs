// One screenshot per chapter per screen size, with motion on, to judge where the
// creatures sit against the copy.
//   node tools/shoot_chapters.mjs [baseUrl] [outDir] [sizes] [chapters]
//   sizes:    comma list of WxH, default 390x844,360x640,1440x900
//   chapters: comma list of section ids, default all
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const base = process.argv[2] || 'http://localhost:5173'
const outDir = path.resolve(process.argv[3] || path.join(here, '..', '.bossku', 'shots', 'chapters'))
const sizes = (process.argv[4] || '390x844,360x640,1440x900').split(',').map((s) => s.split('x').map(Number))
const ALL = [
  'home', 'about', 'encounter-naga', 'tech', 'encounter-whale', 'experience', 'projects',
  'encounter-phoenix', 'services', 'pricing', 'certificates', 'contact',
]
const chapters = process.argv[5] ? process.argv[5].split(',') : ALL
const { chromium } = createRequire(path.join(here, '..', '..', 'sepang-rush', 'package.json'))('playwright')

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })

for (const [width, height] of sizes) {
  const phone = width < 800
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    hasTouch: phone,
    isMobile: phone,
  })
  const page = await context.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(`${base}/?intro=0`, { waitUntil: 'load' })
  await page.waitForTimeout(9000)

  for (const id of chapters) {
    await page.evaluate((target) => {
      const el = document.getElementById(target)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const top = rect.top + window.scrollY
      // the last chapter rests at the very end of the page, an encounter in the
      // middle of the screen, the others a little past their top
      if (target === 'home') window.scrollTo(0, 0)
      else if (target === 'contact') window.scrollTo(0, document.documentElement.scrollHeight)
      else if (target.startsWith('encounter-')) window.scrollTo(0, top - (window.innerHeight - rect.height) / 2)
      else window.scrollTo(0, top + window.innerHeight * 0.18)
    }, id)
    await page.waitForTimeout(3600)
    await page.screenshot({ path: path.join(outDir, `${width}x${height}-${id}.png`) })
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  console.log(`${width}x${height}: horizontal overflow ${overflow}px, console errors ${errors.length}`)
  errors.slice(0, 5).forEach((e) => console.log('   ', e.slice(0, 220)))
  await context.close()
}

await browser.close()
