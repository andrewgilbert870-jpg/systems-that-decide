'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const GOLD = { r: 212, g: 175, b: 55 }
const COUNT = 60
const MAX_DIST = 200
const SPEED = 0.28

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0
    let H = 0
    let particles: Particle[] = []

    const resize = () => {
      const parent = canvas.parentElement
      W = parent ? parent.offsetWidth : window.innerWidth
      H = parent ? parent.offsetHeight : window.innerHeight
      canvas.width = W
      canvas.height = H
    }

    const init = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Update positions
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        p.x = Math.max(0, Math.min(W, p.x))
        p.y = Math.max(0, Math.min(H, p.y))
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.7
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`
            ctx.lineWidth = 1.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.6)`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const handleResize = () => {
      resize()
      init()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
