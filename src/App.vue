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
  <div class="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 overflow-x-hidden">
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
 * Each section is a self-contained Vue component.
 */

// Section Components
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechSection from './components/TechSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import CertificatesSection from './components/CertificatesSection.vue'
</script>
