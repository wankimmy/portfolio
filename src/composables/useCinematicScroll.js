import Lenis from 'lenis'

import gsap from 'gsap'

/**
 * Smooth scroll synced with GSAP ticker and ScrollTrigger.
 * @param {() => void} scrollTriggerUpdate
 * @returns {{ lenis: Lenis | null, destroy: () => void }}
 */
export function createCinematicScroll(scrollTriggerUpdate) {
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    return {
      lenis: null,
      destroy: () => {},
    }
  }

  const lenis = new Lenis({
    duration: 1.25,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.55,
    infinite: false,
  })

  lenis.on('scroll', scrollTriggerUpdate)

  const ticker = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(ticker)
  gsap.ticker.lagSmoothing(0)

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(ticker)
      lenis.off('scroll', scrollTriggerUpdate)
      lenis.destroy()
    },
  }
}
