/**
 * Scroll reveals for anything marked up with data attributes:
 *
 *   data-split          heading: lines rise out of a mask
 *   data-reveal         block fades up
 *   data-reveal-group   direct children fade up one after another
 *
 * Content is visible by default. An element is only hidden in the frame it
 * crosses the bottom edge of the viewport, and plays once it is properly on
 * screen, so a script failure can never leave text invisible.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

const EASE = 'expo.out'

/**
 * @param {Element} trigger
 * @param {() => void} hide  idempotent: puts the element in its start state
 * @param {() => void} play
 */
function onceInView(trigger, hide, play) {
  ScrollTrigger.create({ trigger, start: 'top bottom', once: true, onEnter: hide })
  ScrollTrigger.create({
    trigger,
    start: 'top 86%',
    once: true,
    onEnter: () => {
      hide() // a jump straight past both lines fires this one alone
      play()
    },
  })
}

/** Call inside a gsap.context(); everything it creates is reverted with it. */
export function buildReveals(root) {
  root.querySelectorAll('[data-split]').forEach((el) => {
    let split = null
    onceInView(
      el,
      () => {
        if (split) return
        split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
        gsap.set(split.lines, { yPercent: 108 })
      },
      () => {
        gsap.to(split.lines, {
          yPercent: 0,
          duration: 1,
          ease: EASE,
          stagger: 0.075,
          // back to plain text once it has landed, so it reflows on resize
          onComplete: () => split.revert(),
        })
      },
    )
  })

  root.querySelectorAll('[data-reveal]').forEach((el) => {
    let hidden = false
    onceInView(
      el,
      () => {
        if (hidden) return
        hidden = true
        gsap.set(el, { autoAlpha: 0, y: 28 })
      },
      () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, ease: EASE, clearProps: 'transform,opacity,visibility' }),
    )
  })

  root.querySelectorAll('[data-reveal-group]').forEach((group) => {
    const items = Array.from(group.children)
    if (!items.length) return
    let hidden = false
    // total spread stays under 0.6s however many rows there are
    const each = Math.min(0.07, 0.56 / items.length)
    onceInView(
      group,
      () => {
        if (hidden) return
        hidden = true
        gsap.set(items, { autoAlpha: 0, y: 24 })
      },
      () =>
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: EASE,
          stagger: each,
          clearProps: 'transform,opacity,visibility',
        }),
    )
  })
}
