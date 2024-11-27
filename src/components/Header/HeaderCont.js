import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, Bell, User } from 'lucide-react';
import logo from '../../assets/icon.png';
import LoginForm from '../auth/login';

const HeaderCont = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  
  // Ambil selectedAge dari state atau localStorage
  const initialAge = location.state?.selectedAge || localStorage.getItem('lastSelectedAge') || '4-5 Tahun';
  const [selectedAge, setSelectedAge] = useState(initialAge);
  
  // Simpan selectedAge ke localStorage setiap kali berubah
  useEffect(() => {
    if (location.state?.selectedAge) {
      localStorage.setItem('lastSelectedAge', location.state.selectedAge);
    }
  }, [location.state?.selectedAge]);

  const handleBack = () => {
    const lastSelectedAge = localStorage.getItem('lastSelectedAge');
    navigate('/content', { 
      state: { 
        selectedAge: lastSelectedAge || selectedAge 
      } 
    });
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav className="flex items-center justify-between px-8 py-4">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <img 
          src={logo}
          alt="Cihuy Kids Logo" 
          className="navbar-logo cursor-pointer"
          onClick={() => navigate('/')}
        />

        <button
          onClick={handleBack}
          className="text-white font-semibold px-4 py-2"
        >
          Kembali
        </button>
      </div>

      {/* Rest of the code remains the same */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
          <User className="w-8 h-8 text-white border border-3 rounded-full p-[4px]" />
          <span className="text-white text-lg font-bold">
            {isLoggedIn ? 'Profile' : 'Login'}
          </span>
        </div>

        {isLoggedIn && (
          <button 
            onClick={handleLogout}
            className="text-white hover:text-gray-200 ml-4"
          >
            Logout
          </button>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="w-full max-w-md">
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderCont;