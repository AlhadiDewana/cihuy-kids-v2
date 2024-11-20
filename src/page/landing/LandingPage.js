import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import HeroImage from '../../assets/cover.png';
import Premium from '../../components/Premium/Premium';
import Footer from '../../components/footer/Footer';
import '../landing/style/LandingPage.css';
import ImageCarousel from '../../components/landing/BannerLanding';



const LandingPage = () => {
  const [showPremium, setShowPremium] = React.useState(false);
  const handleNavClick = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <div className="body w-full min-h-screen bg-white">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 text-start">
              <h1 className="text-5xl font-bold mb-6">
                Selamat Datang di Cihuy Kids!
              </h1>
              <p className="text-lg mb-8 max-w-lg">
                Kami merupakan platform hiburan dan edukasi digital yang aman untuk anak-anak usia 4-12 tahun. Di sini, mereka dapat menonton video, mendengarkan musik, bermain game edukatif, dan membaca cerita yang telah difilter sesuai usia, untuk memberikan pengalaman yang sesuai dengan tahap perkembangan mereka
              </p>
            </div>
            <div className="md:w-100">
              <img 
                src={HeroImage} 
                alt="Family using tablet" 
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Content Section */}
      <section className="py-20 mt-14 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#FF4B6E] mb-12">
            Konten Premium
          </h2>
          <p className="text-center text-blue-500 mb-12">
            Dapatkan Akses Penuh ke Dunia Seru dan Edukatif di Cihuy Kids Premium
          </p>

          <div className="mt-24 flex relative">
            {/* Left side - Price */}
            <div className="relative z-20 p-8 min-w-[300px]">
              <div className="text-white space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Hanya</h3>
                  <p className="text-3xl font-bold">Rp.70.000,00</p>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span>Konten Eksklusif</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span>Bebas Iklan</span>
                  </li>
                </ul>

                <button 
                  onClick={() => setShowPremium(true)}
                  className="w-full bg-white text-[#6095FF] px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors"
                >
                  Berlangganan
                </button>
              </div>
            </div>

            {/* Right side - Image Carousel */}
            <div className="flex-1 -mr-[200px]">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </section>

      <Premium 
        isOpen={showPremium} 
        onClose={() => setShowPremium(false)} 
      />

        <Footer/>
    </div>
  );
};

export default LandingPage;