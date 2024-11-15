import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import LandingPage2 from './page/Landing2';
import LandingPage3 from './page/Landing3';
import RoleSelectionPage from './page/isi-web/Jelajahi';
import ChildPage from './page/isi-web/ChildPage';
import ParentPage from './page/isi-web/ParentsPage';
import ContentPage from './page/isi-web/ContentPage';
import LoginForm from './components/account/login';
import VideoPage from './page/isi-web/Video';
import Profile from './page/isi-web/Profile';
import EditProfile from './components/account/EditProfile';
import ChangePassword from './components/account/ChangePassword';
import MusicPage from './page/isi-web/Music';
import GamePage from './page/isi-web/Game';
import ReadingPage from './page/isi-web/Bacaan';
import Konfirm from './components/Premium/KonfirmPay';
import RegisterForm from './components/account/RegisterForm';

// Menggunakan isAuthenticated function
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/Landing2" element={<LandingPage2 />} />
          <Route path="/Landing3" element={<LandingPage3 />} />
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/konfirmasi-pembayaran"
            element={
              isAuthenticated() ? <Konfirm /> : <Navigate to="/login" replace />
            }
          />
          
          {/* Protected Routes */}
          <Route 
            path="/Jelajahi" 
            element={
              isAuthenticated() ? <RoleSelectionPage /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/child" 
            element={
              isAuthenticated() ? <ChildPage /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/parent" 
            element={
              isAuthenticated() ? <ParentPage /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/content" 
            element={
              <ContentPage />
            } 
          />
          <Route 
            path="/video" 
            element={
              <VideoPage />
            } 
          />
          <Route 
            path="/music/:id" 
            element={
              isAuthenticated() ? <MusicPage /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/game/:id" 
            element={
              isAuthenticated() ? <GamePage /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/bacaan/:id" 
            element={
              isAuthenticated() ? <ReadingPage /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated() ? <Profile /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* Routes for Edit Profile and Change Password */}
          <Route 
            path="/edit-profile" 
            element={
              isAuthenticated() ? <EditProfile /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/change-password" 
            element={
               <ChangePassword />
            } 
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;