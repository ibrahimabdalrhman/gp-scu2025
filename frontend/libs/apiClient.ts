import axios from 'axios';
import { get } from 'http';
import { getAuthCookie } from './auth-cookies';
console.log("sss", process.env.NEXT_PUBLIC_API_URL);
const token = getAuthCookie();
console.log("toke," ,token)
const apiClient  = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  
}
);
apiClient.interceptors.request.use(
  (config) => {
    // Add headers dynamically here
    config.headers["authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient ;
