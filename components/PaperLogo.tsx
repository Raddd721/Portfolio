/** The "RO" paper-note mark — a taped scrap of paper, matching the scrapbook
 * hero's own material language. Used as the nav badge and (a simplified,
 * font-free version of) the favicon. */
export default function PaperLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="17" fill="#E8DDC3" stroke="#D3C6A6" strokeWidth="1" />
      <rect
        x="10"
        y="0.5"
        width="17"
        height="6.5"
        rx="1"
        fill="#DCCBA6"
        opacity="0.75"
        transform="rotate(-3 18.5 3.75)"
      />
      <text
        x="20"
        y="25.5"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="16.5"
        letterSpacing="-0.5"
        fill="#543616"
      >
        RO
      </text>
    </svg>
  )
}
