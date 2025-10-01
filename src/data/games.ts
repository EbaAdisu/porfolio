export interface Game {
    id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    players: string
    component: string // Component name to lazy load
}

export const games: Game[] = [
    {
        id: 'snake',
        title: 'Snake Game',
        description:
            'Classic snake game with smooth controls. Eat food, grow longer, and avoid hitting yourself or the walls!',
        difficulty: 'Easy',
        players: 'Single Player',
        component: 'SnakeGame',
    },
    {
        id: 'tetris',
        title: 'Tetris',
        description:
            'Arrange falling blocks to create complete lines. A timeless puzzle game! (Coming Soon)',
        difficulty: 'Medium',
        players: 'Single Player',
        component: 'TetrisGame',
    },
    {
        id: 'pong',
        title: 'Pong',
        description:
            'Classic arcade game. Control the paddle and keep the ball in play! (Coming Soon)',
        difficulty: 'Easy',
        players: 'Single Player',
        component: 'PongGame',
    },
    {
        id: 'memory',
        title: 'Memory Match',
        description:
            'Test your memory by matching pairs of cards. How fast can you complete it? (Coming Soon)',
        difficulty: 'Easy',
        players: 'Single Player',
        component: 'MemoryGame',
    },
]
