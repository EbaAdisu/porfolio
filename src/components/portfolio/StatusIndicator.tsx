'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Clock, PlayCircle } from 'lucide-react'

export type ProjectStatus =
    | 'completed'
    | 'in-progress'
    | 'coming-soon'
    | 'on-hold'

interface StatusIndicatorProps {
    status: ProjectStatus
    className?: string
    showIcon?: boolean
}

const statusConfig = {
    completed: {
        label: 'Completed',
        icon: CheckCircle,
        className: 'bg-green-500/10 text-green-500 border-green-500/20',
        iconClassName: 'text-green-500',
    },
    'in-progress': {
        label: 'In Progress',
        icon: PlayCircle,
        className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        iconClassName: 'text-blue-500',
    },
    'coming-soon': {
        label: 'Coming Soon',
        icon: Clock,
        className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        iconClassName: 'text-yellow-500',
    },
    'on-hold': {
        label: 'On Hold',
        icon: AlertCircle,
        className: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
        iconClassName: 'text-gray-500',
    },
}

export default function StatusIndicator({
    status,
    className,
    showIcon = true,
}: StatusIndicatorProps) {
    const config = statusConfig[status]
    const Icon = config.icon

    return (
        <Badge
            variant="outline"
            className={cn(
                'inline-flex items-center gap-1.5 text-xs font-medium',
                config.className,
                className
            )}
        >
            {showIcon && (
                <Icon className={cn('w-3 h-3', config.iconClassName)} />
            )}
            <span>{config.label}</span>
        </Badge>
    )
}
