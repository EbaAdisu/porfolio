'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PageTransition({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    useEffect(() => {
        const tl = gsap.timeline()

        // Simple page content animation
        tl.from('.page-content', {
            opacity: 0,
            y: 20,
            duration: durations.normal || 0.6,
            ease: ease.smooth || 'power2.out',
        })

        return () => {
            tl.kill()
        }
    }, [pathname])

    return (
        <div className="page-content">
            {children}
        </div>
    )
}
