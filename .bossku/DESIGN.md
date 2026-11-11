# Portfolio design - safwanhakim.com

Written 2026-11-10 for the v6 redesign. Owner decisions: keep the RPG voice, make the dragon more detailed and
realistic, Awwwards-style motion with GSAP and Lenis.

## Design Read

Software tech lead and indie builder who tells his career as an RPG. Readers are Malaysian clients and recruiters.
Mood: midnight, cinematic, exact, a little playful. Closest reference: a game title screen and pause menu, set like
an editorial studio site. Project images are real screenshots of the live sites, never generated artwork (owner rule).

## Evidence

- Surface: one-page portfolio with a client-work shop (services, pricing).
- Reader's job: decide in under a minute whether to message Safwan.
- Primary action: WhatsApp ("Start a quest"). Secondary: read the quest log, open a shipped project.
- Hierarchy: name and role, proof (experience, shipped projects), offer (services, prices), contact.
- Viewports: 390x844 and 1440x900.
- Content source: owner's resume (Nov 2026) and the previous site. Current employer is shown as "Confidential",
  a property company, never by name.

## Concepts considered

| Concept | Originality | Fit | Feasibility | Portability (low is good) |
|---|---|---|---|---|
| The Familiar: a dragon companion flies with the reader down the quest log | 4 | 5 | 4 | 2 |
| Pause menu: the whole site is an RPG status menu | 4 | 5 | 4 | 2 |
| Star map: constellations of skills as the navigation | 3 | 3 | 3 | 3 |

Picked The Familiar as the signature and the pause menu as the layout vocabulary. The dragon already exists as the
owner's own asset and voice, so it cannot be moved to another brand.

## Concept Card

- Idea: your career is a save file; the dragon is the familiar that travels it with you.
- Metaphor: RPG title screen, status sheet, quest log, shop.
- Signature: a pearl-scaled dragon that opens the page and comes back at the last call to action, and a small
  bestiary that shares the sky with it. Each of the other creatures (a naga, a sky whale, a phoenix) has its own
  band of open sky before the chapter it belongs to, then stays on as a dim companion behind that chapter. You can
  grab and spin any of them. A swarm of crystal shards takes a new shape per chapter (orbit, save pillar, trail,
  the sigil) until, at the end, the shards close into a finished world with the gold sigil at its core: the
  "world builder" line made literal.
- Emotion: quiet awe, then trust.
- Motion verb: glide.
- Screenshot: giant name over a night sky, the dragon mid-flap behind it.

## Direction

Object hero (+ flown-world layer) for Safwan Hakim: a scaled dragon familiar that follows the scroll.
Ground `#070a12`, ink `#e8ecf4`, accent gold `#d9b24a`. Display Poppins 600 at 138px (1440) and 43px (390).
Clock expo-out, ladder 200 / 600 / 1000 / 1400 ms.

Dials: variance 9, motion 9, density 3.

## System

- Type: Poppins only, by owner instruction (2026-11-10). Display is 600 with tight tracking, body is 400,
  the gold accent words are 500 italic. Self-hosted in `public/fonts` (five files, about 40KB), two preloads.
  Labels are Poppins caps with tracking and tabular numbers.
- Colour: one ground, one ink, gold as the only UI accent (links, focus, progress, one word in the hero).
  Blue exists only inside the dragon and the sky, as the object's own material.
- Radius: 2px everywhere. Lines, not cards.
- Layout families: stage (hero), editorial split (status), kinetic rows (abilities), index list (quest log),
  pinned horizontal gallery (quests), numbered list (services), ledger rows (shop), compact list (trophies),
  canvas (star map), poster (footer).
- Layout families also include the encounter: a band of open sky with a small bestiary caption beside it.
- Motion: world first, type second, chrome last. Headings reveal by masked lines. Whoever is on stage changes when
  a scene enters (`src/world/scenes.js`) and banks with scroll speed. One GSAP ticker drives Lenis, ScrollTrigger
  and the WebGL render. The dragon's wing beat is driven in code (`dragonFlight.js`): a quick push down, a slower
  recovery, the wing tips a beat behind the shoulder, the body riding the lift.
- Physics: every creature gets its own velocity and turn rate from the world and answers with damped springs
  (tails, fins, whiskers, plumes, the dragon's bank and wing give).
- Signature moves (owner asked, 2026-11-11): each creature performs one when it arrives where it has the stage,
  every 15 s while it stays, and on a tap. Dragon: draws breath, turns to profile, breathes fire. Naga: pearl
  tide, a stream of water pearls and mist. Sky whale: a fountain of stars from its blowhole and three rings of
  song. Phoenix: rebirth, it burns away in a fireball and unfolds new. Fire must look real (owner rule): flames
  are noise-eroded billboards with a hot core, tongues, sparks and smoke (`src/world/flame.js`), not shards.
- Creatures never sit under the header or the copy by accident: where the page leaves them a box (`data-stage`),
  they fit themselves to it. Phones show a creature only in such a box: the hero, the encounters, the footer.
- Phones, no overlaps (owner rule, 2026-11-11): a box is clipped at the header and above the chat button, the
  creature shrinks away with it, it enters and leaves sideways, every move reads the room it has, and as a last
  guard everything a creature draws is cut off at the edges of its box. `node tools/audit_phone.mjs` proves it
  pixel by pixel at six phone sizes; run it before every release.
- Wide screens: the hero dragon's fire passes behind the name for a moment. The name keeps a soft dark shadow
  for that.
- Signature touchpoints: title screen sigil, hero, encounters, crystal formations, pause menu, the 3D sigil inside
  the finished world at the footer.
- No on-page motion switch (owner removed it, 2026-11-11). The operating system's reduced-motion setting still
  turns all of it off.

## Content states

- Loading: title screen shows the real dragon download progress; both Begin and Skip work before it finishes.
  The hero shows a rendered poster until WebGL is ready.
- Empty: not applicable, all content is static.
- Error: WebGL or model failure keeps the poster and the CSS night sky. Chat failure shows its own message and a
  WhatsApp link (existing behaviour).
- Partial: a project without a live link shows no link.
- Success: not applicable, no forms.
- Permission: not applicable.
- Reduced motion: no smooth scroll, no WebGL, no scrub, no title screen, no encounter bands; poster and all
  content visible.

## Known limits

- The site is a client-rendered Vue app, so with JavaScript off only the `<noscript>` summary shows.
- Dragon geometry comes from one AI-generated mesh; the build adds surface detail, not new anatomy.
- The sky whale is sculpted like the dragon (Hunyuan3D from a clay render, baked by `tools/build_creature.py`)
  and wrapped onto its code-built body, which stays as a hidden rig. The same wrap tore on the naga's crossing
  coil and on the phoenix's feathered wings, so those two stay modelled in code (`src/world/creatures/`),
  flat-shaded like the dragon with generated surface relief. The phoenix's head is the plainest part.
- On a 320x568 phone the footer dragon has slid under the header by the time the page ends: it is seen while
  scrolling in, not at the very last scroll position.
