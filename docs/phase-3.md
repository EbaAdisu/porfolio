# Phase 3: Experiences & Education

This document tracks the progress of the experiences and education sections.

## Phase Goals

- [X] Create JSON files for work experience and education data.
- [X] Build a timeline-style component for displaying entries.
- [X] Integrate the sections into the homepage.
- [X] Animate the timeline with GSAP scroll-triggered effects.

## Current Progress

- **Completed:**
  - Created `src/data/experience.json` and `src/data/education.json`.
  - Built a reusable `TimelineItem.tsx` component for displaying chronological events.
  - Added "Work Experience" and "Education" sections to the main page, which render data using the `TimelineItem` component.
  - Implemented a fade-in and slide-in animation using GSAP and `ScrollTrigger` as the user scrolls items into view.
- **Pending:**
  - None. This phase is complete.

## Implementation Details

- **Data:** Content for these sections is managed in `src/data/experience.json` and `src/data/education.json`.
- **Component:** The `TimelineItem` component is designed to be versatile for any chronological data, accepting props for title, subtitle, date, and description.
- **Animation:** The `TimelineItem` is a "use client" component that uses GSAP's `ScrollTrigger` plugin to animate items as they enter the viewport. This creates an engaging user experience.
- **Layout:** The sections are displayed on the main page beneath the portfolio, using a vertical, single-column layout for the timeline.

## Next Steps

- Proceed to Phase 4: Games Tab.