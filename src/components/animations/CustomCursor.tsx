'use client'

import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        if (shouldReduceMotion) return

        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current
        if (!cursor || !cursorDot) return

        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            gsap.to(cursorDot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: 'power2.out',
            })

            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.3,
                ease: 'power2.out',
            })
        }

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true)
            }
        }

        const handleMouseLeave = () => {
            setIsHovering(false)
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseenter', handleMouseEnter, true)
        document.addEventListener('mouseleave', handleMouseLeave, true)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseenter', handleMouseEnter, true)
            document.removeEventListener('mouseleave', handleMouseLeave, true)
        }
    }, [shouldReduceMotion])

    if (shouldReduceMotion || typeof window === 'undefined') return null

    // Hide on mobile/touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

    return (
        <>
            {/* Cursor Ring */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform ${
                    isHovering ? 'scale-150' : 'scale-100'
                }`}
                style={{
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Cursor Dot */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </>
    )
}
