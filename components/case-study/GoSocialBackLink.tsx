'use client'

import Link from 'next/link'
import useHideOnScroll from '../useHideOnScroll'

/**
 * GoSocial's own branded "G badge" back link, used in place of the generic
 * BackToPortfolio component. Fades out while scrolling down (reappears near
 * the top or on scroll-up) so it never sits fixed over a section heading
 * passing behind it — see useHideOnScroll.
 */
export default function GoSocialBackLink() {
  const visible = useHideOnScroll()

  return (
    <Link
      href="/#work"
      aria-label="Back to portfolio"
      className={`fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 py-1.5 pl-1.5 pr-3 font-mono text-[11px] text-faint shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-[opacity,color] duration-200 hover:text-paper ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-paper">G</span>
      Back to portfolio
    </Link>
  )
}
