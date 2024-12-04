import React, { useState, useEffect } from 'react';
import { PenSquare, Trash2 } from 'lucide-react';
import UploadMusicModal from '../../../components/admin/content/MusicUpload';
import Sidebar from '../../../components/admin/Sidebar';
import TopNavigation from '../../../components/admin/TopNavigation';
import { musicAPI } from '../../../api';
import VideoThumbnail from '../../../components/VideoThumbnail';

const MusicAdmin = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [musics, setMusics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const handleEdit = (music) => {
        console.log(music);
        setSelectedMusic(music);
        setShowUploadModal(true);
    };

    


    useEffect(() => {
        fetchMusics();
    }, []);

    const fetchMusics = async () => {
        try {
            console.log('Fetching music...');
            const response = await musicAPI.getAllMusic();
            console.log('Response:', response.data);
            setMusics(response.data.musics);
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
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <TopNavigation/>
                
                {/* Content Container */}
                <div className="p-6 bg-gray-100 min-h-screen">
                    {/* Header with Upload Button */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Music Management</h1>
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
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Format</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {musics && musics.length > 0 ? (
            musics.map((music) => (
              <tr key={music.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                <VideoThumbnail 
    src={music.thumbnailUrl} 
    alt={music.title}
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
    onClick={() => handleEdit(music)}
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
    onClose={() => {
        setShowUploadModal(false);
        setSelectedMusic(null);
    }}
    onUploadSuccess={handleUploadSuccess}
    editData={selectedMusic}
/>

            </div>
        </div>
    );
};

export default MusicAdmin;