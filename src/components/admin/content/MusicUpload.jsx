import React, { useEffect, useState } from 'react';
import { X, Upload, Link } from 'lucide-react';
import { musicAPI } from '../../../api';
import { data } from 'autoprefixer';

const UploadMusicModal = ({ isOpen, onClose, onUploadSuccess, editData = null }) => {
   const [formData, setFormData] = useState({
       title: '',
       musicUrl: '',
       thumbnailUrl: '',
       genre: 'Lagu Anak',
       isPremium: false,
       ageRange: '6-7'
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   console.log(formData)

   useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title,
        musicUrl: editData.url,
        thumbnailUrl: editData.thumbnailUrl,
        genre: editData.genre,
        isPremium: editData.isPremium,
        ageRange: editData.ageRange
      });
    } else {
      // Reset form jika tidak ada editData
      setFormData({
        title: '',
        
        musicUrl: '',
        thumbnailUrl: '',
        genre: 'Lagu Anak',
        isPremium: false,
        ageRange: '6-7'
      });
    }
  }, [editData]);

   const validateMusicUrl = (url) => {
       if (!url) return false;
       try {
           const urlObj = new URL(url);
           return urlObj.hostname.includes('drive.google.com');
       } catch (error) {
           return false;
       }
   };

   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData(prev => ({
           ...prev,
           [name]: value
       }));
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateMusicUrl(formData.musicUrl)) {
        setError('Please enter a valid Google Drive URL');
        return;
    }

    try {
        setLoading(true);
        let response;
        if (editData) {
            // Update existing data
            response = await musicAPI.updateMusic(editData.id, formData);
        } else {
            // Create new data
            response = await musicAPI.uploadMusic(formData);
        }
        onUploadSuccess?.(response.data);
        onClose();
    } catch (error) {
        setError(error.response?.data?.error || 'Gagal mengupload musik');
    } finally {
        setLoading(false);
    }
};

   if (!isOpen) return null;

   return (
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">
               <div className="sticky top-0 bg-white p-6 border-b">
                   <div className="flex justify-between items-center">
                       <h3 className="text-2xl font-semibold">Upload Musik</h3>
                       <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                           <X className="w-6 h-6" />
                       </button>
                   </div>
               </div>

               {error && (
                   <div className="p-4 bg-red-100 text-red-700 mx-6 mt-6 rounded-lg">
                       {error}
                   </div>
               )}

               <div className="flex-1 overflow-y-auto p-6">
                   <form onSubmit={handleSubmit} className="space-y-6">
                       <div>
                           <label className="block mb-2 font-medium">Music URL (Google Drive)</label>
                           <div className="flex gap-2">
                               <input
                                   type="url"
                                   name="musicUrl"
                                   value={formData.musicUrl}
                                   onChange={handleChange}
                                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="https://drive.google.com/file/d/..."
                                   required
                               />
                               <button
                                   type="button"
                                   onClick={() => window.open('https://drive.google.com', '_blank')}
                                   className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                                   title="Open Google Drive"
                               >
                                   <Link className="w-5 h-5" />
                               </button>
                           </div>
                           <p className="text-xs text-gray-500 mt-1">Pastikan file di Google Drive sudah di-set sebagai public</p>
                       </div>

                       <div>
                           <label className="block mb-2 font-medium">Thumbnail URL</label>
                           <input
                               type="url"
                               name="thumbnailUrl"
                               value={formData.thumbnailUrl}
                               onChange={handleChange}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="https://drive.google.com/file/d/... atau URL gambar lainnya"
                               required
                           />
                       </div>

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

                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block mb-2 font-medium">Kategori</label>
                               <select
                                   name="genre"
                                   value={formData.genre}
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
                                   name="isPremium"
                                   value={formData.isPremium}
                                   onChange={handleChange}
                                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                               >
                                   <option value={false}>Free</option>
                                   <option value={true}>Premium</option>
                               </select>
                           </div>
                           <div>
                <label className="block text-sm font-medium mb-1">Age Range</label>
                <select
                  value={formData.ageRange}
                  onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  
                  <option value="6-7">6-7 years</option>
                  <option value="8-9">8-9 years</option>
                  <option value="10-12">10-12 years</option>
                </select>
              </div>
                       </div>
                   </form>
               </div>
               
               <div className="sticky bottom-0 bg-white p-6 border-t">
                   <div className="flex justify-end gap-4">
                       <button
                           type="button"
                           onClick={onClose}
                           className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                           disabled={loading}
                       >
                           Batal
                       </button>
                       <button
                           onClick={handleSubmit}
                           disabled={loading}
                           className="px-6 py-2 bg-[#FF4B6E] text-white rounded-lg hover:bg-[#FF3355] disabled:bg-gray-400"
                       >
                           {loading ? 'Mengupload...' : 'Upload'}
                       </button>
                   </div>
               </div>
           </div>
       </div>
   );
};

export default UploadMusicModal;