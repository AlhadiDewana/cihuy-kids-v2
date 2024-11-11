
import React, {useState} from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeaderCont from '../../components/HeaderCont';
import Footer from '../../components/Footer';
import balonkuImg from '../../assets/isi-web/balonku.png';
import AudioPlayer from '../../components/AudioPlayer';

const MusicPage = () => {
    const [showPlayer, setShowPlayer] = useState(false);
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
    <div className="min-h-screen bg-[#6095FF] pb-24">
      <HeaderCont />

     <div className='px-8'>
         {/* Main Banner */}
      <div className="bg-[#FE4C64] mx-8 rounded-3xl overflow-hidden mb-8">
        <div className="flex justify-between items-center">
          {/* Left side content */}
          <div className="p-20 text-white">
            <h1 className="text-4xl font-bold mb-2 text-[#FCC729]">Balonku</h1>
            <p className="text-sm mb-2">AT Mahmud dan Pak Kasur</p>
            <p className="mb-4">5 Juta Kali Didengar</p>
            <div className="flex gap-4">
              <button
              onClick={() => setShowPlayer(true)}
              className="bg-white text-[#FE4C64] p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Play className="w-6 h-6" />
              </button>
              <button className="text-white p-3 hover:text-gray-200 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex-1 h-[300px] relative flex justify-end items-center pr-8">
            <img 
            src={balonkuImg}
            alt="Balonku"
            className="w-[80%] h-[350px] object-cover rounded-3xl"
            />
        </div>
        </div>
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

      {/* Audio Player */}
      <AudioPlayer 
        show={showPlayer}
        title="Balonku"
        artist="AT Mahmud dan Pak Kasur"
        thumbnail={balonkuImg}
      />
    </div>
  );
};

export default MusicPage;
