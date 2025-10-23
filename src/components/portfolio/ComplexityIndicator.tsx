'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

export type ProjectComplexity =
    | 'beginner'
    | 'intermediate'
    | 'advanced'
    | 'expert'

interface ComplexityIndicatorProps {
    complexity: ProjectComplexity
    className?: string
    showStars?: boolean
}

const complexityConfig = {
    beginner: {
        label: 'Beginner',
        stars: 1,
        className: 'bg-green-500/10 text-green-500 border-green-500/20',
        iconClassName: 'text-green-500',
    },
    intermediate: {
        label: 'Intermediate',
        stars: 2,
        className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        iconClassName: 'text-yellow-500',
    },
    advanced: {
        label: 'Advanced',
        stars: 3,
        className: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
        iconClassName: 'text-orange-500',
    },
    expert: {
        label: 'Expert',
        stars: 4,
        className: 'bg-red-500/10 text-red-500 border-red-500/20',
        iconClassName: 'text-red-500',
    },
}

export default function ComplexityIndicator({
    complexity,
    className,
    showStars = true,
}: ComplexityIndicatorProps) {
    const config = complexityConfig[complexity]

    return (
        <Badge
            variant="outline"
            className={cn(
                'inline-flex items-center gap-1.5 text-xs font-medium',
                config.className,
                className
            )}
        >
            {showStars && (
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 4 }, (_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                'w-3 h-3',
                                i < config.stars
                                    ? config.iconClassName
                                    : 'text-gray-300'
                            )}
                            fill={i < config.stars ? 'currentColor' : 'none'}
                        />
                    ))}
                </div>
            )}
            <span>{config.label}</span>
        </Badge>
    )
}
