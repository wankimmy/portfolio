<template>
  <header class="nav" :class="{ 'is-open': open }">
    <a class="nav__brand" href="#home" aria-label="Safwan Hakim, back to the top" @click="close">
      <svg class="sigil" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="5" />
        <path
          d="M60 28 L84 60 L60 92 L36 60 Z M60 28 L60 92 M36 60 L84 60"
          stroke="currentColor"
          stroke-width="5"
          stroke-linejoin="round"
        />
      </svg>
      <span>Safwan Hakim</span>
    </a>

    <!-- where you are: the pause-menu name of the chapter on screen -->
    <p class="nav__chapter" aria-hidden="true">{{ current.menu }}</p>

    <button
      ref="toggleRef"
      type="button"
      class="nav__toggle"
      :aria-expanded="open"
      aria-controls="pause-menu"
      @click="open ? close() : show()"
    >
      {{ open ? 'Close' : 'Menu' }}
    </button>
  </header>

  <div
    v-show="open"
    id="pause-menu"
    ref="menuRef"
    class="menu"
    role="dialog"
    aria-modal="true"
    aria-label="Pause menu"
  >
    <div class="menu__grid">
      <nav aria-label="Chapters">
        <ol class="menu__list">
          <li v-for="chapter in chapters" :key="chapter.id">
            <a
              :href="`#${chapter.id}`"
              class="menu__link"
              :aria-current="chapter.id === active ? 'location' : undefined"
              @click="close"
            >
              <span class="menu__name">{{ chapter.menu }}</span>
              <span class="menu__plain">{{ chapter.plain }}</span>
            </a>
          </li>
        </ol>
      </nav>

      <aside class="menu__save" aria-label="Save data">
        <p class="label">Save data</p>
        <dl class="menu__facts">
          <div><dt>Name</dt><dd>{{ profile.name }}</dd></div>
          <div><dt>Class</dt><dd>{{ profile.role }}</dd></div>
          <div><dt>Level</dt><dd>{{ profile.level }}</dd></div>
          <div><dt>Region</dt><dd>{{ profile.location }}</dd></div>
          <div><dt>Play time</dt><dd>{{ profile.years }} years</dd></div>
        </dl>
        <ul class="menu__contact">
          <li><a class="link" :href="WHATSAPP" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a class="link" :href="`mailto:${EMAIL}`">Email</a></li>
          <li>
            <a class="link" href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li><a class="link" href="https://github.com/wankimmy" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

import { chapters, EMAIL, profile, WHATSAPP } from '../content.js'

const props = defineProps({
  active: { type: String, default: 'home' },
})

const site = inject('site')
const open = ref(false)
const menuRef = ref(null)
const toggleRef = ref(null)
let tween = null

const current = computed(() => chapters.find((c) => c.id === props.active) ?? chapters[0])
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const show = async () => {
  open.value = true
  site.lockScroll(true)
  // on the window, so Esc works wherever focus is (the toggle sits outside the dialog)
  window.addEventListener('keydown', onKeydown)
  await nextTick()
  const menu = menuRef.value
  menu.querySelector('.menu__link')?.focus({ preventScroll: true })
  if (reduced()) return
  tween?.kill()
  tween = gsap
    .timeline()
    .fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out' })
    .fromTo(
      menu.querySelectorAll('.menu__link, .menu__save > *'),
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.03 },
      0.1,
    )
}

const close = () => {
  if (!open.value) return
  tween?.kill()
  window.removeEventListener('keydown', onKeydown)
  open.value = false
  site.lockScroll(false)
  toggleRef.value?.focus({ preventScroll: true })
}

/** Esc closes; Tab stays inside the menu and its toggle button. */
const onKeydown = (e) => {
  if (e.key === 'Escape') {
    close()
    return
  }
  if (e.key !== 'Tab' || !menuRef.value.contains(document.activeElement)) return
  const focusable = [...menuRef.value.querySelectorAll('a[href], button')]
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    toggleRef.value.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    toggleRef.value.focus()
  }
}

onUnmounted(() => {
  tween?.kill()
  window.removeEventListener('keydown', onKeydown)
  if (open.value) site.lockScroll(false)
})
</script>
