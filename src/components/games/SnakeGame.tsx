"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gridSize = 20;
  const canvasSize = 400;

  // Game state using refs to avoid re-renders in game loop
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15 });
  const directionRef = useRef({ x: 0, y: -1 }); // Start moving up

  const generateFood = () => {
    foodRef.current = {
      x: Math.floor(Math.random() * (canvasSize / gridSize)),
      y: Math.floor(Math.random() * (canvasSize / gridSize)),
    };
  };

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = { x: 0, y: -1 };
    generateFood();
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current.y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (directionRef.current.y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (directionRef.current.x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (directionRef.current.x === 0) directionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      const snake = snakeRef.current;
      const newHead = { x: snake[0].x + directionRef.current.x, y: snake[0].y + directionRef.current.y };

      // Wall collision
      if (newHead.x < 0 || newHead.x >= canvasSize / gridSize || newHead.y < 0 || newHead.y >= canvasSize / gridSize) {
        setGameOver(true);
        return;
      }

      // Self collision
      for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
          setGameOver(true);
          return;
        }
      }

      const newSnake = [newHead, ...snake];

      // Food collision
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;

      // Drawing logic
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Draw food
      ctx.fillStyle = '#f97316'; // Orange
      ctx.fillRect(foodRef.current.x * gridSize, foodRef.current.y * gridSize, gridSize, gridSize);

      // Draw snake
      ctx.fillStyle = '#10b981'; // Emerald
      snakeRef.current.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });

    }, 150);

    return () => clearInterval(gameLoop);
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg mb-4">Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="border-2 border-muted"
      />
      {gameOver && (
        <div className="absolute flex flex-col items-center justify-center bg-background/80" style={{width: canvasSize, height: canvasSize}}>
          <p className="text-4xl font-bold text-destructive">Game Over</p>
          <Button onClick={resetGame} className="mt-4">Play Again</Button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;