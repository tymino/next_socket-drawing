import { Server } from 'socket.io';

import Player from './Player';

// import EventName from '../types/EventName';
// import ITodo from '../types/db';

const connectSocket = (server: any) => {
  const io = new Server(server);
  const players: Player[] = [];

  io.on('connection', (socket) => {
    const currentPlayer = new Player('test');
    players.push(currentPlayer);

    socket.broadcast.emit('currentUsers', players);
    socket.emit('welcome', currentPlayer, players);

    socket.on('disconnect', () => {
      players.splice(players.indexOf(currentPlayer), 1);
      // console.log(players);
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
        socket.broadcast.emit('PlayersMoving', players);
      }
    });
  });
};

export default connectSocket;
