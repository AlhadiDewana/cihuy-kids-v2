// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek token dan user data saat aplikasi dimuat
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    const userPremium = localStorage.getItem('isPremium') === '1';

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(userData);
      setIsPremium(userPremium);
    }
    setLoading(false);
  }, []);

  const login = (token, isPremium, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('isPremium', isPremium);
    
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isPremium');
    setIsAuthenticated(false);
    setUser(null);
    setIsPremium(false);
  };

  const updatePremiumStatus = (status) => {
    localStorage.setItem('isPremium', status ? '1' : '0');
    setIsPremium(status);
  };

  const value = {
    isAuthenticated,
    user,
    isPremium,
    login,
    logout,
    updatePremiumStatus
  };

  if (loading) {
    return null; // atau loading spinner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};