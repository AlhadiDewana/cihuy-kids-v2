import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const UploadVideoModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        judul: '',
        kategori: 'Edukasi',
        status: 'Free',
        video: null,
        thumbnail: null
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle upload logic here
        console.log(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Upload Video</h3>
                    <button onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Video Upload */}
                    <div>
                        <label className="block mb-2 font-medium">Video</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                                Drag and drop video file here or click to browse
                            </p>
                            <input 
                                type="file" 
                                accept="video/*" 
                                className="hidden" 
                                onChange={(e) => setFormData({...formData, video: e.target.files[0]})}
                            />
                        </div>
                    </div>

                    {/* Thumbnail Upload */}
                    <div>
                        <label className="block mb-2 font-medium">Thumbnail</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                                Upload thumbnail image
                            </p>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => setFormData({...formData, thumbnail: e.target.files[0]})}
                            />
                        </div>
                    </div>

                    {/* Video Details */}
                    <div>
                        <label className="block mb-2 font-medium">Judul</label>
                        <input 
                            type="text"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            value={formData.judul}
                            onChange={(e) => setFormData({...formData, judul: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">Kategori</label>
                            <select 
                                className="w-full p-2 border rounded"
                                value={formData.kategori}
                                onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                            >
                                <option value="Edukasi">Edukasi</option>
                                <option value="Hiburan">Hiburan</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Status</label>
                            <select 
                                className="w-full p-2 border rounded"
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="Free">Free</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-[#FF4B6E] text-white rounded hover:bg-[#FF3355]"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadVideoModal;