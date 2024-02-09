// src/api/adminApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/api/admin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

// Add more admin operations as needed
