'use client'

import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import { ButtonHTMLAttributes, ReactNode, useRef } from 'react'

interface ElasticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

export default function ElasticButton({
    children,
    onClick,
    variant = 'default',
    size = 'default',
    className,
    ...props
}: ElasticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!prefersReducedMotion && buttonRef.current) {
            // Elastic bounce effect
            gsap.timeline()
                .to(buttonRef.current, {
                    scale: 0.9,
                    duration: 0.1,
                    ease: 'power2.in',
                })
                .to(buttonRef.current, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'elastic.out(1.5, 0.3)',
                })
                .to(buttonRef.current, {
                    scale: 1,
                    duration: 0.1,
                    ease: 'power2.out',
                })
        }

        onClick?.(e)
    }

    const handleMouseEnter = () => {
        if (!prefersReducedMotion && buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out',
            })
        }
    }

    const handleMouseLeave = () => {
        if (!prefersReducedMotion && buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out',
            })
        }
    }

    return (
        <Button
            ref={buttonRef}
            variant={variant}
            size={size}
            className={className}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </Button>
    )
}
