import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../Reveal'
import PhoneFrame from './PhoneFrame'
import GoSocialBackLink from './GoSocialBackLink'
import {
  meta,
  hero,
  vision,
  visionContext,
  problemIntro,
  problems,
  myRole,
  decisionsIntro,
  decisions,
  research,
  persona,
  structure,
  createFeature,
  outcome,
  metrics,
  retrospective,
} from './goSocialContent'

const toneClass: Record<string, string> = {
  sage: 'text-sage',
  accent: 'text-accent',
  ink: 'text-ink',
  blush: 'text-blush',
}

/**
 * A long-form case study page — same site-wide type system as everywhere
 * else (Departure Mono headers, Fraunces italic for the meaningful bits,
 * Manrope body copy), just with its own dark opening.
 */
export default function GoSocialCaseStudy() {
  return (
    <div>
      <Hero />

      <main className="mx-auto max-w-[1000px] px-6">
        <Problem />
        <Vision />
        <MyRole />
        <Research />
        <Structure />
        <Decisions />
        <Outcome />
        <Create />
        <Metrics />
        <Retrospective />
      </main>

      <Footer />
    </div>
  )
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
      {n} / {label}
    </p>
  )
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`py-16 sm:py-20 ${className}`}>{children}</section>
}

/** A numbered badge + text row, used to annotate a screen the way a senior designer would talk through it. */
function Annotations({ items }: { items: { n: number; text: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((a) => (
        <li key={a.n} className="flex gap-3 text-sm leading-relaxed text-ink">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[10px] text-paper">
            {a.n}
          </span>
          {a.text}
        </li>
      ))}
    </ul>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1000px] px-6 py-16 sm:py-24">
        <div className="mb-10 flex items-center justify-between">
          <GoSocialBackLink />
          <p className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:block">
            GoSocial · Case study · {meta.year}
          </p>
        </div>

        <Reveal>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{hero.sectionLabel}</p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="max-w-3xl text-balance font-pixel text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            {hero.headline[0]}
            <span className="font-fraunces italic text-accent">{hero.headline[1]}</span>
            {hero.headline[2]}
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-6 max-w-[52ch] text-balance text-lg leading-relaxed text-faint">{hero.paragraph}</p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
            {hero.qa.map((item) => (
              <div key={item.q}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper">{item.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-14 overflow-hidden rounded-2xl">
            <Image
              src="/case-studies/go-social/feed-map.jpg"
              alt="Map of Madinty with activity pins — someone wants to play tennis, someone shared a thought, someone nearby is selling something"
              width={1400}
              height={728}
              className="h-auto w-full"
              priority
            />
          </div>
          <p className="mt-6 text-right font-pixel text-xl text-paper sm:text-2xl">{hero.feedCaption}</p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{meta.tags.join('  /  ')}</p>
            <div className="flex gap-8">
              <MetaStat label="Role" value={meta.role} />
              <MetaStat label="Timeline" value={meta.timeline} />
              <MetaStat label="Team" value={meta.team} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{label}</p>
      <p className="mt-1 font-semibold text-paper">{value}</p>
    </div>
  )
}

function Vision() {
  return (
    <Section>
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">03 / Vision</p>
        <h2 className="max-w-3xl text-balance font-fraunces text-2xl italic leading-snug text-accent sm:text-4xl">{vision}</h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">{visionContext}</p>
      </Reveal>
    </Section>
  )
}

function Problem() {
  return (
    <Section className="border-t border-line">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{problemIntro.label}</p>
        <h2 className="max-w-3xl text-balance font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {problemIntro.headline}
        </h2>
      </Reveal>

      <Reveal delay={60}>
        <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">{problemIntro.paragraph}</p>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={100 + i * 70} className="bg-paper p-6">
            <p className="mb-4 font-mono text-sm text-accent">0{i + 1}</p>
            <h3 className="font-semibold leading-snug text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function MyRole() {
  return (
    <Section className="border-t border-line">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{myRole.label}</p>
        <h2 className="max-w-3xl text-balance font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {myRole.headline}
        </h2>
      </Reveal>

      <Reveal delay={60}>
        <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">{myRole.paragraph}</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {myRole.disciplines.map((d, i) => (
            <div key={d.label} className="flex min-h-[100px] items-center gap-4 bg-paper p-5">
              <p className={`font-mono text-xs ${d.highlight ? 'text-accent' : 'text-faint'}`}>0{i + 1}</p>
              <p className="font-pixel text-base leading-tight text-ink sm:text-lg">{d.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

function Decisions() {
  return (
    <Section className="border-t border-line">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{decisionsIntro.label}</p>
        <h2 className="max-w-3xl text-balance font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {decisionsIntro.headline}
        </h2>
      </Reveal>

      <Reveal delay={60}>
        <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">{decisionsIntro.paragraph}</p>
      </Reveal>

      <div className="mt-16 space-y-24">
        {decisions.map((d, i) => (
          <DecisionBlock key={d.n} decision={d} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  )
}

const VISIBILITY_OPTIONS = [
  { emoji: '🌍', title: 'Everyone', body: 'All users can see this', selected: false },
  { emoji: '👩', title: 'Women only', body: 'Only women can discover it', selected: true },
  { emoji: '👨', title: 'Men only', body: 'Only men can discover it', selected: false },
]

/** A coded mockup (not a real screenshot) illustrating the gender-based visibility concept for Decision 01. */
function VisibilityMock({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[32px] border-[7px] border-ink bg-ink shadow-[0_20px_40px_-16px_rgba(26,26,23,0.4)] ${className}`}>
      <div className="flex aspect-[640/1387] flex-col overflow-hidden rounded-[25px] bg-white p-5">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 text-xs text-ink">‹</span>
          <p className="text-sm font-semibold text-ink">Visibility</p>
        </div>

        <p className="mt-4 text-lg font-bold leading-snug text-ink">Who can discover this?</p>
        <p className="mt-1 text-xs text-muted">Choose your audience</p>

        <div className="mt-4 space-y-2">
          {VISIBILITY_OPTIONS.map((opt) => (
            <div
              key={opt.title}
              className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${opt.selected ? 'border-accent bg-accent/10' : 'border-black/10'}`}
            >
              <span className="text-lg">{opt.emoji}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-ink">{opt.title}</p>
                <p className="text-[10px] leading-snug text-muted">{opt.body}</p>
              </div>
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${opt.selected ? 'border-accent' : 'border-black/20'}`}>
                {opt.selected && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-full bg-accent py-2.5 text-center text-xs font-semibold text-white">Save</div>
      </div>
    </div>
  )
}

function DecisionBlock({ decision, reverse }: { decision: (typeof decisions)[number]; reverse: boolean }) {
  const hasUi = decision.ui.length > 0

  return (
    <Reveal>
      <div className={hasUi ? 'grid gap-10 sm:grid-cols-2 sm:items-center' : ''}>
        <div className={hasUi && reverse ? 'sm:order-2' : !hasUi ? 'max-w-2xl' : ''}>
          <p className="font-mono text-sm text-accent">Decision {decision.n}</p>
          <h3 className="mt-2 text-balance font-pixel text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
            {decision.question}
          </h3>

          <div className="mt-8 space-y-5 border-l-2 border-line pl-5">
            <FlowItem label="Problem" text={decision.problem} />
            {decision.thinking && <FlowItem label="Thinking" text={decision.thinking} />}
            <FlowItem label="Solution" text={decision.solution} tone="accent" />
          </div>
        </div>

        {hasUi && (
          <div className={`flex flex-wrap items-end justify-center gap-4 ${reverse ? 'sm:order-1' : ''}`}>
            {decision.ui.map((shot, i) => {
              const sizeClass =
                decision.ui.length === 1
                  ? 'w-full max-w-[220px]'
                  : decision.ui.length === 2
                    ? 'w-[45%] min-w-[130px] max-w-[190px]'
                    : 'w-[30%] min-w-[105px] max-w-[150px]'
              if ('mock' in shot) {
                return <VisibilityMock key={`mock-${i}`} className={sizeClass} />
              }
              return <PhoneFrame key={shot.src} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} className={sizeClass} />
            })}
          </div>
        )}
      </div>
    </Reveal>
  )
}

function FlowItem({ label, text, tone = 'faint' }: { label: string; text: string; tone?: 'faint' | 'accent' }) {
  return (
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${tone === 'accent' ? 'text-accent' : 'text-faint'}`}>{label}</p>
      <p className={`mt-1.5 text-sm leading-relaxed ${tone === 'accent' ? 'text-ink' : 'text-muted'}`}>{text}</p>
    </div>
  )
}

function Outcome() {
  return (
    <Section className="border-t border-line">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{outcome.label}</p>
        <h2 className="max-w-3xl text-balance font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {outcome.headline}
        </h2>
      </Reveal>

      <Reveal delay={60}>
        <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">{outcome.paragraph}</p>
      </Reveal>

      <div className="mt-16 space-y-20">
        {outcome.journeys.map((j) => (
          <JourneyBlock key={j.title} journey={j} />
        ))}
      </div>
    </Section>
  )
}

/** A hero shot of the AR layer, then the two-step reply flow that happens inside it — a small narrative instead of a flat gallery. */
const MOMENT_HERO_SIZE = 'w-[190px]'
const MOMENT_SECONDARY_SIZE = 'w-[120px]'

function ArLayerNarrative({ ui }: { ui: (typeof decisions)[number]['ui'] }) {
  const [layer, replyA, replyB] = ui
  if (!layer || !replyA || !replyB || 'mock' in layer || 'mock' in replyA || 'mock' in replyB) return null
  return (
    <div className="flex flex-col items-center gap-3">
      <PhoneFrame src={layer.src} alt={layer.alt} width={layer.width} height={layer.height} className={MOMENT_HERO_SIZE} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Then, right there</p>
      <div className="flex items-center gap-2">
        <PhoneFrame src={replyA.src} alt={replyA.alt} width={replyA.width} height={replyA.height} className={MOMENT_SECONDARY_SIZE} />
        <span className="text-lg text-faint">→</span>
        <PhoneFrame src={replyB.src} alt={replyB.alt} width={replyB.width} height={replyB.height} className={MOMENT_SECONDARY_SIZE} />
      </div>
    </div>
  )
}

function JourneyBlock({ journey }: { journey: (typeof outcome.journeys)[number] }) {
  return (
    <Reveal>
      <h3 className="font-pixel text-xl tracking-tight text-ink sm:text-2xl">{journey.title}</h3>

      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
        {journey.steps.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            {s}
            {i < journey.steps.length - 1 && <span className="text-accent">→</span>}
          </span>
        ))}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-10">
        {journey.moments.map((m) =>
          'layout' in m && m.layout === 'narrative' ? (
            <div key={m.caption} className="flex flex-col items-center">
              <ArLayerNarrative ui={m.ui} />
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{m.caption}</p>
            </div>
          ) : (
            <div key={m.caption} className="flex flex-col items-center">
              <div className="flex flex-1 items-end gap-2">
                {m.ui.map((shot) => (
                  <PhoneFrame
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className={m.ui.length > 1 ? MOMENT_SECONDARY_SIZE : MOMENT_HERO_SIZE}
                  />
                ))}
              </div>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{m.caption}</p>
            </div>
          ),
        )}
      </div>
    </Reveal>
  )
}

function Research() {
  return (
    <Section className="border-t border-line">
      <Reveal>
        <SectionLabel n="05" label="Research & synthesis" />
        <h2 className="font-pixel text-3xl tracking-tight text-ink sm:text-4xl">What I actually did before designing anything</h2>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-8 grid gap-6 rounded-xl border border-line bg-white/40 p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Method</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{research.method}</p>
          </div>
          <div className="sm:border-l sm:border-line sm:pl-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Participants</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{research.participants}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <p className="mb-4 mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Affinity clusters</p>
        <div className="flex flex-wrap gap-3">
          {research.clusters.map((c) => (
            <span
              key={c.label}
              className="rounded-full border border-accent/40 bg-accent/5 px-4 py-2 font-mono text-[11px] text-ink"
            >
              {c.label} <span className="text-faint">· {c.detail}</span>
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-line bg-white/40 p-6 sm:flex-row sm:items-center sm:p-8">
          <Image
            src="/case-studies/go-social/persona-hana.jpg"
            alt={persona.name}
            width={100}
            height={100}
            className="h-16 w-16 shrink-0 rounded-lg object-cover"
          />
          <div>
            <p className="font-semibold text-ink">
              {persona.name} <span className="font-mono text-[11px] font-normal text-faint">· {persona.role}</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{research.personaNote}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function Structure() {
  return (
    <Section className="border-t border-line">
      <Reveal>
        <SectionLabel n="06" label="Information architecture" />
        <h2 className="font-pixel text-3xl tracking-tight text-ink sm:text-4xl">How the product is structured</h2>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 rounded-xl border border-line bg-white/40 p-6 sm:p-8">
          <div className="mb-8 flex justify-center">
            <span className="rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              GoSocial
            </span>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {structure.columns.map((col) => (
              <div key={col.label} className="bg-paper p-5">
                <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${toneClass[col.tone]}`}>{col.label}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                  {col.principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function FeatureMeta({ problem, goal, constraints }: { problem: string; goal: string; constraints: string[] }) {
  return (
    <div className="mt-8 grid gap-6 rounded-xl border border-line bg-white/40 p-6 sm:grid-cols-3 sm:p-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Problem</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink">{problem}</p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Goal</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink">{goal}</p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Constraints</p>
        <ul className="mt-1.5 space-y-1">
          {constraints.map((c) => (
            <li key={c} className="text-sm leading-relaxed text-muted">
              — {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Alternatives({ items, why }: { items: { name: string; verdict: string; note: string }[]; why: string }) {
  return (
    <div className="mt-8">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Alternatives explored</p>
      <div className="overflow-hidden rounded-xl border border-line">
        <table className="w-full border-collapse text-left text-sm">
          <tbody className="divide-y divide-line">
            {items.map((a) => (
              <tr key={a.name} className="bg-paper">
                <td className="w-1/4 p-4 font-medium text-ink">{a.name}</td>
                <td className="w-1/6 p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${
                      a.verdict === 'Chosen' ? 'bg-accent text-paper' : 'border border-line text-faint'
                    }`}
                  >
                    {a.verdict}
                  </span>
                </td>
                <td className="p-4 text-muted">{a.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-ink">{why}</p>
    </div>
  )
}

function Create() {
  const f = createFeature
  return (
    <Section className="border-t border-line">
      <Reveal>
        <SectionLabel n="09" label={f.label} />
        <h2 className="font-pixel text-3xl tracking-tight text-ink sm:text-4xl">
          If it doesn&rsquo;t exist, <span className="font-fraunces italic text-accent">start it.</span>
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.body}</p>
      </Reveal>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <Reveal delay={140}>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Every Buzz is written as a sentence</p>
          <p className="flex flex-wrap items-center gap-2 font-fraunces text-lg italic text-ink sm:text-2xl">
            {f.sentence.verb}
            <span className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-base sm:text-xl">{f.sentence.activity}</span>
            in
            <span className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-base sm:text-xl">{f.sentence.place}</span>
            at
            <span className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-base sm:text-xl">{f.sentence.time}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {f.steps.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                    i === 0 ? 'border-accent text-accent' : 'border-line text-muted'
                  }`}
                >
                  0{i + 1} {s}
                </span>
                {i < f.steps.length - 1 && <span className="text-faint">·</span>}
              </span>
            ))}
          </div>

          <p className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Annotations</p>
          <Annotations items={f.annotations} />
        </Reveal>

        <Reveal delay={180}>
          <PhoneFrame
            src="/case-studies/go-social/screen-create-buzz.jpg"
            alt="Create a Buzz form: category, sentence builder, participants and details"
            width={640}
            height={1660}
            className="mx-auto max-w-[260px]"
          />
        </Reveal>
      </div>
    </Section>
  )
}

function Metrics() {
  return (
    <Section className="border-t border-line">
      <Reveal>
        <SectionLabel n="10" label="Metrics" />
        <h2 className="font-pixel text-3xl tracking-tight text-ink sm:text-4xl">How success gets measured</h2>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/10 p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">North star metric</p>
          <p className="mt-2 font-pixel text-2xl text-ink">{metrics.northStar.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{metrics.northStar.body}</p>
        </div>
      </Reveal>

    </Section>
  )
}

function Retrospective() {
  return (
    <Section className="border-t border-line pb-24">
      <Reveal>
        <SectionLabel n="11" label="Retrospective" />
        <h2 className="font-pixel text-3xl tracking-tight text-ink sm:text-4xl">What I&rsquo;d do differently</h2>
      </Reveal>

      <Reveal delay={80}>
        <p className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Lessons learned</p>
        <ul className="space-y-4 rounded-xl border border-line bg-white/40 p-6 sm:p-8">
          {retrospective.lessons.map((line) => (
            <li key={line} className="flex gap-3 leading-relaxed text-ink">
              <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
              {line}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        <Reveal delay={160} className="bg-paper p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">How I&rsquo;d ship an MVP</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{retrospective.mvpScoping}</p>
        </Reveal>
        <Reveal delay={200} className="bg-paper p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">How my thinking shifted</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{retrospective.thinkingShift}</p>
        </Reveal>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/#work" className="link font-mono text-sm">
          ← Back to portfolio
        </Link>
        <p className="font-mono text-[11px] text-faint">GoSocial · Case study · {meta.year}</p>
      </div>
    </footer>
  )
}
