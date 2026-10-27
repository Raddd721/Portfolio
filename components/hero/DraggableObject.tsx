'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { motion, useAnimationFrame, useDragControls, useMotionValue, useTransform, animate } from 'motion/react'

// Shared counter so whichever object was grabbed most recently renders above
// its neighbours, even after everyone has been dropped and re-grabbed.
let topZ = 20

// The one spring used for anything that carries real weight: settling after
// a drop, and the synchronized "tidy up" reset. High damping relative to
// stiffness so it never overshoots or wobbles — it just arrives.
const SETTLE_SPRING = { type: 'spring', stiffness: 260, damping: 50, mass: 1.8 } as const
// A lighter companion for small rotations (drag tilt, hover tilt) — same
// no-bounce philosophy, just quick enough not to lag behind the gesture.
const TILT_SPRING = { type: 'spring', stiffness: 300, damping: 38, mass: 1 } as const
// Hover feedback needs to feel immediate, not heavy — still spring-based and
// still overdamped, just lighter mass than the drag/settle spring.
const HOVER_SPRING = { type: 'spring', stiffness: 320, damping: 34, mass: 0.7 } as const

type DraggableObjectProps = {
  children: ReactNode
  boundsRef: RefObject<HTMLElement>
  /** left edge, % of the bounds container (ignored when `layout="flow"`) */
  left?: number
  /** top edge, % of the bounds container (ignored when `layout="flow"`) */
  top?: number
  /** width, % of the bounds container (ignored when `layout="flow"` — size it via `style` instead) */
  width?: number
  /** `absolute` (default) positions by %; `flow` sits in normal layout, e.g. inside a flex row */
  layout?: 'absolute' | 'flow'
  /**
   * Touch-friendly mode: the object itself no longer starts a drag (so the
   * page and any scrolling row it sits in can scroll normally under a
   * finger) — a small grip under it does instead.
   */
  handle?: boolean
  /** drives the idle-drift phase; defaults to a hash of left/top, which flow items (all at 0,0) must override */
  seed?: number
  /** resting tilt, degrees */
  rotate?: number
  /** stacking order before the item has ever been picked up */
  z?: number
  /** 0–1: how strongly the lamp is lighting this object right now — softens and lightens the resting shadow to match */
  lampIntensity?: number
  /** bump this to animate every object on the page back to its resting spot, all at once, on the settle spring */
  resetSignal?: number
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

/** Deterministic pseudo-random in [0, 1) — same seed always gives the same value, so idle motion is stable across renders/SSR without ever looking synced between objects. */
function hash(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453
  return v - Math.floor(v)
}

/**
 * A single scrapbook object that can be picked up and moved around the desk.
 * Position is expressed as a percentage of `boundsRef` so the whole
 * composition scales fluidly; drag is clamped to that same element so pieces
 * can never be dragged off-screen.
 *
 * Three independent motion layers, so nothing ever fights for the same value:
 *  - the outer layer owns the real drag gesture (explicit x/y motion values,
 *    so a reset can animate them) plus drag-direction and hover tilt;
 *  - a middle layer owns the continuous idle float and a tiny hover lift,
 *    both driven by one rAF loop;
 *  - the innermost element owns shadow + a fixed 4px lift while dragging.
 */
export default function DraggableObject({
  children,
  boundsRef,
  left = 0,
  top = 0,
  width = 100,
  layout = 'absolute',
  handle = false,
  seed: seedProp,
  rotate = 0,
  z = 1,
  lampIntensity = 0,
  resetSignal = 0,
  ariaLabel,
  className = '',
  style,
}: DraggableObjectProps) {
  const [z_, setZ] = useState(z)
  const [dragging, setDragging] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)
  const hoveringRef = useRef(false)
  const isFirstRender = useRef(true)

  // Resting shadow softens, lightens and blurs a little as lamp light on
  // this object increases — closest objects get the blurriest shadow.
  const restBlur = 16 + lampIntensity * 12
  const restOpacity = 0.18 - lampIntensity * 0.07
  const hoverBlur = 22 + lampIntensity * 12
  const hoverOpacity = 0.24 - lampIntensity * 0.08

  // Each object gets its own drift frequencies/phases/amplitudes, seeded off
  // its own position so two objects never move in lockstep.
  const seed = seedProp ?? left * 97.13 + top * 13.37
  const drift = useMemo(
    () => ({
      f1: 0.15 + hash(seed + 1) * 0.1, // ~ one cycle every 8–12s
      f2: 0.29 + hash(seed + 2) * 0.17, // a faster, unrelated-period wobble layered on top
      p1: hash(seed + 3) * Math.PI * 2,
      p2: hash(seed + 4) * Math.PI * 2,
      ampX: 4 + hash(seed + 5) * 2, // ~4–6px, centred on 5px
      ampY: 4 + hash(seed + 6) * 2,
      hoverTilt: (hash(seed + 7) > 0.5 ? 1 : -1) * (0.6 + hash(seed + 8) * 0.4), // ±0.6–1°
    }),
    [seed],
  )

  // Real drag position — explicit motion values (rather than letting `drag`
  // create its own internal ones) so a reset can animate them back to 0.
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const hoverLift = useRef(0)

  // Drag-direction tilt (± while dragging) and hover tilt (± while hovering,
  // never both at once) — summed with the resting rotation into one value.
  const tilt = useMotionValue(0)
  const hoverTilt = useMotionValue(0)
  const combinedRotate = useTransform([tilt, hoverTilt], (latest) => rotate + (latest as number[])[0] + (latest as number[])[1])
  // The grip stays level even though the object tilts.
  const handleRotate = useTransform(combinedRotate, (v) => -v)
  const dragControls = useDragControls()

  useAnimationFrame((elapsed) => {
    const t = elapsed / 1000
    const idleX = Math.sin(t * drift.f1 + drift.p1) * drift.ampX * 0.65 + Math.sin(t * drift.f2 + drift.p2) * drift.ampX * 0.35
    const idleY =
      Math.cos(t * drift.f1 * 0.85 + drift.p1) * drift.ampY * 0.65 + Math.cos(t * drift.f2 * 1.15 + drift.p2) * drift.ampY * 0.35

    const liftTarget = hoveringRef.current && !dragging ? -3 : 0
    hoverLift.current += (liftTarget - hoverLift.current) * 0.12

    offsetX.set(idleX)
    offsetY.set(idleY + hoverLift.current)
  })

  // "Tidy up": every object animates back to its resting spot at once, on
  // the same weighted spring used to settle a drop.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    animate(x, 0, SETTLE_SPRING)
    animate(y, 0, SETTLE_SPRING)
    animate(tilt, 0, SETTLE_SPRING)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal])

  return (
    <motion.div
      role="group"
      aria-label={ariaLabel}
      className={`${layout === 'flow' ? 'relative shrink-0' : 'absolute'} select-none ${
        handle ? '' : `touch-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`
      } ${className}`}
      style={{
        ...(layout === 'flow' ? {} : { left: `${left}%`, top: `${top}%`, width: `${width}%` }),
        zIndex: z_,
        x,
        y,
        rotate: combinedRotate,
        ...style,
      }}
      drag
      dragListener={!handle}
      dragControls={dragControls}
      dragConstraints={boundsRef}
      dragElastic={0.08}
      dragMomentum
      dragTransition={{ power: 0.15, timeConstant: 280, bounceStiffness: 260, bounceDamping: 48 }}
      whileHover={{ scale: 1.02, transition: HOVER_SPRING }}
      whileDrag={{ scale: 1.015, transition: HOVER_SPRING }}
      onHoverStart={() => {
        hoveringRef.current = true
        animate(hoverTilt, drift.hoverTilt, HOVER_SPRING)
      }}
      onHoverEnd={() => {
        hoveringRef.current = false
        animate(hoverTilt, 0, HOVER_SPRING)
      }}
      onDragStart={() => {
        setDragging(true)
        animate(hoverTilt, 0, HOVER_SPRING)
        setZ(++topZ)
      }}
      onDrag={(_, info) => {
        tilt.set(Math.max(-5, Math.min(5, info.velocity.x * 0.012)))
      }}
      onDragEnd={() => {
        setDragging(false)
        animate(tilt, 0, TILT_SPRING)
      }}
      transition={SETTLE_SPRING}
    >
      <motion.div ref={innerRef} style={{ x: offsetX, y: offsetY }}>
        <div
          className={`transition-[filter,transform] duration-500 ease-out ${
            dragging
              ? '-translate-y-1 drop-shadow-[0_26px_30px_rgba(38,26,14,0.34)]'
              : 'drop-shadow-[0_10px_var(--rest-blur)_rgba(38,26,14,var(--rest-op))] hover:drop-shadow-[0_14px_var(--hover-blur)_rgba(38,26,14,var(--hover-op))]'
          }`}
          style={
            {
              '--rest-blur': `${restBlur}px`,
              '--rest-op': restOpacity,
              '--hover-blur': `${hoverBlur}px`,
              '--hover-op': hoverOpacity,
            } as CSSProperties
          }
        >
          {children}
        </div>
        {handle && (
          <motion.div style={{ rotate: handleRotate }} className="flex justify-center">
            <button
              type="button"
              aria-label={ariaLabel ? `Drag: ${ariaLabel}` : 'Drag'}
              onPointerDown={(e) => dragControls.start(e)}
              className={`mt-1 flex h-7 w-16 touch-none items-center justify-center rounded-full ${
                dragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <span className="h-[5px] w-9 rounded-full bg-[#8a7a68]" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
