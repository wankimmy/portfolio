<template>
  <div class="app-shell" :aria-busy="loadingEarth">
    <Transition name="app-loading-fade">
      <div
        v-if="loadingEarth"
        class="app-loading"
        aria-live="polite"
        aria-label="Loading 3D scene"
      >
        <div class="app-loading__inner">
          <div class="app-loading__card">
            <div class="app-loading__spinner" aria-hidden="true"></div>
            <p class="app-loading__kicker">Loading</p>
            <p class="app-loading__label">Preparing 3D scene</p>
          </div>
        </div>
      </div>
    </Transition>

    <div class="backdrop backdrop--stars" aria-hidden="true"></div>
    <div class="backdrop backdrop--grid" aria-hidden="true"></div>
    <div class="backdrop backdrop--primary-glow" aria-hidden="true"></div>
    <div class="backdrop backdrop--secondary-glow" aria-hidden="true"></div>

    <div class="app-progress" aria-hidden="true">
      <span class="app-progress__bar" :style="{ transform: `scaleY(${scrollProgress})` }"></span>
    </div>

    <Navbar />

    <main class="app-main">
      <HeroSection @earth-ready="onEarthReady" @earth-error="onEarthError" />
      <AboutSection />
      <TechSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificatesSection />
    </main>

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

import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechSection from './components/TechSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import CertificatesSection from './components/CertificatesSection.vue'

const scrollProgress = ref(0)
const showScrollTop = ref(false)
const loadingEarth = ref(true)
let loadingFallbackTimer

const clearLoadingFallback = () => {
  if (loadingFallbackTimer) {
    clearTimeout(loadingFallbackTimer)
    loadingFallbackTimer = undefined
  }
}

const onEarthReady = () => {
  clearLoadingFallback()
  loadingEarth.value = false
}

const onEarthError = () => {
  clearLoadingFallback()
  loadingEarth.value = false
}
let revertAnimations = () => {}
const tiltCleanups = []

const updateScrollProgress = () => {
  const el = document.documentElement
  const maxScroll = el.scrollHeight - window.innerHeight
  scrollProgress.value = maxScroll > 0 ? window.scrollY / maxScroll : 0

  const distanceFromBottom = el.scrollHeight - window.scrollY - window.innerHeight
  showScrollTop.value = maxScroll > 120 && distanceFromBottom <= 220
}

const scrollToTop = () => {
  const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' })
}

onMounted(async () => {
  loadingFallbackTimer = window.setTimeout(() => {
    if (loadingEarth.value) {
      loadingEarth.value = false
    }
  }, 30000)

  await nextTick()
  updateScrollProgress()
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  window.addEventListener('resize', updateScrollProgress, { passive: true })

  const ctx = gsap.context(() => {
    gsap.utils.toArray('.reveal').forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          delay: index % 3 === 0 ? 0 : 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
        }
      )
    })

    gsap.utils.toArray('.float-card').forEach((element, index) => {
      gsap.to(element, {
        y: index % 2 === 0 ? -14 : 14,
        duration: 4.8 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    gsap.to('.backdrop--primary-glow', {
      yPercent: -12,
      xPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: '.app-shell',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
      },
    })

    gsap.to('.backdrop--secondary-glow', {
      yPercent: 10,
      xPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: '.app-shell',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })
  })

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReducedMotion) {
    gsap.utils.toArray('.tilt-card').forEach((element) => {
      const updateTilt = (event) => {
        const rect = element.getBoundingClientRect()
        const relativeX = (event.clientX - rect.left) / rect.width
        const relativeY = (event.clientY - rect.top) / rect.height
        const rotateY = (relativeX - 0.5) * 12
        const rotateX = (0.5 - relativeY) * 10

        element.dataset.tilt = 'active'
        element.style.setProperty('--tilt-x', `${rotateX}deg`)
        element.style.setProperty('--tilt-y', `${rotateY}deg`)
        element.style.setProperty('--pointer-x', `${relativeX * 100}%`)
        element.style.setProperty('--pointer-y', `${relativeY * 100}%`)
      }

      const resetTilt = () => {
        element.dataset.tilt = 'idle'
        element.style.setProperty('--tilt-x', '0deg')
        element.style.setProperty('--tilt-y', '0deg')
        element.style.setProperty('--pointer-x', '50%')
        element.style.setProperty('--pointer-y', '50%')
      }

      element.addEventListener('pointermove', updateTilt)
      element.addEventListener('pointerleave', resetTilt)
      resetTilt()

      tiltCleanups.push(() => {
        element.removeEventListener('pointermove', updateTilt)
        element.removeEventListener('pointerleave', resetTilt)
      })
    })
  }

  revertAnimations = () => {
    ctx.revert()
    tiltCleanups.splice(0).forEach((cleanup) => cleanup())
  }
})

onUnmounted(() => {
  if (loadingFallbackTimer) {
    clearTimeout(loadingFallbackTimer)
  }
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', updateScrollProgress)
  revertAnimations()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
/* Matches body + .backdrop layers in style.css — same palette and grid/star language */
.app-loading {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(1.5rem, env(safe-area-inset-top)) max(1.5rem, env(safe-area-inset-right))
    max(1.5rem, env(safe-area-inset-bottom)) max(1.5rem, env(safe-area-inset-left));
  pointer-events: auto;
  isolation: isolate;
  background:
    radial-gradient(circle at 18% 16%, rgba(57, 216, 230, 0.1), transparent 30%),
    radial-gradient(circle at 84% 12%, rgba(255, 180, 106, 0.08), transparent 18%),
    linear-gradient(180deg, #071321 0%, var(--bg-0) 48%, #08111a 100%);
}

.app-loading::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.2;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 84px 84px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 45%, rgba(0, 0, 0, 0.95), transparent 72%);
  pointer-events: none;
}

.app-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.14;
  background-image:
    radial-gradient(circle at 12% 22%, rgba(255, 255, 255, 0.85) 0 1.1px, transparent 1.8px),
    radial-gradient(circle at 78% 16%, rgba(255, 255, 255, 0.7) 0 1px, transparent 1.8px),
    radial-gradient(circle at 42% 68%, rgba(255, 255, 255, 0.65) 0 1px, transparent 1.8px);
  background-size: 360px 360px, 520px 520px, 440px 440px;
  pointer-events: none;
}

.app-loading__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Glass panel aligned with .section--panel / .button--ghost */
.app-loading__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  padding: 2rem 2.35rem 1.85rem;
  max-width: min(22rem, 100%);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(124, 239, 245, 0.1);
  background: linear-gradient(180deg, rgba(10, 24, 39, 0.55), rgba(7, 17, 29, 0.42));
  box-shadow:
    var(--shadow-deep),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 0 48px rgba(57, 216, 230, 0.06);
  backdrop-filter: blur(18px);
}

.app-loading__spinner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(124, 239, 245, 0.14);
  border-top-color: var(--accent-strong);
  border-right-color: rgba(124, 239, 245, 0.42);
  box-shadow:
    0 0 28px rgba(57, 216, 230, 0.18),
    inset 0 0 20px rgba(57, 216, 230, 0.06);
  animation: app-loading-spin 0.95s linear infinite;
}

/* Same voice as .section-kicker */
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
  margin: -0.35rem 0 0;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text-soft);
  text-wrap: balance;
}

.app-loading-fade-leave-active {
  transition: opacity 0.55s var(--ease-cinematic);
}

.app-loading-fade-leave-from {
  opacity: 1;
}

.app-loading-fade-leave-to {
  opacity: 0;
}

@keyframes app-loading-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-loading__spinner {
    animation-duration: 2s;
  }

  .app-loading-fade-leave-active {
    transition-duration: 0.2s;
  }
}
</style>
