<template>
  <div class="relative w-full min-h-screen bg-[#050510] overflow-x-hidden">
    <!-- Full-page starfield background -->
    <div class="fixed inset-0 w-full h-full z-0">
      <Scene3D
        :particle-count="4500"
        :speed="1"
        theme="stars"
        class="w-full h-full"
      />
    </div>

    <Navbar />
    <HeroSection />
    <AboutSection />
    <TechSection />
    <ExperienceSection />
    <ProjectsSection />
    <CertificatesSection />

    <!-- Footer -->
    <footer class="relative z-10 py-14 text-center border-t border-white/5">
      <p class="text-slate-500 text-sm tracking-widest uppercase font-medium">Designed & Built by Safwan Hakim</p>
    </footer>
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

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await nextTick()

  // --- Section heading animations ---
  document.querySelectorAll('.section-heading').forEach((heading) => {
    const title = heading.querySelector('.section-title')
    const subtitle = heading.querySelector('.section-subtitle')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none none' }
    })
    if (title) {
      tl.fromTo(title,
        { opacity: 0, y: 40, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
      )
    }
    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
    }
  })

  // --- About: image from left, text from right, traits pop ---
  const aboutImg = document.querySelector('.about-image')
  const aboutText = document.querySelector('.about-text')
  const traitCards = document.querySelectorAll('.trait-card')

  if (aboutImg) {
    gsap.fromTo(aboutImg,
      { opacity: 0, x: -80, rotate: -2 },
      { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: aboutImg, start: 'top 82%', toggleActions: 'play none none none' } }
    )
  }
  if (aboutText) {
    gsap.fromTo(aboutText,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: aboutText, start: 'top 82%', toggleActions: 'play none none none' } }
    )
  }
  if (traitCards.length) {
    gsap.fromTo(traitCards,
      { opacity: 0, y: 40, scale: 0.7 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(2)',
        stagger: 0.15,
        scrollTrigger: { trigger: traitCards[0], start: 'top 90%', toggleActions: 'play none none none' } }
    )
  }

  // --- Tech: staggered random pop-in ---
  const techItems = document.querySelectorAll('.tech-item')
  if (techItems.length) {
    gsap.fromTo(techItems,
      { opacity: 0, scale: 0.4, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)',
        stagger: { each: 0.04, from: 'random' },
        scrollTrigger: { trigger: '#tech', start: 'top 75%', toggleActions: 'play none none none' } }
    )
  }

  // --- Experience: timeline draws, cards slide alternating ---
  const timelineLine = document.querySelector('.timeline-line')
  const expCards = document.querySelectorAll('.exp-card')
  const timelineDots = document.querySelectorAll('.timeline-dot')

  if (timelineLine) {
    gsap.fromTo(timelineLine,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: { trigger: '#experience', start: 'top 70%', toggleActions: 'play none none none' } }
    )
  }
  expCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
      { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } }
    )
  })
  timelineDots.forEach((dot) => {
    gsap.fromTo(dot,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
        scrollTrigger: { trigger: dot, start: 'top 85%', toggleActions: 'play none none none' } }
    )
  })

  // --- Projects: rise with perspective tilt ---
  const projectCards = document.querySelectorAll('.project-card')
  if (projectCards.length) {
    gsap.fromTo(projectCards,
      { opacity: 0, y: 80, rotateX: 8 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '#projects', start: 'top 72%', toggleActions: 'play none none none' } }
    )
  }

  // --- Certificates: scale in ---
  const certCards = document.querySelectorAll('.cert-card')
  if (certCards.length) {
    gsap.fromTo(certCards,
      { opacity: 0, y: 50, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.3)',
        stagger: 0.15,
        scrollTrigger: { trigger: '#certificates', start: 'top 75%', toggleActions: 'play none none none' } }
    )
  }

  // --- Floating glow orbs parallax ---
  document.querySelectorAll('.glow-orb').forEach((orb) => {
    gsap.to(orb, {
      y: () => Math.random() * -100 - 50,
      scrollTrigger: {
        trigger: orb.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })
  })
})
</script>
