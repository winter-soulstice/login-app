// Import express as a web application framework
import express from 'express';

// Import methods from controller
import { registerUser, loginUser, validJwt } from '../controller/index';
// Create an express router
const router = express.Router();

// Handles posts requests to api/register with registerUser method
router.post('/register', registerUser);

// Handles post requests to api/register with loginUser method
router.post('/login', loginUser);

// Handles get requests to api/ with the validJwt method
router.get('/', validJwt);

// Export router to app or index.js
export { router as default };
