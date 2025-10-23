/**
 * Standard duration values for consistent animation timing
 */
export const durations = {
    // Ultra fast
    instant: 0.15,

    // Fast
    fast: 0.3,
    quick: 0.4,

    // Normal
    normal: 0.6,
    default: 0.8,

    // Slow
    slow: 1.0,
    slower: 1.5,

    // Very slow
    dramatic: 2.0,
    cinematic: 3.0,
} as const

export type DurationType = keyof typeof durations
