# Agent Profile — Portfolio

Confirmed: supported directly by repo evidence
Inferred: likely true based on evidence, naming, or workflow
Unknown: not yet supported by evidence

## Identity

- Owner: Confirmed: Safwan Hakim
- Project name: Confirmed: portfolio-vue (personal portfolio website)
- Product: Confirmed: Personal portfolio site showcasing Safwan's professional profile, skills, experience, and projects
- Industry: Confirmed: Personal branding / professional portfolio
- Business model: Confirmed: None — personal showcase site, no monetization
- Stage: Confirmed: Built and functional (README includes production deployment instructions)

## Audience

- Primary user: Confirmed: Prospective employers, clients, or collaborators viewing Safwan's professional profile
- Content: Confirmed: Role (Associate Software Manager), location (Selangor, Malaysia), projects (Festivent, EZDisposal, Entrusol, TTDI Meatpoint), tech stack (24 technologies)

## Product context

- Core purpose: Confirmed: Single-page application presenting professional identity, work experience, featured projects, and technology stack
- Sections: Confirmed: Hero (intro + social links), About (stats + personality), Experience (timeline), Projects (featured work), Technologies (24 tools/frameworks)
- Projects showcased: Confirmed: Festivent, EZDisposal, Entrusol, TTDI Meatpoint
- Social links: Confirmed: Email, LinkedIn, GitHub
- Animations: Confirmed: GSAP-powered scroll animations throughout

## Operating preferences

- Preferred posture: Minimal changes — this is a personal portfolio, changes should be intentional and reflect Safwan's actual experience
- Risk tolerance: Low — any visible error directly affects professional impression
- Deployment: Confirmed: Vite build → copy `dist/` to XAMPP htdocs (local) OR Docker (Dockerfile.dev + nginx.conf)
- No backend, no API, no auth — pure static frontend

## Technical context

- Stack: Confirmed: Vue 3 (Composition API), GSAP 3.12, Vite 5, Tailwind CSS (CDN), SVG icons, DevIcons CDN
- Build: Confirmed: `npm run build` → `dist/` folder
- Dev: Confirmed: `npm run dev` → localhost:5173
- Docker: Confirmed: Dockerfile + Dockerfile.dev + nginx.conf + docker-compose.yml for containerized serve
- Dependencies: Confirmed: `vue ^3.4.0`, `gsap ^3.12.0`, `@vitejs/plugin-vue ^5.0.0`, `vite ^5.0.0`
- No tests, no backend, no database
