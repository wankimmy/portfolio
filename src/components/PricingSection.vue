<template>
  <section id="pricing" ref="sectionRef" class="section shop">
    <div class="wrap">
      <header class="section__head">
        <p class="label">Shop</p>
        <h2 class="h2" data-split>Honest pricing, no hidden traps.</h2>
      </header>

      <ul class="shop__list" data-reveal-group>
        <li v-for="plan in plans" :key="plan.name" class="plan" :class="{ 'plan--popular': plan.popular }">
          <div class="plan__name">
            <p v-if="plan.popular" class="label plan__flag">Most popular</p>
            <h3>{{ plan.name }}</h3>
            <p class="plan__tagline">{{ plan.tagline }}</p>
          </div>
          <ul class="plan__features">
            <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
          </ul>
          <div class="plan__buy">
            <p class="plan__price">
              <span class="plan__from">from RM</span>
              <span class="plan__amount" :data-price="plan.price">{{ formatPrice(plan.price) }}</span>
            </p>
            <a
              class="btn"
              :class="plan.popular ? 'btn--gold' : 'btn--line'"
              :href="whatsappLink(`Hi Safwan, I'm interested in the ${plan.name} package from your portfolio.`)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ plan.cta }}
            </a>
          </div>
        </li>

        <li class="plan plan--care">
          <div class="plan__name">
            <h3>{{ carePlan.name }}</h3>
          </div>
          <p class="plan__care-copy">{{ carePlan.copy }}</p>
          <div class="plan__buy">
            <p class="plan__price">
              <span class="plan__from">RM</span>
              <span class="plan__amount" :data-price="carePlan.price">{{ formatPrice(carePlan.price) }}</span>
              <span class="plan__from">/ month</span>
            </p>
            <a
              class="btn btn--line"
              :href="whatsappLink(`Hi Safwan, I'm interested in the ${carePlan.name} from your portfolio.`)"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask about care
            </a>
          </div>
        </li>
      </ul>

      <p class="shop__note" data-reveal>
        Prices are starting estimates in MYR, and every project is scoped honestly after a free chat. Student or
        non-profit? Talk to me, I'm flexible.
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { carePlan, plans, whatsappLink } from '../content.js'

const sectionRef = ref(null)
let mm = null

const formatPrice = (value) => value.toLocaleString('en-MY')

onMounted(() => {
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Prices tick up once, the first time each one is on screen. The real price
    // is in the markup; it is only zeroed as the row crosses the bottom edge.
    gsap.utils.toArray('.plan__amount', sectionRef.value).forEach((el) => {
      const target = Number(el.dataset.price)
      const counter = { value: 0 }
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          el.textContent = '0'
        },
      })
      gsap.to(counter, {
        value: target,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = formatPrice(Math.round(counter.value))
        },
      })
    })
  })
})

onUnmounted(() => mm?.revert())
</script>
