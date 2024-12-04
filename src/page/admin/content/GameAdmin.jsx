import React, { useState } from 'react';
import { PenSquare, Trash2 } from 'lucide-react';
import UploadGameModal from '../../../components/admin/content/GameUpload.jsx';
import Sidebar from '../../../components/admin/navigation/Sidebar.jsx';
import TopNavigation from '../../../components/admin/navigation/TopNavigation.jsx';

const GameAdmin = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    
    const Games = [
        {
            id: 1,
            image: "/path/to/thumbnail1.jpg",
            format: "HTML",
            judul: "Snake Senzia",
            kategori: "Puzzle",
            status: "Premium"
        },
        {
            id: 2,
            image: "/path/to/thumbnail2.jpg",
            format: "HTML",
            judul: "Tebak Gambar",
            kategori: "Edukasi",
            status: "Free"
        },
        {
            id: 3,
            image: "/path/to/thumbnail3.jpg",
            format: "HTML",
            judul: "Tebak Suara",
            kategori: "Edukasi",
            status: "Premium"
        },
    ];

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                {/* Header */}
                <TopNavigation />
                
                {/* Content Container */}
                <div className="p-6 bg-gray-100 min-h-screen">
                    {/* Header with Upload Button */}
                    <div className="flex justify-end items-center mb-6">
                        <button 
                            onClick={() => setShowUploadModal(true)}
                            className="bg-[#FF4B6E] text-white px-4 py-2 rounded-lg hover:bg-[#FF3355] transition-colors"
                        >
                            Upload Game
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">Image</th>
                                    <th className="p-4 text-left">Format Upload Konten</th>
                                    <th className="p-4 text-left">Judul</th>
                                    <th className="p-4 text-left">Kategori</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Games.map((Game) => (
                                    <tr key={Game.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">
                                            <img 
                                                src={Game.image} 
                                                alt={Game.judul}
                                                className="w-24 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-4">{Game.format}</td>
                                        <td className="p-4">{Game.judul}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm 
                                                ${Game.kategori === 'Puzzle' ? 'bg-pink-100 text-pink-600' : 
                                                'bg-orange-100 text-orange-600'}`}>
                                                {Game.kategori}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm 
                                                ${Game.status === 'Premium' ? 'bg-purple-100 text-purple-600' : 
                                                'bg-gray-100 text-gray-600'}`}>
                                                {Game.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <PenSquare className="w-5 h-5 text-blue-500" />
                                                </button>
                                                <button 
                                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upload Game Modal */}
                <UploadGameModal 
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                />
            </div>
        </div>
    );
};

export default GameAdmin;
