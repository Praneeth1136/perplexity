import axios from 'axios';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/auth',
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const response = await authApi.post('/api/auth/register', { username, email, password });
  return response.data;
}

export async function login({ email, password }) {
  const response = await authApi.post('/api/auth/login', { email, password });
  return response.data;
}

export async function getMe() {
  const response = await authApi.get('/api/auth/get-me');
  return response.data;
}
