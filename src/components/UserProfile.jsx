import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    
    const userData = { username: 'example', email: 'example@example.com' };
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
