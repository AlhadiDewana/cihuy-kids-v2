import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, CreditCard, Video, Music, GamepadIcon, BookOpen, Settings, LogOut } from 'lucide-react';
import { useTitle } from './TitleContext';


const Sidebar = () => {
    const navigate = useNavigate();
    const { setTitle } = useTitle();

    const handleNavigation = (path, title) => {
        navigate(path);
        setTitle(title);
    };

    const handleLogout = () => {
        // Hapus data autentikasi
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect ke halaman login
        navigate('/');
    };

    return (
        <div className="w-64 bg-[#4B7BF5] text-white min-h-screen">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-8">CIHUY KIDS</h1>
                
                {/* Menu Sections */}
                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-white/60 mb-2">User</p>
                        <div className="space-y-2">
                            <button 
                                onClick={() => handleNavigation('/dashboard', 'Dashboard')}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </button>
                            <button 
                                onClick={() => handleNavigation('/data-user', 'Data User')}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <Users className="w-5 h-5" />
                                <span>Data User</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-white/60 mb-2">Konfirmasi Pembayaran</p>
                        <button 
                            onClick={() => navigate('/admin/konfirmasi-pembayaran', 'Konfirmasi Pembayaran')}
                            className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                        >
                            <CreditCard className="w-5 h-5" />
                            <span>Premium</span>
                        </button>
                    </div>

                    <div>
                        <p className="text-sm text-white/60 mb-2">Konten</p>
                        <div className="space-y-2">
                            <button 
                                onClick={() => handleNavigation('/admin/video', 'Video List')}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <Video className="w-5 h-5" />
                                <span>Video</span>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/music', 'Music List')}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <Music className="w-5 h-5" />
                                <span>Musik</span>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/game', 'Game List')}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <GamepadIcon className="w-5 h-5" />
                                <span>Game</span>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/reading', 'Reading List')}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Bacaan</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-white/60 mb-2">General</p>
                        <div className="space-y-2">
                            <button 
                                onClick={() => navigate('/settings')}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <Settings className="w-5 h-5" />
                                <span>Settings</span>
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center space-x-2 w-full p-2 rounded hover:bg-white/10"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;