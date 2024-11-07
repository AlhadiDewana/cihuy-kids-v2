import React from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const navigate = useNavigate();


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden relative">
        {/* Background sections */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/50"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-100/50"></div>
          <div className="absolute top-0 left-0 w-1/2 h-full bg-red-100/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative p-8">
          {/* Close button */}
          <button className="absolute right-6 top-6">
            <svg onClick={() => navigate('/video')}  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Login form */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">LOGIN</h1>
            <p className="text-gray-600 text-lg">
              Hei, masukkan detailmu untuk masuk ke akun Anda
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
            onClick={() => navigate('/video')}
              type="submit"
              className="w-full bg-[#4B7BF5] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;