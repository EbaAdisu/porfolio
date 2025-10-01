# Phase 2: Customizable Theme System 🎨

**Priority:** HIGH  
**Total Estimated Time:** 11-13 hours  
**Status:** ⏳ Not Started

---

## Overview

Build a comprehensive multi-theme system that goes beyond basic dark/light modes, allowing users to choose from predefined themes or create their own custom themes with full control over colors, fonts, and animations.

---

## Task Checklist

### 2.1 Multi-Theme Architecture (5-6 hours)

#### Core Theme System

-   [ ] Create `theme-system.ts` with `ThemeConfig` interface
-   [ ] Define all color tokens structure
-   [ ] Set up font configuration system
-   [ ] Create animation configuration (duration, easing)
-   [ ] Build theme validation logic

#### Predefined Themes

-   [ ] Create "midnight-blue" theme (dark blue with purple accents)
-   [ ] Create "sunset-orange" theme (warm orange and pink)
-   [ ] Create "forest-green" theme (natural green tones)
-   [ ] Create "cyber-neon" theme (neon colors with dark bg)
-   [ ] Create "minimal-mono" theme (black and white)
-   [ ] Create "ocean-breeze" theme (blue and teal)
-   [ ] Create "royal-purple" theme (deep purple)
-   [ ] Update "light" theme (default light)
-   [ ] Update "dark" theme (default dark)

#### Theme CSS Files

-   [ ] Create `themes/midnight-blue.css`
-   [ ] Create `themes/sunset-orange.css`
-   [ ] Create `themes/cyber-neon.css`
-   [ ] Create `themes/forest-green.css`
-   [ ] Create `themes/minimal-mono.css`
-   [ ] Create `themes/ocean-breeze.css`
-   [ ] Create `themes/royal-purple.css`

#### Theme Management

-   [ ] Create `theme-presets.ts` with all theme definitions
-   [ ] Build theme loading logic
-   [ ] Implement theme switching mechanism
-   [ ] Add theme validation and error handling

---

### 2.2 Theme Customization Panel (4-5 hours)

#### Visual Theme Picker

-   [ ] Create `ThemePicker` component
-   [ ] Build grid of theme preview cards
-   [ ] Implement live preview before applying
-   [ ] Add animated theme transitions (smooth color morphing)
-   [ ] Show theme metadata (name, description, tags)

#### Custom Theme Builder

-   [ ] Create `ThemeCustomizer` component
-   [ ] Build `ColorPicker` component for each color token
-   [ ] Add font family selector
-   [ ] Create border radius slider
-   [ ] Add animation speed selector
-   [ ] Implement save custom themes to localStorage
-   [ ] Add export theme as JSON
-   [ ] Add import theme from JSON

#### Theme Settings Modal

-   [ ] Create modal accessible via settings icon in navbar
-   [ ] Organize sections (Colors, Typography, Effects)
-   [ ] Add "Reset to defaults" button
-   [ ] Build theme share link functionality
-   [ ] Create theme preview pane
-   [ ] Add copy theme code button

#### Color Picker Features

-   [ ] Implement color picker with hex input
-   [ ] Add RGB/HSL/OKLCH format support
-   [ ] Create color palette suggestions
-   [ ] Add color contrast checker
-   [ ] Show accessibility warnings for poor contrast

---

### 2.3 Theme Persistence & Syncing (2 hours)

#### Storage

-   [ ] Create `theme-storage.ts` utility
-   [ ] Implement localStorage persistence
-   [ ] Add custom theme storage
-   [ ] Build theme history (last 5 themes)

#### URL-based Sharing

-   [ ] Implement URL parameter parsing (`?theme=custom-xyz`)
-   [ ] Create theme encoding/decoding
-   [ ] Add share link generation
-   [ ] Build theme import from URL

#### Smooth Transitions

-   [ ] Implement GSAP theme transition animations
-   [ ] Add color morphing between themes
-   [ ] Create loading state for theme switching
-   [ ] Prevent flash of unstyled content (FOUC)

#### Enhanced Theme Provider

-   [ ] Extend `ThemeProvider` component
-   [ ] Add custom theme support
-   [ ] Implement theme switching with animations
-   [ ] Add theme context for components

---

## Testing Checklist

### Functionality

-   [ ] All predefined themes apply correctly
-   [ ] Custom theme builder works for all tokens
-   [ ] Theme persistence works across page refreshes
-   [ ] URL sharing works correctly
-   [ ] Export/Import theme JSON works

### Accessibility

-   [ ] All themes pass WCAG AA contrast requirements
-   [ ] Color picker is keyboard accessible
-   [ ] Screen reader announcements work
-   [ ] Focus indicators visible in all themes

### Performance

-   [ ] Theme switching is smooth (< 300ms)
-   [ ] No layout shift when switching themes
-   [ ] localStorage doesn't exceed limits
-   [ ] Theme CSS loads efficiently

### Browser Compatibility

-   [ ] Themes work in all major browsers
-   [ ] OKLCH color support with fallbacks
-   [ ] LocalStorage works correctly
-   [ ] URL parameters parse correctly

---

## Files Created/Modified

### New Files

```
src/
├── components/
│   └── theme/
│       ├── ThemeCustomizer.tsx
│       ├── ThemePicker.tsx
│       ├── ColorPicker.tsx
│       ├── ThemePreview.tsx
│       ├── ThemeModal.tsx
│       └── ThemeShareButton.tsx
├── hooks/
│   ├── useThemeCustomization.ts
│   └── useThemeTransition.ts
├── lib/
│   ├── theme-system.ts
│   ├── theme-storage.ts
│   └── theme-presets.ts
└── styles/
    └── themes/
        ├── midnight-blue.css
        ├── sunset-orange.css
        ├── cyber-neon.css
        ├── forest-green.css
        ├── minimal-mono.css
        ├── ocean-breeze.css
        └── royal-purple.css
```

### Modified Files

```
src/components/theme-provider.tsx
src/components/ThemeToggle.tsx
src/components/Navbar.tsx
src/app/globals.css
```

---

## Dependencies to Check

Already have:

-   ✅ `next-themes` (installed)
-   ✅ `zustand` (to be installed in Phase 1)

Additional:

```bash
npm install react-colorful
```

---

## State Management Structure

```typescript
// Using Zustand for theme state
interface ThemeState {
    currentTheme: string
    customThemes: ThemeConfig[]
    isCustomizing: boolean
    previewTheme: ThemeConfig | null

    setTheme: (themeId: string) => void
    saveCustomTheme: (theme: ThemeConfig) => void
    deleteCustomTheme: (themeId: string) => void
    setPreviewTheme: (theme: ThemeConfig | null) => void
    exportTheme: (themeId: string) => string
    importTheme: (json: string) => void
}
```

---

## UI/UX Considerations

-   Theme picker should be easily accessible (settings icon in navbar)
-   Preview changes live before applying
-   Show theme name and description
-   Add visual indicators for active theme
-   Provide undo/redo for theme changes
-   Show loading state during theme switch
-   Add success message when theme is saved
-   Warn users before leaving with unsaved changes

---

## Color Tokens to Support

```typescript
interface ThemeColors {
    // Base
    background: string
    foreground: string

    // Component
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string

    // Semantic
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string

    // UI
    border: string
    input: string
    ring: string

    // Charts (optional)
    chart1: string
    chart2: string
    chart3: string
    chart4: string
    chart5: string
}
```

---

## Notes

-   Use OKLCH color space for better color manipulation
-   Provide fallbacks for browsers without OKLCH support
-   Keep theme files modular for easy maintenance
-   Document theme creation guidelines
-   Add theme gallery showcase
-   Consider adding seasonal/holiday themes

---

## Completion Criteria

-   [ ] All 9 predefined themes work perfectly
-   [ ] Custom theme builder is fully functional
-   [ ] Theme persistence works reliably
-   [ ] All accessibility requirements met
-   [ ] Smooth animations between theme switches
-   [ ] Export/Import functionality works
-   [ ] URL sharing works correctly
-   [ ] All tests pass
-   [ ] Documentation is complete
-   [ ] Git commit with clear message

---

**Previous Phase:** [Phase 1 - Advanced Animations](./phase-1-advanced-animations.md)  
**Next Phase:** [Phase 3 - Enhanced Games Section](./phase-3-games-section.md)
