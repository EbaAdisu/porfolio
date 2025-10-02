/**
 * Theme System Architecture
 *
 * Provides a comprehensive multi-theme system with full customization support.
 * Supports OKLCH color space for better color manipulation with fallbacks.
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Color tokens structure - all colors used across the application
 */
export interface ThemeColors {
    // Base
    background: string
    foreground: string

    // Component
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string

    // Semantic
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string

    // UI
    border: string
    input: string
    ring: string

    // Charts (optional)
    chart1: string
    chart2: string
    chart3: string
    chart4: string
    chart5: string

    // Sidebar
    sidebar: string
    sidebarForeground: string
    sidebarPrimary: string
    sidebarPrimaryForeground: string
    sidebarAccent: string
    sidebarAccentForeground: string
    sidebarBorder: string
    sidebarRing: string
}

/**
 * Font configuration
 */
export interface ThemeFonts {
    heading: string
    body: string
    mono: string
}

/**
 * Animation configuration
 */
export interface ThemeAnimations {
    duration: {
        fast: string
        normal: string
        slow: string
    }
    easing: {
        default: string
        smooth: string
        bounce: string
    }
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
    id: string
    name: string
    description: string
    author?: string
    tags?: string[]
    colors: ThemeColors
    fonts?: ThemeFonts
    radius?: string
    animations?: ThemeAnimations
}

/**
 * Theme metadata for display in picker
 */
export interface ThemeMetadata {
    id: string
    name: string
    description: string
    author?: string
    tags?: string[]
    preview?: {
        primary: string
        secondary: string
        accent: string
        background: string
    }
}

// ============================================================================
// Validation
// ============================================================================

/**
 * Validates a color value (OKLCH, RGB, HSL, or HEX)
 */
export function isValidColor(color: string): boolean {
    // OKLCH: oklch(0.5 0.1 180)
    const oklchRegex = /^oklch\([0-9.]+ [0-9.]+ [0-9.]+( \/ [0-9.]+%?)?\)$/
    // RGB: rgb(255, 255, 255)
    const rgbRegex = /^rgb\(\d+,\s*\d+,\s*\d+\)$/
    // HSL: hsl(180, 50%, 50%)
    const hslRegex = /^hsl\(\d+,\s*\d+%,\s*\d+%\)$/
    // HEX: #ffffff
    const hexRegex = /^#[0-9A-Fa-f]{6}$/

    return (
        oklchRegex.test(color) ||
        rgbRegex.test(color) ||
        hslRegex.test(color) ||
        hexRegex.test(color)
    )
}

/**
 * Validates a complete theme configuration
 */
export function validateTheme(theme: ThemeConfig): {
    valid: boolean
    errors: string[]
} {
    const errors: string[] = []

    // Required fields
    if (!theme.id) errors.push('Theme ID is required')
    if (!theme.name) errors.push('Theme name is required')
    if (!theme.description) errors.push('Theme description is required')
    if (!theme.colors) {
        errors.push('Theme colors are required')
        return { valid: false, errors }
    }

    // Validate all color tokens
    const requiredColors: (keyof ThemeColors)[] = [
        'background',
        'foreground',
        'card',
        'cardForeground',
        'popover',
        'popoverForeground',
        'primary',
        'primaryForeground',
        'secondary',
        'secondaryForeground',
        'muted',
        'mutedForeground',
        'accent',
        'accentForeground',
        'destructive',
        'border',
        'input',
        'ring',
    ]

    for (const colorKey of requiredColors) {
        const color = theme.colors[colorKey]
        if (!color) {
            errors.push(`Missing required color: ${colorKey}`)
        } else if (!isValidColor(color)) {
            errors.push(`Invalid color format for ${colorKey}: ${color}`)
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}

// ============================================================================
// Theme Utilities
// ============================================================================

/**
 * Converts theme config to CSS variables
 */
export function themeToCSS(theme: ThemeConfig): Record<string, string> {
    const cssVars: Record<string, string> = {}

    // Colors
    Object.entries(theme.colors).forEach(([key, value]) => {
        // Convert camelCase to kebab-case
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        cssVars[`--${cssKey}`] = value
    })

    // Radius
    if (theme.radius) {
        cssVars['--radius'] = theme.radius
    }

    // Animation durations
    if (theme.animations?.duration) {
        cssVars['--animation-duration-fast'] = theme.animations.duration.fast
        cssVars['--animation-duration-normal'] =
            theme.animations.duration.normal
        cssVars['--animation-duration-slow'] = theme.animations.duration.slow
    }

    // Animation easings
    if (theme.animations?.easing) {
        cssVars['--animation-easing-default'] = theme.animations.easing.default
        cssVars['--animation-easing-smooth'] = theme.animations.easing.smooth
        cssVars['--animation-easing-bounce'] = theme.animations.easing.bounce
    }

    return cssVars
}

/**
 * Applies theme CSS variables to document root
 */
export function applyTheme(theme: ThemeConfig): void {
    console.log('🎨 Applying theme:', theme.name, theme.id)
    const cssVars = themeToCSS(theme)
    const root = document.documentElement

    Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value)
    })

    console.log('✅ Theme applied. Sample vars:', {
        background: cssVars['--background'],
        foreground: cssVars['--foreground'],
        primary: cssVars['--primary'],
    })
}

/**
 * Gets theme metadata without full configuration
 */
export function getThemeMetadata(theme: ThemeConfig): ThemeMetadata {
    return {
        id: theme.id,
        name: theme.name,
        description: theme.description,
        author: theme.author,
        tags: theme.tags,
        preview: {
            primary: theme.colors.primary,
            secondary: theme.colors.secondary,
            accent: theme.colors.accent,
            background: theme.colors.background,
        },
    }
}

/**
 * Creates a deep copy of a theme config
 */
export function cloneTheme(theme: ThemeConfig): ThemeConfig {
    return JSON.parse(JSON.stringify(theme))
}

/**
 * Merges two theme configs (second overwrites first)
 */
export function mergeThemes(
    base: ThemeConfig,
    override: Partial<ThemeConfig>
): ThemeConfig {
    const result: ThemeConfig = {
        ...base,
        ...override,
        colors: {
            ...base.colors,
            ...override.colors,
        },
    }

    // Handle optional fonts
    if (base.fonts || override.fonts) {
        result.fonts = {
            heading:
                override.fonts?.heading ?? base.fonts?.heading ?? 'inherit',
            body: override.fonts?.body ?? base.fonts?.body ?? 'inherit',
            mono: override.fonts?.mono ?? base.fonts?.mono ?? 'monospace',
        }
    }

    // Handle optional animations
    if (base.animations || override.animations) {
        result.animations = {
            duration: {
                fast:
                    override.animations?.duration?.fast ??
                    base.animations?.duration?.fast ??
                    '200ms',
                normal:
                    override.animations?.duration?.normal ??
                    base.animations?.duration?.normal ??
                    '300ms',
                slow:
                    override.animations?.duration?.slow ??
                    base.animations?.duration?.slow ??
                    '500ms',
            },
            easing: {
                default:
                    override.animations?.easing?.default ??
                    base.animations?.easing?.default ??
                    'ease-in-out',
                smooth:
                    override.animations?.easing?.smooth ??
                    base.animations?.easing?.smooth ??
                    'cubic-bezier(0.4, 0, 0.2, 1)',
                bounce:
                    override.animations?.easing?.bounce ??
                    base.animations?.easing?.bounce ??
                    'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        }
    }

    return result
}

// ============================================================================
// Color Utilities
// ============================================================================

/**
 * Converts HEX to OKLCH (simplified conversion)
 * For production, use a proper color conversion library
 */
export function hexToOKLCH(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '')

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255

    // Simple approximation - for production use proper library
    const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2
    const chroma = Math.max(r, g, b) - Math.min(r, g, b)
    let hue = 0

    if (chroma !== 0) {
        if (Math.max(r, g, b) === r) {
            hue = ((g - b) / chroma) % 6
        } else if (Math.max(r, g, b) === g) {
            hue = (b - r) / chroma + 2
        } else {
            hue = (r - g) / chroma + 4
        }
        hue = hue * 60
        if (hue < 0) hue += 360
    }

    return `oklch(${lightness.toFixed(3)} ${(chroma * 0.4).toFixed(
        3
    )} ${hue.toFixed(1)})`
}

/**
 * Extracts OKLCH values from a color string
 */
export function parseOKLCH(oklch: string): {
    l: number
    c: number
    h: number
    alpha?: number
} | null {
    const match = oklch.match(
        /oklch\(([0-9.]+) ([0-9.]+) ([0-9.]+)( \/ ([0-9.]+)%?)?\)/
    )
    if (!match) return null

    return {
        l: parseFloat(match[1]),
        c: parseFloat(match[2]),
        h: parseFloat(match[3]),
        alpha: match[5] ? parseFloat(match[5]) : undefined,
    }
}

/**
 * Creates OKLCH color string from components
 */
export function createOKLCH(
    l: number,
    c: number,
    h: number,
    alpha?: number
): string {
    if (alpha !== undefined) {
        return `oklch(${l} ${c} ${h} / ${alpha}%)`
    }
    return `oklch(${l} ${c} ${h})`
}

/**
 * Adjusts lightness of OKLCH color
 */
export function adjustLightness(oklch: string, amount: number): string {
    const parsed = parseOKLCH(oklch)
    if (!parsed) return oklch

    const newL = Math.max(0, Math.min(1, parsed.l + amount))
    return createOKLCH(newL, parsed.c, parsed.h, parsed.alpha)
}

/**
 * Adjusts chroma (saturation) of OKLCH color
 */
export function adjustChroma(oklch: string, amount: number): string {
    const parsed = parseOKLCH(oklch)
    if (!parsed) return oklch

    const newC = Math.max(0, Math.min(0.4, parsed.c + amount))
    return createOKLCH(parsed.l, newC, parsed.h, parsed.alpha)
}

/**
 * Rotates hue of OKLCH color
 */
export function rotateHue(oklch: string, degrees: number): string {
    const parsed = parseOKLCH(oklch)
    if (!parsed) return oklch

    let newH = parsed.h + degrees
    while (newH < 0) newH += 360
    while (newH >= 360) newH -= 360

    return createOKLCH(parsed.l, parsed.c, newH, parsed.alpha)
}

// ============================================================================
// Contrast Checking (WCAG)
// ============================================================================

/**
 * Calculates relative luminance (simplified)
 */
function getRelativeLuminance(oklch: string): number {
    const parsed = parseOKLCH(oklch)
    if (!parsed) return 0.5
    return parsed.l
}

/**
 * Calculates contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
    const l1 = getRelativeLuminance(color1)
    const l2 = getRelativeLuminance(color2)

    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)

    return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Checks if contrast meets WCAG AA standards
 */
export function meetsWCAGAA(
    foreground: string,
    background: string,
    largeText = false
): boolean {
    const ratio = getContrastRatio(foreground, background)
    return largeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Checks if contrast meets WCAG AAA standards
 */
export function meetsWCAGAAA(
    foreground: string,
    background: string,
    largeText = false
): boolean {
    const ratio = getContrastRatio(foreground, background)
    return largeText ? ratio >= 4.5 : ratio >= 7
}
