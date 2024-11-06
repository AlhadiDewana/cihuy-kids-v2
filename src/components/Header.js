import React, { useEffect, useState } from 'react';
import '../components/Header.css';
import logo from '../assets/icon.png'
import stickyLogo from '../assets/logo.png'; // Logo saat sticky
import userIcon from '../assets/profile-icon.png'; // Ikon normal
import userIconSticky from '../assets/profile-icon-sticky.png';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
                <nav className="navbar">
                <div className="navbar-left">
                    <img 
                    src={isSticky ? stickyLogo : logo} // Menggunakan variabel yang diimport
                    alt="Cihuy Kids Logo" 
                    className="navbar-logo" 
                    />
                </div>
                
                <div className="navbar-right">
                    <img 
                    onClick={() => navigate('/login')}
                    src={isSticky ? userIconSticky : userIcon} // Menggunakan variabel yang diimport
                    alt="User Icon" 
                    className="navbar-user-icon" 
                    />
                    <button onClick={() => navigate('/Jelajahi')} className={`navbar-button ${isSticky ? 'sticky-button' : ''}`}>
                    Jelajahi
                    </button>
                </div>
                </nav>
                <nav>
                <div className="navbar-center">
          <a 
            onClick={() => navigate('/')} 
            className="nav-link"
          >
            Selamat Datang
          </a>
          <a 
            onClick={() => navigate('/Landing2')} 
            className="nav-link"
          >
            Kenapa Konten Sesuai Usia itu Penting?
          </a>
          <a 
            onClick={() => navigate('/Landing3')} 
            className="nav-link"
          >
            Perkembangan Otak
          </a>
        </div>
                </nav>
            </header>
  );
}

export default Header;