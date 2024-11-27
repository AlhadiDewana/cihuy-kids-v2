// routes.js
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { TitleProvider } from './components/admin/TitleContext';
import LandingPage from './page/landing/LandingPage';
import LandingPage2 from './page/landing/Landing2';
import LandingPage3 from './page/landing/Landing3';
import RoleSelectionPage from './page/isi-web/Jelajahi';
import ChildPage from './page/isi-web/ChildPage';
import ParentPage from './page/isi-web/ParentsPage';
import ContentPage from './page/isi-web/ContentPage';
import LoginForm from './components/auth/login';
import VideoPage from './page/isi-web/Video';
import Profile from './page/isi-web/Profile';
import EditProfile from './components/auth/EditProfile';
import ChangePassword from './components/auth/ChangePassword';
import MusicPage from './page/isi-web/Music';
import GamePage from './page/isi-web/Game';
import ReadingPage from './page/isi-web/Bacaan';
import Konfirm from './components/Premium/KonfirmPay';
import AdminDashboard from './page/admin/Dashboard';
import KonfirmasiPembayaran from './page/admin/KonfirmasiPembayaran';
import VideoAdmin from './page/admin/content/VideoAdmin';
import MusicAdmin from './page/admin/content/MusikAdmin';
import GameAdmin from './page/admin/content/GameAdmin';
import ReadingAdmin from './page/admin/content/ReadingAdmin';
import Premium from './components/Premium/Premium';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return false;
    }
    return true;
  };

  return isAuthenticated() ? children : null;
};

const AppRoutes = () => {
  return (
    <div className="App">
      <TitleProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/Landing2" element={<LandingPage2 />} />
          <Route path="/Landing3" element={<LandingPage3 />} />
          <Route path="/login" element={<LoginForm />} />
          
          
          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/konfirmasi-pembayaran" element={<KonfirmasiPembayaran />} />
          <Route path="/admin/video" element={<VideoAdmin />} />
          <Route path="/admin/music" element={<MusicAdmin />} />
          <Route path="/admin/game" element={<GameAdmin />} />
          <Route path="/admin/reading" element={<ReadingAdmin />} />

          {/* Protected Routes */}
          <Route
  path="/konfirmasi-pembayaran"
  element={<Konfirm isOpen={true} onClose={() => window.history.back()} />}
/>
          
          <Route path="/Jelajahi" element={<RoleSelectionPage />} />
          <Route path="/child" element={<ChildPage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/music/:id" element={<MusicPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/bacaan/:id" element={<ReadingPage />} />
          <Route 
    path="/penawaranpremium" 
    element={
        <Premium 
            isOpen={true}
            onClose={() => window.history.back()}
        />
    } 
/>
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          
          <Route path="/change-password" element={<ChangePassword />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TitleProvider>
    </div>
  );
};

export default AppRoutes;