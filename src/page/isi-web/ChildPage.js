import React from 'react';
import { useNavigate } from 'react-router-dom';
import Child from '../../assets/isi-web/Lanjut_Anak.gif';

const ChildPage = () => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/jelajahi'); // or wherever you want to navigate after OK
  };

  return (
    <div className="min-h-screen bg-[#FF4B6E] flex flex-col items-center justify-start p-4 sm:p-8">
      {/* Image */}
      <div className="mb-8 sm:mb-12">
        <img
          src={Child}
          alt="Child on swing"
          className="max-w-full sm:max-w-md mx-auto"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
          }}
        />
      </div>

      {/* Message */}
      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8 max-w-xl sm:max-w-3xl">
        Mohon minta bantuan orang tua untuk menyiapkan Cihuy Kids
      </h1>

      {/* OK Button */}
      <button
        onClick={handleOkClick}
        className="px-8 sm:px-12 py-3 bg-white text-[#FF4B6E] rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
      >
        Ok
      </button>
    </div>
  );
};

export default ChildPage;
