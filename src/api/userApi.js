import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const register = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  const data = await response.json();
  localStorage.setItem('authToken', data.token); 
  return data;
};

const logout = () => {
  localStorage.removeItem('authToken'); 
};

const userApi = {
  register,
  login,
  logout
};

export default userApi;
