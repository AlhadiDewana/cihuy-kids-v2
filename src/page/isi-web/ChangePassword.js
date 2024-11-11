import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Password baru tidak cocok');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.put('http://localhost:9000/api/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            navigate('/profile');
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Ganti Password</h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password Saat Ini
                            </label>
                            <input
                                type="password"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password Baru
                            </label>
                            <input
                                type="password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Konfirmasi Password Baru
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                                required
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

export default ChangePassword;