import React, { useState, useEffect } from 'react';
import { PenSquare, Trash2 } from 'lucide-react';
import UploadMusicModal from '../../../components/admin/content/MusicUpload';
import Sidebar from '../../../components/admin/navigation/Sidebar';
import TopNavigation from '../../../components/admin/navigation/TopNavigation';
import { musicAPI } from '../../../api';

const MusicAdmin = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [musics, setMusics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMusics();
    }, []);

    const fetchMusics = async () => {
        try {
            console.log('Fetching music...');
            const response = await musicAPI.getAllMusic();
            console.log('Response:', response);
            setMusics(response.data);
        } catch (err) {
            console.error('Error detail:', err);
            setError('Failed to fetch music');
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSuccess = () => {
        fetchMusics();
        setShowUploadModal(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this music?')) {
            try {
                await musicAPI.deleteMusic(id);
                fetchMusics();
            } catch (err) {
                console.error('Error deleting music:', err);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

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
                            Upload Musik
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

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
                                {musics && musics.length > 0 ? (
                                    musics.map((music) => (
                                        <tr key={music.id} className="border-t hover:bg-gray-50">
                                            <td className="p-4">
                                                <img 
                                                    src={music.thumbnailUrl} 
                                                    alt={music.title}
                                                    className="w-24 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="p-4">MP3</td>
                                            <td className="p-4">{music.title}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm 
                                                    ${music.genre === 'Lagu Anak' ? 'bg-pink-100 text-pink-600' : 
                                                    'bg-orange-100 text-orange-600'}`}>
                                                    {music.genre}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm 
                                                    ${music.isPremium ? 'bg-purple-100 text-purple-600' : 
                                                    'bg-gray-100 text-gray-600'}`}>
                                                    {music.isPremium ? 'Premium' : 'Free'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button 
                                                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                        title="Edit"
                                                        onClick={() => window.open(music.musicUrl, '_blank')}
                                                    >
                                                        <PenSquare className="w-5 h-5 text-blue-500" />
                                                    </button>
                                                    <button 
                                                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                        title="Delete"
                                                        onClick={() => handleDelete(music.id)}
                                                    >
                                                        <Trash2 className="w-5 h-5 text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            No music found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upload Music Modal */}
                <UploadMusicModal 
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onUploadSuccess={handleUploadSuccess}
                />
            </div>
        </div>
    );
};

export default MusicAdmin;
