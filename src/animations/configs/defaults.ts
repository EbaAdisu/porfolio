import { durations } from './durations'
import { ease } from './ease'

/**
 * Default animation configurations
 */
export const defaults = {
    // Fade animations
    fadeIn: {
        opacity: 1,
        duration: durations.default,
        ease: ease.default,
    },

    fadeOut: {
        opacity: 0,
        duration: durations.fast,
        ease: ease.smooth,
    },

    // Slide animations
    slideUp: {
        y: 0,
        opacity: 1,
        duration: durations.default,
        ease: ease.default,
    },

    slideDown: {
        y: 0,
        opacity: 1,
        duration: durations.default,
        ease: ease.default,
    },

    // Scale animations
    scaleIn: {
        scale: 1,
        opacity: 1,
        duration: durations.default,
        ease: ease.snap,
    },

    scaleOut: {
        scale: 0.95,
        opacity: 0,
        duration: durations.fast,
        ease: ease.smooth,
    },

    // Stagger delays
    stagger: {
        minimal: 0.05,
        small: 0.1,
        default: 0.15,
        large: 0.2,
    },
} as const

// Initial states for entrance animations
export const initialStates = {
    hidden: {
        opacity: 0,
    },

    slideUpHidden: {
        opacity: 0,
        y: 50,
    },

    slideDownHidden: {
        opacity: 0,
        y: -50,
    },

    slideLeftHidden: {
        opacity: 0,
        x: -50,
    },

    slideRightHidden: {
        opacity: 0,
        x: 50,
    },

    scaleHidden: {
        opacity: 0,
        scale: 0.8,
    },
} as const
