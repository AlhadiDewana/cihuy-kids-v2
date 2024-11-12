
import React, {useState} from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeaderCont from '../../components/HeaderCont';
import Footer from '../../components/Footer';
import game from '../../assets/isi-web/game/banner.png';
import GameInstructions from '../../components/HowToPlay';

const GamePage = () => {
    const [showInstructions, setShowInstructions] = React.useState(false);
    const navigate = useNavigate();

  const relatedMusic = [
    {
      id: 1,
      title: "Chapter One : The Vanishing of Will Byers",
      description: "On his way from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
      thumbnail: "/api/placeholder/160/96"
    },
    // ... tambahkan item lainnya
  ];

  return (
    <div className="min-h-screen bg-[#6095FF]">
      <HeaderCont />

     <div className='px-8'>
         {/* Main Banner */}
      <div className="bg-[#FE4C64] mx-8 rounded-3xl overflow-hidden mb-8">
        <div className="flex justify-between items-center">
          {/* Left side content */}
          <div className="p-20 text-white">
            <h1 className="text-4xl font-bold mb-2 text-[#FCC729]">Flappy Bird</h1>
            <p className="text-sm mb-2">5 Juta Kali Dimainkan</p>
            <div className="flex gap-4">
            <button 
              onClick={() => setShowInstructions(true)}
              className="bg-white text-[#FCC729] border-2 border-[#FCC729] px-6 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cara Bermainnya
            </button>

            <GameInstructions 
              isOpen={showInstructions} 
              onClose={() => setShowInstructions(false)} 
            />
              <button className="text-white p-3 hover:text-gray-200 transition-colors">
                <Heart className="w-6 h-6" fill="white" />
              </button>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex-1 h-[300px] relative flex justify-end items-center pr-8">
            <img 
            src={game}
            alt="Balonku"
            className="w-[80%] h-[100%] object-cover rounded-3xl"
            />
        </div>
        </div>
      </div>

     {/* Game Area */}
     <div className="bg-[#FE4C64] mx-8 rounded-3xl border-4 border-[#FCC729] aspect-[14/7] relative mb-12">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl text-white font-bold">
            0
          </div>
          {/* Pipes and bird components remain the same */}
        </div>
      
      {/* Related Music Section */}
      <div className="bg-[#FCC729] mx-8 mb-8 rounded-lg p-6">
        <h2 className="text-white text-xl font-semibold mb-4">
          Musik lain yang banyak didengar orang
        </h2>
        <div className="bg-[#FE4C64] rounded-3xl p-6">
          <div className="space-y-4">
            {relatedMusic.map((music) => (
              <div 
                key={music.id}
                className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate(`/musik/${music.id}`)}
              >
                <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                  <img 
                    src={music.thumbnail}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{music.title}</h3>
                  <p className="text-white/80 text-sm">{music.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {relatedMusic.map((music) => (
              <div 
                key={music.id}
                className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate(`/musik/${music.id}`)}
              >
                <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                  <img 
                    src={music.thumbnail}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{music.title}</h3>
                  <p className="text-white/80 text-sm">{music.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {relatedMusic.map((music) => (
              <div 
                key={music.id}
                className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate(`/musik/${music.id}`)}
              >
                <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                  <img 
                    src={music.thumbnail}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{music.title}</h3>
                  <p className="text-white/80 text-sm">{music.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {relatedMusic.map((music) => (
              <div 
                key={music.id}
                className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate(`/musik/${music.id}`)}
              >
                <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                  <img 
                    src={music.thumbnail}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{music.title}</h3>
                  <p className="text-white/80 text-sm">{music.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {relatedMusic.map((music) => (
              <div 
                key={music.id}
                className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate(`/musik/${music.id}`)}
              >
                <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                  <img 
                    src={music.thumbnail}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{music.title}</h3>
                  <p className="text-white/80 text-sm">{music.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {relatedMusic.map((music) => (
              <div 
                key={music.id}
                className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate(`/musik/${music.id}`)}
              >
                <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                  <img 
                    src={music.thumbnail}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{music.title}</h3>
                  <p className="text-white/80 text-sm">{music.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     </div>
     <Footer />
    </div>
  );
};

export default GamePage;
