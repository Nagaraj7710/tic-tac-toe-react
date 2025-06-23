import { useState } from 'react'
import './App.css'
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const result = calculateWinner(board);
  const winner = result?.winner;
  const winLine = result?.line || [];

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : board.every(cell => cell !== null)
    ? 'Draw!'
    : `Next Player: ${isXNext ? 'X' : 'O'}`;

  const strikeClass = getStrikeClass(winLine);

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>

      <div className="board">
        {strikeClass && <div className={`strike ${strikeClass}`} />}
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${winLine.includes(index) ? 'win-cell' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <button onClick={handleReset} className="reset-btn">Reset Game</button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a], line };
    }
  }

  return null;
}

function getStrikeClass(line) {
  const key = line.join('-');

  switch (key) {
    case '0-1-2': return 'strike-row-1';
    case '3-4-5': return 'strike-row-2';
    case '6-7-8': return 'strike-row-3';
    case '0-3-6': return 'strike-col-1';
    case '1-4-7': return 'strike-col-2';
    case '2-5-8': return 'strike-col-3';
    case '0-4-8': return 'strike-diag-1';
    case '2-4-6': return 'strike-diag-2';
    default: return '';
  }
}

export default App;