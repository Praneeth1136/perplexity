import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '../auth.slice';
import { register, login, getMe } from '../services/auth.api';

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ username, email, password });

      return data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });

      return data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Login failed'));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Failed to fetch user'));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin, handleGetMe };
}
