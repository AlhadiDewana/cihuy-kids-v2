import React, { useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icon.png';
import LoginForm from '../auth/login';

const Navbar = ({ selectedAge, handleAgeChange }) => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const isLoggedIn = localStorage.getItem('token');

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate('/profile');
        } else {
            setShowLogin(true);
        }
    };

    return (
        <>
            <nav className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-8">
                    <img 
                        src={logo}
                        alt="Cihuy Kids Logo" 
                        className="navbar-logo" 
                    />
                    
                    <select 
    value={selectedAge}
    onChange={(e) => handleAgeChange(e.target.value)}
    className="bg-transparent text-white rounded-full px-4 py-2 appearance-none cursor-pointer hover:bg-white hover:text-black transition-colors"
    style={{
        WebkitAppearance: 'none',
        MozAppearance: 'none'
    }}
>
<option className="text-black bg-white" value="4-5 Tahun">4-5 Tahun</option>
    <option className="text-black bg-white" value="6-7 Tahun">6-7 Tahun</option>
    <option className="text-black bg-white" value="8-9 Tahun">8-9 Tahun</option>
    <option className="text-black bg-white" value="10-12 Tahun">10-12 Tahun</option>
</select>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
                        <User className="w-8 h-8 text-white border border-3 rounded-full p-[4px]" />
                        <div className='text-white text-lg font-bold'>
                            {isLoggedIn ? 'Profile' : 'Login'}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            {showLogin && (
                <LoginForm 
                    isOpen={showLogin}
                    onClose={() => setShowLogin(false)}
                />
            )}
        </>
    );
};

export default Navbar;