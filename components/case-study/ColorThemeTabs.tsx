'use client'

import { useState } from 'react'

const hairline = 'rgba(255,255,255,0.08)'
const mint = '#34E4A0'
const faint = '#5D6A64'
const surface = '#111716'

type ColorRow = { label: string; light: string; dark: string }

/** Light/Dark tab switcher for the color panel — the real Modrek tokens swap value per theme (e.g. primary goes purple → mint). */
export default function ColorThemeTabs({ rows }: { rows: ColorRow[] }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  return (
    <div className="rounded-[14px] p-5" style={{ backgroundColor: surface, border: `1px solid ${hairline}` }}>
      <div className="mb-5 flex gap-2">
        {(['light', 'dark'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            className="rounded-full px-3 py-1 font-pixel text-[10px] uppercase tracking-[0.1em] transition-colors"
            style={{
              border: `1px solid ${theme === t ? mint : hairline}`,
              color: theme === t ? mint : faint,
            }}
          >
            {t === 'light' ? 'Light' : 'Dark'}
          </button>
        ))}
      </div>

      <div className="grid gap-px overflow-hidden rounded-[10px] sm:grid-cols-2" style={{ backgroundColor: hairline }}>
        {rows.map((c) => {
          const value = theme === 'light' ? c.light : c.dark
          return (
            <div key={c.label} className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: '#0D1211' }}>
              <span className="h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: value, border: `1px solid ${hairline}` }} />
              <span className="text-sm">{c.label}</span>
              <span className="ml-auto font-pixel text-[11px]" style={{ color: faint }}>
                {value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
