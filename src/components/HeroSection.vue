<template>
  <section id="home" class="hero-section min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
    <div class="hero-atmosphere" aria-hidden="true">
      <div class="hero-sun-glow"></div>
      <div class="hero-sky-haze hero-sky-haze-1"></div>
      <div class="hero-sky-haze hero-sky-haze-2"></div>
    </div>

    <!-- Ship layer -->
    <div class="ship-layer">
      <Ship3D />
    </div>

    <!-- Hero text content -->
    <div class="hero-content relative z-20 flex flex-col items-center text-center max-w-4xl w-full">
      <h1 class="hero-title text-6xl md:text-8xl font-bold mb-4 text-cream" style="text-shadow: 0 2px 12px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.3);">
        SAFWAN HAKIM
      </h1>
      <p class="hero-subtitle text-2xl md:text-3xl mb-6 text-cream font-semibold" style="text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        Associate Software Manager
      </p>
      <p class="hero-desc text-lg md:text-xl mb-10 text-cream/90 max-w-2xl mx-auto leading-relaxed font-medium" style="text-shadow: 0 1px 6px rgba(0,0,0,0.2);">
        8+ years steering products, mentoring crews, and shipping resilient systems across the Grand Line of software engineering.
      </p>

      <div class="flex justify-center gap-6 mb-10">
        <button
          @click="scrollTo('projects')"
          class="hero-cta group px-10 py-4 bg-[#000920] text-[#F4EBDF] font-extrabold rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-[#001a3d] border-2 border-cream/30"
          style="text-shadow: 0 1px 3px rgba(0,0,0,0.2);"
        >
          <span class="inline-flex items-center gap-2">
            Explore My Voyage
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </span>
        </button>
      </div>

      <div class="flex justify-center items-center gap-6 flex-wrap">
        <a href="mailto:putrafyp@gmail.com" target="_blank"
          class="hero-social group flex items-center gap-3 px-6 py-3 bg-ocean-500/15 backdrop-blur-md rounded-full text-cream border border-sky/30 transition-all duration-300 hover:bg-ocean-500/25 hover:border-secondary/50 hover:scale-105 shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <polyline points="3 7 12 13 21 7"/>
          </svg>
          <span class="font-semibold">Email</span>
        </a>
        <a href="https://www.linkedin.com/in/safwan-hakim/" target="_blank"
          class="hero-social group flex items-center gap-3 px-6 py-3 bg-ocean-500/15 backdrop-blur-md rounded-full text-cream border border-sky/30 transition-all duration-300 hover:bg-ocean-500/25 hover:border-secondary/50 hover:scale-105 shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span class="font-semibold">LinkedIn</span>
        </a>
        <a href="https://github.com/wankimmy" target="_blank"
          class="hero-social group flex items-center gap-3 px-6 py-3 bg-ocean-500/15 backdrop-blur-md rounded-full text-cream border border-sky/30 transition-all duration-300 hover:bg-ocean-500/25 hover:border-secondary/50 hover:scale-105 shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span class="font-semibold">GitHub</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import Ship3D from './Ship3D.vue'

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.3 })
  tl.fromTo('.hero-title', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' })
    .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .fromTo('.hero-cta', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.2')
    .fromTo('.hero-social', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 }, '-=0.2')
})
</script>

<style scoped>
.hero-section {
  isolation: isolate;
}

.hero-atmosphere {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.hero-sun-glow {
  position: absolute;
  top: 6%;
  right: 8%;
  width: min(26vw, 280px);
  aspect-ratio: 1;
  border-radius: 9999px;
  background:
    radial-gradient(circle, rgba(255, 250, 220, 0.95) 0%, rgba(255, 241, 184, 0.5) 28%, rgba(255, 230, 140, 0.18) 48%, rgba(255, 230, 140, 0) 72%);
  filter: blur(4px);
  opacity: 0.95;
}

.hero-sky-haze {
  position: absolute;
  inset: auto;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.1));
  filter: blur(24px);
  opacity: 0.8;
}

.hero-sky-haze-1 {
  width: min(52vw, 680px);
  height: 120px;
  top: 16%;
  left: -6%;
  transform: rotate(-4deg);
}

.hero-sky-haze-2 {
  width: min(42vw, 520px);
  height: 96px;
  top: 28%;
  right: -4%;
  transform: rotate(3deg);
}

.ship-layer {
  position: absolute;
  left: 50%;
  top: 4%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: auto;
}

.hero-content {
  position: relative;
  z-index: 20;
  margin-top: min(340px, 62vw);
}

@media (max-width: 480px) {
  .text-6xl { font-size: 3rem; line-height: 1.1; }
  .hero-sun-glow {
    width: 180px;
    top: 8%;
    right: -8%;
  }
  .hero-sky-haze-1 {
    width: 320px;
    height: 88px;
    top: 14%;
  }
  .hero-sky-haze-2 {
    width: 240px;
    height: 72px;
    top: 24%;
  }
  .ship-layer { top: 2%; }
  .hero-content { margin-top: min(260px, 72vw); }
}

@media (min-width: 481px) and (max-width: 768px) {
  .ship-layer { top: 3%; }
  .hero-content { margin-top: min(360px, 60vw); }
}

@media (min-width: 769px) {
  .ship-layer { top: 3%; }
  .hero-content { margin-top: min(400px, 34vw); }
}
</style>
