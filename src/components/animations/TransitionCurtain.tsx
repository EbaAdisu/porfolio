'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

type TransitionType = 'slide' | 'fade' | 'morph' | 'wipe'

interface TransitionCurtainProps {
    isTransitioning: boolean
    onComplete?: () => void
    type?: TransitionType
    direction?: 'left' | 'right' | 'top' | 'bottom'
}

export default function TransitionCurtain({
    isTransitioning,
    onComplete,
    type = 'slide',
    direction = 'right',
}: TransitionCurtainProps) {
    const curtainRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (!isTransitioning || !curtainRef.current) return

        setIsVisible(true)

        if (prefersReducedMotion) {
            setTimeout(() => {
                onComplete?.()
                setIsVisible(false)
            }, 100)
            return
        }

        const ctx = gsap.context(() => {
            switch (type) {
                case 'slide':
                    slideTransition()
                    break
                case 'fade':
                    fadeTransition()
                    break
                case 'morph':
                    morphTransition()
                    break
                case 'wipe':
                    wipeTransition()
                    break
            }
        }, curtainRef)

        return () => ctx.revert()
    }, [isTransitioning, type, direction, prefersReducedMotion, onComplete])

    const slideTransition = () => {
        const getInitialPosition = () => {
            switch (direction) {
                case 'left':
                    return { x: '-100%', y: 0 }
                case 'right':
                    return { x: '100%', y: 0 }
                case 'top':
                    return { x: 0, y: '-100%' }
                case 'bottom':
                    return { x: 0, y: '100%' }
            }
        }

        const initial = getInitialPosition()

        gsap.timeline()
            .fromTo(curtainRef.current, initial, {
                x: 0,
                y: 0,
                duration: durations.slow,
                ease: ease.smooth,
            })
            .call(() => onComplete?.())
            .to(curtainRef.current, {
                ...initial,
                duration: durations.slow,
                ease: ease.smooth,
                onComplete: () => setIsVisible(false),
            })
    }

    const fadeTransition = () => {
        gsap.timeline()
            .fromTo(
                curtainRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: durations.default,
                    ease: ease.smooth,
                }
            )
            .call(() => onComplete?.())
            .to(curtainRef.current, {
                opacity: 0,
                duration: durations.default,
                ease: ease.smooth,
                onComplete: () => setIsVisible(false),
            })
    }

    const morphTransition = () => {
        gsap.timeline()
            .fromTo(
                curtainRef.current,
                { clipPath: 'circle(0% at 50% 50%)' },
                {
                    clipPath: 'circle(150% at 50% 50%)',
                    duration: durations.slow,
                    ease: ease.smooth,
                }
            )
            .call(() => onComplete?.())
            .to(curtainRef.current, {
                clipPath: 'circle(0% at 50% 50%)',
                duration: durations.slow,
                ease: ease.smooth,
                onComplete: () => setIsVisible(false),
            })
    }

    const wipeTransition = () => {
        const getClipPath = (progress: number) => {
            switch (direction) {
                case 'left':
                    return `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`
                case 'right':
                    return `polygon(${100 - progress}% 0, 100% 0, 100% 100%, ${
                        100 - progress
                    }% 100%)`
                case 'top':
                    return `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`
                case 'bottom':
                    return `polygon(0 ${100 - progress}%, 100% ${
                        100 - progress
                    }%, 100% 100%, 0 100%)`
            }
        }

        const tl = gsap.timeline()
        const steps = 10

        for (let i = 0; i <= steps; i++) {
            const progress = (i / steps) * 100
            tl.to(curtainRef.current, {
                clipPath: getClipPath(progress),
                duration: durations.slow / steps,
                ease: 'linear',
            })
        }

        tl.call(() => onComplete?.())

        for (let i = steps; i >= 0; i--) {
            const progress = (i / steps) * 100
            tl.to(curtainRef.current, {
                clipPath: getClipPath(progress),
                duration: durations.slow / steps,
                ease: 'linear',
            })
        }

        tl.call(() => setIsVisible(false))
    }

    if (!isVisible) return null

    return (
        <div
            ref={curtainRef}
            className="fixed inset-0 z-[999] bg-gradient-to-br from-primary via-primary/95 to-primary/90 pointer-events-none"
            style={{
                willChange: 'transform, opacity, clip-path',
            }}
        />
    )
}
