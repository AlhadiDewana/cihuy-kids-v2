import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../components/content/Banner';
import ContentCard from '../../components/content/ContentCard.jsx';
import Footer from '../../components/footer/Footer.js'
import Navbar2 from '../../components/Header/Navbar2.jsx'
import banner1 from '../../assets/isi-web/kinderflix.png'
import banner2 from '../../assets/isi-web/balonku.png'
import banner3 from '../../assets/isi-web/puzzle.png'
import banner4 from '../../assets/isi-web/dongeng.png'
import { useNavigate } from 'react-router-dom';


const ContentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialAge = location.state?.selectedAge || '4-5 Tahun';
  
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const [activeTab, setActiveTab] = useState('Video');

  const getAvailableMenus = (age) => {
    const ageRange = age.split('-')[0];
    switch(ageRange) {
      case '4':
        return ['Video']; // Usia 4-5 tahun hanya bisa akses Video
      case '6':
        return ['Video', 'Musik']; // Usia 6-7 tahun bisa akses Video dan Musik
      case '8':
        return ['Video', 'Musik', 'Game']; // Usia 8-9 tahun bisa akses Video, Musik, dan Game
      case '10':
        return ['Video', 'Musik', 'Game', 'Bacaan']; // Usia 10-12 tahun bisa akses semua
      default:
        return ['Video'];
    }
  };

  const availableMenus = getAvailableMenus(selectedAge);

  // Update activeTab when age changes
  const handleAgeChange = (newAge) => {
    setSelectedAge(newAge);
    // Set activeTab to first available menu for new age
    const newAvailableMenus = getAvailableMenus(newAge);
    if (!newAvailableMenus.includes(activeTab)) {
      setActiveTab(newAvailableMenus[0]);
    }
  };

  // Data konten untuk setiap kategori
  const videoContent = [
    { id: 1, title: 'Kinderflix #1', thumbnail: '/api/placeholder/300/200', views: '1.2K views' },
    { id: 2, title: 'Baby Shark Adventure', thumbnail: '/api/placeholder/300/200', views: '2.3K views' },
    { id: 3, title: 'Fun Learning', thumbnail: '/api/placeholder/300/200', views: '1.5K views' },
    { id: 4, title: 'Kids Stories', thumbnail: '/api/placeholder/300/200', views: '1.8K views' },
    
    // Add more video items
  ];

  const musicContent = [
    { id: 1, title: 'Naik Kereta Api', thumbnail: '/api/placeholder/300/200', category: 'Lagu Anak' },
    { id: 2, title: 'Ayam PiyiK', thumbnail: '/api/placeholder/300/200', category: 'Lagu Anak' },
    { id: 3, title: 'Indonesia Raya', thumbnail: '/api/placeholder/300/200', category: 'Nasional' },
    // Add more music items
  ];

  const gameContent = [
    { id: 1, title: 'Adventure Quest', thumbnail: '/api/placeholder/300/200', level: 'Easy' },
    { id: 2, title: 'Math Challenge', thumbnail: '/api/placeholder/300/200', level: 'Medium' },
    { id: 3, title: 'Memory Game', thumbnail: '/api/placeholder/300/200', level: 'Easy' },
    // Add more game items
  ];

  const readingContent = [
    { id: 1, title: 'Kancil yang Cerdik', thumbnail: '/api/placeholder/300/200', type: 'Cerita Rakyat' },
    { id: 2, title: 'Si Monyet dan Kura-kura', thumbnail: '/api/placeholder/300/200', type: 'Fabel' },
    { id: 3, title: 'Petualangan di Hutan', thumbnail: '/api/placeholder/300/200', type: 'Cerita Anak' },
    // Add more reading items
  ];

    const featuredContent = [
      {
        tag: "#VIDEOPALINGDISUKAI",
        title: "Kinderflix",
        description: "Belajar huruf, angka, warna, suara binatang, dan banyak lagi",
        image: banner1,
        buttonText: "Tonton"
      },
      {
        tag: "#MUSIKPALINGDISUKAI",
        title: "Balonku",
        description: "Menceritakan tentang balon yang berwarna-warni dan melambangkan kebahagiaan.",
        image: banner2,
        buttonText: "Dengar"
      },
      {
        tag: "#GAMEPALINGDISUKAI",
        title: "Puzzle",
        description: "Memecahkan masalah atau menyusun sesuatu dengan cara tertentu.",
        image: banner3,
        buttonText: "Mainkan"
      },
      {
        tag: "#BACAANPALINGDISUKAI",
        title: "Cerita Cerdik Si Kancil dan Buaya",
        description: "Dalam cerita ini, Kancil, seekor hewan kecil yang cerdik, berhadapan dengan Buaya, yang terkenal ganas dan rakus.",
        image: banner4,
        buttonText: "Baca"
      }
    ];
  
  // Tambahkan ini setelah deklarasi data konten dan sebelum return statement
  const ContentCard = ({ item, type }) => {
    const navigate = useNavigate();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const bgColor = type === 'video' || type === 'game' ? 'bg-[#FCC729]' : 'bg-[#FE4C64]';
  
    const handleClick = () => {
      // Perbaiki kondisi pengecekan type disini
      switch(type) {
        case 'video':
          navigate('/video');
          break;
        case 'musik': // Sebelumnya 'music', sekarang 'musik' sesuai dengan type yang dikirim
          navigate(`/music/${item.id}`, { state: { readingData: item } });
          break;
        case 'game':
          navigate(`/game/${item.id}`, { state: { readingData: item } });
          break;
        case 'bacaan':
          navigate(`/bacaan/${item.id}`, { state: { readingData: item } });
          break;
        default:
          console.log('Unknown content type');
      }
    };
  
    return (
      <div 
        onClick={handleClick}
        className={`${bgColor} rounded-xl overflow-hidden transform transition-all duration-300 
                    hover:scale-105 hover:shadow-xl cursor-pointer`}
      >
        <div className="relative">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          
          <img 
            src={item.thumbnail}
            alt={item.title}
            className={`w-full aspect-video object-cover transition-opacity duration-300
                      ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity"></div>
          
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                           bg-white text-[#FF4B6E] px-4 py-2 rounded-full opacity-0 hover:opacity-100
                           transition-all duration-300">
            {type === 'video' ? 'Tonton' : 
             type === 'musik' ? 'Dengar' : 
             type === 'game' ? 'Main' : 'Baca'}
          </button>
        </div>
  
        <div className="p-4">
          <h3 className="font-semibold text-white text-lg hover:text-white/90 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-white/80 mt-1">
            {type === 'video' && item.views}
            {type === 'musik' && item.category}
            {type === 'game' && `Level: ${item.level}`}
            {type === 'bacaan' && item.type}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#6095FF]">
      {/* Header/Navigation */}
      <Navbar2 
                selectedAge={selectedAge}
                handleAgeChange={handleAgeChange}
            />

      <Banner featuredContent={featuredContent} />

      {/* Content Tabs */}
      <div className="px-8">
        {/* Tab buttons */}
        <div className="flex gap-8 mb-6">
          {availableMenus.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xl font-semibold ${
                activeTab === tab ? 'text-white' : 'text-white/60'
              } relative group`}
            >
              {tab}
              {!availableMenus.includes(tab) && (
                <div className="absolute hidden group-hover:block bg-white text-black text-sm p-2 rounded shadow-lg whitespace-nowrap">
                  Menu ini tersedia untuk usia yang lebih tinggi
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Content grid using the new ContentCard component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTab === 'Video' && videoContent.map((video) => (
            <ContentCard key={video.id} item={video} type="video" />
          ))}
          {activeTab === 'Musik' && musicContent.map((music) => (
            <ContentCard key={music.id} item={music} type="musik" />
          ))}
          {activeTab === 'Game' && gameContent.map((game) => (
            <ContentCard key={game.id} item={game} type="game" />
          ))}
          {activeTab === 'Bacaan' && readingContent.map((reading) => (
            <ContentCard key={reading.id} item={reading} type="bacaan" />
          ))}
        </div>
      </div>

      {/* Message for locked content */}
      {selectedAge === '4-5 Tahun' && (
        <div className="px-8 mt-4">
          <p className="text-white/80 text-sm">
            * Konten Musik, Game, dan Bacaan tersedia untuk usia yang lebih tinggi
          </p>
        </div>
      )}
      {selectedAge === '6-7 Tahun' && (
        <div className="px-8 mt-4">
          <p className="text-white/80 text-sm">
            * Konten Game dan Bacaan tersedia untuk usia yang lebih tinggi
          </p>
        </div>
      )}
      {selectedAge === '8-9 Tahun' && (
        <div className="px-8 mt-4">
          <p className="text-white/80 text-sm">
            * Konten Bacaan tersedia untuk usia 10+ tahun
          </p>
        </div>
      )}
      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ContentPage;