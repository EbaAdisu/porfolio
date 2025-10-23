'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export default function ComingSoonBadge() {
    const badgeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (badgeRef.current) {
            // Pulsing animation
            gsap.to(badgeRef.current, {
                scale: 1.1,
                duration: 1.5,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
            })
        }

        return () => {
            gsap.killTweensOf(badgeRef.current)
        }
    }, [])

    return (
        <div
            ref={badgeRef}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold text-primary">
                Coming Soon
            </span>
        </div>
    )
}
