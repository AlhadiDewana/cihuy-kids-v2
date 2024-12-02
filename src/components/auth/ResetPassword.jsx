import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import { userAPI } from '../../api';
import resetImage from '../../assets/login/reset-1.png';

const ResetPasswordForm = ({ isOpen, onClose }) => {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [formData, setFormData] = useState({
       email: '',
       password: '',
       confirmPassword: '',
       resetToken: ''
   });
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password

   const handleChange = (e) => {
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       });
   };

   const handleSubmitEmail = async (e) => {
       e.preventDefault();
       setLoading(true);
       try {
           await userAPI.forgotPassword({ email: formData.email });
           setStep(2);
       } catch (error) {
           setError(error.response?.data?.error || 'Gagal mengirim kode reset');
       } finally {
           setLoading(false);
       }
   };

   const handleSubmitReset = async (e) => {
       e.preventDefault();
       if (formData.password !== formData.confirmPassword) {
           setError('Kata sandi baru tidak cocok');
           return;
       }

       setLoading(true);
       try {
           await userAPI.resetPassword({
               email: formData.email,
               token: formData.resetToken,
               newPassword: formData.password
           });
           alert('Password berhasil direset!');
           onClose();
           navigate('/login');
       } catch (error) {
           setError(error.response?.data?.error || 'Reset kata sandi gagal');
       } finally {
           setLoading(false);
       }
   };

   if (!isOpen) return null;

   return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 sm:p-8">
   <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1.2fr,1fr] bg-white rounded-2xl overflow-hidden">
               <div className="relative h-full">
                   <img 
                       src={resetImage} 
                       alt="Reset Password" 
                       className="w-full h-40 sm:h-full object-cover"
                   />
               </div>

               <div className="bg-white p-8 relative">
                   <button 
                       onClick={onClose}
                       className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#6095FF] rounded-full hover:opacity-90 z-10"
                   >
                       <X className="w-5 h-5 text-white" />
                   </button>

                   <div className="mb-8">
                       <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                           {step === 1 ? 'Masukkan email yang terkait dengan akun anda' :
                            step === 2 ? 'Masukkan kode verifikasi' :
                            'Buat kata sandi baru'}
                       </h2>
                   </div>

                   {error && (
                       <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                           {error}
                       </div>
                   )}

                   {step === 1 && (
                       <form onSubmit={handleSubmitEmail} className="space-y-4">
                           <div>
                               <label className="block text-sm sm:text-base text-gray-700 mb-1">Email</label>
                               <input
                                   type="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   placeholder="Masukkan email anda"
                                   className="w-full p-2 sm:p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
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
                       </form>
                   )}

                   {step === 2 && (
                       <form className="space-y-4">
                           <div>
                               <label className="block text-gray-700 mb-1">Kode Verifikasi</label>
                               <input
                                   type="text"
                                   name="resetToken"
                                   value={formData.resetToken}
                                   onChange={handleChange}
                                   placeholder="Masukkan kode"
                                   className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
                                   required
                               />
                           </div>

                           <button
                               onClick={() => setStep(3)}
                               className="w-full bg-[#6095FF] hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                           >
                               Verifikasi Kode
                           </button>
                       </form>
                   )}

                   {step === 3 && (
                       <form onSubmit={handleSubmitReset} className="space-y-4">
                           <div>
                               <label className="block text-gray-700 mb-1">Kata Sandi Baru</label>
                               <div className="relative">
                                   <input
                                       type={showPassword ? "text" : "password"}
                                       name="password"
                                       value={formData.password}
                                       onChange={handleChange}
                                       placeholder="Masukkan kata sandi baru"
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
                               <label className="block text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                               <div className="relative">
                                   <input
                                       type={showConfirmPassword ? "text" : "password"}
                                       name="confirmPassword"
                                       value={formData.confirmPassword}
                                       onChange={handleChange}
                                       placeholder="Konfirmasi kata sandi baru"
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
                               className="w-full bg-[#6095FF] hover:bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors"
                           >
                               {loading ? 'Loading...' : 'Reset Kata Sandi'}
                           </button>
                       </form>
                   )}

                   <p className="text-center text-gray-600 text-sm mt-4">
                       Ingat kata sandi?{' '}
                       <Link to="/login" className="text-blue-500 hover:underline">
                           Masuk sekarang
                       </Link>
                   </p>
               </div>
           </div>
       </div>
   );
};

export default ResetPasswordForm;