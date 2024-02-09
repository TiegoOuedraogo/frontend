import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('authToken'),
    isAuth: false,
    userRole: null, // Add user role to the auth state
  });

  useEffect(() => {
    const role = localStorage.getItem('userRole'); 
    setAuth((prevState) => ({
      ...prevState,
      isAuth: !!prevState.token,
      userRole: role,
    }));
  }, [auth.token]);

  const login = (token, userRole) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', userRole); 
    setAuth({ token, isAuth: true, userRole });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole'); 
    setAuth({ token: null, isAuth: false, userRole: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

