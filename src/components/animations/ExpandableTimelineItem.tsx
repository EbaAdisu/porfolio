'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import TypewriterText from './TypewriterText'

interface ExpandableTimelineItemProps {
    title: string
    subtitle: string
    date: string
    description: string
    skills?: string[]
    isLeft?: boolean
}

export default function ExpandableTimelineItem({
    title,
    subtitle,
    date,
    description,
    skills = [],
    isLeft = false,
}: ExpandableTimelineItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [showTypewriter, setShowTypewriter] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const skillsRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const toggleExpand = () => {
        if (!contentRef.current) return

        if (!isExpanded) {
            setIsExpanded(true)
            setShowTypewriter(true)

            if (!prefersReducedMotion) {
                gsap.to(contentRef.current, {
                    height: 'auto',
                    opacity: 1,
                    duration: durations.default,
                    ease: ease.smooth,
                })

                if (skills.length > 0 && skillsRef.current) {
                    const skillTags =
                        skillsRef.current.querySelectorAll('.skill-tag')
                    gsap.from(skillTags, {
                        y: 20,
                        opacity: 0,
                        scale: 0.8,
                        stagger: 0.05,
                        duration: durations.fast,
                        ease: ease.snap,
                        delay: 0.2,
                    })
                }
            }
        } else {
            setShowTypewriter(false)

            if (!prefersReducedMotion) {
                gsap.to(contentRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: durations.default,
                    ease: ease.smooth,
                    onComplete: () => setIsExpanded(false),
                })
            } else {
                setIsExpanded(false)
            }
        }
    }

    return (
        <div
            className={`bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            onClick={toggleExpand}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <h4 className="text-md text-primary font-semibold mb-2">
                        {subtitle}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">{date}</p>
                </div>
                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                    }`}
                />
            </div>

            {/* Expanded Content */}
            <div
                ref={contentRef}
                className="overflow-hidden"
                style={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                <div className="pt-4 border-t mt-4">
                    <p className="text-sm mb-4">
                        {showTypewriter && isExpanded ? (
                            <TypewriterText text={description} speed={20} />
                        ) : (
                            description
                        )}
                    </p>

                    {/* Skills with Wave Animation */}
                    {skills.length > 0 && (
                        <div
                            ref={skillsRef}
                            className="flex flex-wrap gap-2 mt-4"
                        >
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="skill-tag px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
