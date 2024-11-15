import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import axios from 'axios';
import resetImage from '../../assets/login/reset-1.png';

const ResetPasswordForm = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Kata sandi baru tidak cocok');
            return;
        }

        setLoading(true);
        try {
            // Implementasi API reset password
            const response = await axios.post('http://localhost:9000/api/reset-password', {
                password: formData.password
            });
            if (onClose) {
                onClose();
            }
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.error || 'Reset kata sandi gagal');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="relative w-full max-w-4xl grid grid-cols-[1.2fr,1fr] bg-white rounded-2xl overflow-hidden">
                {/* Left side - Image */}
                <div className="relative h-full">
                    <img 
                        src={resetImage} 
                        alt="Reset Password" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right side - Form */}
                <div className="bg-white p-8 relative">
                    {/* Close button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#6095FF] rounded-full hover:opacity-90 z-10"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800">
                            Masukkan email yang terkait dengan akun anda
                        </h2>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Masukkan email anda"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#6095FF] hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            {loading ? 'Loading...' : 'Kirim Kode'}
                        </button>

                        <p className="text-center text-gray-600 text-sm">
                            Ingat kata sandi?{' '}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Masuk sekarang
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;