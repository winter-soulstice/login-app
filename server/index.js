import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import console from 'console';

import db from './db';
import router from './routes/login-router';

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Connection error to MongoDB'));

app.get('/', (req, res) => {
  res.send('<h1>Goodbye World!</h1>');
});

app.use('/api', router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
