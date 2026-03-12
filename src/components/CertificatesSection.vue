<template>
  <section id="certificates" class="relative py-20 px-8">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="section-heading text-center mb-16">
        <h2 class="section-title text-5xl md:text-6xl font-extrabold mb-4" style="text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
          Training Arc
        </h2>
        <p class="section-subtitle text-xl text-cream/80 font-medium">Proof of every skill-up and security drill</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="cert in certificates"
          :key="cert.id"
          class="cert-card sea-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group flex flex-col"
        >
          <div class="relative h-52 bg-gradient-to-br from-white/5 via-secondary/10 to-primary/10 flex items-center justify-center flex-shrink-0">
            <div class="absolute inset-0 flex items-center justify-center text-8xl opacity-10">🎓</div>
            <div class="relative z-10 text-center">
              <div class="text-6xl mb-3">{{ cert.icon }}</div>
              <div class="text-cream font-bold text-sm px-4 py-2 bg-ocean-500/20 backdrop-blur-md rounded-full border border-sky/20">
                {{ cert.issuer }}
              </div>
            </div>
          </div>

          <div class="p-7 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-cream mb-2">{{ cert.name }}</h3>
              <p class="text-secondary/80 mb-1 text-sm font-semibold">{{ cert.issuer }}</p>
              <p class="text-cream/50 text-sm mb-3">{{ cert.date }}</p>
              <p class="text-cream/70 leading-relaxed text-sm">{{ cert.description }}</p>
            </div>
            <div class="flex justify-center pt-5 mt-auto">
              <a
                :href="cert.file"
                target="_blank"
                class="px-5 py-3 bg-[#000920] text-[#F4EBDF] font-bold rounded-xl text-center transition-all hover:bg-[#001a3d] hover:scale-105 shadow-md"
              >
                View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const certificates = [
  {
    id: 1, name: 'Web Application Hacking And Defense', issuer: 'Condition Zebra', date: 'Issued in 2024',
    description: 'Comprehensive training in ethical hacking and web application security. Learn offensive security techniques to identify vulnerabilities, perform penetration testing, and implement defensive strategies.',
    icon: '🎖️', file: '/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf'
  },
  {
    id: 2, name: 'OWASP Security Foundation', issuer: 'OWASP Foundation', date: 'Issued in 2022',
    description: 'Foundational knowledge in web application security, covering vulnerabilities, threats, and best practices.',
    icon: '🔐', file: '/assets/Safwan_Hakim_owasp.pdf'
  },
  {
    id: 3, name: 'IoT Security Certification', issuer: 'Tertiary Courses / Industry', date: 'Issued in 2021',
    description: 'Professional certification in IoT security, covering secure device deployment, data encryption, and network protection for IoT ecosystems.',
    icon: '🌐', file: '/assets/E-cert_IoT_Security_Safwan_Hakim.pdf'
  },
  {
    id: 4, name: 'Industry 4.0 E-Certification', issuer: 'Tertiary Courses / Industry', date: 'Issued in 2021',
    description: 'Certification in Industry 4.0 technologies including automation, data analytics, IoT integration, and smart manufacturing systems.',
    icon: '🏭', file: '/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf'
  }
]
</script>
