// components/HeaderCont.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Pastikan import dari react-router-dom
import { Settings, Bell, User } from 'lucide-react';
import logo from '../assets/icon.png'; // Sesuaikan path

const HeaderCont = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialAge = location.state?.selectedAge || '4-5 Tahun';
  const [selectedAge, setSelectedAge] = useState(initialAge);

  const handleAgeChange = (newAge) => {
    setSelectedAge(newAge);
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
        className='text-white font-semibold'>Kembali
        </button>
      </div>

      <div className="flex items-center gap-6">
        <Settings className="w-6 h-6 text-white cursor-pointer" />
        <Bell className="w-6 h-6 text-white cursor-pointer" />
        <User 
          onClick={() => navigate('/login')} 
          className="w-6 h-6 text-white cursor-pointer" 
        />
      </div>
    </nav>
  );
};

export default HeaderCont;