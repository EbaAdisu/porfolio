'use client'

import { durations } from '@/animations/configs/durations'
import { ease } from '@/animations/configs/ease'
import { useReducedMotion } from '@/animations/hooks/useReducedMotion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { gsap } from 'gsap'
import { InputHTMLAttributes, TextareaHTMLAttributes, useRef } from 'react'

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    id: string
}

export function AnimatedInput({
    label,
    id,
    className,
    ...props
}: AnimatedInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const labelRef = useRef<HTMLLabelElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const handleFocus = () => {
        if (prefersReducedMotion) return

        if (inputRef.current) {
            gsap.to(inputRef.current, {
                scale: 1.02,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }

        if (labelRef.current) {
            gsap.to(labelRef.current, {
                color: 'hsl(var(--primary))',
                y: -2,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }
    }

    const handleBlur = () => {
        if (prefersReducedMotion) return

        if (inputRef.current) {
            gsap.to(inputRef.current, {
                scale: 1,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }

        if (labelRef.current) {
            gsap.to(labelRef.current, {
                color: 'inherit',
                y: 0,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }
    }

    return (
        <div className="space-y-2">
            {label && (
                <Label
                    ref={labelRef}
                    htmlFor={id}
                    className="transition-colors"
                >
                    {label}
                </Label>
            )}
            <Input
                ref={inputRef}
                id={id}
                className={className}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
        </div>
    )
}

interface AnimatedTextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    id: string
}

export function AnimatedTextarea({
    label,
    id,
    className,
    ...props
}: AnimatedTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const labelRef = useRef<HTMLLabelElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const handleFocus = () => {
        if (prefersReducedMotion) return

        if (textareaRef.current) {
            gsap.to(textareaRef.current, {
                scale: 1.02,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }

        if (labelRef.current) {
            gsap.to(labelRef.current, {
                color: 'hsl(var(--primary))',
                y: -2,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }
    }

    const handleBlur = () => {
        if (prefersReducedMotion) return

        if (textareaRef.current) {
            gsap.to(textareaRef.current, {
                scale: 1,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }

        if (labelRef.current) {
            gsap.to(labelRef.current, {
                color: 'inherit',
                y: 0,
                duration: durations.fast,
                ease: ease.smooth,
            })
        }
    }

    return (
        <div className="space-y-2">
            {label && (
                <Label
                    ref={labelRef}
                    htmlFor={id}
                    className="transition-colors"
                >
                    {label}
                </Label>
            )}
            <Textarea
                ref={textareaRef}
                id={id}
                className={className}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
        </div>
    )
}
