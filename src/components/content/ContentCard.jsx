// ContentCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentCard = ({ item, type }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Determine background color based on content type
  const bgColor = type === 'video' || type === 'game' ? 'bg-[#FCC729]' : 'bg-[#FE4C64]';

  // Handle navigation based on content type
  const handleClick = () => {
    switch(type) {
      case 'video':
        // Navigasi ke video detail dengan id video
        navigate(`/video/${item.id}`, { state: { videoData: item } });
        break;
      case 'musik':
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

  // Get appropriate button text based on content type
  const getActionText = () => {
    switch(type) {
      case 'video':
        return 'Tonton';
      case 'musik':
        return 'Dengar';
      case 'game':
        return 'Main';
      case 'bacaan':
        return 'Baca';
      default:
        return 'Lihat';
    }
  };

  // Get appropriate content metadata based on type
  const getMetadata = () => {
    switch(type) {
      case 'video':
        return item.views;
      case 'musik':
        return item.category;
      case 'game':
        return `Level: ${item.level}`;
      case 'bacaan':
        return item.type;
      default:
        return '';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`${bgColor} rounded-xl overflow-hidden transform transition-all duration-300 
                  hover:scale-105 hover:shadow-xl cursor-pointer`}
    >
      {/* Thumbnail Container */}
      <div className="relative">
        {/* Loading placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Thumbnail image */}
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
        <button 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     bg-white text-[#FF4B6E] px-4 py-2 rounded-full opacity-0 hover:opacity-100
                     transition-all duration-300 font-medium"
        >
          {getActionText()}
        </button>
      </div>

      {/* Content info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg hover:text-white/90 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-white/80 mt-1">
          {getMetadata()}
        </p>
      </div>
    </div>
  );
};

export default ContentCard;