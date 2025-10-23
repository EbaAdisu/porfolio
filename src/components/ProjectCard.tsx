'use client'

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
import { useEffect, useRef } from 'react'

export interface Project {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    category?: string
    githubUrl: string
    liveUrl: string
}

interface ProjectCardProps {
    project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const card = cardRef.current
        if (!card) return

        const onMouseEnter = () => {
            gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' })
        }

        const onMouseLeave = () => {
            gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' })
        }

        card.addEventListener('mouseenter', onMouseEnter)
        card.addEventListener('mouseleave', onMouseLeave)

        return () => {
            card.removeEventListener('mouseenter', onMouseEnter)
            card.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    return (
        <div ref={cardRef}>
            <Card className="flex flex-col overflow-hidden h-full">
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="relative h-40 w-full mb-4">
                        <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>
                    <p className="text-muted-foreground mb-4">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 mt-auto">
                    <Button asChild variant="outline">
                        <Link href={project.githubUrl} target="_blank">
                            GitHub
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={project.liveUrl} target="_blank">
                            Live Demo
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectCard
