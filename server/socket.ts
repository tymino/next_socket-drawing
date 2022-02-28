import { Server, Socket } from 'socket.io';

import Player from './Player';

import { NameSocket, NameKeys, NameKeyStatus } from '../types';

const connectSocket = (server: any) => {
  const io = new Server(server);
  const players: Player[] = [];

  io.on(NameSocket.Connection, (socket) => {
    const currentPlayer = new Player(socket.id);
    players.push(currentPlayer);

    // socket.broadcast.emit('currentUsers', players);
    socket.emit('welcome', currentPlayer, players);

    socket.on(NameSocket.Disconnect, () => {
      players.splice(players.indexOf(currentPlayer), 1);
      socket.broadcast.emit('left', players);
    });

    socket.on(NameKeyStatus.KeyPressed, (key: NameKeys) => {
      if (key === NameKeys.Up) {
        currentPlayer.y -= currentPlayer.speed;
        socket.emit('PlayersMoving', players);
        socket.broadcast.emit('PlayersMoving', players);
      }
    });
  });
};

export default connectSocket;
