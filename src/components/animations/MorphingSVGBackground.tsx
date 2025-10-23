'use client'

import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface MorphingSVGBackgroundProps {
    className?: string
}

export default function MorphingSVGBackground({
    className = '',
}: MorphingSVGBackgroundProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion || !svgRef.current) return

        const paths = svgRef.current.querySelectorAll('path')

        // Define morphing shapes for each path
        const morphStates = [
            // Circle-ish shapes
            [
                'M100,200 Q150,100 200,150 T300,200 Q250,300 200,250 T100,200',
                'M150,180 Q200,120 250,160 T320,180 Q280,270 250,240 T150,180',
                'M120,220 Q180,140 230,180 T310,220 Q270,300 230,270 T120,220',
            ],
            // Blob shapes
            [
                'M400,300 Q450,200 500,250 T600,300 Q550,400 500,350 T400,300',
                'M420,280 Q480,210 520,270 T590,310 Q560,380 520,340 T420,280',
                'M410,320 Q470,230 510,280 T580,300 Q540,390 510,350 T410,320',
            ],
            // Wave shapes
            [
                'M50,400 Q100,350 150,400 T250,400 Q200,450 150,400 T50,400',
                'M60,380 Q120,340 170,390 T260,410 Q210,460 170,410 T60,380',
                'M55,420 Q110,360 160,410 T255,400 Q205,450 160,400 T55,420',
            ],
        ]

        const ctx = gsap.context(() => {
            paths.forEach((path, index) => {
                const states = morphStates[index % morphStates.length]

                gsap.to(path, {
                    attr: { d: states[1] },
                    duration: 4,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.5,
                })

                // Additional rotation animation
                gsap.to(path, {
                    rotation: 360,
                    transformOrigin: 'center',
                    duration: 20,
                    repeat: -1,
                    ease: 'linear',
                })

                // Opacity pulsing
                gsap.to(path, {
                    opacity: 0.3,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.3,
                })
            })
        }, svgRef)

        return () => ctx.revert()
    }, [prefersReducedMotion])

    return (
        <svg
            ref={svgRef}
            className={`absolute inset-0 w-full h-full pointer-events-none opacity-30 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <defs>
                <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.2"
                    />
                    <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.05"
                    />
                </linearGradient>
                <linearGradient
                    id="gradient2"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.15"
                    />
                    <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.03"
                    />
                </linearGradient>
                <linearGradient
                    id="gradient3"
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.1"
                    />
                    <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.02"
                    />
                </linearGradient>
            </defs>

            {/* Morphing shapes */}
            <path
                d="M100,200 Q150,100 200,150 T300,200 Q250,300 200,250 T100,200"
                fill="url(#gradient1)"
                opacity="0.5"
            />
            <path
                d="M400,300 Q450,200 500,250 T600,300 Q550,400 500,350 T400,300"
                fill="url(#gradient2)"
                opacity="0.5"
            />
            <path
                d="M50,400 Q100,350 150,400 T250,400 Q200,450 150,400 T50,400"
                fill="url(#gradient3)"
                opacity="0.5"
            />
        </svg>
    )
}
