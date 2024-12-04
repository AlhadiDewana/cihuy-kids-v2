import React, { useEffect, useState } from 'react';
import '../Header/style/Header.css';
import logo from '../../assets/icon.png';
import stickyLogo from '../../assets/logo.png';
import userIcon from '../../assets/profile-icon.png';
import userIconSticky from '../../assets/profile-icon-sticky.png';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../auth/login';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const {logout}=useAuth();
    const [isSticky, setIsSticky] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
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

    // Cek apakah user sudah login
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        logout();

        navigate('/');
    };

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            setShowLogin(true);
        }
    };

    return (
        <>
            <header className={`header ${isSticky ? 'sticky' : ''}`}>
                <nav className="navbar">
                    <div className="navbar-left">
                        <img
                            src={isSticky ? stickyLogo : logo}
                            alt="Cihuy Kids Logo"
                            className="navbar-logo"
                        />
                    </div>

                    <div className="navbar-right">
                        {isLoggedIn ? (
                            <img
                                onClick={handleLogout}
                                src={isSticky ? userIconSticky : userIcon}
                                alt="Logout Icon"
                                className="navbar-user-icon cursor-pointer"
                                title="Logout"
                            />
                        ) : (
                            <img
                                onClick={handleProfileClick}
                                src={isSticky ? userIconSticky : userIcon}
                                alt="Login Icon"
                                className="navbar-user-icon cursor-pointer"
                                title="Login"
                            />
                        )}
                        <button
                            onClick={() => navigate('/Jelajahi')}
                            className={`navbar-button ${isSticky ? 'sticky-button' : ''}`}
                        >
                            Jelajahi
                        </button>
                    </div>
                </nav>
                <nav>
                    <div className="navbar-center">
                        <a
                            onClick={() => navigate('/')}
                            className="nav-link cursor-pointer"
                        >
                            Selamat Datang
                        </a>
                        <a
                            onClick={() => navigate('/Landing2')}
                            className="nav-link cursor-pointer"
                        >
                            Kenapa Konten Sesuai Usia itu Penting?
                        </a>
                        <a
                            onClick={() => navigate('/Landing3')}
                            className="nav-link cursor-pointer"
                        >
                            Perkembangan Otak
                        </a>
                    </div>
                </nav>
            </header>

            {/* Modal Login */}
            {showLogin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="w-full max-w-md">
                        <LoginForm onClose={() => setShowLogin(false)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
