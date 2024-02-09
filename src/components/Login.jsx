import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import userApi from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.login(credentials);
      login(response.token); 
      navigate('/products');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" className={styles.button}>Login</button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
