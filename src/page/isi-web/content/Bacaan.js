import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../components/footer/Footer';
import HeaderCont from '../../../components/Header/HeaderCont';
import { readingAPI } from '../../../api';

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

const ReadingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [readingList, setReadingList] = useState([]);
  const [readingById, setReadingById] = useState(null);

  useEffect(() => {
    const fetchReading = async () => {
      try {
        const response = await readingAPI.getAllReading();
        const readingId = await readingAPI.getReadingById(id);

        setReadingList(response.data.readings || []);
        setReadingById(readingId.data);
        console.log(response.data.readings);
        console.log(readingId.data);
      } catch (error) {
        console.error('Error fetching reading:', error);
      }
    };

    fetchReading();
  }, [id]);

  const handleNavigation = (readingId) => {
    navigate(`/bacaan/${readingId}`);
  };

  return (
    <div className="min-h-screen bg-[#6095FF]">
      {/* Header/Navigation */}
      <HeaderCont />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-24">
        <div className="bg-[#FE4C64] rounded-2xl p-8 shadow-lg relative">
          {/* Chapter Title and Meta Info */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold mb-2 text-[#FCC729]">
              {readingById?.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 text-white">
              <span>{readingById?.createdAt}</span>
              <span>{readingById?.genre}</span>
            </div>
            <span className="text-white font-semibold">{readingById?.description}</span>
          </div>

          {/* Story Content */}
          <div className="prose max-w-none space-y-4 text-white">
            <div className="mb-8">
              <img
                src={getThumbnailUrl(readingById?.thumbnailUrl || '')}
                alt="Story Thumbnail"
                className="w-full max-h-[280px] mx-auto rounded-lg object-cover"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
                }}
              />
            </div>
            <div className="px-12">
              <p>{readingById?.content}</p>
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        <div className="bg-[#FCC729] rounded-lg p-6">
          <h2 className="text-white font-semibold mb-4">Bacaan Lainnya</h2>
          <div className="space-y-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {readingList.length > 0 ? (
              readingList.map((reading, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(reading.id)}
                  className="bg-[#FE4C64] rounded-lg p-4 text-white hover:bg-opacity-90 transition-colors cursor-pointer"
                >
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="relative w-full sm:w-40 h-24 bg-black rounded-lg overflow-hidden">
                      <img
                        src={getThumbnailUrl(reading.thumbnailUrl || '')}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{reading.title}</h3>
                      <p className="text-sm text-white/80">{reading.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/80">Tidak ada bacaan yang tersedia</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReadingPage;
