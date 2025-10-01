'use client'

import { fuzzySearch } from '@/components/portfolio/ProjectSearch'
import { Project } from '@/components/ProjectCard'
import { ComingSoonProject } from '@/data/project-categories'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface UseProjectFilterProps {
    projects: Project[]
    comingSoonProjects: ComingSoonProject[]
}

interface FilterState {
    activeCategory: string
    searchQuery: string
    selectedTags: string[]
    difficulty: string[]
    status: string[]
}

export function useProjectFilter({
    projects,
    comingSoonProjects,
}: UseProjectFilterProps) {
    const [filterState, setFilterState] = useState<FilterState>({
        activeCategory: 'all',
        searchQuery: '',
        selectedTags: [],
        difficulty: [],
        status: [],
    })

    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [searchHistory, setSearchHistory] = useState<string[]>([])

    // Load search history from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('project-search-history')
        if (saved) {
            try {
                const history = JSON.parse(saved)
                setSearchHistory(history)
                setRecentSearches(history.slice(0, 10))
            } catch (error) {
                console.error('Failed to load search history:', error)
            }
        }
    }, [])

    // Save search history to localStorage
    const saveSearchHistory = useCallback((query: string) => {
        if (!query.trim()) return

        setSearchHistory((prevHistory) => {
            const newHistory = [
                query,
                ...prevHistory.filter((item) => item !== query),
            ].slice(0, 20)

            setRecentSearches(newHistory.slice(0, 10))

            try {
                localStorage.setItem(
                    'project-search-history',
                    JSON.stringify(newHistory)
                )
            } catch (error) {
                console.error('Failed to save search history:', error)
            }

            return newHistory
        })
    }, [])

    // Update filter state
    const updateFilter = useCallback((updates: Partial<FilterState>) => {
        setFilterState((prev) => ({ ...prev, ...updates }))
    }, [])

    // Handle search
    const handleSearch = useCallback(
        (query: string) => {
            updateFilter({ searchQuery: query })
            if (query.trim()) {
                saveSearchHistory(query)
            }
        },
        [updateFilter, saveSearchHistory]
    )

    // Clear search
    const clearSearch = useCallback(() => {
        updateFilter({ searchQuery: '' })
    }, [updateFilter])

    // Handle recent search click
    const handleRecentSearchClick = useCallback(
        (query: string) => {
            handleSearch(query)
        },
        [handleSearch]
    )

    // Clear search history
    const clearSearchHistory = useCallback(() => {
        setSearchHistory([])
        setRecentSearches([])
        localStorage.removeItem('project-search-history')
    }, [])

    // Handle category change
    const handleCategoryChange = useCallback(
        (categoryId: string) => {
            updateFilter({ activeCategory: categoryId })
        },
        [updateFilter]
    )

    // Handle tag selection
    const handleTagToggle = useCallback((tag: string) => {
        setFilterState((prev) => ({
            ...prev,
            selectedTags: prev.selectedTags.includes(tag)
                ? prev.selectedTags.filter((t) => t !== tag)
                : [...prev.selectedTags, tag],
        }))
    }, [])

    // Clear all filters
    const clearAllFilters = useCallback(() => {
        setFilterState({
            activeCategory: 'all',
            searchQuery: '',
            selectedTags: [],
            difficulty: [],
            status: [],
        })
    }, [])

    // Filter projects based on current state
    const filteredProjects = useMemo(() => {
        let filtered = projects

        // Filter by category
        if (filterState.activeCategory !== 'all') {
            filtered = filtered.filter(
                (p) => p.category === filterState.activeCategory
            )
        }

        // Filter by search query
        if (filterState.searchQuery) {
            const query = filterState.searchQuery.toLowerCase()
            filtered = filtered.filter(
                (p) =>
                    fuzzySearch(query, p.title) ||
                    fuzzySearch(query, p.description) ||
                    p.tags.some((tag) => fuzzySearch(query, tag))
            )
        }

        // Filter by selected tags
        if (filterState.selectedTags.length > 0) {
            filtered = filtered.filter((p) =>
                filterState.selectedTags.some((tag) =>
                    p.tags.some((projectTag) =>
                        projectTag.toLowerCase().includes(tag.toLowerCase())
                    )
                )
            )
        }

        return filtered
    }, [projects, filterState])

    // Filter coming soon projects
    const filteredComingSoon = useMemo(() => {
        let filtered = comingSoonProjects

        // Filter by category
        if (filterState.activeCategory !== 'all') {
            filtered = filtered.filter(
                (p) => p.category === filterState.activeCategory
            )
        }

        // Filter by search query
        if (filterState.searchQuery) {
            const query = filterState.searchQuery.toLowerCase()
            filtered = filtered.filter(
                (p) =>
                    fuzzySearch(query, p.title) ||
                    fuzzySearch(query, p.description) ||
                    p.technologies.some((tech) => fuzzySearch(query, tech))
            )
        }

        // Filter by difficulty
        if (filterState.difficulty.length > 0) {
            filtered = filtered.filter((p) =>
                filterState.difficulty.includes(p.difficulty)
            )
        }

        return filtered
    }, [comingSoonProjects, filterState])

    // Get all unique tags from projects
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        projects.forEach((p) => p.tags.forEach((tag) => tags.add(tag)))
        comingSoonProjects.forEach((p) =>
            p.technologies.forEach((tech) => tags.add(tech))
        )
        return Array.from(tags).sort()
    }, [projects, comingSoonProjects])

    // Calculate project counts per category
    const projectCounts = useMemo(() => {
        const counts: Record<string, number> = {
            all: projects.length + comingSoonProjects.length,
        }

        projects.forEach((p) => {
            if (p.category) {
                counts[p.category] = (counts[p.category] || 0) + 1
            }
        })

        comingSoonProjects.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1
        })

        return counts
    }, [projects, comingSoonProjects])

    // Get active filters count
    const activeFiltersCount = useMemo(() => {
        let count = 0
        if (filterState.activeCategory !== 'all') count++
        if (filterState.searchQuery) count++
        if (filterState.selectedTags.length > 0) count++
        if (filterState.difficulty.length > 0) count++
        if (filterState.status.length > 0) count++
        return count
    }, [filterState])

    return {
        // State
        filterState,
        filteredProjects,
        filteredComingSoon,
        projectCounts,
        allTags,
        recentSearches,
        activeFiltersCount,

        // Actions
        handleSearch,
        clearSearch,
        handleRecentSearchClick,
        clearSearchHistory,
        handleCategoryChange,
        handleTagToggle,
        clearAllFilters,
        updateFilter,
    }
}
