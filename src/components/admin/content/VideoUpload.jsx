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

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle upload logic here
        console.log(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">
                {/*Header*/}
                <div className="sticky top-0 bg-white p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Upload Video</h3>
                        <button onClick={onClose}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/*Form*/}
                <div className="flex-1 overflow-y-auto p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Video Upload */}
                        <div>
                            <label className="block mb-2 font-medium">File Game</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                                <div className="space-y-2 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="text-sm text-gray-600">
                                        <label htmlFor="game-upload" className="relative cursor-pointer text-blue-500 hover:text-blue-600">
                                            <span>Upload Game</span>
                                            <input 
                                                id="game-upload" 
                                                name="game" 
                                                type="file" 
                                                className="sr-only"
                                                accept="video/*"
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <p>atau drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">MP4 up to 1GB</p>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block mb-2 font-medium">Thumbnail</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div className='space-y-2 text-center'>
                                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                    <div className='text-sm text-gray-600'>
                                        <label className='relative cursor-pointer text-blue-500 hover:text-blue-600'>
                                            <span>Upload Thumbnail</span>
                                            <input 
                                            type="file"
                                            className='sr-only'
                                            accept='image/*'
                                            onChange={handleChange}
                                            name='thumbnail'
                                            />
                                        </label>
                                        <p>atau drag and drop</p>
                                    </div>
                                    <p  className='text-xs text-gray-500'>
                                        PNG, JPG up to 5MB
                                    </p>
                                </div>
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

                        {/* Category & Status */}
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
                    </form>
                </div>
                {/* Footer */}
                <div className="sticky bottom-0 bg-white p-6 border-t">
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-[#FF4B6E] text-white rounded-lg hover:bg-[#FF3355]"
                            >
                                Upload
                            </button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default UploadVideoModal;