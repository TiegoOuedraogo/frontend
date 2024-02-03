import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL
});

// Intercept all requests on this instance
axiosInstance.interceptors.request.use(function (config) {
  // Retrieve the token from local storage
  const token = localStorage.getItem('authToken');
  
  // If a token is present, attach it in the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;
