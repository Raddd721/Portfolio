// Layout data for the scrapbook hero, extracted from the source design at its
// native 1728×1117 canvas. Every position/size is expressed as a percentage
// of the hero container so the composition scales fluidly.

export type ScrapbookItem = {
  id: string
  src: string
  alt: string
  /** intrinsic pixel size of the source file, for next/image */
  intrinsicWidth: number
  intrinsicHeight: number
  /** left edge, % of container width */
  left: number
  /** top edge, % of container height */
  top: number
  /** width, % of container width (height follows the image's natural aspect ratio) */
  width: number
  /** resting tilt, degrees */
  rotate: number
  /** stacking order at rest */
  z: number
}

export const scrapbookItems: ScrapbookItem[] = [
  {
    id: 'journal',
    src: '/hero/journal.png',
    alt: 'Open travel journal with polaroid photos from a trip to Sapa, Vietnam',
    intrinsicWidth: 1100,
    intrinsicHeight: 743,
    left: 38,
    top: 9,
    width: 22.5,
    rotate: 15,
    z: 6,
  },
  {
    id: 'lamp',
    src: '/hero/lamp.png',
    alt: 'Mushroom-shaped table lamp',
    intrinsicWidth: 600,
    intrinsicHeight: 600,
    left: 86,
    top: 22,
    width: 13.5,
    rotate: 0,
    z: 6,
  },
  {
    id: 'mug',
    src: '/hero/mug.png',
    alt: 'Enamel mug of tea with a badger illustration',
    intrinsicWidth: 800,
    intrinsicHeight: 753,
    left: 71.5,
    top: 43,
    width: 8.4375,
    rotate: -15,
    z: 4,
  },
  {
    id: 'books',
    src: '/hero/books.png',
    alt: 'Stack of psychology textbooks',
    intrinsicWidth: 736,
    intrinsicHeight: 734,
    left: 75.5,
    top: 65,
    width: 16.875,
    rotate: 11.52,
    z: 4,
  },
  {
    id: 'flower-book',
    src: '/hero/flower-book.png',
    alt: 'Open book of pressed flowers with a hand-drawn doodle on the page',
    intrinsicWidth: 807,
    intrinsicHeight: 807,
    left: 41.5,
    top: 68,
    width: 15.5,
    rotate: 0,
    z: 3,
  },
  {
    id: 'vinyl',
    src: '/hero/vinyl.png',
    alt: 'Vinyl record — "From The Start" by Laufey',
    intrinsicWidth: 696,
    intrinsicHeight: 700,
    left: 3.5,
    top: 80,
    width: 13.5,
    rotate: -8,
    z: 3,
  },
]

export type StampPiece = {
  id: string
  src: string
  alt: string
  intrinsicWidth: number
  intrinsicHeight: number
  left: number
  top: number
  width: number
  rotate: number
  z: number
  /** flip-side content — only the real stamps have one, not the tape */
  back?: { label: string; message: string }
}

// The two travel stamps + tape are one composite "passport stamps" piece —
// they move together as a single scrap, matching the source collage.
export const stampGroup: { id: string; left: number; top: number; width: number; z: number; pieces: StampPiece[] } = {
  id: 'stamps',
  left: 12,
  top: 40,
  width: 10.5,
  z: 3,
  pieces: [
    {
      id: 'stamp-vietnam',
      src: '/hero/stamp-vietnam.png',
      alt: 'Vintage Vietnam airmail postage stamp',
      intrinsicWidth: 252,
      intrinsicHeight: 400,
      left: 35.93,
      top: 7.53,
      width: 64.06,
      rotate: -22.386,
      z: 1,
      back: {
        label: 'Travel memory',
        message: 'Sapa, day nine — got lost on a mountain road and found the best bowl of pho of my life at the bottom.',
      },
    },
    {
      id: 'stamp-china',
      src: '/hero/stamp-china.png',
      alt: 'Vintage China postage stamp',
      intrinsicWidth: 385,
      intrinsicHeight: 500,
      left: 0,
      top: 48.35,
      width: 60.89,
      rotate: -57.932,
      z: 0,
      back: {
        label: 'Design fact',
        message: '"UX" was coined by Don Norman in 1993. Before that, designers just called it "making things not terrible."',
      },
    },
    {
      id: 'tape',
      src: '/hero/tape.png',
      alt: '',
      intrinsicWidth: 183,
      intrinsicHeight: 418,
      left: 66.09,
      top: 0,
      width: 24.4,
      rotate: -58.283,
      z: 2,
    },
  ],
}
