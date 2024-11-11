import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';
import { Settings, Bell, User, LogOut } from 'lucide-react';

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
                <Settings className="w-6 h-6 text-white cursor-pointer" />
                <Bell className="w-6 h-6 text-white cursor-pointer" />
                
                {/* User icon with dropdown */}
                <div className="relative">
                    <User 
                        onClick={user ? toggleUserMenu : () => navigate('/login')} 
                        className="w-6 h-6 text-white cursor-pointer"
                    />
                    
                    {/* Dropdown menu */}
                    {user && showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                            {/* User info */}
                            <div className="px-4 py-2 border-b">
                                <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            
                            {/* Menu items */}
                            <div className="mt-2">
                                <button 
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        navigate('/profile');
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </button>
                                
                                <button 
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        navigate('/settings');
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Settings
                                </button>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
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