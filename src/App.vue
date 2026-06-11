<template>
  <div ref="appShellRef" class="app-shell" :aria-busy="loadingEarth">
    <div
      v-if="loadingEarth"
      ref="splashRef"
      class="app-loading"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div class="app-loading__galaxy" aria-hidden="true"></div>
      <div class="app-loading__aurora" aria-hidden="true"></div>
      <div class="app-loading__star-drift app-loading__star-drift--far" aria-hidden="true"></div>
      <div class="app-loading__star-drift app-loading__star-drift--near" aria-hidden="true"></div>
      <div class="app-loading__warp-lines" aria-hidden="true"></div>
      <div class="app-loading__flight-veil" aria-hidden="true"></div>
      <div class="app-loading__inner">
        <div class="app-loading__center">
          <div ref="rocketWrapRef" class="app-loading__rocket-wrap" aria-hidden="true">
            <div ref="rocketInnerRef" class="app-loading__rocket-inner">
              <img
                class="app-loading__rocket"
                :src="crystalLoaderUrl"
                alt=""
                width="220"
                height="260"
                decoding="async"
                fetchpriority="high"
              />
              <div ref="rocketFlameRef" class="app-loading__rocket-flame"></div>
              <div ref="rocketExhaustRef" class="app-loading__rocket-exhaust"></div>
            </div>
          </div>
          <div ref="splashCopyRef" class="app-loading__copy">
            <p class="app-loading__kicker">✦ Expedition ✦</p>
            <p class="app-loading__label">Summoning a new journey…</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero-matched deep space visible site-wide -->
    <div class="space-bg" aria-hidden="true">
      <div class="space-bg__galaxy"></div>
      <div class="space-bg__glow"></div>
      <div class="space-bg__stars"></div>
    </div>
    <div class="backdrop backdrop--grid" aria-hidden="true"></div>
    <div class="backdrop backdrop--primary-glow" aria-hidden="true"></div>
    <div class="backdrop backdrop--secondary-glow" aria-hidden="true"></div>

    <div class="app-progress" aria-hidden="true">
      <span class="app-progress__bar" :style="{ transform: `scaleX(${scrollProgress})` }"></span>
    </div>

    <Navbar />

    <main class="app-main">
      <HeroSection
        ref="heroRef"
        @earth-ready="onEarthReady"
        @earth-error="onEarthError"
      />
      <AboutSection />
      <TechSection />
      <ExperienceSection />
      <ProjectsSection />
      <ServicesSection />
      <PricingSection />
      <CertificatesSection />
    </main>

    <SiteFooter />

    <ChatWidget />

    <button
      v-if="showScrollTop"
      type="button"
      class="scroll-top"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <svg class="scroll-top__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import crystalLoaderUrl from './assets/crystal-loader.svg'
import { bindCardTilt } from './composables/useCardTilt.js'
import { createCinematicScroll } from './composables/useCinematicScroll.js'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechSection from './components/TechSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PricingSection from './components/PricingSection.vue'
import CertificatesSection from './components/CertificatesSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import ChatWidget from './components/ChatWidget.vue'

/** Minimum time splash holds so the Earth scene can warm up */
const MIN_LOADING_MS = 2400

const SCROLL_SECTION_IDS = [
  'home',
  'about',
  'tech',
  'experience',
  'projects',
  'services',
  'pricing',
  'certificates',
]

const scrollProgress = ref(0)
const showScrollTop = ref(false)
const loadingEarth = ref(true)

const appShellRef = ref(null)
const heroRef = ref(null)
const splashRef = ref(null)
const rocketWrapRef = ref(null)
const rocketInnerRef = ref(null)
const rocketFlameRef = ref(null)
const rocketExhaustRef = ref(null)
const splashCopyRef = ref(null)

/** Lenis instance when smooth scroll active */
let smoothScroll = null
/** Tears down the Lenis + GSAP ticker wiring; assigned once scroll engine boots */
let disposeSmoothScroll = () => {}
let loadingFallbackTimer
let hideLoadTimer
let loadStartedAt = 0
let earthSettled = false
let splashExitRunning = false
let idleRocketTimeline
let nativeScrollListening = false


let scrollFxContext = null

const tiltCleanups = []

function handleViewportResize() {
  updateScrollProgress()
  ScrollTrigger.refresh()
}

const clearLoadingFallback = () => {
  if (loadingFallbackTimer) {
    clearTimeout(loadingFallbackTimer)
    loadingFallbackTimer = undefined
  }
}

const clearHideLoadTimer = () => {
  if (hideLoadTimer) {
    clearTimeout(hideLoadTimer)
    hideLoadTimer = undefined
  }
}

const finishSplashDom = async () => {
  clearHideLoadTimer()
  clearLoadingFallback()
  loadingEarth.value = false
  await nextTick()
  ScrollTrigger.refresh()
}

const scheduleHideLoading = () => {
  if (!earthSettled || !loadingEarth.value || splashExitRunning || hideLoadTimer != null) {
    return
  }

  const elapsed = Date.now() - loadStartedAt
  const wait = Math.max(0, MIN_LOADING_MS - elapsed)

  hideLoadTimer = window.setTimeout(() => {
    hideLoadTimer = undefined
    void runSplashExit()
  }, wait)
}

const runSplashExit = async () => {
  if (!loadingEarth.value || splashExitRunning) {
    return
  }
  splashExitRunning = true
  clearHideLoadTimer()

  idleRocketTimeline?.kill()

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion || !splashRef.value) {
    heroRef.value?.startLandingReveal({ instant: true })
    await finishSplashDom()
    splashExitRunning = false
    return
  }

  heroRef.value?.startLandingReveal()

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: async () => {
      splashExitRunning = false
      await finishSplashDom()
    },
  })

  tl.to(splashCopyRef.value, { autoAlpha: 0, y: -8, duration: 0.4, ease: 'power2.out' }, 0)
    .to(
      rocketFlameRef.value,
      { scaleY: 1.35, scaleX: 1.05, opacity: 0.92, duration: 0.45, ease: 'power2.out' },
      0,
    )
    .to(
      rocketExhaustRef.value,
      { scaleY: 1.45, opacity: 0.75, duration: 0.5 },
      0.05,
    )
    .to(
      rocketInnerRef.value,
      { y: -28, rotate: -4, scale: 1.06, duration: 1.15, ease: 'power3.inOut' },
      0,
    )
    .to(
      rocketWrapRef.value,
      { y: '-18vh', scale: 1.12, duration: 1.25, ease: 'power3.inOut' },
      0.05,
    )
    .to(rocketFlameRef.value, { autoAlpha: 0, scaleY: 0.25, duration: 0.45, ease: 'power2.in' }, 0.55)
    .to(rocketExhaustRef.value, { autoAlpha: 0, duration: 0.5 }, 0.55)
    .to(
      splashRef.value,
      { autoAlpha: 0, filter: 'blur(12px)', duration: 0.95, ease: 'power2.inOut' },
      0.35,
    )
}

const onEarthReady = () => {
  earthSettled = true
  clearLoadingFallback()
  scheduleHideLoading()
  void nextTick(() => updateScrollProgress())
}

const onEarthError = () => {
  earthSettled = true
  clearLoadingFallback()
  scheduleHideLoading()
  void nextTick(() => updateScrollProgress())
}

const updateScrollProgress = () => {
  const scrollY = smoothScroll ? smoothScroll.scroll : window.scrollY

  const root = document.documentElement
  const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight)
  const y = scrollY
  const vh = window.innerHeight

  const sections = SCROLL_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
  if (sections.length >= 2) {
    const first = sections[0]
    const last = sections[sections.length - 1]
    const start = first.getBoundingClientRect().top + scrollY
    const end = last.getBoundingClientRect().bottom + scrollY
    const span = Math.max(1, end - start)
    const readingLine = y + vh * 0.42
    scrollProgress.value = Math.min(1, Math.max(0, (readingLine - start) / span))
  } else {
    scrollProgress.value = maxScroll > 0 ? y / maxScroll : 0
  }

  const distanceFromBottom = root.scrollHeight - y - vh
  showScrollTop.value = maxScroll > 120 && distanceFromBottom <= 220
}

const scrollToTop = () => {
  const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (smoothScroll) {
    smoothScroll.scrollTo(0, { immediate: instant })
  } else {
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' })
  }
}

const setupIdleRocketAmbient = () => {
  idleRocketTimeline?.kill()
  if (
    !rocketInnerRef.value ||
    !rocketFlameRef.value ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }
  gsap.killTweensOf([rocketInnerRef.value, rocketFlameRef.value])
  idleRocketTimeline = gsap.timeline({ repeat: -1 })
  idleRocketTimeline
    .to(rocketInnerRef.value, {
      y: -6,
      rotate: -1,
      duration: 1.85,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
    .to(
      rocketFlameRef.value,
      { scaleY: 1.06, opacity: 0.95, duration: 0.16, yoyo: true, repeat: -1, ease: 'sine.inOut' },
      0,
    )
}

onMounted(async () => {
  loadStartedAt = Date.now()

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  gsap.defaults({ overwrite: 'auto' })

  const scrollEngine = createCinematicScroll(() => {
    ScrollTrigger.update()
    updateScrollProgress()
  })
  smoothScroll = scrollEngine.lenis
  const destroySmoothScroll = scrollEngine.destroy

  if (!reduceMotion && smoothScroll === null) {
    nativeScrollListening = true
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
  }

  window.addEventListener('resize', handleViewportResize, { passive: true })

  await nextTick()
  await nextTick()

  if (reduceMotion) {
    loadingEarth.value = false
    clearHideLoadTimer()
    clearLoadingFallback()
    heroRef.value?.startLandingReveal({ instant: true })
  } else {
    setupIdleRocketAmbient()
    loadingFallbackTimer = window.setTimeout(() => {
      earthSettled = true
      scheduleHideLoading()
    }, 28000)

    if (splashCopyRef.value) {
      gsap.fromTo(
        splashCopyRef.value,
        { autoAlpha: 0.2, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      )
    }
    if (rocketWrapRef.value) {
      gsap.fromTo(
        rocketWrapRef.value,
        { autoAlpha: 0, scale: 0.86, y: 24 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1.05, ease: 'power3.out' },
      )
    }
    if (rocketFlameRef.value) {
      gsap.fromTo(
        rocketFlameRef.value,
        { autoAlpha: 0, scaleY: 0.65 },
        { autoAlpha: 1, scaleY: 1, duration: 0.75, ease: 'power2.out', delay: 0.08 },
      )
    }
    if (rocketExhaustRef.value) {
      gsap.fromTo(
        rocketExhaustRef.value,
        { autoAlpha: 0 },
        { autoAlpha: 0.72, duration: 0.6, ease: 'power2.out', delay: 0.14 },
      )
    }
  }

  scrollFxContext = gsap.context(() => {
    const mm = gsap.matchMedia()

    gsap.utils.toArray('.float-card').forEach((element, index) => {
      gsap.to(element, {
        y: index % 2 === 0 ? -14 : 14,
        duration: 4.8 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    gsap.fromTo(
      '.backdrop--primary-glow',
      { xPercent: -50, yPercent: 4 },
      {
        xPercent: -50,
        yPercent: -26,
        ease: 'none',
        scrollTrigger: {
          trigger: '.app-shell',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
        },
      },
    )

    gsap.fromTo(
      '.backdrop--secondary-glow',
      { xPercent: -50, yPercent: -12 },
      {
        xPercent: -50,
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: '.app-shell',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      },
    )

    mm.add(
      {
        isDesktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
        isReducedOrMobile:
          '(max-width: 899px), (prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const heroEl = '#home.hero--cinematic'

        if (ctx.conditions.isDesktop) {
          gsap
            .timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                id: 'hero-pin-cinematic',
                trigger: heroEl,
                start: 'top top',
                end: '+=135%',
                pin: '.hero__pin-target',
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => heroRef.value?.setEarthCinematicProgress?.(self.progress),
                onLeaveBack: () => heroRef.value?.setEarthCinematicProgress?.(0),
              },
            })
            .fromTo('.hero__lift', { yPercent: 0, autoAlpha: 1 }, { yPercent: -18, autoAlpha: 0.12 }, 0)
            .fromTo('.hero__scale', { scale: 1 }, { scale: 1.06 }, 0)
        }

        const useSoftEarth =
          ctx.conditions.isReducedOrMobile && !ctx.conditions.isDesktop

        if (useSoftEarth) {
          ScrollTrigger.create({
            id: 'hero-earth-soft',
            trigger: heroEl,
            start: 'top top',
            end: 'bottom center',
            scrub: true,
            onUpdate: (self) =>
              heroRef.value?.setEarthCinematicProgress?.(self.progress * 0.45),
            onLeaveBack: () => heroRef.value?.setEarthCinematicProgress?.(0),
          })
        }
      },
    )

    mm.add(
      {
        prefersReducedMotion: '(prefers-reduced-motion: reduce)',
      },
      () => {
        const neutral = gsap.utils.toArray(
          '.reveal,#tech .tech-card,#experience .quest-node,#projects .depth-reveal,#services .service-card,#pricing .pricing-card,.char-card,.quest-track__line,.quest-node__marker',
        )
        gsap.set(neutral, {
          autoAlpha: 1,
          clearProps: 'transform,filter',
        })
      },
    )

    mm.add(
      {
        prefersMotion: '(prefers-reduced-motion: no-preference)',
      },
      () => {
        /**
         * Game-menu style entrances: animations PLAY once when a section enters
         * the viewport (instead of scrubbing with scroll), which feels smoother
         * with Lenis and reads like RPG menu items sliding into place.
         */
        const enterStagger = (items, { trigger, scrollTrigger, ...vars } = {}) => {
          if (!items.length) {
            return
          }
          gsap.from(items, {
            autoAlpha: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.1,
            clearProps: 'transform,filter',
            ...vars,
            scrollTrigger: {
              trigger: trigger ?? items[0],
              start: 'top 86%',
              once: true,
              ...scrollTrigger,
            },
          })
        }

        // Generic headings/blocks — soft rise + unblur (certificates get their own pop)
        gsap.utils.toArray('.reveal').forEach((el) => {
          if (el.classList.contains('cert-card')) {
            return
          }
          gsap.from(el, {
            autoAlpha: 0,
            y: 34,
            filter: 'blur(6px)',
            duration: 0.95,
            ease: 'power3.out',
            clearProps: 'transform,filter',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

        // Abilities — cards tilt up into place like menu entries
        enterStagger(gsap.utils.toArray('#tech .tech-card'), {
          trigger: '#tech .tech-grid',
          y: 46,
          rotateX: 9,
          transformOrigin: '50% 85%',
          transformPerspective: 1100,
        })

        // Quest log — the gold track draws with scroll, nodes slide in as reached
        const questLine = document.querySelector('.quest-track__line')
        if (questLine) {
          gsap.fromTo(
            questLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.quest-track',
                start: 'top 80%',
                end: 'bottom 55%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        gsap.utils.toArray('#experience .quest-node').forEach((node) => {
          const marker = node.querySelector('.quest-node__marker')
          const card = node.querySelector('.quest-node__card')
          const tl = gsap.timeline({
            scrollTrigger: { trigger: node, start: 'top 84%', once: true },
          })
          if (marker) {
            tl.from(marker, {
              scale: 0,
              autoAlpha: 0,
              duration: 0.5,
              ease: 'back.out(2.2)',
            })
          }
          if (card) {
            tl.from(
              card,
              {
                x: -42,
                autoAlpha: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'transform',
              },
              '-=0.25',
            )
          }
        })

        // Completed quests — mission cards rise with depth
        enterStagger(gsap.utils.toArray('#projects .depth-reveal'), {
          trigger: '#projects .projects-grid',
          y: 54,
          scale: 0.94,
          transformOrigin: '50% 90%',
          transformPerspective: 1100,
          stagger: 0.11,
        })

        // Guild services — alternating swing-in
        const serviceCards = gsap.utils.toArray('#services .service-card')
        serviceCards.forEach((card, index) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 44,
            rotateY: index % 2 === 0 ? -8 : 8,
            transformPerspective: 1100,
            duration: 0.85,
            ease: 'power3.out',
            delay: (index % 3) * 0.1,
            clearProps: 'transform',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        })

        // Item shop — cards present themselves with a slight overshoot
        enterStagger(gsap.utils.toArray('#pricing .pricing-card'), {
          trigger: '#pricing .pricing-grid',
          y: 58,
          scale: 0.93,
          duration: 0.95,
          ease: 'back.out(1.25)',
          stagger: 0.13,
          transformOrigin: '50% 95%',
        })

        // Achievements — unlock pop
        gsap.utils.toArray('#certificates .cert-card').forEach((card, index) => {
          gsap.from(card, {
            autoAlpha: 0,
            scale: 0.86,
            y: 26,
            duration: 0.75,
            ease: 'back.out(1.7)',
            delay: (index % 4) * 0.08,
            clearProps: 'transform',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          })
        })
      },
    )
  }, appShellRef.value ?? '#app')

  if (!reduceMotion) {
    gsap.utils.toArray('.tilt-card').forEach((element) => {
      if (element.classList.contains('about-card--how-work')) {
        return
      }
      tiltCleanups.push(bindCardTilt(element))
    })
  }

  updateScrollProgress()
  ScrollTrigger.refresh()

  disposeSmoothScroll = destroySmoothScroll
})

onUnmounted(() => {
  clearLoadingFallback()
  clearHideLoadTimer()
  idleRocketTimeline?.kill()

  disposeSmoothScroll()
  disposeSmoothScroll = () => {}

  smoothScroll = null

  if (nativeScrollListening) {
    window.removeEventListener('scroll', updateScrollProgress)
    nativeScrollListening = false
  }

  window.removeEventListener('resize', handleViewportResize)

  scrollFxContext?.revert()
  scrollFxContext = null

  tiltCleanups.splice(0).forEach((cleanup) => cleanup())

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
.app-loading {
  position: fixed;
  inset: 0;
  z-index: 200;
  padding: max(1.5rem, env(safe-area-inset-top)) max(1.5rem, env(safe-area-inset-right))
    max(1.5rem, env(safe-area-inset-bottom)) max(1.5rem, env(safe-area-inset-left));
  pointer-events: auto;
  isolation: isolate;
  background:
    radial-gradient(circle at 24% 38%, rgba(235, 196, 129, 0.12), transparent 38%),
    radial-gradient(circle at 72% 22%, rgba(232, 188, 113, 0.1), transparent 32%),
    radial-gradient(circle at 62% 78%, rgba(233, 191, 119, 0.06), transparent 30%),
    linear-gradient(180deg, #f3f9fa 0%, #e9f3f5 48%, #dcedf1 100%);
}

.app-loading__galaxy {
  position: absolute;
  inset: -5%;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 24% 42%, rgba(235, 196, 129, 0.18), transparent 34%),
    radial-gradient(circle at 72% 26%, rgba(232, 188, 113, 0.14), transparent 30%),
    radial-gradient(circle at 64% 74%, rgba(233, 191, 119, 0.08), transparent 28%);
  filter: blur(10px);
  animation:
    app-loading-galaxy-pulse 14s ease-in-out infinite,
    app-loading-galaxy-drift 48s ease-in-out infinite alternate;
}

.app-loading__aurora {
  position: absolute;
  inset: -15%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.42;
  filter: blur(72px);
  background:
    radial-gradient(ellipse 50% 40% at 28% 38%, rgba(212, 177, 118, 0.16), transparent 55%),
    radial-gradient(ellipse 45% 38% at 72% 28%, rgba(232, 189, 115, 0.12), transparent 52%),
    radial-gradient(ellipse 55% 42% at 48% 68%, rgba(206, 160, 81, 0.1), transparent 50%);
  animation: app-loading-aurora-drift 54s ease-in-out infinite alternate;
}

.app-loading__star-drift {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 120% 100% at 50% 45%, #000 0%, #000 55%, transparent 78%);
}

.app-loading__star-drift--far {
  opacity: 0.32;
  background-image:
    radial-gradient(circle, rgba(180, 134, 58, 0.5) 0, transparent 1.35px),
    radial-gradient(circle, rgba(199, 152, 74, 0.32) 0, transparent 1.2px),
    radial-gradient(circle, rgba(20, 144, 173, 0.32) 0, transparent 1.5px);
  background-size: 283px 251px, 197px 173px, 331px 289px;
  background-position: 0 0, 47px 83px, 19px 31px;
  animation: app-loading-stars-drift-far 32s linear infinite;
}

.app-loading__star-drift--near {
  opacity: 0.38;
  background-image:
    radial-gradient(ellipse 1px 8px at center, rgba(180, 134, 58, 0.6) 0, transparent 100%),
    radial-gradient(ellipse 1px 6px at center, rgba(199, 152, 74, 0.5) 0, transparent 100%),
    radial-gradient(ellipse 1.5px 10px at center, rgba(20, 144, 173, 0.4) 0, transparent 100%);
  background-size: 199px 173px, 137px 211px, 163px 227px;
  background-position: 0 0, 61px 37px, 113px 89px;
  animation: app-loading-stars-drift-near 18s linear infinite;
}

.app-loading__warp-lines {
  position: absolute;
  inset: -15%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.056;
  background:
    radial-gradient(ellipse 30% 50% at 50% 42%, rgba(233, 192, 122, 0.18) 0%, transparent 60%),
    radial-gradient(ellipse 50% 35% at 50% 42%, rgba(198, 155, 82, 0.08) 0%, transparent 55%);
  animation: app-loading-warp-breathe 9s ease-in-out infinite;
}

.app-loading__flight-veil {
  position: absolute;
  inset: -12% -8%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.055;
  background-image: repeating-linear-gradient(
    102deg,
    transparent 0,
    transparent 100px,
    rgba(242, 217, 173, 0.16) 100px,
    rgba(242, 217, 173, 0.16) 101px,
    transparent 101px,
    transparent 220px
  );
  background-size: 100% 100%;
  mask-image: radial-gradient(ellipse 95% 85% at 50% 42%, #000 0%, #000 62%, transparent 82%);
  animation: app-loading-flight-veil 32s linear infinite;
}

.app-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.42;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(180, 134, 58, 0.5) 0, transparent 1px),
    radial-gradient(circle at 80% 30%, rgba(180, 134, 58, 0.36) 0, transparent 1px),
    radial-gradient(circle at 50% 70%, rgba(199, 152, 74, 0.32) 0, transparent 1px);
  pointer-events: none;
  animation:
    app-loading-starfield-twinkle 10s ease-in-out infinite,
    app-loading-starfield-rise 48s ease-in-out infinite alternate;
}

.app-loading__inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
}

.app-loading__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1.25rem, 4vh, 2rem);
  max-width: min(22rem, 100%);
}

.app-loading__rocket-wrap {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  width: min(180px, min(46vw, 11rem));
  transform-origin: 50% 70%;
}

.app-loading__rocket-wrap::before {
  content: '';
  position: absolute;
  top: -6%;
  left: 50%;
  z-index: 3;
  width: 55%;
  height: 26%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(
    ellipse at 50% 70%,
    rgba(206, 160, 81, 0.35) 0%,
    rgba(228, 196, 141, 0.12) 45%,
    transparent 72%
  );
  filter: blur(8px);
  pointer-events: none;
}

.app-loading__rocket-inner {
  position: relative;
  transform-origin: 50% 70%;
}

.app-loading__rocket {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 12px 32px rgba(206, 160, 81, 0.4)) drop-shadow(0 0 18px rgba(206, 160, 81, 0.15));
}

/* Flame is baked into rocket-loader.svg */
.app-loading__rocket-flame,
.app-loading__rocket-exhaust {
  display: none;
}

.app-loading__copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding-inline: 0.5rem;
  text-align: center;
}

.app-loading__kicker {
  margin: 0;
  color: var(--accent);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.app-loading__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text-soft);
  text-wrap: balance;
}

@keyframes app-loading-galaxy-pulse {
  0%,
  100% {
    opacity: 0.7;
    filter: saturate(1);
  }
  50% {
    opacity: 0.88;
    filter: saturate(1.08);
  }
}

@keyframes app-loading-galaxy-drift {
  from {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  to {
    transform: translate(-0.85%, 1.9%) rotate(0.42deg) scale(1.016);
  }
}

@keyframes app-loading-aurora-drift {
  from {
    transform: translate(-1.8%, 0.8%) scale(1);
  }
  to {
    transform: translate(2.2%, -3.8%) scale(1.038);
  }
}

@keyframes app-loading-stars-drift-far {
  from {
    background-position: 0 0, 47px 83px, 19px 31px;
  }
  to {
    background-position: 0 251px, 47px 334px, 19px 282px;
  }
}

@keyframes app-loading-stars-drift-near {
  from {
    background-position: 0 0, 61px 37px, 113px 89px;
  }
  to {
    background-position: 0 173px, 61px 210px, 113px 262px;
  }
}

@keyframes app-loading-warp-breathe {
  0%,
  100% {
    opacity: 0.055;
    transform: scale(1);
  }
  50% {
    opacity: 0.08;
    transform: scale(1.012);
  }
}

@keyframes app-loading-flight-veil {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(72px);
  }
}

@keyframes app-loading-starfield-twinkle {
  0%,
  100% {
    opacity: 0.4;
    filter: brightness(1);
  }
  50% {
    opacity: 0.55;
    filter: brightness(1.04);
  }
}

@keyframes app-loading-starfield-rise {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(14px);
  }
}

.hero--cinematic .hero__inner {
  transform-style: preserve-3d;
  perspective: 1400px;
}

@media (prefers-reduced-motion: reduce) {
  .app-loading__galaxy,
  .app-loading__aurora {
    animation: none;
  }

  .app-loading::after,
  .app-loading__star-drift--far,
  .app-loading__star-drift--near,
  .app-loading__warp-lines,
  .app-loading__flight-veil {
    animation: none;
  }
}
</style>
