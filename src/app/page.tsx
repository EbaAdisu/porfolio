'use client'

import { Project } from '@/components/ProjectCard'
import AnimatedTimeline from '@/components/animations/AnimatedTimeline'
import EnhancedProjectCard from '@/components/animations/EnhancedProjectCard'
import HeroSection from '@/components/animations/HeroSection'
import ComingSoonProjectCard from '@/components/portfolio/ComingSoonProjectCard'
import ProjectCategoryTabs from '@/components/portfolio/ProjectCategoryTabs'
import educationData from '@/data/education.json'
import experienceData from '@/data/experience.json'
import { comingSoonProjects } from '@/data/project-categories'
import projectsData from '@/data/projects.json'
import { useMemo, useState } from 'react'

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('all')
    const projects: Project[] = projectsData

    // Filter projects by category
    const filteredProjects = useMemo(() => {
        if (activeCategory === 'all') return projects
        return projects.filter((p) => p.category === activeCategory)
    }, [projects, activeCategory])

    // Filter coming soon projects by category
    const filteredComingSoon = useMemo(() => {
        if (activeCategory === 'all') return comingSoonProjects
        return comingSoonProjects.filter((p) => p.category === activeCategory)
    }, [activeCategory])

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
    }, [projects])

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Debug: Simple test content */}
            <div className="mb-8 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">
                    Debug: Content is rendering
                </h1>
                <p className="text-green-700 dark:text-green-300">
                    If you can see this, the page is working correctly.
                </p>
            </div>

            <HeroSection
                name="Eba Adisu Kenea"
                description="I am a software engineer from Ethiopia. While becoming one in an undeveloped country wasn't easy due to having fewer opportunities to succeed, I was always driven by the belief that adversity can be a motivator. I am committed to pushing the boundaries of software development through continuous learning and embracing emerging technologies."
            />

            <section id="portfolio" className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center">My Work</h2>

                {/* Category Tabs */}
                <ProjectCategoryTabs
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    projectCounts={projectCounts}
                />

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Completed Projects */}
                    {filteredProjects.map((project) => (
                        <EnhancedProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}

                    {/* Coming Soon Projects */}
                    {filteredComingSoon.map((project) => (
                        <ComingSoonProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 &&
                    filteredComingSoon.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                No projects in this category yet. Check back
                                soon!
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
