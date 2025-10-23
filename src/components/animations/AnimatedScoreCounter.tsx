'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

interface AnimatedScoreCounterProps {
    score: number
    label?: string
    className?: string
}

export default function AnimatedScoreCounter({
    score,
    label = 'Score',
    className = '',
}: AnimatedScoreCounterProps) {
    const [displayScore, setDisplayScore] = useState(0)
    const scoreRef = useRef<HTMLDivElement>(null)
    const prevScoreRef = useRef(0)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayScore(score)
            return
        }

        const obj = { value: prevScoreRef.current }

        // Animate number counting up
        gsap.to(obj, {
            value: score,
            duration: durations.default,
            ease: ease.smooth,
            onUpdate: () => {
                setDisplayScore(Math.round(obj.value))
            },
        })

        // Pop animation when score increases
        if (score > prevScoreRef.current && scoreRef.current) {
            gsap.timeline()
                .to(scoreRef.current, {
                    scale: 1.3,
                    color: '#10b981',
                    duration: durations.fast,
                    ease: ease.snap,
                })
                .to(scoreRef.current, {
                    scale: 1,
                    color: 'inherit',
                    duration: durations.fast,
                    ease: ease.smooth,
                })
        }

        prevScoreRef.current = score
    }, [score, prefersReducedMotion])

    return (
        <div className={`text-center ${className}`}>
            <div className="text-sm text-muted-foreground mb-1">{label}</div>
            <div
                ref={scoreRef}
                className="text-4xl font-bold tabular-nums"
                style={{ fontFeatureSettings: '"tnum"' }}
            >
                {displayScore}
            </div>
        </div>
    )
}
