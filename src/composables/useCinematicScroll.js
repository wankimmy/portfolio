import Lenis from 'lenis'
import gsap from 'gsap'

/**
 * Lenis smooth scroll, driven by GSAP's ticker so scroll, ScrollTrigger and
 * the WebGL layer all advance on one clock.
 * @param {(lenis: Lenis) => void} onScroll
 * @returns {{ lenis: Lenis, destroy: () => void }}
 */
export function createCinematicScroll(onScroll) {
  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    touchMultiplier: 1.4,
    autoRaf: false,
  })

  lenis.on('scroll', onScroll)

  const ticker = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(ticker)
  gsap.ticker.lagSmoothing(0)

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    },
  }
}
