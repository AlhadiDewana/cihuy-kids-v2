import React, { useState, useEffect } from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderCont from '../../components/Header/HeaderCont';
import Footer from '../../components/footer/Footer';
import balonkuImg from '../../assets/isi-web/balonku.png';
import AudioPlayer from '../../components/audio/AudioPlayer';
import { musicAPI } from '../../api'; 

const convertGoogleDriveURL = (url) => {
  const match = url.match(/\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
};



const MusicPage = () => {
  const [musicList, setMusicList] = useState([]);
  const[musicById, setMusicById] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await musicAPI.getAllMusic();
        const musicId = await musicAPI.getMusicById(id);
  
        setMusicList(response.data.musics);
  
        // Convert Google Drive URL
        const convertedUrl = convertGoogleDriveURL(musicId.data.url);
        setMusicById({ ...musicId.data, url: convertedUrl });
  
        console.log("Music List:", response.data.musics);
        console.log("Music by ID:", musicId.data);
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };
  
    fetchMusic();
  }, [id]);
  
console.log(musicById)
  return (
    <div className="min-h-screen bg-[#6095FF]">
      <HeaderCont />

      <div className="px-8">
        {/* Main Banner */}
        <div className="bg-[#FE4C64] mx-8 rounded-3xl overflow-hidden mb-8">
          <div className="flex justify-between items-center">
            {/* Left side content */}
            <div className="p-20 text-white">
              <h1 className="text-4xl font-bold mb-2 text-[#FCC729]">.</h1>
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
              {musicList.map((music) => (
                <div
                  key={music.id}
                  className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                  onClick={() => navigate(`/music/${music.id}`)}>
                  <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                    <img
                      src={music.thumbnailUrl}
                      alt={music.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{music.title}</h3>
                    <p className="text-white/80 text-sm">Genre: {music.genre}</p>
                    <p className="text-white/80 text-sm">
                      Untuk umur: {music.ageRange}
                    </p>
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
  title={musicById?.title || ''}
  artist="AT Mahmud dan Pak Kasur"
  thumbnail={musicById?.thumbnailUrl || ''}
  src={musicById?.url || ''}
  onClose={() => setShowPlayer(false)}
/>

    </div>
  );
};

export default MusicPage;
