'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type RevealDirection = 'left' | 'right' | 'top' | 'bottom' | 'center'

interface ImageRevealProps {
    src: string
    alt: string
    width?: number
    height?: number
    direction?: RevealDirection
    className?: string
    triggerOnView?: boolean
}

export default function ImageReveal({
    src,
    alt,
    width = 800,
    height = 600,
    direction = 'center',
    className = '',
    triggerOnView = true,
}: ImageRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const maskRef = useRef<HTMLDivElement>(null)
    const [hasRevealed, setHasRevealed] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion || hasRevealed) {
            setHasRevealed(true)
            return
        }

        if (!triggerOnView) {
            animateReveal()
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasRevealed) {
                        animateReveal()
                    }
                })
            },
            { threshold: 0.2 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [hasRevealed, prefersReducedMotion, triggerOnView])

    const animateReveal = () => {
        if (!imageRef.current || !maskRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setHasRevealed(true),
            })

            // Animate mask based on direction
            switch (direction) {
                case 'left':
                    tl.fromTo(
                        maskRef.current,
                        { x: '-100%' },
                        {
                            x: '100%',
                            duration: durations.slow * 1.5,
                            ease: ease.smooth,
                        }
                    )
                    break
                case 'right':
                    tl.fromTo(
                        maskRef.current,
                        { x: '100%' },
                        {
                            x: '-100%',
                            duration: durations.slow * 1.5,
                            ease: ease.smooth,
                        }
                    )
                    break
                case 'top':
                    tl.fromTo(
                        maskRef.current,
                        { y: '-100%' },
                        {
                            y: '100%',
                            duration: durations.slow * 1.5,
                            ease: ease.smooth,
                        }
                    )
                    break
                case 'bottom':
                    tl.fromTo(
                        maskRef.current,
                        { y: '100%' },
                        {
                            y: '-100%',
                            duration: durations.slow * 1.5,
                            ease: ease.smooth,
                        }
                    )
                    break
                case 'center':
                    tl.fromTo(
                        maskRef.current,
                        { clipPath: 'circle(0% at 50% 50%)' },
                        {
                            clipPath: 'circle(150% at 50% 50%)',
                            duration: durations.slow * 1.5,
                            ease: ease.smooth,
                        }
                    )
                    break
            }

            // Subtle image scale animation
            tl.fromTo(
                imageRef.current,
                { scale: 1.1 },
                {
                    scale: 1,
                    duration: durations.slow * 1.5,
                    ease: ease.smooth,
                },
                0
            )
        })

        return () => ctx.revert()
    }

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{ width, height }}
        >
            {/* Image */}
            <div
                ref={imageRef}
                className="absolute inset-0"
                style={{ willChange: 'transform' }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Reveal Mask */}
            {!hasRevealed && (
                <div
                    ref={maskRef}
                    className="absolute inset-0 bg-background z-10"
                    style={{ willChange: 'transform, clip-path' }}
                />
            )}
        </div>
    )
}
