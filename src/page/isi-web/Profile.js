import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, ArrowLeft, Edit, Key } from 'lucide-react';
import Navbar from '../../components/Header/Navbar';
import { userAPI } from '../../api';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleBack = () => {
        navigate(-1); // Ini akan kembali ke halaman sebelumnya di history
      };
      

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await userAPI.getProfile();
                console.log('Profile response:', response.data); // untuk debugging
                setUserData(response.data.user);
                // Update localStorage dengan data terbaru
                localStorage.setItem('user', JSON.stringify(response.data.user));
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Gagal memuat data profil');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-400 flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-6">
                <button 
    onClick={handleBack}  // Ganti dengan handleBack
    className="flex items-center text-white hover:text-gray-200"
>
    <ArrowLeft className="w-5 h-5 mr-2" />
    Kembali
</button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

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

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                            <User className="w-6 h-6 text-blue-500 mt-1" />
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Nama Lengkap
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {userData?.name || 'Belum diisi'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                            <Mail className="w-6 h-6 text-blue-500 mt-1" />
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Email
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {userData?.email || 'Belum diisi'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                            <Phone className="w-6 h-6 text-blue-500 mt-1" />
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Nomor Telepon
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {userData?.phone_number || 'Belum diisi'}
                                </p>
                            </div>
                        </div>
                    </div>

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

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Bergabung sejak {formatDate(userData?.createdAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;