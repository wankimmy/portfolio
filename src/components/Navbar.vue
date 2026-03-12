<template>
  <nav :class="['fixed top-0 w-full py-3 px-4 md:py-5 md:px-8 transition-all duration-300 z-50', isScrolled ? 'bg-ocean-900/85 backdrop-blur-xl shadow-lg border-b border-sky/20' : 'bg-transparent']">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="nav-brand text-3xl md:text-4xl drop-shadow-md">
        🏴‍☠️
      </div>
      <ul class="hidden md:flex list-none gap-8">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="`#${link.href}`"
            @click.prevent="scrollTo"
            class="font-bold px-4 py-2 rounded-lg relative transition-all text-cream hover:text-secondary drop-shadow-sm after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-4/5 hover:after:left-[10%]"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const navLinks = [
  { id: 1, name: 'Home', href: 'home' },
  { id: 2, name: 'About', href: 'about' },
  { id: 3, name: 'Arsenal', href: 'tech' },
  { id: 4, name: 'Voyage', href: 'experience' },
  { id: 5, name: 'Projects', href: 'projects' },
  { id: 6, name: 'Training', href: 'certificates' }
]

const scrollTo = (event) => {
  const href = event.target.getAttribute('href')
  const element = document.querySelector(href)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
onMounted(() => { window.addEventListener('scroll', handleScroll) })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>
