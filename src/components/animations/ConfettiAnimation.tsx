'use client'

import { useEffect, useRef } from 'react'

interface ConfettiAnimationProps {
    active: boolean
    particleCount?: number
}

export default function ConfettiAnimation({
    active,
    particleCount = 100,
}: ConfettiAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!active || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            color: string
            size: number
            rotation: number
            rotationSpeed: number
        }> = []

        const colors = [
            '#10b981',
            '#3b82f6',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6',
            '#ec4899',
        ]

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: Math.random() * -20 - 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
            })
        }

        let animationId: number
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((p, index) => {
                // Update position
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.5 // Gravity
                p.rotation += p.rotationSpeed

                // Draw confetti
                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.rotate((p.rotation * Math.PI) / 180)
                ctx.fillStyle = p.color
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 2)
                ctx.restore()

                // Remove particles that are off screen
                if (p.y > canvas.height) {
                    particles.splice(index, 1)
                }
            })

            if (particles.length > 0) {
                animationId = requestAnimationFrame(animate)
            }
        }

        animate()

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [active, particleCount])

    if (!active) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ mixBlendMode: 'multiply' }}
        />
    )
}
