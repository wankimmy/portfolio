// Phone check for the creatures: at every stop where one has the stage, nothing of
// it (body or signature move) may sit on the header or on any piece of copy, and
// while it is idle the whole animal must be on screen.
//
//   node tools/audit_phone.mjs [baseUrl] [sizes] [stops]
//   sizes: comma list of WxH (default: six phones from 320 to 430 wide)
//   stops: comma list of home,encounter-naga,encounter-whale,encounter-phoenix,contact
//
// It opens the site with ?mask=1 (createWorld.js draws the creatures alone on
// black), reads the canvas pixel by pixel and compares it with the boxes of the
// header and of every visible piece of text. Exits 1 if anything overlaps.
// Run it against the built preview (port 4173), not the dev server.
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const base = process.argv[2] || 'http://localhost:4173'
const sizes = (process.argv[3] || '320x568,360x640,375x667,390x844,412x915,430x932').split(',').map((s) => s.split('x').map(Number))
const stops = (process.argv[4] || 'home,encounter-naga,encounter-whale,encounter-phoenix,contact').split(',')
const { chromium } = createRequire(path.join(here, '..', '..', 'sepang-rush', 'package.json'))('playwright')

const ACTOR = { home: 'dragon', contact: 'dragon', 'encounter-naga': 'naga', 'encounter-whale': 'whale', 'encounter-phoenix': 'phoenix' }
const COPY = 'h1, h2, h3, p, li, dt, dd, a, button, .label'

/** Runs in the page: where the creature's pixels are, and which boxes they touch. */
const measure = ({ selector }) => {
  const gl = document.querySelector('.world__canvas')
  const w = window.innerWidth
  const h = window.innerHeight
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const ctx = cv.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(gl, 0, 0, w, h)
  const px = ctx.getImageData(0, 0, w, h).data
  const lit = (x, y) => {
    const i = (y * w + x) * 4
    return px[i] > 14 || px[i + 1] > 14 || px[i + 2] > 14
  }
  let minX = w
  let minY = h
  let maxX = -1
  let maxY = -1
  let count = 0
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (!lit(x, y)) continue
      count += 1
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  const inside = (r) => {
    let n = 0
    const x0 = Math.max(0, Math.floor(r.left))
    const x1 = Math.min(w, Math.ceil(r.right))
    const y0 = Math.max(0, Math.floor(r.top))
    const y1 = Math.min(h, Math.ceil(r.bottom))
    for (let y = y0; y < y1; y += 1) for (let x = x0; x < x1; x += 1) if (lit(x, y)) n += 1
    return n
  }
  const hits = []
  const nav = document.querySelector('.nav')
  if (nav) {
    const n = inside(nav.getBoundingClientRect())
    if (n > 8) hits.push({ what: 'header', pixels: n })
  }
  // text boxes: the lines of text themselves, not the block they sit in
  const seen = new Set()
  for (const el of document.querySelectorAll(selector)) {
    if (el.closest('.nav, .menu, .title-screen, [aria-hidden="true"]')) continue
    const style = getComputedStyle(el)
    if (style.visibility === 'hidden' || Number(style.opacity) < 0.05 || style.display === 'none') continue
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    if (!own && !el.matches('a.btn, button')) continue
    const range = document.createRange()
    range.selectNodeContents(el)
    const rects = el.matches('a.btn, button') ? [el.getBoundingClientRect()] : [...range.getClientRects()]
    let n = 0
    for (const r of rects) {
      if (r.bottom < 0 || r.top > h || r.width < 2 || r.height < 2) continue
      n += inside(r)
    }
    const key = (el.textContent.trim() || el.getAttribute('aria-label') || el.className || el.tagName).slice(0, 40)
    if (n > 8 && !seen.has(key)) {
      seen.add(key)
      hits.push({ what: `"${key}"`, pixels: n })
    }
  }
  return { count, box: count ? [minX, minY, maxX, maxY] : null, hits, w, h }
}

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
let failures = 0

for (const [width, height] of sizes) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: true, isMobile: true })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(`${base}/?intro=0&mask=1`, { waitUntil: 'load' })
  await page.waitForFunction(() => window.__world, null, { timeout: 60000 })
  // every creature built, and any model that loads late swapped in
  await page.waitForFunction(() => ['naga', 'whale', 'phoenix'].every((n) => window.__world.actors[n].creature), null, { timeout: 90000 }).catch(() => {})
  await page.evaluate(async () => {
    await Promise.all(Object.values(window.__world.actors).map((a) => a.creature?.ready).filter(Boolean))
  })
  // the page's copy must not show in the canvas read, and the veil must not dim it
  await page.addStyleTag({ content: '.world__veil { display: none !important; }' })

  for (const stop of stops) {
    const views = stop === 'home' ? ['rest'] : stop === 'contact' ? ['end', 'entering'] : ['middle', 'entering', 'leaving']
    for (const view of views) {
      const placed = await page.evaluate(
        ({ stop, view }) => {
          const el = document.getElementById(stop)
          if (!el || !el.getClientRects().length) return false
          const rect = el.getBoundingClientRect()
          const top = rect.top + window.scrollY
          const vh = window.innerHeight
          let y = 0
          if (stop === 'home') y = 0
          else if (stop === 'contact') y = view === 'end' ? document.documentElement.scrollHeight : top - vh * 0.35
          else if (view === 'middle') y = top - (vh - rect.height) / 2
          else if (view === 'entering') y = top - vh * 0.45
          else y = top + rect.height - vh * 0.62
          window.scrollTo(0, Math.max(0, y))
          return true
        },
        { stop, view },
      )
      if (!placed) {
        console.log(`${width}x${height} ${stop}: not on the page`)
        continue
      }
      await page.waitForTimeout(2600)

      const worst = { idleHits: new Map(), actHits: new Map(), cut: 0, empty: 0, samples: 0 }
      const sample = async (phase) => {
        const m = await page.evaluate(measure, { selector: COPY })
        worst.samples += 1
        if (!m.count) worst.empty += 1
        const into = phase === 'idle' ? worst.idleHits : worst.actHits
        for (const hit of m.hits) into.set(hit.what, Math.max(into.get(hit.what) || 0, hit.pixels))
        // idle and in the middle of its band: the whole animal must be on screen
        if (phase === 'idle' && m.box && (view === 'middle' || view === 'rest' || view === 'end')) {
          if (m.box[0] <= 0 || m.box[2] >= m.w - 1) worst.cut += 1
        }
      }
      for (let i = 0; i < 4; i += 1) {
        await sample('idle')
        await page.waitForTimeout(280)
      }
      await page.evaluate((name) => window.__world.act(name), ACTOR[stop])
      for (let i = 0; i < 20; i += 1) {
        await page.waitForTimeout(280)
        await sample('act')
      }
      await page.waitForTimeout(600)

      const list = (map) => [...map].map(([what, n]) => `${what} (${n}px)`).join(', ')
      const bad = worst.idleHits.size + worst.actHits.size + worst.cut
      failures += bad ? 1 : 0
      console.log(
        `${width}x${height} ${stop}/${view}: ${bad ? 'FAIL' : 'ok'}` +
          (worst.idleHits.size ? `\n    idle creature on: ${list(worst.idleHits)}` : '') +
          (worst.actHits.size ? `\n    during its move on: ${list(worst.actHits)}` : '') +
          (worst.cut ? `\n    cut off at the side of the screen in ${worst.cut} of 4 idle frames` : '') +
          (worst.empty === worst.samples ? '\n    note: no creature on screen at all' : ''),
      )
    }
  }
  if (errors.length) console.log(`${width}x${height}: page errors ${errors.length}: ${errors[0].slice(0, 160)}`)
  await context.close()
}

await browser.close()
console.log(failures ? `\n${failures} stop(s) with an overlap or a cut-off creature` : '\nno overlaps: every creature and every move stays clear of the header and the copy')
process.exit(failures ? 1 : 0)
