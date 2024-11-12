import React from 'react';
import { X } from 'lucide-react';
import instructionleft from '../assets/isi-web/game/ins-kiri.png'
import instructionright from '../assets/isi-web/game/ins-kanan.png'

const GameInstructions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#FCC729] rounded-full hover:opacity-90"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left instruction */}
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full flex items-center justify-center mb-6">
                <img 
                src={instructionleft} 
                alt="Character at desk" 
                className="w-40 h-40 object-contain" />
              </div>
              <p className="text-blue-500 text-lg font-medium">
                Tekan spasi untuk bergerak
              </p>
            </div>

            {/* Right instruction */}
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full flex items-center justify-center mb-6">
                <img 
                src={instructionright}
                alt="Character falling" 
                className="w-40 h-40 object-contain" />
              </div>
              <p className="text-[#FE4C64] text-lg font-medium">
                Tekan spasi untuk memulai ulang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInstructions;