'use client'

import { useLayoutEffect, useRef, useState, type RefObject } from 'react'

/**
 * Shrinks (never enlarges) a fixed-composition element so its natural height
 * fits within `maxHeight()`, recalculated on resize. The element keeps its
 * own layout size and is scaled visually via `transform`; wrap it with a
 * container sized to `scale * naturalHeight` (both returned here) so the
 * page doesn't reserve the old, unscaled amount of vertical space.
 */
export default function useScaleToFit(
  maxHeight: () => number,
  minScale = 0.4,
): {
  ref: RefObject<HTMLDivElement>
  scale: number
  height: number | null
} {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current
      if (!el) return
      const natural = el.scrollHeight
      const available = maxHeight()
      const next = natural > available ? Math.max(available / natural, minScale) : 1
      setScale(next)
      setHeight(natural * next)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [maxHeight, minScale])

  return { ref, scale, height }
}
