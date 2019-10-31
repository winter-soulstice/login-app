// Promise based HTTP client for browser and node.js
import axios from 'axios';

// Create a new instance of axios with a custom configuration.
const api = axios.create({
  // Connects to server on port 3000 to store and load users
  baseURL: 'http://localhost:3000/api',
});

// Send post request to api/register with payload
export const registerUser = (payload) => api.post('/register', payload);
// Send post request to api/register with payload
export const loginUser = (payload) => api.post('/login', payload);
// Send get request to api/ with configuration (headers)
export const authJwt = (config) => api.get('/', config);

// Export method as apis.
export const apis = {
  registerUser,
  loginUser,
  authJwt,
};
