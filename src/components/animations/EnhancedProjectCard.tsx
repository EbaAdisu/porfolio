'use client'

import { useScrollReveal } from '@/animations/hooks/useHeroAnimation'
import { useTiltEffect } from '@/animations/hooks/useMagneticEffect'
import { Project } from '@/components/ProjectCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface EnhancedProjectCardProps {
    project: Project
}

export default function EnhancedProjectCard({
    project,
}: EnhancedProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const tiltRef = useTiltEffect(10)
    const revealRef = useScrollReveal()

    useEffect(() => {
        const card = cardRef.current
        const image = imageRef.current
        if (!card || !image) return

        const onMouseEnter = () => {
            setIsHovered(true)
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                duration: 0.3,
                ease: 'power2.out',
            })
            gsap.to(image, {
                scale: 1.1,
                duration: 0.4,
                ease: 'power2.out',
            })
        }

        const onMouseLeave = () => {
            setIsHovered(false)
            gsap.to(card, {
                y: 0,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out',
            })
            gsap.to(image, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
            })
        }

        card.addEventListener('mouseenter', onMouseEnter)
        card.addEventListener('mouseleave', onMouseLeave)

        return () => {
            card.removeEventListener('mouseenter', onMouseEnter)
            card.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    return (
        <div
            ref={(el) => {
                if (el) {
                    ;(revealRef as any).current = el
                    ;(tiltRef as any).current = el
                }
            }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <Card
                ref={cardRef}
                className="flex flex-col overflow-hidden h-full relative transition-all duration-300 border-2"
                style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            >
                {/* Gradient Border Effect */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r from-primary/50 via-purple-500/50 to-pink-500/50 rounded-lg transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transform: 'translateZ(-1px)' }}
                />

                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{project.title}</span>
                        {project.category && (
                            <Badge variant="secondary" className="text-xs">
                                {project.category}
                            </Badge>
                        )}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                    {/* Image with Parallax */}
                    <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
                        <div ref={imageRef} className="relative h-full w-full">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        {/* Overlay on Hover */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-sm font-medium">
                                    View Details
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                        {project.description}
                    </p>

                    {/* Tags with Stagger Animation */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                            <span
                                key={tag}
                                className="tag text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 mt-auto">
                    <Button asChild variant="outline" size="sm">
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </Link>
                    </Button>
                    <Button asChild size="sm">
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
