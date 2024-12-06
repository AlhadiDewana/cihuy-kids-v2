import React, { useState, useEffect } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { readingAPI } from '../../../api';

const ReadingUpload = ({ isOpen, onClose, onSuccess, editData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        thumbnailUrl: '',
        genre: 'Dongeng',
        ageRange: '10-12',
        description: '',
        isPremium: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(editData);

    // Isi form dengan data edit jika ada
    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title,
                thumbnailUrl: editData.thumbnailUrl,
                genre: editData.genre,
                ageRange: editData.ageRange,
                description: editData.description,
                isPremium: editData.isPremium,
                content: editData.content, 
            });
        }
    }, [editData]);

    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            setLoading(true);
            let response;

            if (editData) {
                // Update existing reading
                response = await readingAPI.updateReading(editData.id, formData);
            } else {
                // Upload new reading
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('content', formData.content);
                formDataToSend.append('thumbnailUrl', formData.thumbnailUrl);
                formDataToSend.append('genre', formData.genre);
                formDataToSend.append('ageRange', formData.ageRange);
                formDataToSend.append('description', formData.description);
                formDataToSend.append('isPremium', formData.isPremium);

                response = await readingAPI.uploadReading(formDataToSend);
            }

            onSuccess?.(response.data);
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.error || `Failed to ${editData ? 'update' : 'upload'} reading`
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        {editData ? 'Edit Cerita' : 'Upload Cerita'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium mb-2">Judul</label>
            <input
                type="text"
                value={formData.title}
                name="title"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan judul cerita"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <input
                type="text"
                value={formData.content}
                name="content"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan konten cerita"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
            <input
                type="url"
                value={formData.thumbnailUrl}
                name="thumbnailUrl"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan URL thumbnail"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-2">Genre</label>
            <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
                <option value="Dongeng">Dongeng</option>
                <option value="Cerita Rakyat">Cerita Rakyat</option>
                <option value="Fabel">Fabel</option>
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium mb-2">Age Range</label>
            <select
                name="ageRange"
                value={formData.ageRange}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
                <option value="4-5">4-5 years</option>
                <option value="6-7">6-7 years</option>
                <option value="8-9">8-9 years</option>
                <option value="10-12">10-12 years</option>
            </select>
        </div>

        <div className="">
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan deskripsi cerita"
                rows={3}
                required
            />
        </div>

        <div className="flex items-center gap-3">
            <input
                type="checkbox"
                name="isPremium"
                checked={formData.isPremium}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        isPremium: e.target.checked,
                    }))
                }
                className="h-5 w-5 rounded text-blue-500"
            />
            <label className="text-sm font-medium">Premium Content</label>
        </div>
    </div>

    {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
        </div>
    )}

    <div className="flex justify-end gap-4 mt-6">
        <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
            Cancel
        </button>
        <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
            {loading ? 'Uploading...' : 'Upload'}
        </button>
    </div>
</form>

                </div>
            </div>
        </div>
    );
};

export default ReadingUpload;
