import axios from 'axios';
import { getToken, deleteToken } from '@/services/TokenService'; // For fetching token from secure storage
import config from '@/config';
import { navigateToLogin } from '@/lib/routerRef';

const api = axios.create({
  baseURL: config.API_URL, // Your API base URL
});

api.interceptors.request.use(
  async (config) => {
    // Get token from secure storage
    const token = await getToken();
    
    // If a token is found, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle invalid or expired token
    if (error.response && error.response.status === 401) {
      // remove token
      deleteToken();
      navigateToLogin();
    }

    return Promise.reject(error);
  }
);

export default api;