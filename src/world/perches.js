/**
 * Where the dragon sits for each chapter of the page.
 *
 * x, y  dragon centre in half-viewports: (0, 0) is the middle, +x right, +y up
 * scale 1 = hero size
 * yaw   + turns the snout toward screen right
 * veil  how far the sky is dimmed so the text over it keeps its contrast
 *
 * `wide` is landscape layouts, `tall` is phones: there the dragon owns the
 * hero and the last call to action and stays out of the reading column between.
 */
export const PERCHES = {
  wide: {
    home: { x: 0.5, y: 0.2, scale: 0.92, yaw: -0.34, pitch: 0.04, roll: 0, veil: 0 },
    about: { x: 0.9, y: 0.52, scale: 0.78, yaw: -0.75, pitch: 0.22, roll: -0.08, veil: 0.7 },
    tech: { x: 0, y: 0, scale: 0.94, yaw: 0, pitch: 0.05, roll: 0, veil: 0.74 },
    experience: { x: -0.9, y: -0.36, scale: 0.5, yaw: 0.75, pitch: -0.08, roll: 0.06, veil: 0.74 },
    projects: { x: 0.86, y: 0.72, scale: 0.42, yaw: -0.9, pitch: 0.3, roll: 0, veil: 0.86 },
    services: { x: 0.88, y: -0.3, scale: 0.5, yaw: -0.8, pitch: 0, roll: -0.05, veil: 0.66 },
    pricing: { x: -0.9, y: 0.42, scale: 0.46, yaw: 0.8, pitch: 0.15, roll: 0.05, veil: 0.8 },
    certificates: { x: 0.88, y: -0.44, scale: 0.4, yaw: -0.7, pitch: -0.1, roll: 0, veil: 0.74 },
    'star-map': { x: 0, y: 1.5, scale: 0.5, yaw: 0, pitch: 0.4, roll: 0, veil: 0.9 },
    // the dragon hovers beside the finished world (see formations.js) and looks at it
    contact: { x: -0.1, y: 0.42, scale: 0.72, yaw: 0.5, pitch: 0.06, roll: 0, veil: 0.15 },
  },
  tall: {
    home: { x: 0, y: 0.66, scale: 0.76, yaw: -0.16, pitch: 0.04, roll: 0, veil: 0 },
    about: { x: 0.6, y: 0.78, scale: 0.5, yaw: -0.6, pitch: 0.2, roll: 0, veil: 0.88 },
    tech: { x: 0, y: 0.1, scale: 0.8, yaw: 0, pitch: 0.05, roll: 0, veil: 0.86 },
    experience: { x: 0.6, y: 0.78, scale: 0.5, yaw: -0.6, pitch: 0.2, roll: 0, veil: 0.9 },
    projects: { x: 0.6, y: 0.78, scale: 0.5, yaw: -0.6, pitch: 0.2, roll: 0, veil: 0.9 },
    services: { x: -0.6, y: 0.78, scale: 0.5, yaw: 0.6, pitch: 0.2, roll: 0, veil: 0.9 },
    pricing: { x: -0.6, y: 0.78, scale: 0.5, yaw: 0.6, pitch: 0.2, roll: 0, veil: 0.9 },
    certificates: { x: 0.6, y: 0.78, scale: 0.5, yaw: -0.6, pitch: 0.2, roll: 0, veil: 0.9 },
    'star-map': { x: 0, y: 1.6, scale: 0.5, yaw: 0, pitch: 0.4, roll: 0, veil: 0.92 },
    contact: { x: 0, y: 0.7, scale: 0.72, yaw: 0, pitch: 0.12, roll: 0, veil: 0.28 },
  },
}

/** Off-stage start for the hero entrance: high, small and turned away. */
export const ENTRANCE = { x: 0.1, y: 1.5, scale: 0.6, yaw: 0.9, pitch: 0.5, roll: 0.2 }
