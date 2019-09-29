import {
  User,
} from '../db';

const authentication = (socket, next) => {
  if (!socket.request.headers.phoneid) return next(new Error('Authentication error'));
  const user = User.findOne({ phoneId: socket.request.headers.phoneid });
  if (!user) return next(new Error('Authentication error'));
  return next();
};

export default authentication;
