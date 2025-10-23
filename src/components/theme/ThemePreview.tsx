'use client'

/**
 * Theme Preview Component
 *
 * Shows a visual preview of a theme's appearance
 */

import { Card } from '@/components/ui/card'
import { ThemeConfig } from '@/lib/theme-system'

interface ThemePreviewProps {
    theme: ThemeConfig
    onClick?: () => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    isActive?: boolean
    className?: string
}

export function ThemePreview({
    theme,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isActive = false,
    className = '',
}: ThemePreviewProps) {
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`group relative w-full text-left transition-all ${className}`}
            style={{
                opacity: isActive ? 1 : 0.8,
            }}
        >
            <Card
                className={`overflow-hidden transition-all ${
                    isActive
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'hover:ring-2 hover:ring-muted'
                }`}
            >
                {/* Preview Area */}
                <div
                    className="p-4 space-y-3"
                    style={{
                        background: theme.colors.background,
                        color: theme.colors.foreground,
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div
                            className="h-2 w-20 rounded"
                            style={{ background: theme.colors.primary }}
                        />
                        <div className="flex gap-1">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ background: theme.colors.accent }}
                            />
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ background: theme.colors.secondary }}
                            />
                        </div>
                    </div>

                    {/* Card Preview */}
                    <div
                        className="rounded p-3 space-y-2"
                        style={{
                            background: theme.colors.card,
                            color: theme.colors.cardForeground,
                            borderRadius: theme.radius,
                        }}
                    >
                        <div
                            className="h-1.5 w-full rounded"
                            style={{ background: theme.colors.primary }}
                        />
                        <div
                            className="h-1 w-3/4 rounded"
                            style={{
                                background: theme.colors.mutedForeground,
                                opacity: 0.5,
                            }}
                        />
                        <div
                            className="h-1 w-1/2 rounded"
                            style={{
                                background: theme.colors.mutedForeground,
                                opacity: 0.5,
                            }}
                        />
                    </div>

                    {/* Button Preview */}
                    <div className="flex gap-2">
                        <div
                            className="px-3 py-1 rounded text-xs font-medium"
                            style={{
                                background: theme.colors.primary,
                                color: theme.colors.primaryForeground,
                                borderRadius: theme.radius,
                            }}
                        >
                            Primary
                        </div>
                        <div
                            className="px-3 py-1 rounded text-xs font-medium"
                            style={{
                                background: theme.colors.secondary,
                                color: theme.colors.secondaryForeground,
                                borderRadius: theme.radius,
                            }}
                        >
                            Secondary
                        </div>
                    </div>

                    {/* Color Palette */}
                    <div className="flex gap-1 pt-2">
                        {[
                            theme.colors.primary,
                            theme.colors.secondary,
                            theme.colors.accent,
                            theme.colors.muted,
                            theme.colors.destructive,
                        ].map((color, i) => (
                            <div
                                key={i}
                                className="h-6 flex-1 rounded"
                                style={{ background: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Theme Info */}
                <div className="p-3 bg-card border-t border-border">
                    <h3 className="font-semibold text-sm mb-1">{theme.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {theme.description}
                    </p>
                    {theme.tags && theme.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {theme.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Card>

            {/* Active indicator */}
            {isActive && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
            )}
        </button>
    )
}

/**
 * Compact Theme Preview for dropdown/small spaces
 */
export function CompactThemePreview({
    theme,
    onClick,
    isActive = false,
}: ThemePreviewProps) {
    const content = (
        <>
            {/* Color swatches */}
            <div className="flex gap-1">
                {[
                    theme.colors.primary,
                    theme.colors.secondary,
                    theme.colors.accent,
                ].map((color, i) => (
                    <div
                        key={i}
                        className="w-4 h-4 rounded border border-border"
                        style={{ background: color }}
                    />
                ))}
            </div>

            {/* Theme name */}
            <span className="text-sm font-medium flex-1 text-left">
                {theme.name}
            </span>

            {/* Active indicator */}
            {isActive && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
        </>
    )

    // If onClick is provided, render as button (standalone use)
    // Otherwise render as div (for use inside DropdownMenuItem)
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-3 p-2 rounded-lg w-full hover:bg-accent transition-colors ${
                    isActive ? 'bg-accent' : ''
                }`}
            >
                {content}
            </button>
        )
    }

    // For dropdown menu items, just render content
    return <div className="flex items-center gap-3 w-full">{content}</div>
}
