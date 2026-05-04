<template>
  <section id="tech" class="section">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Skills</p>
          <h2 class="section-title">Tools I use to make my life easier.</h2>
        </div>
        <p class="section-index">01</p>
      </div>

      <div class="tech-grid">
        <div v-for="group in techGroups" :key="group.title" class="tech-grid__item">
          <article class="tech-card tilt-card">
            <h3 class="tech-card__heading">{{ group.title }}</h3>
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
const techGroups = [
  {
    title: 'Frontend',
    items: ['Vue.js', 'React', 'Nuxt', 'HTML & CSS', 'Bootstrap', 'Tailwind'],
  },
  {
    title: 'Backend',
    items: ['Laravel', 'Yii2', 'Node.js', 'Wordpress', 'Integrations', 'REST APIs'],
  },
  {
    title: 'Database',
    items: ['MySQL', 'PostgreSQL', 'MariaDB', 'Redis', 'SQLite', 'CouchDB'],
  },
  {
    title: 'IoT',
    items: ['Node-RED', 'Raspberry Pi', 'MQTT', 'Arduino', 'Sensors', 'Python'],
  },
  {
    title: 'Hosting',
    items: ['AWS', 'Docker', 'Nginx', 'Cloudflare', 'Hostinger', 'Linux'],
  },
  {
    title: 'Tools',
    items: ['Codex', 'Claude', 'Cursor', 'CodeRabbit', 'Git', 'Postman'],
  },
]
</script>
