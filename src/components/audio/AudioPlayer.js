import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = ({ title, artist, thumbnail, show, src, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      // Atur source audio
      audioRef.current.src = src;

      // Set event listener untuk durasi
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      // Update waktu saat berjalan
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    }
  }, [src]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg"
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

        {/* Progress Bar */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm text-[#6095FF] w-12">{formatTime(currentTime)}</span>

          <button className="p-2 rounded-full" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-6 h-6 text-[#6095FF]" /> : <Play className="w-6 h-6 text-[#6095FF]" />}
          </button>

          <div className="flex-1 h-2 bg-[#6095FF] rounded-full relative">
            <div
              className="absolute h-full bg-[#FCC729] rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          <span className="text-sm text-[#6095FF] w-12">{formatTime(duration)}</span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-[#6095FF]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={changeVolume}
            className="accent-[#FCC729]"
          />
        </div>
      </div>
    </motion.div>
  );
};


export default AudioPlayer;
