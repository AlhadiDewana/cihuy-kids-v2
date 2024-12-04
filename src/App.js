import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './AppRoute';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;