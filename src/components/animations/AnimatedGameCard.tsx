'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { ReactNode, useEffect, useRef } from 'react'

interface AnimatedGameCardProps {
    children: ReactNode
    className?: string
}

export default function AnimatedGameCard({
    children,
    className = '',
}: AnimatedGameCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion || !cardRef.current) return

        const ctx = gsap.context(() => {
            // 3D rotation entrance animation
            gsap.from(cardRef.current, {
                opacity: 0,
                rotateY: -90,
                scale: 0.8,
                duration: durations.slow,
                ease: ease.smooth,
                transformPerspective: 1000,
            })

            // Floating animation loop
            gsap.to(cardRef.current, {
                y: -10,
                duration: 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            })
        }, cardRef)

        return () => ctx.revert()
    }, [prefersReducedMotion])

    return (
        <div
            ref={cardRef}
            className={`transform-gpu ${className}`}
            style={{ perspective: '1000px' }}
        >
            {children}
        </div>
    )
}
