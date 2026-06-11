<template>
  <section id="experience" class="section section--panel">
    <div class="section__inner">
      <div class="section-heading section-heading--center reveal">
        <p class="section-kicker">Quest log</p>
        <h2 class="section-title">Years of coding, stressing, and feeding my tummy.</h2>
      </div>

      <div class="quest-track">
        <span class="quest-track__line" aria-hidden="true"></span>

        <article
          v-for="job in experience"
          :key="job.period + job.company"
          class="quest-node"
        >
          <span class="quest-node__marker" aria-hidden="true">◆</span>

          <div class="experience-item quest-node__card tilt-card">
            <div class="gilt-frame" aria-hidden="true"></div>
            <span class="quest-node__stamp" aria-hidden="true">Quest complete</span>

            <div class="experience-item__content">
              <div class="experience-item__meta">
                <span class="experience-item__quest">{{ job.quest }}</span>
                <span class="experience-item__period">{{ job.period }}</span>
                <h3 class="experience-item__company">{{ job.company }}</h3>
                <p class="experience-item__title">{{ job.title }}</p>
                <p class="experience-item__xp">{{ job.xp }}</p>
              </div>

              <div class="experience-item__body">
                <p class="experience-item__summary">{{ job.summary }}</p>
                <ul class="experience-item__highlights">
                  <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const experience = [
  {
    period: 'Apr 2020 - March 2026',
    title: 'Associate Software Manager',
    company: 'Fiuu',
    quest: '★ Main quest',
    xp: '+32,000 XP',
    summary:
      'Moved from developer to manager while still staying close to product, code, and delivery.',
    duties: [
      'Led product work and shipped many fixes and improvements.',
      'Planned work across teams and regional clients.',
      'Supported developers with reviews, debugging, and release work.',
    ],
  },
  {
    period: 'Jan 2020 - Oct 2021',
    title: 'Web Software Developer, Part-time',
    company: 'My Innovative Wellness Sdn Bhd',
    quest: '◆ Side quest',
    xp: '+9,500 XP',
    summary:
      'Built and maintained e-commerce websites and supported the business system behind them.',
    duties: [
      'Built shopping flows and internal tools.',
      'Managed hosting, cloud setup, and analytics tools.',
    ],
  },
  {
    period: 'Jan 2018 - Dec 2019',
    title: 'Freelance Developer and Node-RED Trainer',
    company: 'Startup Companies',
    quest: '◆ Guild contracts',
    xp: '+11,200 XP',
    summary:
      'Worked with startups and schools on websites, digital products, and technical training.',
    duties: [
      'Built websites and e-commerce projects for clients.',
      'Taught Raspberry Pi and Node-RED in training sessions.',
    ],
  },
  {
    period: 'Aug 2016 - Aug 2018',
    title: 'Junior Programmer',
    company: 'Unijaya Resource Sdn Bhd',
    quest: '✧ The tutorial',
    xp: '+6,400 XP',
    summary:
      'Started my career by helping build mobile apps, internal tools, and website updates.',
    duties: [
      'Helped deliver a large project with a small team.',
      'Released a mobile app and improved website UX.',
    ],
  },
]
</script>
