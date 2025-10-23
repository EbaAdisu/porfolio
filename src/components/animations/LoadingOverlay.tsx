'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface LoadingOverlayProps {
    isLoading: boolean
    onComplete?: () => void
}

export default function LoadingOverlay({
    isLoading,
    onComplete,
}: LoadingOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const shapesRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (!isLoading || !overlayRef.current || !shapesRef.current) return

        const ctx = gsap.context(() => {
            const shapes = shapesRef.current?.querySelectorAll('.loading-shape')

            if (!prefersReducedMotion) {
                // Animate shapes
                gsap.from(shapes, {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                    duration: durations.default,
                    stagger: 0.1,
                    ease: ease.snap,
                })

                // Continuous rotation
                gsap.to(shapes, {
                    rotation: 360,
                    duration: 2,
                    repeat: -1,
                    ease: 'linear',
                    stagger: 0.1,
                })

                // Pulse effect
                gsap.to(shapes, {
                    scale: 1.2,
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    stagger: 0.15,
                })
            }
        }, [overlayRef, shapesRef])

        return () => ctx.revert()
    }, [isLoading, prefersReducedMotion])

    useEffect(() => {
        if (!isLoading && overlayRef.current) {
            if (!prefersReducedMotion) {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: durations.default,
                    ease: ease.smooth,
                    onComplete: () => {
                        onComplete?.()
                    },
                })
            } else {
                onComplete?.()
            }
        }
    }, [isLoading, prefersReducedMotion, onComplete])

    if (!isLoading) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
            <div
                ref={shapesRef}
                className="flex items-center justify-center space-x-4"
            >
                {/* Circle */}
                <div className="loading-shape w-12 h-12 bg-primary rounded-full" />

                {/* Square */}
                <div className="loading-shape w-12 h-12 bg-primary/80 rounded-lg" />

                {/* Triangle */}
                <div
                    className="loading-shape w-0 h-0"
                    style={{
                        borderLeft: '24px solid transparent',
                        borderRight: '24px solid transparent',
                        borderBottom: '42px solid hsl(var(--primary))',
                        opacity: 0.6,
                    }}
                />
            </div>
        </div>
    )
}
