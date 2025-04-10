import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import socketService from '../../services/socketService';

type Player = 'X' | 'O' | null;
type Board = Player[];

const TicTacToe: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { setCurrentGame } = useGameContext();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  useEffect(() => {
    if (gameId) {
      setCurrentGame(gameId);
    }
  }, [gameId, setCurrentGame]);

  useEffect(() => {
    if (isMultiplayer) {
      socketService.connect();
      socketService.socket?.on('game_move', (index: number) => {
        handleMove(index);
      });
      return () => {
        socketService.disconnect();
      };
    }
  }, [isMultiplayer]);

  const calculateWinner = (squares: Board): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (isMultiplayer) {
      socketService.socket?.emit('game_move', index);
    }

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <button
      className="w-20 h-20 border border-gray-400 text-4xl font-bold flex items-center justify-center
                 hover:bg-gray-100 transition-colors duration-200"
      onClick={() => handleMove(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Tic Tac Toe</h2>
          <div className="text-lg">
            {winner
              ? winner === 'Draw'
                ? "It's a Draw!"
                : `Winner: ${winner}`
              : `Next Player: ${isXNext ? 'X' : 'O'}`}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array(9).fill(null).map((_, index) => (
            <div key={index}>
              {renderSquare(index)}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            New Game
          </button>
          <button
            onClick={() => setIsMultiplayer(!isMultiplayer)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isMultiplayer ? 'Switch to Single Player' : 'Switch to Multiplayer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;