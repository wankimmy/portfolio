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
  <section id="about" class="min-h-screen py-20 px-8 bg-gradient-to-b from-slate-50 to-white">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          About Me
        </h2>
        <p class="text-xl text-gray-600 font-medium">Get to know me better</p>
      </div>
      
      <!-- Main Content: Profile Image & Description -->
      <div class="grid md:grid-cols-2 gap-20 items-center">
        <!-- Profile Image -->
        <div class="flex justify-center">
          <div class="w-96 h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-white">
            <img 
              src="/assets/profile.png" 
              alt="Safwan Hakim" 
              class="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        <!-- Personal Introduction & Traits -->
        <div>
          <h3 class="text-4xl font-bold text-gray-900 mb-6">Hi, I'm SAFWAN HAKIM</h3>
          <p class="text-lg text-gray-700 leading-relaxed mb-10 font-medium">
            With 8 years of experience in the software engineering industry, I am eager to embrace new challenges within
            forward-thinking and customer-focused organizations. Leveraging my profound love for technology and
            extensive knowledge of software engineering, I aim to contribute significantly to the team. My enthusiasm for
            continuous learning, especially in the realm of the Internet of Things, drives me to innovate and develop
            technologies that benefit our community. I specialize in modern web technologies including Laravel, Vue.js, Node.js, 
            and cloud platforms like AWS, while also leading teams and mentoring junior developers.
          </p>
          
          <!-- Personality Traits Grid -->
          <div class="grid grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300">
              <div class="text-6xl mb-3">🐱</div>
              <p class="text-purple-100 text-sm font-semibold">Curious Cat</p>
            </div>
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300">
              <div class="text-6xl mb-3">🔧</div>
              <p class="text-blue-100 text-sm font-semibold">Problem Solver</p>
            </div>
            <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300">
              <div class="text-6xl mb-3">🤔</div>
              <p class="text-indigo-100 text-sm font-semibold">Skeptical Thinker</p>
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
