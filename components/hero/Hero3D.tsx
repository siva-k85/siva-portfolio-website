'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

interface Hero3DProps {
  quality?: 'high' | 'low'
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
  offset: number
  color: string
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace('#', '')
  const normalized = sanitized.length === 3
    ? sanitized.split('').map(char => char + char).join('')
    : sanitized
  const int = parseInt(normalized, 16)
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1).toFixed(3)})`
}

function createParticles(
  count: number,
  width: number,
  height: number,
  palette: string[],
  speedScale: number
) {
  const particles: Particle[] = []
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speedScale,
      vy: (Math.random() - 0.5) * speedScale * 0.7,
      radius: Math.random() * 2.2 + 1.1,
      baseAlpha: Math.random() * 0.35 + 0.25,
      offset: Math.random() * Math.PI * 2,
      color: palette[i % palette.length],
    })
  }
  return particles
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return reducedMotion
}

export default function Hero3D({ quality = 'high' }: Hero3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const configuration = useMemo(() => {
    const highQuality = quality === 'high'
    return {
      palette: highQuality
        ? ['#60A5FA', '#22D3EE', '#A855F7', '#F472B6']
        : ['#93C5FD', '#38BDF8', '#C084FC'],
      particleCount: highQuality ? 96 : 54,
      connectionDistance: highQuality ? 180 : 120,
      speedScale: highQuality ? 0.46 : 0.28,
      maximumDpr: highQuality ? 1.85 : 1.35,
    }
  }, [quality])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let animationFrame = 0

    const setCanvasSize = () => {
      const parent = canvas.parentElement
      const rect = parent?.getBoundingClientRect()
      const nextWidth = rect?.width ?? window.innerWidth
      const nextHeight = rect?.height ?? Math.max(window.innerHeight * 0.6, 640)
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, configuration.maximumDpr)

      canvas.width = nextWidth * devicePixelRatio
      canvas.height = nextHeight * devicePixelRatio
      canvas.style.width = `${nextWidth}px`
      canvas.style.height = `${nextHeight}px`

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(devicePixelRatio, devicePixelRatio)

      if (!particles.length) {
        particles = createParticles(
          configuration.particleCount,
          nextWidth,
          nextHeight,
          configuration.palette,
          configuration.speedScale
        )
      } else {
        const scaleX = nextWidth / width
        const scaleY = nextHeight / height
        particles = particles.map(particle => ({
          ...particle,
          x: particle.x * scaleX,
          y: particle.y * scaleY,
        }))
      }

      width = nextWidth
      height = nextHeight
    }

    const drawBackground = () => {
      const gradient = context.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, 'rgba(30, 64, 175, 0.45)')
      gradient.addColorStop(0.45, 'rgba(59, 130, 246, 0.28)')
      gradient.addColorStop(1, 'rgba(14, 116, 144, 0.42)')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      const spotlight = context.createRadialGradient(
        width * 0.75,
        height * 0.32,
        height * 0.05,
        width * 0.55,
        height * 0.4,
        height * 0.75
      )
      spotlight.addColorStop(0, 'rgba(96, 165, 250, 0.42)')
      spotlight.addColorStop(0.55, 'rgba(13, 148, 136, 0.18)')
      spotlight.addColorStop(1, 'rgba(15, 23, 42, 0.55)')
      context.fillStyle = spotlight
      context.fillRect(0, 0, width, height)

      context.fillStyle = 'rgba(15, 23, 42, 0.35)'
      context.fillRect(0, 0, width, height)
    }

    const drawParticles = (time: number) => {
      const elapsed = time * 0.00035
      const connectionDistance = configuration.connectionDistance

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -40) particle.x = width + 40
        if (particle.x > width + 40) particle.x = -40
        if (particle.y < -40) particle.y = height + 40
        if (particle.y > height + 40) particle.y = -40

        const pulse = Math.sin(elapsed + particle.offset) * 0.25
        const alpha = clamp(particle.baseAlpha + pulse, 0.08, 0.82)

        context.beginPath()
        context.fillStyle = hexToRgba(particle.color, alpha)
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const particleA = particles[i]
          const particleB = particles[j]
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.hypot(dx, dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.14
            context.strokeStyle = `rgba(94, 234, 212, ${opacity.toFixed(3)})`
            context.lineWidth = 0.8
            context.beginPath()
            context.moveTo(particleA.x, particleA.y)
            context.lineTo(particleB.x, particleB.y)
            context.stroke()
          }
        }
      }
    }

    const renderFrame = (time: number) => {
      drawBackground()
      drawParticles(time)

      context.fillStyle = 'rgba(148, 163, 184, 0.08)'
      context.fillRect(0, height * 0.65, width, height * 0.35)

      context.fillStyle = 'rgba(30, 64, 175, 0.12)'
      context.beginPath()
      context.moveTo(0, height * 0.82)
      context.quadraticCurveTo(width * 0.35, height * 0.72, width * 0.65, height * 0.95)
      context.quadraticCurveTo(width * 0.82, height * 1.02, width, height * 0.88)
      context.lineTo(width, height)
      context.lineTo(0, height)
      context.closePath()
      context.fill()
    }

    const onAnimationFrame = (time: number) => {
      renderFrame(time)
      animationFrame = window.requestAnimationFrame(onAnimationFrame)
    }

    setCanvasSize()
    if (reducedMotion) {
      renderFrame(performance.now())
    } else {
      animationFrame = window.requestAnimationFrame(onAnimationFrame)
    }

    const parent = canvas.parentElement
    let resizeObserver: ResizeObserver | null = null

    if (typeof ResizeObserver !== 'undefined' && parent) {
      resizeObserver = new ResizeObserver(() => {
        setCanvasSize()
        if (reducedMotion) {
          renderFrame(performance.now())
        }
      })
      resizeObserver.observe(parent)
    } else {
      const handleResize = () => {
        setCanvasSize()
        if (reducedMotion) {
          renderFrame(performance.now())
        }
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
        window.cancelAnimationFrame(animationFrame)
      }
    }

    return () => {
      resizeObserver?.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [configuration, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  )
}
