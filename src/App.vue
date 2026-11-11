<template>
  <div ref="appRef" class="app">
    <a class="skip-link" href="#main">Skip to content</a>

    <TitleScreen
      v-if="titleOpen"
      :progress="loadProgress"
      :world-ready="worldReady"
      :world-failed="worldFailed"
      @enter="enter"
    />

    <!-- Night sky and its creatures. The CSS sky on .world shows until WebGL is live. -->
    <div ref="worldRef" class="world" :class="{ 'is-live': worldReady }" aria-hidden="true">
      <canvas ref="canvasRef" class="world__canvas"></canvas>
      <div class="world__veil"></div>
    </div>

    <div class="progress" aria-hidden="true"><span ref="progressRef"></span></div>

    <!-- inert while the title screen is up, so focus cannot wander behind it -->
    <div class="app__page" :inert="titleOpen">
      <SiteNav :active="activeId" />

      <!-- An encounter is a band of open sky for one creature: without the live sky it has nothing to show. -->
      <main id="main" tabindex="-1">
        <HeroSection :world-ready="worldReady" :entered="entered" />
        <AboutSection />
        <EncounterPlate v-if="encounters" creature="naga" />
        <TechSection />
        <ExperienceSection />
        <ProjectsSection />
        <EncounterPlate v-if="encounters" creature="phoenix" />
        <ServicesSection />
        <PricingSection />
        <CertificatesSection />
        <KnowledgeGraph />
      </main>

      <SiteFooter />

      <ChatWidget />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { createCinematicScroll } from './composables/useCinematicScroll.js'
import { chapters } from './content.js'
import { buildReveals } from './motion/reveals.js'
import { createWorld } from './world/createWorld.js'
import { FORMATIONS } from './world/formations.js'
import { isEncounter, OFF_SIDE, PARK, SCENE_IDS, SCENES, SIDE } from './world/scenes.js'
import TitleScreen from './components/TitleScreen.vue'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import EncounterPlate from './components/EncounterPlate.vue'
import TechSection from './components/TechSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PricingSection from './components/PricingSection.vue'
import CertificatesSection from './components/CertificatesSection.vue'
import KnowledgeGraph from './components/KnowledgeGraph.vue'
import SiteFooter from './components/SiteFooter.vue'
import ChatWidget from './components/ChatWidget.vue'

const ENTERED_KEY = 'sh-entered'
const MODEL_VERSION = 'v9'
const READING_LINE = 0.55 // the scene whose top has passed this far down the screen is the one on stage
const ENCOUNTER_LEAD = 0.3 // an encounter starts this much of a screen early, so its creature is there to meet you
const CHAPTER_IDS = new Set(chapters.map((c) => c.id))

const appRef = ref(null)
const worldRef = ref(null)
const canvasRef = ref(null)
const progressRef = ref(null)

const titleOpen = ref(false)
const entered = ref(false)
const worldReady = ref(false)
const worldFailed = ref(false)
const motionOk = ref(false)
const loadProgress = ref(0)
const activeId = ref('home')

const encounters = computed(() => motionOk.value && !worldFailed.value)

let reduceQuery = null
let scroll = null
let world = null
let motionCtx = null
let entrancePlayed = false
let wasTall = false

let actTimer = null // the next signature move of whoever has the stage
let marks = [] // scenes found on the page, top to bottom: { id, chapter, top }
let boxes = {} // scene id -> the box on the page its creature rides
let sceneId = 'home'

/** Phones and any window too narrow or too upright to share a row with a creature. */
const isTall = () => window.innerWidth <= 720 || window.innerWidth / window.innerHeight < 0.8
const sceneFor = (id) => SCENES[isTall() ? 'tall' : 'wide'][id] ?? SCENES.wide.home
const formationFor = (id) => {
  const { tall, ...wide } = FORMATIONS[id] ?? FORMATIONS.home
  return isTall() ? { ...wide, ...tall } : wide
}
const navHeight = () => document.querySelector('.nav')?.offsetHeight ?? 64

/** Put a scene on stage: its creatures fly in, the others leave, the sky dims to its level. */
const setScene = (id, duration = 1.6) => {
  const { veil, cast } = sceneFor(id)
  if (worldRef.value) {
    gsap.to(worldRef.value, { '--veil': veil, duration: Math.min(duration, 0.9), ease: 'power2.out', overwrite: 'auto' })
  }
  if (!world) return
  // The star map runs its own canvas: once everyone has left the sky, stop
  // rendering so two heavy scenes never draw at once.
  const resting = id === 'star-map'
  if (!resting) world.setVisible(true)
  world.setFormation(formationFor(id), duration > 0 ? 2 : 0)

  const tall = isTall()
  for (const [name, actor] of Object.entries(world.actors)) {
    const role = cast[name]
    if (role) {
      const { box, aim = null, ...pose } = role
      const rides = Boolean(box && boxes[id])
      if (rides) world.setBox(name, boxes[id])
      world.setAim(name, aim)
      if (rides && tall && actor.pose.show <= 0) {
        // phones: it comes in from the side, already at the height of its box
        Object.assign(actor.pose, { ...pose, x: SIDE[name] * OFF_SIDE, stage: 1 })
      }
      actor.pose.show = 1
      gsap.to(actor.pose, { ...pose, stage: rides ? 1 : 0, duration, ease: 'expo.out', overwrite: true })
    } else if (actor.pose.show > 0) {
      const leave = { duration: Math.min(duration, 1.2), ease: 'power2.in', overwrite: true, onComplete: () => (actor.pose.show = 0) }
      // phones: out sideways along its own box, never across the header or the copy
      if (tall && actor.pose.stage > 0.5) gsap.to(actor.pose, { x: SIDE[name] * OFF_SIDE, ...leave })
      else gsap.to(actor.pose, { ...PARK[name], stage: 0, ...leave })
    }
  }
  if (resting) gsap.delayedCall(Math.min(duration, 1.2) + 0.1, () => sceneId === 'star-map' && world?.setVisible(false))
  scheduleActs(id, duration)
}

/**
 * Where a creature has the stage to itself (the hero, an encounter, the last
 * screen) it performs its signature move: once it has arrived, then now and
 * again while you stay. Behind a chapter's copy it keeps still.
 */
const scheduleActs = (id, arrival) => {
  actTimer?.kill()
  actTimer = null
  // the dev mask view (tools/audit_phone.mjs) starts the moves itself
  if (new URLSearchParams(location.search).has('mask')) return
  const name = Object.keys(sceneFor(id).cast)[0]
  if (!name || !(id === 'home' || id === 'contact' || isEncounter(id))) return
  const perform = () => {
    world?.act(name)
    actTimer = gsap.delayedCall(15, perform)
  }
  actTimer = gsap.delayedCall(arrival + 1.1, perform)
}

/** Where every scene starts and where the creature boxes sit, in document pixels. */
const measureStages = () => {
  const y = window.scrollY
  const top = (el) => el.getBoundingClientRect().top + y

  marks = SCENE_IDS.map((id) => document.getElementById(id))
    .filter((el) => el && el.getClientRects().length)
    .map((el) => ({ id: el.id, chapter: el.id, top: top(el) }))
  // an encounter introduces the chapter after it, so the header already names that one
  let next = marks.at(-1)?.id ?? 'home'
  for (let i = marks.length - 1; i >= 0; i -= 1) {
    if (CHAPTER_IDS.has(marks[i].id)) next = marks[i].id
    else marks[i].chapter = next
  }

  boxes = {}
  document.querySelectorAll('[data-stage]').forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) return
    const id = el.dataset.stage
    // A box scrolls with the page. Where it slides up under the header the creature keeps
    // below that line, shrinking with what is left of the box, so it never sits under the
    // header or over the copy that follows.
    boxes[id] = { left: rect.left, top: rect.top + y, width: rect.width, height: rect.height, clipTop: navHeight() + 8 }
    // phones: the chat button floats at the foot of the screen, and the copy sits right under
    // the box, so the creature is fenced into its box (createWorld.js, setGuard)
    if (isTall()) Object.assign(boxes[id], { clipBottom: window.innerHeight - 84, guard: true })
  })

  if (!world) return
  for (const [name, role] of Object.entries(sceneFor(sceneId).cast)) {
    if (role.box && boxes[sceneId]) world.setBox(name, boxes[sceneId])
  }
}

const sceneAt = () => {
  const screen = window.innerHeight
  const line = window.scrollY + screen * READING_LINE
  let current = marks[0]
  for (const mark of marks) {
    if (mark.top - (isEncounter(mark.id) ? screen * ENCOUNTER_LEAD : 0) > line) break
    current = mark
  }
  return current
}

const updateScene = () => {
  if (!marks.length) return
  const mark = sceneAt()
  activeId.value = mark.chapter
  if (mark.id === sceneId) return
  sceneId = mark.id
  if (entrancePlayed || !worldReady.value) setScene(sceneId)
}

const playEntrance = () => {
  if (entrancePlayed || !world || !worldReady.value || !entered.value) return
  entrancePlayed = true
  // every creature starts parked off stage, so the first scene is also the fly-in
  setScene(sceneId, sceneId === 'home' ? 1.4 : 0)
}

const lockScroll = (locked) => {
  document.documentElement.classList.toggle('is-locked', locked)
  if (locked) scroll?.lenis.stop()
  else scroll?.lenis.start()
}

const scrollTo = (top, smooth = false) => {
  if (scroll) scroll.lenis.scrollTo(top, smooth ? { duration: 0.6 } : { immediate: true, force: true })
  else window.scrollTo({ top, behavior: 'instant' })
}

const navigate = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  if (scroll) scroll.lenis.scrollTo(target, { duration: 1.4 })
  else target.scrollIntoView()
  history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`)
}

/**
 * Run a change that reflows the page (a row opening while another closes) and
 * keep `anchor` where the visitor's finger left it. If the anchor then runs off
 * the bottom of the screen, bring as much of it into view as fits.
 */
const reflow = async (anchor, change) => {
  const before = anchor.getBoundingClientRect().top
  change()
  await nextTick()
  const shift = anchor.getBoundingClientRect().top - before
  if (Math.abs(shift) > 1) scrollTo(window.scrollY + shift)
  // the page changed height: every trigger and box below has moved
  ScrollTrigger.refresh()

  const rect = anchor.getBoundingClientRect()
  const over = rect.bottom - (window.innerHeight - 16)
  const room = rect.top - (navHeight() + 12)
  if (over > 1 && room > 1) scrollTo(window.scrollY + Math.min(over, room), true)
}

provide('site', {
  worldReady,
  lockScroll,
  navigate,
  reflow,
  /** Hand an element to a creature as its drag handle. Returns an unbind. */
  bindDrag: (el, name = 'dragon') => world?.bindDrag(el, name) ?? (() => {}),
})

const enter = () => {
  titleOpen.value = false
  entered.value = true
  try {
    sessionStorage.setItem(ENTERED_KEY, '1')
  } catch {
    /* private mode: the title screen simply shows again next load */
  }
  lockScroll(false)
  playEntrance()
}

const onScroll = (lenis) => {
  ScrollTrigger.update()
  const progress = lenis.limit > 0 ? lenis.scroll / lenis.limit : 0
  if (progressRef.value) progressRef.value.style.transform = `scaleX(${progress})`
  world?.setScroll(progress, lenis.velocity / 45)
  updateScene()
}

/** ScrollTrigger refreshes after a resize, a font swap or an accordion: the page has new measurements. */
const onRefresh = () => {
  measureStages()
  const tall = isTall()
  if (tall !== wasTall) {
    wasTall = tall
    if (entrancePlayed) setScene(sceneId, 0.6)
  }
  updateScene()
}

const onAnchorClick = (e) => {
  const link = e.target.closest?.('a[href^="#"]')
  if (!link || e.defaultPrevented) return
  const id = link.getAttribute('href').slice(1)
  if (!id || !document.getElementById(id)) return
  e.preventDefault()
  navigate(id)
}

const startWorld = () => {
  const lite = window.matchMedia('(max-width: 820px), (pointer: coarse)').matches
  // ?mask=1 (or 2) is the dev view tools/audit_phone.mjs reads: creatures alone on black
  const mask = Number(new URLSearchParams(location.search).get('mask')) || 0
  world = createWorld(canvasRef.value, {
    lite,
    mask,
    modelUrl: `/models/dragon-hero${lite ? '-lite' : ''}.glb?v=${MODEL_VERSION}`,
    onProgress: (ratio) => {
      loadProgress.value = ratio
    },
    onReady: () => {
      worldReady.value = true
      if (mask) window.__world = world
      for (const [name, actor] of Object.entries(world.actors)) Object.assign(actor.pose, PARK[name])
      measureStages()
      updateScene()
      world.setFormation(formationFor(sceneId), 0)
      playEntrance()
    },
    onError: () => {
      // poster and CSS sky stay: the page reads the same without WebGL
      world = null
      worldFailed.value = true
    },
  })
}

const setupMotion = async () => {
  scroll = createCinematicScroll(onScroll)
  if (titleOpen.value) lockScroll(true)
  ScrollTrigger.addEventListener('refresh', onRefresh)
  startWorld()

  // line splits need the real fonts; never wait on them for long
  await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1500))])
  if (!scroll) return

  motionCtx = gsap.context(() => buildReveals(appRef.value), appRef.value)

  ScrollTrigger.sort()
  ScrollTrigger.refresh()
}

const teardownMotion = () => {
  actTimer?.kill()
  actTimer = null
  ScrollTrigger.removeEventListener('refresh', onRefresh)
  motionCtx?.revert()
  motionCtx = null
  scroll?.destroy()
  scroll = null
  world?.dispose()
  world = null
  worldReady.value = false
  marks = []
  document.documentElement.classList.remove('is-locked')
}

/** The OS setting can flip while the page is open: honour it both ways. */
const onReduceChange = async () => {
  motionOk.value = !reduceQuery.matches
  if (reduceQuery.matches) {
    teardownMotion()
    titleOpen.value = false
    entered.value = true
  } else {
    entrancePlayed = false
    await nextTick()
    setupMotion()
  }
}

// an encounter band coming or going moves everything below it
watch(encounters, async () => {
  await nextTick()
  ScrollTrigger.refresh()
})

onMounted(async () => {
  reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceQuery.addEventListener('change', onReduceChange)
  document.addEventListener('click', onAnchorClick)
  motionOk.value = !reduceQuery.matches
  wasTall = isTall()

  let seen = false
  try {
    seen = sessionStorage.getItem(ENTERED_KEY) === '1'
  } catch {
    /* storage blocked */
  }

  // a deep link (#projects) or ?intro=0 goes straight to the page
  const direct = location.hash.length > 1 || new URLSearchParams(location.search).get('intro') === '0'

  if (reduceQuery.matches || seen || direct) {
    entered.value = true
  } else {
    titleOpen.value = true
  }

  await nextTick()
  if (!reduceQuery.matches) await setupMotion()
  const target = location.hash.slice(1)
  if (target && document.getElementById(target)) navigate(target)
})

onUnmounted(() => {
  reduceQuery?.removeEventListener('change', onReduceChange)
  document.removeEventListener('click', onAnchorClick)
  teardownMotion()
})
</script>
