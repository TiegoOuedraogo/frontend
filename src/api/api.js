// api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get('/api/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};
