<template>
  <section id="tech" ref="sectionRef" class="section">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Abilities</p>
          <h2 class="section-title">Skills honed across a decade of quests.</h2>
        </div>
        <p class="section-index">01</p>
      </div>

      <div class="tech-grid">
        <div v-for="group in techGroups" :key="group.title" class="tech-grid__item">
          <article class="tech-card tilt-card">
            <h3 class="tech-card__heading">{{ group.title }}</h3>
            <div class="ability-bar">
              <p class="ability-bar__meta">
                <span>Mastery</span>
                <strong>{{ group.mastery }} / 100</strong>
              </p>
              <span class="ability-bar__track">
                <span class="ability-bar__fill" :style="{ '--mastery': group.mastery + '%' }"></span>
              </span>
            </div>
            <div class="tech-card__chips">
              <span v-for="item in group.items" :key="item">{{ item }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const sectionRef = ref(null)
let ctx

const techGroups = [
  {
    title: 'Frontend',
    mastery: 92,
    items: ['Vue.js', 'React', 'Nuxt', 'HTML & CSS', 'Bootstrap', 'Tailwind'],
  },
  {
    title: 'Backend',
    mastery: 95,
    items: ['Laravel', 'Yii2', 'Node.js', 'Wordpress', 'Integrations', 'REST APIs'],
  },
  {
    title: 'Database',
    mastery: 90,
    items: ['MySQL', 'PostgreSQL', 'MariaDB', 'Redis', 'SQLite', 'CouchDB'],
  },
  {
    title: 'IoT',
    mastery: 84,
    items: ['Node-RED', 'Raspberry Pi', 'MQTT', 'Arduino', 'Sensors', 'Python'],
  },
  {
    title: 'Hosting',
    mastery: 88,
    items: ['AWS', 'Docker', 'Nginx', 'Cloudflare', 'Hostinger', 'Linux'],
  },
  {
    title: 'Tools',
    mastery: 91,
    items: ['Codex', 'Claude', 'Cursor', 'CodeRabbit', 'Git', 'Postman'],
  },
]

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !sectionRef.value) {
    return
  }

  ctx = gsap.context(() => {
    gsap.utils.toArray('.ability-bar__fill').forEach((fill) => {
      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: fill,
            start: 'top 90%',
            once: true,
          },
        },
      )
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
