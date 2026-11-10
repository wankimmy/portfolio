<template>
  <section id="services" class="section party">
    <div class="wrap party__grid">
      <header class="section__head party__head">
        <p class="label">Party for hire</p>
        <h2 class="h2" data-split>Work I take on for clients.</h2>
        <p class="party__intro" data-reveal>
          One senior engineer, or a small party from my software house when the quest is bigger.
        </p>
      </header>

      <ul class="party__list" data-reveal-group>
        <li v-for="service in services" :key="service.tag" class="service">
          <p class="label service__tag">{{ service.tag }}</p>
          <div>
            <h3 class="service__title">{{ service.title }}</h3>
            <p class="service__copy">{{ service.description }}</p>
            <p class="service__points">{{ service.points.join(' · ') }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { services } from '../content.js'
</script>
