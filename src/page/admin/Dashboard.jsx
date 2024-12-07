import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/navigation/Sidebar';
import TopNavigation from '../../components/admin/navigation/TopNavigation';
import { readingAPI, videoAPI, userAPI, musicAPI } from '../../api';

const AdminDashboard = () => {
    const [currentTitle, setCurrentTitle] = useState('Dashboard');
    const [videoData, setVideoData] = useState([]);
    const [musicData, setMusicData] = useState([]);
    const [readingData, setReadingData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const video = await videoAPI.getAllVideos();
                const music = await musicAPI.getAllMusic();
                const bacaan = await readingAPI.getAllReading();
                const users = await userAPI.getAllUsers();

                setVideoData(video.data.videos || []);
                setMusicData(music.data.musics || []);
                setReadingData(bacaan.data.readings || []);
                setUserData(users.data.users || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboard();
    }, []);

    const handleMenuClick = (newTitle) => {
        setCurrentTitle(newTitle);
    };

    const stats = [
        {
            title: "Total Musik",
            value: musicData.length,
            changeText: "Up from past week",
            icon: "🎵",
        },
        {
            title: "Total Video",
            value: videoData.length,
            changeText: "Down from yesterday",
            icon: "🎥",
        },
        {
            title: "Total Bacaan",
            value: readingData.length,
            changeText: "Up from yesterday",
            icon: "📖",
        },
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar onMenuClick={handleMenuClick} />
            <div className="flex-1 overflow-hidden">
                <TopNavigation title={currentTitle} />
                
                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500">{stat.title}</p>
                                        <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                                    </div>
                                    <span className="text-2xl">{stat.icon}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* User Stats */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-gray-500">Total User</h3>
                                <p className="text-2xl font-bold mt-2">{userData.length}</p>
                            </div>
                            <span className="text-2xl">👥</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
