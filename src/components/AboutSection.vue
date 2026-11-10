<template>
  <section id="about" ref="sectionRef" class="section status">
    <div class="wrap">
      <header class="section__head">
        <p class="label">Status</p>
        <h2 class="h2" data-split>I like building products that are useful for the community.</h2>
      </header>

      <div class="status__grid">
        <div class="status__story">
          <p ref="leadRef" class="status__lead">
            I do not just write code. I think about the full product: the design, the flow, the system behind it,
            how people use it and how you want to sell it.
          </p>
          <p data-reveal>
            Over the years, I have worked as a software engineer and a manager. I still like solving real problems
            and keeping things done.
          </p>
          <p class="status__motto" data-reveal><em>Cheap cheap no good, good good no cheap.</em></p>

          <ul class="status__rules" data-reveal-group>
            <li v-for="rule in principles" :key="rule.name">
              <strong>{{ rule.name }}</strong>
              <span>{{ rule.copy }}</span>
            </li>
          </ul>
        </div>

        <aside ref="sheetRef" class="sheet" aria-label="Character sheet" data-reveal>
          <header class="sheet__head">
            <span class="sheet__avatar" aria-hidden="true">SH</span>
            <div>
              <h3 class="sheet__name">{{ profile.name }}</h3>
              <p class="sheet__class">{{ profile.role }} · Confidential (property)</p>
              <p class="label">Level {{ profile.level }} · Class: Builder</p>
            </div>
          </header>

          <dl class="sheet__stats">
            <div v-for="stat in stats" :key="stat.label" class="stat">
              <dt>{{ stat.label }}</dt>
              <dd>
                <span class="stat__value">{{ stat.value }}</span>
                <span class="stat__track" aria-hidden="true">
                  <span class="stat__fill" :style="{ '--fill': stat.value / 100 }"></span>
                </span>
              </dd>
            </div>
          </dl>

          <dl class="sheet__facts">
            <div>
              <dt>Languages</dt>
              <dd>{{ profile.languages.join(', ') }}</dd>
            </div>
            <div v-for="school in profile.education" :key="school.what">
              <dt>{{ school.when }}</dt>
              <dd>{{ school.what }}, {{ school.where }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

import { principles, profile, stats } from '../content.js'

const sectionRef = ref(null)
const leadRef = ref(null)
const sheetRef = ref(null)
let mm = null

onMounted(() => {
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // the lead paragraph lights up word by word as you read down it
    const split = SplitText.create(leadRef.value, { type: 'words' })
    gsap.fromTo(
      split.words,
      { opacity: 0.22 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: leadRef.value, start: 'top 82%', end: 'bottom 48%', scrub: true },
      },
    )

    // bars are full by default; they only empty in the frame they start to fill
    const fills = sheetRef.value.querySelectorAll('.stat__fill')
    gsap.fromTo(
      fills,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.07,
        immediateRender: false,
        scrollTrigger: { trigger: sheetRef.value, start: 'top 78%', once: true },
      },
    )

    return () => split.revert()
  })
})

onUnmounted(() => mm?.revert())
</script>
