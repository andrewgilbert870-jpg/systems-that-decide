'use client'
import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function StatCounter({
  value,
  label,
  context,
}: {
  value: string
  label: string
  context: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState(value)
  const animated = useRef(false)

  useEffect(() => {
    const match = value.match(/^([~]?)(\d[\d,]*)([%]?)$/)
    if (!match) return

    const pre = match[1] || ''
    const target = parseFloat(match[2].replace(/,/g, ''))
    const suf = match[3] || ''

    setText(`${pre}0${suf}`)

    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return
        animated.current = true
        const dur = 1500
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1)
          const n = Math.round(easeOutCubic(t) * target)
          if (t < 1) {
            setText(`${pre}${n.toLocaleString()}${suf}`)
            requestAnimationFrame(tick)
          } else {
            setText(value)
          }
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column' }}>
      <span
        style={{
          fontFamily: 'var(--font-space-mono)',
          fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 64px)',
          color: '#C4A84A',
          lineHeight: 1,
          marginBottom: '14px',
          letterSpacing: '-0.02em',
        }}
      >
        {text}
      </span>
      <span
        className="label-caps"
        style={{ marginBottom: '8px' }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '14px',
          color: '#B8B2AE',
          lineHeight: 1.5,
        }}
      >
        {context}
      </span>
    </div>
  )
}
