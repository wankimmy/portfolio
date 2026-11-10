<template>
  <section id="experience" class="section log">
    <div class="wrap">
      <header class="section__head">
        <p class="label">Quest log</p>
        <h2 class="h2" data-split>Years of coding, stressing, and feeding my tummy.</h2>
      </header>

      <ol class="log__list" data-reveal-group>
        <li v-for="(job, index) in experience" :key="job.period + job.title" class="log-row" :class="{ 'is-open': openIndex === index }">
          <h3 class="log-row__heading">
            <button
              type="button"
              class="log-row__toggle"
              :aria-expanded="openIndex === index"
              :aria-controls="`log-panel-${index}`"
              @click="toggle(index)"
            >
              <span class="log-row__period">{{ job.period }}</span>
              <span class="log-row__title">{{ job.title }}</span>
              <span class="log-row__company">
                {{ job.company }}
                <span v-if="job.note" class="log-row__note">{{ job.note }}</span>
              </span>
              <span class="log-row__sign" aria-hidden="true"></span>
            </button>
          </h3>

          <div v-show="openIndex === index" :id="`log-panel-${index}`" class="log-row__panel">
            <p class="log-row__summary">{{ job.summary }}</p>
            <ul class="log-row__duties">
              <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { experience } from '../content.js'

// the current role starts open; one row open at a time keeps the list scannable
const openIndex = ref(0)

const toggle = async (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
  // the page just changed height: every trigger below this row has moved
  await nextTick()
  ScrollTrigger.refresh()
}
</script>
