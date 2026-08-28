// Copy and data for the Modrek Design System case study.
// All tokens, colors, component states, and copy below are sourced from the
// real Modrek Design System project (repo root: modrek-design-system —
// app/globals.css, tailwind.config.js, modrek-tokens.json, components/Button/Button.tsx,
// app/components/button/page.tsx) — not invented for this page.

export const meta = {
  role: 'Product Designer',
  scope: 'Design System',
  platforms: 'Web + Mobile',
  languages: 'English + Arabic',
  themes: 'Light + Dark',
  status: 'Evolving',
  tags: ['Tokens', 'Components', 'Responsive', 'Light / Dark', 'LTR / RTL', 'AI-ready'],
}

export const hero = {
  headline: ['One product.', 'Four experiences.', 'One source of truth.'],
  italicLine: 1,
  paragraph:
    'MODREK needed a scalable design language that could support multiple product experiences while remaining consistent across platforms, themes and languages.',
}

export const context = {
  eyebrow: '00 / THE PROBLEM',
  headline: ['A retail investing product', 'for first-time investors in Saudi Arabia.'],
  italicLine: 1,
  tagline: 'Modrek — Investing Made Smart.',
  intro:
    'Modrek is a retail investment product for beginner investors in Saudi Arabia — available as a responsive web app and a native mobile app, each supporting English and Arabic, LTR and RTL, light and dark.',
  question: 'How do we design one system flexible enough for every surface, language and theme — without slowing the team down?',
  answer:
    "Designing every combination by hand wasn't sustainable in a reasonable amount of time. I needed a system that could scale and adapt quickly for both designers and developers — and one structured enough to work well with AI agents, which is how the team generates and brainstorms most new feature ideas.",
}

export const foundation = {
  eyebrow: '01 / FOUNDATION',
  headline: ['Systemizing', 'the design language.'],
  primitives: ['Color', 'Typography', 'Spacing', 'Grid', 'Radius', 'Elevation', 'Components'],
  body: 'Instead of designing each experience independently, the visual language was broken down into reusable rules and relationships.',
  tokens: [
    'color.ink',
    'color.surface',
    'color.text',
    'color.accent',
    'spacing.4  →  16px',
    'spacing.8  →  32px',
    'radius.md  →  20px',
  ],
  atomicDesign: {
    label: 'How the system is structured',
    note: 'Atomic design — every screen is built by composing up, not designing down.',
    levels: [
      {
        label: 'Atoms',
        items: ['Colors', 'Grids', 'Icons', 'Typography', 'Drop shadows', 'Illustrations and icon assets'],
      },
      { label: 'Molecules', items: ['Buttons', 'Input', 'Tags', 'Checkboxes & toggles', 'Dropdown', 'Date picker', 'Tabbars', 'Tables'] },
      { label: 'Organisms', items: ['Cards', 'Navigation', 'Charts'] },
      { label: 'Templates', items: ['Portfolio', 'Stock screener', 'Market snapshot', 'News'] },
    ],
  },
}

export const rules = {
  eyebrow: '02 / RULES',
  headline: ['Start with', 'the rules.'],
  body: 'Before components, the system needed a consistent foundation.',
  colors: [
    { label: 'Primary', light: '#7C3FFE', dark: '#24FF91' },
    { label: 'Text', light: '#313445', dark: '#FDFDFD' },
    { label: 'Text secondary', light: '#69748C', dark: '#B5BBC7' },
    { label: 'Background', light: '#F3F4F6', dark: '#1A1B23' },
    { label: 'Background subtle', light: '#EBEDF0', dark: '#252630' },
    { label: 'Border strong', light: '#969FB0', dark: '#69748C' },
  ],
  type: [
    { label: 'Display', labelAr: 'معاينة', size: '26px', weight: '700', lineHeight: '110%' },
    { label: 'Section title', labelAr: 'تعديل', size: '19px', weight: '600', lineHeight: '130%' },
    { label: 'Card headline', labelAr: 'حفظ', size: '15px', weight: '600', lineHeight: '130%' },
    { label: 'Body', labelAr: 'مقارنة', size: '13px', weight: '400', lineHeight: '145%' },
    { label: 'Caption', labelAr: 'إلغاء', size: '11px', weight: '400', lineHeight: '145%' },
  ],
  fluidType: {
    formula: 'clamp(13px, 1rem + 0.25vw, 20px)',
    note: 'Bumps to 20px at 2K and 24px at 4K displays. All type tokens are defined in em, so they scale with the root.',
    classes: ['text-h1', 'text-body', 'text-label', '.nums'],
    rtlNote: "RTL pages only need dir='rtl' — line-height adjusts automatically.",
  },
  spacing: [4, 8, 12, 16, 20, 24, 32],
  radius: [
    { label: 'sm', value: 14 },
    { label: 'md', value: 20 },
    { label: 'lg', value: 26 },
    { label: 'pill', value: 999 },
  ],
  rtlExample: {
    ltr: { label: 'English / LTR', text: 'Continue', font: "'Inter', -apple-system, sans-serif" },
    rtl: { label: 'Arabic / RTL', text: 'متابعة', font: "'Tajawal', 'Inter', sans-serif" },
  },
}

export const componentsSection = {
  eyebrow: '03 / COMPONENTS',
  headline: ['Built once.', 'Reused everywhere.'],
  body: 'Individual design decisions were translated into reusable components, variants and states.',
  blocks: [
    { label: 'Component', detail: 'Button' },
    { label: 'Variants', detail: 'Primary · Secondary · Tertiary · Inline' },
    { label: 'States', detail: 'Default · Hover · Active · Disabled' },
    { label: 'Responsive', detail: 'sm 36px · md 48px · lg 56px' },
  ],
  states: ['Default', 'Hover', 'Active', 'Disabled'],
  themeNote:
    'The primary button token switches from purple in light mode to bright green in dark mode — the same component, the same variant, a different value for --color-primary-default.',
}

export const application = {
  eyebrow: '04 / APPLICATION',
  headline: ['One system.', 'Four experiences.'],
  body: 'The system was designed to remain consistent while adapting across different product contexts.',
  variants: [
    { label: 'LIGHT / LTR', theme: 'light' as const, dir: 'ltr' as const, text: 'Continue' },
    { label: 'DARK / LTR', theme: 'dark' as const, dir: 'ltr' as const, text: 'Continue' },
    { label: 'LIGHT / RTL', theme: 'light' as const, dir: 'rtl' as const, text: 'متابعة' },
    { label: 'DARK / RTL', theme: 'dark' as const, dir: 'rtl' as const, text: 'متابعة' },
  ],
}

export const aiSection = {
  eyebrow: '05 / AI',
  headline: ['Making design decisions', 'understandable to AI.'],
  body: "A systemized design language doesn't only help designers and developers. Clear tokens, naming, relationships and reusable components also make the product easier for AI-assisted design workflows to understand — which mattered here specifically, since AI is already how the team generates and brainstorms most new feature ideas. A system it can actually parse is a system that keeps up.",
  principles: [
    'Semantic tokens',
    'Consistent naming',
    'Component variants',
    'Explicit states',
    'Theme relationships',
    'RTL / LTR rules',
    'Spacing relationships',
    'Typography hierarchy',
  ],
  decision: {
    title: 'Button / Primary',
    fields: [
      { label: 'Component', value: 'Button' },
      { label: 'Variant', value: 'Primary' },
      { label: 'State', value: 'Default' },
      { label: 'Theme', value: 'Dark' },
      { label: 'Direction', value: 'LTR' },
    ],
  },
  interpretation: [
    'Use the primary button component.',
    'Preserve semantic color token — --color-primary-default.',
    'Maintain spacing scale — spacing.4 (16px).',
    'Use the Arabic font family (Tajawal) when direction = RTL.',
  ],
}

export const evolution = {
  eyebrow: '06 / EVOLUTION',
  headline: ['An evolving', 'system.'],
  body: 'The system is not treated as a finished library. It is a framework that can evolve as MODREK, its products and its users evolve.',
  columns: [
    {
      label: 'Built',
      items: ['Tokens', 'Typography scale', 'Color system', 'Button component', 'Light / Dark themes', 'RTL / LTR foundations'],
    },
    {
      label: 'Evolving',
      items: ['Dashboard patterns', 'Data visualization (Sparkline)', 'Additional interaction states', 'Building the design system on GitHub'],
    },
    {
      label: 'Next',
      items: ['More component coverage', 'More documented patterns', 'Stronger AI-readable metadata', 'More automated consistency'],
    },
  ],
}

export const proof = {
  eyebrow: '07 / PROOF',
  headline: ['The library', 'test.'],
  question: 'How do I know my system is usable?',
  testName: 'LIBRARY TEST —',
  testQuestion: 'Can I actually design a new feature with ZERO custom components?',
  rules: [
    'Create a fake new feature flow inside a SEPARATE file',
    'Use ONLY components from your DS library',
    "Do not cheat — if something is missing, LIST IT, don't improvise",
    'If you can design 80%+ of the screen using existing components → system is working',
    'If you hit too many edge-case hacks → system is not ready yet',
  ],
}

export const closing = {
  statement: ["I wasn't building a library of UI.", 'I was building a shared language.'],
  body: 'A system that can support multiple experiences, scale with the product, and make design decisions easier to understand — for people and increasingly for AI-assisted workflows.',
}
