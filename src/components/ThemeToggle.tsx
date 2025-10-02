'use client'

import { ThemeModal } from '@/components/theme/ThemeModal'
import { CompactThemePreview } from '@/components/theme/ThemePreview'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    useAllThemes,
    useThemeCustomization,
} from '@/hooks/useThemeCustomization'
import { allThemes } from '@/lib/theme-presets'
import { Moon, Palette, Settings, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeToggle() {
    const { setTheme: setNextTheme } = useTheme()
    const {
        currentTheme,
        setTheme,
        createCustomTheme,
        removeCustomTheme,
        setPreviewTheme,
    } = useThemeCustomization()
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const allAvailableThemes = useAllThemes()

    const handleThemeSelect = (themeId: string) => {
        setTheme(themeId)
        // Also update next-themes for dark/light detection
        if (themeId === 'light' || themeId === 'dark') {
            setNextTheme(themeId)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                    {/* Quick theme switchers */}
                    {allThemes.slice(0, 5).map((theme) => (
                        <DropdownMenuItem 
                            key={theme.id}
                            onClick={(e) => {
                                e.preventDefault()
                                handleThemeSelect(theme.id)
                            }}
                            className="cursor-pointer"
                        >
                            <CompactThemePreview
                                theme={theme}
                                isActive={theme.id === currentTheme}
                            />
                        </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />

                    {/* Open full theme settings */}
                    <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>All Themes ({allAvailableThemes.length})</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Customize Theme</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Modal */}
            <ThemeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                themes={allAvailableThemes}
                currentTheme={currentTheme}
                onSelectTheme={handleThemeSelect}
                onSaveCustomTheme={(theme) => {
                    createCustomTheme(theme)
                    handleThemeSelect(theme.id)
                }}
                onDeleteCustomTheme={removeCustomTheme}
                onPreviewTheme={setPreviewTheme}
            />
        </>
    )
}
