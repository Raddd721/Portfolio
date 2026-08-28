'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
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
const LAMP_EFFECTS_MOBILE: Record<string, LampEffect> = {
  mug: { direction: 'to left', intensity: 1 },
  journal: { direction: 'to left', intensity: 0.56 },
}

// Where the lamp sits, for the background vignette below — kept in sync
// with the lamp's own entry in scrapbookObjects.ts / mobilePositions.
const LAMP_POS_DESKTOP = { left: 86 + 13.5 / 2, top: 22 + 13.5 / 2 }
const LAMP_POS_MOBILE = { left: 2.8 + 26.4 / 2, top: 5 + 26.4 / 2 }

// Mobile recomposes the same pieces into a loose scatter beneath the
// headline instead of the wide desktop spread — same objects, same tactile
// drag, just laid out in stacked rows sized to a narrow viewport.
const mobilePositions: Record<string, { left: number; top: number; width: number; rotate: number }> = {
  journal: { left: 33, top: 1, width: 64, rotate: 4 },
  lamp: { left: 2.8, top: 5, width: 26.4, rotate: 0 },
  mug: { left: 2, top: 64, width: 18, rotate: 8 },
  stamps: { left: 72, top: 65, width: 24, rotate: 0 },
  'flower-book': { left: 2, top: 80, width: 36, rotate: -3 },
  books: { left: 42, top: 65, width: 26, rotate: 8 },
  vinyl: { left: 40, top: 96, width: 34, rotate: -8 },
}

const mobileItems = scrapbookItems.map((item) => ({ ...item, ...mobilePositions[item.id] }))
const mobileStamps = { ...stampGroup, ...mobilePositions.stamps }

// Leaves a little room below the hero — on short/wide viewports (laptop,
// desktop) — so the Case Studies heading peeks into view without scrolling,
// instead of the hero's fixed 1728:1117 composition running past the fold.
const DESKTOP_PEEK = 120
const MOBILE_PEEK = 130
// Fixed, unscaled space reserved above the mobile composition so the fixed
// nav pill (bottom edge ~72px) never overlaps the headline once the content
// below it is scaled down to fit.
const MOBILE_NAV_CLEARANCE = 96

export default function ScrapbookHero() {
  const desktopBoundsRef = useRef<HTMLDivElement>(null!)
  const mobileBoundsRef = useRef<HTMLDivElement>(null!)
  const [lampOn, setLampOn] = useState(false)
  const toggleLamp = () => setLampOn((v) => !v)
  const [resetSignal, setResetSignal] = useState(0)
  const tidyUp = () => setResetSignal((n) => n + 1)

  const desktopMaxHeight = useCallback(() => window.innerHeight - DESKTOP_PEEK, [])
  const mobileMaxHeight = useCallback(() => window.innerHeight - MOBILE_PEEK - MOBILE_NAV_CLEARANCE, [])
  const desktopFit = useScaleToFit(desktopMaxHeight)
  const mobileFit = useScaleToFit(mobileMaxHeight)

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

      {/* ── Mobile recomposition — scaled to fit the viewport height ── */}
      <div
        className="overflow-hidden pt-24 sm:hidden"
        style={mobileFit.height !== null ? { height: MOBILE_NAV_CLEARANCE + mobileFit.height } : undefined}
      >
        <div
          ref={(node) => {
            ;(mobileFit.ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          className="relative px-6 pb-6"
          style={{
            // Widen before scaling down, so the uniform transform (needed to
            // shrink objects without distorting them) lands back at exactly
            // 100% width — mobile should stay edge-to-edge, only shorter. The
            // nav-clearance padding above stays outside this transform so it
            // isn't shrunk along with the composition.
            width: `${100 / mobileFit.scale}%`,
            transform: `scale(${mobileFit.scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div ref={mobileBoundsRef} className="relative h-[790px] w-full">
            <LampVignette on={lampOn} left={LAMP_POS_MOBILE.left} top={LAMP_POS_MOBILE.top} />
            <HeadlineBlock mobile />
          {mobileItems.map((item) => (
            <DraggableObject
              key={item.id}
              boundsRef={mobileBoundsRef}
              left={item.left}
              top={item.top}
              width={item.width}
              rotate={item.rotate}
              lampIntensity={lampOn ? (LAMP_EFFECTS_MOBILE[item.id]?.intensity ?? 0) : 0}
              resetSignal={resetSignal}
              ariaLabel={item.alt}
            >
              <HeroObjectImage
                item={item}
                lampOn={lampOn}
                onToggleLamp={toggleLamp}
                sizes="40vw"
                priority={item.id === 'lamp' || item.id === 'journal'}
                lampEffects={LAMP_EFFECTS_MOBILE}
              />
            </DraggableObject>
          ))}

          <DraggableObject
            boundsRef={mobileBoundsRef}
            left={mobileStamps.left}
            top={mobileStamps.top}
            width={mobileStamps.width}
            resetSignal={resetSignal}
            ariaLabel="Collaged travel stamps"
          >
            <StampCollage />
          </DraggableObject>
          </div>
          <div className="relative mt-6 flex justify-center">
            <TidyUpButton onClick={tidyUp} className="static" />
          </div>
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

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(to right, #e3dfd1 1px, transparent 1px), linear-gradient(to bottom, #e3dfd1 1px, transparent 1px)',
        backgroundSize: '72px 72px',
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

function HeadlineBlock({ mobile = false }: { mobile?: boolean }) {
  // Only one of the two responsive variants (desktop/mobile) should be a
  // real <h1> — both render the same headline, so the hidden twin uses a
  // plain <div> with identical styling to avoid a duplicate document heading.
  const HeadingTag = mobile ? 'div' : 'h1'
  const content = (
    <>
      <HeadingTag
        className="text-[#543616]"
        style={{ fontFamily: 'var(--font-pixel)' }}
      >
        <span
          className="block font-semibold leading-[1.05] tracking-tight"
          style={mobile ? { fontSize: 'clamp(2.35rem, 10.5vw, 3.1rem)' } : { fontSize: 'max(1.5rem, 3.15cqw)' }}
        >
          Hello, I&rsquo;m {site.name.split(' ')[0]},
        </span>
        <span
          className="mt-2 block tracking-tight"
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: mobile ? 'clamp(2.05rem, 9.3vw, 2.8rem)' : 'max(1.425rem, 2.925cqw)',
          }}
        >
          a Sr.<span style={{ marginLeft: '-0.3em' }}> Product Designer</span>
        </span>
      </HeadingTag>
      <p
        className="mx-auto mt-1.5 whitespace-nowrap font-body text-[#77644e]"
        style={
          mobile
            ? { fontSize: 'clamp(1.5rem, 6.7vw, 1.68rem)', maxWidth: '30ch', whiteSpace: 'normal' }
            : { fontSize: 'max(0.98rem, 1.6198cqw)' }
        }
      >
        With {site.experienceYears}+ Years of turning &ldquo;ugh&rdquo; moments to &ldquo;Aha&rdquo; moments
      </p>
    </>
  )

  if (mobile) {
    return (
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-full -translate-x-1/2 -translate-y-1/2 text-center">
        {content}
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute left-1/2 top-[43%] z-10 w-[min(94%,900px)] -translate-x-1/2 text-center">
      {content}
    </div>
  )
}
