import mongoose from 'mongoose';

const schema = {
  phoneId: String, nickname: String, age: Number, sex: String,
};
const User = mongoose.model('User', new mongoose.Schema(schema));

export default User;
