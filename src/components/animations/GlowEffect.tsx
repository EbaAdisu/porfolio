'use client'

import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { ReactNode, useEffect, useRef } from 'react'

interface GlowEffectProps {
    children: ReactNode
    color?: string
    intensity?: number
    className?: string
}

export default function GlowEffect({
    children,
    color = 'hsl(var(--primary))',
    intensity = 20,
    className = '',
}: GlowEffectProps) {
    const glowRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion || !glowRef.current) return

        const ctx = gsap.context(() => {
            // Pulsing glow animation
            gsap.to(glowRef.current, {
                boxShadow: `0 0 ${intensity * 2}px ${color}, 0 0 ${
                    intensity * 4
                }px ${color}`,
                duration: 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            })
        }, glowRef)

        return () => ctx.revert()
    }, [color, intensity, prefersReducedMotion])

    return (
        <div
            ref={glowRef}
            className={`relative ${className}`}
            style={{
                boxShadow: `0 0 ${intensity}px ${color}`,
                transition: 'box-shadow 0.3s ease',
            }}
        >
            {children}
        </div>
    )
}
