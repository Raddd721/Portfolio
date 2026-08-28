'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useAnimate } from 'motion/react'

type TeaCupProps = {
  src: string
  alt: string
  intrinsicWidth: number
  intrinsicHeight: number
}

// Where the tea's surface actually sits within the mug photo, as a
// percentage box — measured off the source image so ripples and steam stay
// anchored to the liquid instead of floating over the ceramic.
const SURFACE = { left: 37.5, top: 30.9, width: 62, height: 34 }

/** Plays a short, soft ceramic "tink" using the Web Audio API — no audio file needed. */
function playClink() {
  try {
    const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(2100, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.22)
    osc.onended = () => ctx.close()
  } catch {
    // Web Audio unavailable — the clink is a bonus, not a requirement.
  }
}

/**
 * The tea cup — tap it and the tea gently reacts. A quick tilt settles back
 * with a soft spring, a couple of rings ripple across the surface and fade,
 * and the steam picks up for a few seconds before easing back to its usual
 * quiet drift.
 */
export default function TeaCup({ src, alt, intrinsicWidth, intrinsicHeight }: TeaCupProps) {
  const [scope, animate] = useAnimate()
  const [rippleId, setRippleId] = useState(0)
  const [boosted, setBoosted] = useState(false)
  const boostTimeout = useRef<ReturnType<typeof setTimeout>>()

  const handleClick = () => {
    animate(scope.current, { rotate: 2 }, { duration: 0.12, ease: 'easeOut' }).then(() => {
      animate(scope.current, { rotate: 0 }, { type: 'spring', stiffness: 260, damping: 19 })
    })

    setRippleId((id) => id + 1)

    setBoosted(true)
    clearTimeout(boostTimeout.current)
    boostTimeout.current = setTimeout(() => setBoosted(false), 2600)

    playClink()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Tap the tea cup"
      className="relative block w-full origin-center cursor-pointer appearance-none border-0 bg-transparent p-0"
    >
      <motion.div ref={scope} className="relative">
        <Image
          src={src}
          alt={alt}
          width={intrinsicWidth}
          height={intrinsicHeight}
          className="relative block h-auto w-full"
          draggable={false}
          sizes="20vw"
        />
        <Steam boosted={boosted} />
        <Ripples key={rippleId} />
      </motion.div>
    </button>
  )
}

function Ripples() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute overflow-hidden rounded-[50%]"
      style={{
        left: `${SURFACE.left}%`,
        top: `${SURFACE.top}%`,
        width: `${SURFACE.width}%`,
        height: `${SURFACE.height}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 aspect-square rounded-full border"
          style={{ width: '16%', borderColor: 'rgba(255,238,210,0.65)' }}
          initial={{ x: '-50%', y: '-50%', scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 7, opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

// Each wisp has its own drift curve — hand-tuned rather than randomised so
// server and client render the same thing, but varied enough to read as
// natural rather than mechanical.
const WISPS = [
  { left: 33, driftX: [0, -5, 4, -3], scale: 1 },
  { left: 41, driftX: [0, 4, -6, 3], scale: 0.85 },
  { left: 48, driftX: [0, -3, 5, -4], scale: 0.7 },
]

function Steam({ boosted }: { boosted: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0" style={{ top: `${SURFACE.top - 4}%` }}>
      {WISPS.map((w, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full blur-[3px]"
          style={{
            left: `${w.left}%`,
            width: 7 * w.scale,
            height: 26 * w.scale,
            background: '#DCD9D0',
            transformOrigin: 'bottom center',
          }}
          animate={
            boosted
              ? {
                  opacity: [0, 0.4, 0.28, 0],
                  y: [0, -26, -50, -74],
                  x: w.driftX,
                  scaleY: [0.6, 1, 1.15, 1.3],
                }
              : {
                  opacity: [0, 0.14, 0.08, 0],
                  y: [0, -20, -38, -54],
                  x: w.driftX,
                  scaleY: [0.5, 0.85, 1, 1.1],
                }
          }
          transition={{
            duration: boosted ? 2.4 : 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * (boosted ? 0.25 : 0.55),
          }}
        />
      ))}
    </div>
  )
}
