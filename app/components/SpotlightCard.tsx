'use client'

import { useRef, type ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  color?: string   // rgba or hex — default violet
}

export default function SpotlightCard({
  children,
  className = '',
  color = 'rgba(139,92,246,0.1)',
}: SpotlightCardProps) {
  const rayRef  = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (rayRef.current) {
      rayRef.current.style.background =
        `radial-gradient(500px circle at ${x}px ${y}px, ${color}, rgba(6,182,212,0.04) 45%, transparent 65%)`
    }
  }

  const onEnter = () => { if (rayRef.current) rayRef.current.style.opacity = '1' }
  const onLeave = () => { if (rayRef.current) rayRef.current.style.opacity = '0' }

  return (
    <div
      className={`spotlight-card ${className}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div ref={rayRef} className="spotlight-ray" />
      <div className="noise-texture" />
      <div className="spotlight-content">{children}</div>
    </div>
  )
}
