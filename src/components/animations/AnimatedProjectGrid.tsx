'use client'

import { Project } from '@/components/ProjectCard'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedProjectGridProps {
    projects: Project[]
    children: React.ReactNode
    className?: string
}

export default function AnimatedProjectGrid({
    projects,
    children,
    className = '',
}: AnimatedProjectGridProps) {
    const gridRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const grid = gridRef.current
        if (!grid) return

        // Get all project cards
        const cards = grid.querySelectorAll('[data-project-card]')

        // Set initial state
        gsap.set(cards, {
            opacity: 0,
            y: 50,
            scale: 0.9,
        })

        // Create entrance animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            },
        })

        tl.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
        })

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === grid) {
                    trigger.kill()
                }
            })
        }
    }, [projects])

    // Handle grid transitions when projects change
    useEffect(() => {
        const grid = gridRef.current
        if (!grid || isAnimating) return

        setIsAnimating(true)

        const cards = grid.querySelectorAll('[data-project-card]')

        // Exit animation
        const exitTl = gsap.timeline()
        exitTl.to(cards, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in',
        })

        // Reorder and enter animation
        exitTl.call(() => {
            // Force reflow to ensure DOM updates
            grid.offsetHeight

            const newCards = grid.querySelectorAll('[data-project-card]')
            gsap.set(newCards, {
                opacity: 0,
                y: 50,
                scale: 0.9,
            })

            gsap.to(newCards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power2.out',
                onComplete: () => setIsAnimating(false),
            })
        })
    }, [projects, isAnimating])

    return (
        <div
            ref={gridRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
            style={{ minHeight: '200px' }}
        >
            {children}
        </div>
    )
}

// Masonry layout component for varied card heights
export function MasonryProjectGrid({
    projects,
    children,
    className = '',
}: AnimatedProjectGridProps) {
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const grid = gridRef.current
        if (!grid) return

        // Apply masonry layout using CSS Grid
        const cards = grid.querySelectorAll('[data-project-card]')

        // Set up masonry columns
        const setupMasonry = () => {
            const containerWidth = grid.offsetWidth
            const cardWidth = 300 // Approximate card width
            const gap = 32 // Gap between cards
            const columns = Math.floor(
                (containerWidth + gap) / (cardWidth + gap)
            )

            grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
            grid.style.gridAutoRows = 'min-content'
        }

        setupMasonry()
        window.addEventListener('resize', setupMasonry)

        // Animate cards as they come into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const card = entry.target as HTMLElement
                        gsap.fromTo(
                            card,
                            {
                                opacity: 0,
                                y: 50,
                                scale: 0.9,
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.6,
                                ease: 'power2.out',
                            }
                        )
                        observer.unobserve(card)
                    }
                })
            },
            { threshold: 0.1 }
        )

        cards.forEach((card) => observer.observe(card))

        return () => {
            window.removeEventListener('resize', setupMasonry)
            observer.disconnect()
        }
    }, [projects])

    return (
        <div
            ref={gridRef}
            className={`grid gap-8 ${className}`}
            style={{
                gridAutoRows: 'min-content',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
        >
            {children}
        </div>
    )
}
