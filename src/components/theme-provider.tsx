'use client'

import { useThemeCustomization } from '@/hooks/useThemeCustomization'
import { themeRegistry } from '@/lib/theme-presets'
import { getCustomThemeFromURL, getThemeFromURL } from '@/lib/theme-storage'
import { applyTheme, getThemeMode, ThemeConfig } from '@/lib/theme-system'
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
    const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme()
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
        let themeConfig: ThemeConfig | undefined = themeRegistry[currentTheme]

        // If not found in presets, check custom themes
        if (!themeConfig) {
            console.log('🔍 Checking custom themes...')
            themeConfig = customThemes.find((t) => t.id === currentTheme)
        }

        if (themeConfig) {
            console.log('✨ Found theme config:', themeConfig.name)

            // Determine base theme (light/dark) for next-themes
            const baseTheme = getThemeMode(themeConfig)
            console.log('🎨 Setting base theme to:', baseTheme)

            // Update next-themes to set correct base class
            if (setNextTheme) {
                setNextTheme(baseTheme)
            }

            // Apply theme CSS variables
            applyTheme(themeConfig)
        } else {
            console.warn('⚠️ Theme not found:', currentTheme)
        }
    }, [currentTheme, customThemes, isInitialized, setNextTheme])

    // Sync with next-themes only for direct theme changes
    // Don't sync when nextTheme is just 'light' or 'dark' for base styling
    React.useEffect(() => {
        if (!isInitialized) return

        // Only sync if user directly selected 'light' or 'dark' AND currentTheme is also 'light' or 'dark'
        // This prevents overriding custom themes when we set light/dark for base styling
        if (nextTheme && (nextTheme === 'light' || nextTheme === 'dark')) {
            // Only apply if current theme is not a custom theme
            const isCustomTheme =
                currentTheme !== 'light' && currentTheme !== 'dark'
            if (!isCustomTheme && nextTheme !== currentTheme) {
                setTheme(nextTheme)
            }
        }
    }, [nextTheme, currentTheme, setTheme, isInitialized])

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
