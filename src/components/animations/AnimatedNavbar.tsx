'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { ThemeToggle } from '@/components/ThemeToggle'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#education', label: 'Education' },
    { href: '/games', label: 'Games' },
]

export default function AnimatedNavbar() {
    const navRef = useRef<HTMLElement>(null)
    const linksRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (prefersReducedMotion || !linksRef.current) return

        const ctx = gsap.context(() => {
            const links = linksRef.current?.querySelectorAll('.nav-link')
            if (links && links.length > 0) {
                gsap.from(links, {
                    y: -20,
                    opacity: 0,
                    duration: durations.default,
                    stagger: 0.1,
                    ease: ease.smooth,
                    delay: 0.2,
                })
            }
        }, linksRef)

        return () => ctx.revert()
    }, [prefersReducedMotion])

    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (prefersReducedMotion) return

        gsap.to(e.currentTarget, {
            y: -2,
            duration: durations.fast,
            ease: ease.smooth,
        })
    }

    const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (prefersReducedMotion) return

        gsap.to(e.currentTarget, {
            y: 0,
            duration: durations.fast,
            ease: ease.smooth,
        })
    }

    return (
        <header
            ref={navRef}
            className={`bg-background sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-shadow duration-300 ${
                isScrolled ? 'shadow-md' : ''
            }`}
        >
            <div className="container mx-auto px-4 flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold">Eba Adisu</span>
                </Link>
                <div
                    ref={linksRef}
                    className="flex flex-1 items-center justify-end space-x-4"
                >
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="nav-link transition-colors hover:text-primary"
                                onMouseEnter={handleLinkHover}
                                onMouseLeave={handleLinkLeave}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
