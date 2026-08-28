'use client'

import { useState } from 'react'

const hairline = 'rgba(255,255,255,0.08)'
const mint = '#34E4A0'
const faint = '#5D6A64'
const surface = '#111716'

type TypeRow = { label: string; labelAr: string; size: string; weight: string; lineHeight: string }

/** EN/AR tab switcher for the type scale panel — mirrors the real Button doc page's own LTR/RTL toggle pattern. */
export default function TypeScaleTabs({ rows }: { rows: TypeRow[] }) {
  const [lang, setLang] = useState<'en' | 'ar'>('en')

  return (
    <div className="rounded-[14px] p-5" style={{ backgroundColor: surface, border: `1px solid ${hairline}` }}>
      <div className="mb-5 flex gap-2">
        {(['en', 'ar'] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className="rounded-full px-3 py-1 font-pixel text-[10px] uppercase tracking-[0.1em] transition-colors"
            style={{
              border: `1px solid ${lang === l ? mint : hairline}`,
              color: lang === l ? mint : faint,
            }}
          >
            {l === 'en' ? 'English' : 'Arabic'}
          </button>
        ))}
      </div>

      <div className="space-y-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {rows.map((t) => (
          <div
            key={t.label}
            className="flex items-baseline justify-between gap-4"
            style={{ borderBottom: `1px solid ${hairline}`, paddingBottom: '1rem' }}
          >
            <span
              style={{
                fontSize: t.size,
                fontWeight: t.weight,
                lineHeight: t.lineHeight,
                fontFamily: lang === 'ar' ? "'Tajawal', 'Inter', sans-serif" : "'Inter', sans-serif",
              }}
            >
              {lang === 'ar' ? t.labelAr : t.label}
            </span>
            <span className="shrink-0 font-pixel text-[11px]" style={{ color: faint }}>
              {t.size} / {t.weight} / {t.lineHeight}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
