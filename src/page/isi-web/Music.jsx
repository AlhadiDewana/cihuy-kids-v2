import React, { useState, useEffect } from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderCont from '../../components/Header/HeaderCont';
import Footer from '../../components/footer/Footer';
import balonkuImg from '../../assets/isi-web/balonku.png';
import AudioPlayer from '../../components/audio/AudioPlayer';
import { musicAPI } from '../../api';

const getThumbnailUrl = (url) => {
  if (!url) return null;

  try {
    const isGoogleDrive = url.includes('drive.google.com');
    const isYouTube = url.includes('youtu');

    if (isGoogleDrive) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : null;
    }

    if (isYouTube) {
      const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
      return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
    }

    return null;
  } catch (err) {
    console.error('Failed to parse thumbnail URL:', err);
    return null;
  }
};

const MusicPage = () => {
  const [musicList, setMusicList] = useState([]);
  const [musicById, setMusicById] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await musicAPI.getAllMusic();
        const musicId = await musicAPI.getMusicById(id);

        setMusicList(response.data.musics);
        setMusicById(musicId.data);
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };

    fetchMusic();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#6095FF]">
      <HeaderCont />

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Banner */}
        <div className="bg-[#FE4C64] rounded-3xl overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="p-6 md:p-12 text-white flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[#FCC729]">
                {musicById?.title || ''}
              </h1>
              <p className="text-sm mb-2">Artis Favorit dari kami</p>
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
            <div className="flex-1 h-[200px] sm:h-[300px] relative flex justify-center md:justify-end items-center p-6">
              <img
                src={getThumbnailUrl(musicById?.thumbnailUrl || '')}
                alt={musicById?.title || 'Music Thumbnail'}
                className="w-full sm:w-[50%] h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>

        {/* Related Music Section */}
        <div className="bg-[#FCC729] rounded-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-white text-lg sm:text-xl font-semibold mb-4">
            Musik lain yang banyak didengar orang
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {musicList.map((music) => (
              <div
                key={music.id}
                className="flex flex-col md:flex-row gap-4 items-center bg-[#FE4C64] p-4 rounded-xl hover:bg-[#ff5c7d] transition-colors cursor-pointer"
                onClick={() => {
                  setMusicById(music);
                  setShowPlayer(true);
                }}>
                <div className="relative w-full md:w-40 h-24 bg-black rounded-lg overflow-hidden">
                  <img
                    src={getThumbnailUrl(music.thumbnailUrl || '')}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">{music.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm">Genre: {music.genre}</p>
                  <p className="text-white/80 text-xs sm:text-sm">Untuk umur: {music.ageRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Audio Player */}
      <AudioPlayer
        show={showPlayer}
        title={musicById?.title || ''}
        artist={musicById?.artist || 'Artist Favorit'}
        thumbnail={musicById?.thumbnailUrl || balonkuImg}
        src={musicById?.url || ''}
        onClose={() => setShowPlayer(false)}
      />
    </div>
  );
};

export default MusicPage;
