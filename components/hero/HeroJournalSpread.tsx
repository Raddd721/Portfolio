'use client'

import { useState } from 'react'
import { deskItems, DeskIcon, type DeskItemKey } from './DeskIcons'
import { useTypewriter } from './useTypewriter'
import { heroWords, site } from '../../app/content'

const leftPage: DeskItemKey[] = ['lamp', 'tea', 'journal']
const rightPage: DeskItemKey[] = ['coffee', 'flower', 'clay', 'punchNeedle']

const rotate: Record<DeskItemKey, number> = {
  lamp: -4,
  tea: 5,
  journal: -3,
  coffee: 4,
  flower: -5,
  clay: 3,
  punchNeedle: -3,
}

const tapeColor: Record<DeskItemKey, string> = {
  lamp: 'bg-sand',
  tea: 'bg-sage/80',
  journal: 'bg-blush/80',
  coffee: 'bg-sand',
  flower: 'bg-blush/80',
  clay: 'bg-sage/80',
  punchNeedle: 'bg-accent/70',
}

function Pasted({ item }: { item: (typeof deskItems)[number] }) {
  return (
    <div className="group relative pt-3" tabIndex={0}>
      <div
        className={`tape ${tapeColor[item.key]} left-1/2 top-0 !w-12 -translate-x-1/2`}
        style={{ transform: `translateX(-50%) rotate(${rotate[item.key] > 0 ? -8 : 8}deg)` }}
        aria-hidden
      />
      <div
        className="scrap-card relative rounded-sm border border-line/70 bg-[#fbfaf6] p-2.5"
        style={{ transform: `rotate(${rotate[item.key]}deg)` }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = `rotate(${rotate[item.key] / 3}deg) translateY(-8px) scale(1.06)`)
        }
        onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${rotate[item.key]}deg)`)}
      >
        <div className="grid aspect-[4/3] place-items-center rounded" style={{ background: item.wash }}>
          <DeskIcon type={item.key} className="h-12 w-12" />
        </div>
      </div>
      <p className="mt-1.5 text-center font-hand text-lg leading-none text-ink">{item.label}</p>
      <p className="scrap-caption text-center font-mono text-[9px] leading-tight text-faint">{item.caption}</p>
    </div>
  )
}

export default function HeroJournalSpread() {
  const typed = useTypewriter(heroWords)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-xl">
          <p className="tag mb-4">
            {site.role} · {site.location}
          </p>
          <h1 className="font-serif text-4xl font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            Designer with <span className="text-accent">{typed}</span>
            <span className="caret" aria-hidden />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">{site.intro}</p>
        </div>

        <div
          className="relative mx-auto max-w-3xl rounded-lg border border-line/70 bg-[#efe9dd] p-3 shadow-[0_30px_60px_-30px_rgba(26,26,23,0.5)] sm:p-5"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
          }}
          onMouseLeave={() => setCursor(null)}
        >
          {cursor && (
            <span
              className="follow-tag z-20 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] text-ink shadow-sm"
              style={{ left: cursor.x, top: cursor.y }}
            >
              pinned to my desk ✦
            </span>
          )}

          <div className="grid grid-cols-1 gap-x-1 gap-y-8 rounded-md bg-[#fbfaf6] p-5 sm:grid-cols-2 sm:p-8">
            {/* spine */}
            <div
              className="pointer-events-none absolute inset-y-4 left-1/2 hidden w-6 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink/10 to-transparent sm:block"
              aria-hidden
            />

            <div className="grid grid-cols-2 content-start gap-x-4 gap-y-8 sm:pr-6">
              {leftPage.map((k) => (
                <Pasted key={k} item={deskItems.find((d) => d.key === k)!} />
              ))}
            </div>

            <div className="grid grid-cols-2 content-start gap-x-4 gap-y-8 sm:border-l sm:border-dashed sm:border-line sm:pl-6">
              {rightPage.map((k) => (
                <Pasted key={k} item={deskItems.find((d) => d.key === k)!} />
              ))}
            </div>
          </div>

          <p className="mt-4 text-center font-hand text-lg text-muted">
            a page from the notebook that lives next to my keyboard
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="#work" className="link font-mono text-sm">
            selected work ↓
          </a>
          <a href="#contact" className="link font-mono text-sm">
            get in touch →
          </a>
        </div>
      </div>
    </section>
  )
}
