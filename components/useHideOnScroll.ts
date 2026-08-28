'use client'

import { useEffect, useState } from 'react'

/**
 * True when a fixed element should be visible: near the top of the page, or
 * scrolling up. False while actively scrolling down past the threshold —
 * used to keep persistent corner buttons from sitting over section headings
 * as they pass behind that fixed spot during scroll.
 */
export default function useHideOnScroll(threshold = 80) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const scrollingDown = y > lastY
      setVisible(y < threshold || !scrollingDown)
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return visible
}
