# Phase 4: Games Tab

This document tracks the progress of the games tab feature.

## Phase Goals

- [X] Create a dedicated `/games` page.
- [X] Implement a simple "Snake" game using HTML5 Canvas.
- [X] Structure the code to allow for easy addition of new games.

## Current Progress

- **Completed:**
  - Created a new route and page at `src/app/games/page.tsx`.
  - Built a fully functional `SnakeGame` component in `src/components/games/SnakeGame.tsx`.
  - The `SnakeGame` component handles its own state, game loop, rendering on an HTML5 Canvas, and keyboard input.
  - The project is structured with a `src/components/games` directory to easily accommodate new game components in the future.
- **Pending:**
  - None. This phase is complete.

## Implementation Details

- **Routing:** A new page was created using the Next.js App Router by adding a `page.tsx` file inside a `games` directory.
- **Game Logic:** The Snake game is encapsulated entirely within the `SnakeGame.tsx` client component. It uses React's `useRef` hook to manage game state like the snake's position and direction without causing re-renders inside the `setInterval`-based game loop. `useState` is used for properties that should trigger UI updates, like the score and game-over state.
- **Rendering:** The game is rendered on an HTML5 `<canvas>` element. The component's `useEffect` hook handles the drawing logic for the snake and food.
- **Controls:** Keyboard events for controlling the snake are handled by a `keydown` event listener attached to the `window` object.

## Next Steps

- Proceed to Phase 5: Admin Page.