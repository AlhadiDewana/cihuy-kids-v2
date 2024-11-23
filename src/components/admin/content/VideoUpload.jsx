import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { videoAPI } from '../../../api';

const UploadVideoModal = ({ isOpen, onClose, onUploadSuccess }) => {
   const [formData, setFormData] = useState({
       judul: '',
       kategori: 'Edukasi',
       status: 'Free',
       video: null,
       thumbnail: null
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

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

   const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
       setError('');

       try {
           const formDataToSend = new FormData();
           formDataToSend.append('judul', formData.judul);
           formDataToSend.append('kategori', formData.kategori);
           formDataToSend.append('status', formData.status);
           formDataToSend.append('video', formData.video);
           formDataToSend.append('thumbnail', formData.thumbnail);

           await videoAPI.uploadVideo(formDataToSend);
           onUploadSuccess?.();
           onClose();
       } catch (error) {
           setError(error.response?.data?.error || 'Gagal mengupload video');
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
                       <h3 className="text-xl font-bold">Upload Video</h3>
                       <button onClick={onClose}>
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
                           <label className="block mb-2 font-medium">File Video</label>
                           <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                               <div className="space-y-2 text-center">
                                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                   <div className="text-sm text-gray-600">
                                       <label htmlFor="video-upload" className="relative cursor-pointer text-blue-500 hover:text-blue-600">
                                           <span>Upload Video</span>
                                           <input 
                                               id="video-upload" 
                                               name="video" 
                                               type="file" 
                                               className="sr-only"
                                               accept="video/*"
                                               onChange={handleChange}
                                               required
                                           />
                                       </label>
                                       <p>atau drag and drop</p>
                                   </div>
                                   <p className="text-xs text-gray-500">MP4 up to 1GB</p>
                               </div>
                           </div>
                       </div>

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
                                               required
                                           />
                                       </label>
                                       <p>atau drag and drop</p>
                                   </div>
                                   <p className='text-xs text-gray-500'>
                                       PNG, JPG up to 5MB
                                   </p>
                               </div>
                           </div>
                       </div>

                       <div>
                           <label className="block mb-2 font-medium">Judul</label>
                           <input 
                               type="text"
                               name="judul"
                               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                               value={formData.judul}
                               onChange={handleChange}
                               required
                           />
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block mb-2 font-medium">Kategori</label>
                               <select 
                                   name="kategori"
                                   className="w-full p-2 border rounded"
                                   value={formData.kategori}
                                   onChange={handleChange}
                               >
                                   <option value="Edukasi">Edukasi</option>
                                   <option value="Hiburan">Hiburan</option>
                               </select>
                           </div>

                           <div>
                               <label className="block mb-2 font-medium">Status</label>
                               <select 
                                   name="status"
                                   className="w-full p-2 border rounded"
                                   value={formData.status}
                                   onChange={handleChange}
                               >
                                   <option value="Free">Free</option>
                                   <option value="Premium">Premium</option>
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

export default UploadVideoModal;