import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../api';
import Navbar from '../Header/Navbar';

const EditProfile = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [formData, setFormData] = useState({
       name: JSON.parse(localStorage.getItem('user'))?.name || '',
       email: JSON.parse(localStorage.getItem('user'))?.email || '',
       phone_number: JSON.parse(localStorage.getItem('user'))?.phone_number || ''
   });

   const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
       setError('');

       try {
           const response = await userAPI.updateProfile(formData);
           localStorage.setItem('user', JSON.stringify(response.data.user));
           navigate('/profile');
       } catch (error) {
           setError(error.response?.data?.error || 'Gagal mengupdate profil');
       } finally {
           setLoading(false);
       }
   };

   return (
       <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
           <Navbar />
           <div className="container mx-auto px-4 py-8">
               <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
                   <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>

                   {error && (
                       <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">
                           {error}
                       </div>
                   )}

                   <form onSubmit={handleSubmit} className="space-y-6">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                               Nama Lengkap
                           </label>
                           <input
                               type="text"
                               value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                               className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                               required
                           />
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                               Email
                           </label>
                           <input
                               type="email"
                               value={formData.email}
                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                               className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                               required
                           />
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                               Nomor Telepon
                           </label>
                           <input
                               type="tel"
                               value={formData.phone_number}
                               onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                               className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                           />
                       </div>

                       <div className="flex space-x-4">
                           <button
                               type="button"
                               onClick={() => navigate('/profile')}
                               className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                           >
                               Batal
                           </button>
                           <button
                               type="submit"
                               disabled={loading}
                               className="flex-1 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                           >
                               {loading ? 'Menyimpan...' : 'Simpan'}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       </div>
   );
};

export default EditProfile;