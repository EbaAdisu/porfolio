/**
 * Theme Storage Utility
 *
 * Handles persistence of theme preferences and custom themes
 */

import { ThemeConfig } from './theme-system'

const STORAGE_KEYS = {
    CURRENT_THEME: 'portfolio-current-theme',
    CUSTOM_THEMES: 'portfolio-custom-themes',
    THEME_HISTORY: 'portfolio-theme-history',
} as const

const MAX_HISTORY_LENGTH = 5
const MAX_CUSTOM_THEMES = 10

// ============================================================================
// Current Theme
// ============================================================================

/**
 * Saves the current theme ID to localStorage
 */
export function saveCurrentTheme(themeId: string): void {
    try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, themeId)
        addToHistory(themeId)
    } catch (error) {
        console.error('Failed to save current theme:', error)
    }
}

/**
 * Gets the current theme ID from localStorage
 */
export function getCurrentTheme(): string | null {
    try {
        return localStorage.getItem(STORAGE_KEYS.CURRENT_THEME)
    } catch (error) {
        console.error('Failed to get current theme:', error)
        return null
    }
}

/**
 * Removes the current theme from localStorage
 */
export function clearCurrentTheme(): void {
    try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_THEME)
    } catch (error) {
        console.error('Failed to clear current theme:', error)
    }
}

// ============================================================================
// Custom Themes
// ============================================================================

/**
 * Saves a custom theme to localStorage
 */
export function saveCustomTheme(theme: ThemeConfig): boolean {
    try {
        const customThemes = getCustomThemes()

        // Check if we've reached the limit
        if (customThemes.length >= MAX_CUSTOM_THEMES) {
            const existingIndex = customThemes.findIndex(
                (t) => t.id === theme.id
            )
            if (existingIndex === -1) {
                console.warn(
                    `Maximum custom themes (${MAX_CUSTOM_THEMES}) reached`
                )
                return false
            }
        }

        // Remove existing theme with same ID if it exists
        const filteredThemes = customThemes.filter((t) => t.id !== theme.id)

        // Add new theme
        const updatedThemes = [...filteredThemes, theme]

        localStorage.setItem(
            STORAGE_KEYS.CUSTOM_THEMES,
            JSON.stringify(updatedThemes)
        )

        return true
    } catch (error) {
        console.error('Failed to save custom theme:', error)
        return false
    }
}

/**
 * Gets all custom themes from localStorage
 */
export function getCustomThemes(): ThemeConfig[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES)
        if (!data) return []

        const themes = JSON.parse(data)
        return Array.isArray(themes) ? themes : []
    } catch (error) {
        console.error('Failed to get custom themes:', error)
        return []
    }
}

/**
 * Gets a specific custom theme by ID
 */
export function getCustomTheme(themeId: string): ThemeConfig | null {
    const customThemes = getCustomThemes()
    return customThemes.find((t) => t.id === themeId) || null
}

/**
 * Deletes a custom theme
 */
export function deleteCustomTheme(themeId: string): boolean {
    try {
        const customThemes = getCustomThemes()
        const filteredThemes = customThemes.filter((t) => t.id !== themeId)

        localStorage.setItem(
            STORAGE_KEYS.CUSTOM_THEMES,
            JSON.stringify(filteredThemes)
        )

        return true
    } catch (error) {
        console.error('Failed to delete custom theme:', error)
        return false
    }
}

/**
 * Clears all custom themes
 */
export function clearCustomThemes(): void {
    try {
        localStorage.removeItem(STORAGE_KEYS.CUSTOM_THEMES)
    } catch (error) {
        console.error('Failed to clear custom themes:', error)
    }
}

// ============================================================================
// Theme History
// ============================================================================

/**
 * Adds a theme ID to the history
 */
function addToHistory(themeId: string): void {
    try {
        const history = getThemeHistory()

        // Remove if already in history
        const filteredHistory = history.filter((id) => id !== themeId)

        // Add to beginning
        const updatedHistory = [themeId, ...filteredHistory]

        // Keep only the last N themes
        const trimmedHistory = updatedHistory.slice(0, MAX_HISTORY_LENGTH)

        localStorage.setItem(
            STORAGE_KEYS.THEME_HISTORY,
            JSON.stringify(trimmedHistory)
        )
    } catch (error) {
        console.error('Failed to add to theme history:', error)
    }
}

/**
 * Gets the theme history
 */
export function getThemeHistory(): string[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.THEME_HISTORY)
        if (!data) return []

        const history = JSON.parse(data)
        return Array.isArray(history) ? history : []
    } catch (error) {
        console.error('Failed to get theme history:', error)
        return []
    }
}

/**
 * Clears the theme history
 */
export function clearThemeHistory(): void {
    try {
        localStorage.removeItem(STORAGE_KEYS.THEME_HISTORY)
    } catch (error) {
        console.error('Failed to clear theme history:', error)
    }
}

// ============================================================================
// Import/Export
// ============================================================================

/**
 * Exports a theme as JSON string
 */
export function exportTheme(theme: ThemeConfig): string {
    return JSON.stringify(theme, null, 2)
}

/**
 * Imports a theme from JSON string
 */
export function importTheme(json: string): ThemeConfig | null {
    try {
        const theme = JSON.parse(json) as ThemeConfig

        // Basic validation
        if (!theme.id || !theme.name || !theme.colors) {
            console.error('Invalid theme format')
            return null
        }

        return theme
    } catch (error) {
        console.error('Failed to import theme:', error)
        return null
    }
}

/**
 * Exports a theme to a downloadable file
 */
export function downloadTheme(theme: ThemeConfig): void {
    const json = exportTheme(theme)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${theme.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
}

// ============================================================================
// URL Sharing
// ============================================================================

/**
 * Encodes a theme config into a URL-safe string
 */
export function encodeThemeForURL(theme: ThemeConfig): string {
    try {
        const json = JSON.stringify(theme)
        const base64 = btoa(json)
        // Make URL-safe
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    } catch (error) {
        console.error('Failed to encode theme for URL:', error)
        return ''
    }
}

/**
 * Decodes a theme config from a URL-safe string
 */
export function decodeThemeFromURL(encoded: string): ThemeConfig | null {
    try {
        // Restore base64 characters
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')

        // Add padding if needed
        while (base64.length % 4) {
            base64 += '='
        }

        const json = atob(base64)
        return importTheme(json)
    } catch (error) {
        console.error('Failed to decode theme from URL:', error)
        return null
    }
}

/**
 * Gets theme ID from URL parameters
 */
export function getThemeFromURL(): string | null {
    if (typeof window === 'undefined') return null

    const params = new URLSearchParams(window.location.search)
    return params.get('theme')
}

/**
 * Gets custom theme data from URL parameters
 */
export function getCustomThemeFromURL(): ThemeConfig | null {
    if (typeof window === 'undefined') return null

    const params = new URLSearchParams(window.location.search)
    const customTheme = params.get('customTheme')

    if (!customTheme) return null

    return decodeThemeFromURL(customTheme)
}

/**
 * Creates a shareable URL for a theme
 */
export function createThemeShareURL(theme: ThemeConfig): string {
    if (typeof window === 'undefined') return ''

    const baseURL = window.location.origin + window.location.pathname
    const encoded = encodeThemeForURL(theme)

    return `${baseURL}?customTheme=${encoded}`
}

// ============================================================================
// Storage Management
// ============================================================================

/**
 * Gets the total size of theme storage in bytes
 */
export function getStorageSize(): number {
    try {
        let totalSize = 0

        Object.values(STORAGE_KEYS).forEach((key) => {
            const value = localStorage.getItem(key)
            if (value) {
                totalSize += new Blob([value]).size
            }
        })

        return totalSize
    } catch (error) {
        console.error('Failed to get storage size:', error)
        return 0
    }
}

/**
 * Checks if storage is near the limit (5MB default)
 */
export function isStorageNearLimit(limitBytes = 5 * 1024 * 1024): boolean {
    try {
        const size = getStorageSize()
        return size > limitBytes * 0.9 // 90% of limit
    } catch (error) {
        console.error('Failed to check storage limit:', error)
        return false
    }
}

/**
 * Clears all theme-related storage
 */
export function clearAllThemeStorage(): void {
    clearCurrentTheme()
    clearCustomThemes()
    clearThemeHistory()
}
