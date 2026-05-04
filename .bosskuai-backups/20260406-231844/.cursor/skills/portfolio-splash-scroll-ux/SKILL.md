---
name: portfolio-splash-scroll-ux
description: Maintains the Safwan portfolio Vue splash screen, section-based bottom progress bar, GSAP backdrop parallax, and related a11y patterns. Use when editing portfolio/src/App.vue loading UI, .app-progress scroll indicator, backdrop glow ScrollTrigger, or galaxy/starfield styles in scoped CSS.
---

# Portfolio splash & scroll UX

## When this applies

- `portfolio/src/App.vue`: loading overlay, `scrollProgress`, `SCROLL_SECTION_IDS`, GSAP `gsap.context`, tilt setup
- `portfolio/src/style.css`: `.app-progress`, `.backdrop--primary-glow` / `--secondary-glow`
- Earth readiness: `HeroSection` emits `earth-ready` / `earth-error`; splash hides via `MIN_LOADING_MS` + `scheduleHideLoading`

## Loading overlay (scoped in App.vue)

- **Structure**: galaxy → aurora → star-drift (far/near) → centered rocket + copy. Avoid reintroducing **grid** pseudo-elements or **repeating-linear** streaks unless intentionally geometric—they read as “square UI.”
- **Stars**: prefer **viewport-sized** `::after` maps (`background-size: 100% 100%`, `%` positions) or **large prime-ish tiles** for drift layers; validate radial-gradient stops (`color 0, transparent Npx`—not `0 0.Npx`).
- **Rocket**: inline **SVG** in template (no PNG) for zero extra request; flame stays a separate absolutely positioned div.
- **Fade-out**: if `animation: none` runs on the rocket wrapper, **reapply final `transform`** (or keep static center layout) so fill-mode loss does not snap the rocket.
- **`prefers-reduced-motion`**: disable galaxy/aurora/star drift/twinkle/blink; simplify rocket and leave transitions.

## Section scroll bar

- **IDs** (order): `home`, `about`, `tech`, `experience`, `projects`, `certificates` — must match section `id`s in `*Section.vue`.
- **Progress**: map a **reading line** (~`scrollY + innerHeight * 0.42`) from first section top to **last section bottom**; clamp `0..1`. Fallback to `scrollY / maxScroll` if `< 2` sections resolve.
- **UI**: `.app-progress` is **fixed**, **horizontal**, **centered** (`left: 50%` + `translateX(-50%)`), **not** `display: none` on mobile. Bar fill: `scaleX(progress)` with **`transform-origin: left center`**. Keep **high z-index** (e.g. above `.site-nav`) and **safe-area** `bottom`.
- After layout shifts (e.g. Earth ready), call **`updateScrollProgress()`** on `nextTick`.

## Backdrop glows (global CSS + GSAP)

- Position: `left: 50%`, explicit width/height, **`transform: translateX(-50%)`** in CSS until GSAP runs.
- **GSAP**: use `fromTo` with **`xPercent: -50`** held constant on both ends so glows stay **horizontally centered**; animate **`yPercent`** only for vertical parallax. `ScrollTrigger` on `.app-shell` from `top top` to `bottom bottom`.
- Reset **`inset: auto`** on glow layers so `.backdrop { inset: 0 }` does not stretch them.

## Body / page background

- Avoid warm/cool radials locked to **~84%** horizontal—bias reads as a **right-edge strip**. Prefer **centered** or symmetric ellipses on `body`.

## Checklist (edits in this area)

- [ ] Section IDs and `SCROLL_SECTION_IDS` stay in sync
- [ ] `MIN_LOADING_MS` still covers splash timing if animation duration changes
- [ ] Reduced-motion paths updated for any new motion
- [ ] Progress bar visible on **narrow** viewports (no `display: none` without replacement)
