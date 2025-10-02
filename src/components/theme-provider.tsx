'use client'

import { useThemeCustomization } from '@/hooks/useThemeCustomization'
import { themeRegistry } from '@/lib/theme-presets'
import { getCustomThemeFromURL, getThemeFromURL } from '@/lib/theme-storage'
import { applyTheme } from '@/lib/theme-system'
import {
    ThemeProvider as NextThemesProvider,
    useTheme as useNextTheme,
    type ThemeProviderProps,
} from 'next-themes'
import * as React from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <EnhancedThemeProvider>{children}</EnhancedThemeProvider>
        </NextThemesProvider>
    )
}

/**
 * Enhanced Theme Provider
 * Handles custom themes and applies them with animations
 */
function EnhancedThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme: nextTheme } = useNextTheme()
    const {
        currentTheme,
        customThemes,
        setTheme,
        initialize,
        createCustomTheme,
    } = useThemeCustomization()
    const [isInitialized, setIsInitialized] = React.useState(false)

    // Initialize theme system
    React.useEffect(() => {
        // Initialize store
        initialize()

        // Check URL for theme
        const urlThemeId = getThemeFromURL()
        const urlCustomTheme = getCustomThemeFromURL()

        if (urlCustomTheme) {
            // Import custom theme from URL
            createCustomTheme(urlCustomTheme)
            setTheme(urlCustomTheme.id)
        } else if (urlThemeId) {
            // Apply theme from URL
            setTheme(urlThemeId)
        }

        setIsInitialized(true)
    }, [initialize, setTheme, createCustomTheme])

    // Apply theme when it changes
    React.useEffect(() => {
        if (!isInitialized) return

        console.log('🔄 Theme changed to:', currentTheme)

        // Get theme config from preset themes
        let themeConfig = themeRegistry[currentTheme]

        // If not found in presets, check custom themes
        if (!themeConfig) {
            console.log('🔍 Checking custom themes...')
            themeConfig = customThemes.find((t) => t.id === currentTheme)
        }

        if (themeConfig) {
            console.log('✨ Found theme config:', themeConfig.name)
            // Apply theme CSS variables
            applyTheme(themeConfig)
        } else {
            console.warn('⚠️ Theme not found:', currentTheme)
        }
    }, [currentTheme, customThemes, isInitialized])

    // Sync with next-themes
    React.useEffect(() => {
        if (nextTheme && nextTheme !== currentTheme) {
            // Only sync if it's a preset theme
            if (themeRegistry[nextTheme]) {
                setTheme(nextTheme)
            }
        }
    }, [nextTheme, currentTheme, setTheme])

    return <>{children}</>
}

/**
 * Hook to access enhanced theme functionality
 */
export function useEnhancedTheme() {
    const nextTheme = useNextTheme()
    const customization = useThemeCustomization()

    return {
        ...nextTheme,
        ...customization,
    }
}
