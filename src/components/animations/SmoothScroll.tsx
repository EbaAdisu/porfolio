'use client'

import { gsap } from 'gsap'
import { useEffect } from 'react'

export default function SmoothScroll() {
    useEffect(() => {
        // Smooth scroll for anchor links
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a[href^="#"]')

            if (link) {
                e.preventDefault()
                const href = link.getAttribute('href')
                if (!href) return

                const targetElement = document.querySelector(href)
                if (targetElement) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 80, // Account for fixed header
                        },
                        ease: 'power3.inOut',
                    })
                }
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return null
}
