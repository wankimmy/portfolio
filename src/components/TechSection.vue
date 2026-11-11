<template>
  <section id="tech" ref="sectionRef" class="section abilities">
    <div class="wrap">
      <header class="section__head">
        <p class="label">Abilities</p>
        <h2 class="h2" data-split>Nine years of weapons forged.</h2>
      </header>
    </div>

    <!-- Each row lists its skills once for readers; the moving copy is decoration. -->
    <div class="abilities__rows">
      <div v-for="(row, index) in skillRows" :key="row.label" class="ability-row">
        <p class="label ability-row__label wrap">{{ row.label }}</p>
        <ul class="sr-only">
          <li v-for="item in row.items" :key="item">{{ item }}</li>
        </ul>
        <div class="ability-row__viewport" aria-hidden="true">
          <div class="ability-row__track" :class="{ 'ability-row__track--alt': index % 2 === 1 }">
            <span v-for="n in 2" :key="n" class="ability-row__set">
              <span v-for="item in row.items" :key="item" class="ability-row__item">{{ item }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { skillRows } from '../content.js'

const sectionRef = ref(null)
let mm = null
let loops = []

onMounted(() => {
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const tracks = gsap.utils.toArray('.ability-row__track', sectionRef.value)
    // two identical sets side by side: sliding by half the track loops with no visible jump
    loops = tracks.map((track, index) => {
      const reverse = index % 2 === 1
      return gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: 46 + index * 8, ease: 'none', repeat: -1 },
      )
    })

    // scrolling pushes the rows faster; they settle back when you stop
    const settle = gsap.quickTo(loops, 'timeScale', { duration: 0.8, ease: 'power2.out' })
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(loops, { timeScale: 1 + Math.min(6, Math.abs(self.getVelocity()) / 350) })
        settle(1)
      },
    })

    return () => {
      trigger.kill()
      loops.forEach((loop) => loop.kill())
      loops = []
    }
  })
})

onUnmounted(() => mm?.revert())
</script>
