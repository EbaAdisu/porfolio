'use client'

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
            // Simple fade in animation with fallback values
            gsap.fromTo(
                contentRef.current,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                }
            )
        }, contentRef)

        return () => ctx.revert()
    }, [pathname])

    return <div ref={contentRef}>{children}</div>
}
