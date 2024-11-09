import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import LandingPage2 from './page/Landing2';
import LandingPage3 from './page/Landing3';
import RoleSelectionPage from './page/isi-web/Jelajahi';
import ChildPage from './page/isi-web/ChildPage';
import ParentPage from './page/isi-web/ParentsPage';
import ContentPage from './page/isi-web/VideoContentPage';
import LoginForm from './page/isi-web/login';
import VideoPage from './page/isi-web/ContentVideo';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Landing2" element={<LandingPage2 />} />
          <Route path="/Landing3" element={<LandingPage3 />} />
          <Route path="/Jelajahi" element={<RoleSelectionPage />} />
          <Route path="/child" element={<ChildPage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;