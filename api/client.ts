import axios from 'axios';
import { getToken } from '../services/TokenService'; // For fetching token from secure storage
import config from '../config';

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

// You can also add a response interceptor here if needed
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle API errors here (e.g., if the token is invalid or expired)
//     if (error.response && error.response.status === 401) {
//       // Token is likely expired, handle logout
//       console.log("Unauthorized - Token expired or invalid");
//     }
//     return Promise.reject(error);
//   }
// );

export default api;