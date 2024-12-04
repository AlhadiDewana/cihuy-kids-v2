import React from 'react';
import { Bell } from 'lucide-react';
import { useTitle } from './TitleContext';

const TopNavigation = () => {
    const { title } = useTitle();

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="flex items-center space-x-4">
                        {/* Notification Button */}
                        <button className="relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                2
                            </span>
                        </button>
                        {/* User Info Section */}
                        <div className="hidden md:flex items-center space-x-2">
                            <img 
                                src="https://via.placeholder.com/40" 
                                alt="Admin" 
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium">admin</p>
                                <p className="text-sm text-gray-500">Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNavigation;
