// components/admin/content/VideoUpload.jsx
import React, { useState, useEffect } from 'react';
import { Upload, Link, AlertCircle } from 'lucide-react';
import { videoAPI } from '../../../api';

const VideoUpload = ({ isOpen, onClose, onSuccess, editData = null }) => {
 const [formData, setFormData] = useState({
   title: '',
   description: '',
   videoUrl: '',
   thumbnailUrl: '',
   category: 'Edukasi',
   isPremium: false,
   ageRange: '4-5'
 });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 // Isi form dengan data edit jika ada
 useEffect(() => {
   if (editData) {
     setFormData({
       title: editData.title,
       description: editData.description,
       videoUrl: editData.videoUrl,
       thumbnailUrl: editData.thumbnailUrl,
       category: editData.category,
       isPremium: editData.isPremium,
       ageRange: editData.ageRange
     });
   } else {
     // Reset form jika tidak ada editData
     setFormData({
       title: '',
       description: '',
       videoUrl: '',
       thumbnailUrl: '',
       category: 'Edukasi',
       isPremium: false,
       ageRange: '4-5'
     });
   }
 }, [editData]);

 const validateVideoUrl = (url) => {
   const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|drive\.google\.com\/file\/d\/).+/;
   return youtubeRegex.test(url);
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError(null);

   if (!validateVideoUrl(formData.videoUrl)) {
     setError('Please enter a valid YouTube or Google Drive URL');
     return;
   }

   try {
     setLoading(true);
     let response;

     if (editData) {
       // Update existing video
       response = await videoAPI.updateVideo(editData.id, formData);
     } else {
       // Upload new video
       const formDataToSend = new FormData();
       Object.keys(formData).forEach(key => {
         formDataToSend.append(key, formData[key]);
       });
       response = await videoAPI.uploadVideo(formDataToSend);
     }

     onSuccess?.(response.data);
     onClose();
   } catch (err) {
     console.error(editData ? 'Update error:' : 'Upload error:', err);
     setError(err.response?.data?.error || `Failed to ${editData ? 'update' : 'upload'} video`);
   } finally {
     setLoading(false);
   }
 };

 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
     <div className="bg-white rounded-lg max-w-2xl w-full">
       <div className="p-6">
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold">
             {editData ? 'Edit Video' : 'Upload Video'}
           </h2>
           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
             ×
           </button>
         </div>

         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium mb-1">Title</label>
             <input
               type="text"
               value={formData.title}
               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>

           <div>
             <label className="block text-sm font-medium mb-1">Video URL (YouTube/Google Drive)</label>
             <div className="flex gap-2">
               <input
                 type="url"
                 value={formData.videoUrl}
                 onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                 required
               />
               <button
                 type="button"
                 onClick={() => window.open('https://www.youtube.com', '_blank')}
                 className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                 title="Open YouTube"
               >
                 <Link className="w-5 h-5" />
               </button>
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium mb-1">Thumbnail URL (Google Drive)</label>
             <input
               type="url"  
               value={formData.thumbnailUrl}
               onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>

           <div>
             <label className="block text-sm font-medium mb-1">Description</label>
             <textarea
               value={formData.description}
               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
             />
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium mb-1">Category</label>
               <select
                 value={formData.category}
                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
               >
                 <option value="Edukasi">Edukasi</option>
                 <option value="Hiburan">Hiburan</option>
               </select>
             </div>

             <div>
               <label className="block text-sm font-medium mb-1">Age Range</label>
               <select
                 value={formData.ageRange}
                 onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
               >
                 <option value="4-5">4-5 years</option>
                 <option value="6-7">6-7 years</option>
                 <option value="8-9">8-9 years</option>
                 <option value="10-12">10-12 years</option>
               </select>
             </div>
           </div>

           <div className="flex items-center gap-2">
             <input
               type="checkbox"
               id="isPremium"
               checked={formData.isPremium}
               onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
               className="rounded text-blue-500"
             />
             <label htmlFor="isPremium" className="text-sm font-medium">
               Premium Content
             </label>
           </div>

           {error && (
             <div className="bg-red-50 text-red-500 p-3 rounded flex items-center gap-2">
               <AlertCircle className="w-5 h-5" />
               {error}
             </div>
           )}

           <div className="flex justify-end gap-3 mt-6">
             <button
               type="button"
               onClick={onClose}
               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={loading}
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
             >
               {loading ? (
                 <>
                   <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                   {editData ? 'Updating...' : 'Uploading...'}
                 </>
               ) : (
                 <>
                   <Upload className="w-5 h-5" />
                   {editData ? 'Save Changes' : 'Upload Video'}
                 </>
               )}
             </button>
           </div>
         </form>
       </div>
     </div>
   </div>
 );
};

export default VideoUpload;