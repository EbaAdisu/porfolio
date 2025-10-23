/**
 * Predefined easing functions for consistent animations
 */
export const ease = {
    // Smooth and natural
    default: 'power3.out',
    smooth: 'power2.inOut',

    // Bouncy and playful
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'bounce.out',

    // Sharp and snappy
    sharp: 'power4.out',
    snap: 'back.out(1.7)',

    // Slow and dramatic
    slow: 'power1.inOut',
    dramatic: 'expo.out',
} as const

export type EaseType = keyof typeof ease
