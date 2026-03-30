<template>
  <header :class="['site-nav', { 'site-nav--scrolled': isScrolled, 'site-nav--open': isOpen }]">
    <div class="site-nav__inner">
      <button class="site-nav__brand" type="button" @click="scrollTo('home')">SH</button>

      <nav class="site-nav__links" aria-label="Primary">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="site-nav__link"
          type="button"
          @click="scrollTo(link.href)"
        >
          {{ link.name }}
        </button>
      </nav>

      <div class="site-nav__actions">
        <a
          class="button button--ghost button--compact"
          href="https://wa.me/60177786836"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on WhatsApp"
        >
          Connect
        </a>
        <button
          class="site-nav__toggle"
          type="button"
          :aria-expanded="isOpen"
          aria-label="Toggle navigation"
          @click="isOpen = !isOpen"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div v-if="isOpen" class="site-nav__mobile" aria-label="Mobile navigation">
      <button
        v-for="link in navLinks"
        :key="`${link.id}-mobile`"
        class="site-nav__mobile-link"
        type="button"
        @click="scrollTo(link.href)"
      >
        {{ link.name }}
      </button>
      <a
        class="button button--primary site-nav__mobile-cta"
        href="https://wa.me/60177786836"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Start a conversation on WhatsApp"
      >
        Start a conversation
      </a>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { id: 1, name: 'About', href: 'about' },
  { id: 2, name: 'Technologies', href: 'tech' },
  { id: 3, name: 'Experience', href: 'experience' },
  { id: 4, name: 'Projects', href: 'projects' },
  { id: 5, name: 'Certifications', href: 'certificates' },
]

const scrollTo = (targetId) => {
  isOpen.value = false
  const target = document.getElementById(targetId)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const handleResize = () => {
  if (window.innerWidth > 880) {
    isOpen.value = false
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>
