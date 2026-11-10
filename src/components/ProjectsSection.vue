<template>
  <section id="projects" ref="sectionRef" class="quests" aria-labelledby="quests-title">
    <div ref="pinRef" class="quests__pin">
      <header class="wrap quests__head">
        <div class="section__head">
          <p class="label">Completed quests</p>
          <h2 id="quests-title" class="h2" data-split>Startups I have built and shipped.</h2>
        </div>
        <p class="quests__count" aria-hidden="true">
          <span ref="countRef">01</span> / {{ String(projects.length).padStart(2, '0') }}
        </p>
      </header>

      <div ref="viewportRef" class="quests__viewport" tabindex="0" role="group" aria-label="Projects, scroll sideways">
        <ol ref="trackRef" class="quests__track">
          <li v-for="project in projects" :key="project.name" class="quest">
            <a class="quest__media" :href="project.live" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
              <img :src="project.image" :alt="project.alt" width="1280" height="800" loading="lazy" decoding="async" />
            </a>
            <div class="quest__body">
              <p class="label">{{ project.kind }} · {{ project.category }}</p>
              <h3 class="quest__name">{{ project.name }}</h3>
              <p class="quest__copy">{{ project.description }}</p>
              <p class="quest__tech">{{ project.tech.join(' / ') }}</p>
              <a class="link" :href="project.live" target="_blank" rel="noopener noreferrer">
                Visit {{ project.url }}
              </a>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

import { projects } from '../content.js'

const sectionRef = ref(null)
const pinRef = ref(null)
const viewportRef = ref(null)
const trackRef = ref(null)
const countRef = ref(null)
let mm = null

onMounted(() => {
  mm = gsap.matchMedia()

  // Desktop with motion: the section pins and vertical scroll drives the row sideways.
  // Everywhere else the row is a native horizontal scroller with snap points.
  mm.add('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const track = trackRef.value
    const viewport = viewportRef.value
    viewport.classList.add('is-pinned')
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pinRef.value,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1)
          countRef.value.textContent = String(index).padStart(2, '0')
        },
      },
    })

    // keyboard: tabbing to a card that is off to the side scrolls the page to it
    const onFocusIn = (e) => {
      const card = e.target.closest('.quest')
      const st = tween.scrollTrigger
      // a mouse click focuses the link too: moving the card then would eat the click
      if (!card || !st || !e.target.matches(':focus-visible')) return
      const ratio = distance() > 0 ? Math.min(1, card.offsetLeft / distance()) : 0
      const y = st.start + ratio * (st.end - st.start)
      window.scrollTo({ top: y })
    }
    track.addEventListener('focusin', onFocusIn)

    return () => {
      track.removeEventListener('focusin', onFocusIn)
      viewport.classList.remove('is-pinned')
    }
  })
})

onUnmounted(() => mm?.revert())
</script>
