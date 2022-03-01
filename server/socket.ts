import { Server, Socket } from 'socket.io';

import { NameSocket } from '../types';

const connectSocket = (server: any) => {
  const io = new Server(server);

  io.on(NameSocket.Connection, (socket: Socket) => {
    socket.on(NameSocket.Draws, (data) => socket.broadcast.emit(NameSocket.Сoloring, data));
    // socket.on(NameSocket.Disconnect, () => {});
  });
};

export default connectSocket;
