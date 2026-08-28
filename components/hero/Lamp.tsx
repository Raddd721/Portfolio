'use client'

import Image from 'next/image'

type LampProps = {
  src: string
  alt: string
  intrinsicWidth: number
  intrinsicHeight: number
  on: boolean
  onToggle: () => void
}

// Warm amber, not pale yellow.
const AMBER = '255,196,107' // #FFC46B
const AMBER_HOT = '255,208,138' // #FFD08A

const LAMP_TICK_SRC = '/sounds/lamp-tick.mp3'

function playTick() {
  try {
    const audio = new Audio(LAMP_TICK_SRC)
    audio.volume = 0.5
    void audio.play()
  } catch {
    // Audio unavailable — the tick is a bonus, not a requirement.
  }
}

/**
 * The mushroom lamp — the one object that's clickable as well as draggable.
 *
 * The light reads as coming from *inside* the glass rather than floating
 * behind it: two of the four layers are clipped to the lamp's own PNG alpha
 * shape via `mask-image`, so the glow only ever appears on the lamp's actual
 * silhouette and brightens it from within (via `mix-blend-mode: screen`)
 * instead of painting a circle behind it. Only the outermost two layers —
 * the small bloom right at the edge of the shade, and the very faint ambient
 * spill toward the rest of the desk — extend past the lamp's outline, and
 * both are kept small and low-opacity on purpose.
 */
export default function Lamp({ src, alt, intrinsicWidth, intrinsicHeight, on, onToggle }: LampProps) {
  const maskStyle = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  } as const

  return (
    <button
      type="button"
      onClick={() => {
        playTick()
        onToggle()
      }}
      aria-pressed={on}
      aria-label={on ? 'Turn off the lamp' : 'Turn on the lamp'}
      className="relative block w-full origin-center cursor-pointer appearance-none border-0 bg-transparent p-0"
    >
      {/* 4. very subtle ambient spill — reaches toward the desk, barely there */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 mix-blend-screen transition-[opacity,transform] duration-700 ease-in-out"
        style={{
          width: '260%',
          height: '230%',
          transform: `translate(-50%, -50%) scale(${on ? 1 : 0.8})`,
          opacity: on ? 1 : 0,
          filter: 'blur(18px)',
          background: `radial-gradient(ellipse 60% 55% at 50% 45%, rgba(${AMBER},0.05) 0%, rgba(${AMBER},0.02) 45%, rgba(${AMBER},0) 75%)`,
        }}
      />

      {/* 3. small warm bloom right at the edge of the shade */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 mix-blend-screen transition-[opacity,transform] duration-700 ease-in-out"
        style={{
          width: '145%',
          height: '135%',
          transform: `translate(-50%, -50%) scale(${on ? 1 : 0.8})`,
          opacity: on ? 1 : 0,
          filter: 'blur(6px)',
          background: `radial-gradient(ellipse 55% 50% at 50% 42%, rgba(${AMBER_HOT},0.4) 0%, rgba(${AMBER},0.14) 48%, rgba(${AMBER},0) 78%)`,
        }}
      />

      <Image
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        className="relative block h-auto w-full transition-[filter] duration-700 ease-in-out"
        draggable={false}
        sizes="20vw"
        style={{
          filter: on
            ? `brightness(1.06) saturate(1.04) contrast(0.97) drop-shadow(0 0 3px rgba(${AMBER_HOT},0.4))`
            : 'brightness(0.96) saturate(0.9)',
        }}
      />

      {/* 2. soft diffusion through the translucent shade material, clipped to the lamp's own shape */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700 ease-in-out"
        style={{
          ...maskStyle,
          opacity: on ? 1 : 0,
          background: `radial-gradient(ellipse 80% 85% at 50% 46%, rgba(${AMBER},0.6) 0%, rgba(${AMBER},0.25) 45%, rgba(${AMBER},0) 80%)`,
        }}
      />

      {/* 1. bright inner core — the brightest point in the scene, sitting inside the shade */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700 ease-in-out"
        style={{
          ...maskStyle,
          opacity: on ? 1 : 0,
          background: `radial-gradient(circle at 50% 38%, #fff8ec 0%, rgba(${AMBER_HOT},0.95) 20%, rgba(${AMBER_HOT},0.4) 42%, rgba(${AMBER_HOT},0) 66%)`,
        }}
      />
    </button>
  )
}
