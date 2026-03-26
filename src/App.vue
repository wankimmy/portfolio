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

    <footer class="site-footer reveal">
      <div class="site-footer__inner">
        <div>
          <p class="section-kicker">Transmission End</p>
          <h2 class="site-footer__title">HAKIM</h2>
        </div>
        <div class="site-footer__meta">
          <p>Built for modern teams, resilient systems, and ambitious product bets.</p>
          <div class="site-footer__links">
            <a href="mailto:putrafyp@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://github.com/wankimmy" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
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

gsap.registerPlugin(ScrollTrigger)

const scrollProgress = ref(0)
let revertAnimations = () => {}

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = maxScroll > 0 ? window.scrollY / maxScroll : 0
}

onMounted(async () => {
  await nextTick()
  updateScrollProgress()
  window.addEventListener('scroll', updateScrollProgress, { passive: true })

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

  revertAnimations = () => ctx.revert()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  revertAnimations()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>
