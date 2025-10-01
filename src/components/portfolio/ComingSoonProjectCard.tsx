'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { ComingSoonProject } from '@/data/project-categories'
import { BookOpen, Clock, Code2, Github, Layers } from 'lucide-react'
import { memo } from 'react'
import ComingSoonBadge from './ComingSoonBadge'

interface ComingSoonProjectCardProps {
    project: ComingSoonProject
}

const ComingSoonProjectCard = memo(function ComingSoonProjectCard({
    project,
}: ComingSoonProjectCardProps) {
    const difficultyColor = {
        Beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
        Intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        Advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
    }

    return (
        <Card className="flex flex-col h-full opacity-75 hover:opacity-100 transition-opacity border-dashed">
            <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <ComingSoonBadge />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                </p>
            </CardHeader>

            <CardContent className="flex-grow space-y-4">
                {/* Difficulty & Time */}
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-muted-foreground" />
                        <Badge
                            variant="outline"
                            className={difficultyColor[project.difficulty]}
                        >
                            {project.difficulty}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{project.estimatedTime}</span>
                    </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                        >
                            {tech}
                        </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4}
                        </Badge>
                    )}
                </div>

                {/* Features */}
                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <Code2 className="w-4 h-4 text-muted-foreground" />
                        <h4 className="text-sm font-semibold">Key Features</h4>
                    </div>
                    <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                            <li
                                key={idx}
                                className="text-xs text-muted-foreground flex items-start gap-1.5"
                            >
                                <span className="text-primary mt-0.5">•</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1" disabled>
                    <Github className="w-4 h-4 mr-2" />
                    Repository
                </Button>
                <Button variant="ghost" className="flex-1" disabled>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                </Button>
            </CardFooter>
        </Card>
    )
})

export default ComingSoonProjectCard
