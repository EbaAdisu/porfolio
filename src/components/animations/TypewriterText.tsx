'use client'

import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { useEffect, useState } from 'react'

interface TypewriterTextProps {
    text: string
    speed?: number
    delay?: number
    className?: string
    onComplete?: () => void
}

export default function TypewriterText({
    text,
    speed = 30,
    delay = 0,
    className = '',
    onComplete,
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayText(text)
            onComplete?.()
            return
        }

        const startTimer = setTimeout(() => {
            setHasStarted(true)
        }, delay)

        return () => clearTimeout(startTimer)
    }, [delay, prefersReducedMotion, text, onComplete])

    useEffect(() => {
        if (!hasStarted || prefersReducedMotion) return

        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex])
                setCurrentIndex((prev) => prev + 1)
            }, speed)

            return () => clearTimeout(timer)
        } else if (currentIndex === text.length) {
            onComplete?.()
        }
    }, [
        currentIndex,
        text,
        speed,
        hasStarted,
        prefersReducedMotion,
        onComplete,
    ])

    return (
        <span className={className}>
            {displayText}
            {currentIndex < text.length && (
                <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" />
            )}
        </span>
    )
}
