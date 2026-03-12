<template>
  <section id="projects" class="relative py-20 px-8">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="section-heading text-center mb-16">
        <h2 class="section-title text-5xl md:text-6xl font-extrabold mb-4" style="text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
          Bounty Board
        </h2>
        <p class="section-subtitle text-xl text-cream/80 font-medium">Flagships and products worth charting</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-card sea-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group"
        >
          <div class="relative h-56 overflow-hidden bg-gradient-to-br from-sky/5 via-ocean-500/10 to-secondary/10">
            <div class="absolute inset-0 flex items-center justify-center text-7xl">
              {{ project.icon }}
            </div>
            <div class="absolute inset-0 bg-ocean-900/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                :href="project.live"
                target="_blank"
                class="px-10 py-4 bg-[#000920] text-[#F4EBDF] font-extrabold rounded-full transition-all hover:scale-110 shadow-xl border-2 border-cream/30"
              >
                Board This Ship
              </a>
            </div>
          </div>

          <div class="p-8">
            <h3 class="text-2xl font-bold text-cream mb-2">{{ project.name }}</h3>
            <p class="text-secondary/80 mb-1 text-sm font-semibold">{{ project.url }}</p>
            <p class="text-cream/70 mb-6 leading-relaxed font-medium">{{ project.description }}</p>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-4 py-1.5 bg-ocean-500/20 text-cream/90 rounded-full text-sm font-bold border border-sky/20"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    id: 1, name: 'Festivent', url: 'festivent.com.my',
    description: 'E-commerce platform for finding event vendors in Malaysia. Connect event organizers with professional vendors for any type of event.',
    icon: '🎪', live: 'https://festivent.com.my/home',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap CSS', 'Hostinger']
  },
  {
    id: 2, name: 'EZDisposal', url: 'ezdisposal.my',
    description: 'Hassle-free disposal service booking platform. Book disposal services for furniture, appliances, and e-waste with multiple vehicle options.',
    icon: '🗑️', live: 'https://ezdisposal.my',
    tech: ['Laravel', 'PHP', 'MySQL', 'Hostinger']
  },
  {
    id: 3, name: 'Entrusol', url: 'entrusol.com',
    description: 'E-commerce platform for wellness products with integrated sales system. Built with WordPress and WooCommerce for seamless online shopping.',
    icon: '🌿', live: 'https://entrusol.com',
    tech: ['WordPress', 'WooCommerce', 'MySQL', 'Hostinger', 'Google Analytics']
  },
  {
    id: 4, name: 'TTDI Meatpoint', url: 'ttdimeatpoint.com',
    description: 'Restaurant website with custom booking system. Complete dining experience with online reservations and menu management.',
    icon: '🍖', live: 'https://www.ttdimeatpoint.com',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap CSS', 'Hostinger']
  }
]
</script>
