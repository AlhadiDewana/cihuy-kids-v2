import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, ArrowLeft, Edit, Key } from 'lucide-react';
import Navbar from '../../components/Navbar'; // Sesuaikan dengan path Navbar Anda

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header dengan tombol back */}
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/video')} 
                        className="flex items-center text-white hover:text-gray-200"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kembali
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Profile Saya</h1>
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="flex items-center text-blue-500 hover:text-blue-600"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                            <User className="w-6 h-6 text-blue-500 mt-1" />
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Nama Lengkap
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {user?.name || 'Belum diisi'}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                            <Mail className="w-6 h-6 text-blue-500 mt-1" />
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Email
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {user?.email || 'Belum diisi'}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                            <Phone className="w-6 h-6 text-blue-500 mt-1" />
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Nomor Telepon
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {user?.phone || 'Belum diisi'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 space-y-4">
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center"
                        >
                            <Edit className="w-5 h-5 mr-2" />
                            Edit Profile
                        </button>

                        <button
                            onClick={() => navigate('/change-password')}
                            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                            <Key className="w-5 h-5 mr-2" />
                            Ganti Password
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Bergabung sejak {new Date(user?.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;