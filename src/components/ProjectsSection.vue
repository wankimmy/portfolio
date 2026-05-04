<template>
  <section id="projects" class="section">
    <div class="section__inner">
      <div class="section-heading reveal">
        <p class="section-kicker">Projects</p>
        <h2 class="section-title">A few projects I have built.</h2>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in allProjects"
          :key="project.name"
          class="project-card depth-reveal tilt-card"
          :class="{ 'project-card--featured': project.featured }"
          :style="{ '--project-glow': project.glow }"
        >
          <img
            v-if="project.image"
            class="project-card__image"
            :src="project.image"
            :alt="project.alt"
            loading="lazy"
          />
          <div class="project-card__ambient"></div>
          <div class="project-card__overlay"></div>
          <div class="project-card__content">
            <div class="project-card__top">
              <span class="project-card__meta">{{ project.featured ? 'My Startup' : project.impact }}</span>
              <span class="project-card__eyebrow">{{ project.category }}</span>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-card__chips">
                <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
              </div>
            </div>
            <a
              class="button button--ghost button--compact project-card__cta"
              :href="project.live"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ 'View' }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const allProjects = [
  {
    featured: true,
    name: 'Festivent',
    image: null,
    alt: '',
    impact: 'Featured',
    category: 'Marketplace',
    description:
      'An event marketplace that helps users find caterers, photographers, and more.',
    live: 'https://festivent.com.my/home',
    url: 'festivent.com.my',
    tech: ['Laravel', 'Hostinger', 'MySQL', 'Bootstrap'],
    glow: 'radial-gradient(circle at top left, rgba(124, 239, 245, 0.22), transparent 62%)',
  },
  {
    featured: false,
    name: 'EZDisposal',
    url: 'ezdisposal.my',
    impact: 'Service site',
    category: 'Booking',
    description:
      'A booking website to dispose waste items easily.',
    live: 'https://ezdisposal.my',
    tech: ['Laravel', 'Hostinger', 'MySQL', 'Bootstrap'],
    glow: 'radial-gradient(circle at top right, rgba(255, 180, 106, 0.18), transparent 64%)',
  },
  {
    featured: false,
    name: 'Entrusol',
    url: 'entrusol.com',
    impact: 'Online store',
    category: 'E-commerce',
    description:
      'An e-commerce site selling healthy foods.',
    live: 'https://entrusol.com',
    tech: ['WooCommerce', 'MySQL', 'AWS'],
    glow: 'radial-gradient(circle at center, rgba(124, 239, 245, 0.16), transparent 64%)',
  },
  {
    featured: false,
    name: 'TTDI Meatpoint',
    url: 'ttdimeatpoint.com',
    impact: 'Restaurant site',
    category: 'Website',
    description:
      'A restaurant website that sells delicious food.',
    live: 'https://www.ttdimeatpoint.com',
    tech: ['Wix'],
    glow: 'radial-gradient(circle at bottom right, rgba(255, 180, 106, 0.16), transparent 68%)',
  },
  {
    featured: false,
    name: 'Putra AI',
    url: 'putra.ai',
    impact: 'B2B Mini Saas Project',
    category: 'Saas',
    description:
      'A B2B mini saas project that helps businesses automate their workflows.',
    live: 'https://putra.ai',
    tech: ['Laravel', 'Docker', 'Hostinger'],
    glow: 'radial-gradient(circle at center, rgba(124, 239, 245, 0.16), transparent 64%)',
  },
]
</script>
