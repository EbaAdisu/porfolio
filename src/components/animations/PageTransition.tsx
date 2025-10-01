'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageTransition({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!contentRef.current) return

        const ctx = gsap.context(() => {
            // Simple fade in animation
            gsap.fromTo(
                contentRef.current,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: durations.normal || 0.6,
                    ease: ease.smooth || 'power2.out',
                }
            )
        }, contentRef)

        return () => ctx.revert()
    }, [pathname])

    return <div ref={contentRef}>{children}</div>
}
