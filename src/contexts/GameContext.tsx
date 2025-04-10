import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GamePlayers {
  min: number;
  max: number;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  players: GamePlayers;
}

interface GameContextType {
  games: Game[];
  currentGameId: string | null;
  setCurrentGame: (gameId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGames: Game[] = [
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Classic game of X\'s and O\'s. Be the first to get three in a row!',
    thumbnail: '/images/games/tic-tac-toe.jpg',
    category: 'Strategy',
    players: { min: 2, max: 2 },
  },
  {
    id: 'memory',
    name: 'Memory Match',
    description: 'Test your memory by matching pairs of cards. Find all matches to win!',
    thumbnail: '/images/games/memory.jpg',
    category: 'Memory',
    players: { min: 1, max: 4 },
  },
  {
    id: 'snake',
    name: 'Snake',
    description: 'Guide the snake to eat food and grow longer, but don\'t hit the walls or yourself!',
    thumbnail: '/images/games/snake.jpg',
    category: 'Arcade',
    players: { min: 1, max: 1 },
  },
];

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);

  const value = {
    games: initialGames,
    currentGameId,
    setCurrentGame: setCurrentGameId,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};