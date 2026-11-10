<template>
  <div
    ref="shellRef"
    class="title"
    :class="{ 'is-intro': playingIntro }"
    role="dialog"
    aria-modal="true"
    aria-label="Title screen"
  >
    <div v-show="!playingIntro" class="title__menu">
      <svg class="sigil title__sigil" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="1.5" />
        <path
          d="M60 28 L84 60 L60 92 L36 60 Z M60 28 L60 92 M36 60 L84 60"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>

      <p class="title__name">Safwan Hakim</p>
      <p class="label">Portfolio</p>

      <div class="title__actions">
        <button ref="beginRef" type="button" class="btn btn--gold" @click="begin">Begin journey</button>
        <button type="button" class="btn btn--line" @click="leave">Skip intro</button>
      </div>

      <p class="title__load" role="status">{{ loadText }}</p>
      <p class="title__note">Begin plays a short intro film with sound.</p>
    </div>

    <video
      ref="introRef"
      class="title__video"
      src="/videos/intro-journey.mp4"
      playsinline
      preload="none"
      @ended="leave"
      @error="leave"
      @timeupdate="onIntroTime"
    />
    <button v-show="playingIntro" type="button" class="btn btn--line title__skip" @click="leave">Skip</button>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  /** 0..1, real bytes of the dragon model */
  progress: { type: Number, default: 0 },
  worldReady: { type: Boolean, default: false },
  worldFailed: { type: Boolean, default: false },
})
const emit = defineEmits(['enter'])

/** Start the dissolve while this much of the film is left, so it never ends on a frozen frame. */
const DISSOLVE_S = 1.2

const shellRef = ref(null)
const beginRef = ref(null)
const introRef = ref(null)
const playingIntro = ref(false)

let leaving = false
let fade = null

const loadText = computed(() => {
  if (props.worldReady) return 'Dragon summoned'
  if (props.worldFailed) return 'Dragon is resting: showing a still instead'
  return `Summoning dragon ${Math.round(props.progress * 100)}%`
})

/** Fade the whole screen out over whatever is behind it, then hand over. */
const leave = () => {
  if (leaving) return
  leaving = true
  fade = gsap.to(shellRef.value, {
    autoAlpha: 0,
    duration: playingIntro.value ? DISSOLVE_S : 0.5,
    ease: 'power2.out',
    onComplete: () => {
      introRef.value?.pause()
      emit('enter')
    },
  })
}

const onIntroTime = () => {
  const video = introRef.value
  if (!video || !Number.isFinite(video.duration) || video.duration <= DISSOLVE_S) return
  if (video.duration - video.currentTime <= DISSOLVE_S) leave()
}

const begin = async () => {
  if (playingIntro.value || leaving) return
  playingIntro.value = true
  await nextTick()
  const video = introRef.value
  try {
    video.muted = false
    await video.play()
  } catch {
    try {
      video.muted = true
      await video.play()
    } catch {
      leave()
    }
  }
}

const onKeydown = (e) => {
  if (e.key === 'Escape') leave()
}

onMounted(() => {
  beginRef.value?.focus({ preventScroll: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  fade?.kill()
  introRef.value?.pause()
})
</script>
