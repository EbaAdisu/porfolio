'use client'

/**
 * Theme Modal Component
 *
 * Modal for managing themes (picker, customizer, settings)
 */

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ThemeConfig } from '@/lib/theme-system'
import { Palette, Plus, Settings, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ThemeCustomizer } from './ThemeCustomizer'
import { ThemePicker } from './ThemePicker'
import { ThemeShareButton } from './ThemeShareButton'

type TabType = 'picker' | 'customizer'

interface ThemeModalProps {
    isOpen: boolean
    onClose: () => void
    themes: ThemeConfig[]
    currentTheme: string
    onSelectTheme: (themeId: string) => void
    onSaveCustomTheme: (theme: ThemeConfig) => void
    onDeleteCustomTheme: (themeId: string) => void
    onPreviewTheme?: (theme: ThemeConfig | null) => void
}

export function ThemeModal({
    isOpen,
    onClose,
    themes,
    currentTheme,
    onSelectTheme,
    onSaveCustomTheme,
    onDeleteCustomTheme,
    onPreviewTheme,
}: ThemeModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>('picker')
    const [customizingTheme, setCustomizingTheme] =
        useState<ThemeConfig | null>(null)
    const [themeToDelete, setThemeToDelete] = useState<string | null>(null)

    if (!isOpen) return null

    const handleCreateNew = () => {
        // Start with current theme as base
        const baseTheme = themes.find((t) => t.id === currentTheme) || themes[0]
        setCustomizingTheme({
            ...baseTheme,
            id: '',
            name: 'New Custom Theme',
            description: 'My custom theme',
            tags: ['custom'],
        })
        setActiveTab('customizer')
    }

    const handleSave = (theme: ThemeConfig) => {
        onSaveCustomTheme(theme)
        setCustomizingTheme(null)
        setActiveTab('picker')
    }

    const handleCancel = () => {
        setCustomizingTheme(null)
        setActiveTab('picker')
    }

    const customThemes = themes.filter((t) => t.tags?.includes('custom'))

    return (
        <>
            {/* Main Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="relative w-full max-w-6xl max-h-[90vh] mx-4 bg-card rounded-lg shadow-lg border overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center gap-4">
                            <Settings className="h-6 w-6" />
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Theme Settings
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Choose a preset or create your own custom
                                    theme
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 hover:bg-accent transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('picker')}
                            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${
                                activeTab === 'picker'
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <Palette className="h-4 w-4" />
                            Theme Gallery
                            <Badge variant="secondary">{themes.length}</Badge>
                            {activeTab === 'picker' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('customizer')}
                            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${
                                activeTab === 'customizer'
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <Plus className="h-4 w-4" />
                            Custom Themes
                            {customThemes.length > 0 && (
                                <Badge variant="secondary">
                                    {customThemes.length}
                                </Badge>
                            )}
                            {activeTab === 'customizer' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        {activeTab === 'picker' && !customizingTheme && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Select a theme to apply it immediately
                                    </p>
                                    <Button onClick={handleCreateNew} size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Custom Theme
                                    </Button>
                                </div>
                                <ThemePicker
                                    themes={themes}
                                    currentTheme={currentTheme}
                                    onSelect={onSelectTheme}
                                    onPreview={onPreviewTheme}
                                />
                            </div>
                        )}

                        {activeTab === 'customizer' && customizingTheme && (
                            <ThemeCustomizer
                                baseTheme={customizingTheme}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        )}

                        {activeTab === 'customizer' && !customizingTheme && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground">
                                        {customThemes.length > 0
                                            ? 'Manage your custom themes'
                                            : "You haven't created any custom themes yet"}
                                    </p>
                                    <Button onClick={handleCreateNew}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create New
                                    </Button>
                                </div>

                                {customThemes.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {customThemes.map((theme) => (
                                            <div
                                                key={theme.id}
                                                className="p-4 border rounded-lg space-y-3"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {theme.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {theme.description}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            setThemeToDelete(
                                                                theme.id
                                                            )
                                                        }
                                                        className="p-2 rounded hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            onSelectTheme(
                                                                theme.id
                                                            )
                                                        }
                                                    >
                                                        Apply
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setCustomizingTheme(
                                                                theme
                                                            )
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <ThemeShareButton
                                                        theme={theme}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!themeToDelete}
                onOpenChange={() => setThemeToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Custom Theme?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your custom theme.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (themeToDelete) {
                                    onDeleteCustomTheme(themeToDelete)
                                    setThemeToDelete(null)
                                }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
