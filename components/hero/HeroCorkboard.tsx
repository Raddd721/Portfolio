'use client'

import { useState } from 'react'
import Draggable from '../Draggable'
import { deskItems, DeskIcon, type DeskItemKey } from './DeskIcons'
import { useTypewriter } from './useTypewriter'
import { heroWords, site } from '../../app/content'

const layout: Record<DeskItemKey, { left: string; top: string; rotate: number; size: number }> = {
  lamp: { left: '3%', top: '6%', rotate: -6, size: 138 },
  tea: { left: '35%', top: '3%', rotate: 4, size: 118 },
  coffee: { left: '63%', top: '9%', rotate: -4, size: 122 },
  journal: { left: '5%', top: '48%', rotate: 6, size: 148 },
  flower: { left: '52%', top: '50%', rotate: -7, size: 120 },
  clay: { left: '28%', top: '60%', rotate: 3, size: 116 },
  punchNeedle: { left: '73%', top: '55%', rotate: 5, size: 128 },
}

const pinColors = ['#c2410c', '#8fae7a', '#e5b25d', '#d98a7c']

function Card({
  item,
  size,
  rotate,
  onExpand,
}: {
  item: (typeof deskItems)[number]
  size: number
  rotate: number
  onExpand: () => void
}) {
  return (
    <div
      className="group/card w-full"
      style={{ width: size }}
      draggable={false}
    >
      <div
        className="scrap-card group relative rounded-md border border-line/70 bg-[#fbfaf6] p-3 pb-4"
        style={{ transform: `rotate(${rotate}deg)`, ['--hover-rotate' as any]: '0deg' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg) translateY(-6px) scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${rotate}deg)`)}
        tabIndex={0}
      >
        <span
          className="pin"
          style={{ background: pinColors[Math.abs(rotate) % pinColors.length] }}
          aria-hidden
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onExpand()
          }}
          className="scrap-corner absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-line bg-paper/90 text-ink shadow-sm"
          aria-label={`Expand ${item.label}`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
            <path
              d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className="grid aspect-square place-items-center rounded"
          style={{ background: item.wash }}
        >
          <DeskIcon type={item.key} className="h-16 w-16" />
        </div>

        <p className="mt-2 text-center font-hand text-lg leading-none text-ink">{item.label}</p>

        <p className="scrap-caption mt-1 text-center font-mono text-[10px] leading-tight text-faint">
          {item.caption}
        </p>
      </div>
    </div>
  )
}

export default function HeroCorkboard() {
  const typed = useTypewriter(heroWords)
  const [focused, setFocused] = useState<DeskItemKey | null>(null)
  const focusedItem = deskItems.find((d) => d.key === focused) ?? null

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:items-center md:py-24">
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
          <p className="mt-4 font-hand text-xl text-muted">
            everything pinned to the right is on my desk right now.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            <a href="#work" className="link font-mono text-sm">
              selected work ↓
            </a>
            <a href="#contact" className="link font-mono text-sm">
              get in touch →
            </a>
          </div>
        </div>

        {/* Corkboard column */}
        <div className="relative h-[460px] overflow-hidden rounded-2xl border border-line/60 bg-corkboard shadow-[inset_0_0_40px_rgba(0,0,0,0.25)] sm:h-[560px]">
          <span className="pointer-events-none absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70">
            ↕ drag things around
          </span>

          <div className="tape rotate-[-8deg] bg-sand" style={{ left: '10%', top: '-2px' }} />
          <div className="tape rotate-[6deg] bg-sage/80" style={{ right: '14%', top: '-2px' }} />

          {deskItems.map((item) => {
            const pos = layout[item.key]
            return (
              <Draggable
                key={item.key}
                left={pos.left}
                top={pos.top}
                baseZ={2}
                ariaLabel={`${item.label} (draggable)`}
              >
                <Card item={item} size={pos.size} rotate={pos.rotate} onExpand={() => setFocused(item.key)} />
              </Draggable>
            )
          })}
        </div>
      </div>

      {/* Expanded lightbox */}
      {focusedItem && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/40 backdrop-blur-sm"
          onClick={() => setFocused(null)}
        >
          <div
            className="w-[min(360px,80vw)] rounded-lg border border-line bg-[#fbfaf6] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid aspect-square place-items-center rounded" style={{ background: focusedItem.wash }}>
              <DeskIcon type={focusedItem.key} className="h-28 w-28" />
            </div>
            <p className="mt-4 text-center font-hand text-2xl text-ink">{focusedItem.label}</p>
            <p className="mt-1 text-center font-mono text-xs text-faint">{focusedItem.caption}</p>
            <button
              type="button"
              onClick={() => setFocused(null)}
              className="mt-5 w-full font-mono text-[11px] uppercase tracking-[0.14em] text-faint hover:text-accent"
            >
              close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
