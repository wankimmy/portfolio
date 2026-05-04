<template>
  <section id="about" class="section section--panel">
    <div class="section__inner">
      <div class="about-layout reveal">
        <p class="section-kicker about-layout__kicker">About me</p>

        <h2 class="section-title about-layout__title">
          I like building products that is useful for the community.
        </h2>

        <article class="about-copy about-layout__copy">
          <p>
            I do not just write code. I think about the full product: the design, the flow, the
            system behind it, how people use it and how you want to sell it.
          </p>
          <p>
            Over the years, I have worked as a software engineer and a manager. I still like solving real
            problems and keeping things done.
          </p>
        </article>

        <aside class="about-stack about-layout__aside">
          <div ref="howWorkCardRef" class="about-card tilt-card about-card--how-work">
            <div class="about-card__header">
              <p class="about-card__eyebrow">How I work</p>
            </div>

            <div class="about-values">
              <div class="about-value">
                <strong>Keep it simple</strong>
                <span>Simple is better than complex.</span>
              </div>
              <div class="about-value">
                <strong>Keep it nice</strong>
                <span>Beautiful design and smooth user experience.</span>
              </div>
              <div class="about-value">
                <strong>Keep it useful</strong>
                <span>Every feature should help the user, not add noise.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { bindCardTilt } from '../composables/useCardTilt.js'

const howWorkCardRef = ref(null)
let unbindHowWorkTilt = () => {}

onMounted(() => {
  unbindHowWorkTilt = bindCardTilt(howWorkCardRef.value)
})

onUnmounted(() => {
  unbindHowWorkTilt()
})
</script>
