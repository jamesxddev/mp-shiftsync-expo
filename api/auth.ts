import axios from 'axios';
import config from '../config';

export const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${config.API_URL}/auth/login`, {
        username,
        password,
      });
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };