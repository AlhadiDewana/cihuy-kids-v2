import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icon.png';
import ProfileDropdown from './dropdown/UserDrop';

const Navbar = ({ selectedAge, handleAgeChange }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    // Handle the back button click
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <>
            <nav className="flex flex-wrap items-center justify-between p-4 bg-[#6095FF]">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <img 
                        src={logo}
                        alt="Cihuy Kids Logo"
                        className="h-10"
                    />
                </div>

                {/* back  */}
                <button
                    onClick={handleBack}
                    className="text-white font-semibold px-4 py-2 md:block"
                >
                    Kembali
                </button>

                {/* Profile  */}
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <ProfileDropdown isLoggedIn={isLoggedIn} />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
