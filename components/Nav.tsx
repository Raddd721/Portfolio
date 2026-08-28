'use client'

import { useState } from 'react'
import { resumePageHref } from '../app/content'
import PaperLogo from './PaperLogo'

const links = [
  { href: '#about', label: 'About', Icon: SmileyIcon, external: false },
  { href: '#work', label: 'Work', Icon: BriefcaseIcon, external: false },
  { href: resumePageHref, label: 'Resume', Icon: ResumeIcon, external: true },
] as const

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 py-6">
      <div className="relative">
        <nav className="flex items-center gap-1 rounded-full bg-[#312E27] p-1.5 pr-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-[#E5E0D6]/15">
          <a href="#top" aria-label="Back to top" className="block h-9 w-9 shrink-0 -rotate-2 transition-transform hover:rotate-0">
            <PaperLogo className="h-full w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" />
          </a>

          {/* Full nav — tablet and up */}
          <div className="hidden items-center gap-1 sm:flex">
            {links.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[13px] text-[#E5E0D6] transition-colors hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </div>

          {/* Menu toggle — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#E5E0D6] transition-colors hover:text-white sm:hidden"
          >
            {menuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </nav>

        {/* Dropdown — mobile only, shown when menu is open */}
        {menuOpen && (
          <div className="absolute left-1/2 top-[calc(100%+8px)] w-44 -translate-x-1/2 rounded-2xl bg-[#312E27] p-1.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-[#E5E0D6]/15 sm:hidden">
            {links.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-mono text-[13px] text-[#E5E0D6] transition-colors hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function SmileyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.4 9.5c-.5 1.5-3.8 1.5-4.3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="6.1" cy="6.8" r="0.8" fill="currentColor" />
      <circle cx="9.9" cy="6.8" r="0.8" fill="currentColor" />
    </svg>
  )
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <rect x="1.5" y="4.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 4.5V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <rect x="2.5" y="1.5" width="11" height="13" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
