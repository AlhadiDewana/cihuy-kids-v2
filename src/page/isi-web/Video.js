import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer2 from '../../components/Footer2';
import Navbar from '../../components/Navbar';

const VideoPage = () => {

  return (
    <div className="min-h-screen bg-[#FCC729]">
      {/* Header/Navigation */}
      <Navbar/>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8 space-y-6">
        {/* Video Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                className="w-full aspect-video"
                poster="/api/placeholder/1200/675"
                controls
              >
                <source src="#" type="video/mp4" />
              </video>
            </div>
            <h1 className="text-white mt-4 text-lg">Belajar bersama upin</h1>
          </div>

          {/* Video Info */}
          <div className="bg-[#FE4C64] rounded-lg p-6 text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                </svg>
                <span>Tanggal Rilis</span>
                <span>8 Mei 2024</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>Ditonton</span>
                <span>7 Juta</span>
              </div>

              <div>
                <span className="block mb-2">Genre</span>
                <span className="bg-[#6095FF] text-white px-3 py-1 rounded-full text-sm">Hiburan</span>
              </div>

              <div>
                <span className="block mb-2">Pencipta</span>
                <div className="flex items-center gap-2 bg-[#6095FF] p-2 rounded-lg">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="Herdin" 
                    className="w-10 h-10 rounded-full"
                  />
                  <span>Herdin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#6095FF] rounded-lg p-6 text-white">
          <h2 className="font-semibold mb-2">Deskripsi</h2>
          <p>A fiery young man clashes with an unflinching forest officer in a south Indian village where spirituality, fate and folklore rule the lands.</p>
        </div>

        {/* Other Videos */}
        <div className="bg-[#6095FF] rounded-lg p-6">
          <h2 className="text-white font-semibold mb-4">Herdin Lainnya</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="bg-[#FE4C64] rounded-lg p-4 text-white hover:bg-opacity-90 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                    <img 
                      src="/api/placeholder/160/96" 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Chapter One : The Vanishing of Will Byers</h3>
                    <p className="text-sm text-white/80">On his way from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer2 />
    </div>
  );
};

export default VideoPage;