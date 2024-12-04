import React, { useState, useEffect } from 'react';
import { PenSquare, Trash2, Image } from 'lucide-react';
import VideoUpload from '../../../components/admin/content/VideoUpload';
import Sidebar from '../../../components/admin/Sidebar';
import TopNavigation from '../../../components/admin/TopNavigation';
import { videoAPI } from '../../../api';
import VideoThumbnail from '../../../components/VideoThumbnail';  // Adjust the import path as needed

// VideoThumbnail Component
const VideoAdmin = () => {
    const [showModal, setShowModal] = useState(false);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingVideo, setEditingVideo] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await videoAPI.getAllVideos();
            setVideos(response.data.videos || []);
            console.log(response.data.videos)
        } catch (err) {
            console.error('Error fetching videos:', err);
            setError('Failed to fetch videos');
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (video) => {
        setEditingVideo(video);
        setShowModal(true);
    };

    const handleDeleteClick = async (videoId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus video ini?')) {
            try {
                await videoAPI.deleteVideo(videoId);
                fetchVideos();
            } catch (error) {
                console.error('Error deleting video:', error);
                alert('Gagal menghapus video');
            }
        }
    };

    const handleSuccess = (response) => {
        fetchVideos();
        setShowModal(false);
        setEditingVideo(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <TopNavigation/>
                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Video List</h1>
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-[#FF4B6E] text-white px-4 py-2 rounded-lg hover:bg-[#FF3355] transition-colors"
                        >
                            Upload Video
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">Image</th>
                                    <th className="p-4 text-left">Judul</th>
                                    <th className="p-4 text-left">Kategori</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videos && videos.length > 0 ? (
                                    videos.map((video) => (
                                        <tr key={video.id} className="border-t hover:bg-gray-50">
                                            <td className="p-4">
                                            <VideoThumbnail 
    src={video.thumbnailUrl} 
    alt={video.title}
/>
                                            </td>
                                            <td className="p-4">{video.title}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm 
                                                    ${video.category === 'Edukasi' ? 'bg-blue-100 text-blue-600' : 
                                                    'bg-green-100 text-green-600'}`}>
                                                    {video.category}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm 
                                                    ${video.isPremium ? 'bg-purple-100 text-purple-600' : 
                                                    'bg-gray-100 text-gray-600'}`}>
                                                    {video.isPremium ? 'Premium' : 'Free'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => handleEditClick(video)}
                                                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <PenSquare className="w-5 h-5 text-blue-500" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteClick(video.id)}
                                                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5 text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            No videos found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <VideoUpload 
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setEditingVideo(null);
                    }}
                    onSuccess={handleSuccess}
                    editData={editingVideo}
                />
            </div>
        </div>
    );
};

export default VideoAdmin;