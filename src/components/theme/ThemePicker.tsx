'use client'

/**
 * Theme Picker Component
 *
 * Grid of theme preview cards with filtering and search
 */

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ThemeConfig } from '@/lib/theme-system'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ThemePreview } from './ThemePreview'

interface ThemePickerProps {
    themes: ThemeConfig[]
    currentTheme: string
    onSelect: (themeId: string) => void
    onPreview?: (theme: ThemeConfig | null) => void
}

export function ThemePicker({
    themes,
    currentTheme,
    onSelect,
    onPreview,
}: ThemePickerProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        themes.forEach((theme) => {
            theme.tags?.forEach((tag) => tags.add(tag))
        })
        return Array.from(tags).sort()
    }, [themes])

    // Filter themes
    const filteredThemes = useMemo(() => {
        return themes.filter((theme) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const matchesSearch =
                    theme.name.toLowerCase().includes(query) ||
                    theme.description.toLowerCase().includes(query) ||
                    theme.tags?.some((tag) => tag.toLowerCase().includes(query))

                if (!matchesSearch) return false
            }

            // Tag filter
            if (selectedTags.length > 0) {
                const matchesTags = selectedTags.every((tag) =>
                    theme.tags?.includes(tag)
                )
                if (!matchesTags) return false
            }

            return true
        })
    }, [themes, searchQuery, selectedTags])

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
    }

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search themes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Tag filters */}
            {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={
                                selectedTags.includes(tag)
                                    ? 'default'
                                    : 'outline'
                            }
                            className="cursor-pointer hover:bg-primary/90 transition-colors"
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                    {selectedTags.length > 0 && (
                        <Badge
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => setSelectedTags([])}
                        >
                            Clear filters
                        </Badge>
                    )}
                </div>
            )}

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
                {filteredThemes.length}{' '}
                {filteredThemes.length === 1 ? 'theme' : 'themes'} found
            </div>

            {/* Theme grid */}
            {filteredThemes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredThemes.map((theme) => (
                        <ThemePreview
                            key={theme.id}
                            theme={theme}
                            isActive={theme.id === currentTheme}
                            onClick={() => onSelect(theme.id)}
                            onMouseEnter={() => onPreview?.(theme)}
                            onMouseLeave={() => onPreview?.(null)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No themes found matching your criteria.</p>
                    <button
                        onClick={() => {
                            setSearchQuery('')
                            setSelectedTags([])
                        }}
                        className="mt-2 text-primary hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}
