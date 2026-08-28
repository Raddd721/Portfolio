'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimate, type AnimationPlaybackControls } from 'motion/react'

const TRACK_URI = 'spotify:track:4STVcrJTZi0ik2y7R4SAHj'

type SpotifyEmbedController = {
  play: () => void
  pause: () => void
}

// The Spotify iFrame API attaches one global script + one global ready
// callback for the whole page — loaded lazily, once, and cached so mounting
// the record twice (e.g. the mobile + desktop layouts) doesn't double-load it.
let iframeApiPromise: Promise<any> | null = null
function loadSpotifyIframeApi(): Promise<any> {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (iframeApiPromise) return iframeApiPromise
  iframeApiPromise = new Promise((resolve) => {
    const w = window as typeof window & { onSpotifyIframeApiReady?: (api: any) => void }
    w.onSpotifyIframeApiReady = (api: any) => resolve(api)
    const script = document.createElement('script')
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'
    script.async = true
    document.body.appendChild(script)
  })
  return iframeApiPromise
}

type VinylRecordProps = {
  src: string
  alt: string
  intrinsicWidth: number
  intrinsicHeight: number
}

/**
 * The record — click it and it pops out, starts spinning, and actually
 * plays "قضية عم أحمد" by Omar Khairat via a hidden Spotify embed player (the
 * public iFrame API, no auth needed). Click again and it pauses, stops
 * spinning where it is, and the "now playing" note goes away.
 */
export default function VinylRecord({ src, alt, intrinsicWidth, intrinsicHeight }: VinylRecordProps) {
  const [active, setActive] = useState(false)
  const [scope, animate] = useAnimate()
  const embedHostRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyEmbedController | null>(null)
  const spinRef = useRef<AnimationPlaybackControls | null>(null)

  useEffect(() => {
    let cancelled = false
    loadSpotifyIframeApi().then((IFrameAPI) => {
      if (cancelled || !IFrameAPI || !embedHostRef.current || controllerRef.current) return
      IFrameAPI.createController(
        embedHostRef.current,
        { uri: TRACK_URI, width: '300', height: '80' },
        (EmbedController: SpotifyEmbedController) => {
          controllerRef.current = EmbedController
        },
      )
    })
    return () => {
      cancelled = true
    }
  }, [])

  const handleClick = async () => {
    const next = !active
    setActive(next)

    if (next) {
      // slide out, settle, then spin steadily until paused
      await animate(scope.current, { x: [0, 16, 6], rotate: [0, -4, 0] }, { duration: 0.55, ease: [0.22, 1, 0.36, 1] })
      spinRef.current?.stop()
      spinRef.current = animate(scope.current, { rotate: 360 }, { duration: 2.8, ease: 'linear', repeat: Infinity })
      controllerRef.current?.play()
    } else {
      controllerRef.current?.pause()
      spinRef.current?.stop()
      spinRef.current = null
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Pause "قضية عم أحمد" by Omar Khairat' : 'Play "قضية عم أحمد" by Omar Khairat'}
      className="relative block w-full origin-center cursor-pointer appearance-none border-0 bg-transparent p-0"
    >
      {/* Hidden Spotify embed — controls real playback, never shown. The
          iFrame API *replaces* the ref'd element with its iframe (rather than
          nesting inside it), so the clipping wrapper has to be a permanent
          ancestor, not the element itself. */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
        <div ref={embedHostRef} />
      </div>

      <motion.div ref={scope} className="relative">
        <Image
          src={src}
          alt={alt}
          width={intrinsicWidth}
          height={intrinsicHeight}
          className="relative block h-auto w-full"
          draggable={false}
          sizes="14vw"
        />
      </motion.div>

      {active && <StickyNote />}
    </button>
  )
}

function StickyNote() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.85, rotate: -6, y: 6 }}
      animate={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.7 }}
      className="absolute -right-[38%] top-[6%] z-10 w-[100%] rounded-[2px] px-3 py-2.5 text-left shadow-[0_10px_18px_-8px_rgba(26,26,23,0.4)]"
      style={{
        background: '#ece6d4',
        backgroundImage:
          'radial-gradient(rgba(26,26,23,0.05) 1px, transparent 1.4px), radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1.4px)',
        backgroundSize: '9px 9px, 7px 7px',
        backgroundPosition: '0 0, 3px 4px',
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 20 30"
        className="pointer-events-none absolute -top-3 right-3 h-7 w-5 -rotate-6 text-[#9a9384]"
        fill="none"
      >
        <path
          d="M14 4v16a4 4 0 0 1-8 0V7a2.5 2.5 0 0 1 5 0v11.5a1 1 0 0 1-2 0V8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <p className="font-mono text-[6px] uppercase tracking-[0.12em] text-[#7a6a1a]">Now Playing</p>
      <p className="font-fraunces text-[11px] italic leading-tight text-ink">قضية عم أحمد</p>
      <p className="font-fraunces text-[9px] italic leading-tight text-muted">Omar Khairat</p>
      <p className="mt-0.5 font-mono text-[6px] text-[#7a6a1a]">♫ Playing…</p>
    </motion.div>
  )
}
