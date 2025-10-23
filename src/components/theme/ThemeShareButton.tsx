'use client'

/**
 * Theme Share Button Component
 *
 * Allows sharing themes via URL or exporting as JSON
 */

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    createThemeShareURL,
    downloadTheme,
    exportTheme,
} from '@/lib/theme-storage'
import { ThemeConfig } from '@/lib/theme-system'
import { Check, Copy, Download, Link2, Share2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ThemeShareButtonProps {
    theme: ThemeConfig
    size?: 'default' | 'sm' | 'lg' | 'icon'
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
}

export function ThemeShareButton({
    theme,
    size = 'sm',
    variant = 'outline',
}: ThemeShareButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopyURL = async () => {
        try {
            const url = createThemeShareURL(theme)
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success('Share link copied to clipboard!')
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            toast.error('Failed to copy link')
        }
    }

    const handleCopyJSON = async () => {
        try {
            const json = exportTheme(theme)
            await navigator.clipboard.writeText(json)
            toast.success('Theme JSON copied to clipboard!')
        } catch (error) {
            toast.error('Failed to copy JSON')
        }
    }

    const handleDownload = () => {
        try {
            downloadTheme(theme)
            toast.success('Theme downloaded!')
        } catch (error) {
            toast.error('Failed to download theme')
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={size} variant={variant}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleCopyURL}>
                    {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                    ) : (
                        <Link2 className="h-4 w-4 mr-2" />
                    )}
                    {copied ? 'Copied!' : 'Copy Share Link'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyJSON}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
