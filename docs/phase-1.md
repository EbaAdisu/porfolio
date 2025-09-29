# Phase 1: Setup

This document tracks the progress of the initial project setup phase.

## Phase Goals

- [X] Initialize Next.js project with Tailwind CSS.
- [X] Set up `shadcn/ui` for the component library.
- [ ] Create basic routing and layout with a navbar and footer.
- [ ] Add a theme switcher (light/dark mode).
- [ ] Create documentation structure.

## Current Progress

- **Completed:**
  - Initialized the Next.js application using `create-next-app`.
  - Configured Tailwind CSS.
  - Initialized `shadcn/ui` and configured base theme colors and CSS variables.
- **Pending:**
  - Creation of a main layout component.
  - Building the Navbar and Footer components.
  - Implementing the theme provider and a UI toggle for switching themes.

## Implementation Details

- **Next.js:** Using the App Router and `src` directory structure.
- **Styling:** Tailwind CSS with `shadcn/ui` components. CSS variables are used for theming.
- **Components:** A `components.json` file has been created by `shadcn/ui` to manage component dependencies.

## Next Steps

- Create a `components` directory inside `src`.
- Build the `Navbar` and `Footer` components.
- Implement the `ThemeProvider` from `next-themes`.
- Add a theme toggle button to the UI.