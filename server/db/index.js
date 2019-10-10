import mongoose from 'mongoose';

mongoose
  .connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => e);

const db = mongoose.connection;

module.exports = db;
