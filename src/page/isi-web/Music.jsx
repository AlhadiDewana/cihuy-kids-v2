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
      // Extract Google Drive file ID
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : null;
    }

    if (isYouTube) {
      // Extract YouTube video ID
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

  // Fetch music data
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await musicAPI.getAllMusic();
        const musicId = await musicAPI.getMusicById(id);

        setMusicList(response.data.musics);
        setMusicById(musicId.data); // Set langsung tanpa konversi
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };

    fetchMusic();
  }, [id]);

  const thumbnailUrl = getThumbnailUrl(musicList.thumbnailUrl || '');
  console.log(musicList.thumbnailUrl);



  return (
    <div className="min-h-screen bg-[#6095FF]">
      <HeaderCont />

      <div className="px-8">
        {/* Main Banner */}
        <div className="bg-[#FE4C64] mx-8 rounded-3xl overflow-hidden mb-8">
          <div className="flex justify-between items-center">
            {/* Left side content */}
            <div className="p-20 text-white">
              <h1 className="text-4xl font-bold mb-2 text-[#FCC729]">
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
            <div className="flex-1 h-[300px] relative flex justify-end items-center pr-8">
              <img
                src={getThumbnailUrl(musicById?.thumbnailUrl || '')}
                alt={musicById?.title || 'Music Thumbnail'}
                className="w-[50%] h-full object-cover rounded-3xl"
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
                  onClick={() => {
                    setMusicById(music);
                    setShowPlayer(true);
                  }}>
                  <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
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
        artist={musicById?.artist || 'Artist Favorit'}
        thumbnail={musicById?.thumbnailUrl || balonkuImg}
        src={musicById?.url || ''}
        onClose={() => setShowPlayer(false)}
      />
    </div>
  );
};

export default MusicPage;
