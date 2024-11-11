import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import LandingPage2 from './page/Landing2';
import LandingPage3 from './page/Landing3';
import RoleSelectionPage from './page/isi-web/Jelajahi';
import ChildPage from './page/isi-web/ChildPage';
import ParentPage from './page/isi-web/ParentsPage';
import ContentPage from './page/isi-web/ContentPage';
import LoginForm from './page/isi-web/login';
import VideoPage from './page/isi-web/Video';
import Profile from './page/isi-web/Profile';
import EditProfile from './page/isi-web/EditProfile'; // Import komponen EditProfile
import ChangePassword from './page/isi-web/ChangePassword'; // Import komponen ChangePassword
import MusicPage from './page/isi-web/Music';
import ReadingPage from './page/isi-web/Bacaan';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
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
          
          {/* Protected Routes */}
          <Route 
            path="/Jelajahi" 
            element={
              <ProtectedRoute>
                <RoleSelectionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/child" 
            element={
              <ProtectedRoute>
                <ChildPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent" 
            element={
              <ProtectedRoute>
                <ParentPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/content" 
            element={
              <ProtectedRoute>
                <ContentPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/video" 
            element={
              <ProtectedRoute>
                <VideoPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/music/:id" 
            element={
              <ProtectedRoute>
                <MusicPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bacaan/:id" 
            element={
              <ProtectedRoute>
                <ReadingPage />
              </ProtectedRoute>
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
          
          {/* New Routes for Edit Profile and Change Password */}
          <Route 
            path="/edit-profile" 
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/change-password" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
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