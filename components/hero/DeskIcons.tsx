// Small hand-drawn-style line icons standing in for photos of the real
// objects (green tea, iced coffee, the mushroom lamp, a journal, a pipe
// cleaner flower, a lump of air-dry clay, a punch-needle hoop). Swap the
// <svg> markup for real photography later — the surrounding card, tape and
// hover choreography in HeroCorkboard / HeroDeskFlatlay / HeroJournalSpread
// don't need to change.

export type DeskItemKey =
  | 'tea'
  | 'coffee'
  | 'lamp'
  | 'journal'
  | 'flower'
  | 'clay'
  | 'punchNeedle'

export type DeskItem = {
  key: DeskItemKey
  label: string
  caption: string
  wash: string // soft background wash behind the icon
}

export const deskItems: DeskItem[] = [
  { key: 'lamp', label: 'the desk lamp', caption: 'makes 11pm feel like a decision', wash: '#f1e6c9' },
  { key: 'tea', label: 'green tea', caption: 'the 4pm reset', wash: '#e3ead4' },
  { key: 'coffee', label: 'iced coffee', caption: 'non-negotiable, even in winter', wash: '#ecdfd0' },
  { key: 'journal', label: 'the journal', caption: '80% to-do lists, 20% feelings', wash: '#f2e2d8' },
  { key: 'flower', label: 'pipe cleaner flowers', caption: 'loop, twist, bloom', wash: '#f4e0e6' },
  { key: 'clay', label: 'air dry clay', caption: 'lopsided on purpose', wash: '#ece3d3' },
  { key: 'punchNeedle', label: 'punch needling', caption: 'one loop at a time', wash: '#e6ecdf' },
]

export function DeskIcon({ type, className }: { type: DeskItemKey; className?: string }) {
  const common = {
    viewBox: '0 0 96 96',
    className: className ?? 'h-14 w-14',
    fill: 'none',
    'aria-hidden': true as const,
  }
  const stroke = 'var(--icon-stroke, #1a1a17)'
  const accent = 'var(--icon-accent, #c2410c)'

  switch (type) {
    case 'tea':
      return (
        <svg {...common}>
          <path d="M30 20c-1 4 3 5 2 9M42 20c-1 4 3 5 2 9" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
          <path d="M22 38h40l-3 24a7 7 0 0 1-7 6H32a7 7 0 0 1-7-6l-3-24Z" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M62 42c8-2 10 10 1 12" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
          <rect x="38" y="30" width="10" height="7" rx="1.5" fill={accent} opacity="0.85" />
          <path d="M43 30V22c0-2 3-2 4-4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'coffee':
      return (
        <svg {...common}>
          <path d="M28 30h34l-4 34a5 5 0 0 1-5 4.4H37a5 5 0 0 1-5-4.4l-4-34Z" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M32 30 30 64M45 30v38M58 30l2 34" stroke={stroke} strokeWidth="1.4" opacity="0.5" />
          <rect x="40" y="40" width="7" height="7" fill={accent} opacity="0.8" transform="rotate(18 43.5 43.5)" />
          <rect x="50" y="50" width="6" height="6" fill={accent} opacity="0.6" transform="rotate(-10 53 53)" />
          <path d="M52 26 66 12" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )
    case 'lamp':
      return (
        <svg {...common}>
          {/* flat mushroom cap */}
          <path d="M17 30c0-8 12-14 27-14s27 6 27 14c0 3-2 5-5 5H22c-3 0-5-2-5-5Z" fill={accent} opacity="0.85" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
          {/* glowing globe peeking out beneath the cap */}
          <circle cx="44" cy="40" r="11" fill="#fdfbf3" stroke={stroke} strokeWidth="2.2" />
          {/* thin stem */}
          <path d="M44 51v22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          {/* round base plate */}
          <ellipse cx="44" cy="76" rx="17" ry="4.5" stroke={stroke} strokeWidth="2.4" />
          <path d="M58 73c4 1 7 2 9 3.5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    case 'journal':
      return (
        <svg {...common}>
          <path d="M18 24a4 4 0 0 1 4-4h38a4 4 0 0 1 4 4v46a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V24Z" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M44 20v54" stroke={stroke} strokeWidth="1.6" opacity="0.5" />
          <path d="M26 32h12M26 40h14M26 48h10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
          <path d="M56 20v14l-4-3-4 3V20" fill={accent} opacity="0.85" />
          <path d="M60 34 74 20" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )
    case 'flower':
      return (
        <svg {...common}>
          <path d="M46 52V80" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M46 66c-6 0-10 4-14 3" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" />
          {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((deg) => (
            <ellipse
              key={deg}
              cx="46"
              cy="30"
              rx="7"
              ry="11"
              fill={accent}
              opacity="0.8"
              transform={`rotate(${deg} 46 42)`}
            />
          ))}
          <circle cx="46" cy="42" r="6" fill={stroke} opacity="0.9" />
        </svg>
      )
    case 'clay':
      return (
        <svg {...common}>
          <path d="M22 54c-1-14 10-24 24-24s24 9 24 22c0 12-9 18-24 18-13 0-23-5-24-16Z" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
          <ellipse cx="46" cy="34" rx="17" ry="6" fill={accent} opacity="0.75" />
          <circle cx="34" cy="48" r="1.6" fill={stroke} opacity="0.5" />
          <circle cx="44" cy="54" r="1.6" fill={stroke} opacity="0.5" />
          <circle cx="56" cy="46" r="1.6" fill={stroke} opacity="0.5" />
          <path d="M64 62c5 2 9 6 9 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    case 'punchNeedle':
      return (
        <svg {...common}>
          <circle cx="40" cy="46" r="24" stroke={stroke} strokeWidth="2.8" />
          <circle cx="40" cy="46" r="18" stroke={stroke} strokeWidth="1.6" opacity="0.5" />
          {[[32, 40], [48, 38], [40, 50], [30, 52], [50, 50]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4.5" fill={accent} opacity={0.7 + (i % 2) * 0.15} />
          ))}
          <path d="M60 26 76 10M76 10l-6 1 1-6" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}
