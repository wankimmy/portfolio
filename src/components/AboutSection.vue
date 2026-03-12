<template>
  <section id="about" class="relative py-20 px-4 sm:px-6 md:px-8">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="section-heading text-center mb-16">
        <h2 class="section-title text-5xl md:text-6xl font-extrabold mb-4" style="text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
          About Me
        </h2>
        <p class="section-subtitle text-xl text-cream/80 font-medium">Get to know the captain behind the code</p>
      </div>

      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div class="about-image flex justify-center">
          <div class="w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-2xl ring-2 ring-white/10">
            <img src="/assets/profile.png" alt="Safwan Hakim" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="about-text">
          <h3 class="text-4xl font-bold text-cream mb-6" style="text-shadow: 0 1px 6px rgba(0,0,0,0.2);">
            Hi, I'm <span class="text-secondary">SAFWAN HAKIM</span>
          </h3>
          <p class="text-lg text-cream/80 leading-relaxed mb-10 font-medium">
            I navigate the Grand Line of software engineering the way a captain steers through uncharted waters:
            stay calm in rough seas, read the map with care, and keep the crew moving forward. Across 8 years,
            I've shipped products with Laravel, Vue.js, Node.js, AWS, and IoT tools while mentoring developers,
            reviewing code, and helping teams deliver with confidence.
          </p>

          <div class="grid grid-cols-3 gap-5">
            <div class="trait-card sea-card p-5 rounded-2xl text-center transform hover:scale-110 transition-transform duration-300">
              <div class="text-5xl mb-3">🧭</div>
              <p class="text-cream text-sm font-bold">Navigator</p>
            </div>
            <div class="trait-card sea-card p-5 rounded-2xl text-center transform hover:scale-110 transition-transform duration-300">
              <div class="text-5xl mb-3">⚓</div>
              <p class="text-cream text-sm font-bold">Builder</p>
            </div>
            <div class="trait-card sea-card p-5 rounded-2xl text-center transform hover:scale-110 transition-transform duration-300">
              <div class="text-5xl mb-3">🏴‍☠️</div>
              <p class="text-cream text-sm font-bold">Captain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
