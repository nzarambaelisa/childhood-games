import React from 'react';
import GameSelector from '../components/common/GameSelector';

const GameHub: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Hub</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our selection of multiplayer games
        </p>
      </div>

      <GameSelector />
    </div>
  );
};

export default GameHub;