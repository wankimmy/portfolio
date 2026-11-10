<template>
  <section id="certificates" class="section trophies">
    <div class="wrap">
      <header class="section__head">
        <p class="label">Trophies</p>
        <h2 class="h2" data-split>Certifications earned along the way.</h2>
      </header>

      <ul class="trophies__list" data-reveal-group>
        <li v-for="cert in certificates" :key="cert.name" class="trophy">
          <span class="trophy__year">{{ cert.year }}</span>
          <h3 class="trophy__name">{{ cert.name }}</h3>
          <span class="trophy__issuer">{{ cert.issuer }}</span>
          <a class="link" :href="cert.file" target="_blank" rel="noopener noreferrer">
            View credential<span class="sr-only">: {{ cert.name }} (PDF)</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { certificates } from '../content.js'
</script>
