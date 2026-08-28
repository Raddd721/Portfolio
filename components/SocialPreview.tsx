type Platform = 'linkedin' | 'behance'

const BADGE: Record<Platform, { text: string; bg: string }> = {
  linkedin: { text: 'in', bg: '#2867B2' },
  behance: { text: 'Be', bg: '#1769FF' },
}

/**
 * A small hover-preview card for a social link — appears above the link on
 * hover/focus. Parent must have `className="group relative"`.
 */
export default function SocialPreview({
  platform,
  name,
  role,
  handle,
}: {
  platform: Platform
  name: string
  role: string
  handle: string
}) {
  const badge = BADGE[platform]

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-48 -translate-x-1/2 translate-y-1 rounded-xl border border-line bg-paper p-4 text-left opacity-0 shadow-[0_16px_32px_-16px_rgba(26,26,23,0.35)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:w-60"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold text-white"
          style={{ backgroundColor: badge.bg }}
        >
          {badge.text}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{name}</p>
          <p className="truncate text-xs text-muted">{role}</p>
        </div>
      </div>
      <p className="mt-3 truncate font-mono text-[11px] text-faint">{handle}</p>
      {/* little pointer nub */}
      <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-line bg-paper" />
    </div>
  )
}
