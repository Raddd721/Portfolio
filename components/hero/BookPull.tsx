'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { resumePageHref } from '../../app/content'

type BookPullProps = {
  src: string
  alt: string
  intrinsicWidth: number
  intrinsicHeight: number
}

// The "Gleitman Psychology" spine, measured off the source photo — the one
// book that pulls out. Expressed as insets from each edge of the full image.
const CLIP_LEFT = 61.685
const CLIP_RIGHT = 27.717
// How far the clip region is allowed to open above the stack's own top edge —
// just enough headroom for the bookmark to poke up into when revealed.
const CLIP_TOP_ALLOWANCE = 10

// ~40px at the reference 1728px canvas (the book renders ~217px wide there),
// expressed as a share of its own height so it scales with the object.
const PULL_Y = '-18.5%'

const PULL_SPRING = { type: 'spring', stiffness: 220, damping: 26, mass: 1 } as const

/**
 * One spine slides up out of the stack on click, like pulling a book off a
 * shelf — a bookmark peeks out the top, and clicking it opens the resume.
 * Click again (or the bookmark's own toggle) slides it back into place.
 */
export default function BookPull({ src, alt, intrinsicWidth, intrinsicHeight }: BookPullProps) {
  const [pulled, setPulled] = useState(false)

  return (
    <span className="relative block">
      <Image
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        className="h-auto w-full"
        draggable={false}
        sizes="20vw"
      />

      <motion.button
        type="button"
        onClick={(e) => {
          // The whole stack is itself draggable — only treat this as a tap
          // if the pointer barely moved, and never let it bubble into a drag.
          e.stopPropagation()
          setPulled((p) => !p)
        }}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={pulled ? 'Push the book back onto the shelf' : 'Pull a book off the shelf'}
        aria-pressed={pulled}
        className="absolute inset-0 block w-full cursor-pointer appearance-none border-0 bg-transparent p-0"
        style={{ clipPath: `inset(-${CLIP_TOP_ALLOWANCE}% ${CLIP_RIGHT}% 0 ${CLIP_LEFT}%)` }}
        animate={{ y: pulled ? PULL_Y : '0%' }}
        transition={PULL_SPRING}
      >
        <Image
          src={src}
          alt=""
          width={intrinsicWidth}
          height={intrinsicHeight}
          className="block h-auto w-full"
          draggable={false}
          aria-hidden
        />

        <motion.a
          href={resumePageHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute block"
          style={{
            left: `${(CLIP_LEFT + (100 - CLIP_RIGHT)) / 2}%`,
            top: `-${CLIP_TOP_ALLOWANCE - 1}%`,
            width: '5%',
            height: '11%',
            transform: 'translateX(-50%)',
          }}
          initial={false}
          animate={pulled ? { y: 0, opacity: 1 } : { y: 6, opacity: 0 }}
          transition={PULL_SPRING}
        >
          <span
            className="block h-full w-full bg-[#C1502E] shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)' }}
          />
        </motion.a>
      </motion.button>
    </span>
  )
}
