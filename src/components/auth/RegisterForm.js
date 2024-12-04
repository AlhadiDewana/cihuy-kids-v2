import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import { userAPI } from '../../api';
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
   const [inputErrors, setInputErrors] = useState({
       name: '',
       email: '',
       password: '',
       confirmPassword: ''
   });

   const validateEmail = (email) => {
       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return re.test(email);
   };
   
   const validatePassword = (password) => {
       return password.length >= 8;
   };

   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData(prev => ({
           ...prev,
           [name]: value
       }));
   
       setInputErrors(prev => ({
           ...prev,
           [name]: ''
       }));
   
       switch (name) {
           case 'email':
               if (value && !validateEmail(value)) {
                   setInputErrors(prev => ({
                       ...prev,
                       email: 'Format email tidak valid'
                   }));
               }
               break;
           case 'password':
               if (value && !validatePassword(value)) {
                   setInputErrors(prev => ({
                       ...prev,
                       password: 'Password minimal 8 karakter'
                   }));
               }
               break;
           case 'confirmPassword':
               if (value && value !== formData.password) {
                   setInputErrors(prev => ({
                       ...prev,
                       confirmPassword: 'Password tidak cocok'
                   }));
               }
               break;
           default:
               break;
       }
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       setError('');
   
       if (!formData.name.trim()) {
           setError('Nama tidak boleh kosong');
           return;
       }
   
       if (!validateEmail(formData.email)) {
           setError('Format email tidak valid');
           return;
       }
   
       if (!validatePassword(formData.password)) {
           setError('Password minimal 8 karakter');
           return;
       }
   
       if (formData.password !== formData.confirmPassword) {
           setError('Password tidak cocok');
           return;
       }
   
       setLoading(true);
       try {
           const response = await userAPI.register({
               name: formData.name,
               email: formData.email,
               password: formData.password
           });
   
           alert('Registrasi berhasil! Silakan login.');
           onClose && onClose();
           navigate('/login');
           
       } catch (error) {
           if (error.response) {
               setError(error.response.data.error || 'Registrasi gagal, coba lagi');
           } else if (error.request) {
               setError('Tidak dapat terhubung ke server');
           } else {
               setError('Terjadi kesalahan, silakan coba lagi');
           }
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
                       src={registerImage} 
                       alt="Mother and daughter" 
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
                           <label className="block text-sm sm:text-base text-gray-700 mb-1">Nama</label>
                           <input
                               type="text"
                               name="name"
                               value={formData.name}
                               onChange={handleChange}
                               placeholder="Masukkan nama lengkap anda"
                               className={`w-full p-2 sm:p-3 rounded-lg bg-gray-50 border 
                                   ${inputErrors.name ? 'border-red-500' : 'border-gray-200'} 
                                   focus:outline-none focus:border-blue-500`}
                               required
                           />
                           {inputErrors.name && (
                               <p className="mt-1 text-xs text-red-500">{inputErrors.name}</p>
                           )}
                       </div>

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
                           {inputErrors.email && (
                               <p className="mt-1 text-xs text-red-500">{inputErrors.email}</p>
                           )}
                       </div>

                       <div>
                           <label className="block text-sm sm:text-base text-gray-700 mb-1">Buat kata sandi</label>
                           <div className="relative">
                               <input
                                   type={showPassword ? "text" : "password"}
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   placeholder="Masukkan kata sandi"
                                   className="w-full p-2 sm:p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
                                   required
                               />
                               {inputErrors.password && (
                                   <p className="mt-1 text-xs text-red-500">{inputErrors.password}</p>
                               )}
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
                           <label className="block text-sm sm:text-base text-gray-700 mb-1">Konfirmasi kata sandi</label>
                           <div className="relative">
                               <input
                                   type={showConfirmPassword ? "text" : "password"}
                                   name="confirmPassword"
                                   value={formData.confirmPassword}
                                   onChange={handleChange}
                                   placeholder="Konfirmasi kata sandi anda"
                                   className="w-full p-2 sm:p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
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
                           {loading ? 'Loading...' : 'Daftar'}
                       </button>

                       <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border bg-black text-white py-2 sm:py-3 rounded-lg hover:bg-gray-900 transition-colors"
                        >
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
                                alt="Google"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                            <span>Daftar dengan google</span>
                        </button>

                       <p className="text-center text-gray-600 text-xs sm:text-sm">
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