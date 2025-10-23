'use client'

import AnimatedGameCard from '@/components/animations/AnimatedGameCard'
import GameCard from '@/components/games/GameCard'
import SnakeGame from '@/components/games/SnakeGame'
import { games } from '@/data/games'
import { useState } from 'react'

const GamesPage = () => {
    const [selectedGame, setSelectedGame] = useState<string | null>(null)

    const handlePlayGame = (gameId: string) => {
        // Only Snake is available for now
        if (gameId === 'snake') {
            setSelectedGame(gameId)
        } else {
            alert('This game is coming soon! 🎮')
        }
    }

    const handleBackToGames = () => {
        setSelectedGame(null)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="text-center my-16">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                    Mini-Games 🎮
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A collection of fun, interactive games built with React and
                    Canvas. Choose a game and start playing!
                </p>
            </section>

            {/* Game Selection Grid */}
            {!selectedGame ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {games.map((game) => (
                        <AnimatedGameCard key={game.id}>
                            <GameCard
                                title={game.title}
                                description={game.description}
                                difficulty={game.difficulty}
                                players={game.players}
                                onPlay={() => handlePlayGame(game.id)}
                            />
                        </AnimatedGameCard>
                    ))}
                </div>
            ) : (
                /* Active Game Display */
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6 flex items-center justify-between">
                        <button
                            onClick={handleBackToGames}
                            className="text-primary hover:underline flex items-center gap-2"
                        >
                            ← Back to Games
                        </button>
                        <h2 className="text-2xl font-bold">
                            {games.find((g) => g.id === selectedGame)?.title}
                        </h2>
                    </div>

                    <AnimatedGameCard className="w-full">
                        {selectedGame === 'snake' && <SnakeGame />}
                    </AnimatedGameCard>
                </div>
            )}
        </div>
    )
}

export default GamesPage
