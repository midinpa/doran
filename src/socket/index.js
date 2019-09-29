import socketIO from 'socket.io';
import authentication from './authenticaton';


const runSocket = (server) => {
  const io = socketIO(server);

  io.use(authentication);
  io.on('connection', (socket) => {
    socket.emit('connected');
  });
};

export default runSocket;
