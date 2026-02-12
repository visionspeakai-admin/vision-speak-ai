'use client'

import { useEffect, useRef } from 'react'

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Particle system
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      life: number
      maxLife: number
    }

    const particles: Particle[] = []
    const particleCount = 20

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      })
    }

    const animate = () => {
      // Clear canvas with semi-transparent overlay for trailing effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.01)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Fade in and out
        const fadeFactor = Math.min(particle.life / 20, 1)
        const fadeOut = Math.max(1 - (particle.life - particle.maxLife + 20) / 20, 0)
        particle.opacity = fadeFactor * fadeOut * (Math.random() * 0.4 + 0.1)

        // Wrap around edges
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10

        // Reset if life exceeded
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = 0
          particle.maxLife = 100 + Math.random() * 100
        }

        // Draw particle with glow effect
        ctx.fillStyle = `rgba(0, 242, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw glow around particles
        ctx.strokeStyle = `rgba(0, 242, 255, ${particle.opacity * 0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius + 3, 0, Math.PI * 2)
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-40"
      style={{ pointerEvents: 'none' }}
    />
  )
}
