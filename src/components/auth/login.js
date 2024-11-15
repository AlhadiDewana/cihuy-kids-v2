import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import loginImage from '../../assets/login/login.png';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPassword'

const LoginForm = ({ onClose }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:9000/api/login', {
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            if (onClose) {
                onClose();
            }
            navigate('/content');
        } catch (error) {
            setError(error.response?.data?.error || 'Login gagal. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

      const handleRegisterClick = (e) => {
        e.preventDefault();
        setShowRegister(true);
    };

    const handleResetPasswordClick = (e) => {
        e.preventDefault();
        setShowResetPassword(true);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="relative w-full max-w-4xl grid grid-cols-[1fr,1fr] bg-white rounded-2xl overflow-hidden">
                {/* Left side - Image */}
            <div className="relative h-full">
                <img 
                    src={loginImage} 
                    alt="Father and son" 
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
                    <h2 className="text-2xl font-bold text-gray-800">
                        Senang bertemu denganmu lagi
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Masukkan email anda"
                            className="w-full p-3 rounded-lg bg-gray-100 border-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Kata sandi</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Masukkan kata sandi anda"
                                className="w-full p-3 rounded-lg bg-gray-100 border-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
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

                    <div className="text-right">
                    <button
                         onClick={handleResetPasswordClick}
                          className="text-blue-500 hover:underline">
                            Lupa kata sandi?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                        {loading ? 'Loading...' : 'Masuk'}
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Masuk dengan google
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                        Belum punya akun?{' '}
                        <button
                         onClick={handleRegisterClick}
                          className="text-blue-500 hover:underline">
                            Daftar sekarang
                        </button>
                    </p>
                </form>
            </div>
                        <RegisterForm 
                            isOpen={showRegister} 
                            onClose={() => setShowRegister(false)} 
                        />
                        <ResetPasswordForm 
                            isOpen={showResetPassword}
                            onClose={() => setShowResetPassword(false)}
                        />
            </div>
        </div>
    );
};

export default LoginForm;