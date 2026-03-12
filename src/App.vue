<template>
  <div class="relative w-full min-h-screen overflow-x-hidden bg-ocean-900">
    <!-- SKY zone: contained to hero area only -->
    <div class="relative z-0">
      <div class="absolute inset-0 bg-[linear-gradient(180deg,_#dff3ff_0%,_#c5e1f6_18%,_#92BFE7_48%,_#5fa2d8_72%,_#2c79bf_100%)]"></div>

      <!-- Floating CSS clouds (hero area only) -->
      <div class="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
        <div class="cloud cloud-4"></div>
        <div class="cloud cloud-5"></div>
        <div class="cloud cloud-6"></div>
        <div class="cloud cloud-7"></div>
      </div>

      <!-- Subtle sparkle particles -->
      <div class="absolute inset-0 w-full h-full z-[2]">
        <Scene3D :particle-count="1200" :speed="0.4" theme="ocean" class="w-full h-full" />
      </div>

      <Navbar />
      <HeroSection />

      <!-- Anime wave transition from sky to ocean -->
      <div class="anime-wave relative" style="margin-top: -2px;">
        <svg viewBox="0 0 2880 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path class="wave-back" d="M0,40 C320,80 640,10 960,50 C1280,90 1600,20 1920,60 C2240,100 2560,30 2880,70 L2880,100 L0,100Z" fill="rgba(1,111,183,0.5)"/>
          <path class="wave-mid" d="M0,55 C240,25 480,75 720,45 C960,15 1200,65 1440,35 C1680,5 1920,55 2160,25 C2400,65 2640,35 2880,55 L2880,100 L0,100Z" fill="rgba(0,50,128,0.7)"/>
          <path class="wave-front" d="M0,65 C360,45 720,85 1080,55 C1440,25 1800,75 2160,50 C2520,80 2700,45 2880,60 L2880,100 L0,100Z" fill="rgb(0,50,128)"/>
        </svg>
      </div>
    </div>

    <!-- OCEAN zone: deep blue sea -->
    <div class="relative z-10 bg-gradient-to-b from-ocean-500 via-ocean-700 to-ocean-900">
      <AboutSection />

      <!-- Wave between sections -->
      <div class="anime-wave">
        <svg viewBox="0 0 2880 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path class="wave-back" d="M0,30 C320,60 640,10 960,40 C1280,70 1600,20 1920,50 C2240,80 2560,30 2880,60 L2880,80 L0,80Z" fill="rgba(146,191,231,0.08)"/>
          <path class="wave-front" d="M0,50 C360,30 720,70 1080,40 C1440,10 1800,60 2160,35 C2520,65 2700,35 2880,50 L2880,80 L0,80Z" fill="rgba(146,191,231,0.05)"/>
        </svg>
      </div>

      <TechSection />

      <div class="anime-wave">
        <svg viewBox="0 0 2880 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path class="wave-back" d="M0,35 C320,65 640,15 960,45 C1280,75 1600,25 1920,55 C2240,85 2560,35 2880,65 L2880,80 L0,80Z" fill="rgba(146,191,231,0.08)"/>
          <path class="wave-front" d="M0,50 C360,25 720,65 1080,35 C1440,15 1800,55 2160,30 C2520,60 2700,30 2880,50 L2880,80 L0,80Z" fill="rgba(146,191,231,0.05)"/>
        </svg>
      </div>

      <ExperienceSection />

      <div class="anime-wave">
        <svg viewBox="0 0 2880 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path class="wave-back" d="M0,40 C320,70 640,20 960,50 C1280,80 1600,30 1920,60 C2240,90 2560,40 2880,70 L2880,80 L0,80Z" fill="rgba(146,191,231,0.08)"/>
          <path class="wave-front" d="M0,55 C360,30 720,70 1080,40 C1440,20 1800,60 2160,35 C2520,65 2700,35 2880,55 L2880,80 L0,80Z" fill="rgba(146,191,231,0.05)"/>
        </svg>
      </div>

      <ProjectsSection />

      <div class="anime-wave">
        <svg viewBox="0 0 2880 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path class="wave-back" d="M0,30 C320,60 640,10 960,40 C1280,70 1600,20 1920,50 C2240,80 2560,30 2880,60 L2880,80 L0,80Z" fill="rgba(146,191,231,0.08)"/>
          <path class="wave-front" d="M0,45 C360,25 720,60 1080,35 C1440,15 1800,55 2160,30 C2520,60 2700,30 2880,45 L2880,80 L0,80Z" fill="rgba(146,191,231,0.05)"/>
        </svg>
      </div>

      <CertificatesSection />

      <!-- Straw Hat Pirates section -->
      <section id="crew" class="relative py-0">
        <div
          class="w-full min-h-[75vh] bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${strawhatImage})` }"
        ></div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechSection from './components/TechSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import CertificatesSection from './components/CertificatesSection.vue'
import Scene3D from './components/Scene3D.vue'
import strawhatImage from '../assets/strawhat.png'

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await nextTick()

  document.querySelectorAll('.section-heading').forEach((heading) => {
    const title = heading.querySelector('.section-title')
    const subtitle = heading.querySelector('.section-subtitle')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none none' }
    })
    if (title) {
      tl.fromTo(title, { opacity: 0, y: 40, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' })
    }
    if (subtitle) {
      tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    }
  })

  const aboutImg = document.querySelector('.about-image')
  const aboutText = document.querySelector('.about-text')
  const traitCards = document.querySelectorAll('.trait-card')

  if (aboutImg) {
    gsap.fromTo(aboutImg, { opacity: 0, x: -80, rotate: -2 }, { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: aboutImg, start: 'top 82%', toggleActions: 'play none none none' } })
  }
  if (aboutText) {
    gsap.fromTo(aboutText, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: aboutText, start: 'top 82%', toggleActions: 'play none none none' } })
  }
  if (traitCards.length) {
    gsap.fromTo(traitCards, { opacity: 0, y: 40, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.15, scrollTrigger: { trigger: traitCards[0], start: 'top 90%', toggleActions: 'play none none none' } })
  }

  const techItems = document.querySelectorAll('.tech-item')
  if (techItems.length) {
    gsap.fromTo(techItems, { opacity: 0, scale: 0.4, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)', stagger: { each: 0.04, from: 'random' }, scrollTrigger: { trigger: '#tech', start: 'top 75%', toggleActions: 'play none none none' } })
  }

  const timelineLine = document.querySelector('.timeline-line')
  const expCards = document.querySelectorAll('.exp-card')
  const timelineDots = document.querySelectorAll('.timeline-dot')

  if (timelineLine) {
    gsap.fromTo(timelineLine, { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, duration: 1.5, ease: 'power2.inOut', scrollTrigger: { trigger: '#experience', start: 'top 70%', toggleActions: 'play none none none' } })
  }
  expCards.forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } })
  })
  timelineDots.forEach((dot) => {
    gsap.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: dot, start: 'top 85%', toggleActions: 'play none none none' } })
  })

  const projectCards = document.querySelectorAll('.project-card')
  if (projectCards.length) {
    gsap.fromTo(projectCards, { opacity: 0, y: 80, rotateX: 8 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2, scrollTrigger: { trigger: '#projects', start: 'top 72%', toggleActions: 'play none none none' } })
  }

  const certCards = document.querySelectorAll('.cert-card')
  if (certCards.length) {
    gsap.fromTo(certCards, { opacity: 0, y: 50, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.3)', stagger: 0.15, scrollTrigger: { trigger: '#certificates', start: 'top 75%', toggleActions: 'play none none none' } })
  }
})
</script>
