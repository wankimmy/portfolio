<!-- 
  About Me Section Component
  
  Displays personal introduction, profile image, and personality traits.
  Uses Tailwind CSS for styling and responsive design.
  
  @component
  @features
    - Profile image display
    - Personal introduction text
    - Personality trait cards
    - Responsive grid layout
-->
<template>
  <section id="about" class="min-h-screen py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#050510] via-slate-900/50 to-[#050510] relative">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent">
          About Me
        </h2>
        <p class="text-xl text-slate-400 font-medium">Get to know the astronaut</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-20 items-center">
        <div class="flex justify-center">
          <div class="w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/assets/profile.png" 
              alt="Safwan Hakim" 
              class="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-4xl font-bold text-white mb-6">Hi, I'm SAFWAN HAKIM</h3>
          <p class="text-lg text-slate-300 leading-relaxed mb-10 font-medium">
            With 8 years of experience in the software engineering industry, I am eager to embrace new challenges within
            forward-thinking and customer-focused organizations. Leveraging my profound love for technology and
            extensive knowledge of software engineering, I aim to contribute significantly to the team. My enthusiasm for
            continuous learning, especially in the realm of the Internet of Things, drives me to innovate and develop
            technologies that benefit our community. I specialize in modern web technologies including Laravel, Vue.js, Node.js, 
            and cloud platforms like AWS, while also leading teams and mentoring junior developers.
          </p>
          
          <div class="grid grid-cols-3 gap-6">
            <div class="bg-slate-800/80 backdrop-blur border border-slate-600/50 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300 hover:border-cyan-400/50">
              <div class="text-6xl mb-3">🐱</div>
              <p class="text-cyan-100 text-sm font-semibold">Curious Cat</p>
            </div>
            <div class="bg-slate-800/80 backdrop-blur border border-primary/40 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300 hover:border-primary/60">
              <div class="text-6xl mb-3">🔧</div>
              <p class="text-slate-200 text-sm font-semibold">Problem Solver</p>
            </div>
            <div class="bg-slate-800/80 backdrop-blur border border-secondary/40 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300 hover:border-secondary/60">
              <div class="text-6xl mb-3">🤔</div>
              <p class="text-slate-200 text-sm font-semibold">Skeptical Thinker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// About Section - Personal introduction and traits display
// No animations needed for this section
</script>
