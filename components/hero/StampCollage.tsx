'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { stampGroup, type StampPiece } from './scrapbookObjects'

/**
 * The two travel stamps and the strip of tape holding them down, rendered as
 * fixed-relative pieces inside one draggable surface (see DraggableObject) —
 * they read as a single collaged scrap, matching the source composition.
 * The two real stamps (not the tape) flip over on click to reveal a little
 * note on the back, postcard-style.
 */
export default function StampCollage() {
  return (
    <div className="relative aspect-[196.7/301.3] w-full">
      {stampGroup.pieces.map((piece) =>
        piece.back ? (
          <FlippableStamp key={piece.id} piece={piece} />
        ) : (
          <div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.left}%`,
              top: `${piece.top}%`,
              width: `${piece.width}%`,
              rotate: `${piece.rotate}deg`,
              zIndex: piece.z,
            }}
          >
            <Image
              src={piece.src}
              alt={piece.alt}
              width={piece.intrinsicWidth}
              height={piece.intrinsicHeight}
              className="h-auto w-full"
              draggable={false}
              sizes="15vw"
            />
          </div>
        ),
      )}
    </div>
  )
}

function FlippableStamp({ piece }: { piece: StampPiece }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      onClick={(e) => {
        // Real drags on the parent collage fire a click on release too —
        // only treat this as a tap if the pointer barely moved.
        e.stopPropagation()
        setFlipped((f) => !f)
      }}
      aria-label={flipped ? `Show the front of the ${piece.alt}` : `Flip the ${piece.alt} over`}
      aria-pressed={flipped}
      className="absolute block cursor-pointer appearance-none border-0 bg-transparent p-0 [perspective:900px]"
      style={{
        left: `${piece.left}%`,
        top: `${piece.top}%`,
        width: `${piece.width}%`,
        zIndex: piece.z,
      }}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ rotate: `${piece.rotate}deg` }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 210, damping: 24, mass: 1.1 }}
      >
        <Image
          src={piece.src}
          alt={piece.alt}
          width={piece.intrinsicWidth}
          height={piece.intrinsicHeight}
          className="block h-auto w-full [backface-visibility:hidden]"
          draggable={false}
          sizes="15vw"
        />

        <div
          className="absolute inset-0 rounded-[3px] border border-black/10 bg-[#fbf6ea] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0, transparent calc(16% - 1px), rgba(26,26,23,0.08) 16%)',
          }}
        />
      </motion.div>
    </button>
  )
}
