import React, { useEffect, useState } from 'react';
import { PenSquare, Trash2 } from 'lucide-react';
import UploadReadingModal from '../../../components/admin/content/ReadingUpload.jsx';
import Sidebar from '../../../components/admin/navigation/Sidebar.jsx';
import TopNavigation from '../../../components/admin/navigation/TopNavigation.jsx';
import { readingAPI } from '../../../api';
import VideoThumbnail from '../../../components/VideoThumbnail.jsx';

const ReadingAdmin = () => {
    const [readingData, setReadingData] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editData, setEditData] = useState(null);

    // Fetch data from API
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await readingAPI.getAllReading();
            setReadingData(response.data.readings);
        } catch (error) {
            console.error('Error fetching reading data:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this reading?');
        if (confirmed) {
            try {
                await readingAPI.deleteReading(id);
                setReadingData((prev) => prev.filter((reading) => reading.id !== id));
                alert('Reading deleted successfully!');
            } catch (error) {
                console.error('Error deleting reading:', error);
                alert('Failed to delete reading!');
            }
        }
    };

    const handleEdit = (data) => {
        setEditData(data);
        setShowUploadModal(true);
    };

    const handleSuccess = (updatedData) => {
        if (editData) {
            setReadingData((prev) =>
                prev.map((reading) => (reading.id === updatedData.id ? updatedData : reading))
            );
        } else {
            setReadingData((prev) => [updatedData, ...prev]);
        }
        setEditData(null);
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                {/* Top Navigation */}
                <TopNavigation />

                {/* Header with Upload Button */}
                <div className="flex justify-end items-center mb-6">
                    <button
                        onClick={() => {
                            setEditData(null);
                            setShowUploadModal(true);
                        }}
                        className="bg-[#FF4B6E] mt-6 text-white px-4 py-2 rounded-lg hover:bg-[#FF3355] transition-colors"
                    >
                        Upload Cerita
                    </button>
                </div>

                {/* Responsive Table */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full table-auto">
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
                            {readingData.map((reading) => (
                                <tr key={reading.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4">
                                    <VideoThumbnail 
    src={reading.thumbnailUrl} 
    alt={reading.title}
/>
                                    </td>
                                    <td className="p-4">{reading.title}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                reading.genre === 'Dongeng'
                                                    ? 'bg-pink-100 text-pink-600'
                                                    : 'bg-orange-100 text-orange-600'
                                            }`}
                                        >
                                            {reading.genre}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                reading.isPremium
                                                    ? 'bg-purple-100 text-purple-600'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {reading.isPremium ? 'Premium' : 'Free'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(reading)}
                                                className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <PenSquare className="w-5 h-5 text-blue-500" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(reading.id)}
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

            {/* Upload Reading Modal */}
            <UploadReadingModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onSuccess={handleSuccess}
                editData={editData}
            />
        </div>
    );
};

export default ReadingAdmin;
