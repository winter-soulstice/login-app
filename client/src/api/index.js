import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const registerUser = (payload) => api.post('/register', payload);
export const loginUser = (payload) => api.post('/login', payload);

export const apis = {
  registerUser,
  loginUser,
};
