'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from '../Nav'
import useScaleToFit from './useScaleToFit'
import DraggableObject from './DraggableObject'
import StampCollage from './StampCollage'
import Lamp from './Lamp'
import LampFacingGlow from './LampFacingGlow'
import TeaCup from './TeaCup'
import VinylRecord from './VinylRecord'
import BookPull from './BookPull'
import { scrapbookItems, stampGroup, type ScrapbookItem } from './scrapbookObjects'
import { site } from '../../app/content'

type LampEffect = { direction: string; intensity: number }

// Mug and journal each get a highlight on whichever edge faces the lamp,
// softer/blurrier shadows, and a brightness lift — all scaled by
// `intensity` (0–1), which falls off with actual distance from the lamp in
// that layout. Everything on the left of the page (stamps, the flower
// book) simply isn't in this map, so it stays untouched.
const LAMP_EFFECTS_DESKTOP: Record<string, LampEffect> = {
  mug: { direction: 'to top right', intensity: 0.88 },
  journal: { direction: 'to right', intensity: 0.36 },
}
// On mobile the lamp sits above the row, so the lit edge is the top one.
const LAMP_EFFECTS_MOBILE: Record<string, LampEffect> = {
  mug: { direction: 'to top', intensity: 0.7 },
  journal: { direction: 'to top', intensity: 0.5 },
}

// Where the lamp sits, for the background vignette below — kept in sync
// with the lamp's own entry in scrapbookObjects.ts.
const LAMP_POS_DESKTOP = { left: 86 + 13.5 / 2, top: 22 + 13.5 / 2 }

// Mobile: the lamp stays on top, everything else lines up in one horizontal
// row beneath the headline. The row scrolls sideways, so each object is
// dragged by a grip underneath it (see DraggableObject `handle`) instead of
// by its body — a finger on the object itself scrolls the row / page.
const MOBILE_LAMP_WIDTH = 84
const MOBILE_ROW: { id: string; width: number; rotate: number; label: string }[] = [
  { id: 'journal', width: 168, rotate: 3, label: 'My Asian trip' },
  { id: 'stamps', width: 72, rotate: 0, label: 'Souvenirs' },
  { id: 'vinyl', width: 104, rotate: -6, label: 'Laufey on loop' },
  { id: 'flower-book', width: 112, rotate: -3, label: 'Margin doodler' },
  { id: 'books', width: 106, rotate: 6, label: 'Psych nerd' },
  { id: 'mug', width: 100, rotate: 6, label: 'Tea, always' },
]
const mobileLamp = scrapbookItems.find((i) => i.id === 'lamp')!
const mobileRowItems = MOBILE_ROW.map((r) => ({
  ...r,
  item: scrapbookItems.find((i) => i.id === r.id),
}))

// Leaves a little room below the hero — on short/wide viewports (laptop,
// desktop) — so the Case Studies heading peeks into view without scrolling,
// instead of the hero's fixed 1728:1117 composition running past the fold.
const DESKTOP_PEEK = 120

export default function ScrapbookHero() {
  const desktopBoundsRef = useRef<HTMLDivElement>(null!)
  const mobileRowRef = useRef<HTMLDivElement>(null!)
  const [lampOn, setLampOn] = useState(false)
  const toggleLamp = () => setLampOn((v) => !v)
  const [resetSignal, setResetSignal] = useState(0)
  const tidyUp = () => setResetSignal((n) => n + 1)

  const desktopMaxHeight = useCallback(() => window.innerHeight - DESKTOP_PEEK, [])
  const desktopFit = useScaleToFit(desktopMaxHeight)

  return (
    <section className="relative overflow-hidden bg-[#f3f0e7]">
      <GridBackground />
      <PaperCorner />
      <Nav />

      {/* ── Desktop / tablet composition — matches the source layout, scaled to fit the viewport height ── */}
      <div
        className="hidden overflow-hidden sm:block"
        style={desktopFit.height !== null ? { height: desktopFit.height } : undefined}
      >
        <div
          ref={(node) => {
            desktopBoundsRef.current = node!
            ;(desktopFit.ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          className="relative mx-auto aspect-[1728/1117] w-full max-w-[1728px] [--ho-scale:0.86] lg:[--ho-scale:1]"
          style={{
            // Establishes the container context the headline's `cqw` font
            // sizes need — without this, `cqw` has nothing to resolve
            // against and the responsive sizing silently falls back to a
            // fixed size instead of scaling with the composition.
            containerType: 'inline-size',
            transform: `scale(${desktopFit.scale})`,
            transformOrigin: 'top center',
          }}
        >
          <LampVignette on={lampOn} left={LAMP_POS_DESKTOP.left} top={LAMP_POS_DESKTOP.top} />
          <HeadlineBlock />
          <TidyUpButton onClick={tidyUp} />

          {scrapbookItems.map((item) => (
            <DraggableObject
              key={item.id}
              boundsRef={desktopBoundsRef}
              left={item.left}
              top={item.top}
              width={item.width}
              rotate={item.rotate}
              z={item.z}
              lampIntensity={lampOn ? (LAMP_EFFECTS_DESKTOP[item.id]?.intensity ?? 0) : 0}
              resetSignal={resetSignal}
              ariaLabel={item.alt}
              style={heroScaleStyle(item.width)}
            >
              <HeroObjectImage
                item={item}
                lampOn={lampOn}
                onToggleLamp={toggleLamp}
                sizes="20vw"
                priority={item.id === 'lamp' || item.id === 'journal'}
                lampEffects={LAMP_EFFECTS_DESKTOP}
              />
            </DraggableObject>
          ))}

          <DraggableObject
            boundsRef={desktopBoundsRef}
            left={stampGroup.left}
            top={stampGroup.top}
            width={stampGroup.width}
            z={stampGroup.z}
            resetSignal={resetSignal}
            ariaLabel="Collaged travel stamps"
            style={heroScaleStyle(stampGroup.width)}
          >
            <StampCollage />
          </DraggableObject>
        </div>
      </div>

      {/* ── Mobile recomposition — lamp on top, headline, then one horizontal row of objects ── */}
      <div className="relative pb-5 pt-24 sm:hidden">
        <LampVignette on={lampOn} left={50} top={24} />

        {/* The lamp stays up here — fixed in place, just a light switch (no drag grip) */}
        <div className="relative z-10 flex h-[108px] w-full items-start justify-center">
          <div style={{ width: MOBILE_LAMP_WIDTH }}>
            <HeroObjectImage
              item={mobileLamp}
              lampOn={lampOn}
              onToggleLamp={toggleLamp}
              sizes="30vw"
              priority
              lampEffects={LAMP_EFFECTS_MOBILE}
            />
          </div>
        </div>

        <HeadlineBlock mobile />

        {/* The row — swipe it sideways; grab the grip under an object to move that object */}
        <div className="relative z-10 mt-12 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div ref={mobileRowRef} className="flex w-max items-end gap-5 px-6 pb-1 pt-4">
            {mobileRowItems.map(({ id, width, rotate, label, item }, i) => (
              <DraggableObject
                key={id}
                layout="flow"
                handle
                label={label}
                seed={11 * (i + 2)}
                boundsRef={mobileRowRef}
                rotate={rotate}
                z={item?.z ?? stampGroup.z}
                lampIntensity={lampOn ? (LAMP_EFFECTS_MOBILE[id]?.intensity ?? 0) : 0}
                resetSignal={resetSignal}
                ariaLabel={item?.alt ?? 'Collaged travel stamps'}
                style={{ width }}
              >
                {item ? (
                  <HeroObjectImage
                    item={item}
                    lampOn={lampOn}
                    onToggleLamp={toggleLamp}
                    sizes="40vw"
                    priority={id === 'journal'}
                    lampEffects={LAMP_EFFECTS_MOBILE}
                  />
                ) : (
                  <StampCollage />
                )}
              </DraggableObject>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-1 flex justify-center">
          <TidyUpButton onClick={tidyUp} className="static" />
        </div>
      </div>
    </section>
  )
}

/**
 * Renders a single object's image, plus whatever reaction it has to the
 * lamp: the lamp itself is the clickable light switch; the ramen bowl, tea
 * cup, notebook and flower each get a directional highlight — scaled by
 * distance — on whichever edge actually faces the lamp.
 */
function HeroObjectImage({
  item,
  lampOn,
  onToggleLamp,
  sizes,
  priority,
  lampEffects,
}: {
  item: ScrapbookItem
  lampOn: boolean
  onToggleLamp: () => void
  sizes: string
  priority?: boolean
  lampEffects: Record<string, LampEffect>
}) {
  if (item.id === 'lamp') {
    return (
      <Lamp
        src={item.src}
        alt={item.alt}
        intrinsicWidth={item.intrinsicWidth}
        intrinsicHeight={item.intrinsicHeight}
        on={lampOn}
        onToggle={onToggleLamp}
      />
    )
  }

  if (item.id === 'vinyl') {
    return (
      <VinylRecord
        src={item.src}
        alt={item.alt}
        intrinsicWidth={item.intrinsicWidth}
        intrinsicHeight={item.intrinsicHeight}
      />
    )
  }

  const effect = lampEffects[item.id]

  return (
    <span className="relative block">
      {item.id === 'mug' ? (
        <TeaCup
          src={item.src}
          alt={item.alt}
          intrinsicWidth={item.intrinsicWidth}
          intrinsicHeight={item.intrinsicHeight}
        />
      ) : item.id === 'books' ? (
        <BookPull
          src={item.src}
          alt={item.alt}
          intrinsicWidth={item.intrinsicWidth}
          intrinsicHeight={item.intrinsicHeight}
        />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.intrinsicWidth}
          height={item.intrinsicHeight}
          className="h-auto w-full"
          draggable={false}
          sizes={sizes}
          priority={priority}
        />
      )}
      {effect && (
        <LampFacingGlow src={item.src} direction={effect.direction} intensity={effect.intensity} on={lampOn} />
      )}
    </span>
  )
}

/**
 * A soft, off-centre warm wash anchored at the lamp's own position — not a
 * big page-centred circle. Sized to just reach the lit objects and fade out
 * well before the left side of the desk, screen-blended so the grid stays
 * fully visible underneath.
 */
function LampVignette({ on, left, top }: { on: boolean; left: number; top: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-[1] mix-blend-screen transition-opacity ease-in-out"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: '75%',
        height: '75%',
        transform: 'translate(-50%, -50%)',
        opacity: on ? 1 : 0,
        transitionDuration: '750ms',
        background:
          'radial-gradient(ellipse 65% 65% at center, rgba(255,196,107,0.05) 0%, rgba(255,196,107,0.03) 30%, rgba(255,196,107,0.012) 55%, rgba(255,196,107,0) 78%)',
      }}
    />
  )
}

/** Sends every object on the desk back to its resting spot, all at once, on the same settle spring used when you let go of one. */
function TidyUpButton({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`z-20 inline-flex items-center gap-1.5 rounded-full border border-[#dcd7cb] bg-[#fbfaf6] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5f4f3f] shadow-[0_6px_16px_-8px_rgba(38,26,14,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c2410c]/40 hover:text-accent hover:shadow-[0_10px_20px_-8px_rgba(38,26,14,0.4)] ${
        className || 'absolute bottom-5 right-5'
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
        <path
          d="M13 8A5 5 0 1 1 11.5 4.3M13 2v3h-3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Tidy up
    </button>
  )
}

/** Scales an object's footprint down slightly at the `sm`/`md` breakpoints via a CSS var, so tablet keeps the same composition with a little more breathing room. */
function heroScaleStyle(widthPct: number) {
  return {
    width: `calc(var(--ho-scale, 1) * ${widthPct}%)`,
  }
}

/**
 * The graph-paper grid behind the hero. Its cell size and offset come from CSS
 * variables that `useHeadlineGrid` (below) sets from the headline's own
 * measurements, so the headline reads as written *on* the grid: each cell is
 * two characters wide and one line tall, a horizontal line runs under every
 * line of text, and the vertical lines fall between letters instead of
 * through them. It fades in once those measurements exist, so it never
 * shows up misaligned first.
 */
function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity duration-500"
      style={{
        opacity: 'var(--grid-opacity, 0)',
        backgroundImage:
          'linear-gradient(to right, #e3dfd1 1px, transparent 1px), linear-gradient(to bottom, #e3dfd1 1px, transparent 1px)',
        backgroundSize: 'var(--grid-u, 72px) var(--grid-u, 72px)',
        backgroundPosition: 'var(--grid-x, 0px) var(--grid-y, 0px)',
      }}
    />
  )
}

function PaperCorner() {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-[1] hidden w-[20%] max-w-[345.6px] sm:block" aria-hidden>
      <Image
        src="/hero/paper-corner.png"
        alt=""
        width={649}
        height={837}
        className="h-auto w-full"
        style={{ transform: 'scaleY(-1)' }}
        priority
      />
    </div>
  )
}

/** Zero-size marker sitting on the text baseline — read back to find where the baseline really is. */
function Baseline() {
  return <span aria-hidden data-hl-baseline className="inline-block h-0 w-0 align-baseline" />
}

const mod = (n: number, m: number) => ((n % m) + m) % m

/**
 * Aligns the hero grid to the headline. The headline is set in a monospaced
 * face, so one "cell" is two characters wide and one line tall (square). We
 * measure the real character advance and baselines, then:
 *  - make every headline line exactly one cell tall (--hl-lh),
 *  - nudge the tagline a few px so its baseline lands on a grid line too,
 *  - hand the section a grid size/offset that puts a horizontal line under
 *    each line of text and the vertical lines between letters.
 * Everything is measured in rendered pixels, so it stays aligned through the
 * desktop composition's scale-to-fit and at any viewport width.
 */
function useHeadlineGrid(rootRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const root = rootRef.current
    const section = root?.closest('section')
    if (!root || !section) return

    let raf = 0
    let settlePasses = 0
    const schedule = () => {
      cancelAnimationFrame(raf)
      // two frames: lets scale-to-fit commit before we read positions
      raf = requestAnimationFrame(() => (raf = requestAnimationFrame(measure)))
    }

    const measure = () => {
      const rootRect = root.getBoundingClientRect()
      if (rootRect.width === 0) return // the hidden desktop/mobile twin

      const lines = root.querySelectorAll<HTMLElement>('[data-hl-text]')
      const marks = root.querySelectorAll<HTMLElement>('[data-hl-baseline]')
      const tag = root.querySelector<HTMLElement>('[data-hl-tagline]')
      if (lines.length < 2 || marks.length < 3 || !tag) return

      const longest = lines[1]
      const rendered = longest.getBoundingClientRect().width
      if (!rendered || !longest.offsetWidth) return
      const scale = rendered / longest.offsetWidth
      const adv = rendered / (longest.textContent?.length || 1) // one character, rendered px
      const u = 2 * adv // one grid cell, rendered px

      // every headline line = exactly one cell tall
      root.style.setProperty('--hl-lh', `${u / scale}px`)
      void root.offsetHeight // apply the new line-height before reading baselines

      const sectionRect = section.getBoundingClientRect()
      const y1 = marks[0].getBoundingClientRect().top - sectionRect.top
      // Take the tagline's baseline as if it had no nudge: subtract the shift
      // applied last time (stored in rendered px) rather than resetting it,
      // so we never depend on a style change being flushed mid-measure.
      const applied = Number(tag.dataset.hlShift || 0)
      const y3 = marks[2].getBoundingClientRect().top - sectionRect.top - applied
      const r = mod(y3 - y1, u)
      const shift = r > u / 2 ? u - r : -r
      tag.dataset.hlShift = String(shift)
      tag.style.translate = `0 ${shift / scale}px`
      // A resize can change the scale and line height in the same pass; if the
      // nudge moved, measure once more on the next frames until it settles.
      if (Math.abs(shift - applied) > 0.05 && settlePasses++ < 4) schedule()
      else settlePasses = 0

      const left = longest.getBoundingClientRect().left - sectionRect.left
      section.style.setProperty('--grid-u', `${u}px`)
      section.style.setProperty('--grid-x', `${mod(left, u)}px`)
      section.style.setProperty('--grid-y', `${mod(y1, u)}px`)
      section.style.setProperty('--grid-opacity', '1')
    }

    schedule()
    const timers = [setTimeout(schedule, 300), setTimeout(schedule, 1200), setTimeout(schedule, 2500)]
    window.addEventListener('resize', schedule)
    const ro = new ResizeObserver(schedule)
    ro.observe(root)
    void document.fonts?.ready.then(schedule)
    document.fonts?.addEventListener?.('loadingdone', schedule)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', schedule)
      ro.disconnect()
      document.fonts?.removeEventListener?.('loadingdone', schedule)
    }
  }, [rootRef])
}

function HeadlineBlock({ mobile = false }: { mobile?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  useHeadlineGrid(rootRef)

  // Only one of the two responsive variants (desktop/mobile) should be a
  // real <h1> — both render the same headline, so the hidden twin uses a
  // plain <div> with identical styling to avoid a duplicate document heading.
  const HeadingTag = mobile ? 'div' : 'h1'
  // Both headline lines share one size (and the monospaced face), so a
  // character is the same width on each and the grid can sit between letters.
  const lineStyle = {
    fontSize: mobile ? 'clamp(1.5rem, 7.4vw, 2.3rem)' : 'max(1.5rem, 3.15cqw)',
    lineHeight: 'var(--hl-lh, 1.2em)',
  }
  const content = (
    <>
      <HeadingTag className="mx-auto block w-max text-center text-[#543616]" style={{ fontFamily: 'var(--font-pixel)' }}>
        <span className="block whitespace-nowrap" style={lineStyle}>
          <span data-hl-text>
            Hello, I&rsquo;m {site.name.split(' ')[0]},
          </span>
          <Baseline />
        </span>
        <span className="block whitespace-nowrap" style={lineStyle}>
          <span data-hl-text>a Product Designer</span>
          <Baseline />
        </span>
      </HeadingTag>
      <p
        data-hl-tagline
        className="mx-auto whitespace-nowrap font-body text-[#77644e]"
        style={
          mobile
            ? { fontSize: 'clamp(1.05rem, 4.8vw, 1.35rem)', maxWidth: '32ch', whiteSpace: 'normal', lineHeight: 'var(--hl-lh, 1.2em)' }
            : { fontSize: 'max(0.98rem, 1.6198cqw)', lineHeight: 'var(--hl-lh, 1.2em)' }
        }
      >
        With {site.experienceYears}+ years of turning &ldquo;UGH&rdquo; moments to &ldquo;AHA&rdquo; moments
        <Baseline />
      </p>
    </>
  )

  if (mobile) {
    return (
      <div ref={rootRef} className="pointer-events-none relative z-20 px-6 text-center">
        {content}
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute left-1/2 top-[43%] z-10 w-[min(94%,900px)] -translate-x-1/2 text-center"
    >
      {content}
    </div>
  )
}
