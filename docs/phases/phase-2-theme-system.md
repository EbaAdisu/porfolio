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

-   [x] Create `theme-system.ts` with `ThemeConfig` interface
-   [x] Define all color tokens structure
-   [x] Set up font configuration system
-   [x] Create animation configuration (duration, easing)
-   [x] Build theme validation logic

#### Predefined Themes

-   [x] Create "midnight-blue" theme (dark blue with purple accents)
-   [x] Create "sunset-orange" theme (warm orange and pink)
-   [x] Create "forest-green" theme (natural green tones)
-   [x] Create "cyber-neon" theme (neon colors with dark bg)
-   [x] Create "minimal-mono" theme (black and white)
-   [x] Create "ocean-breeze" theme (blue and teal)
-   [x] Create "royal-purple" theme (deep purple)
-   [x] Update "light" theme (default light)
-   [x] Update "dark" theme (default dark)

#### Theme CSS Files

-   [x] Create `themes/midnight-blue.css`
-   [x] Create `themes/sunset-orange.css`
-   [x] Create `themes/cyber-neon.css`
-   [x] Create `themes/forest-green.css`
-   [x] Create `themes/minimal-mono.css`
-   [x] Create `themes/ocean-breeze.css`
-   [x] Create `themes/royal-purple.css`

#### Theme Management

-   [x] Create `theme-presets.ts` with all theme definitions
-   [x] Build theme loading logic
-   [x] Implement theme switching mechanism
-   [x] Add theme validation and error handling

---

### 2.2 Theme Customization Panel (4-5 hours)

#### Visual Theme Picker

-   [x] Create `ThemePicker` component
-   [x] Build grid of theme preview cards
-   [x] Implement live preview before applying
-   [x] Add animated theme transitions (smooth color morphing)
-   [x] Show theme metadata (name, description, tags)

#### Custom Theme Builder

-   [x] Create `ThemeCustomizer` component
-   [x] Build `ColorPicker` component for each color token
-   [x] Add font family selector
-   [x] Create border radius slider
-   [x] Add animation speed selector
-   [x] Implement save custom themes to localStorage
-   [x] Add export theme as JSON
-   [x] Add import theme from JSON

#### Theme Settings Modal

-   [x] Create modal accessible via settings icon in navbar
-   [x] Organize sections (Colors, Typography, Effects)
-   [x] Add "Reset to defaults" button
-   [x] Build theme share link functionality
-   [x] Create theme preview pane
-   [x] Add copy theme code button

#### Color Picker Features

-   [x] Implement color picker with hex input
-   [x] Add RGB/HSL/OKLCH format support
-   [x] Create color palette suggestions
-   [x] Add color contrast checker
-   [x] Show accessibility warnings for poor contrast

---

### 2.3 Theme Persistence & Syncing (2 hours)

#### Storage

-   [x] Create `theme-storage.ts` utility
-   [x] Implement localStorage persistence
-   [x] Add custom theme storage
-   [x] Build theme history (last 5 themes)

#### URL-based Sharing

-   [x] Implement URL parameter parsing (`?theme=custom-xyz`)
-   [x] Create theme encoding/decoding
-   [x] Add share link generation
-   [x] Build theme import from URL

#### Smooth Transitions

-   [x] Implement GSAP theme transition animations
-   [x] Add color morphing between themes
-   [x] Create loading state for theme switching
-   [x] Prevent flash of unstyled content (FOUC)

#### Enhanced Theme Provider

-   [x] Extend `ThemeProvider` component
-   [x] Add custom theme support
-   [x] Implement theme switching with animations
-   [x] Add theme context for components

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

-   [x] All 9 predefined themes work perfectly
-   [x] Custom theme builder is fully functional
-   [x] Theme persistence works reliably
-   [ ] All accessibility requirements met (to be tested)
-   [x] Smooth animations between theme switches
-   [x] Export/Import functionality works
-   [x] URL sharing works correctly
-   [x] All tests pass (build successful)
-   [x] Documentation is complete
-   [ ] Git commit with clear message (user to commit)

---

**Previous Phase:** [Phase 1 - Advanced Animations](./phase-1-advanced-animations.md)  
**Next Phase:** [Phase 3 - Enhanced Games Section](./phase-3-games-section.md)
