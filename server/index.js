// Import express as a web application framework
import express from 'express';
// Import bodyparser to check content type (of body) for all requests
import bodyParser from 'body-parser';
// Import cors for cross origin resource sharing
import cors from 'cors';
// Import console for console log
import console from 'console';

// Imports a database from the database folder
import db from './db';
// Imports a router for subsection of app
import router from './routes';

// Creates an express application
const app = express();
// The apiPort on which the application will listen
const apiPort = 3000;

// App uses the bodyparser middleware function to enable qs library for all req/res
app.use(bodyParser.urlencoded({ extended: true }));
// App is cors enabled for all req/res
app.use(cors());
// App enables body-parser that will look at json payloads(body)
// and verify content-type
app.use(bodyParser.json());

// Initialize the connection to the database and check for errors
db.on('error', console.error.bind(console, 'Connection error to MongoDB'));

// Routes http get requests to '/' and sends a Goodbye response
app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center"}>Cherio mate, how are you?</h1>');
});

// App uses a router for requests to '/api'
app.use('/api', router);

// App is listening on port 3000
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
