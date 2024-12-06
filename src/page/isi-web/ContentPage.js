import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../components/content/Banner';
import Footer from '../../components/footer/Footer.js'
import Navbar2 from '../../components/Header/Navbar2.jsx'
import banner1 from '../../assets/isi-web/kinderflix.png'
import banner2 from '../../assets/isi-web/balonku.png'
import banner3 from '../../assets/isi-web/flappy.png'
import banner4 from '../../assets/isi-web/dongeng.png'
import { useNavigate } from 'react-router-dom';
import { videoAPI, musicAPI, readingAPI } from '../../api';

const getGoogleDriveThumbnailUrl = (url) => {
  if (!url) return '/api/placeholder/300/200';
  
  if (url.includes('drive.google.com')) {
    let fileId;
    if (url.includes('/file/d/')) {
      fileId = url.match(/\/file\/d\/([^/]+)/)?.[1];
    } else if (url.includes('id=')) {
      fileId = url.match(/id=([^&]+)/)?.[1];
    } else {
      fileId = url.match(/\/d\/(.*?)\/view/)?.[1];
    }
    
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }
  
  if (url.includes('youtu.be') || url.includes('youtube.com')) {
    const videoId = url.split('/').pop().split('?')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  
  return url;
};

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8 mb-8">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 
            ? 'bg-gray-300 text-gray-500' 
            : 'bg-[#FE4C64] text-white hover:bg-[#FF3355]'
        }`}
      >
        Prev
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-3 py-1 rounded ${
            currentPage === number 
              ? 'bg-[#FE4C64] text-white' 
              : 'bg-white text-[#FE4C64] hover:bg-[#FE4C64] hover:text-white'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages 
            ? 'bg-gray-300 text-gray-500' 
            : 'bg-[#FE4C64] text-white hover:bg-[#FF3355]'
        }`}
      >
        Next
      </button>
    </div>
  );
};

const ContentCard = ({ item, type }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const bgColor = type === 'video' || type === 'game' ? 'bg-[#FCC729]' : 'bg-[#FE4C64]';
  const userPremium = localStorage.getItem('isPremium') === '1';

  const handleClick = () => {
    if (item.isPremium && !userPremium) {
      navigate('/penawaranpremium');
      return;
    }

    switch(type) {
      case 'video':
        navigate(`/video/${item.id}`);
        break;
      case 'musik':
        navigate(`/music/${item.id}`);
        break;
      case 'game':
        navigate(`/game/${item.id}`);
        break;
      case 'bacaan':
        navigate(`/bacaan/${item.id}`);
        break;
      default:
        console.log('Unknown content type');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`${bgColor} rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer relative`}
    >
      <div className="relative">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        <img 
          src={getGoogleDriveThumbnailUrl(item.thumbnailUrl)}
          alt={item.title}
          className={`w-full aspect-video object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/api/placeholder/300/200';
          }}
        />

        {item.isPremium && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
            Premium
          </div>
        )}
        
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity"></div>
        
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-[#FF4B6E] px-4 py-2 rounded-full opacity-0 hover:opacity-100 transition-all duration-300">
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
          {type === 'video' && `${item.views || '0'} views`}
          {type === 'musik' && item.artist}
          {type === 'game' && `Level: ${item.level}`}
          {type === 'bacaan' && item.category}
        </p>
      </div>
    </div>
  );
};

const ContentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  const initialAge = localStorage.getItem('lastSelectedAge') || '4-5 Tahun';
  const [videoContent, setVideoContent] = useState([]);
  const [musicContent, setMusicContent] = useState([]);
  const [readingContent, setReadingContent] = useState([]);
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const [activeTab, setActiveTab] = useState('Video');

  const gameContent = [
    { id: 1, title: 'Adventure Quest', thumbnail: '/api/placeholder/300/200', level: 'Easy' },
    { id: 2, title: 'Math Challenge', thumbnail: '/api/placeholder/300/200', level: 'Medium' },
    { id: 3, title: 'Memory Game', thumbnail: '/api/placeholder/300/200', level: 'Easy' },
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
      title: "Flappy Bird",
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

  const getAvailableMenus = (age) => {
    const ageRange = age.split('-')[0];
    switch(ageRange) {
      case '4': return ['Video'];
      case '6': return ['Video', 'Musik'];
      case '8': return ['Video', 'Musik', 'Game'];
      case '10': return ['Video', 'Musik', 'Game', 'Bacaan'];
      default: return ['Video'];
    }
  };

  const availableMenus = getAvailableMenus(selectedAge);

  const handleAgeChange = (newAge) => {
    setSelectedAge(newAge);
    const newAvailableMenus = getAvailableMenus(newAge);
    if (!newAvailableMenus.includes(activeTab)) {
      setActiveTab(newAvailableMenus[0]);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    const fetchVideos = async() => {
      try {
        const response = await videoAPI.getAllVideos();
        const filteredVideos = response.data.videos.filter(video => 
          video.ageRange === selectedAge.split(' ')[0]
        );
        setVideoContent(filteredVideos);
      } catch(error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, [selectedAge]);

  useEffect(() => {
    const fetchMusic = async() => {
      try {
        const response = await musicAPI.getAllMusic();
        const filteredMusic = response.data.musics.filter(music => 
          music.ageRange === selectedAge.split(' ')[0]
        );
        setMusicContent(filteredMusic);
      } catch(error) {
        console.error('Error fetching music:', error);
      }
    };
    fetchMusic();
  }, [selectedAge]);

  useEffect(() => {
    const fetchReading = async() => {
      try {
        const response = await readingAPI.getAllReading();
        const filteredReading = response.data.readings.filter(reading => 
          reading.ageRange === selectedAge.split(' ')[0]
        );
        setReadingContent(filteredReading);
      } catch(error) {
        console.error('Error fetching reading:', error);
      }
    };
    fetchReading();
  }, [selectedAge]);

  const getCurrentContent = (items) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  return (
    <div className="min-h-screen bg-[#6095FF]">
    <Navbar2 
      selectedAge={selectedAge}
      handleAgeChange={handleAgeChange}
    />
  
    <Banner featuredContent={featuredContent} />
  
    <div className="px-4 sm:px-8">
      <div className="flex flex-wrap gap-8 mb-6 justify-center md:justify-start">
        {availableMenus.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xl sm:text-2xl font-semibold ${
              activeTab === tab ? 'text-white' : 'text-white/60'
            } relative group`}
          >
            {tab}
          </button>
        ))}
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTab === 'Video' && getCurrentContent(videoContent).map((video) => (
          <ContentCard key={video.id} item={video} type="video" />
        ))}
        {activeTab === 'Musik' && getCurrentContent(musicContent).map((music) => (
          <ContentCard key={music.id} item={music} type="musik" />
        ))}
        {activeTab === 'Game' && getCurrentContent(gameContent).map((game) => (
          <ContentCard key={game.id} item={game} type="game" />
        ))}
        {activeTab === 'Bacaan' && getCurrentContent(readingContent).map((reading) => (
          <ContentCard key={reading.id} item={reading} type="bacaan" />
        ))}
      </div>
  
      <Pagination 
        totalItems={
          activeTab === 'Video' ? videoContent.length :
          activeTab === 'Musik' ? musicContent.length :
          activeTab === 'Game' ? gameContent.length :
          activeTab === 'Bacaan' ? readingContent.length :
          0
        }
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  
    {selectedAge === '4-5 Tahun' && (
      <div className="px-4 sm:px-8 mt-4">
        <p className="text-white/80 text-sm sm:text-base">
          * Konten Musik, Game, dan Bacaan tersedia untuk usia yang lebih tinggi
        </p>
      </div>
    )}
    {selectedAge === '6-7 Tahun' && (
      <div className="px-4 sm:px-8 mt-4">
        <p className="text-white/80 text-sm sm:text-base">
          * Konten Game dan Bacaan tersedia untuk usia yang lebih tinggi
        </p>
      </div>
    )}
    {selectedAge === '8-9 Tahun' && (
      <div className="px-4 sm:px-8 mt-4">
        <p className="text-white/80 text-sm sm:text-base">
          * Konten Bacaan tersedia untuk usia 10+ tahun
        </p>
      </div>
    )}
  
    <Footer />
  </div>
  
  );
};

export default ContentPage;