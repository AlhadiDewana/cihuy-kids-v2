import React from 'react';
import Ibu from '../../assets/isi-web/Lanjut_Orang Tua.gif';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'child') {
      navigate('/child');
    } else {
      navigate('/parent');
    }
  };

  const handleLearnMore = () => {
    navigate('/'); // Navigate back to landing page
  };

  return (
    <div className="min-h-screen bg-[#FCC729] flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Image Container */}
      <div className="mb-8">
        <img
          src={Ibu}
          alt="Parent and child playing"
          className="max-w-full sm:max-w-lg mx-auto"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
          }}
        />
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-4xl font-bold text-[#FE4C64] mb-8 sm:mb-12 text-center">
        Minta orang tua untuk menyiapkan Cihuy Kids
      </h1>

      {/* Buttons Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
        <button
          onClick={() => handleRoleSelect('child')}
          className="px-6 sm:px-8 py-3 bg-white text-[#FCC729] rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
        >
          Saya Seorang Anak
        </button>

        <button
          onClick={() => handleRoleSelect('parent')}
          className="px-6 sm:px-8 py-3 bg-white text-[#FCC729] rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
        >
          Saya Seorang Orang Tua
        </button>
      </div>

      {/* Learn More Link */}
      <button
        onClick={handleLearnMore}
        className="text-sm sm:text-base text-[#FE4C64] hover:text-blue-600 transition-colors duration-300 cursor-pointer"
      >
        Pelajari Lebih Lanjut
      </button>
    </div>
  );
};

export default RoleSelectionPage;
