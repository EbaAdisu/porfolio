'use client'

import { useEffect, useRef } from 'react'
import type { MagneticOptions } from '../utils/magnetic'
import { createMagneticEffect, createTiltEffect } from '../utils/magnetic'

/**
 * Hook for magnetic button effect
 */
export function useMagneticEffect(options?: MagneticOptions) {
    const elementRef = useRef<HTMLElement>(null)
    const optionsRef = useRef(options)

    // Update options ref when options change
    useEffect(() => {
        optionsRef.current = options
    }, [options])

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const cleanup = createMagneticEffect(element, optionsRef.current)
        return cleanup
    }, []) // Empty dependency array to prevent re-runs

    return elementRef
}

/**
 * Hook for 3D tilt effect
 */
export function useTiltEffect(maxTilt?: number) {
    const elementRef = useRef<HTMLElement>(null)
    const maxTiltRef = useRef(maxTilt)

    // Update maxTilt ref when maxTilt changes
    useEffect(() => {
        maxTiltRef.current = maxTilt
    }, [maxTilt])

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const cleanup = createTiltEffect(element, {
            maxTilt: maxTiltRef.current,
        })
        return cleanup
    }, []) // Empty dependency array to prevent re-runs

    return elementRef
}
