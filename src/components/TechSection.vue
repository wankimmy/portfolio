<template>
  <section id="tech" class="relative py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="section-heading text-center mb-8 sm:mb-12 md:mb-16">
        <h2 class="section-title text-5xl md:text-6xl font-extrabold mb-4" style="text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
          Arsenal
        </h2>
        <p class="section-subtitle text-xl text-cream/80 font-medium">Weapons, tools, and shipwright essentials</p>
      </div>

      <div class="sea-card p-4 sm:p-6 lg:p-10 rounded-3xl">
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          <div
            v-for="tech in technologies"
            :key="tech.name"
            :title="tech.name"
            class="tech-item flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 bg-ocean-500/10 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 sm:hover:scale-110 border border-sky/20 hover:border-secondary/40 group min-h-[100px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[160px]"
          >
            <div class="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px] xl:w-[100px] xl:h-[100px] flex items-center justify-center flex-shrink-0">
              <img :src="tech.icon" :alt="tech.name" loading="lazy" class="w-full h-full object-contain block max-w-full max-h-full opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const technologies = [
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/php/php-original.svg' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/javascript/javascript-original.svg' },
  { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/jquery/jquery-original-wordmark.svg' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/laravel/laravel-original.svg' },
  { name: 'Yii2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/yii/yii-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nodejs/nodejs-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/vuejs/vuejs-original.svg' },
  { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/wordpress/wordpress-original.svg' },
  { name: 'Node-Red', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodered/nodered-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/mysql/mysql-original.svg' },
  { name: 'CouchDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/couchdb/couchdb-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/redis/redis-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/docker/docker-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/git/git-original.svg' },
  { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nginx/nginx-original.svg' },
  { name: 'Postman', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/postman.svg' },
  { name: 'Cloudflare', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/cloudflare.svg' },
  { name: 'Hostinger', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/hostinger.svg' },
  { name: 'Raspberry Pi', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/raspberrypi/raspberrypi-original.svg' },
  { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/arduino/arduino-original.svg' },
  { name: 'MQTT', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/eclipsemosquitto.svg' }
]
</script>

<style scoped>
.tech-item img { max-width: 100%; max-height: 100%; }
@media (max-width: 480px) { .tech-item { min-height: 90px; padding: 0.5rem; } }
</style>
