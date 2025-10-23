/**
 * Magnetic effect utilities for interactive elements
 */

export interface MagneticOptions {
    strength?: number // How strongly the element follows the cursor (0-1)
    maxDistance?: number // Maximum distance from center to move (in pixels)
    ease?: number // Easing factor for smooth movement (0-1)
}

const defaultOptions: Required<MagneticOptions> = {
    strength: 0.3,
    maxDistance: 20,
    ease: 0.15,
}

/**
 * Creates a magnetic effect on an element that follows the cursor
 */
export function createMagneticEffect(
    element: HTMLElement,
    options: MagneticOptions = {}
) {
    const opts = { ...defaultOptions, ...options }
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate distance from center
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY

        // Calculate angle and distance
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        // Clamp the movement
        const clampedDistance = Math.min(distance, opts.maxDistance)
        const scale = clampedDistance / distance || 0

        // Set target position
        targetX = deltaX * scale * opts.strength
        targetY = deltaY * scale * opts.strength
    }

    const handleMouseLeave = () => {
        targetX = 0
        targetY = 0
    }

    const animate = () => {
        // Smooth easing
        currentX += (targetX - currentX) * opts.ease
        currentY += (targetY - currentY) * opts.ease

        // Apply transform
        element.style.transform = `translate(${currentX}px, ${currentY}px)`

        animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation loop
    animationFrameId = requestAnimationFrame(animate)

    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    // Return cleanup function
    return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
        cancelAnimationFrame(animationFrameId)
        element.style.transform = ''
    }
}

/**
 * Creates a 3D tilt effect on an element based on mouse position
 */
export function createTiltEffect(
    element: HTMLElement,
    options: { maxTilt?: number } = {}
) {
    const maxTilt = options.maxTilt || 15

    const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * maxTilt
        const rotateY = ((centerX - x) / centerX) * maxTilt

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    }

    const handleMouseLeave = () => {
        element.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
        element.style.transform = ''
    }
}
