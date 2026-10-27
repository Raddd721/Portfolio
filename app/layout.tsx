import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Newsreader, JetBrains_Mono, Caveat, Fraunces, Manrope } from 'next/font/google'
import './globals.css'
import { site } from './content'

const serif = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const hand = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-hand',
  display: 'swap',
})

// Scrapbook hero typography
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Body copy / sub-text across the site
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

// Departure Mono (SIL OFL) — self-hosted, see app/fonts/DepartureMono-LICENSE.txt
const pixel = localFont({
  src: './fonts/DepartureMono-Regular.woff2',
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
})

// Resolves relative OG/twitter image URLs against the real deployed origin
// instead of silently falling back to localhost — set NEXT_PUBLIC_SITE_URL
// once the site has a production domain.
const metadataBase = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined

export const metadata: Metadata = {
  metadataBase,
  title: `${site.name} — ${site.role}`,
  description: site.intro,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.intro,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable} ${hand.variable} ${fraunces.variable} ${pixel.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  )
}
