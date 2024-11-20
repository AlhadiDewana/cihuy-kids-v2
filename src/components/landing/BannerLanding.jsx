import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import Preview1 from '../../assets/preview/Image-1.png';
import Preview2 from '../../assets/preview/Image-2.png';
import Preview3 from '../../assets/preview/Image-3.png';
import Preview4 from '../../assets/preview/Image-4.png';
import Preview5 from '../../assets/preview/Image-5.png';
import Preview6 from '../../assets/preview/Image-6.png';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Define images internally instead of receiving as props
  const images = [
    { url: Preview1, title: "Preview 1" },
    { url: Preview2, title: "Preview 2" },
    { url: Preview3, title: "Preview 3" },
    { url: Preview4, title: "Preview 4" },
    { url: Preview5, title: "Preview 5" },
    { url: Preview6, title: "Preview 6" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [isHovered]);

  const visibleImages = () => {
    let result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % images.length;
      result.push(images[index]);
    }
    return result;
  };

  return (
    <div 
      className="relative w-full h-[300px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with slant */}
      <div className="absolute inset-0 transform -skew-x-12 origin-top-left scale-110"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="flex gap-4">
          {visibleImages().map((image, index) => (
            <div
              key={index}
              className={`relative flex-shrink-0 w-[280px] rounded-xl overflow-hidden 
                         transition-all duration-500
                         ${index === 1 ? 'scale-100 z-10' : 'scale-95 opacity-90'}`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-[200px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;