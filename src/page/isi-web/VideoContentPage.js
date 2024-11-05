import React, { useState } from 'react';
import { Settings, Bell, User, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Footer from 'D:/zzzz/cihuy-kids/src/components/Footer.js'
import Kinderflix from 'D:/zzzz/cihuy-kids/src/assets/isi-web/kinderflix.png'

const ContentPage = () => {
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



  // Tambahkan ini setelah deklarasi data konten dan sebelum return statement
const ContentCard = ({ item, type }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const bgColor = type === 'video' || type === 'game' ? 'bg-[#FCC729]' : 'bg-[#FE4C64]';

  return (
    <div className={`${bgColor} rounded-xl overflow-hidden transform transition-all duration-300 
                    hover:scale-105 hover:shadow-xl cursor-pointer`}>
      <div className="relative">
        {/* Loading placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Image */}
        <img 
          src={item.thumbnail}
          alt={item.title}
          className={`w-full aspect-video object-cover transition-opacity duration-300
                    ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity"></div>
        
        {/* Action button */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         bg-white text-[#FF4B6E] px-4 py-2 rounded-full opacity-0 hover:opacity-100
                         transition-all duration-300">
          {type === 'video' || type === 'musik' ? 'Tonton' : type === 'game' ? 'Main' : 'Baca'}
        </button>
      </div>

      {/* Content info */}
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
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-white">CIHUY KIDS</h1>
          
          <select 
            value={selectedAge}
            onChange={(e) => handleAgeChange(e.target.value)}
            className="bg-transparent text-white border border-white rounded-full px-4 py-2"
          >
            <option value="4-5 Tahun">4-5 Tahun</option>
            <option value="6-7 Tahun">6-7 Tahun</option>
            <option value="8-9 Tahun">8-9 Tahun</option>
            <option value="10-12 Tahun">10-12 Tahun</option>
          </select>
        </div>

        <div className="flex items-center gap-6">
          <Settings className="w-6 h-6 text-white cursor-pointer" />
          <Bell className="w-6 h-6 text-white cursor-pointer" />
          <User className="w-6 h-6 text-white cursor-pointer" />
        </div>
      </nav>

      {/* Featured Content Banner */}
      <div className="bg-[#FE4C64] mx-8 rounded-3xl overflow-hidden mb-8">
        <div className="p-8 flex justify-between items-center">
          <div className="text-white">
            <p className="text-sm mb-2">#VIDEOPALINGDISUKAI</p>
            <h2 className="text-4xl font-bold mb-4">Kinderflix</h2>
            <p className="mb-6">Belajar huruf, angka, warna, suara binatang, dan banyak lagi</p>
            <button className="bg-white text-[#FF4B6E] px-6 py-2 rounded-full font-semibold">
              Tonton
            </button>
          </div>
          <div className="relative">
            <img 
              src={Kinderflix}
              alt="Featured content"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-8">
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
              {/* Show message if menu is locked */}
              {!availableMenus.includes(tab) && (
                <div className="absolute hidden group-hover:block bg-white text-black text-sm p-2 rounded shadow-lg whitespace-nowrap">
                  Menu ini tersedia untuk usia yang lebih tinggi
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {activeTab === 'Video' && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {videoContent.map((video) => (
        <ContentCard 
          key={video.id} 
          item={video} 
          type="video" 
        />
      ))}
    </div>
  )}

  {activeTab === 'Musik' && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {musicContent.map((music) => (
        <ContentCard 
          key={music.id} 
          item={music} 
          type="musik" 
        />
      ))}
    </div>
  )}

  {activeTab === 'Game' && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {gameContent.map((game) => (
        <ContentCard 
          key={game.id} 
          item={game} 
          type="game" 
        />
      ))}
    </div>
  )}

  {activeTab === 'Bacaan' && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {readingContent.map((reading) => (
        <ContentCard 
          key={reading.id} 
          item={reading} 
          type="bacaan" 
        />
      ))}
    </div>
  )}
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