'use client'

import { useRef, useState } from 'react'

// Shared stacking counter so the most recently grabbed item comes to front.
let zCounter = 10

type DraggableProps = {
  children: React.ReactNode
  /** Starting position within the parent (CSS values, e.g. '6%' or 40). */
  left: number | string
  top: number | string
  className?: string
  /** Base z-index before the item is ever grabbed. */
  baseZ?: number
  ariaLabel?: string
}

/**
 * Makes its children draggable within the nearest positioned ancestor.
 * Uses Pointer Events, so it works with mouse, trackpad and touch alike.
 * A small movement threshold lets genuine clicks (on links inside) still
 * fire, while any real drag suppresses the click.
 */
export default function Draggable({
  children,
  left,
  top,
  className = '',
  baseZ = 1,
  ariaLabel,
}: DraggableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [z, setZ] = useState(baseZ)
  const [dragging, setDragging] = useState(false)
  const start = useRef({ px: 0, py: 0, x: 0, y: 0, moved: false })

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button === 2) return // ignore right-click
    try {
      ref.current?.setPointerCapture(e.pointerId)
    } catch {
      /* no active pointer to capture */
    }
    start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y, moved: false }
    setDragging(true)
    setZ(++zCounter)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - start.current.px
    const dy = e.clientY - start.current.py
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) start.current.moved = true
    setPos({ x: start.current.x + dx, y: start.current.y + dy })
  }

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging) return
    setDragging(false)
    try {
      ref.current?.releasePointerCapture(e.pointerId)
    } catch {
      /* pointer already released */
    }
  }

  // Swallow the click that follows a real drag so links don't navigate.
  const onClickCapture = (e: React.MouseEvent) => {
    if (start.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      start.current.moved = false
    }
  }

  return (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={`absolute touch-none select-none ${
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      style={{
        left,
        top,
        zIndex: z,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: dragging ? 'none' : 'box-shadow .2s ease',
        willChange: 'transform',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  )
}
