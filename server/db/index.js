// File is needed to connect to mongodb
import mongoose from 'mongoose';

// Mongoose connects to mongodb with a standalone connection
mongoose
  /* MongoDB is located on the localhost PORT 27017
  * useNewURLParser is set to true because the old parser is depreciated
  *  Allows connection to a specific port number and database
  * useUnifiedTopology is set to true to prevent an error
  */
  .connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true, useUnifiedTopology: true })
  // Catch errors when unable to connect to a databse
  .catch((e) => e);

// Set the connection and save it to a db
const db = mongoose.connection;

// Export the database to index.js
module.exports = db;
