import React, {useState} from 'react';
import Sidebar from '../../components/admin/Sidebar';
import TopNavigation from '../../components/admin/TopNavigation';

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
            <div className="flex-1 overflow">
                <TopNavigation title={currentTitle} />
                
                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

                    {/* Content Stats */}
                    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                        <h3 className="text-xl font-bold mb-6">Konten Paling Sering Dilihat</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {contentStats.map((content, index) => (
                                <div key={index}>
                                    <div className="h-40 bg-[#FF4B6E] rounded-lg flex items-end">
                                        <div
                                            className="bg-[#FF4B6E] w-full rounded-b-lg"
                                            style={{ height: `${content.percentage}%` }}
                                        >
                                            <p className="text-white text-center p-2">
                                                {content.percentage}%
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-center mt-2">{content.name}</p>
                                </div>
                            ))}
                        </div>
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