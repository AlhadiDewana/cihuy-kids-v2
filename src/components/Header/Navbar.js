import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icon.png';
import { Settings, Bell, User, LogOut } from 'lucide-react';
import IconButton from '../IconButton';
import UserMenu from '../UserMenu';

const Navbar = () => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    // Ambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Toggle user menu
    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 relative">
            <div className="flex items-center gap-8">
                <img 
                    src={logo}
                    alt="Cihuy Kids Logo" 
                    className="navbar-logo" 
                />
            </div>

            <div className="flex items-center gap-6">
                {/* User icon with dropdown */}
                <div className="relative">
                    <IconButton onClick={user ? toggleUserMenu : () => navigate('/login')}>
                        <User className="w-8 h-8 text-white border border-3 rounded-full p-[4px]" />
                    </IconButton>
                    
                    {user && showUserMenu && (
                        <UserMenu 
                            user={user}
                            onLogout={handleLogout}
                            onProfileClick={() => navigate('/profile')}
                            onSettingsClick={() => navigate('/settings')}
                        />
                    )}
                </div>
            </div>

            {/* Click outside handler - menutup dropdown ketika klik di luar */}
            {showUserMenu && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;