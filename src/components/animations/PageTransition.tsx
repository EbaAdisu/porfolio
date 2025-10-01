'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageTransition({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        setIsTransitioning(true)

        const tl = gsap.timeline({
            onComplete: () => setIsTransitioning(false),
        })

        // Curtain slide in
        tl.from('.page-content', {
            opacity: 0,
            y: 30,
            duration: durations.normal,
            ease: ease.smooth,
        })

        return () => {
            tl.kill()
        }
    }, [pathname])

    return (
        <>
            {/* Transition Overlay */}
            {isTransitioning && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 animate-pulse" />
                </div>
            )}

            {/* Page Content */}
            <div className="page-content">{children}</div>
        </>
    )
}
