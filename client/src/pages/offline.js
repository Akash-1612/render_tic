import React, { useState } from 'react';
import '../components_resources/offline.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Function to calculate the winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  // Function to handle a square click
  const handleSquareClick = (index) => {
    // Create a copy of the current board
    const squares = [...board];

    // If the square is already filled or there's a winner, do nothing
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    // Set the square to X or O based on the current player
    squares[index] = xIsNext ? 'X' : 'O';

    // Update the board and toggle the current player
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  // Function to render a square
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleSquareClick(index)}>
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every((square) => square !== null)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {Array(9).fill(null).map((_, index) => (
          <div key={index} className="square">
            {renderSquare(index)}
          </div>
        ))}
      </div>
      {/* Display the game status */}
      <div className="status">
        {status}
      </div>

        {/* Button to reset the game */}
        <button className="reset-button" onClick={handleReset}>
            Reset
        </button>

    </div>
  );
}

export default App;
