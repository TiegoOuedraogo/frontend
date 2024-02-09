import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Intercept all requests on this instance
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  // It's often not a good idea to log tokens in production environments
  // as logs might be monitored or stored in less secure manners.
  // Consider removing or limiting logging based on environment:
  if (process.env.NODE_ENV === 'development') {
    console.log('Token being sent in request:', token); 
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  // Handle request errors
  return Promise.reject(error);
});

// Optionally, set up a response interceptor
axiosInstance.interceptors.response.use(response => {
  // Handle responses
  return response;
}, error => {
  // You can handle global axios errors here
  // For example, if you want to catch 401 errors globally
  if (error.response && error.response.status === 401) {
    // Handle 401 errors, e.g., by redirecting to a login page or showing a message
  }
  return Promise.reject(error);
});

export default axiosInstance;
