<template>
  <section id="home" class="hero">
    <div class="hero__inner">
      <div class="hero-scene">
        <div class="hero-scene__nebula" aria-hidden="true"></div>
        <div class="hero-scene__stars" aria-hidden="true"></div>

        <div class="hero-orbit">
          <span class="hero-orbit__planet-ring hero-orbit__planet-ring--one"></span>
          <span class="hero-orbit__planet-ring hero-orbit__planet-ring--two"></span>
          <div class="hero-orbit__planet" aria-hidden="true"></div>
        </div>

        <span class="hero-shape hero-shape--cube hero-shape--left float-card" aria-hidden="true"></span>
        <span class="hero-shape hero-shape--tetra hero-shape--top float-card" aria-hidden="true"></span>
        <span class="hero-shape hero-shape--diamond hero-shape--right float-card" aria-hidden="true"></span>
        <span class="hero-shape hero-shape--planet hero-shape--lower-left float-card" aria-hidden="true"></span>
        <span class="hero-shape hero-shape--tetra hero-shape--lower-right float-card" aria-hidden="true"></span>

        <div class="hero__copy">
          <div class="hero__eyebrow">Available for high-stakes architecture</div>
          <h1 class="hero__title">SAFWAN HAKIM</h1>
          <p class="hero__role">Associate Software Manager</p>
          <p class="hero__lead">8+ years experience exploring the digital universe</p>

          <div class="hero__actions">
            <a class="button button--primary hero__cta" href="#projects">View My Work</a>
          </div>

          <div class="hero__signals">
            <a class="hero__signal-pill" href="mailto:putrafyp@gmail.com">Email</a>
            <a class="hero__signal-pill" href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" rel="noopener">LinkedIn</a>
            <a class="hero__signal-pill" href="https://github.com/wankimmy" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    </div>

    <a class="scroll-cue" href="#about" aria-label="Scroll down to about section">
      <span class="scroll-cue__mouse">
        <span class="scroll-cue__dot"></span>
      </span>
      <span class="scroll-cue__label">Scroll down</span>
    </a>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const timeline = gsap.timeline({ delay: 0.15 })

  timeline
    .fromTo('.hero-scene', { opacity: 0, scale: 0.96, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' })
    .fromTo('.hero-orbit', { opacity: 0, scale: 0.9, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.65')
    .fromTo('.hero-shape', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.4)' }, '-=0.75')
    .fromTo('.hero__eyebrow', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero__title', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.22')
    .fromTo('.hero__role', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.42')
    .fromTo('.hero__lead', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35')
    .fromTo('.hero__actions .button', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
    .fromTo('.hero__signals a', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' }, '-=0.15')
    .fromTo('.scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')
})
</script>
