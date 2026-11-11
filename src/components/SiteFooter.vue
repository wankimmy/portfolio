<template>
  <footer id="contact" class="outro">
    <!-- open sky above the last call to action: on phones the dragon rides this box (scenes.js) -->
    <div class="outro__stage" data-stage="contact" aria-hidden="true"></div>

    <div class="wrap outro__inner">
      <p class="label">New quest</p>
      <h2 class="outro__title" data-split>Got something in mind? <em>Let's make it real.</em></h2>
      <p class="outro__copy" data-reveal>
        Tell me what you're building, and I'll reply with honest advice, a realistic timeline, and a fair quote.
      </p>
      <div class="outro__actions" data-reveal>
        <a
          class="btn btn--gold"
          :href="whatsappLink('Hi Safwan, I have a project in mind!')"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp me
        </a>
        <a class="btn btn--line" :href="`mailto:${EMAIL}`">Email instead</a>
      </div>
    </div>

    <div class="wrap outro__bottom">
      <p>© {{ year }} Safwan Hakim · {{ profile.location }}</p>
      <ul class="outro__links">
        <li>
          <a class="link" href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li><a class="link" href="https://github.com/wankimmy" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a class="link" href="#home">Back to top</a></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { EMAIL, profile, whatsappLink } from '../content.js'

const year = new Date().getFullYear()
</script>
