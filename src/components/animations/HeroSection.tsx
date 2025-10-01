'use client'

import {
    useHeroAnimation,
    useParallax,
} from '@/animations/hooks/useHeroAnimation'
import { useMagneticEffect } from '@/animations/hooks/useMagneticEffect'
import GlitchText from './GlitchText'
import ParticleSystem from './ParticleSystem'

interface HeroSectionProps {
    name: string
    description: string
}

export default function HeroSection({ name, description }: HeroSectionProps) {
    const heroRef = useHeroAnimation()
    const particleRef = useParallax(-0.3)
    const nameRef = useMagneticEffect({ strength: 0.2, maxDistance: 15 })

    return (
        <section
            ref={heroRef}
            className="relative text-center my-16 overflow-hidden min-h-[60vh] flex items-center justify-center"
        >
            {/* Particle Background */}
            <div ref={particleRef as any} className="absolute inset-0 -z-10">
                <ParticleSystem particleCount={50} />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/50 to-background" />

            {/* Hero Content */}
            <div className="relative z-10 px-4">
                {/* Animated Name with Magnetic Effect and Glitch */}
                <div ref={nameRef as any} className="inline-block mb-4">
                    <GlitchText
                        text={name}
                        className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
                    />
                </div>

                {/* Subtitle */}
                <div className="hero-subtitle mb-4">
                    <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                        Software Engineer & Tech Enthusiast
                    </p>
                </div>

                {/* Description */}
                <div className="hero-description max-w-3xl mx-auto">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="mt-12 animate-bounce">
                    <div className="w-6 h-10 border-2 border-primary rounded-full mx-auto relative">
                        <div className="w-1.5 h-3 bg-primary rounded-full absolute left-1/2 top-2 -translate-x-1/2 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    )
}
