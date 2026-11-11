/**
 * Who is on stage for each stretch of the page, and where.
 *
 * A scene belongs to the element with the same id. `cast` lists the creatures
 * on stage; every other creature flies to its PARK spot and stops being drawn.
 *
 * A role is a pose (see createWorld.js):
 *   x, y   centre in half-viewports: (0, 0) is the middle, +x right, +y up
 *   scale  1 = fitted to the screen
 *   yaw    + turns the creature toward screen right
 * With `box: true` the creature rides the page element marked
 * data-stage="<scene id>" instead: x, y are then offsets inside that box and
 * scale 1 fits it. Boxes are how a creature stays clear of the copy on any
 * screen size.
 *
 * veil: how far the sky is dimmed so the text over it keeps its contrast.
 *
 * `wide` is landscape layouts, `tall` is phones. On phones the reading column
 * is the whole screen, so creatures only appear where the page leaves a box.
 */

const FLAT = { pitch: 0, roll: 0 }

export const SCENES = {
  wide: {
    home: { veil: 0, cast: { dragon: { x: 0.5, y: 0.2, scale: 0.92, yaw: -0.34, pitch: 0.04, roll: 0 } } },
    about: { veil: 0.7, cast: { dragon: { x: 0.9, y: 0.52, scale: 0.78, yaw: -0.75, pitch: 0.22, roll: -0.08 } } },
    'encounter-naga': { veil: 0.1, cast: { naga: { box: true, x: 0, y: 0, scale: 1, yaw: 0, ...FLAT } } },
    tech: { veil: 0.74, cast: { naga: { x: 0, y: 0, scale: 0.86, yaw: 0.15, pitch: 0.05, roll: 0 } } },
    'encounter-whale': { veil: 0.1, cast: { whale: { box: true, x: 0, y: 0, scale: 1, yaw: 0, ...FLAT } } },
    experience: { veil: 0.74, cast: { whale: { x: -0.86, y: -0.4, scale: 0.5, yaw: 0.25, pitch: -0.06, roll: 0.04 } } },
    projects: { veil: 0.86, cast: {} },
    'encounter-phoenix': { veil: 0.1, cast: { phoenix: { box: true, x: 0, y: 0, scale: 1.12, yaw: 0, ...FLAT } } },
    services: { veil: 0.66, cast: { phoenix: { x: 0.98, y: -0.6, scale: 0.4, yaw: -0.45, pitch: 0, roll: -0.05 } } },
    pricing: { veil: 0.8, cast: { phoenix: { x: 0.62, y: 0.58, scale: 0.3, yaw: -0.3, pitch: 0.05, roll: 0 } } },
    certificates: { veil: 0.74, cast: { dragon: { x: 0.88, y: -0.44, scale: 0.4, yaw: -0.7, pitch: -0.1, roll: 0 } } },
    'star-map': { veil: 0.9, cast: {} },
    // the dragon hovers over the finished world (see formations.js), clear of the last headline
    contact: { veil: 0.15, cast: { dragon: { x: 0.56, y: 0.5, scale: 0.56, yaw: -0.25, pitch: 0.22, roll: 0 } } },
  },
  tall: {
    home: { veil: 0, cast: { dragon: { box: true, x: 0, y: 0, scale: 0.97, yaw: -0.16, pitch: 0.04, roll: 0 } } },
    about: { veil: 0.88, cast: {} },
    'encounter-naga': { veil: 0.1, cast: { naga: { box: true, x: 0, y: 0, scale: 1, yaw: 0, ...FLAT } } },
    tech: { veil: 0.86, cast: {} },
    'encounter-whale': { veil: 0.1, cast: { whale: { box: true, x: 0, y: 0, scale: 1, yaw: 0, ...FLAT } } },
    experience: { veil: 0.9, cast: {} },
    projects: { veil: 0.9, cast: {} },
    'encounter-phoenix': { veil: 0.1, cast: { phoenix: { box: true, x: 0, y: 0, scale: 1, yaw: 0, ...FLAT } } },
    services: { veil: 0.9, cast: {} },
    pricing: { veil: 0.9, cast: {} },
    certificates: { veil: 0.9, cast: {} },
    'star-map': { veil: 0.92, cast: {} },
    // in front of the finished world, which sits behind it like a halo
    contact: { veil: 0.2, cast: { dragon: { box: true, x: 0, y: 0, scale: 0.94, yaw: 0, pitch: 0.1, roll: 0 } } },
  },
}

/** Every scene id, in page order. */
export const SCENE_IDS = Object.keys(SCENES.wide)

/** An encounter takes the stage a little before its band reaches the reading line. */
export const isEncounter = (id) => id.startsWith('encounter-')

/** Where each creature waits off stage: its way in and its way out. */
export const PARK = {
  dragon: { x: 0.1, y: 1.6, scale: 0.6, yaw: 0.9, pitch: 0.5, roll: 0.2 },
  naga: { x: 2.1, y: -0.15, scale: 0.8, yaw: 0.5, pitch: 0, roll: 0 },
  whale: { x: -2.3, y: 0.15, scale: 0.8, yaw: 0.2, pitch: 0, roll: 0 },
  phoenix: { x: 0, y: -1.9, scale: 0.7, yaw: 0, pitch: -0.2, roll: 0 },
}
