<template>
  <section id="pricing" ref="sectionRef" class="section section--panel">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Item shop</p>
          <h2 class="section-title">Honest pricing, no hidden traps.</h2>
        </div>
        <p class="section-index">03</p>
      </div>

      <div class="pricing-grid">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card tilt-card"
          :class="{ 'pricing-card--popular': plan.popular }"
        >
          <div class="gilt-frame" aria-hidden="true"></div>
          <span v-if="plan.popular" class="pricing-card__badge">★ Party favourite</span>
          <span class="pricing-card__item">✦ {{ plan.item }}</span>
          <p class="pricing-card__name">{{ plan.name }}</p>
          <p class="pricing-card__tagline">{{ plan.tagline }}</p>
          <p class="pricing-card__price">
            <span class="pricing-card__from">from</span>
            <span class="pricing-card__currency">RM</span>
            <span class="pricing-card__amount" :data-price="plan.price">{{
              formatPrice(plan.price)
            }}</span>
          </p>
          <ul class="pricing-card__features">
            <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
          </ul>
          <a
            class="button pricing-card__cta"
            :class="plan.popular ? 'button--primary' : 'button--ghost'"
            :href="whatsappLink(plan.name)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ plan.cta }}
          </a>
        </article>
      </div>

      <aside class="pricing-care tilt-card reveal">
        <div class="pricing-care__info">
          <p class="pricing-care__name">✦ Regen — Care Plan</p>
          <p class="pricing-care__copy">
            Already have a site? I keep it healthy — hosting, updates, backups, and small tweaks
            handled for you.
          </p>
        </div>
        <p class="pricing-care__price">
          <span class="pricing-card__currency">RM</span>
          <span class="pricing-card__amount" data-price="200">{{ formatPrice(200) }}</span>
          <span class="pricing-care__period">/month</span>
        </p>
        <a
          class="button button--ghost button--compact"
          :href="whatsappLink('Care Plan')"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask about care
        </a>
      </aside>

      <p class="pricing-note reveal">
        Prices are starting estimates in MYR — every quest is scoped honestly after a free chat.
        Student or non-profit? Talk to me, I'm flexible. No gil accepted (yet).
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const sectionRef = ref(null)
let ctx

const plans = [
  {
    name: 'Starter Website',
    item: 'Potion',
    tagline: 'For small businesses that need to look good online.',
    price: 1500,
    popular: false,
    cta: 'Start a website',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-friendly & fast loading',
      'Basic SEO & analytics setup',
      'WhatsApp & contact integration',
      'Delivered in 1–2 weeks',
      '1 month of free support',
    ],
  },
  {
    name: 'Business Web App',
    item: 'Hi-Potion',
    tagline: 'Online stores, bookings, and custom dashboards.',
    price: 4500,
    popular: true,
    cta: 'Build my app',
    features: [
      'Custom Laravel / Vue build',
      'Payment gateway (FPX, cards, e-wallets)',
      'Admin dashboard & reporting',
      'Hosting & deployment included',
      'Delivered in 4–6 weeks',
      '2 months of free support',
    ],
  },
  {
    name: 'Custom System / MVP',
    item: 'Elixir',
    tagline: 'Turn your startup idea into a working product.',
    price: 8000,
    popular: false,
    cta: 'Discuss my idea',
    features: [
      'Full SaaS MVP with user accounts',
      'AI features & API integrations',
      'Docker-based cloud deployment',
      'Security review included',
      'Roadmap & architecture advice',
      '3 months of free support',
    ],
  },
]

const formatPrice = (value) => value.toLocaleString('en-MY')

const whatsappLink = (plan) =>
  `https://wa.me/60177786836?text=${encodeURIComponent(
    `Hi Safwan, I'm interested in the ${plan} package from your portfolio.`,
  )}`

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !sectionRef.value) {
    return
  }

  ctx = gsap.context(() => {
    gsap.utils.toArray('.pricing-card__amount').forEach((el) => {
      const target = Number(el.dataset.price)
      if (!Number.isFinite(target)) {
        return
      }
      const counter = { value: 0 }
      gsap.to(counter, {
        value: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = formatPrice(Math.round(counter.value))
        },
        onComplete: () => {
          el.textContent = formatPrice(target)
        },
      })
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
