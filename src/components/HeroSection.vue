<template>
  <section id="home" ref="sectionRef" class="hero" aria-label="Intro">
    <!-- the dragon's box (scenes.js) and its handle: drag here to spin it. Pointer-only extra. -->
    <div ref="stageRef" class="hero__stage" :class="{ 'is-playable': worldReady }" data-stage="home" aria-hidden="true">
      <img
        class="hero__poster"
        :class="{ 'is-hidden': worldReady }"
        src="/images/hero-dragon-poster.webp"
        alt=""
        width="1600"
        height="1120"
        fetchpriority="high"
      />
    </div>

    <div ref="innerRef" class="hero__inner">
      <p ref="labelRef" class="label hero__label">{{ profile.role }} · {{ profile.location }}</p>

      <h1 class="hero__title">
        <span ref="nameRef" class="hero__name">Safwan Hakim</span>
        <span ref="roleRef" class="hero__role"><em>World builder.</em></span>
      </h1>

      <div ref="footRef" class="hero__foot">
        <p class="hero__lede">
          Software tech lead and senior full-stack and AI engineer. {{ yearsWord }} years of quests across fintech,
          ERP, e-commerce and property. Still taking new party members for client work.
        </p>
        <div class="hero__actions">
          <a
            class="btn btn--gold"
            :href="whatsappLink('Hi Safwan, I have a quest for you!')"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start a quest
          </a>
          <a class="btn btn--line" href="#projects">View completed quests</a>
        </div>
      </div>

      <dl ref="statsRef" class="hero__stats">
        <div>
          <dt>Level</dt>
          <dd>{{ profile.level }}</dd>
        </div>
        <div>
          <dt>Class</dt>
          <dd>Tech lead</dd>
        </div>
        <div>
          <dt>Play time</dt>
          <dd>{{ profile.years }} years</dd>
        </div>
        <div>
          <dt>Realms</dt>
          <dd>Fintech / ERP / AI</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { inject, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

import { profile, whatsappLink } from '../content.js'

const props = defineProps({
  worldReady: { type: Boolean, default: false },
  /** false while the title screen is up */
  entered: { type: Boolean, default: false },
})

const site = inject('site')
const yearsWord = 'Nine'

const sectionRef = ref(null)
const stageRef = ref(null)
const innerRef = ref(null)
const labelRef = ref(null)
const nameRef = ref(null)
const roleRef = ref(null)
const footRef = ref(null)
const statsRef = ref(null)

let ctx = null
let unbindDrag = () => {}
let introPlayed = false

/** World first (the dragon flies in from App), type second, chrome last. Under 1.4s. */
const playIntro = () => {
  if (introPlayed || !sectionRef.value) return
  introPlayed = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    const name = SplitText.create(nameRef.value, { type: 'chars', mask: 'chars' })
    const role = SplitText.create(roleRef.value, { type: 'lines', mask: 'lines' })
    const rest = [labelRef.value, footRef.value, statsRef.value]

    gsap
      .timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          name.revert()
          role.revert()
        },
      })
      .from(name.chars, { yPercent: 110, duration: 1, stagger: 0.03 }, 0.15)
      .from(role.lines, { yPercent: 110, duration: 1 }, 0.4)
      .from(rest, { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.07, clearProps: 'all' }, 0.6)

    // the copy lets go as the hero scrolls away; the dragon stays for the next chapter
    gsap.to(innerRef.value, {
      yPercent: -10,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.value, start: 'top top', end: 'bottom 25%', scrub: true },
    })
  }, sectionRef.value)
}

watch(
  () => props.entered,
  (entered) => entered && playIntro(),
)

watch(
  () => props.worldReady,
  (ready) => {
    unbindDrag()
    unbindDrag = ready && stageRef.value ? site.bindDrag(stageRef.value, 'dragon') : () => {}
  },
)

onMounted(() => {
  if (props.entered) playIntro()
})

onUnmounted(() => {
  unbindDrag()
  ctx?.revert()
})
</script>
