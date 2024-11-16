import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = ({ title, artist, thumbnail, show }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF] shadow-lg"
        >
          <div className="flex items-center p-4 gap-4 max-w-7xl mx-auto">
            {/* Thumbnail */}
            <img 
              src={thumbnail} 
              alt={title}
              className="w-12 h-12 rounded-xl object-cover"
            />

            {/* Title & Artist */}
            <div className="w-48">
              <h4 className="font-medium text-[#6095FF] truncate">{title}</h4>
              <p className="text-sm text-[#6095FF] truncate">{artist}</p>
            </div>

            {/* Time, Play Button & Progress */}
            <div className="flex-1 flex items-center gap-3">
              {/* Current Time */}
              <span className="text-sm text-[#6095FF] w-12">{formatTime(currentTime)}</span>

              {/* Play/Pause Button */}
              <button 
                className="p-2 rounded-full transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-[#6095FF]" />
                ) : (
                  <Play className="w-6 h-6 text-[#6095FF]" />
                )}
              </button>

              {/* Progress Bar */}
              <div className="flex-1 h-2 bg-[#6095FF] rounded-full relative group cursor-pointer">
                <div 
                  className="absolute h-full bg-[#FCC729] rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Hover effect */}
                <div className="absolute h-full w-full rounded-full opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity" />
              </div>

              {/* Duration */}
              <span className="text-sm text-[#6095FF] w-12">{formatTime(duration)}</span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded-full">
              <Volume2 className="w-5 h-5 text-[#6095FF]" />
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-20 accent-[#FCC729]"
                style={{
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  background: `linear-gradient(to right, #6095FF 0%, #6095FF ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </div>

          {/* Progress line at the very top */}
          <div className="h-1 w-full bg-white/20">
            <div 
              className="h-full bg-[#FCC729] transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioPlayer;