import Link from 'next/link'
import Reveal from '../Reveal'
import TypeScaleTabs from './TypeScaleTabs'
import ColorThemeTabs from './ColorThemeTabs'
import BackToPortfolio from './BackToPortfolio'
import {
  meta,
  hero,
  context,
  foundation,
  rules,
  componentsSection,
  application,
  aiSection,
  evolution,
  proof,
  closing,
} from './modrekContent'

// Colors below are the real Modrek Design System tokens (not invented for
// this page) — see modrek-tokens.json and app/globals.css in the
// modrek-design-system project at the repo root.
const ink = '#0A0D0C'
const surface = '#111716'
const raised = '#19211E'
const text = '#F3F7F5'
const muted = '#93A19A'
const faint = '#5D6A64'
const purple = '#7C3FFE' // --color-primary-default (light theme)
const mint = '#34E4A0' // accent / --color-primary-default (dark theme)
const hairline = 'rgba(255,255,255,0.08)'

/**
 * The Modrek Design System case study — a dark, editorial, typography-led
 * page built using Modrek's own real tokens (see constants above), distinct
 * from both the portfolio's warm-paper theme and the GoSocial case study's
 * type system. No fabricated screens: sections 4/5 render the real Button
 * component's actual style logic rather than mocked-up screenshots.
 */
export default function ModrekCaseStudy() {
  return (
    <div style={{ backgroundColor: ink, color: text }}>
      <BackToPortfolio />
      <Hero />
      <main className="mx-auto max-w-[900px] px-6">
        <Context />
        <Foundation />
        <Rules />
        <ComponentsSection />
        <Application />
        <AiSection />
        <Evolution />
        <Proof />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 font-pixel text-[11px] uppercase tracking-[0.18em]" style={{ color: mint }}>
      {children}
    </p>
  )
}

function Heading({ lines, italicIndex }: { lines: string[]; italicIndex?: number }) {
  return (
    <h2 className="max-w-xl text-balance font-pixel text-4xl font-light leading-[1.15] sm:text-5xl">
      {lines.map((line, i) => (
        <span key={line} className={i === italicIndex ? 'font-fraunces italic' : ''} style={{ fontStyle: i === italicIndex ? 'italic' : 'normal' }}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </h2>
  )
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-14 sm:py-20 ${className}`} style={{ borderTop: `1px solid ${hairline}` }}>
      {children}
    </section>
  )
}

function Hero() {
  return (
    <section className="px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <h1 className="max-w-xl text-balance font-pixel text-5xl font-light leading-[1.15] sm:text-6xl">
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className={i === hero.italicLine ? 'font-fraunces italic' : ''}
                style={i === hero.italicLine ? { fontStyle: 'italic' } : undefined}
              >
                {line}
                {i < hero.headline.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-[46ch] text-balance text-base leading-relaxed" style={{ color: muted }}>
            {hero.paragraph}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-3" style={{ borderColor: hairline }}>
            <MetaItem label="Role" value={meta.role} />
            <MetaItem label="Scope" value={meta.scope} />
            <MetaItem label="Platforms" value={meta.platforms} />
            <MetaItem label="Languages" value={meta.languages} />
            <MetaItem label="Themes" value={meta.themes} />
            <MetaItem label="Status" value={meta.status} />
          </dl>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 font-pixel text-[10px] uppercase tracking-[0.08em]"
                style={{ border: `1px solid ${hairline}`, color: faint }}
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
        {label}
      </dt>
      <dd className="mt-1.5 text-sm" style={{ color: text }}>
        {value}
      </dd>
    </div>
  )
}

function Context() {
  return (
    <Section className="border-t-0 pt-0">
      <Reveal>
        <Eyebrow>{context.eyebrow}</Eyebrow>
        <Heading lines={context.headline} italicIndex={context.italicLine} />
      </Reveal>

      <Reveal delay={60}>
        <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: muted }}>
          {context.intro}
        </p>
        <p className="mt-3 font-pixel text-[11px] uppercase tracking-[0.14em]" style={{ color: mint }}>
          {context.tagline}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <p
          className="mt-14 max-w-2xl text-balance font-fraunces text-2xl font-light italic leading-snug sm:text-3xl"
          style={{ color: mint }}
        >
          {context.question}
        </p>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: muted }}>
          {context.answer}
        </p>
      </Reveal>
    </Section>
  )
}

function Foundation() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>{foundation.eyebrow}</Eyebrow>
        <Heading lines={foundation.headline} />
      </Reveal>

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <Reveal delay={60}>
          <div className="space-y-px overflow-hidden rounded-[14px]" style={{ border: `1px solid ${hairline}` }}>
            {foundation.primitives.map((p) => (
              <div key={p} className="px-5 py-4 text-sm" style={{ backgroundColor: surface, borderBottom: `1px solid ${hairline}` }}>
                {p}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-base leading-relaxed" style={{ color: muted }}>
            {foundation.body}
          </p>
          <div className="mt-8 rounded-[14px] p-5 font-pixel text-[12px] leading-relaxed" style={{ backgroundColor: surface, border: `1px solid ${hairline}`, color: mint }}>
            {foundation.tokens.map((t) => (
              <div key={t}>{t}</div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <p className="mb-4 mt-16 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          {foundation.atomicDesign.label}
        </p>
        <p className="mb-6 max-w-xl text-sm leading-relaxed" style={{ color: muted }}>
          {foundation.atomicDesign.note}
        </p>
        <div className="grid gap-px overflow-hidden rounded-[14px] sm:grid-cols-4" style={{ border: `1px solid ${hairline}`, backgroundColor: hairline }}>
          {foundation.atomicDesign.levels.map((lvl, i) => (
            <div key={lvl.label} className="p-5" style={{ backgroundColor: surface }}>
              <p className="font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: mint }}>
                0{i + 1} {lvl.label}
              </p>
              <ul className="mt-3 space-y-1.5">
                {lvl.items.map((item) => (
                  <li key={item} className="text-sm" style={{ color: text }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

function Rules() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>{rules.eyebrow}</Eyebrow>
        <Heading lines={rules.headline} />
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed" style={{ color: muted }}>
          {rules.body}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <p className="mb-4 mt-16 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          Color
        </p>
        <ColorThemeTabs rows={rules.colors} />
      </Reveal>

      <Reveal delay={100}>
        <p className="mb-4 mt-12 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          Typography
        </p>
        <TypeScaleTabs rows={rules.type} />
      </Reveal>

      <Reveal delay={120}>
        <p className="mb-4 mt-12 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          Fluid scaling
        </p>
        <div className="rounded-[14px] p-5" style={{ backgroundColor: surface, border: `1px solid ${hairline}` }}>
          <p className="font-pixel text-[13px]" style={{ color: mint }}>
            {rules.fluidType.formula}
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: muted }}>
            {rules.fluidType.note}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {rules.fluidType.classes.map((c) => (
              <span
                key={c}
                className="rounded-full px-3 py-1 font-pixel text-[10px]"
                style={{ border: `1px solid ${hairline}`, color: faint }}
              >
                {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: muted }}>
            {rules.fluidType.rtlNote}
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <p className="mb-4 mt-12 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          Spacing
        </p>
        <div className="flex flex-wrap items-end gap-3 rounded-[14px] p-5" style={{ backgroundColor: surface, border: `1px solid ${hairline}` }}>
          {rules.spacing.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div style={{ width: s, height: s, backgroundColor: mint, borderRadius: 2 }} />
              <span className="font-pixel text-[10px]" style={{ color: faint }}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160}>
        <p className="mb-4 mt-12 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          Radius
        </p>
        <div className="flex flex-wrap gap-6">
          {rules.radius.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: raised,
                  border: `1px solid ${hairline}`,
                  borderRadius: r.value > 100 ? '999px' : r.value,
                }}
              />
              <span className="font-pixel text-[10px]" style={{ color: faint }}>
                {r.label} · {r.value}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <p className="mb-4 mt-12 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          LTR / RTL
        </p>
        <div className="grid gap-px overflow-hidden rounded-[14px] sm:grid-cols-2" style={{ border: `1px solid ${hairline}`, backgroundColor: hairline }}>
          <div className="p-6" style={{ backgroundColor: surface }}>
            <p className="font-pixel text-[10px] uppercase tracking-[0.1em]" style={{ color: faint }}>
              {rules.rtlExample.ltr.label}
            </p>
            <p className="mt-3 text-2xl" style={{ fontFamily: rules.rtlExample.ltr.font }}>
              {rules.rtlExample.ltr.text}
            </p>
          </div>
          <div className="p-6 text-right" dir="rtl" style={{ backgroundColor: surface }}>
            <p className="font-pixel text-[10px] uppercase tracking-[0.1em]" style={{ color: faint }}>
              {rules.rtlExample.rtl.label}
            </p>
            <p className="mt-3 text-2xl" style={{ fontFamily: rules.rtlExample.rtl.font }}>
              {rules.rtlExample.rtl.text}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function ComponentsSection() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>{componentsSection.eyebrow}</Eyebrow>
        <Heading lines={componentsSection.headline} />
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed" style={{ color: muted }}>
          {componentsSection.body}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[14px] sm:grid-cols-4" style={{ border: `1px solid ${hairline}`, backgroundColor: hairline }}>
          {componentsSection.blocks.map((b) => (
            <div key={b.label} className="p-5" style={{ backgroundColor: surface }}>
              <p className="font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: mint }}>
                {b.label}
              </p>
              <p className="mt-2 text-sm">{b.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120}>
        <p className="mb-4 mt-14 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          Button · Primary · every state
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {componentsSection.states.map((s) => (
            <RealButton key={s} state={s} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={160}>
        <p className="mb-4 mt-14 font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
          Same variant, light vs. dark
        </p>
        <div className="grid gap-px overflow-hidden rounded-[14px] sm:grid-cols-2" style={{ border: `1px solid ${hairline}`, backgroundColor: hairline }}>
          <div className="flex items-center justify-center p-10" style={{ backgroundColor: '#F3F4F6' }}>
            <button className="rounded-full px-6 py-3 text-sm font-medium" style={{ backgroundColor: purple, color: '#FDFDFD' }}>
              Continue
            </button>
          </div>
          <div className="flex items-center justify-center p-10" style={{ backgroundColor: '#1A1B23' }}>
            <button className="rounded-full px-6 py-3 text-sm font-medium" style={{ backgroundColor: mint, color: '#151323' }}>
              Continue
            </button>
          </div>
        </div>
        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed" style={{ color: muted }}>
          {componentsSection.themeNote}
        </p>
      </Reveal>
    </Section>
  )
}

/** A faithful re-implementation of the real Button component's style logic (Button.tsx) for each state — not a screenshot, not a redesign. */
function RealButton({ state }: { state: string }) {
  const styles: Record<string, { bg: string; color: string; border: string; opacity: number }> = {
    Default: { bg: purple, color: '#FDFDFD', border: 'transparent', opacity: 1 },
    Hover: { bg: '#6632D5', color: '#FDFDFD', border: 'transparent', opacity: 1 },
    Active: { bg: '#3B1982', color: '#FDFDFD', border: 'transparent', opacity: 1 },
    Disabled: { bg: '#252630', color: '#69748C', border: 'transparent', opacity: 0.6 },
  }
  const s = styles[state]
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className="rounded-full px-5 py-2.5 text-sm font-medium"
        style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`, opacity: s.opacity }}
        disabled={state === 'Disabled'}
      >
        Continue
      </button>
      <span className="font-pixel text-[10px]" style={{ color: faint }}>
        {state}
      </span>
    </div>
  )
}

function Application() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>{application.eyebrow}</Eyebrow>
        <Heading lines={application.headline} />
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed" style={{ color: muted }}>
          {application.body}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {application.variants.map((v, i) => (
          <Reveal key={v.label} delay={60 + i * 50}>
            <div
              className="flex h-[220px] items-center justify-center rounded-[20px]"
              style={{
                backgroundColor: v.theme === 'light' ? '#F3F4F6' : '#1A1B23',
                border: `1px solid ${hairline}`,
              }}
              dir={v.dir}
            >
              <button
                className="rounded-full px-6 py-3 text-sm font-medium"
                style={{
                  backgroundColor: v.theme === 'light' ? purple : mint,
                  color: v.theme === 'light' ? '#FDFDFD' : '#151323',
                  fontFamily: v.dir === 'rtl' ? "'Tajawal', 'Inter', sans-serif" : "'Inter', sans-serif",
                }}
              >
                {v.text}
              </button>
            </div>
            <p className="mt-3 text-center font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
              {v.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function AiSection() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>{aiSection.eyebrow}</Eyebrow>
        <Heading lines={aiSection.headline} />
        <p className="mt-6 max-w-[50ch] text-base leading-relaxed" style={{ color: muted }}>
          {aiSection.body}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <Reveal delay={60}>
          <ol className="space-y-4">
            {aiSection.principles.map((p, i) => (
              <li key={p} className="flex items-baseline gap-4">
                <span className="font-pixel text-[11px]" style={{ color: mint }}>
                  0{i + 1}
                </span>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[14px] p-5" style={{ backgroundColor: surface, border: `1px solid ${hairline}` }}>
            <p className="font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
              Design decision
            </p>
            <p className="mt-2 text-base">{aiSection.decision.title}</p>
            <div className="mt-4 space-y-2 border-t pt-4" style={{ borderColor: hairline }}>
              {aiSection.decision.fields.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-sm">
                  <span style={{ color: faint }}>{f.label}</span>
                  <span>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[14px] p-5 font-pixel text-[12px] leading-relaxed" style={{ backgroundColor: raised, border: `1px solid ${hairline}`, color: mint }}>
            {aiSection.interpretation.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function Evolution() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>{evolution.eyebrow}</Eyebrow>
        <Heading lines={evolution.headline} />
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed" style={{ color: muted }}>
          {evolution.body}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 sm:grid-cols-3">
        {evolution.columns.map((col, i) => (
          <Reveal key={col.label} delay={60 + i * 60}>
            <p className="font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: i < 2 ? mint : faint }}>
              {col.label}
            </p>
            <ul className="mt-4 space-y-3 border-t pt-4" style={{ borderColor: hairline }}>
              {col.items.map((item) => (
                <li key={item} className="text-sm" style={{ color: text }}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Proof() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>{proof.eyebrow}</Eyebrow>
        <Heading lines={proof.headline} />
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed" style={{ color: muted }}>
          {proof.question}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-12 rounded-[14px] p-6 sm:p-8" style={{ backgroundColor: surface, border: `1px solid ${hairline}` }}>
          <p className="font-pixel text-[10px] uppercase tracking-[0.14em]" style={{ color: faint }}>
            {proof.testName}
          </p>
          <p className="mt-2 max-w-[48ch] text-lg" style={{ color: mint }}>
            {proof.testQuestion}
          </p>

          <ul className="mt-8 space-y-4 border-t pt-6" style={{ borderColor: hairline }}>
            {proof.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: text }}>
                <span className="mt-0.5 shrink-0" style={{ color: mint }}>
                  ✓
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

function Closing() {
  return (
    <Section className="pb-24">
      <Reveal>
        <p className="max-w-2xl text-balance font-fraunces text-3xl font-light italic leading-snug sm:text-4xl">
          {closing.statement[0]}
          <br />
          {closing.statement[1]}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-8 max-w-[52ch] text-base leading-relaxed" style={{ color: muted }}>
          {closing.body}
        </p>
      </Reveal>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-10" style={{ borderTop: `1px solid ${hairline}` }}>
      <div className="mx-auto max-w-[900px]">
        <Link href="/#work" className="font-pixel text-[11px]" style={{ color: faint }}>
          ← Back to portfolio
        </Link>
      </div>
    </footer>
  )
}
