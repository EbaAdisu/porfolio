# Phase 2: Core Portfolio

This document tracks the progress of the core portfolio section.

## Phase Goals

- [X] Create a dynamic data source for projects (JSON).
- [X] Build a reusable `ProjectCard` component.
- [X] Display projects on the homepage in a grid layout.
- [X] Add GSAP animations for hover effects on project cards.

## Current Progress

- **Completed:**
  - Created `src/data/projects.json` with placeholder project data.
  - Built the `ProjectCard.tsx` component to display project information, including title, description, image, tags, and links.
  - Integrated the project cards into the main page, which dynamically renders them from the JSON file.
  - Implemented a subtle scale-on-hover effect using GSAP on the project cards.
- **Pending:**
  - None. This phase is complete.

## Implementation Details

- **Data:** Project data is managed in `src/data/projects.json`, allowing for easy updates without changing code.
- **Component:** The `ProjectCard` component is fully typed with a `Project` interface, ensuring data consistency.
- **Animation:** GSAP is used within a `useEffect` hook in `ProjectCard.tsx` to add an interactive hover animation. The component was converted to a "use client" component to support this.
- **Layout:** A responsive grid layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) is used to display the project cards.

## Next Steps

- Proceed to Phase 3: Experiences & Education.