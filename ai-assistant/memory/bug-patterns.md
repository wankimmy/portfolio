# Bug patterns

Use this file for **durable, recurring failure modes** in this workspace or product — patterns that should change how reviews, tests, or skills are applied across tools and sessions.

## When to add an entry

Add a row when **both** are true:

1. The same class of defect (or near-miss) has shown up **at least twice**, or once with **high severity** (data loss, security, money, widespread outage).
2. The lesson is **actionable** for future work (a specific check, invariant, or file area) — not a one-off typo.

Do **not** use this file for: transient incidents with no repeatable pattern, full postmortems (put those in project docs), or secrets/PII.

## When to promote out

- **Twice in this file** for the same theme → add a bullet to `ai-assistant/references/pitfalls/` (pick the best domain file) or extend a checklist.
- **Stable workflow gap** → propose a skill or playbook update via **rules-distill** / **skill-stocktake**.

## Suggested format (append new blocks)

```markdown
### [Short name] — YYYY-MM

- **Symptom:** what users or ops saw
- **Root cause:** technical or process
- **Invariant to enforce:** one line
- **Where to check:** dirs, endpoints, or test type
```

## Entries

### Palette sweep script remapped fresh hand edits — 2026-06

- **Symptom:** after a programmatic dark→light theme flip, card surfaces rendered gold/tan instead of white; computed style showed the new `--surface` variables had been rewritten by the sweep script
- **Root cause:** ordering — `:root` was hand-edited to new white values *before* running the regex color-sweep, so the sweep's "white → gold sparkle" family rule matched the freshly added `rgba(255,255,255,…)` variables
- **Invariant to enforce:** run bulk color/regex sweeps FIRST, hand-edit exceptions after; never interleave hand edits between writing and running a sweep script
- **Where to check:** any programmatic find/replace over CSS/design tokens; verify with computed-style probe (`getComputedStyle`) on a representative element, not just visual diff

