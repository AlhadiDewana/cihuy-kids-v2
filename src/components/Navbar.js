import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';
import { Settings, Bell, User } from 'lucide-react';

const Navbar = () => {

    //Navbar Age Section
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
        <img 
                    src={logo} // Menggunakan variabel yang diimport
                    alt="Cihuy Kids Logo" 
                    className="navbar-logo" 
                    />
          

        </div>

        <div className="flex items-center gap-6">
          <Settings className="w-6 h-6 text-white cursor-pointer" />
          <Bell className="w-6 h-6 text-white cursor-pointer" />
          <User onClick={() => navigate('/login')} className="w-6 h-6 text-white cursor-pointer" />
        </div>
        </nav>
    )
}

export default Navbar;