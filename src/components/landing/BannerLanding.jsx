import React, { useState, useEffect } from 'react';
import Preview1 from '../../assets/preview/Image-1.png';
import Preview2 from '../../assets/preview/Image-2.png';
import Preview3 from '../../assets/preview/Image-3.png';
import Preview4 from '../../assets/preview/Image-4.png';
import Preview5 from '../../assets/preview/Image-5.png';
import Preview6 from '../../assets/preview/Image-6.png';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const images = [
    { url: Preview1, title: "Preview 1" },
    { url: Preview2, title: "Preview 2" },
    { url: Preview3, title: "Preview 3" },
    { url: Preview4, title: "Preview 4" },
    { url: Preview5, title: "Preview 5" },
    { url: Preview6, title: "Preview 6" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered && !isAnimating) {
        slideNext();
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [isHovered, isAnimating]);

  const slideNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);  // Match this with animation duration
  };

  const getVisibleImages = () => {
    const result = [];
    for (let i = -1; i < 4; i++) {  // Show 4 images to handle transition
      let index = currentIndex + i;
      
      // Handle wrapping around the array
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = index % images.length;
      
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
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="relative w-[900px] overflow-hidden">
          <div 
            className={`flex gap-4 transform transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(${-280 * (isAnimating ? 1 : 0)}px)`,
              width: `${getVisibleImages().length * 280 + (getVisibleImages().length - 1) * 16}px` // 16px is gap-4
            }}
          >
            {getVisibleImages().map((image, index) => (
              <div
                key={`${index}-${image.title}`}
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

      {/* Optional: Add navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${currentIndex === index ? 'w-4 bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;