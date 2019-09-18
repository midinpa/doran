import mongoose from 'mongoose';
import User from './User';

const schema = {
  sender: { type: mongoose.ObjectId, ref: User },
  message: String,
};
const option = { timestamps: true };
const Board = mongoose.model('Board', new mongoose.Schema(schema, option));

export default Board;
