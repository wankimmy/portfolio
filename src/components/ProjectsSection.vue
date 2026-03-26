<template>
  <section id="projects" class="section">
    <div class="section__inner">
      <div class="section-heading reveal">
        <p class="section-kicker">Featured Artifacts</p>
        <h2 class="section-title">Commercial products, operational tools, and customer-facing experiences.</h2>
      </div>

      <div class="projects-grid">
        <article class="project-card project-card--featured reveal">
          <img
            class="project-card__image"
            src="/assets/orbital-structure.png"
            alt="Abstract futuristic orbital structure"
          />
          <div class="project-card__overlay"></div>
          <div class="project-card__content">
            <span class="project-card__eyebrow">Platform ecosystem</span>
            <h3>Festivent</h3>
            <p>
              An event-vendor marketplace experience connecting organizers with professional
              services, designed to make discovery and bookings feel streamlined.
            </p>
            <div class="project-card__chips">
              <span>Laravel</span>
              <span>PHP</span>
              <span>MySQL</span>
              <span>Bootstrap</span>
            </div>
            <a class="button button--ghost" href="https://festivent.com.my/home" target="_blank" rel="noopener">
              Visit project
            </a>
          </div>
        </article>

        <article
          v-for="project in projects"
          :key="project.name"
          class="project-card project-card--compact reveal"
          :style="{ '--project-glow': project.glow }"
        >
          <div class="project-card__ambient"></div>
          <div class="project-card__content">
            <span class="project-card__eyebrow">{{ project.category }}</span>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-card__chips">
              <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
            </div>
            <a class="text-link" :href="project.live" target="_blank" rel="noopener">
              Open {{ project.url }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    name: 'EZDisposal',
    url: 'ezdisposal.my',
    category: 'Service operations',
    description:
      'A booking platform for scheduled disposal services with streamlined vehicle and service selection.',
    live: 'https://ezdisposal.my',
    tech: ['Laravel', 'PHP', 'MySQL'],
    glow: 'radial-gradient(circle at top left, rgba(138, 235, 255, 0.2), transparent 68%)',
  },
  {
    name: 'Entrusol',
    url: 'entrusol.com',
    category: 'Commerce experience',
    description:
      'A wellness-focused e-commerce site with integrated sales flows, product storytelling, and operational tooling.',
    live: 'https://entrusol.com',
    tech: ['WordPress', 'WooCommerce', 'MySQL'],
    glow: 'radial-gradient(circle at top right, rgba(189, 194, 255, 0.18), transparent 68%)',
  },
  {
    name: 'TTDI Meatpoint',
    url: 'ttdimeatpoint.com',
    category: 'Restaurant platform',
    description:
      'A restaurant website featuring menu browsing, booking flows, and a clearer customer path to conversion.',
    live: 'https://www.ttdimeatpoint.com',
    tech: ['Laravel', 'PHP', 'Bootstrap'],
    glow: 'radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.16), transparent 70%)',
  },
]
</script>
