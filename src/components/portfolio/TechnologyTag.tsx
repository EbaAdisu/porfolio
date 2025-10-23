'use client'

import { Badge } from '@/components/ui/badge'
import { getTechnologyIcon } from '@/data/technology-icons'
import { cn } from '@/lib/utils'

interface TechnologyTagProps {
    technology: string
    onClick?: (tech: string) => void
    className?: string
    variant?: 'default' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
}

export default function TechnologyTag({
    technology,
    onClick,
    className,
    variant = 'secondary',
    size = 'sm',
}: TechnologyTagProps) {
    const icon = getTechnologyIcon(technology)

    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2',
    }

    return (
        <Badge
            variant={variant}
            className={cn(
                'inline-flex items-center gap-1.5 transition-all duration-200',
                sizeClasses[size],
                onClick && 'cursor-pointer hover:scale-105 hover:shadow-md',
                className
            )}
            onClick={() => onClick?.(technology)}
        >
            <span className="text-sm">{icon}</span>
            <span>{technology}</span>
        </Badge>
    )
}
