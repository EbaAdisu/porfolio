'use client'

/**
 * Theme Customizer Component
 *
 * Allows users to create and customize their own themes
 */

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ThemeColors, ThemeConfig, cloneTheme } from '@/lib/theme-system'
import { useEffect, useState } from 'react'
import { ColorPicker } from './ColorPicker'

type TabType = 'colors' | 'typography' | 'effects'

interface ThemeCustomizerProps {
    baseTheme: ThemeConfig
    onSave: (theme: ThemeConfig) => void
    onCancel: () => void
}

export function ThemeCustomizer({
    baseTheme,
    onSave,
    onCancel,
}: ThemeCustomizerProps) {
    const [theme, setTheme] = useState<ThemeConfig>(cloneTheme(baseTheme))
    const [hasChanges, setHasChanges] = useState(false)
    const [activeTab, setActiveTab] = useState<TabType>('colors')

    useEffect(() => {
        setHasChanges(JSON.stringify(theme) !== JSON.stringify(baseTheme))
    }, [theme, baseTheme])

    const updateColor = (key: keyof ThemeColors, value: string) => {
        setTheme((prev) => ({
            ...prev,
            colors: {
                ...prev.colors,
                [key]: value,
            },
        }))
    }

    const updateMetadata = (key: keyof ThemeConfig, value: unknown) => {
        setTheme((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleSave = () => {
        // Generate ID from name if it's a new theme
        if (!theme.id || theme.id === baseTheme.id) {
            const id = `custom-${theme.name
                .toLowerCase()
                .replace(/\s+/g, '-')}-${Date.now()}`
            setTheme((prev) => ({ ...prev, id }))
            onSave({ ...theme, id })
        } else {
            onSave(theme)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Customize Theme</h2>
                <p className="text-muted-foreground">
                    Create your own unique theme by customizing colors, fonts,
                    and styles.
                </p>
            </div>

            {/* Metadata */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div>
                    <Label htmlFor="theme-name">Theme Name *</Label>
                    <Input
                        id="theme-name"
                        value={theme.name}
                        onChange={(e) => updateMetadata('name', e.target.value)}
                        placeholder="My Custom Theme"
                    />
                </div>

                <div>
                    <Label htmlFor="theme-description">Description</Label>
                    <Textarea
                        id="theme-description"
                        value={theme.description}
                        onChange={(e) =>
                            updateMetadata('description', e.target.value)
                        }
                        placeholder="A brief description of your theme..."
                        rows={3}
                    />
                </div>

                <div>
                    <Label htmlFor="theme-tags">Tags (comma-separated)</Label>
                    <Input
                        id="theme-tags"
                        value={theme.tags?.join(', ') || ''}
                        onChange={(e) =>
                            updateMetadata(
                                'tags',
                                e.target.value
                                    .split(',')
                                    .map((t) => t.trim())
                                    .filter(Boolean)
                            )
                        }
                        placeholder="dark, modern, professional"
                    />
                </div>
            </div>

            {/* Customization Tabs */}
            <div className="w-full">
                {/* Tab Buttons */}
                <div className="flex border-b">
                    {(['colors', 'typography', 'effects'] as TabType[]).map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 font-medium transition-colors relative ${
                                    activeTab === tab
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                )}
                            </button>
                        )
                    )}
                </div>

                {/* Tab Content */}
                {/* Colors Tab */}
                {activeTab === 'colors' && (
                    <div className="space-y-6 mt-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Badge variant="outline">Base Colors</Badge>
                            </h3>
                            <div className="grid gap-6">
                                <ColorPicker
                                    label="Background"
                                    value={theme.colors.background}
                                    onChange={(v) =>
                                        updateColor('background', v)
                                    }
                                />
                                <ColorPicker
                                    label="Foreground"
                                    value={theme.colors.foreground}
                                    onChange={(v) =>
                                        updateColor('foreground', v)
                                    }
                                    contrastWith={theme.colors.background}
                                    showAccessibility
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Badge variant="outline">Semantic Colors</Badge>
                            </h3>
                            <div className="grid gap-6">
                                <ColorPicker
                                    label="Primary"
                                    value={theme.colors.primary}
                                    onChange={(v) => updateColor('primary', v)}
                                />
                                <ColorPicker
                                    label="Primary Foreground"
                                    value={theme.colors.primaryForeground}
                                    onChange={(v) =>
                                        updateColor('primaryForeground', v)
                                    }
                                    contrastWith={theme.colors.primary}
                                    showAccessibility
                                />
                                <ColorPicker
                                    label="Secondary"
                                    value={theme.colors.secondary}
                                    onChange={(v) =>
                                        updateColor('secondary', v)
                                    }
                                />
                                <ColorPicker
                                    label="Accent"
                                    value={theme.colors.accent}
                                    onChange={(v) => updateColor('accent', v)}
                                />
                                <ColorPicker
                                    label="Destructive"
                                    value={theme.colors.destructive}
                                    onChange={(v) =>
                                        updateColor('destructive', v)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Badge variant="outline">UI Colors</Badge>
                            </h3>
                            <div className="grid gap-6">
                                <ColorPicker
                                    label="Border"
                                    value={theme.colors.border}
                                    onChange={(v) => updateColor('border', v)}
                                />
                                <ColorPicker
                                    label="Input"
                                    value={theme.colors.input}
                                    onChange={(v) => updateColor('input', v)}
                                />
                                <ColorPicker
                                    label="Ring"
                                    value={theme.colors.ring}
                                    onChange={(v) => updateColor('ring', v)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Typography Tab */}
                {activeTab === 'typography' && (
                    <div className="space-y-6 mt-6">
                        <div className="space-y-4">
                            <div>
                                <Label>Font Family (Heading)</Label>
                                <select
                                    value={theme.fonts?.heading || 'inherit'}
                                    onChange={(e) =>
                                        updateMetadata('fonts', {
                                            ...theme.fonts,
                                            heading: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="inherit">Default</option>
                                    <option value="system-ui">System UI</option>
                                    <option value="serif">Serif</option>
                                    <option value="monospace">Monospace</option>
                                </select>
                            </div>

                            <div>
                                <Label>Font Family (Body)</Label>
                                <select
                                    value={theme.fonts?.body || 'inherit'}
                                    onChange={(e) =>
                                        updateMetadata('fonts', {
                                            ...theme.fonts,
                                            body: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="inherit">Default</option>
                                    <option value="system-ui">System UI</option>
                                    <option value="serif">Serif</option>
                                    <option value="monospace">Monospace</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Effects Tab */}
                {activeTab === 'effects' && (
                    <div className="space-y-6 mt-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="border-radius">
                                    Border Radius
                                </Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="border-radius"
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.125"
                                        value={parseFloat(
                                            theme.radius || '0.625'
                                        )}
                                        onChange={(e) =>
                                            updateMetadata(
                                                'radius',
                                                `${e.target.value}rem`
                                            )
                                        }
                                        className="flex-1"
                                    />
                                    <span className="text-sm text-muted-foreground w-16 text-right">
                                        {theme.radius || '0.625rem'}
                                    </span>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    {[
                                        '0rem',
                                        '0.25rem',
                                        '0.5rem',
                                        '0.75rem',
                                        '1rem',
                                    ].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() =>
                                                updateMetadata('radius', r)
                                            }
                                            className="px-3 py-1 text-xs rounded border hover:bg-accent"
                                            style={{ borderRadius: r }}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label>Animation Speed</Label>
                                <select
                                    value={
                                        theme.animations?.duration.normal ||
                                        '300ms'
                                    }
                                    onChange={(e) =>
                                        updateMetadata('animations', {
                                            ...theme.animations,
                                            duration: {
                                                ...theme.animations?.duration,
                                                normal: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="100ms">Fast (100ms)</option>
                                    <option value="300ms">
                                        Normal (300ms)
                                    </option>
                                    <option value="500ms">Slow (500ms)</option>
                                    <option value="800ms">
                                        Very Slow (800ms)
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => setTheme(cloneTheme(baseTheme))}
                        disabled={!hasChanges}
                    >
                        Reset
                    </Button>
                    <Button onClick={handleSave} disabled={!theme.name}>
                        Save Theme
                    </Button>
                </div>
            </div>
        </div>
    )
}
