'use client'

/**
 * Color Picker Component
 *
 * Advanced color picker with multiple format support and accessibility features
 */

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    createOKLCH,
    getContrastRatio,
    hexToOKLCH,
    meetsWCAGAA,
    parseOKLCH,
} from '@/lib/theme-system'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
    label: string
    value: string
    onChange: (color: string) => void
    contrastWith?: string
    showAccessibility?: boolean
}

export function ColorPicker({
    label,
    value,
    onChange,
    contrastWith,
    showAccessibility = false,
}: ColorPickerProps) {
    const [hexValue, setHexValue] = useState('#000000')
    const [format, setFormat] = useState<'hex' | 'oklch'>('oklch')

    // Convert OKLCH to approximate hex for picker
    useEffect(() => {
        const parsed = parseOKLCH(value)
        if (parsed) {
            // Simple approximation - in production use proper conversion library
            const l = Math.round(parsed.l * 255)
            const hex = `#${l.toString(16).padStart(2, '0')}${l
                .toString(16)
                .padStart(2, '0')}${l.toString(16).padStart(2, '0')}`
            setHexValue(hex)
        }
    }, [value])

    const handleHexChange = (newHex: string) => {
        setHexValue(newHex)
        const oklch = hexToOKLCH(newHex)
        onChange(oklch)
    }

    const handleInputChange = (inputValue: string) => {
        if (format === 'hex') {
            if (/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
                handleHexChange(inputValue)
            }
        } else {
            // Assume OKLCH format
            if (inputValue.startsWith('oklch(')) {
                onChange(inputValue)
            }
        }
    }

    const contrastRatio = contrastWith
        ? getContrastRatio(value, contrastWith)
        : null
    const hasGoodContrast = contrastWith
        ? meetsWCAGAA(value, contrastWith)
        : null

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{label}</Label>
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => setFormat('hex')}
                        className={`px-2 py-1 text-xs rounded ${
                            format === 'hex'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                        }`}
                    >
                        HEX
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormat('oklch')}
                        className={`px-2 py-1 text-xs rounded ${
                            format === 'oklch'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                        }`}
                    >
                        OKLCH
                    </button>
                </div>
            </div>

            <div className="flex gap-3 items-start">
                {/* Color preview */}
                <div
                    className="w-12 h-12 rounded-lg border-2 border-border flex-shrink-0"
                    style={{ backgroundColor: value }}
                />

                <div className="flex-1 space-y-2">
                    {/* Hex color picker */}
                    <HexColorPicker
                        color={hexValue}
                        onChange={handleHexChange}
                        className="w-full"
                    />

                    {/* Color value input */}
                    <Input
                        value={format === 'hex' ? hexValue : value}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="font-mono text-xs"
                        placeholder={
                            format === 'hex' ? '#000000' : 'oklch(0.5 0.1 180)'
                        }
                    />
                </div>
            </div>

            {/* Accessibility indicators */}
            {showAccessibility && contrastRatio !== null && (
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Contrast:</span>
                    <Badge
                        variant={hasGoodContrast ? 'default' : 'destructive'}
                    >
                        {contrastRatio.toFixed(2)}:1
                    </Badge>
                    {hasGoodContrast ? (
                        <Badge variant="outline" className="text-green-600">
                            ✓ WCAG AA
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="text-yellow-600">
                            ⚠ Low Contrast
                        </Badge>
                    )}
                </div>
            )}

            {/* Color suggestions */}
            <div className="flex gap-2">
                {generateColorSuggestions(value).map((suggestion, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onChange(suggestion)}
                        className="w-8 h-8 rounded border-2 border-border hover:border-primary transition-colors"
                        style={{ backgroundColor: suggestion }}
                        title="Use this color"
                    />
                ))}
            </div>
        </div>
    )
}

/**
 * Generates color suggestions based on current color
 */
function generateColorSuggestions(color: string): string[] {
    const parsed = parseOKLCH(color)
    if (!parsed) return []

    return [
        // Lighter
        createOKLCH(Math.min(1, parsed.l + 0.1), parsed.c, parsed.h),
        // Darker
        createOKLCH(Math.max(0, parsed.l - 0.1), parsed.c, parsed.h),
        // More saturated
        createOKLCH(parsed.l, Math.min(0.4, parsed.c + 0.05), parsed.h),
        // Less saturated
        createOKLCH(parsed.l, Math.max(0, parsed.c - 0.05), parsed.h),
        // Complementary
        createOKLCH(parsed.l, parsed.c, (parsed.h + 180) % 360),
    ]
}
