<template>
  <div class="app-shell">
    <div class="backdrop backdrop--stars" aria-hidden="true"></div>
    <div class="backdrop backdrop--grid" aria-hidden="true"></div>
    <div class="backdrop backdrop--primary-glow" aria-hidden="true"></div>
    <div class="backdrop backdrop--secondary-glow" aria-hidden="true"></div>

    <div class="app-progress" aria-hidden="true">
      <span class="app-progress__bar" :style="{ transform: `scaleY(${scrollProgress})` }"></span>
    </div>

    <Navbar />

    <main class="app-main">
      <HeroSection />
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
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', updateScrollProgress)
  revertAnimations()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>
