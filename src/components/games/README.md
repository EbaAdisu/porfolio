# Games Components 🎮

This directory contains all game-related components for the portfolio's interactive games section.

## Structure

```
src/components/games/
├── README.md           # This file
├── GameCard.tsx        # Game selection card component
├── SnakeGame.tsx       # Classic Snake game
└── [future games...]   # TetrisGame.tsx, PongGame.tsx, etc.
```

## Available Games

### ✅ Implemented

1. **SnakeGame.tsx** - Classic Snake Game
    - Features: Score counter, victory conditions, game over screen
    - Animations: Loading screen, confetti on win, elastic buttons
    - Controls: Arrow keys

### 🔜 Coming Soon

2. **TetrisGame.tsx** - Tetris (Planned)
3. **PongGame.tsx** - Pong (Planned)
4. **MemoryGame.tsx** - Memory Match (Planned)

## Components

### GameCard

Displays a selectable game card with:

-   Game title and description
-   Difficulty badge (Easy/Medium/Hard)
-   Player count
-   Play button with elastic animation

**Usage:**

```tsx
<GameCard
    title="Snake Game"
    description="Classic snake game..."
    difficulty="Easy"
    players="Single Player"
    onPlay={() => handlePlayGame('snake')}
/>
```

### SnakeGame

The classic snake game with full animations:

-   **Loading Screen** - Animated shapes on game start
-   **Score Counter** - Animated number counting
-   **Victory Confetti** - Particle explosion on win
-   **Elastic Buttons** - Bouncy "Play Again" button
-   **Game Over Screen** - Overlay with victory/loss state

**Features:**

-   Win condition: Reach 100 points
-   Smooth controls with arrow keys
-   Food collection mechanics
-   Wall and self-collision detection

## Adding a New Game

1. Create your game component (e.g., `TetrisGame.tsx`)
2. Add game animations using existing components
3. Register in `src/data/games.ts`
4. Update the games page to render your component

**Template:**

```tsx
'use client'

import { useState } from 'react'
import AnimatedScoreCounter from '../animations/AnimatedScoreCounter'
import ElasticButton from '../animations/ElasticButton'
import GameLoadingAnimation from '../animations/GameLoadingAnimation'

export default function YourGame() {
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading && (
                <GameLoadingAnimation onComplete={() => setIsLoading(false)} />
            )}
            <div>
                <AnimatedScoreCounter score={score} />
                {/* Your game logic */}
            </div>
        </>
    )
}
```

## Game Animations

All games can use these animation components:

-   **AnimatedGameCard** - 3D floating card wrapper
-   **AnimatedScoreCounter** - Number counter with pop effect
-   **ConfettiAnimation** - Victory particle explosion
-   **GameLoadingAnimation** - Loading screen with shapes
-   **ElasticButton** - Bouncy button press effect

## Data Management

Games are registered in `src/data/games.ts`:

```typescript
export const games: Game[] = [
    {
        id: 'snake',
        title: 'Snake Game',
        description: '...',
        difficulty: 'Easy',
        players: 'Single Player',
        component: 'SnakeGame',
    },
    // Add more games here
]
```

## Best Practices

1. **Use Canvas** - For better performance with game graphics
2. **RequestAnimationFrame** - For smooth game loops
3. **Cleanup** - Always clean up intervals/RAF in useEffect
4. **Responsive** - Make games work on different screen sizes
5. **Accessibility** - Include keyboard controls and instructions

---

**Last Updated:** October 1, 2025
