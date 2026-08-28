'use client'

import { useEffect, useState } from 'react'
import Draggable from './Draggable'
import { desktopIcons, heroWords, site } from '../app/content'

/** Types the hero words out and deletes them, one after another, forever. */
function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const done = !deleting && text === word
    const cleared = deleting && text === ''

    const delay = done ? 1600 : cleared ? 200 : deleting ? 45 : 85

    const id = setTimeout(() => {
      if (done) {
        setDeleting(true)
        return
      }
      if (cleared) {
        setDeleting(false)
        setIndex((i) => i + 1)
        return
      }
      setText((t) =>
        deleting ? word.slice(0, t.length - 1) : word.slice(0, t.length + 1),
      )
    }, delay)

    return () => clearTimeout(id)
  }, [text, deleting, index, words])

  return text
}

function Glyph({ name }: { name: string }) {
  const common = 'h-8 w-8 text-ink'
  if (name === 'folder')
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path
          d="M3 7a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.4.6L11.4 7H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    )
  if (name === 'music')
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path
          d="M9 18V6l10-2v12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6.5" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.5" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  if (name === 'mail')
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  // monogram
  return (
    <span className="font-serif text-2xl italic text-ink">
      {site.name.charAt(0).toLowerCase()}
    </span>
  )
}

function DesktopIcon({ glyph, label }: { glyph: string; label: string }) {
  return (
    <span className="flex w-[104px] flex-col items-center gap-2 text-center">
      <span className="grid h-[84px] w-[84px] place-items-center rounded-2xl border border-line bg-[#fbfaf6] shadow-[0_1px_0_rgba(0,0,0,0.04),0_10px_24px_-14px_rgba(0,0,0,0.25)] transition-transform duration-200 group-hover:-translate-y-0.5 group-active:scale-95">
        <Glyph name={glyph} />
      </span>
      <span className="font-mono text-[11px] tracking-tight text-muted">{label}</span>
    </span>
  )
}

export default function Hero() {
  const typed = useTypewriter(heroWords)

  return (
    <section className="relative overflow-hidden">
      {/* faint desktop grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(26,26,23,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,23,0.05) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(120% 90% at 40% 30%, #000 55%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 40% 30%, #000 55%, transparent 100%)',
        }}
      />

      {/* ── Desktop canvas (md and up): draggable window + icons ── */}
      <div className="relative hidden h-[78vh] min-h-[560px] w-full md:block">
        <span className="pointer-events-none absolute left-6 top-4 font-mono text-[11px] text-faint">
          ↕ drag things around
        </span>

        {/* Window with the typewriter headline */}
        <Draggable left="4%" top="72px" baseZ={5} ariaLabel="Intro window" className="w-[min(560px,46vw)]">
          <div className="overflow-hidden rounded-xl border border-line bg-[#fbfaf6] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_30px_60px_-32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-3 w-3 rounded-full border border-black/10 bg-[#e5b25d]" />
                <span className="h-3 w-3 rounded-full border border-black/10 bg-[#8fae7a]" />
                <span className="h-3 w-3 rounded-full border border-black/10 bg-[#c96f4a]" />
              </div>
              <span className="font-mono text-[11px] text-faint">hello.txt — {site.os}</span>
              <span className="font-mono text-xs text-faint" aria-hidden>
                ×
              </span>
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <p className="tag mb-4">
                {site.role} · {site.location}
              </p>
              <h1 className="font-serif text-4xl font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                Designer with{' '}
                <span className="text-accent">{typed}</span>
                <span className="caret" aria-hidden />
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {site.intro}
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
          </div>
        </Draggable>

        {/* Draggable desktop icons */}
        {desktopIcons.map((icon, i) => (
          <Draggable
            key={icon.key}
            left={icon.left}
            top={icon.top}
            baseZ={2}
            ariaLabel={`${icon.label} (draggable)`}
          >
            <a href={icon.href} className="group block" draggable={false}>
              <DesktopIcon glyph={icon.glyph} label={icon.label} />
            </a>
          </Draggable>
        ))}

        {/* Dock */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-[#fbfaf6]/80 px-3 py-2 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.4)] backdrop-blur">
            {['work', 'about', 'playing', 'contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="pointer-events-auto grid h-9 w-9 place-items-center rounded-lg border border-line bg-paper font-mono text-[10px] uppercase text-muted transition-transform hover:-translate-y-1 hover:text-accent"
                title={id}
              >
                {id.charAt(0)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile fallback: simple stacked hero ── */}
      <div className="px-6 pb-16 pt-16 md:hidden">
        <p className="tag mb-4">
          {site.role} · {site.location}
        </p>
        <h1 className="font-serif text-[2.4rem] font-light leading-[1.12] tracking-[-0.02em]">
          Designer with <span className="text-accent">{typed}</span>
          <span className="caret" aria-hidden />
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{site.intro}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <a href="#work" className="link font-mono text-sm">
            selected work ↓
          </a>
          <a href="#contact" className="link font-mono text-sm">
            get in touch →
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3">
          {desktopIcons.map((icon) => (
            <a
              key={icon.key}
              href={icon.href}
              className="flex items-center gap-3 rounded-xl border border-line bg-[#fbfaf6] px-4 py-3"
            >
              <Glyph name={icon.glyph} />
              <span className="font-mono text-xs text-muted">{icon.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
