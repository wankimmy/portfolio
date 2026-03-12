<template>
  <section id="experience" class="relative py-20 px-8">
    <div class="max-w-5xl mx-auto relative z-10">
      <div class="section-heading text-center mb-16">
        <h2 class="section-title text-5xl md:text-6xl font-extrabold mb-4" style="text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
          Voyage Log
        </h2>
        <p class="section-subtitle text-xl text-cream/80 font-medium">Every major arc in my engineering adventure</p>
      </div>

      <div class="relative">
        <div class="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary/60 via-white/30 to-primary/50 transform -translate-x-1/2 rounded-full"></div>

        <div v-for="(job, index) in experience" :key="index" class="exp-card relative mb-16 pl-0 md:pl-1/2 md:ml-24">
          <div class="timeline-dot hidden md:flex absolute left-1/2 top-0 w-7 h-7 rounded-full bg-gradient-to-r from-secondary to-primary border-4 border-ocean-900 shadow-lg shadow-secondary/30 -ml-3.5 transform -translate-x-1/2"></div>

          <div class="sea-card p-8 md:p-10 rounded-3xl md:ml-0 ml-0 hover:scale-[1.02] transition-all duration-300">
            <div class="text-secondary font-extrabold text-lg mb-2">{{ job.period }}</div>
            <h3 class="text-2xl md:text-3xl font-bold text-cream mb-1">{{ job.title }}</h3>
            <p class="text-secondary/80 font-bold text-lg mb-5">{{ job.company }}</p>
            <ul class="list-none space-y-3">
              <li v-for="duty in job.duties" :key="duty" class="flex items-start gap-3 text-cream/75">
                <span class="text-secondary font-bold text-xl flex-shrink-0 mt-0.5">✦</span>
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
