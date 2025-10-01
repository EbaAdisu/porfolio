'use client'

import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { useEffect, useRef, useState } from 'react'

interface GlitchTextProps {
    text: string
    className?: string
    triggerOnHover?: boolean
}

export default function GlitchText({
    text,
    className = '',
    triggerOnHover = true,
}: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false)
    const textRef = useRef<HTMLSpanElement>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion || !isGlitching) return

        const glitchDuration = 300
        const timer = setTimeout(() => {
            setIsGlitching(false)
        }, glitchDuration)

        return () => clearTimeout(timer)
    }, [isGlitching, prefersReducedMotion])

    const handleMouseEnter = () => {
        if (!triggerOnHover || prefersReducedMotion) return
        setIsGlitching(true)
    }

    // Always render the text, with or without effects
    if (prefersReducedMotion) {
        return <span className={className}>{text}</span>
    }

    return (
        <span
            ref={textRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            {/* Main text */}
            <span className="relative z-10">{text}</span>

            {/* Glitch layers */}
            {isGlitching && (
                <>
                    <span
                        className="absolute inset-0 text-red-500"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                            animation: 'glitch-1 0.3s infinite',
                        }}
                    >
                        {text}
                    </span>
                    <span
                        className="absolute inset-0 text-blue-500"
                        style={{
                            clipPath:
                                'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                            animation: 'glitch-2 0.3s infinite',
                        }}
                    >
                        {text}
                    </span>
                </>
            )}

            <style jsx>{`
                @keyframes glitch-1 {
                    0%,
                    100% {
                        transform: translate(0);
                    }
                    33% {
                        transform: translate(-2px, 2px);
                    }
                    66% {
                        transform: translate(2px, -2px);
                    }
                }

                @keyframes glitch-2 {
                    0%,
                    100% {
                        transform: translate(0);
                    }
                    33% {
                        transform: translate(2px, -2px);
                    }
                    66% {
                        transform: translate(-2px, 2px);
                    }
                }
            `}</style>
        </span>
    )
}
