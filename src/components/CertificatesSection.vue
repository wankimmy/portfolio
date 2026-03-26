<template>
  <section id="certificates" class="section section--panel">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Validated Expertise</p>
          <h2 class="section-title">Security, IoT, and practical upskilling that sharpens delivery work.</h2>
        </div>
        <p class="section-index">02</p>
      </div>

      <div class="cert-grid">
        <article v-for="cert in certificates" :key="cert.id" class="cert-card reveal">
          <span class="cert-card__icon">{{ cert.icon }}</span>
          <p class="cert-card__issuer">{{ cert.issuer }}</p>
          <h3>{{ cert.name }}</h3>
          <p class="cert-card__date">{{ cert.date }}</p>
          <p class="cert-card__description">{{ cert.description }}</p>
          <a class="text-link" :href="cert.file" target="_blank" rel="noopener">View credential</a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const certificates = [
  {
    id: 1,
    name: 'Web Application Hacking And Defense',
    issuer: 'Condition Zebra',
    date: '2024',
    description: 'Hands-on training in application security, attack surfaces, and defensive thinking.',
    icon: '◉',
    file: '/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf',
  },
  {
    id: 2,
    name: 'OWASP Security Foundation',
    issuer: 'OWASP Foundation',
    date: '2022',
    description: 'A foundation in core web security risks, vulnerabilities, and safer engineering practice.',
    icon: '◎',
    file: '/assets/Safwan_Hakim_owasp.pdf',
  },
  {
    id: 3,
    name: 'IoT Security Certification',
    issuer: 'Tertiary Courses',
    date: '2021',
    description: 'Security fundamentals for connected devices, deployment, and protected communications.',
    icon: '◌',
    file: '/assets/E-cert_IoT_Security_Safwan_Hakim.pdf',
  },
  {
    id: 4,
    name: 'Industry 4.0 E-Certification',
    issuer: 'Tertiary Courses',
    date: '2021',
    description: 'Automation, IoT, data, and digital manufacturing concepts applied to modern operations.',
    icon: '◍',
    file: '/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf',
  },
]
</script>
