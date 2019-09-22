import mongoose from 'mongoose';

const schema = {
  phoneId: String,
  nickname: String,
  age: Number,
  sex: String,
  location: String,
};
const option = { timestamps: true };
const User = mongoose.model('User', new mongoose.Schema(schema, option));

export default User;
