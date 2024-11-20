import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './AppRoute';


function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;