import React from 'react';
import { useNavigate } from 'react-router-dom';
import Parent from '../../assets/isi-web/parent.png'

const ParentPage = () => {
  const navigate = useNavigate();

  const handleAgeSelect = (age) => {
    navigate('/content', { state: { selectedAge: age } });
  };


  return (
    <div className="min-h-screen bg-[#4B7BFF] flex flex-col items-center justify-center p-4">
      {/* Image */}
      <div className="mb-12">
        <img
          src={Parent}
          alt="Parent and child"
          className="max-w-md mx-auto"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
          }}
        />
      </div>

      {/* Message */}
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-12 max-w-4xl">
        Sebelum membiarkan anak Anda menjelajahi dunia Cihuy Kids yang menyenangkan, 
        luangkan waktu beberapa detik untuk menentukan konten sesuai umur anak anda
      </h1>

      {/* Age Range Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {['4-5 Tahun', '6-7 Tahun', '8-9 Tahun', '10-12 Tahun'].map((age) => (
          <button
            key={age}
            onClick={() => handleAgeSelect(age)}
            className="px-8 py-3 bg-white text-[#FE4C64] rounded-full font-semibold 
                     hover:bg-opacity-90 transition-all duration-300
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {age}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParentPage;