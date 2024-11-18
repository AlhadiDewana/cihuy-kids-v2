import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const UploadGameModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Lagu Anak',
        status: 'Free',
        game: null,
        thumbnail: null
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle upload logic here
        console.log(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold">Upload Musik</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-0">
                    {/* Game Upload */}
                    <div>
                        <label className="block mb-2 font-medium">File Musik</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                            <div className="space-y-2 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="text-sm text-gray-600">
                                    <label htmlFor="game-upload" className="relative cursor-pointer text-blue-500 hover:text-blue-600">
                                        <span>Upload Musik</span>
                                        <input 
                                            id="game-upload" 
                                            name="game" 
                                            type="file" 
                                            className="sr-only"
                                            accept="audio/*"
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <p>atau drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">Mp4 up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block mb-2 font-medium">Thumbnail</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                            <div className="space-y-2 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="text-sm text-gray-600">
                                    <label htmlFor="thumbnail-upload" className="relative cursor-pointer text-blue-500 hover:text-blue-600">
                                        <span>Upload Thumbnail</span>
                                        <input 
                                            id="thumbnail-upload" 
                                            name="thumbnail" 
                                            type="file" 
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <p>atau drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-medium">Judul</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan judul musik"
                            required
                        />
                    </div>

                    {/* Category & Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">Kategori</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Lagu Anak">Lagu Anak</option>
                                <option value="Lagu Nasional">Lagu Nasional</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Free">Free</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#FF4B6E] text-white rounded-lg hover:bg-[#FF3355]"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadGameModal;