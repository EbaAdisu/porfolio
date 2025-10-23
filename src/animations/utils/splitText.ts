/**
 * Utility functions for text animations
 */

/**
 * Splits text into individual characters wrapped in spans
 */
export function splitTextIntoChars(text: string): string {
    return text
        .split('')
        .map((char) => {
            // Preserve spaces
            if (char === ' ') {
                return '<span class="char" style="display: inline-block;">&nbsp;</span>'
            }
            return `<span class="char" style="display: inline-block;">${char}</span>`
        })
        .join('')
}

/**
 * Splits text into words wrapped in spans
 */
export function splitTextIntoWords(text: string): string {
    return text
        .split(' ')
        .map((word) => {
            return `<span class="word" style="display: inline-block;">${word}&nbsp;</span>`
        })
        .join('')
}

/**
 * Splits text into lines wrapped in divs
 */
export function splitTextIntoLines(element: HTMLElement): HTMLElement[] {
    const lines: HTMLElement[] = []
    const text = element.textContent || ''
    const words = text.split(' ')

    element.innerHTML = words
        .map(
            (word) =>
                `<span style="display: inline-block;">${word}&nbsp;</span>`
        )
        .join('')

    const spans = Array.from(element.querySelectorAll('span'))
    let currentLine: HTMLSpanElement[] = []
    let previousTop = -1

    spans.forEach((span) => {
        const top = span.getBoundingClientRect().top
        if (previousTop === -1) {
            previousTop = top
        }

        if (Math.abs(top - previousTop) > 1) {
            // New line detected
            if (currentLine.length > 0) {
                const lineDiv = document.createElement('div')
                lineDiv.style.overflow = 'hidden'
                currentLine.forEach((s) =>
                    lineDiv.appendChild(s.cloneNode(true))
                )
                lines.push(lineDiv)
                currentLine = []
            }
            previousTop = top
        }
        currentLine.push(span as HTMLSpanElement)
    })

    // Add the last line
    if (currentLine.length > 0) {
        const lineDiv = document.createElement('div')
        lineDiv.style.overflow = 'hidden'
        currentLine.forEach((s) => lineDiv.appendChild(s.cloneNode(true)))
        lines.push(lineDiv)
    }

    return lines
}
