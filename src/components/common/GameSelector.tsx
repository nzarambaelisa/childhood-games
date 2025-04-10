import React from 'react';
import { useGameContext } from '../../contexts/GameContext';

const GameSelector: React.FC = () => {
  const { games, setCurrentGame } = useGameContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {games.map((game) => (
        <div
          key={game.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer"
          onClick={() => setCurrentGame(game.id)}
        >
          <div className="relative pb-[56.25%]">
            <img
              src={game.thumbnail}
              alt={game.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{game.name}</h3>
            <p className="text-gray-600 mb-4">{game.description}</p>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {game.category}
              </span>
              <span className="text-sm text-gray-500">
                {game.players.min === game.players.max
                  ? `${game.players.min} player`
                  : `${game.players.min}-${game.players.max} players`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameSelector;