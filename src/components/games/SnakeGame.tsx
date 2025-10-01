'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedScoreCounter from '../animations/AnimatedScoreCounter'
import ConfettiAnimation from '../animations/ConfettiAnimation'
import ElasticButton from '../animations/ElasticButton'
import GameLoadingAnimation from '../animations/GameLoadingAnimation'

const SnakeGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [gameOver, setGameOver] = useState(false)
    const [victory, setVictory] = useState(false)
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const gridSize = 20
    const canvasSize = 400
    const victoryScore = 100 // Win condition

    // Game state using refs to avoid re-renders in game loop
    const snakeRef = useRef([{ x: 10, y: 10 }])
    const foodRef = useRef({ x: 15, y: 15 })
    const directionRef = useRef({ x: 0, y: -1 }) // Start moving up

    const generateFood = () => {
        foodRef.current = {
            x: Math.floor(Math.random() * (canvasSize / gridSize)),
            y: Math.floor(Math.random() * (canvasSize / gridSize)),
        }
    }

    const resetGame = () => {
        snakeRef.current = [{ x: 10, y: 10 }]
        directionRef.current = { x: 0, y: -1 }
        generateFood()
        setScore(0)
        setGameOver(false)
        setVictory(false)
    }

    const startGame = () => {
        setIsLoading(false)
        resetGame()
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current.y === 0)
                        directionRef.current = { x: 0, y: -1 }
                    break
                case 'ArrowDown':
                    if (directionRef.current.y === 0)
                        directionRef.current = { x: 0, y: 1 }
                    break
                case 'ArrowLeft':
                    if (directionRef.current.x === 0)
                        directionRef.current = { x: -1, y: 0 }
                    break
                case 'ArrowRight':
                    if (directionRef.current.x === 0)
                        directionRef.current = { x: 1, y: 0 }
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (gameOver) return

        const gameLoop = setInterval(() => {
            const snake = snakeRef.current
            const newHead = {
                x: snake[0].x + directionRef.current.x,
                y: snake[0].y + directionRef.current.y,
            }

            // Wall collision
            if (
                newHead.x < 0 ||
                newHead.x >= canvasSize / gridSize ||
                newHead.y < 0 ||
                newHead.y >= canvasSize / gridSize
            ) {
                setGameOver(true)
                return
            }

            // Self collision
            for (let i = 1; i < snake.length; i++) {
                if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                    setGameOver(true)
                    return
                }
            }

            const newSnake = [newHead, ...snake]

            // Food collision
            if (
                newHead.x === foodRef.current.x &&
                newHead.y === foodRef.current.y
            ) {
                setScore((s) => {
                    const newScore = s + 10
                    // Check for victory
                    if (newScore >= victoryScore) {
                        setVictory(true)
                        setGameOver(true)
                    }
                    return newScore
                })
                generateFood()
            } else {
                newSnake.pop()
            }

            snakeRef.current = newSnake

            // Drawing logic
            const canvas = canvasRef.current
            const ctx = canvas?.getContext('2d')
            if (!ctx) return

            ctx.clearRect(0, 0, canvasSize, canvasSize)

            // Draw food
            ctx.fillStyle = '#f97316' // Orange
            ctx.fillRect(
                foodRef.current.x * gridSize,
                foodRef.current.y * gridSize,
                gridSize,
                gridSize
            )

            // Draw snake
            ctx.fillStyle = '#10b981' // Emerald
            snakeRef.current.forEach((segment) => {
                ctx.fillRect(
                    segment.x * gridSize,
                    segment.y * gridSize,
                    gridSize,
                    gridSize
                )
            })
        }, 150)

        return () => clearInterval(gameLoop)
    }, [gameOver])

    return (
        <>
            {/* Loading Animation */}
            {isLoading && <GameLoadingAnimation onComplete={startGame} />}

            {/* Victory Confetti */}
            <ConfettiAnimation active={victory} particleCount={150} />

            <div className="flex flex-col items-center">
                {/* Animated Score Counter */}
                <AnimatedScoreCounter score={score} className="mb-6" />

                {/* Game Canvas */}
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        width={canvasSize}
                        height={canvasSize}
                        className="border-2 border-primary rounded-lg shadow-lg"
                    />

                    {/* Game Over Overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/98 backdrop-blur-md rounded-lg">
                            {victory ? (
                                <>
                                    <p className="text-5xl font-bold text-green-500 mb-2">
                                        Victory!
                                    </p>
                                    <p className="text-xl text-muted-foreground mb-4">
                                        🎉 You Won! 🎉
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-5xl font-bold text-destructive mb-2">
                                        Game Over
                                    </p>
                                    <p className="text-xl text-muted-foreground mb-4">
                                        Try again!
                                    </p>
                                </>
                            )}
                            <ElasticButton onClick={resetGame} size="lg">
                                Play Again
                            </ElasticButton>
                        </div>
                    )}
                </div>

                {/* Game Instructions */}
                <div className="mt-6 text-center text-sm text-muted-foreground max-w-md">
                    <p className="mb-2">Use arrow keys to control the snake</p>
                    <p>Reach {victoryScore} points to win! 🏆</p>
                </div>
            </div>
        </>
    )
}

export default SnakeGame
