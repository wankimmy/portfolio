<template>
  <section id="tech" class="section">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Core Technologies</p>
          <h2 class="section-title">Built for reliability, velocity, and long-term maintainability.</h2>
        </div>
        <p class="section-index">01</p>
      </div>

      <div class="tech-grid">
        <article v-for="group in techGroups" :key="group.title" class="tech-card reveal">
          <p class="tech-card__eyebrow">{{ group.eyebrow }}</p>
          <h3>{{ group.title }}</h3>
          <p>{{ group.description }}</p>
          <div class="tech-card__chips">
            <span v-for="item in group.items" :key="item">{{ item }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const techGroups = [
  {
    eyebrow: 'Platform engineering',
    title: 'Backend systems',
    description: 'Production-grade application development with pragmatic architecture decisions.',
    items: ['Laravel', 'PHP', 'Node.js', 'Vue.js', 'JavaScript'],
  },
  {
    eyebrow: 'Data layer',
    title: 'Persistence and performance',
    description: 'Relational data models, operational resilience, and tuning under production load.',
    items: ['MySQL', 'PostgreSQL', 'MariaDB', 'Redis', 'Nginx'],
  },
  {
    eyebrow: 'Cloud and delivery',
    title: 'Infrastructure',
    description: 'Deployment environments, containerization, and dependable release workflows.',
    items: ['AWS', 'Docker', 'Git', 'Hostinger', 'Cloudflare'],
  },
  {
    eyebrow: 'AI-augmented workflow',
    title: 'Modern tooling',
    description: 'Using AI and review tooling to improve throughput without sacrificing judgment.',
    items: ['Codex', 'Claude', 'Cursor', 'Ollama', 'CodeRabbit'],
  },
]
</script>
