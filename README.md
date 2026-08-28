# refOS — a minimalist portfolio

A single-page personal portfolio homepage inspired by [martinrefi.com](https://www.martinrefi.com/):
warm paper background, a serif/mono type pairing, a terminal-flavoured
"personal OS" header, and quiet scroll-reveal motion.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Run it

```bash
cd portfolio
npm install      # already done
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` then `npm start` for a production build.

## Make it yours

Almost everything you'd want to change lives in one file:

- **[`app/content.ts`](app/content.ts)** — your name, role, intro, project
  list, about paragraphs, "currently" items, and social links.

Design tokens (colors, fonts, max width) live in
[`tailwind.config.ts`](tailwind.config.ts). The two fonts are loaded via
`next/font` in [`app/layout.tsx`](app/layout.tsx) — swap `Newsreader` /
`JetBrains_Mono` for any Google font.

## Structure

```
app/
  layout.tsx     fonts + metadata
  page.tsx       the whole page (hero, work, about, currently, contact, footer)
  content.ts     ← all editable copy
  globals.css    base styles, link/reveal/caret animations
components/
  Nav.tsx        sticky header with live clock
  Reveal.tsx     IntersectionObserver fade-in wrapper
```
