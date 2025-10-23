# 📁 Repository Structure Guide

Quick navigation guide for the portfolio project.

---

## 📚 Documentation Hub

### Planning & Progress

-   [📋 Main Improvement Plan](./portfolio-improvement-plan.md) - Complete roadmap
-   [✅ Phase 1: Animations](./phases/phase-1-advanced-animations.md) - 🔄 In Progress
-   [🎨 Phase 2: Theme System](./phases/phase-2-theme-system.md) - ⏳ Not Started
-   [🎮 Phase 3: Games Section](./phases/phase-3-games-section.md) - ⏳ Not Started
-   [🎭 Phase 4: UI Components](./phases/phase-4-ui-components.md) - ⏳ Not Started
-   [⚡ Phase 5: Performance](./phases/phase-5-performance-polish.md) - ⏳ Not Started
-   [🌟 Phase 6: Additional Features](./phases/phase-6-additional-features.md) - ⏳ Not Started

---

## 🗂️ Source Code Organization

### 📱 Pages & Routes

**Location:** `src/app/`

-   [`page.tsx`](../src/app/page.tsx) - Home page with portfolio
-   [`layout.tsx`](../src/app/layout.tsx) - Root layout with providers
-   [`globals.css`](../src/app/globals.css) - Global styles & theme variables
-   [`games/page.tsx`](../src/app/games/page.tsx) - Games hub page
-   `admin/` - Admin dashboard (login, dashboard)
-   `api/auth/login/` - Authentication API

### 🎨 Components

#### Portfolio Components

**Location:** `src/components/portfolio/`

-   [`ProjectCategoryTabs.tsx`](../src/components/portfolio/ProjectCategoryTabs.tsx) - Animated category navigation
-   [`ComingSoonBadge.tsx`](../src/components/portfolio/ComingSoonBadge.tsx) - Pulsing badge for upcoming projects
-   [`ComingSoonProjectCard.tsx`](../src/components/portfolio/ComingSoonProjectCard.tsx) - Card for planned projects

#### Core Components

**Location:** `src/components/`

-   [`Navbar.tsx`](../src/components/Navbar.tsx) - Navigation bar
-   [`Footer.tsx`](../src/components/Footer.tsx) - Footer
-   [`ProjectCard.tsx`](../src/components/ProjectCard.tsx) - Project display card
-   [`TimelineItem.tsx`](../src/components/TimelineItem.tsx) - Experience/education timeline
-   [`ThemeToggle.tsx`](../src/components/ThemeToggle.tsx) - Theme switcher
-   [`theme-provider.tsx`](../src/components/theme-provider.tsx) - Theme context provider

#### Game Components

**Location:** `src/components/games/`

-   [`SnakeGame.tsx`](../src/components/games/SnakeGame.tsx) - Snake game implementation

#### UI Components (shadcn/ui)

**Location:** `src/components/ui/`

-   [`badge.tsx`](../src/components/ui/badge.tsx) - Badge component
-   [`button.tsx`](../src/components/ui/button.tsx) - Button component
-   [`card.tsx`](../src/components/ui/card.tsx) - Card component
-   [`dropdown-menu.tsx`](../src/components/ui/dropdown-menu.tsx) - Dropdown menu
-   [`input.tsx`](../src/components/ui/input.tsx) - Input field
-   [`label.tsx`](../src/components/ui/label.tsx) - Label component
-   [`sonner.tsx`](../src/components/ui/sonner.tsx) - Toast notifications
-   [`textarea.tsx`](../src/components/ui/textarea.tsx) - Textarea component
-   [`alert-dialog.tsx`](../src/components/ui/alert-dialog.tsx) - Alert dialog

#### Admin Components

**Location:** `src/components/admin/`

-   [`ProjectForm.tsx`](../src/components/admin/ProjectForm.tsx) - Project CRUD form

---

### 🎭 Animations System

#### Animation Configurations

**Location:** `src/animations/configs/`

-   [`ease.ts`](../src/animations/configs/ease.ts) - Easing presets
-   [`durations.ts`](../src/animations/configs/durations.ts) - Duration constants
-   [`defaults.ts`](../src/animations/configs/defaults.ts) - Default animation configs

#### Animation Hooks

**Location:** `src/animations/hooks/`

-   [`useReducedMotion.ts`](../src/animations/hooks/useReducedMotion.ts) - Accessibility hook

#### GSAP Setup

**Location:** `src/lib/`

-   [`gsap-setup.ts`](../src/lib/gsap-setup.ts) - GSAP configuration & plugin registration

---

### 📊 Data & Content

**Location:** `src/data/`

-   [`projects.json`](../src/data/projects.json) - Portfolio projects
-   [`experience.json`](../src/data/experience.json) - Work experience
-   [`education.json`](../src/data/education.json) - Education history
-   [`project-categories.ts`](../src/data/project-categories.ts) - **NEW!** 11 tech categories + 17 coming soon projects

---

### 🛠️ Utilities

**Location:** `src/lib/`

-   [`utils.ts`](../src/lib/utils.ts) - Utility functions (cn helper)
-   [`gsap-setup.ts`](../src/lib/gsap-setup.ts) - GSAP configuration

**Location:** `src/middleware.ts`

-   [`middleware.ts`](../src/middleware.ts) - Next.js middleware (auth, etc.)

---

## 🎯 Quick Access by Feature

### 🎨 Theming

```
src/app/globals.css              → Theme CSS variables
src/components/ThemeToggle.tsx   → Theme switcher UI
src/components/theme-provider.tsx → Theme context
```

### 🎬 Animations

```
src/lib/gsap-setup.ts                  → GSAP config
src/animations/configs/                → Animation presets
src/animations/hooks/useReducedMotion.ts → Accessibility
src/components/ProjectCard.tsx         → Hover animations
src/components/TimelineItem.tsx        → Scroll animations
```

### 📂 Portfolio Projects

```
src/data/projects.json                  → Project data
src/data/project-categories.ts          → Categories & coming soon
src/components/ProjectCard.tsx          → Project display
src/components/portfolio/ProjectCategoryTabs.tsx → Category navigation
src/app/page.tsx                        → Portfolio page
```

### 🎮 Games

```
src/app/games/page.tsx              → Games hub
src/components/games/SnakeGame.tsx  → Snake game
```

### 👤 Admin

```
src/app/admin/dashboard/page.tsx    → Admin dashboard
src/app/admin/login/page.tsx        → Admin login
src/app/api/auth/login/route.ts     → Auth API
src/components/admin/ProjectForm.tsx → CRUD form
src/middleware.ts                    → Auth middleware
```

---

## 📦 Configuration Files

### Root Level

-   [`package.json`](../package.json) - Dependencies & scripts
-   [`tsconfig.json`](../tsconfig.json) - TypeScript config
-   [`next.config.ts`](../next.config.ts) - Next.js config
-   [`postcss.config.mjs`](../postcss.config.mjs) - PostCSS config
-   [`eslint.config.mjs`](../eslint.config.mjs) - ESLint config
-   [`components.json`](../components.json) - shadcn/ui config
-   [`README.md`](../README.md) - Project README

---

## 🚀 Common Tasks

### Adding a New Project

1. Edit [`src/data/projects.json`](../src/data/projects.json)
2. Add project details with category field
3. Add image to `public/images/projects/`

### Adding a Coming Soon Project

1. Edit [`src/data/project-categories.ts`](../src/data/project-categories.ts)
2. Add to `comingSoonProjects` array
3. Assign appropriate category

### Creating New Component

1. Add to appropriate folder:
    - UI components → `src/components/ui/`
    - Feature components → `src/components/[feature]/`
    - Page-specific → `src/app/[page]/`

### Adding New Page

1. Create folder: `src/app/[page-name]/`
2. Add `page.tsx` file
3. Add to navbar if needed

### Adding Animation

1. Create hook in `src/animations/hooks/`
2. Use GSAP from `src/lib/gsap-setup.ts`
3. Use presets from `src/animations/configs/`

---

## 📈 Project Statistics

### Current State

-   ✅ **Pages:** 3 (Home, Games, Admin)
-   ✅ **Components:** 20+ components
-   ✅ **Categories:** 11 tech categories
-   ✅ **Projects:** 2 completed + 17 coming soon
-   ✅ **Dependencies:** 27 packages
-   ✅ **Phase Progress:** Phase 1 (20% complete)

### Tech Stack

-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS 4
-   **UI:** shadcn/ui (Radix UI)
-   **Animations:** GSAP 3.13
-   **State:** Zustand (planned)
-   **Theme:** next-themes

---

## 🔍 Finding Specific Code

### Need to Find...

**Authentication Logic?**
→ [`src/middleware.ts`](../src/middleware.ts) + [`src/app/api/auth/login/route.ts`](../src/app/api/auth/login/route.ts)

**Project Categories?**
→ [`src/data/project-categories.ts`](../src/data/project-categories.ts)

**Theme Styles?**
→ [`src/app/globals.css`](../src/app/globals.css) (lines 46-113)

**Animation Configs?**
→ [`src/animations/configs/`](../src/animations/configs/)

**GSAP Setup?**
→ [`src/lib/gsap-setup.ts`](../src/lib/gsap-setup.ts)

**UI Components?**
→ [`src/components/ui/`](../src/components/ui/)

**Game Logic?**
→ [`src/components/games/SnakeGame.tsx`](../src/components/games/SnakeGame.tsx)

**Portfolio Display?**
→ [`src/app/page.tsx`](../src/app/page.tsx) (lines 57-86)

---

## 🎯 Next Steps for Each Phase

### Phase 1 (Current)

**Next Files to Create:**

-   `src/components/animations/HeroAnimations.tsx`
-   `src/animations/hooks/useHeroAnimation.ts`
-   `src/components/animations/ParticleSystem.tsx`

### Phase 2 (Upcoming)

**Next Files to Create:**

-   `src/lib/theme-system.ts`
-   `src/components/theme/ThemeCustomizer.tsx`
-   `src/styles/themes/midnight-blue.css`

### Phase 3 (Upcoming)

**Next Files to Create:**

-   `src/components/games/GameHub.tsx`
-   `src/components/games/TicTacToe.tsx`
-   `src/lib/game-achievements.ts`

---

## 💡 Tips

-   **Looking for a component?** Check `src/components/` first
-   **Need data?** Check `src/data/` JSON files
-   **Adding styles?** Use Tailwind classes or `globals.css`
-   **New animation?** Use hooks from `src/animations/hooks/`
-   **Lost?** Use this file's Quick Access section above!

---

## 📞 Quick Reference Links

-   [Main Plan](./portfolio-improvement-plan.md)
-   [Phase 1 Progress](./phases/phase-1-advanced-animations.md)
-   [Project README](../README.md)
-   [Package.json](../package.json)

---

**Last Updated:** October 1, 2025  
**Current Branch:** `feature/portfolio-improvements`  
**Status:** 🚀 Active Development
