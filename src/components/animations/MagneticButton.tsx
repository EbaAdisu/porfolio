'use client'

import { useMagneticEffect } from '@/animations/hooks/useMagneticEffect'
import { ReactNode } from 'react'

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    strength?: number
    maxDistance?: number
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    strength = 0.3,
    maxDistance = 20,
}: MagneticButtonProps) {
    const magneticRef = useMagneticEffect({ strength, maxDistance })

    return (
        <button
            ref={magneticRef as any}
            className={`relative transition-transform ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
