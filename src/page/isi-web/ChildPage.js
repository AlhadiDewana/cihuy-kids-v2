import React from 'react';
import { useNavigate } from 'react-router-dom';
import Child from '../../assets/isi-web/Lanjut_Anak.gif'


const ChildPage = () => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/jelajahi'); // or wherever you want to navigate after OK
  };

  return (
    <div className="min-h-screen bg-[#FF4B6E] flex flex-col items-center justify-start">
      {/* Image */}
      <div className="mb-12">
        <img
          src={Child}
          alt="Child on swing"
          className="max-w-md mx-auto"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
          }}
        />
      </div>

      {/* Message */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 max-w-3xl">
        Mohon minta bantuan orang tua untuk menyiapkan Cihuy Kids
      </h1>

      {/* OK Button */}
      <button
        onClick={handleOkClick}
        className="px-12 py-3 bg-white text-[#FF4B6E] rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
      >
        Ok
      </button>
    </div>
  );
};

export default ChildPage;