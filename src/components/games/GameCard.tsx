'use client'

import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import ElasticButton from '../animations/ElasticButton'

interface GameCardProps {
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    players: string
    thumbnail?: string
    onPlay: () => void
}

export default function GameCard({
    title,
    description,
    difficulty,
    players,
    onPlay,
}: GameCardProps) {
    const difficultyColors = {
        Easy: 'bg-green-500/10 text-green-500 border-green-500/20',
        Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        Hard: 'bg-red-500/10 text-red-500 border-red-500/20',
    }

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 group">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {title}
                    </CardTitle>
                    <Badge
                        className={difficultyColors[difficulty]}
                        variant="outline"
                    >
                        {difficulty}
                    </Badge>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>👥 {players}</span>
                </div>
            </CardContent>
            <CardFooter>
                <ElasticButton onClick={onPlay} className="w-full" size="lg">
                    Play Game 🎮
                </ElasticButton>
            </CardFooter>
        </Card>
    )
}
