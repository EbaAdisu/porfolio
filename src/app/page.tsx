'use client'

import AnimatedProjectGrid from '@/components/animations/AnimatedProjectGrid'
import AnimatedTimeline from '@/components/animations/AnimatedTimeline'
import EnhancedProjectCard from '@/components/animations/EnhancedProjectCard'
import HeroSection from '@/components/animations/HeroSection'
import ComingSoonProjectCard from '@/components/portfolio/ComingSoonProjectCard'
import ProjectCategoryTabs from '@/components/portfolio/ProjectCategoryTabs'
import ProjectSearch from '@/components/portfolio/ProjectSearch'
import educationData from '@/data/education.json'
import experienceData from '@/data/experience.json'
import { comingSoonProjects } from '@/data/project-categories'
import projectsData from '@/data/projects.json'
import { useProjectFilter } from '@/hooks/useProjectFilter'
import { useMemo } from 'react'

export default function Home() {
    // Memoize the projects data to prevent unnecessary re-renders
    const projectsConfig = useMemo(
        () => ({
            projects: projectsData,
            comingSoonProjects,
        }),
        []
    )

    const {
        filterState,
        filteredProjects,
        filteredComingSoon,
        projectCounts,
        recentSearches,
        handleSearch,
        clearSearch,
        handleRecentSearchClick,
        clearSearchHistory,
        handleCategoryChange,
    } = useProjectFilter(projectsConfig)

    return (
        <div className="container mx-auto px-4 py-8">
            <HeroSection
                name="Eba Adisu Kenea"
                description="I am a software engineer from Ethiopia. While becoming one in an undeveloped country wasn't easy due to having fewer opportunities to succeed, I was always driven by the belief that adversity can be a motivator. I am committed to pushing the boundaries of software development through continuous learning and embracing emerging technologies."
            />

            <section id="portfolio" className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center">My Work</h2>

                {/* Search */}
                <ProjectSearch
                    onSearch={handleSearch}
                    onClear={clearSearch}
                    searchQuery={filterState.searchQuery}
                    recentSearches={recentSearches}
                    onRecentSearchClick={handleRecentSearchClick}
                    onClearHistory={clearSearchHistory}
                />

                {/* Category Tabs */}
                <ProjectCategoryTabs
                    activeCategory={filterState.activeCategory}
                    onCategoryChange={handleCategoryChange}
                    projectCounts={projectCounts}
                />

                {/* Projects Grid */}
                <AnimatedProjectGrid projects={filteredProjects}>
                    {/* Completed Projects */}
                    {filteredProjects.map((project) => (
                        <div key={project.id} data-project-card>
                            <EnhancedProjectCard project={project} />
                        </div>
                    ))}

                    {/* Coming Soon Projects */}
                    {filteredComingSoon.map((project) => (
                        <div key={project.id} data-project-card>
                            <ComingSoonProjectCard project={project} />
                        </div>
                    ))}
                </AnimatedProjectGrid>

                {/* Empty State */}
                {filteredProjects.length === 0 &&
                    filteredComingSoon.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                No projects found. Try adjusting your search or
                                filters.
                            </p>
                        </div>
                    )}
            </section>

            <section id="experience" className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Work Experience
                </h2>
                <AnimatedTimeline
                    items={experienceData.map((item) => ({
                        id: item.id,
                        title: item.role,
                        subtitle: item.company,
                        date: item.duration,
                        description: item.description,
                    }))}
                />
            </section>

            <section id="education" className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Education
                </h2>
                <AnimatedTimeline
                    items={educationData.map((item) => ({
                        id: item.id,
                        title: item.degree,
                        subtitle: item.institution,
                        date: String(item.year),
                        description: item.highlights,
                    }))}
                />
            </section>
        </div>
    )
}
