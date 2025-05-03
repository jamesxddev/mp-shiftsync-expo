import axios from 'axios';
import config from '../config';
import { Response } from '../types/response'

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

export const updatePassword = async (username: string, password: string) => {
  try {
    const response = await axios.put<Response>(`${config.API_URL}/auth/password/${username}`, {
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Update password failed');
  }
};