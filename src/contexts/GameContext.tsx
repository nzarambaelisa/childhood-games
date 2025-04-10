import React, { createContext, useContext, useState } from 'react';
import SnakeGame from '../components/SnakeGame';
import Tetris from '../components/games/Tetris';
import Pong from '../components/games/Pong';

interface Game {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  hasMultiplayer: boolean;
  players: {
    min: number;
    max: number;
  };
  component: React.ComponentType<any>;
}

interface GameContextType {
  games: Game[];
  currentGame: Game | null;
  setCurrentGame: (gameId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Initial games registry
const availableGames: Game[] = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'Classic snake game with a multiplayer twist',
    thumbnail: '/images/games/snake.png',
    category: 'arcade',
    hasMultiplayer: true,
    players: {
      min: 1,
      max: 4
    },
    component: SnakeGame
  },
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'The classic block-stacking puzzle game',
    thumbnail: '/images/games/tetris.png',
    category: 'puzzle',
    hasMultiplayer: false,
    players: {
      min: 1,
      max: 1
    },
    component: Tetris
  },
  {
    id: 'pong',
    name: 'Pong',
    description: 'The original multiplayer arcade game',
    thumbnail: '/images/games/pong.png',
    category: 'sports',
    hasMultiplayer: true,
    players: {
      min: 1,
      max: 2
    },
    component: Pong
  }
];

export const GameProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [games] = useState<Game[]>(availableGames);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const selectGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId) || null;
    setCurrentGame(game);
  };

  return (
    <GameContext.Provider value={{
      games,
      currentGame,
      setCurrentGame: selectGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};