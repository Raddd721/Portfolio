'use client'

import { deskItems, DeskIcon, type DeskItemKey } from './DeskIcons'
import { useTypewriter } from './useTypewriter'
import { heroWords, site } from '../../app/content'

// Bento-style spans for a flatlay feel — a couple of "hero" tiles, the rest small.
const span: Record<DeskItemKey, string> = {
  lamp: 'col-span-2 row-span-2',
  journal: 'col-span-2 row-span-2',
  tea: 'col-span-2 row-span-1',
  coffee: 'col-span-2 row-span-1',
  flower: 'col-span-2 row-span-1',
  clay: 'col-span-1 row-span-1',
  punchNeedle: 'col-span-1 row-span-1',
}

const tilt: Record<DeskItemKey, number> = {
  lamp: -1.5,
  journal: 1.5,
  tea: -2,
  coffee: 2,
  flower: -1,
  clay: 2.5,
  punchNeedle: -2.5,
}

export default function HeroDeskFlatlay() {
  const typed = useTypewriter(heroWords)

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.3fr] md:items-center md:py-24">
        {/* Text column */}
        <div>
          <p className="tag mb-4">
            {site.role} · {site.location}
          </p>
          <h1 className="font-serif text-4xl font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            Designer with <span className="text-accent">{typed}</span>
            <span className="caret" aria-hidden />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">{site.intro}</p>
          <p className="mt-4 font-hand text-xl text-muted">a flatlay of what keeps me company while I work.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            <a href="#work" className="link font-mono text-sm">
              selected work ↓
            </a>
            <a href="#contact" className="link font-mono text-sm">
              get in touch →
            </a>
          </div>
        </div>

        {/* Flatlay grid */}
        <div className="grid h-[460px] grid-cols-4 grid-rows-3 gap-3 rounded-2xl border border-line/60 bg-[#efe9dd] p-3 sm:h-[560px] sm:gap-4 sm:p-4">
          {deskItems
            .filter((i) => i.key !== 'punchNeedle')
            .concat(deskItems.filter((i) => i.key === 'punchNeedle'))
            .map((item) => (
              <div key={item.key} className={`${span[item.key]} group relative`}>
                <div
                  className="scrap-card relative h-full w-full overflow-hidden rounded-xl border border-line/60 bg-[#fbfaf6]"
                  style={{ transform: `rotate(${tilt[item.key]}deg)` }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px) scale(1.035)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${tilt[item.key]}deg)`)}
                  tabIndex={0}
                >
                  <div className="grid h-full w-full place-items-center" style={{ background: item.wash }}>
                    <DeskIcon
                      type={item.key}
                      className={span[item.key].includes('row-span-2') ? 'h-24 w-24' : 'h-12 w-12'}
                    />
                  </div>

                  <span className="scrap-corner absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full bg-paper/90 text-ink shadow-sm">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                      <path
                        d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-2.5 pt-6">
                    <p className="scrap-caption font-hand text-base leading-none text-paper">{item.label}</p>
                    <p className="scrap-caption font-mono text-[9px] leading-tight text-paper/75">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
