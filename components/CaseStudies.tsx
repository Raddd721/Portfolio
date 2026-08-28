import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { projects, type Project } from '../app/content'

// Cycled per card — soft washes over the same warm paper tone used
// elsewhere on the site, standing in for cover photography.
const CARD_TONES = [
  'linear-gradient(135deg, #f2ede4 0%, rgba(229,178,93,0.22) 100%)', // sand
  'linear-gradient(135deg, #f2ede4 0%, rgba(143,174,122,0.22) 100%)', // sage
  'linear-gradient(135deg, #f2ede4 0%, rgba(217,138,124,0.22) 100%)', // blush
  'linear-gradient(135deg, #f2ede4 0%, rgba(194,65,12,0.16) 100%)', // accent
  'linear-gradient(135deg, #f2ede4 0%, rgba(203,178,138,0.28) 100%)', // cork
]

/** Splits a `**bold**`-marked blurb into plain/emphasised segments — the emphasised phrase gets the site's "highlight a specific meaning" treatment: Fraunces italic. */
function renderBlurb(blurb: string) {
  return blurb.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-fraunces font-medium italic text-ink">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function CaseStudies() {
  return (
    <section id="work" className="scroll-mt-24 pb-20 pt-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mb-10 flex items-baseline justify-between">
          <h2 className="font-pixel text-2xl tracking-tight text-ink">Case Studies</h2>
          <span className="tag">{projects.length} projects</span>
        </Reveal>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 60}>
              <CaseStudyCard project={project} tone={CARD_TONES[i % CARD_TONES.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudyCard({ project, tone }: { project: Project; tone: string }) {
  return (
    <Link href={project.href} className="group block">
      <div
        className="relative aspect-[620/380] overflow-hidden rounded-[24px] border border-line/60 transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-24px_rgba(26,26,23,0.35)]"
        style={project.cover ? undefined : { background: tone }}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-fraunces text-[9rem] italic text-ink/[0.06]"
          >
            {project.title.charAt(0)}
          </span>
        )}

        <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink shadow-[0_8px_20px_-6px_rgba(26,26,23,0.35)] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M7 17 17 7M17 7H9M17 7v8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h3 className="mt-5 font-pixel text-xl tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted sm:text-base">
        {renderBlurb(project.blurb)}
      </p>
    </Link>
  )
}
