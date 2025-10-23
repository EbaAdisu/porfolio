'use client'

import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { ReactNode, useEffect, useRef } from 'react'

interface FloatingElementProps {
    children: ReactNode
    duration?: number
    yDistance?: number
    rotation?: number
    className?: string
}

export default function FloatingElement({
    children,
    duration = 3,
    yDistance = 20,
    rotation = 5,
    className = '',
}: FloatingElementProps) {
    const elementRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion || !elementRef.current) return

        const ctx = gsap.context(() => {
            // Floating animation
            gsap.to(elementRef.current, {
                y: -yDistance,
                duration: duration,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            })

            // Rotation animation
            gsap.to(elementRef.current, {
                rotation: rotation,
                duration: duration * 0.8,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            })
        }, elementRef)

        return () => ctx.revert()
    }, [duration, yDistance, rotation, prefersReducedMotion])

    return (
        <div ref={elementRef} className={`transform-gpu ${className}`}>
            {children}
        </div>
    )
}
