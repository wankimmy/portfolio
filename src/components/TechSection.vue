<template>
  <section id="tech" class="min-h-screen py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#050510] via-slate-900/40 to-[#050510] relative">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent">
          Technologies
        </h2>
        <p class="text-xl text-slate-400 font-medium">Tech stack for the mission</p>
      </div>
      
      <div class="bg-slate-800/60 backdrop-blur-sm p-4 sm:p-6 lg:p-10 rounded-3xl shadow-2xl border border-cyan-500/20">
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          <div 
            v-for="tech in technologies" 
            :key="tech.name" 
            :title="tech.name"
            class="tech-item flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 bg-slate-800/80 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 sm:hover:scale-110 border border-slate-600/50 hover:border-cyan-400/50 group min-h-[100px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[160px]"
          >
            <div class="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px] xl:w-[100px] xl:h-[100px] flex items-center justify-center flex-shrink-0">
              <img 
                :src="tech.icon" 
                :alt="tech.name" 
                loading="lazy" 
                class="w-full h-full object-contain block max-w-full max-h-full"
                style="filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15));"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * Technologies Section Component
 * 
 * Displays technology stack with icons.
 * Icons are loaded from CDN (DevIcons and Simple Icons).
 * 
 * @component
 * @features
 * - Responsive grid layout
 * - Hover effects on tech cards
 * - Lazy loading for images
 */

// Technology stack configuration
const technologies = [
  // Languages
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/php/php-plain.svg' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/html5/html5-plain.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/css3/css3-plain.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/javascript/javascript-plain.svg' },
  { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/jquery/jquery-plain-wordmark.svg' },
  
  // Frameworks
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/laravel/laravel-plain.svg' },
  { name: 'Yii2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/yii/yii-plain.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nodejs/nodejs-plain.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/vuejs/vuejs-plain.svg' },
  { name: 'WordPress', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg' },
  { name: 'Node-Red', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodered/nodered-original.svg' },
  
  // Databases
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/mysql/mysql-plain.svg' },
  { name: 'CouchDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/couchdb/couchdb-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/redis/redis-plain.svg' },
  
  // DevOps & Tools
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/docker/docker-plain.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/git/git-plain.svg' },
  { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nginx/nginx-original.svg' },
  { name: 'Postman', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/postman.svg' },
  { name: 'Cloudflare', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/cloudflare.svg' },
  { name: 'Hostinger', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/hostinger.svg' },
  
  // IoT & Hardware
  { name: 'Raspberry Pi', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/raspberrypi/raspberrypi-original.svg' },
  { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/arduino/arduino-original.svg' },
  { name: 'MQTT', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/eclipsemosquitto.svg' }
]
</script>

<style scoped>
/* Ensure images stay within bounds on very small screens */
.tech-item img {
  max-width: 100%;
  max-height: 100%;
}

@media (max-width: 480px) {
  .tech-item {
    min-height: 90px;
    padding: 0.5rem;
  }
}
</style>
