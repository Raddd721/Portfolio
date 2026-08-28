'use client'

const AMBER = '255,212,154' // #FFD49A

type LampFacingGlowProps = {
  /** the object's own image src, reused as an alpha mask so the highlight never spills past its silhouette */
  src: string
  /** CSS linear-gradient direction pointing toward the lamp, e.g. "to right" */
  direction: string
  on: boolean
  /** 0–1: how strongly this object is lit — falls off with distance from the lamp */
  intensity: number
}

/**
 * A warm highlight on the edge of an object that faces the lamp — masked to
 * the object's own PNG alpha shape so it reads as light catching that
 * surface, not a shape drawn on top of it. Two stacked gradients: a broad,
 * faint wash standing in for the ~8–15% brightness lift the light gives the
 * whole facing side, and a slightly blurred, more concentrated one right at
 * the edge for a soft rim-light. Both are entirely absent past the
 * gradient's midpoint, so the far side of the object is never touched.
 */
export default function LampFacingGlow({ src, direction, on, intensity }: LampFacingGlowProps) {
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

  // 8–15% perceived brightness lift on the lit side, scaled by distance.
  const washPeak = 0.14 + intensity * 0.18
  const rimPeak = 0.22 + intensity * 0.3

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity ease-in-out"
        style={{
          ...maskStyle,
          opacity: on ? 1 : 0,
          transitionDuration: '700ms',
          background: `linear-gradient(${direction}, rgba(${AMBER},${washPeak}) 0%, rgba(${AMBER},0) 60%)`,
        }}
      />
      {/* subtle rim glow right at the edge facing the lamp */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity ease-in-out"
        style={{
          ...maskStyle,
          opacity: on ? 1 : 0,
          transitionDuration: '700ms',
          filter: `blur(${1.5 + intensity * 1.5}px)`,
          background: `linear-gradient(${direction}, rgba(${AMBER},${rimPeak}) 0%, rgba(${AMBER},0) 22%)`,
        }}
      />
    </>
  )
}
