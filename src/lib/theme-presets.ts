/**
 * Theme Presets
 *
 * Collection of predefined themes for the portfolio
 */

import { ThemeConfig } from './theme-system'

// ============================================================================
// Default Themes (Light & Dark)
// ============================================================================

export const lightTheme: ThemeConfig = {
    id: 'light',
    name: 'Light',
    description: 'Clean and minimal light theme',
    author: 'System',
    tags: ['light', 'minimal', 'default'],
    colors: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.145 0 0)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.145 0 0)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.145 0 0)',
        primary: 'oklch(0.205 0 0)',
        primaryForeground: 'oklch(0.985 0 0)',
        secondary: 'oklch(0.97 0 0)',
        secondaryForeground: 'oklch(0.205 0 0)',
        muted: 'oklch(0.97 0 0)',
        mutedForeground: 'oklch(0.556 0 0)',
        accent: 'oklch(0.97 0 0)',
        accentForeground: 'oklch(0.205 0 0)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(0.985 0 0)',
        border: 'oklch(0.922 0 0)',
        input: 'oklch(0.922 0 0)',
        ring: 'oklch(0.708 0 0)',
        chart1: 'oklch(0.646 0.222 41.116)',
        chart2: 'oklch(0.6 0.118 184.704)',
        chart3: 'oklch(0.398 0.07 227.392)',
        chart4: 'oklch(0.828 0.189 84.429)',
        chart5: 'oklch(0.769 0.188 70.08)',
        sidebar: 'oklch(0.985 0 0)',
        sidebarForeground: 'oklch(0.145 0 0)',
        sidebarPrimary: 'oklch(0.205 0 0)',
        sidebarPrimaryForeground: 'oklch(0.985 0 0)',
        sidebarAccent: 'oklch(0.97 0 0)',
        sidebarAccentForeground: 'oklch(0.205 0 0)',
        sidebarBorder: 'oklch(0.922 0 0)',
        sidebarRing: 'oklch(0.708 0 0)',
    },
    radius: '0.625rem',
    animations: {
        duration: {
            fast: '200ms',
            normal: '300ms',
            slow: '500ms',
        },
        easing: {
            default: 'ease-in-out',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
    },
}

export const darkTheme: ThemeConfig = {
    id: 'dark',
    name: 'Dark',
    description: 'Modern dark theme for comfortable viewing',
    author: 'System',
    tags: ['dark', 'modern', 'default'],
    colors: {
        background: 'oklch(0.145 0 0)',
        foreground: 'oklch(0.985 0 0)',
        card: 'oklch(0.205 0 0)',
        cardForeground: 'oklch(0.985 0 0)',
        popover: 'oklch(0.205 0 0)',
        popoverForeground: 'oklch(0.985 0 0)',
        primary: 'oklch(0.922 0 0)',
        primaryForeground: 'oklch(0.205 0 0)',
        secondary: 'oklch(0.269 0 0)',
        secondaryForeground: 'oklch(0.985 0 0)',
        muted: 'oklch(0.269 0 0)',
        mutedForeground: 'oklch(0.708 0 0)',
        accent: 'oklch(0.269 0 0)',
        accentForeground: 'oklch(0.985 0 0)',
        destructive: 'oklch(0.704 0.191 22.216)',
        destructiveForeground: 'oklch(0.985 0 0)',
        border: 'oklch(1 0 0 / 10%)',
        input: 'oklch(1 0 0 / 15%)',
        ring: 'oklch(0.556 0 0)',
        chart1: 'oklch(0.488 0.243 264.376)',
        chart2: 'oklch(0.696 0.17 162.48)',
        chart3: 'oklch(0.769 0.188 70.08)',
        chart4: 'oklch(0.627 0.265 303.9)',
        chart5: 'oklch(0.645 0.246 16.439)',
        sidebar: 'oklch(0.205 0 0)',
        sidebarForeground: 'oklch(0.985 0 0)',
        sidebarPrimary: 'oklch(0.488 0.243 264.376)',
        sidebarPrimaryForeground: 'oklch(0.985 0 0)',
        sidebarAccent: 'oklch(0.269 0 0)',
        sidebarAccentForeground: 'oklch(0.985 0 0)',
        sidebarBorder: 'oklch(1 0 0 / 10%)',
        sidebarRing: 'oklch(0.556 0 0)',
    },
    radius: '0.625rem',
    animations: {
        duration: {
            fast: '200ms',
            normal: '300ms',
            slow: '500ms',
        },
        easing: {
            default: 'ease-in-out',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
    },
}

// ============================================================================
// Midnight Blue Theme
// ============================================================================

export const midnightBlueTheme: ThemeConfig = {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: 'Deep blue background with vibrant purple accents',
    author: 'System',
    tags: ['dark', 'blue', 'purple', 'elegant'],
    colors: {
        background: 'oklch(0.18 0.04 265)',
        foreground: 'oklch(0.95 0.02 265)',
        card: 'oklch(0.22 0.05 265)',
        cardForeground: 'oklch(0.95 0.02 265)',
        popover: 'oklch(0.22 0.05 265)',
        popoverForeground: 'oklch(0.95 0.02 265)',
        primary: 'oklch(0.65 0.25 285)',
        primaryForeground: 'oklch(0.98 0.01 285)',
        secondary: 'oklch(0.3 0.06 265)',
        secondaryForeground: 'oklch(0.95 0.02 265)',
        muted: 'oklch(0.28 0.05 265)',
        mutedForeground: 'oklch(0.7 0.03 265)',
        accent: 'oklch(0.55 0.22 295)',
        accentForeground: 'oklch(0.98 0.01 295)',
        destructive: 'oklch(0.6 0.22 25)',
        destructiveForeground: 'oklch(0.98 0 0)',
        border: 'oklch(0.35 0.06 265)',
        input: 'oklch(0.3 0.06 265)',
        ring: 'oklch(0.65 0.25 285)',
        chart1: 'oklch(0.6 0.24 285)',
        chart2: 'oklch(0.65 0.22 305)',
        chart3: 'oklch(0.55 0.18 265)',
        chart4: 'oklch(0.7 0.2 245)',
        chart5: 'oklch(0.58 0.21 325)',
        sidebar: 'oklch(0.2 0.05 265)',
        sidebarForeground: 'oklch(0.95 0.02 265)',
        sidebarPrimary: 'oklch(0.65 0.25 285)',
        sidebarPrimaryForeground: 'oklch(0.98 0.01 285)',
        sidebarAccent: 'oklch(0.3 0.06 265)',
        sidebarAccentForeground: 'oklch(0.95 0.02 265)',
        sidebarBorder: 'oklch(0.35 0.06 265)',
        sidebarRing: 'oklch(0.65 0.25 285)',
    },
    radius: '0.75rem',
}

// ============================================================================
// Sunset Orange Theme
// ============================================================================

export const sunsetOrangeTheme: ThemeConfig = {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm orange and pink gradients reminiscent of sunset',
    author: 'System',
    tags: ['warm', 'orange', 'pink', 'vibrant'],
    colors: {
        background: 'oklch(0.97 0.02 40)',
        foreground: 'oklch(0.25 0.05 30)',
        card: 'oklch(0.99 0.01 40)',
        cardForeground: 'oklch(0.25 0.05 30)',
        popover: 'oklch(0.99 0.01 40)',
        popoverForeground: 'oklch(0.25 0.05 30)',
        primary: 'oklch(0.6 0.22 35)',
        primaryForeground: 'oklch(0.98 0.01 35)',
        secondary: 'oklch(0.92 0.04 40)',
        secondaryForeground: 'oklch(0.3 0.05 40)',
        muted: 'oklch(0.94 0.03 40)',
        mutedForeground: 'oklch(0.5 0.04 35)',
        accent: 'oklch(0.65 0.24 15)',
        accentForeground: 'oklch(0.98 0.01 15)',
        destructive: 'oklch(0.55 0.25 25)',
        destructiveForeground: 'oklch(0.98 0 0)',
        border: 'oklch(0.88 0.04 40)',
        input: 'oklch(0.9 0.03 40)',
        ring: 'oklch(0.6 0.22 35)',
        chart1: 'oklch(0.65 0.24 35)',
        chart2: 'oklch(0.7 0.22 15)',
        chart3: 'oklch(0.6 0.2 50)',
        chart4: 'oklch(0.68 0.23 5)',
        chart5: 'oklch(0.62 0.21 45)',
        sidebar: 'oklch(0.98 0.01 40)',
        sidebarForeground: 'oklch(0.25 0.05 30)',
        sidebarPrimary: 'oklch(0.6 0.22 35)',
        sidebarPrimaryForeground: 'oklch(0.98 0.01 35)',
        sidebarAccent: 'oklch(0.92 0.04 40)',
        sidebarAccentForeground: 'oklch(0.3 0.05 40)',
        sidebarBorder: 'oklch(0.88 0.04 40)',
        sidebarRing: 'oklch(0.6 0.22 35)',
    },
    radius: '0.5rem',
}

// ============================================================================
// Forest Green Theme
// ============================================================================

export const forestGreenTheme: ThemeConfig = {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural green tones inspired by forest landscapes',
    author: 'System',
    tags: ['green', 'nature', 'calm', 'organic'],
    colors: {
        background: 'oklch(0.96 0.02 150)',
        foreground: 'oklch(0.2 0.04 150)',
        card: 'oklch(0.98 0.01 150)',
        cardForeground: 'oklch(0.2 0.04 150)',
        popover: 'oklch(0.98 0.01 150)',
        popoverForeground: 'oklch(0.2 0.04 150)',
        primary: 'oklch(0.5 0.15 155)',
        primaryForeground: 'oklch(0.98 0.01 155)',
        secondary: 'oklch(0.9 0.03 150)',
        secondaryForeground: 'oklch(0.25 0.04 150)',
        muted: 'oklch(0.92 0.02 150)',
        mutedForeground: 'oklch(0.5 0.03 150)',
        accent: 'oklch(0.55 0.18 140)',
        accentForeground: 'oklch(0.98 0.01 140)',
        destructive: 'oklch(0.58 0.24 25)',
        destructiveForeground: 'oklch(0.98 0 0)',
        border: 'oklch(0.85 0.03 150)',
        input: 'oklch(0.88 0.02 150)',
        ring: 'oklch(0.5 0.15 155)',
        chart1: 'oklch(0.55 0.18 155)',
        chart2: 'oklch(0.6 0.16 140)',
        chart3: 'oklch(0.5 0.14 170)',
        chart4: 'oklch(0.58 0.17 125)',
        chart5: 'oklch(0.52 0.15 160)',
        sidebar: 'oklch(0.97 0.01 150)',
        sidebarForeground: 'oklch(0.2 0.04 150)',
        sidebarPrimary: 'oklch(0.5 0.15 155)',
        sidebarPrimaryForeground: 'oklch(0.98 0.01 155)',
        sidebarAccent: 'oklch(0.9 0.03 150)',
        sidebarAccentForeground: 'oklch(0.25 0.04 150)',
        sidebarBorder: 'oklch(0.85 0.03 150)',
        sidebarRing: 'oklch(0.5 0.15 155)',
    },
    radius: '0.625rem',
}

// ============================================================================
// Cyber Neon Theme
// ============================================================================

export const cyberNeonTheme: ThemeConfig = {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Futuristic neon colors with dark background',
    author: 'System',
    tags: ['dark', 'neon', 'cyberpunk', 'futuristic'],
    colors: {
        background: 'oklch(0.12 0.02 280)',
        foreground: 'oklch(0.95 0.03 180)',
        card: 'oklch(0.16 0.03 280)',
        cardForeground: 'oklch(0.95 0.03 180)',
        popover: 'oklch(0.16 0.03 280)',
        popoverForeground: 'oklch(0.95 0.03 180)',
        primary: 'oklch(0.7 0.28 180)',
        primaryForeground: 'oklch(0.1 0.02 280)',
        secondary: 'oklch(0.25 0.04 280)',
        secondaryForeground: 'oklch(0.95 0.03 180)',
        muted: 'oklch(0.22 0.03 280)',
        mutedForeground: 'oklch(0.65 0.02 180)',
        accent: 'oklch(0.75 0.3 320)',
        accentForeground: 'oklch(0.1 0.02 320)',
        destructive: 'oklch(0.65 0.28 0)',
        destructiveForeground: 'oklch(0.98 0 0)',
        border: 'oklch(0.3 0.15 180)',
        input: 'oklch(0.25 0.12 180)',
        ring: 'oklch(0.7 0.28 180)',
        chart1: 'oklch(0.7 0.28 180)',
        chart2: 'oklch(0.75 0.3 320)',
        chart3: 'oklch(0.68 0.26 280)',
        chart4: 'oklch(0.72 0.27 140)',
        chart5: 'oklch(0.65 0.28 0)',
        sidebar: 'oklch(0.14 0.025 280)',
        sidebarForeground: 'oklch(0.95 0.03 180)',
        sidebarPrimary: 'oklch(0.7 0.28 180)',
        sidebarPrimaryForeground: 'oklch(0.1 0.02 280)',
        sidebarAccent: 'oklch(0.25 0.04 280)',
        sidebarAccentForeground: 'oklch(0.95 0.03 180)',
        sidebarBorder: 'oklch(0.3 0.15 180)',
        sidebarRing: 'oklch(0.7 0.28 180)',
    },
    radius: '0.25rem',
}

// ============================================================================
// Minimal Mono Theme
// ============================================================================

export const minimalMonoTheme: ThemeConfig = {
    id: 'minimal-mono',
    name: 'Minimal Mono',
    description: 'Pure black and white minimalist design',
    author: 'System',
    tags: ['monochrome', 'minimal', 'clean', 'simple'],
    colors: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0 0 0)',
        card: 'oklch(0.98 0 0)',
        cardForeground: 'oklch(0 0 0)',
        popover: 'oklch(0.98 0 0)',
        popoverForeground: 'oklch(0 0 0)',
        primary: 'oklch(0 0 0)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.95 0 0)',
        secondaryForeground: 'oklch(0.1 0 0)',
        muted: 'oklch(0.96 0 0)',
        mutedForeground: 'oklch(0.45 0 0)',
        accent: 'oklch(0.15 0 0)',
        accentForeground: 'oklch(0.98 0 0)',
        destructive: 'oklch(0.3 0 0)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.9 0 0)',
        input: 'oklch(0.92 0 0)',
        ring: 'oklch(0.4 0 0)',
        chart1: 'oklch(0.2 0 0)',
        chart2: 'oklch(0.35 0 0)',
        chart3: 'oklch(0.5 0 0)',
        chart4: 'oklch(0.65 0 0)',
        chart5: 'oklch(0.8 0 0)',
        sidebar: 'oklch(0.99 0 0)',
        sidebarForeground: 'oklch(0 0 0)',
        sidebarPrimary: 'oklch(0 0 0)',
        sidebarPrimaryForeground: 'oklch(1 0 0)',
        sidebarAccent: 'oklch(0.95 0 0)',
        sidebarAccentForeground: 'oklch(0.1 0 0)',
        sidebarBorder: 'oklch(0.9 0 0)',
        sidebarRing: 'oklch(0.4 0 0)',
    },
    radius: '0',
}

// ============================================================================
// Ocean Breeze Theme
// ============================================================================

export const oceanBreezeTheme: ThemeConfig = {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Refreshing blue and teal ocean-inspired colors',
    author: 'System',
    tags: ['blue', 'teal', 'ocean', 'calm'],
    colors: {
        background: 'oklch(0.96 0.02 220)',
        foreground: 'oklch(0.22 0.04 220)',
        card: 'oklch(0.98 0.01 220)',
        cardForeground: 'oklch(0.22 0.04 220)',
        popover: 'oklch(0.98 0.01 220)',
        popoverForeground: 'oklch(0.22 0.04 220)',
        primary: 'oklch(0.55 0.18 220)',
        primaryForeground: 'oklch(0.98 0.01 220)',
        secondary: 'oklch(0.9 0.03 220)',
        secondaryForeground: 'oklch(0.28 0.04 220)',
        muted: 'oklch(0.92 0.02 220)',
        mutedForeground: 'oklch(0.52 0.03 220)',
        accent: 'oklch(0.6 0.2 195)',
        accentForeground: 'oklch(0.98 0.01 195)',
        destructive: 'oklch(0.58 0.24 25)',
        destructiveForeground: 'oklch(0.98 0 0)',
        border: 'oklch(0.86 0.03 220)',
        input: 'oklch(0.88 0.02 220)',
        ring: 'oklch(0.55 0.18 220)',
        chart1: 'oklch(0.58 0.2 220)',
        chart2: 'oklch(0.62 0.18 195)',
        chart3: 'oklch(0.55 0.16 205)',
        chart4: 'oklch(0.6 0.19 185)',
        chart5: 'oklch(0.56 0.17 235)',
        sidebar: 'oklch(0.97 0.01 220)',
        sidebarForeground: 'oklch(0.22 0.04 220)',
        sidebarPrimary: 'oklch(0.55 0.18 220)',
        sidebarPrimaryForeground: 'oklch(0.98 0.01 220)',
        sidebarAccent: 'oklch(0.9 0.03 220)',
        sidebarAccentForeground: 'oklch(0.28 0.04 220)',
        sidebarBorder: 'oklch(0.86 0.03 220)',
        sidebarRing: 'oklch(0.55 0.18 220)',
    },
    radius: '0.75rem',
}

// ============================================================================
// Royal Purple Theme
// ============================================================================

export const royalPurpleTheme: ThemeConfig = {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Elegant deep purple with gold accents',
    author: 'System',
    tags: ['purple', 'elegant', 'luxury', 'royal'],
    colors: {
        background: 'oklch(0.15 0.05 300)',
        foreground: 'oklch(0.95 0.02 300)',
        card: 'oklch(0.2 0.06 300)',
        cardForeground: 'oklch(0.95 0.02 300)',
        popover: 'oklch(0.2 0.06 300)',
        popoverForeground: 'oklch(0.95 0.02 300)',
        primary: 'oklch(0.6 0.22 290)',
        primaryForeground: 'oklch(0.98 0.01 290)',
        secondary: 'oklch(0.28 0.07 300)',
        secondaryForeground: 'oklch(0.95 0.02 300)',
        muted: 'oklch(0.26 0.06 300)',
        mutedForeground: 'oklch(0.68 0.03 300)',
        accent: 'oklch(0.7 0.18 70)',
        accentForeground: 'oklch(0.15 0.05 70)',
        destructive: 'oklch(0.6 0.22 25)',
        destructiveForeground: 'oklch(0.98 0 0)',
        border: 'oklch(0.35 0.08 300)',
        input: 'oklch(0.3 0.07 300)',
        ring: 'oklch(0.6 0.22 290)',
        chart1: 'oklch(0.62 0.24 290)',
        chart2: 'oklch(0.7 0.18 70)',
        chart3: 'oklch(0.58 0.2 310)',
        chart4: 'oklch(0.65 0.22 270)',
        chart5: 'oklch(0.6 0.2 320)',
        sidebar: 'oklch(0.18 0.055 300)',
        sidebarForeground: 'oklch(0.95 0.02 300)',
        sidebarPrimary: 'oklch(0.6 0.22 290)',
        sidebarPrimaryForeground: 'oklch(0.98 0.01 290)',
        sidebarAccent: 'oklch(0.28 0.07 300)',
        sidebarAccentForeground: 'oklch(0.95 0.02 300)',
        sidebarBorder: 'oklch(0.35 0.08 300)',
        sidebarRing: 'oklch(0.6 0.22 290)',
    },
    radius: '0.875rem',
}

// ============================================================================
// Theme Registry
// ============================================================================

export const allThemes: ThemeConfig[] = [
    lightTheme,
    darkTheme,
    midnightBlueTheme,
    sunsetOrangeTheme,
    forestGreenTheme,
    cyberNeonTheme,
    minimalMonoTheme,
    oceanBreezeTheme,
    royalPurpleTheme,
]

export const themeRegistry: Record<string, ThemeConfig> = {
    light: lightTheme,
    dark: darkTheme,
    'midnight-blue': midnightBlueTheme,
    'sunset-orange': sunsetOrangeTheme,
    'forest-green': forestGreenTheme,
    'cyber-neon': cyberNeonTheme,
    'minimal-mono': minimalMonoTheme,
    'ocean-breeze': oceanBreezeTheme,
    'royal-purple': royalPurpleTheme,
}

/**
 * Gets a theme by ID
 */
export function getThemeById(id: string): ThemeConfig | undefined {
    return themeRegistry[id]
}

/**
 * Gets all theme IDs
 */
export function getAllThemeIds(): string[] {
    return Object.keys(themeRegistry)
}

/**
 * Checks if a theme ID exists
 */
export function themeExists(id: string): boolean {
    return id in themeRegistry
}
