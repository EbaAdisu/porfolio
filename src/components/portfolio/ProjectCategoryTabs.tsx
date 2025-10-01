'use client'

import { Badge } from '@/components/ui/badge'
import { projectCategories } from '@/data/project-categories'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

interface ProjectCategoryTabsProps {
    activeCategory: string
    onCategoryChange: (categoryId: string) => void
    projectCounts: Record<string, number>
}

export default function ProjectCategoryTabs({
    activeCategory,
    onCategoryChange,
    projectCounts,
}: ProjectCategoryTabsProps) {
    const [indicatorStyle, setIndicatorStyle] = useState({})
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const activeIndex = projectCategories.findIndex(
            (cat) => cat.id === activeCategory
        )
        const activeTab = tabsRef.current[activeIndex]

        if (activeTab) {
            setIndicatorStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
            })
        }
    }, [activeCategory])

    const handleTabClick = (categoryId: string, index: number) => {
        onCategoryChange(categoryId)

        // Animate the indicator
        const tab = tabsRef.current[index]
        if (tab) {
            gsap.to('.tab-indicator', {
                left: tab.offsetLeft,
                width: tab.offsetWidth,
                duration: 0.3,
                ease: 'power2.out',
            })
        }
    }

    return (
        <div className="mb-8">
            <div className="relative">
                {/* Scrollable container for mobile */}
                <div className="overflow-x-auto hide-scrollbar">
                    <div className="flex gap-2 pb-2 min-w-max relative">
                        {/* Animated indicator */}
                        <div
                            className="tab-indicator absolute bottom-0 h-0.5 bg-primary transition-all"
                            style={indicatorStyle}
                        />

                        {projectCategories.map((category, index) => {
                            const isActive = category.id === activeCategory
                            const count = projectCounts[category.id] || 0

                            return (
                                <button
                                    key={category.id}
                                    ref={(el) => {
                                        tabsRef.current[index] = el
                                    }}
                                    onClick={() =>
                                        handleTabClick(category.id, index)
                                    }
                                    className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-all duration-300 whitespace-nowrap
                    ${
                        isActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                                >
                                    <span className="text-lg">
                                        {category.icon}
                                    </span>
                                    <span className="text-sm">
                                        {category.name}
                                    </span>
                                    {count > 0 && (
                                        <Badge
                                            variant={
                                                isActive
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                            className="ml-1 h-5 min-w-5 text-xs"
                                        >
                                            {count}
                                        </Badge>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Category description */}
            <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                    {
                        projectCategories.find(
                            (cat) => cat.id === activeCategory
                        )?.description
                    }
                </p>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}
