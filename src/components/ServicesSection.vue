<template>
  <section id="services" class="section">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Guild services</p>
          <h2 class="section-title">Quests I take on for clients.</h2>
        </div>
        <p class="section-index">02</p>
      </div>

      <div class="services-grid">
        <article
          v-for="service in services"
          :key="service.tag"
          class="service-card tilt-card"
          :style="{ '--service-glow': service.glow }"
        >
          <div class="service-card__ambient" aria-hidden="true"></div>
          <div class="gilt-frame" aria-hidden="true"></div>
          <div class="service-card__head">
            <span class="service-card__tag">{{ service.tag }}</span>
            <span class="service-card__num">{{ service.num }}</span>
          </div>
          <h3 class="service-card__title">{{ service.title }}</h3>
          <p class="service-card__copy">{{ service.description }}</p>
          <ul class="service-card__points">
            <li v-for="point in service.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    num: '01',
    tag: 'WEB',
    title: 'Web App Development',
    description:
      'Full-stack web applications with Laravel, Vue, and Nuxt. From admin dashboards to customer portals.',
    points: ['Custom dashboards & portals', 'REST API design', 'Responsive on every device'],
    glow: 'radial-gradient(circle at top left, rgba(176, 128, 52, 0.2), transparent 62%)',
  },
  {
    num: '02',
    tag: 'PAY',
    title: 'E-commerce & Payments',
    description:
      'Online stores and booking systems with payment gateways done right — I spent years in the payment industry.',
    points: ['FPX, cards & e-wallets', 'WooCommerce or custom builds', 'Order & inventory flows'],
    glow: 'radial-gradient(circle at top right, rgba(20, 144, 173, 0.18), transparent 62%)',
  },
  {
    num: '03',
    tag: 'AI',
    title: 'AI Chatbots & Automation',
    description:
      'Practical AI that helps your business: chatbots, smart workflows, and integrations that save hours.',
    points: ['Custom AI chatbots', 'Workflow automation', 'LLM API integrations'],
    glow: 'radial-gradient(circle at center, rgba(176, 128, 52, 0.16), transparent 60%)',
  },
  {
    num: '04',
    tag: 'IOT',
    title: 'IoT Solutions & Training',
    description:
      'Connected devices and hands-on workshops using Node-RED, Raspberry Pi, MQTT, and sensors.',
    points: ['Prototypes & dashboards', 'Sensor data pipelines', 'Team training sessions'],
    glow: 'radial-gradient(circle at bottom left, rgba(20, 144, 173, 0.16), transparent 62%)',
  },
  {
    num: '05',
    tag: 'OPS',
    title: 'Hosting & DevOps',
    description:
      'Deployment that stays up: Docker, AWS, Nginx, and Cloudflare with monitoring and backups in place.',
    points: ['Docker & cloud setup', 'CI/CD pipelines', 'SSL, backups & monitoring'],
    glow: 'radial-gradient(circle at top left, rgba(176, 128, 52, 0.14), transparent 58%)',
  },
  {
    num: '06',
    tag: 'ADV',
    title: 'Consulting & Code Review',
    description:
      'A second pair of senior eyes on your project: architecture advice, security checks, and code reviews.',
    points: ['Architecture planning', 'Security review', 'Developer mentoring'],
    glow: 'radial-gradient(circle at bottom right, rgba(20, 144, 173, 0.14), transparent 62%)',
  },
]
</script>
