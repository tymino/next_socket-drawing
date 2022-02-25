const path = require('path');
const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const Player = require('./Player');

const PORT = 3000;
const HOME_PAGE = `${__dirname}/index.html`;

const players = [];

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(HOME_PAGE));

io.on('connection', (socket) => {
  const currentPlayer = new Player('test');
  players.push(currentPlayer);

  socket.broadcast.emit('currentPlayer', players);
  socket.removeListener('welcome', currentPlayer, players);

  socket.on('disconnect', () => {
    players.splice(players.indexOf(currentPlayer), 1);
    console.log(players);
    socket.broadcast.emit('playerLeft', players);
  });

  socket.on('pressed', (key) => {
    if (key === 38) {
      currentPlayer.y -= currentPlayer.speed;
      socket.emit('PlayersMoving', players);
      socket.broadcast.emit('PlayersMoving', players);
    }
    if (key === 40) {
      currentPlayer.y += currentPlayer.speed;
      socket.emit('PlayersMoving', players);
      socket.broadcast.emit('PlayersMoving', players);
    }
    if (key === 37) {
      currentPlayer.x -= currentPlayer.speed;
      socket.emit('PlayersMoving', players);
      socket.broadcast.emit('PlayersMoving', players);
    }
    if (key === 39) {
      currentPlayer.x += currentPlayer.speed;
      socket.emit('PlayersMoving', players);
      sock;
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
