const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static('client/build'));

// Store the game rooms and players
const rooms = new Map();

// Socket.IO logic goes here
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle room creation or joining
  socket.on('room', ({ room, isRoomCreator }) => {
    if (!rooms.has(room)) {
      rooms.set(room, [socket]);
      socket.emit('roomCreated');
    } else {
      const players = rooms.get(room);
      players.push(socket);
      rooms.set(room, players);
    }

    // Notify the room about the player who joined
    socket.join(room);
    io.to(room).emit('playerJoined', isRoomCreator ? 'Player X' : 'Player O');
  });

  // Handle player moves
  socket.on('move', (moveData) => {
    const { room, index, player } = moveData;
    io.to(room).emit('move', { index, player });
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    
    // Remove the disconnected player from all rooms
    rooms.forEach((players, room) => {
      const index = players.indexOf(socket);
      if (index !== -1) {
        players.splice(index, 1);
        io.to(room).emit('playerLeft');
        if (players.length === 0) {
          rooms.delete(room);
        }
      }
    });
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
