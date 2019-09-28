import mongoose from 'mongoose';
import User from './User';

const schema = {
  host: { type: mongoose.ObjectId, ref: User },
  guest: { type: mongoose.ObjectId, ref: User },
};
const option = { timestamps: true };
const Room = mongoose.model('Room', new mongoose.Schema(schema, option));

export default Room;
