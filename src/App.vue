<!--
  Main Application Component
  
  This is the root component that orchestrates all portfolio sections.
  Portfolio sections are displayed in the following order:
  1. Navbar - Fixed navigation bar
  2. Hero Section - Main introduction banner
  3. About Section - Personal information and traits
  4. Tech Section - Technology stack showcase
  5. Experience Section - Work experience timeline
  6. Projects Section - Featured projects
  7. Certificates Section - Professional certifications
  
  @component
  @description Portfolio website built with Vue 3, Tailwind CSS, and GSAP
-->
<template>
  <div class="relative w-full min-h-screen bg-[#050510] overflow-x-hidden">
    <!-- Full-page starfield background with galaxy and space objects -->
    <div class="fixed inset-0 w-full h-full z-0">
      <Scene3D 
        :particle-count="4500" 
        :speed="1" 
        theme="stars"
        class="w-full h-full"
      />
    </div>
    
    <!-- Navigation Bar - Fixed position with scroll effects -->
    <Navbar />
    
    <!-- Hero Section - Main introduction with social links -->
    <HeroSection />
    
    <!-- About Section - Personal introduction and profile image -->
    <AboutSection />
    
    <!-- Technologies Section - Technology stack display -->
    <TechSection />
    
    <!-- Experience Section - Professional work history -->
    <ExperienceSection />
    
    <!-- Projects Section - Featured projects showcase -->
    <ProjectsSection />
    
    <!-- Certificates Section - Professional certifications -->
    <CertificatesSection />
  </div>
</template>

<script setup>
/**
 * Main App Component
 * 
 * Imports and composes all portfolio sections.
 * Scroll-triggered space-themed reveal animations via GSAP ScrollTrigger.
 */

import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Section Components
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

  const sectionIds = ['#home', '#about', '#tech', '#experience', '#projects', '#certificates']

  sectionIds.forEach((selector) => {
    const el = document.querySelector(selector)
    if (!el) return

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 48,
        scale: 0.98,
        filter: 'brightness(0.7) blur(2px)',
        boxShadow: '0 0 0 rgba(34, 211, 238, 0)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'brightness(1) blur(0px)',
        boxShadow: '0 0 60px -20px rgba(34, 211, 238, 0.15)',
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 30%',
          toggleActions: 'play none none none',
        },
      }
    )
  })
})
</script>
