'use client'

import { motion } from 'motion/react'

// Roughly where the noodles clear the bowl's rim in the source photo —
// steam rises from there, not from the dead centre of the whole image.
const ORIGIN_LEFT = 42
const ORIGIN_TOP = 30

// Each wisp has its own drift curve — hand-tuned rather than randomised so
// server and client render the same thing, but staggered/varied enough to
// read as natural rather than mechanical.
const WISPS = [
  { left: -6, duration: 4.2, delay: 0, driftX: [0, -4, 3, -5], scale: 0.9 },
  { left: 4, duration: 4.8, delay: 1.1, driftX: [0, 5, -3, 4], scale: 1 },
  { left: 13, duration: 4.4, delay: 2.2, driftX: [0, -3, 5, -3], scale: 0.75 },
]

/**
 * A few soft wisps of steam drifting up off the ramen — always on, looping
 * forever, kept faint enough that it reads as warmth rather than smoke.
 */
export default function RamenSteam() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ left: `${ORIGIN_LEFT}%`, top: `${ORIGIN_TOP}%`, width: 0, height: 0 }}
    >
      {WISPS.map((w, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full bg-white blur-[2.5px]"
          style={{ left: w.left, width: 6 * w.scale, height: 22 * w.scale, transformOrigin: 'bottom center' }}
          animate={{
            opacity: [0, 0.16, 0.1, 0],
            y: [0, -22, -42, -62],
            x: w.driftX,
            scaleY: [0.55, 0.9, 1.05, 1.2],
          }}
          transition={{
            duration: w.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: w.delay,
          }}
        />
      ))}
    </div>
  )
}
