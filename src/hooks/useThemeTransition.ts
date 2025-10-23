/**
 * Theme Transition Hook
 *
 * Handles smooth theme transitions using GSAP
 */

import { ThemeConfig, applyTheme } from '@/lib/theme-system'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface UseThemeTransitionOptions {
    duration?: number
    easing?: string
    onStart?: () => void
    onComplete?: () => void
}

/**
 * Hook to apply theme with smooth transition
 */
export function useThemeTransition(
    theme: ThemeConfig | null,
    options: UseThemeTransitionOptions = {}
) {
    const {
        duration = 0.5,
        easing = 'power2.inOut',
        onStart,
        onComplete,
    } = options

    const isTransitioning = useRef(false)

    useEffect(() => {
        if (!theme || isTransitioning.current) return

        isTransitioning.current = true
        onStart?.()

        // Create overlay for smooth transition
        const overlay = document.createElement('div')
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${theme.colors.background};
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
    `
        document.body.appendChild(overlay)

        // Fade in overlay
        gsap.to(overlay, {
            opacity: 0.3,
            duration: duration / 2,
            ease: easing,
            onComplete: () => {
                // Apply theme at peak of transition
                applyTheme(theme)

                // Fade out overlay
                gsap.to(overlay, {
                    opacity: 0,
                    duration: duration / 2,
                    ease: easing,
                    onComplete: () => {
                        document.body.removeChild(overlay)
                        isTransitioning.current = false
                        onComplete?.()
                    },
                })
            },
        })
    }, [theme, duration, easing, onStart, onComplete])

    return { isTransitioning: isTransitioning.current }
}

/**
 * Hook to apply theme with color morphing effect
 */
export function useThemeColorMorph(theme: ThemeConfig | null, duration = 0.8) {
    useEffect(() => {
        if (!theme) return

        const root = document.documentElement

        // Get current computed colors
        const currentBg =
            getComputedStyle(root).getPropertyValue('--background')
        const currentFg =
            getComputedStyle(root).getPropertyValue('--foreground')

        // Create temporary div to compute target colors
        const temp = document.createElement('div')
        temp.style.cssText = `
      position: absolute;
      opacity: 0;
      pointer-events: none;
    `
        Object.entries(theme.colors).forEach(([key, value]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
            temp.style.setProperty(`--${cssKey}`, value)
        })
        document.body.appendChild(temp)

        const targetBg = getComputedStyle(temp).getPropertyValue('--background')
        const targetFg = getComputedStyle(temp).getPropertyValue('--foreground')

        document.body.removeChild(temp)

        // Animate color transition
        gsap.to(root, {
            duration,
            ease: 'power2.inOut',
            '--background': targetBg || theme.colors.background,
            '--foreground': targetFg || theme.colors.foreground,
            onUpdate: () => {
                // Apply other colors gradually
                Object.entries(theme.colors).forEach(([key, value]) => {
                    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
                    root.style.setProperty(`--${cssKey}`, value)
                })
            },
        })
    }, [theme, duration])
}

/**
 * Hook to prevent flash of unstyled content (FOUC)
 */
export function usePreventFOUC(themeId: string) {
    useEffect(() => {
        // Add class to body immediately
        document.body.classList.add('theme-loading')

        // Remove after a short delay to allow theme to apply
        const timer = setTimeout(() => {
            document.body.classList.remove('theme-loading')
        }, 100)

        return () => clearTimeout(timer)
    }, [themeId])
}

/**
 * Hook to animate theme switch with loading state
 */
export function useThemeLoadingState() {
    const isLoading = useRef(false)

    const showLoading = () => {
        isLoading.current = true
        document.body.classList.add('theme-switching')
    }

    const hideLoading = () => {
        isLoading.current = false
        document.body.classList.remove('theme-switching')
    }

    return { isLoading: isLoading.current, showLoading, hideLoading }
}

/**
 * Hook to add transition curtain effect
 */
export function useThemeCurtain(theme: ThemeConfig | null) {
    useEffect(() => {
        if (!theme) return

        const curtain = document.createElement('div')
        curtain.className = 'theme-curtain'
        curtain.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        ${theme.colors.primary},
        ${theme.colors.accent}
      );
      transform: translateY(-100%);
      z-index: 9999;
      pointer-events: none;
    `
        document.body.appendChild(curtain)

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.removeChild(curtain)
            },
        })

        tl.to(curtain, {
            transform: 'translateY(0%)',
            duration: 0.4,
            ease: 'power2.in',
        })
            .call(() => {
                applyTheme(theme)
            })
            .to(curtain, {
                transform: 'translateY(100%)',
                duration: 0.4,
                ease: 'power2.out',
            })
    }, [theme])
}
