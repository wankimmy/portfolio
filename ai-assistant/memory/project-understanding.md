# Project Understanding — Portfolio

Last updated: 2026-03-30

## What the project is

Safwan Hakim's personal portfolio website — a Vue 3 single-page application showcasing his professional profile, work experience, featured projects, and technology stack. No backend, no database, pure static frontend.

## Who it serves

Prospective employers, clients, or collaborators who want to learn about Safwan's background, skills, and work.

## Key content (from source code)

- **Owner:** Safwan Hakim
- **Role:** Associate Software Manager
- **Location:** Selangor, Malaysia
- **Featured projects:** Festivent, EZDisposal, Entrusol, TTDI Meatpoint
- **Tech stack shown:** PHP, HTML, CSS, JavaScript, jQuery, Laravel, Yii2, Node.js, Vue.js, WordPress, Node-Red, Docker, MySQL, CouchDB, Redis, AWS, Git, Raspberry Pi, Arduino, MQTT, Nginx, Postman, Cloudflare, Hostinger (24 technologies)
- **Personality traits shown:** Curious Cat, Problem Solver, Skeptical Thinker

## Sections

1. Hero — name, role, location, social links (Email, LinkedIn, GitHub)
2. About — personal intro, statistics, personality traits
3. Experience — professional work history timeline
4. Projects — featured projects with images and tech stacks
5. Technologies — 24-item skills grid with icons

## Stack and architecture

- **Framework:** Vue 3 (Composition API)
- **Animations:** GSAP 3.12 (scroll-triggered animations)
- **Build tool:** Vite 5
- **CSS:** Tailwind CSS via CDN
- **Icons:** SVG + DevIcons CDN + Simple Icons
- **No backend, no API, no auth, no database**

## Source-of-truth files

- `src/components/HeroSection.vue` — name, role, location, social links
- `src/components/AboutSection.vue` — intro text, profile image, personality traits
- `src/components/ExperienceSection.vue` — work history
- `src/components/ProjectsSection.vue` — featured projects
- `src/components/TechSection.vue` — technology stack
- `src/App.vue` — root component, section composition
- `package.json` — dependencies

## Deployment

- Dev: `npm run dev` → localhost:5173
- Build: `npm run build` → `dist/`
- Deploy options: Copy `dist/` to XAMPP htdocs OR Docker (Dockerfile + nginx.conf)
- Profile image: `assets/profile.jpg` (add manually, not in repo)

## Most relevant skills for this workspace

1. `bosskuai-ui-ux-design-to-code` — visual updates, layout changes, animation work
2. `bosskuai-coding-best-practices` — Vue 3 component patterns
3. `bosskuai-seo-geo` — if adding meta tags, OG tags, or discoverability features
