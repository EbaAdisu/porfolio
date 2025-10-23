'use client'

import { SocialIcons, type SocialIconType } from '@/data/social-icons'
import socialLinksData from '@/data/social-links.json'
import Link from 'next/link'

interface SocialLink {
    name: string
    href: string
    icon: SocialIconType
    description: string
    placeholder?: boolean
}

const Footer = () => {
    const currentYear = new Date().getFullYear()

    // Transform the JSON data to include the actual icon components
    const socialLinks: SocialLink[] = socialLinksData.map((link) => ({
        ...link,
        icon: link.icon as SocialIconType,
    }))

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center space-y-4">
                    {/* Social Links */}
                    <div className="flex items-center space-x-6">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target={
                                    link.href.startsWith('http')
                                        ? '_blank'
                                        : '_self'
                                }
                                rel={
                                    link.href.startsWith('http')
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                className={`flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 ${
                                    link.placeholder
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:scale-110 transform transition-transform'
                                }`}
                                title={
                                    link.placeholder
                                        ? `${link.name} - Coming Soon`
                                        : link.description
                                }
                                onClick={
                                    link.placeholder
                                        ? (e) => e.preventDefault()
                                        : undefined
                                }
                            >
                                {SocialIcons[link.icon]}
                                <span className="sr-only">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-muted-foreground text-center">
                        © {currentYear} Eba Adisu. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
