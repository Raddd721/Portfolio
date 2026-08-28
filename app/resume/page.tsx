import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { resumeHref, site } from '../content'

// Rendered from the source PDF (see scratchpad note) at 2.5x for crisp
// display — avoids relying on the browser's built-in PDF viewer, which was
// rendering the resume at an unpredictable zoom/scroll position.
const resumePages = [
  { src: '/resume/pages/page-1.png', width: 1488, height: 2105 },
  { src: '/resume/pages/page-2.png', width: 1488, height: 2105 },
]

export const metadata: Metadata = {
  title: `Resume — ${site.name}`,
  description: `${site.name}'s resume — ${site.role}.`,
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-[900px] px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/#top"
            className="flex items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-[11px] text-muted transition-colors hover:text-ink"
          >
            ← Back to portfolio
          </Link>

          <a
            href={resumeHref}
            download
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-[11px] text-paper transition-colors hover:bg-accent"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Download PDF
          </a>
        </div>

        <div className="space-y-6">
          {resumePages.map((p, i) => (
            <div
              key={p.src}
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_48px_-24px_rgba(26,26,23,0.35)]"
            >
              <Image
                src={p.src}
                alt={`${site.name}'s resume — page ${i + 1}`}
                width={p.width}
                height={p.height}
                className="h-auto w-full"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path d="M8 1.5v9M8 10.5 4.5 7M8 10.5 11.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 12.5v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
