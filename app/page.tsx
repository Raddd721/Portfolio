import ScrapbookHero from '../components/hero/ScrapbookHero'
import CaseStudies from '../components/CaseStudies'
import Reveal from '../components/Reveal'
import PlayingIcon from '../components/PlayingIcon'
import SocialPreview from '../components/SocialPreview'
import { about, nav, playing, site, socials } from './content'

export default function Home() {
  return (
    <div id="top" className="relative">
      {/* faint grain / vignette backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.5]"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.6), transparent 55%), radial-gradient(100% 60% at 50% 120%, rgba(0,0,0,0.04), transparent 60%)',
        }}
      />

      <ScrapbookHero />

      <div className="mx-auto max-w-[1200px] px-6">
        <Divider />
      </div>

      <CaseStudies />

      <main className="mx-auto max-w-content px-6">
        {/* ── About ────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-24 py-20">
          <div className="grid gap-10 sm:grid-cols-[140px_1fr]">
            <Reveal>
              <h2 className="font-pixel text-sm uppercase tracking-[0.1em] text-muted">About</h2>
            </Reveal>
            <div className="space-y-6">
              {about.map((para, i) => (
                <Reveal as="p" key={i} delay={i * 80} className="text-lg leading-relaxed text-ink">
                  {para}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Currently playing ────────────────────────────── */}
        <section id="playing" className="scroll-mt-24 py-20">
          <Reveal className="mb-10">
            <h2 className="font-pixel text-sm uppercase tracking-[0.1em] text-muted">What&apos;s on my mind</h2>
          </Reveal>

          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {playing.map((item, i) => (
              <Reveal key={item.label} delay={i * 70} className="bg-paper p-6">
                <PlayingIcon name={item.icon} />
                <dt className="tag mb-2 mt-3">{item.label}</dt>
                <dd className="text-lg text-ink">{item.value}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* ── Contact ──────────────────────────────────────── */}
        <section id="contact" className="scroll-mt-24 py-24">
          <Reveal>
            <p className="tag mb-6">Contact</p>
            <h2 className="max-w-xl text-balance font-pixel text-3xl leading-tight tracking-[-0.01em] sm:text-5xl">
              Have something you&rsquo;d like to build?{' '}
              <a
                href={socials[0].href}
                className="font-fraunces italic text-accent underline decoration-1 underline-offset-[6px] hover:decoration-2"
              >
                Let&rsquo;s talk
              </a>
              .
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {socials.map((s) => {
                const preview = 'preview' in s ? s.preview : undefined
                return (
                  <li key={s.label} className={preview ? 'group relative' : undefined}>
                    <a href={s.href} className="link font-mono text-sm">
                      {s.label} ↗
                    </a>
                    {preview && (
                      <SocialPreview
                        platform={preview.platform}
                        name={preview.name}
                        role={preview.role}
                        handle={preview.handle}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">
            © {site.year} {site.name} · {site.os}
          </p>
          <nav className="flex gap-5">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="tag hover:text-accent transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="font-mono text-[11px] text-faint">
            Built with Next.js &amp; Tailwind
          </p>
        </div>
      </footer>
    </div>
  )
}

function Divider() {
  return (
    <div aria-hidden className="flex items-center gap-3 py-2">
      <span className="h-px flex-1 bg-line" />
      <span className="font-mono text-[10px] text-faint">✦</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
