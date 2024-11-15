import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import axios from 'axios';
import registerImage from '../../assets/login/register.png';

const RegisterForm = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
            setError('Password tidak cocok');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:9000/api/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            if (onClose) {
                onClose();
            }
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.error || 'Registrasi gagal');
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
                        src={registerImage} 
                        alt="Mother and daughter" 
                        className="w-full h-full object-cover"
                        style={{ maxHeight: '700px' }}
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
                            Selamat bergabung dengan kami
                        </h2>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Nama</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama lengkap anda"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

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

                        <div>
                            <label className="block text-gray-700 mb-1">Buat kata sandi</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Masukkan kata sandi"
                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Konfirmasi kata sandi</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Konfirmasi kata sandi anda"
                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#6095FF] hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            {loading ? 'Loading...' : 'Daftar'}
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition-colors"
                        >
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span>Daftar dengan google</span>
                        </button>

                        <p className="text-center text-gray-600 text-sm">
                            Sudah punya akun?{' '}
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

export default RegisterForm;