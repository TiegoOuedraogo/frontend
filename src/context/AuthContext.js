import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('authToken'), 
    isAuth: false,
  });

  useEffect(() => {
    // Update the auth state if token changes
    setAuth((prevState) => ({
      ...prevState,
      isAuth: !!auth.token, 
    }));
  }, [auth.token]);

  const login = (token) => {
    localStorage.setItem('authToken', token); 
    setAuth({ token, isAuth: true });
  };

  const logout = () => {
    localStorage.removeItem('authToken'); 
    setAuth({ token: null, isAuth: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
