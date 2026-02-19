<template>
  <section id="tech" class="min-h-screen py-20 px-8 bg-gradient-to-b from-white via-purple-50 to-indigo-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Technologies
        </h2>
        <p class="text-xl text-gray-600 font-medium">Technologies I work with</p>
      </div>
      
      <div class="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-purple-100">
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
          <div 
            v-for="tech in technologies" 
            :key="tech.name" 
            :title="tech.name"
            class="flex items-center justify-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-110 border-2 border-transparent hover:border-purple-300 group min-h-[160px]"
          >
              <div class="w-[100px] h-[100px] flex items-center justify-center flex-shrink-0">
                <img 
                  :src="tech.icon" 
                  :alt="tech.name" 
                  loading="lazy" 
                  class="w-full h-full object-contain block"
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

@media (max-width: 768px) {
  .tech-item img {
    width: 60px !important;
    height: 60px !important;
  }
  
  .tech-item {
    min-height: 130px;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .tech-item {
    min-height: 120px;
    padding: 1rem;
  }
  
  .tech-item img {
    width: 50px !important;
    height: 50px !important;
  }
}
</style>
