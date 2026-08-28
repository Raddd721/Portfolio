'use client'

import Link from 'next/link'
import useHideOnScroll from '../useHideOnScroll'

/**
 * A persistent way back to the portfolio, visible no matter how far into a
 * long case study the reader has scrolled — each case study's hero already
 * has its own in-flow "back" link, but that scrolls out of view immediately.
 * Semi-transparent + blurred so it reads over any case study's palette,
 * light or dark. Fades out while scrolling down (reappears near the top or
 * on scroll-up) so it never sits fixed over a section heading passing behind
 * it — shrinking its footprint alone wasn't enough, since it's fixed at the
 * exact spot every heading scrolls through.
 */
export default function BackToPortfolio() {
  const visible = useHideOnScroll()

  return (
    <Link
      href="/#work"
      aria-label="Back to portfolio"
      className={`fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-2 font-mono text-[11px] text-white/80 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-[opacity,color,border-color] duration-200 hover:border-white/30 hover:text-white ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      ← Portfolio
    </Link>
  )
}
