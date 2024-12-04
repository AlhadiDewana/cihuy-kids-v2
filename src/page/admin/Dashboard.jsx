import React, { useState } from 'react';
import Sidebar from '../../components/admin/navigation/Sidebar';
import TopNavigation from '../../components/admin/navigation/TopNavigation';

const AdminDashboard = () => {
    const [currentTitle, setCurrentTitle] = useState('Dashboard');
    
    const handleMenuClick = (newTitle) => {
        setCurrentTitle(newTitle);
    };

    const stats = [
        {
            title: "Total Order",
            value: "10293",
            change: "+1.3%",
            changeText: "Up from past week",
            icon: "📦",
            changeType: "positive"
        },
        {
            title: "Total Sales",
            value: "$89,000",
            change: "-4.3%",
            changeText: "Down from yesterday",
            icon: "📈",
            changeType: "negative"
        },
        {
            title: "Total Pending",
            value: "2040",
            change: "+1.8%",
            changeText: "Up from yesterday",
            icon: "⏳",
            changeType: "positive"
        }
    ];

    const contentStats = [
        { name: 'Bacaan', percentage: 10 },
        { name: 'Musik', percentage: 30 },
        { name: 'Video', percentage: 45 },
        { name: 'Game', percentage: 15 }
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
                                <p className={`mt-2 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.change} {stat.changeText}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    {/* User Stats */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-gray-500">Total User</h3>
                                <p className="text-2xl font-bold mt-2">40,689</p>
                            </div>
                            <span className="text-2xl">👥</span>
                        </div>
                        <p className="text-green-500 mt-2">
                            +8.5% Up from yesterday
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
