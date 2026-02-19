<template>
  <nav :class="['fixed top-0 w-full py-6 px-8 transition-all duration-300 z-50 backdrop-blur-xl', isScrolled ? 'bg-white/95 shadow-xl border-b border-purple-100' : 'bg-transparent']">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent tracking-tight">
        
      </div>
      <ul class="hidden md:flex list-none gap-8">
        <li v-for="link in navLinks" :key="link.id">
          <a 
            :href="`#${link.href}`" 
            @click.prevent="scrollTo"
            :class="[
              'font-semibold px-4 py-2 rounded-lg relative transition-all after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-4/5 hover:after:left-[10%]',
              isScrolled ? 'text-slate-700 hover:text-primary hover:bg-purple-50' : 'text-white hover:text-purple-200'
            ]"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
/**
 * Navigation Bar Component
 * 
 * Features:
 * - Transparent background that becomes solid on scroll
 * - Smooth scroll to sections
 * - Responsive design
 * 
 * @param {boolean} isScrolled - Determines if navbar should have background
 */

import { ref, onMounted, onUnmounted } from 'vue'

// State
const isScrolled = ref(false)

// Navigation links configuration
const navLinks = [
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'About', href: '#about' },
  { id: 3, name: 'Experience', href: '#experience' },
  { id: 4, name: 'Projects', href: '#projects' },
  { id: 5, name: 'Certificates', href: '#certificates' }
]

// Scroll to section handler
const scrollTo = (event) => {
  const href = event.target.getAttribute('href')
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Handle scroll event for navbar background
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
