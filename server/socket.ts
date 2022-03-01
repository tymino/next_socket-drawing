import { Server, Socket } from 'socket.io';

import { NameSocket, NameKeys, NameKeyStatus } from '../types';

const connectSocket = (server: any) => {
  const io = new Server(server);

  io.on(NameSocket.Connection, (socket: Socket) => {
    socket.on('mouse', (data: any) => {
      socket.broadcast.emit('painter', data);
    });

    socket.on(NameSocket.Disconnect, () => {});

    socket.on(NameKeyStatus.KeyPressed, (key: NameKeys) => {});
  });
};

export default connectSocket;
