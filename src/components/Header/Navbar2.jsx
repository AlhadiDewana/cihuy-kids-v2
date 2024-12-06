import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import logo from '../../assets/icon.png';
import ProfileDropdown from './dropdown/UserDrop';

const Navbar = ({ selectedAge, handleAgeChange }) => {
    const isLoggedIn = localStorage.getItem('token');

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
    onChange={(e) => {
        const value = e.target.value;
        handleAgeChange(value);
        localStorage.setItem('lastSelectedAge', value); // Set item ke localStorage
    }}
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

                {/* Profile and Login/Logout Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                    <ProfileDropdown isLoggedIn={isLoggedIn} />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
