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

    console.log("✅ Login success:", response.data);

    return response.data;
  } catch (error: any) {
    // console.error('API fetch failed:', error.message);
    // alert(error.message);
    // console.log("❌ AXIOS ERROR:", error.message);
    // console.log("❌ ERROR OBJECT:", JSON.stringify(error, null, 2));

    console.log("❌ AXIOS ERROR:", JSON.stringify(error.toJSON?.() ?? error, null, 2));
    alert(error.message);
    alert(JSON.stringify(error, null, 2))
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

export const login2 = async (username: string, password: string) => {
  try {

    console.log("🔍 Starting login request 2");
    const response = await axios.post<LoginResponse>('http://192.168.100.27:8082/api/auth/login', {
      username,
      password,
    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    alert(response.data)

    return response.data;
  } catch (error: any) {

    console.log("❌ AXIOS ERROR:", JSON.stringify(error.toJSON?.() ?? error, null, 2));


    if (error.response) {
      // Server responded with a status other than 2xx
      console.log('Response error:', error.response);
      alert('Response error:' + error.response)
    } else if (error.request) {
      // No response was received
      console.log('Request error:', error.request);
      alert('Request error:' + error.request)
    } else {
      console.log('Error', error.message);
      alert('Error:' + error.message)
    }
  }
};

