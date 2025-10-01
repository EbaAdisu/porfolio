'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { splitTextIntoChars } from '@/animations/utils/splitText'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface SplitTextAnimationProps {
    text: string
    className?: string
    delay?: number
    stagger?: number
    as?: keyof JSX.IntrinsicElements
}

export default function SplitTextAnimation({
    text,
    className = '',
    delay = 0,
    stagger = 0.02,
    as: Component = 'div',
}: SplitTextAnimationProps) {
    const textRef = useRef<HTMLElement>(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!textRef.current || hasAnimated.current) return
        hasAnimated.current = true

        const element = textRef.current
        element.innerHTML = splitTextIntoChars(text)

        gsap.from(element.querySelectorAll('.char'), {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: stagger,
            duration: durations.default,
            ease: ease.snap,
            delay: delay,
        })
    }, [text, delay, stagger])

    return <Component ref={textRef as any} className={className} />
}
