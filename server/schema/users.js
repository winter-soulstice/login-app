import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', User);
