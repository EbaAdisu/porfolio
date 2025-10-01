'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface GameLoadingAnimationProps {
    onComplete?: () => void
}

export default function GameLoadingAnimation({
    onComplete,
}: GameLoadingAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            const shapes =
                containerRef.current?.querySelectorAll('.loading-shape')

            // Animate shapes
            gsap.from(shapes, {
                scale: 0,
                opacity: 0,
                rotation: -360,
                duration: durations.default,
                stagger: 0.1,
                ease: ease.snap,
            })

            // Pulse animation
            gsap.to(shapes, {
                scale: 1.2,
                duration: 0.5,
                ease: 'sine.inOut',
                repeat: 5,
                yoyo: true,
                stagger: 0.1,
            })

            // Fade out and call onComplete
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: durations.default,
                delay: 3,
                ease: ease.smooth,
                onComplete: () => {
                    onComplete?.()
                },
            })
        }, containerRef)

        return () => ctx.revert()
    }, [onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-md"
        >
            <div className="flex flex-col items-center space-y-8">
                {/* Animated shapes */}
                <div className="flex space-x-4">
                    <div className="loading-shape w-4 h-4 bg-primary rounded-full" />
                    <div className="loading-shape w-4 h-4 bg-primary rounded-full" />
                    <div className="loading-shape w-4 h-4 bg-primary rounded-full" />
                </div>

                {/* Loading text */}
                <div className="text-2xl font-bold">Loading Game...</div>
            </div>
        </div>
    )
}
