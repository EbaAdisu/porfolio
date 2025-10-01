'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface TimelineItem {
    id: number
    title: string
    subtitle: string
    date: string
    description: string
}

interface AnimatedTimelineProps {
    items: TimelineItem[]
}

export default function AnimatedTimeline({ items }: AnimatedTimelineProps) {
    const timelineRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!timelineRef.current || !lineRef.current) return

        const ctx = gsap.context(() => {
            // Animate timeline line
            gsap.from(lineRef.current, {
                scaleY: 0,
                transformOrigin: 'top',
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                },
            })

            // Animate each timeline item
            const items =
                timelineRef.current?.querySelectorAll('.timeline-item')
            items?.forEach((item, index) => {
                const isLeft = index % 2 === 0

                gsap.from(item, {
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                    duration: durations.default,
                    ease: ease.smooth,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                })

                // Animate the dot
                const dot = item.querySelector('.timeline-dot')
                gsap.from(dot, {
                    scale: 0,
                    duration: durations.fast,
                    ease: ease.snap,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                })
            })
        }, timelineRef)

        return () => ctx.revert()
    }, [items])

    return (
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div
                ref={lineRef}
                className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2"
            />

            {/* Timeline Items */}
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="timeline-item relative mb-12 flex items-center"
                >
                    {/* Content */}
                    <div
                        className={`w-5/12 ${
                            index % 2 === 0 ? 'pr-8 text-right' : 'ml-auto pl-8'
                        }`}
                    >
                        <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold mb-1">
                                {item.title}
                            </h3>
                            <h4 className="text-md text-primary font-semibold mb-2">
                                {item.subtitle}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                                {item.date}
                            </p>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>

                    {/* Dot */}
                    <div className="timeline-dot absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                </div>
            ))}
        </div>
    )
}
