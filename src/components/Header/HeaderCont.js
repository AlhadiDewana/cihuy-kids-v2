// components/HeaderCont.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, Bell, User } from 'lucide-react';
import logo from '../../assets/icon.png';
import LoginForm from '../account/login';

const HeaderCont = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const initialAge = location.state?.selectedAge || '4-5 Tahun';
  const [selectedAge, setSelectedAge] = useState(initialAge);

  const handleAgeChange = (newAge) => {
    setSelectedAge(newAge);
  };

  // Cek apakah user sudah login
  const isLoggedIn = localStorage.getItem('token');

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

  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-8">
        <img 
          src={logo}
          alt="Cihuy Kids Logo" 
          className="navbar-logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />

        <button
        onClick={() => navigate('/content')}
        className='text-white font-semibold px-4 py-2'>Kembali
        </button>
      </div>
      <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
                        <User className="w-8 h-8 text-white border border-3 rounded-full p-[4px]" />
                        <div className='text-white text-lg font-bold'>
                            {isLoggedIn ? 'Profile' : 'Login'}
                        </div>
                    </div>
                </div>
        {isLoggedIn && (
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-800 mr-4"
          >
            Logout
          </button>
         )}
         {/* Modal Login */}
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