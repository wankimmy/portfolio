<!--
  Certificates Section Component
  
  Displays professional certificates and certifications.
  
  @component
  @features
    - Certificate cards with links
    - Responsive grid layout
    - Download/view functionality
-->
<template>
  <section id="certificates" class="min-h-screen py-20 px-8 bg-gradient-to-b from-[#050510] via-slate-900/50 to-[#050510] relative">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent">
          Professional Certifications
        </h2>
        <p class="text-xl text-slate-400 font-medium">Credentials from the mission</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="cert in certificates" 
          :key="cert.id" 
          class="bg-slate-800/70 backdrop-blur rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-cyan-500/20 hover:border-cyan-400/40 group"
        >
          <div class="relative h-64 bg-gradient-to-br from-cyan-900/80 via-slate-800 to-primary/80 flex items-center justify-center">
            <div class="absolute inset-0 flex items-center justify-center text-8xl opacity-20">
              🎓
            </div>
            <div class="relative z-10 text-center">
              <div class="text-7xl mb-4">{{ cert.icon }}</div>
              <div class="text-white font-bold text-sm px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-cyan-400/40">
                {{ cert.issuer }}
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <h3 class="text-2xl font-bold text-white mb-3">{{ cert.name }}</h3>
            <p class="text-slate-400 mb-2 text-sm font-semibold">{{ cert.issuer }}</p>
            <p class="text-slate-500 text-sm mb-4">{{ cert.date }}</p>
            <p class="text-slate-300 mb-6 leading-relaxed text-sm">{{ cert.description }}</p>
            
            <div class="flex gap-3">
              <a 
                :href="cert.file" 
                target="_blank"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-primary text-slate-900 font-bold rounded-xl text-center transition-all hover:from-cyan-400 hover:to-primary hover:scale-105 shadow-lg"
              >
                📄 View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * Certificates Section Component
 * 
 * Displays professional certificates and certifications.
 * Each certificate card includes issuer, name, date, and download link.
 * 
 * @component
 * @features
 * - Certificate cards with download functionality
 * - Responsive grid layout
 * - Professional design with hover effects
 */

// Certificates data (sorted by year - latest first)
const certificates = [
  {
    id: 1,
    name: 'Web Application Hacking And Defense',
    issuer: 'Condition Zebra',
    date: 'Issued in 2024',
    description: 'Comprehensive training in ethical hacking and web application security. Learn offensive security techniques to identify vulnerabilities, perform penetration testing, and implement defensive strategies to protect web applications.',
    icon: '🎖️',
    file: '/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf'
  },
  {
    id: 2,
    name: 'OWASP Security Foundation',
    issuer: 'OWASP Foundation',
    date: 'Issued in 2022',
    description: 'Foundational knowledge in web application security, covering vulnerabilities, threats, and best practices.',
    icon: '🔐',
    file: '/assets/Safwan_Hakim_owasp.pdf'
  },
  {
    id: 3,
    name: 'IoT Security Certification',
    issuer: 'Tertiary Courses / Industry',
    date: 'Issued in 2021',
    description: 'Professional certification in Internet of Things (IoT) security, covering secure device deployment, data encryption, and network protection for IoT ecosystems.',
    icon: '🌐',
    file: '/assets/E-cert_IoT_Security_Safwan_Hakim.pdf'
  },
  {
    id: 4,
    name: 'Industry 4.0 E-Certification',
    issuer: 'Tertiary Courses / Industry',
    date: 'Issued in 2021',
    description: 'Certification in Industry 4.0 technologies including automation, data analytics, IoT integration, and smart manufacturing systems.',
    icon: '🏭',
    file: '/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf'
  }
]
</script>

<style scoped>
/* Certificate card hover effects */
.group:hover .cert-icon {
  transform: scale(1.1);
}

.cert-icon {
  transition: transform 0.3s ease;
}
</style>

