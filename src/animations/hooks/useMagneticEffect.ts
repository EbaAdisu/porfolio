'use client'

import { useEffect, useRef } from 'react'
import type { MagneticOptions } from '../utils/magnetic'
import { createMagneticEffect, createTiltEffect } from '../utils/magnetic'

/**
 * Hook for magnetic button effect
 */
export function useMagneticEffect(options?: MagneticOptions) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const cleanup = createMagneticEffect(element, options)
        return cleanup
    }, [options])

    return elementRef
}

/**
 * Hook for 3D tilt effect
 */
export function useTiltEffect(maxTilt?: number) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const cleanup = createTiltEffect(element, { maxTilt })
        return cleanup
    }, [maxTilt])

    return elementRef
}
