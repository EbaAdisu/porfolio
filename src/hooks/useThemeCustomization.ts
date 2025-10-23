/**
 * Theme Customization Hook
 *
 * Manages theme customization state and operations using Zustand
 */

import { allThemes, themeRegistry } from '@/lib/theme-presets'
import {
    createThemeShareURL,
    deleteCustomTheme,
    exportTheme,
    getCurrentTheme,
    getCustomThemes,
    getThemeHistory,
    importTheme,
    saveCurrentTheme,
    saveCustomTheme,
} from '@/lib/theme-storage'
import { ThemeConfig } from '@/lib/theme-system'
import { create } from 'zustand'

interface ThemeState {
    // Current state
    currentTheme: string
    customThemes: ThemeConfig[]
    isCustomizing: boolean
    previewTheme: ThemeConfig | null
    themeHistory: string[]

    // Actions
    setTheme: (themeId: string) => void
    createCustomTheme: (theme: ThemeConfig) => boolean
    updateCustomTheme: (theme: ThemeConfig) => boolean
    removeCustomTheme: (themeId: string) => boolean
    setPreviewTheme: (theme: ThemeConfig | null) => void
    toggleCustomizing: () => void
    exportThemeAsJSON: (themeId: string) => string | null
    importThemeFromJSON: (json: string) => boolean
    getShareURL: (themeId: string) => string | null
    loadCustomThemes: () => void
    loadThemeHistory: () => void
    initialize: () => void
}

export const useThemeCustomization = create<ThemeState>((set, get) => ({
    // Initial state
    currentTheme: 'dark',
    customThemes: [],
    isCustomizing: false,
    previewTheme: null,
    themeHistory: [],

    // Set current theme
    setTheme: (themeId: string) => {
        saveCurrentTheme(themeId)
        set({ currentTheme: themeId })
        get().loadThemeHistory()
    },

    // Create a new custom theme
    createCustomTheme: (theme: ThemeConfig) => {
        const success = saveCustomTheme(theme)
        if (success) {
            get().loadCustomThemes()
            return true
        }
        return false
    },

    // Update an existing custom theme
    updateCustomTheme: (theme: ThemeConfig) => {
        const success = saveCustomTheme(theme)
        if (success) {
            get().loadCustomThemes()
            return true
        }
        return false
    },

    // Remove a custom theme
    removeCustomTheme: (themeId: string) => {
        const success = deleteCustomTheme(themeId)
        if (success) {
            get().loadCustomThemes()

            // If current theme is deleted, switch to default
            if (get().currentTheme === themeId) {
                get().setTheme('dark')
            }

            return true
        }
        return false
    },

    // Set preview theme
    setPreviewTheme: (theme: ThemeConfig | null) => {
        set({ previewTheme: theme })
    },

    // Toggle customizing mode
    toggleCustomizing: () => {
        set((state) => ({ isCustomizing: !state.isCustomizing }))
    },

    // Export theme as JSON
    exportThemeAsJSON: (themeId: string) => {
        // Check preset themes
        const presetTheme = themeRegistry[themeId]
        if (presetTheme) {
            return exportTheme(presetTheme)
        }

        // Check custom themes
        const customTheme = get().customThemes.find((t) => t.id === themeId)
        if (customTheme) {
            return exportTheme(customTheme)
        }

        return null
    },

    // Import theme from JSON
    importThemeFromJSON: (json: string) => {
        const theme = importTheme(json)
        if (!theme) return false

        return get().createCustomTheme(theme)
    },

    // Get shareable URL for theme
    getShareURL: (themeId: string) => {
        // Check preset themes
        const presetTheme = themeRegistry[themeId]
        if (presetTheme) {
            return createThemeShareURL(presetTheme)
        }

        // Check custom themes
        const customTheme = get().customThemes.find((t) => t.id === themeId)
        if (customTheme) {
            return createThemeShareURL(customTheme)
        }

        return null
    },

    // Load custom themes from storage
    loadCustomThemes: () => {
        const customThemes = getCustomThemes()
        set({ customThemes })
    },

    // Load theme history from storage
    loadThemeHistory: () => {
        const themeHistory = getThemeHistory()
        set({ themeHistory })
    },

    // Initialize the store
    initialize: () => {
        // Load current theme
        const currentTheme = getCurrentTheme() || 'dark'
        set({ currentTheme })

        // Load custom themes
        get().loadCustomThemes()

        // Load theme history
        get().loadThemeHistory()
    },
}))

/**
 * Hook to get all available themes (preset + custom)
 */
export function useAllThemes(): ThemeConfig[] {
    const { customThemes } = useThemeCustomization()
    return [...allThemes, ...customThemes]
}

/**
 * Hook to get a specific theme by ID
 */
export function useTheme(themeId: string): ThemeConfig | null {
    const { customThemes } = useThemeCustomization()

    // Check preset themes
    const presetTheme = themeRegistry[themeId]
    if (presetTheme) return presetTheme

    // Check custom themes
    const customTheme = customThemes.find((t) => t.id === themeId)
    if (customTheme) return customTheme

    return null
}

/**
 * Hook to check if a theme is custom
 */
export function useIsCustomTheme(themeId: string): boolean {
    const { customThemes } = useThemeCustomization()
    return customThemes.some((t) => t.id === themeId)
}
