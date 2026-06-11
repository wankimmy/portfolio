<template>
  <section id="about" class="section section--panel">
    <div class="section__inner">
      <div class="section-heading section-heading--split reveal">
        <div>
          <p class="section-kicker">Character profile</p>
          <h2 class="section-title">I like building products that are useful for the community.</h2>
        </div>
        <p class="section-index">00</p>
      </div>

      <div class="char-layout">
        <!-- FF-style status screen -->
        <article ref="statusCardRef" class="char-card tilt-card reveal">
          <div class="gilt-frame" aria-hidden="true"></div>

          <header class="char-card__header">
            <span class="char-card__avatar" aria-hidden="true">SH</span>
            <div class="char-card__id">
              <h3 class="char-card__name">Safwan Hakim</h3>
              <p class="char-card__class">Engineer · Software Manager</p>
            </div>
            <span class="char-card__level">Lv.<strong>10</strong></span>
          </header>

          <div class="char-card__vitals">
            <div class="char-vital">
              <span class="char-vital__label">HP</span>
              <span class="char-vital__track">
                <span class="char-vital__fill char-vital__fill--hp" style="--vital: 100%"></span>
              </span>
              <span class="char-vital__value">9999 / 9999</span>
            </div>
            <div class="char-vital">
              <span class="char-vital__label">MP</span>
              <span class="char-vital__track">
                <span class="char-vital__fill char-vital__fill--mp" style="--vital: 86%"></span>
              </span>
              <span class="char-vital__value">860 / 999</span>
            </div>
          </div>

          <dl class="char-card__stats">
            <div v-for="stat in stats" :key="stat.label" class="char-stat">
              <dt>
                <span class="char-stat__abbr">{{ stat.abbr }}</span>
                <span class="char-stat__label">{{ stat.label }}</span>
              </dt>
              <dd>{{ stat.value }}</dd>
            </div>
          </dl>

          <p class="char-card__exp">
            <span>EXP 59,100</span>
            <span>Next: ship more useful products</span>
          </p>
        </article>

        <!-- Story + equipped traits -->
        <div class="char-story">
          <div ref="traitsCardRef" class="about-card tilt-card about-card--how-work reveal">
            <div class="about-card__header">
              <p class="about-card__eyebrow">Equipped traits</p>
            </div>

            <div class="about-values">
              <div class="about-value">
                <strong>✦ Keep it simple</strong>
                <span>Simple is better than complex.</span>
              </div>
              <div class="about-value">
                <strong>✦ Keep it nice</strong>
                <span>Beautiful design and smooth user experience.</span>
              </div>
              <div class="about-value">
                <strong>✦ Keep it useful</strong>
                <span>Every feature should help the user, not add noise.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <blockquote class="char-quote reveal">
        <span class="char-quote__mark" aria-hidden="true">&ldquo;</span>
        <p>
          I do not just write code. I think about the full product: the design, the flow, the
          system behind it, how people use it and how you want to sell it.
        </p>
        <p>
          Over the years, I have worked as a software engineer and a manager. I still like
          solving real problems and keeping things done.
        </p>
        <p class="char-quote__highlight">I like building products that are useful for the community.</p>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { bindCardTilt } from '../composables/useCardTilt.js'

const statusCardRef = ref(null)
const traitsCardRef = ref(null)
let unbindTraitsTilt = () => {}
let ctx

const stats = [
  { abbr: 'STR', label: 'Backend', value: 95 },
  { abbr: 'DEX', label: 'Frontend', value: 92 },
  { abbr: 'INT', label: 'Architecture', value: 90 },
  { abbr: 'WIS', label: 'Code review', value: 93 },
  { abbr: 'CHA', label: 'Team leading', value: 88 },
  { abbr: 'LCK', label: 'Shipping on time', value: 97 },
]

onMounted(() => {
  unbindTraitsTilt = bindCardTilt(traitsCardRef.value)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !statusCardRef.value) {
    return
  }

  // Vitals + stat values play once when the status card scrolls into view
  ctx = gsap.context(() => {
    const fills = gsap.utils.toArray('.char-vital__fill')
    const statValues = gsap.utils.toArray('.char-stat dd')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statusCardRef.value,
        start: 'top 82%',
        once: true,
      },
    })

    tl.fromTo(fills, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.15 })

    statValues.forEach((el, index) => {
      const target = Number(el.textContent)
      if (!Number.isFinite(target)) {
        return
      }
      const counter = { value: 0 }
      tl.to(
        counter,
        {
          value: target,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value))
          },
        },
        0.25 + index * 0.07,
      )
    })
  }, statusCardRef.value)
})

onUnmounted(() => {
  unbindTraitsTilt()
  ctx?.revert()
})
</script>
