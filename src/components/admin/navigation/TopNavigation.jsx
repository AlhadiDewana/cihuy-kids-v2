import React, {useState} from 'react';
import { Bell } from 'lucide-react';
import { useTitle } from './TitleContext';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { title } = useTitle();

    // Mengambil status login dan nama pengguna dari localStorage
    const isLoggedIn = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userData = user?.name || 'cihuy';  // Use 'cihuy' as default if name is not found

    const handleToggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };


    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="flex items-center space-x-4">
                        {/* User Info Section */}
                        <div className="hidden md:flex items-center space-x-2">
                            <div className='relative'>                                                         {/* Klik untuk toggle dropdown */}
                                <div 
                                    onClick={handleToggleDropdown} 
                                    className="flex items-center gap-2 cursor-pointer p-2 transition-transform duration-300 ease-in-out"
                                >
                                    <User 
                                        size={32} 
                                        className="text-black rounded-full border-2 border-black p-1 transition-transform duration-300 ease-in-out" 
                                    />
                                    {/* Hide username on small screens */}
                                    <span className="text-black text-base font-bold transition-colors duration-300 ease-in-out sm:inline-block hidden">
                                        {isLoggedIn ? `Hi, ${userData}` : 'Login'}
                                    </span>
                                    <ChevronDown 
                                        size={20} 
                                        className={`text-black transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                </div>
                                {/* Dropdown menu untuk pengguna yang sudah login */}
                                {isOpen && isLoggedIn && (
                                    <div className="absolute top-[45px] right-0 bg-white text-gray-700 rounded-lg py-3 px-4 shadow-lg z-50 min-w-[150px] transition-opacity duration-300 ease-in-out">
                                        <div 
                                            onClick={handleProfileClick} 
                                            className="flex items-center gap-2 py-2 cursor-pointer text-sm font-medium hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                                        >
                                            <User size={20} />
                                            <span>Profile</span>
                                        </div>
                                        <div 
                                            onClick={handleLogout} 
                                            className="flex items-center gap-2 py-2 cursor-pointer text-sm font-medium border-t border-gray-200 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                                        >
                                            <LogOut size={20} />
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                )}

                                {/* Dropdown menu untuk Login */}
                                {isOpen && !isLoggedIn && (
                                    <div className="absolute top-[45px] right-0 bg-white text-gray-700 rounded-lg py-3 px-4 shadow-lg z-50 min-w-[150px] transition-opacity duration-300 ease-in-out">
                                        <div 
                                            onClick={() => navigate('/login')} 
                                            className="flex items-center gap-2 py-2 cursor-pointer text-sm font-medium hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                                        >
                                            <User size={20} />
                                            <span>Login</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNavigation;
