'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { durations } from '../configs/durations'
import { ease } from '../configs/ease'

/**
 * Custom hook for hero section animations
 */
export function useHeroAnimation() {
    const heroRef = useRef<HTMLDivElement>(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!heroRef.current || hasAnimated.current) return
        hasAnimated.current = true

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: ease.smooth } })

            // Animate title characters
            tl.from('.hero-char', {
                opacity: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.02,
                duration: durations.default,
                ease: ease.snap,
            })

            // Animate subtitle
            tl.from(
                '.hero-subtitle',
                {
                    opacity: 0,
                    y: 30,
                    duration: durations.normal,
                },
                '-=0.3'
            )

            // Animate description lines
            tl.from(
                '.hero-description',
                {
                    opacity: 0,
                    y: 20,
                    duration: durations.normal,
                    stagger: 0.1,
                },
                '-=0.2'
            )
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return heroRef
}

/**
 * Hook for parallax scrolling effect
 */
export function useParallax(speed: number = 0.5) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const handleScroll = () => {
            const scrolled = window.pageYOffset
            const rate = scrolled * speed
            element.style.transform = `translate3d(0, ${rate}px, 0)`
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return elementRef
}

/**
 * Hook for scroll-triggered fade animations
 */
export function useScrollReveal() {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element || typeof window === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: durations.default,
                            ease: ease.smooth,
                        })
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        gsap.set(element, { opacity: 0, y: 50 })
        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return elementRef
}
