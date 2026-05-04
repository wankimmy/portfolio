<template>
  <section id="certificates" class="section section--panel">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Certificates</p>
          <h2 class="section-title">I'm bored so I want to learn something new.</h2>
        </div>
        <p class="section-index">02</p>
      </div>

      <div class="cert-grid">
        <article
          v-for="cert in certificates"
          :key="cert.id"
          class="cert-card tilt-card reveal"
          :style="{ '--cert-glow': cert.glow }"
        >
          <div class="cert-card__ambient" aria-hidden="true"></div>
          <div class="cert-card__overlay" aria-hidden="true"></div>
          <div class="cert-card__content">
            <span class="cert-card__icon">{{ cert.icon }}</span>
            <p class="cert-card__issuer">{{ cert.issuer }}</p>
            <h3>{{ cert.name }}</h3>
            <p class="cert-card__date">{{ cert.date }}</p>
            <p class="cert-card__description">{{ cert.description }}</p>
            <a
              v-if="cert.file"
              class="text-link cert-card__link"
              :href="cert.file"
              target="_blank"
              rel="noopener noreferrer"
            >
              View credential
            </a>
            <p v-else class="cert-card__note">Credential available on request.</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const certificates = [
  {
    id: 1,
    name: 'Web Application Hacking and Defense',
    issuer: 'Condition Zebra',
    date: '2024',
    description: 'Hands-on security training for web apps.',
    icon: 'SEC',
    file: '/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf',
    glow: 'radial-gradient(circle at top left, rgba(124, 239, 245, 0.2), transparent 60%)',
  },
  {
    id: 2,
    name: 'OWASP Security Foundation',
    issuer: 'OWASP Foundation',
    date: '2022',
    description: 'Core web security basics and safe coding practice.',
    icon: 'APP',
    file: '/assets/Safwan_Hakim_owasp.pdf',
    glow: 'radial-gradient(circle at top right, rgba(255, 180, 106, 0.16), transparent 62%)',
  },
  {
    id: 3,
    name: 'IoT Security Certification',
    issuer: 'Tertiary Courses',
    date: '2021',
    description: 'Basic security for connected devices and communication.',
    icon: 'IOT',
    file: '/assets/E-cert_IoT_Security_Safwan_Hakim.pdf',
    glow: 'radial-gradient(circle at center, rgba(124, 239, 245, 0.14), transparent 58%)',
  },
  {
    id: 4,
    name: 'Industry 4.0 E-Certification',
    issuer: 'Tertiary Courses',
    date: '2021',
    description: 'Basic knowledge of automation, IoT, and digital systems.',
    icon: 'IR4',
    file: '/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf',
    glow: 'radial-gradient(circle at bottom right, rgba(255, 180, 106, 0.14), transparent 64%)',
  },
]
</script>
