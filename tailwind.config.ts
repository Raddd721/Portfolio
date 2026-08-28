import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4f1ea',
        ink: '#1a1a17',
        muted: '#6b675e',
        faint: '#a7a293',
        line: '#dcd7cb',
        accent: '#c2410c',
        sage: '#8fae7a',
        sand: '#e5b25d',
        blush: '#d98a7c',
        cork: '#cbb28a',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        hand: ['var(--font-hand)', 'cursive'],
        // Site-wide type system (everything outside the hero): Departure
        // Mono for headers, Fraunces italic reserved for highlighting a
        // specific meaning within them, Helvetica Neue for body copy.
        pixel: ['var(--font-pixel)', 'ui-monospace', 'monospace'],
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '760px',
      },
    },
  },
  plugins: [],
}

export default config
