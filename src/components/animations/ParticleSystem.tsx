'use client'

import { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number
}

interface ParticleSystemProps {
    particleCount?: number
    color?: string
    className?: string
}

export default function ParticleSystem({
    particleCount = 50,
    color = 'currentColor',
    className = '',
}: ParticleSystemProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationFrameRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Initialize particles
        const particles: Particle[] = []
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.offsetWidth,
                y: Math.random() * canvas.offsetHeight,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
            })
        }
        particlesRef.current = particles

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

            particles.forEach((particle) => {
                // Update position
                particle.x += particle.speedX
                particle.y += particle.speedY

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.offsetWidth
                if (particle.x > canvas.offsetWidth) particle.x = 0
                if (particle.y < 0) particle.y = canvas.offsetHeight
                if (particle.y > canvas.offsetHeight) particle.y = 0

                // Animate opacity
                particle.opacity += Math.sin(Date.now() * 0.001) * 0.01

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(var(--primary-rgb, 255, 255, 255), ${particle.opacity})`
                ctx.fill()
            })

            // Draw connections between nearby particles
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = `rgba(var(--primary-rgb, 255, 255, 255), ${
                            0.1 * (1 - distance / 100)
                        })`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                })
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [particleCount, color])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ opacity: 0.3 }}
        />
    )
}
