import SnakeGame from '@/components/games/SnakeGame';

const GamesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center my-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Mini-Games
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of fun, simple games built with JavaScript and Canvas.
        </p>
      </section>

      <div className="flex justify-center">
        <SnakeGame />
      </div>
    </div>
  );
};

export default GamesPage;