// ─────────────────────────────────────────────────────────────
// All editable copy lives here. Swap these values to make the
// portfolio your own — the components read straight from this file.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Radwa',
  os: 'radwaOS',
  role: 'Product Designer',
  location: 'Riyadh, SA',
  year: '2026',
  experienceYears: 7,
  intro:
    'I design and build calm, considered interfaces — the kind that get out of your way. Currently shaping product at a small studio, previously wandering between design systems and the occasional side project that got out of hand.',
}

// The raw PDF file — used by the /resume page's viewer and download button.
export const resumeHref = '/resume/radwa-osama-product-designer.pdf'

// The in-site resume page — both the nav's "Resume" item and the hero
// bookshelf's pull-out bookmark point here, so it opens as a page on the
// site (with a download option) rather than the raw file directly.
export const resumePageHref = '/resume'

// Words the hero headline types out, one after another.
export const heroWords = ['taste.', 'restraint.', 'systems.', 'quiet care.']

// Draggable desktop icons in the hero, echoing martOS.
export const desktopIcons = [
  { key: 'work', label: 'selected work', href: '#work', glyph: 'folder', left: '58%', top: '58%' },
  { key: 'me', label: 'me', href: '#about', glyph: 'monogram', left: '80%', top: '10%' },
  { key: 'playing', label: 'currently playing', href: '#playing', glyph: 'music', left: '68%', top: '30%' },
  { key: 'contact', label: 'say hi', href: '#contact', glyph: 'mail', left: '84%', top: '54%' },
] as const

export const nav = [
  { label: 'work', href: '#work' },
  { label: 'about', href: '#about' },
  { label: 'playing', href: '#playing' },
  { label: 'contact', href: '#contact' },
]

export type Project = {
  title: string
  blurb: string
  role: string
  year: string
  href: string
  /** cover image, shown in place of the default tone/initial card face */
  cover?: string
}

export const projects: Project[] = [
  {
    title: 'Go Social',
    blurb: 'Designing the social layer for **cafés, gyms and neighbourhoods**.',
    role: 'Product Design',
    year: '2023',
    href: '/work/go-social',
    cover: '/case-studies/go-social.png',
  },
  {
    title: 'Modrek Design System',
    blurb: 'One design language across **light, dark, LTR and RTL**.',
    role: 'Design Systems',
    year: '2025',
    href: '/work/modrek-design-system',
    cover: '/case-studies/modrek-cover.jpg',
  },
]

export const about = [
  'I like understanding why people behave the way they do, finding structure behind messy problems, and translating that into flows and visual experiences.',
  "I'm especially interested in interaction, AI-assisted design, immersive experiences and the ways technology can create more human forms of connection.",
  "Outside of the screen, I'm usually looking for the same thing: new places, new people, new perspectives. I travel, draw, read, observe, and collect things.",
]

export const playing = [
  { label: 'Reading', value: 'The Art of War — Sun Tzu', icon: 'book' as const },
  { label: 'Listening', value: 'TED Talks', icon: 'waveform' as const },
  { label: 'Writing', value: 'Fantasy Story', icon: 'sketch' as const },
  { label: 'Exploring', value: 'Product strategy', icon: 'diagram' as const },
]

export const socials = [
  { label: 'Email', href: 'mailto:radwa98@hotmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/radwa-osama',
    preview: { platform: 'linkedin' as const, name: 'Radwa Osama', role: site.role, handle: 'linkedin.com/in/radwa-osama' },
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/radwa98a0a3',
    preview: { platform: 'behance' as const, name: 'Radwa Osama', role: site.role, handle: 'behance.net/radwa98a0a3' },
  },
]
