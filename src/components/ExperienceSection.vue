<template>
  <section id="experience" class="min-h-screen py-20 px-8 bg-gradient-to-b from-[#050510] via-slate-900/50 to-[#050510] relative">
    <div class="max-w-5xl mx-auto relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent">
          Experience
        </h2>
        <p class="text-xl text-slate-400 font-medium">Mission log — software engineering journey</p>
      </div>
      
      <div class="relative">
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/50 via-primary/50 to-secondary/50 transform -translate-x-1/2"></div>
        
        <div v-for="(job, index) in experience" :key="index" class="relative mb-16 pl-0 md:pl-1/2 md:ml-24">
          <div class="hidden md:flex absolute left-1/2 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-primary border-4 border-slate-900 shadow-xl -ml-3 transform -translate-x-1/2"></div>
          
          <div class="bg-slate-800/70 backdrop-blur p-10 rounded-3xl shadow-xl md:ml-0 ml-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-cyan-500/20 hover:border-cyan-400/40">
            <div class="text-cyan-400 font-bold text-lg mb-3">{{ job.period }}</div>
            <h3 class="text-3xl font-bold text-white mb-2">{{ job.title }}</h3>
            <p class="text-primary font-bold text-lg mb-6">{{ job.company }}</p>
            <ul class="list-none space-y-3">
              <li v-for="duty in job.duties" :key="duty" class="flex items-start gap-3 text-slate-300">
                <span class="text-cyan-400 font-bold text-xl flex-shrink-0">✓</span>
                <span class="font-medium">{{ duty }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * Experience Section Component
 * 
 * Displays professional work experience in a timeline layout.
 * Shows period, title, company, and key responsibilities.
 * 
 * @component
 * @features
 * - Timeline visualization with vertical line
 * - Responsive design for mobile and desktop
 * - Hover effects on experience cards
 */

// Professional experience data
const experience = [
  {
    period: 'April 2020 - Present',
    title: 'Associate Software Manager',
    company: 'Fiuu (formerly Razer Merchant Services)',
    duties: [
      'Started as Software Engineer, promoted to Senior Software Engineer, now serves as Associate Software Manager with Engineering Management (EM) responsibilities',
      'Conduct code reviews, guide team members, and find bugs to ensure code quality and best practices',
      'Perform hotfixes when required to address critical production issues and ensure system reliability',
      'Manage and guide team of developers, overseeing projects from planning through execution with realistic timelines',
      'Lead project management efforts including timeline planning, resource allocation, and milestone tracking',
      'Perform customization for merchants including report customization, feature customization, and system improvements to meet specific business requirements',
      'Assist Business-As-Usual (BAU) operations across departments and provide technical support to merchants in various countries (PH, SG, ID, MY)',
      'Collaborate with business and product teams to develop and implement new features and improvements',
      'Delivered over 850 bug fixes and enhancements, improving system performance, stability, scalability, and functionality'
    ]
  },
  {
    period: 'January 2020 - October 2021',
    title: 'Web Software Developer',
    company: 'My Innovative Wellness SDN BHD (Part-Time)',
    duties: [
      'Developed user-friendly e-commerce platform using WooCommerce, boosting online sales by up to 10,000 ringgit monthly',
      'Created internal systems to streamline sales and increase productivity',
      'Set up cloud hosting services (AWS EC2, Hostinger) with CloudFlare, Facebook Pixel, and Google Analytics',
      'Led planning and design for company technical infrastructure including data and email migration'
    ]
  },
  {
    period: 'January 2018 - December 2019',
    title: 'Freelance Programmer & Raspberry Pi Node-Red Trainer',
    company: 'Freelance / Tertiary Courses Malaysia',
    duties: [
      'Developed websites, apps, and e-commerce systems for startups like EzDisposal, TTDI Meatpoint, and RNR Enterprise',
      'Served as Raspberry Pi and Node-Red trainer, teaching Industry 4.0 concepts to universities (UniKL, MSU, UUM)',
      'Provided technical advisory and implemented solutions using PHP, WordPress, and Laravel Framework'
    ]
  },
  {
    period: 'August 2016 - August 2018',
    title: 'Junior Programmer',
    company: 'Unijaya Resource Sdn Bhd',
    duties: [
      'Contributed to RM 3 million project, successfully delivering two modules with team of 5 members',
      'Developed and deployed mobile app to Google Play Store and Apple App Store',
      'Developed company website with improved UI/UX, enhancing user engagement and satisfaction'
    ]
  }
]

</script>
