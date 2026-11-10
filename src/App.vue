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

    <!-- Night sky and dragon. The CSS sky on .world shows until WebGL is live. -->
    <div ref="worldRef" class="world" :class="{ 'is-live': worldReady }" aria-hidden="true">
      <canvas ref="canvasRef" class="world__canvas"></canvas>
      <div class="world__veil"></div>
    </div>

    <div class="progress" aria-hidden="true"><span ref="progressRef"></span></div>

    <!-- inert while the title screen is up, so focus cannot wander behind it -->
    <div class="app__page" :inert="titleOpen">
      <SiteNav :active="activeId" />

      <main id="main" tabindex="-1">
        <HeroSection :world-ready="worldReady" :entered="entered" />
        <AboutSection />
        <TechSection />
        <ExperienceSection />
        <ProjectsSection />
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
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { createCinematicScroll } from './composables/useCinematicScroll.js'
import { chapters } from './content.js'
import { buildReveals } from './motion/reveals.js'
import { createWorld } from './world/createWorld.js'
import { FORMATIONS } from './world/formations.js'
import { ENTRANCE, PERCHES } from './world/perches.js'
import TitleScreen from './components/TitleScreen.vue'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
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
const MODEL_VERSION = 'v8'

const appRef = ref(null)
const worldRef = ref(null)
const canvasRef = ref(null)
const progressRef = ref(null)

const titleOpen = ref(false)
const entered = ref(false)
const worldReady = ref(false)
const worldFailed = ref(false)
const loadProgress = ref(0)
const activeId = ref('home')
const motionOn = ref(true)

let reduceQuery = null
let scroll = null
let world = null
let motionCtx = null
let entrancePlayed = false
let wasTall = false

const isTall = () => window.innerWidth / window.innerHeight < 0.8
const perchFor = (id) => PERCHES[isTall() ? 'tall' : 'wide'][id] ?? PERCHES.wide.home
const formationFor = (id) => {
  const { tall, ...wide } = FORMATIONS[id] ?? FORMATIONS.home
  return isTall() ? { ...wide, ...tall } : wide
}

/** Send the dragon to a chapter's perch and dim the sky to that chapter's level. */
const flyTo = (id, duration = 1.6) => {
  const { veil, ...pose } = perchFor(id)
  if (worldRef.value) {
    gsap.to(worldRef.value, { '--veil': veil, duration: Math.min(duration, 0.9), ease: 'power2.out', overwrite: 'auto' })
  }
  if (!world) return
  // The star map runs its own canvas: once the dragon has flown off the top,
  // stop rendering so two heavy scenes never draw at once.
  const resting = id === 'star-map'
  if (!resting) world.setVisible(true)
  world.setFormation(formationFor(id), duration > 0 ? 2 : 0)
  gsap.to(world.pose, {
    ...pose,
    duration,
    ease: 'expo.out',
    overwrite: 'auto',
    onComplete: () => resting && world?.setVisible(false),
  })
}

const playEntrance = () => {
  if (entrancePlayed || !world || !worldReady.value || !entered.value) return
  entrancePlayed = true
  if (activeId.value !== 'home') {
    flyTo(activeId.value, 0)
    return
  }
  const { veil: _veil, ...home } = perchFor('home')
  gsap.fromTo(world.pose, { ...ENTRANCE }, { ...home, duration: 1.4, ease: 'expo.out', overwrite: 'auto' })
}

const lockScroll = (locked) => {
  document.documentElement.classList.toggle('is-locked', locked)
  if (locked) scroll?.lenis.stop()
  else scroll?.lenis.start()
}

const navigate = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  if (scroll) scroll.lenis.scrollTo(target, { duration: 1.4 })
  else target.scrollIntoView()
  history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`)
}

const toggleMotion = () => {
  motionOn.value = !motionOn.value
  world?.setFlapping(motionOn.value)
}

provide('site', {
  motionOn,
  toggleMotion,
  lockScroll,
  navigate,
  /** Hand an element to the dragon as its drag handle. Returns an unbind. */
  bindDragonDrag: (el) => world?.bindDrag(el) ?? (() => {}),
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
}

const onResize = () => {
  const tall = isTall()
  if (tall !== wasTall) {
    wasTall = tall
    flyTo(activeId.value, 0.6)
  }
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
  world = createWorld(canvasRef.value, {
    lite,
    modelUrl: `/models/dragon-hero${lite ? '-lite' : ''}.glb?v=${MODEL_VERSION}`,
    onProgress: (ratio) => {
      loadProgress.value = ratio
    },
    onReady: () => {
      worldReady.value = true
      world.setFlapping(motionOn.value)
      Object.assign(world.pose, entered.value ? perchFor(activeId.value) : ENTRANCE)
      delete world.pose.veil
      world.setFormation(formationFor(activeId.value), 0)
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
  startWorld()

  // line splits need the real fonts; never wait on them for long
  await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1500))])
  if (!scroll) return

  motionCtx = gsap.context(() => {
    chapters.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (!self.isActive) return
          activeId.value = id
          if (entrancePlayed || !worldReady.value) flyTo(id)
        },
      })
    })
    buildReveals(appRef.value)
  }, appRef.value)

  ScrollTrigger.sort()
  ScrollTrigger.refresh()
}

const teardownMotion = () => {
  motionCtx?.revert()
  motionCtx = null
  scroll?.destroy()
  scroll = null
  world?.dispose()
  world = null
  worldReady.value = false
  document.documentElement.classList.remove('is-locked')
}

/** The OS setting can flip while the page is open: honour it both ways. */
const onReduceChange = () => {
  if (reduceQuery.matches) {
    teardownMotion()
    titleOpen.value = false
    entered.value = true
  } else {
    entrancePlayed = false
    setupMotion()
  }
}

onMounted(async () => {
  reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceQuery.addEventListener('change', onReduceChange)
  document.addEventListener('click', onAnchorClick)
  window.addEventListener('resize', onResize, { passive: true })
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
  window.removeEventListener('resize', onResize)
  teardownMotion()
})
</script>
