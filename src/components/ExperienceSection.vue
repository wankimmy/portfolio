<template>
  <section id="experience" class="section section--panel">
    <div class="section__inner">
      <div class="section-heading section-heading--center reveal">
        <p class="section-kicker">Orbit History</p>
        <h2 class="section-title">A career shaped by delivery, mentoring, and systems thinking.</h2>
      </div>

      <div class="experience-list">
        <article v-for="job in experience" :key="job.period + job.company" class="experience-item reveal">
          <div class="experience-item__meta">
            <span>{{ job.period }}</span>
            <h3>{{ job.company }}</h3>
            <p>{{ job.title }}</p>
          </div>

          <div class="experience-item__body">
            <p class="experience-item__summary">{{ job.summary }}</p>
            <ul class="experience-item__highlights">
              <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const experience = [
  {
    period: 'Apr 2020 — Present',
    title: 'Associate Software Manager',
    company: 'Fiuu',
    summary:
      'Promoted from software engineer into engineering leadership, balancing architecture, delivery planning, code quality, and merchant-facing customization across regional markets.',
    duties: [
      'Led engineering execution and shipped 850+ fixes and enhancements across BAU and high-priority initiatives.',
      'Coordinated planning, resourcing, and milestone tracking for merchants across MY, PH, SG, and ID.',
      'Mentored developers through code review, release support, and hands-on debugging during production pressure.',
    ],
  },
  {
    period: 'Jan 2020 — Oct 2021',
    title: 'Web Software Developer, Part-time',
    company: 'My Innovative Wellness Sdn Bhd',
    summary:
      'Built and maintained e-commerce experiences while handling cloud infrastructure, analytics, and operational support for a growing wellness business.',
    duties: [
      'Delivered WooCommerce-powered commerce flows and internal support tools.',
      'Managed AWS EC2, Hostinger, Cloudflare, and analytics integrations for the broader platform stack.',
    ],
  },
  {
    period: 'Jan 2018 — Dec 2019',
    title: 'Freelance Developer and Node-RED Trainer',
    company: 'Independent and Tertiary Courses Malaysia',
    summary:
      'Partnered with startups and educational programs on websites, digital products, and technical workshops focused on IoT and practical web development.',
    duties: [
      'Built business websites and e-commerce solutions using WordPress, Laravel, and custom PHP stacks.',
      'Delivered Raspberry Pi and Node-RED training for UniKL, MSU, and UUM learners.',
    ],
  },
  {
    period: 'Aug 2016 — Aug 2018',
    title: 'Junior Programmer',
    company: 'Unijaya Resource Sdn Bhd',
    summary:
      'Contributed to major delivery work early in my career, supporting mobile products, internal modules, and web experience improvements.',
    duties: [
      'Helped deliver a RM3M project across two modules with a five-person team.',
      'Released a mobile application to the Play Store and App Store and improved company website UX.',
    ],
  },
]
</script>
