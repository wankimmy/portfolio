<template>
  <section id="home" class="hero-section min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-b from-[#050510] via-slate-900/80 to-[#050510]">
    <!-- Starfield 3D Background (stays behind) -->
    <Scene3D 
      :particle-count="4000" 
      :speed="1" 
      theme="stars"
      class="absolute inset-0 z-0"
    />

    <!-- Earth: absolutely centred, in front of background -->
    <div class="earth-layer">
      <Earth3D />
    </div>
    
    <!-- Hero text content below Earth -->
    <div class="hero-content relative z-10 flex flex-col items-center text-center text-white max-w-4xl w-full">
      <div class="inline-block px-6 py-3 bg-white/10 rounded-full mb-6 text-sm font-semibold backdrop-blur-md border border-cyan-400/40 text-cyan-100">
        👋 Welcome to My Portfolio
      </div>
      <h1 class="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
        SAFWAN HAKIM
      </h1>
      <p class="text-2xl md:text-3xl mb-6 text-cyan-200/90 font-medium">Associate Software Manager</p>
      <p class="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
        8+ years experience exploring the digital universe
      </p>
      
      <div class="flex justify-center gap-6 mb-10">
        <button 
          @click="scrollTo('projects')" 
          class="group px-10 py-4 bg-cyan-500/90 text-slate-900 font-bold rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-cyan-400 hover:shadow-cyan-400/30"
        >
          <span class="inline-flex items-center gap-2">
            View My Work
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </span>
        </button>
      </div>
      
      <div class="flex justify-center items-center gap-6 flex-wrap">
        <a 
          href="mailto:putrafyp@gmail.com" 
          target="_blank"
          class="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-cyan-400/30 transition-all duration-300 hover:bg-white/20 hover:border-cyan-400/50 hover:scale-105"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <polyline points="3 7 12 13 21 7"/>
          </svg>
          <span class="font-medium">Email</span>
        </a>
        <a 
          href="https://www.linkedin.com/in/safwan-hakim/" 
          target="_blank"
          class="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-cyan-400/30 transition-all duration-300 hover:bg-white/20 hover:border-cyan-400/50 hover:scale-105"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span class="font-medium">LinkedIn</span>
        </a>
        <a 
          href="https://github.com/wankimmy" 
          target="_blank"
          class="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-cyan-400/30 transition-all duration-300 hover:bg-white/20 hover:border-cyan-400/50 hover:scale-105"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span class="font-medium">GitHub</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * Hero Section - Main introduction banner
 * 
 * Features:
 * - Smooth scroll navigation
 * - GSAP animations on mount
 * - Social media links
 * - 3D particle background with Three.js
 */

import Scene3D from './Scene3D.vue'
import Earth3D from './Earth3D.vue'

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero-section {
  isolation: isolate;
}

/* Earth: centred above starfield; text sits above Earth in stack so it’s never blocked */
.earth-layer {
  position: absolute;
  left: 50%;
  top: 7%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: auto;
}

.hero-content {
  position: relative;
  z-index: 20;
  margin-top: min(340px, 58vw);
}

@media (max-width: 480px) {
  .text-6xl { font-size: 3rem; line-height: 1.1; }
  .text-3xl { font-size: 1.5rem; }
  .earth-layer { top: 4%; }
  .hero-content { margin-top: min(300px, 68vw); }
}

@media (min-width: 481px) and (max-width: 768px) {
  .earth-layer { top: 5%; }
  .hero-content { margin-top: min(420px, 54vw); }
}

@media (min-width: 769px) {
  .earth-layer { top: 6%; }
  .hero-content { margin-top: min(480px, 42vw); }
}
</style>
