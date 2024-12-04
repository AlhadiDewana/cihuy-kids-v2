import React, { useState } from 'react';
import { Image } from 'lucide-react';

const VideoThumbnail = ({ src, alt, className = "w-24 h-16" }) => {
  const [hasError, setHasError] = useState(false);

  // Function to get thumbnail based on the URL
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
  

  const thumbnailUrl = getThumbnailUrl(src);

  if (!thumbnailUrl || hasError) {
    return (
      <div className={`${className} bg-gray-100 rounded flex items-center justify-center`}>
        <Image className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={thumbnailUrl}
      alt={alt}
      className={`${className} object-cover rounded`}
      onError={() => setHasError(true)}
    />
  );
};

export default VideoThumbnail;
