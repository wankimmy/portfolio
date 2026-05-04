/**
 * Pointer-based 3D tilt for cards. Drives .tilt-card CSS (--tilt-x, --tilt-y, --pointer-*, data-tilt).
 * @param {HTMLElement | null | undefined} element
 * @returns {() => void} cleanup
 */
export function bindCardTilt(element) {
  if (!element || typeof window === 'undefined') {
    return () => {}
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  const updateTilt = (event) => {
    const rect = element.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width
    const relativeY = (event.clientY - rect.top) / rect.height
    const rotateY = (relativeX - 0.5) * 12
    const rotateX = (0.5 - relativeY) * 10

    element.dataset.tilt = 'active'
    element.style.setProperty('--tilt-x', `${rotateX}deg`)
    element.style.setProperty('--tilt-y', `${rotateY}deg`)
    element.style.setProperty('--pointer-x', `${relativeX * 100}%`)
    element.style.setProperty('--pointer-y', `${relativeY * 100}%`)
  }

  const resetTilt = () => {
    element.dataset.tilt = 'idle'
    element.style.setProperty('--tilt-x', '0deg')
    element.style.setProperty('--tilt-y', '0deg')
    element.style.setProperty('--pointer-x', '50%')
    element.style.setProperty('--pointer-y', '50%')
  }

  element.addEventListener('pointermove', updateTilt)
  element.addEventListener('pointerleave', resetTilt)
  resetTilt()

  return () => {
    element.removeEventListener('pointermove', updateTilt)
    element.removeEventListener('pointerleave', resetTilt)
    resetTilt()
  }
}
