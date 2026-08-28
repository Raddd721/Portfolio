const common = 'h-7 w-7 text-ink'

/** Tiny monoline artifacts for the "What's on my mind" grid — one per item. */
export default function PlayingIcon({ name }: { name: 'book' | 'waveform' | 'sketch' | 'diagram' }) {
  if (name === 'book')
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 3v18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12.5 8h4M12.5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  if (name === 'waveform')
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path
          d="M3 12v1M6 9v6M9 6v12M12 4v16M15 7v10M18 10v4M21 11.5v1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  if (name === 'sketch')
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path
          d="M4 20c3-1 5-3 6-6M17 3c1.5 1.5 1.5 4 0 5.5L10 16l-3 1 1-3 7-7c1.5-1.5 1-4-.5-4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  // diagram (graduation cap)
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 11.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
