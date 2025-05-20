import axios from 'axios';
import config from '@/config';
import { Response } from '@/types/response'
import { LoginResponse } from '@/types/loginResponse';
import api from './client';
import { handleApiError } from '@/lib/handleApiError';

export const login = async (username: string, password: string) => {
  try {

    console.log("🔍 Starting login request");

    const response = await axios.post<LoginResponse>(`${config.API_URL}/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.log(error,'error')
    throw new Error(error.response?.data?.message || 'Login Failed');

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

