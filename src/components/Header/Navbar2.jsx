import React, { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
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
            <nav style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#6095FF',
            }}>
                {/* Logo and Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img 
                        src={logo}
                        alt="Cihuy Kids Logo"
                        style={{ height: '40px', width: 'auto' }}
                    />

                    {/* Dropdown for Age Selection */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <select 
                            value={selectedAge}
                            onChange={(e) => handleAgeChange(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '1px solid white',
                                borderRadius: '9999px',
                                padding: '8px 32px 8px 16px',
                                cursor: 'pointer',
                                appearance: 'none',
                            }}
                        >
                            <option style={{ color: 'black', backgroundColor: 'white' }} value="4-5 Tahun">4-5 Tahun</option>
                            <option style={{ color: 'black', backgroundColor: 'white' }} value="6-7 Tahun">6-7 Tahun</option>
                            <option style={{ color: 'black', backgroundColor: 'white' }} value="8-9 Tahun">8-9 Tahun</option>
                            <option style={{ color: 'black', backgroundColor: 'white' }} value="10-12 Tahun">10-12 Tahun</option>
                        </select>
                        <ChevronDown 
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                                color: 'white',
                            }} 
                            size={20} 
                        />
                    </div>
                </div>

                {/* Profile and Login */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                    <div 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        onClick={handleProfileClick}
                    >
                        <User 
                            style={{
                                width: '32px',
                                height: '32px',
                                color: 'white',
                                border: '2px solid white',
                                borderRadius: '50%',
                                padding: '4px',
                            }} 
                        />
                        <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                            {isLoggedIn ? 'Profile' : 'Login'}
                        </span>
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
