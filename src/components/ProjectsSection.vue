<template>
  <section id="projects" class="min-h-screen py-20 px-8 bg-gradient-to-b from-blue-50 to-purple-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p class="text-xl text-gray-600 font-medium">Check out some of my recent work</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
        >
          <div class="relative h-72 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
            <div class="absolute inset-0 flex items-center justify-center text-7xl">
              {{ project.icon }}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-purple-600/90 to-blue-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a 
                :href="project.live" 
                target="_blank" 
                class="px-10 py-4 bg-white text-purple-600 font-bold rounded-full transition-all hover:scale-110 shadow-xl"
              >
                🔗 Visit Website
              </a>
            </div>
          </div>
          
          <div class="p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ project.name }}</h3>
            <p class="text-gray-600 mb-1 text-sm font-medium">{{ project.url }}</p>
            <p class="text-gray-600 mb-6 leading-relaxed font-medium">{{ project.description }}</p>
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="tech in project.tech" 
                :key="tech" 
                class="px-5 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-bold border border-purple-200"
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
/**
 * Projects Section Component
 * 
 * Displays featured projects in a responsive grid.
 * Each project card shows icon, description, tech stack, and live link.
 * 
 * @component
 * @features
 * - Project data configuration
 * - Hover effects with overlay
 * - Technology badges
 * - External link handling
 */

// Project data configuration
const projects = [
  {
    id: 1,
    name: 'Festivent',
    url: 'festivent.com.my',
    description: 'E-commerce platform for finding event vendors in Malaysia. Connect event organizers with professional vendors for any type of event.',
    icon: '🎪',
    live: 'https://festivent.com.my/home',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap CSS', 'Hostinger']
  },
  {
    id: 2,
    name: 'EZDisposal',
    url: 'ezdisposal.my',
    description: 'Hassle-free disposal service booking platform. Book disposal services for furniture, appliances, and e-waste with multiple vehicle options.',
    icon: '🗑️',
    live: 'https://ezdisposal.my',
    tech: ['Laravel', 'PHP', 'MySQL', 'Hostinger']
  },
  {
    id: 3,
    name: 'Entrusol',
    url: 'entrusol.com',
    description: 'E-commerce platform for wellness products with integrated sales system. Built with WordPress and WooCommerce for seamless online shopping.',
    icon: '🌿',
    live: 'https://entrusol.com',
    tech: ['WordPress', 'WooCommerce', 'MySQL', 'Hostinger', 'Google Analytics']
  },
  {
    id: 4,
    name: 'TTDI Meatpoint',
    url: 'ttdimeatpoint.com',
    description: 'Restaurant website with custom booking system. Complete dining experience with online reservations and menu management.',
    icon: '🍖',
    live: 'https://www.ttdimeatpoint.com',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap CSS', 'Hostinger']
  }
]

</script>
