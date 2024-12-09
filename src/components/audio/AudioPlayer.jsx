import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, X } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = ({ title, artist, thumbnail, show, src, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const isSoundCloud = src.includes('soundcloud.com');

  useEffect(() => {
    if (!isSoundCloud && audioRef.current && src) {
      try {
        audioRef.current.src = src;

        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current.duration);
        };

        audioRef.current.ontimeupdate = () => {
          setCurrentTime(audioRef.current.currentTime);
        };

        console.log('Audio source set:', audioRef.current.src);
      } catch (error) {
        console.error('Failed to set audio source:', error);
        setError('Unable to load audio. Please check the source URL.');
      }
    }
  }, [src, isSoundCloud]);

  const togglePlay = () => {
    if (!audioRef.current || isSoundCloud) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Playback started');
          })
          .catch((error) => {
            console.error('Playback error:', error);
            setError('Error playing audio. Please try again.');
          });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (!isSoundCloud && audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const changeCurrentTime = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (!isSoundCloud) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
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
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50"
    >
      <div className="flex items-center p-4 gap-4 max-w-7xl mx-auto relative">
        {/* Thumbnail */}
        

        {/* Title & Artist */}
        <div className="w-48 hidden sm:block">
          <h4 className="font-medium text-[#6095FF] truncate">{title}</h4>
          <p className="text-sm text-[#6095FF] truncate">{artist}</p>
        </div>

        {/* Audio Player */}
        {isSoundCloud ? (
          <div className="flex-1">
            <iframe
              title="SoundCloud Player"
              width="100%"
              height="80"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                src
              )}&color=%23FF5500&auto_play=false`}
              className="rounded-md"
            ></iframe>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-3">
            {/* Progress Bar */}
            <span className="text-sm text-[#6095FF] w-12 hidden sm:block">
              {formatTime(currentTime)}
            </span>
            <button className="p-2 rounded-full" onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="w-6 h-6 text-[#6095FF]" />
              ) : (
                <Play className="w-6 h-6 text-[#6095FF]" />
              )}
            </button>
            <div className="flex-1 h-2 bg-[#6095FF] rounded-full relative">
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={changeCurrentTime}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              <div
                className="absolute h-full bg-[#FCC729] rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-sm text-[#6095FF] w-12 hidden sm:block">
              {formatTime(duration)}
            </span>
          </div>
        )}

        {/* Volume (Hidden on smaller screens) */}
        <div className="flex items-center gap-3 hidden sm:flex">
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

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-[#6095FF]" />
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm p-2">{error}</div>}
    </motion.div>
  );
};

export default AudioPlayer;
