import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../components_resources/online.css';

const socket = io('http://localhost:3001'); // Replace with your server URL

const Online = () => {
  const [room, setRoom] = useState(''); // State for room name
  const [isCreator, setIsCreator] = useState(false); // State to track if user is the room creator
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  // Function to handle room creation or joining
  const handleCreateOrJoin = () => {
    if (room.trim() !== '') {
      // Check if user is creating the room or joining
      const isRoomCreator = Math.random() < 0.5; // Randomly determine room creator
      setIsCreator(isRoomCreator);

      // Emit an event to the server to create or join the room
      socket.emit('room', { room, isRoomCreator });
      setIsWaiting(true);
    }
  };

  // Function to handle square clicks and send moves to the server
  const handleSquareClick = (index) => {
    if (!isWaiting) {
      const squares = [...board];

      // Send the move to the server
      socket.emit('move', { room, index, player: xIsNext ? 'X' : 'O' });
    }
  };

  // Listen for moves from the server
  useEffect(() => {
    socket.on('move', (moveData) => {
      if (moveData.room === room) {
        const squares = [...board];
        squares[moveData.index] = moveData.player;
        setBoard(squares);
        setXIsNext(!xIsNext);
      }
    });
  }, [board, room]);

  // Listen for room creation response
  useEffect(() => {
    socket.on('roomCreated', () => {
      setIsWaiting(false);
    });
  }, []);

  // Render the game board and room creation/join UI
  return (
    <div>
      {isWaiting ? (
        <p>Waiting for the other person to join...</p>
      ) : (
        <>
          <div>
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={handleCreateOrJoin}>
              {isCreator ? 'Create Room' : 'Join Room'}
            </button>
          </div>
          <div className="board">
            {Array(9).fill(null).map((_, index) => (
              <div key={index} className="square" onClick={() => handleSquareClick(index)}>
                {board[index]}
              </div>
            ))}
          </div>
          <p>{xIsNext ? 'X' : 'O'}'s turn</p>
        </>
      )}
    </div>
  );
};

export default Online;
