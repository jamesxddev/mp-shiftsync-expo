import axios from 'axios';
import config from '@/config';
import { Response } from '@/types/response'
import api from './client';
import { handleApiError } from '@/lib/handleApiError';

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
    const response = await api.put<Response>(`${config.API_URL}/auth/password/${username}`, {
      password,
    });

    return response.data;
  } catch (error: any) {
    if (handleApiError(error)) {
      return;
    }
    
    throw new Error(error.response?.data?.message || 'Update password failed');
  }
};