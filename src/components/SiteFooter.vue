<template>
  <footer class="site-footer">
    <div class="section__inner">
      <div class="site-footer__cta reveal">
        <p class="section-kicker">Save point</p>
        <h2 class="section-title site-footer__title">
          Have a quest in mind? Let's make it real.
        </h2>
        <p class="site-footer__copy">
          Tell me what you're building — I'll reply with honest advice, a realistic timeline, and a
          fair quote. Your progress is saved.
        </p>
        <div class="site-footer__actions">
          <a
            class="button button--primary"
            href="https://wa.me/60177786836?text=Hi%20Safwan%2C%20I%20have%20a%20project%20in%20mind!"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp me
          </a>
          <a class="button button--ghost" href="mailto:putrafyp@gmail.com">Email instead</a>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__brand">SH — Safwan Hakim</p>
        <nav class="site-footer__links" aria-label="Footer">
          <a href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/wankimmy" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://festivent.com.my/home" target="_blank" rel="noopener noreferrer">Festivent</a>
        </nav>
        <p class="site-footer__note">© {{ year }} Safwan Hakim. Built with Vue, GSAP & a few Phoenix Downs.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
