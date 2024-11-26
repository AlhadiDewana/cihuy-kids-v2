import React from 'react';
import Ibu from '../../assets/isi-web/Lanjut_Orang Tua.gif'
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
    <div className="min-h-screen bg-[#FCC729] flex flex-col items-center justify-center p-4">
      {/* Image Container */}
      <div className="mb-8">
        <img
          src={Ibu}
          alt="Parent and child playing"
          className="max-w-lg mx-auto"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
          }}
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-12 text-center">
        Minta orang tua untuk menyiapkan Cihuy Kids
      </h1>

      {/* Buttons Container */}
      <div className="flex flex-col md:flex-row gap-24 mb-12">
        <button
          onClick={() => handleRoleSelect('child')}
          className="px-8 py-3 bg-white text-blue-500 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
        >
          Saya Seorang Anak
        </button>

        <button
          onClick={() => handleRoleSelect('parent')}
          className="px-8 py-3 bg-white text-blue-500 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
        >
          Saya Seorang Orang Tua
        </button>
      </div>

      {/* Learn More Link */}
      <button
        onClick={handleLearnMore}
        className="text-blue-500 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
      >
        Pelajari Lebih Lanjut
      </button>
    </div>
  );
};

export default RoleSelectionPage;