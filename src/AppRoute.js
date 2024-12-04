// routes.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
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
import { useAuth } from './context/AuthContext';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {

  const { userRole } = useAuth();
  const location = useLocation();

  console.log(userRole)
  useEffect(() => {
    if (userRole === 'admin' && !location.pathname.startsWith('/admin') && location.pathname !== '/dashboard') {
      window.location.href = '/dashboard';
    }
  }, [userRole, location]);
  return (
    <div className="App">
      <TitleProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/Landing2" element={<LandingPage2 />} />
          <Route path="/Landing3" element={<LandingPage3 />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Jelajahi" element={<RoleSelectionPage />} />
          <Route path="/child" element={<ChildPage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/music/:id" element={<MusicPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/bacaan/:id" element={<ReadingPage />} />
          <Route path="/penawaranpremium" element={<Premium isOpen={true} onClose={() => window.history.back()} />} />
          
          {/* Protected Routes */}
          <Route path="/konfirmasi-pembayaran" element={
            <ProtectedRoute>
              <Konfirm isOpen={true} onClose={() => window.history.back()} />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/edit-profile" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />
          
          <Route path="/change-password" element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          <Route path="/admin/konfirmasi-pembayaran" element={
            <AdminRoute>
              <KonfirmasiPembayaran />
            </AdminRoute>
          } />
          
          <Route path="/admin/video" element={
            <AdminRoute>
              <VideoAdmin />
            </AdminRoute>
          } />
          
          <Route path="/admin/music" element={
            <AdminRoute>
              <MusicAdmin />
            </AdminRoute>
          } />
          
          <Route path="/admin/game" element={
            <AdminRoute>
              <GameAdmin />
            </AdminRoute>
          } />
          
          <Route path="/admin/reading" element={
            <AdminRoute>
              <ReadingAdmin />
            </AdminRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TitleProvider>
    </div>
  );
};

export default AppRoutes;