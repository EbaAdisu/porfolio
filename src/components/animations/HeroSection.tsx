'use client'

import {
    useHeroAnimation,
    useParallax,
} from '@/animations/hooks/useHeroAnimation'
import { useMagneticEffect } from '@/animations/hooks/useMagneticEffect'

interface HeroSectionProps {
    name: string
    description: string
}

const MAGNETIC_OPTIONS = { strength: 0.2, maxDistance: 15 }

export default function HeroSection({ name, description }: HeroSectionProps) {
    const heroRef = useHeroAnimation()
    const particleRef = useParallax(-0.3)
    const nameRef = useMagneticEffect(MAGNETIC_OPTIONS)

    return (
        <section
            ref={heroRef}
            className="relative text-center my-16 overflow-hidden min-h-[60vh] flex items-center justify-center"
        >
            {/* Simplified Hero Content - No complex animations for now */}
            <div className="relative z-10 px-4">
                {/* Simple Name Display */}
                <div className="mb-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary">
                        {name}
                    </h1>
                </div>

                {/* Subtitle */}
                <div className="mb-4">
                    <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                        Software Engineer & Tech Enthusiast
                    </p>
                </div>

                {/* Description */}
                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Simple Scroll Indicator */}
                <div className="mt-12">
                    <div className="w-6 h-10 border-2 border-primary rounded-full mx-auto relative">
                        <div className="w-1.5 h-3 bg-primary rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
                    </div>
                </div>
            </div>
        </section>
    )
}
