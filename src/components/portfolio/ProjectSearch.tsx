'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { gsap } from 'gsap'
import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ProjectSearchProps {
    onSearch: (query: string) => void
    onClear: () => void
    searchQuery: string
    recentSearches: string[]
    onRecentSearchClick: (query: string) => void
    onClearHistory: () => void
}

export default function ProjectSearch({
    onSearch,
    onClear,
    searchQuery,
    recentSearches,
    onRecentSearchClick,
    onClearHistory,
}: ProjectSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    // Animation on mount
    useEffect(() => {
        const search = searchRef.current
        if (!search) return

        gsap.fromTo(
            search,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onSearch(value)
    }

    const handleClear = () => {
        onClear()
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            inputRef.current?.blur()
        }
    }

    return (
        <div ref={searchRef} className="relative mb-6">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search projects by name, technology, or description..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    className="pl-10 pr-10 h-12 text-base"
                />
                {searchQuery && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Search Results Count */}
            {searchQuery && (
                <div className="mt-2 text-sm text-muted-foreground">
                    <span>Searching for: </span>
                    <span className="font-medium text-foreground">
                        "{searchQuery}"
                    </span>
                </div>
            )}
        </div>
    )
}

// Fuzzy search utility
export function fuzzySearch(query: string, text: string): boolean {
    if (!query) return true

    const queryLower = query.toLowerCase()
    const textLower = text.toLowerCase()

    // Exact match
    if (textLower.includes(queryLower)) return true

    // Fuzzy match - check if all characters in query exist in order in text
    let queryIndex = 0
    for (
        let i = 0;
        i < textLower.length && queryIndex < queryLower.length;
        i++
    ) {
        if (textLower[i] === queryLower[queryIndex]) {
            queryIndex++
        }
    }

    return queryIndex === queryLower.length
}

// Search highlight component
export function SearchHighlight({
    text,
    query,
}: {
    text: string
    query: string
}) {
    if (!query) return <span>{text}</span>

    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return (
        <span>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <mark
                        key={index}
                        className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
                    >
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </span>
    )
}
