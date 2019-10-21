// Import mongoose
import mongoose from 'mongoose';

// Define the schema of the database
const { Schema } = mongoose;

// Define a new user with the following schema
const User = new Schema(
  {
    // Values that are required when creating a new user
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, required: true },
  },
  // The time is also saved in the database
  { timestamps: true },
);

// In the database 'users' a schema of User is required to make an entry
// Exported to controller.js
module.exports = mongoose.model('users', User);
