import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import HeroImage from '../../assets/Landing_1.gif';
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
      <Header />

      {/* Hero Section */}
      <section className="relative text-white py-10 md:py-20 mb-12 md:mb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 text-start">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                Selamat Datang di Cihuy Kids!
              </h1>
              <p className="text-base md:text-lg mb-6 md:mb-8 max-w-lg">
                Kami merupakan platform hiburan dan edukasi digital yang aman untuk anak-anak usia 4-12 tahun. Di sini, mereka dapat menonton video, mendengarkan musik, bermain game edukatif, dan membaca cerita yang telah difilter sesuai usia, untuk memberikan pengalaman yang sesuai dengan tahap perkembangan mereka.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={HeroImage}
                alt="Family using tablet"
                className="rounded-lg w-full md:w-[750px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Content Section */}
      <section className="py-10 md:py-20 mt-[150px] md:mt-14 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-[#FF4B6E] mb-6 md:mb-12">
            Konten Premium
          </h2>
          <p className="text-sm md:text-base text-center text-blue-500 mb-8 md:mb-12">
            Dapatkan Akses Penuh ke Dunia Seru dan Edukatif di Cihuy Kids Premium
          </p>

          <div className="flex flex-col mt-[150px] md:flex-row items-center md:items-start md:space-x-6">
            {/* Left side - Price */}
            <div className="relative z-20 p-6 md:p-8 min-w-[250px] md:min-w-[300px] text-center md:text-left">
              <div className="text-white space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">Hanya</h3>
                  <p className="text-2xl md:text-3xl font-bold">Rp.70.000,00</p>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2 text-[#FF4B6E]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span>Konten Eksklusif</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2 text-[#FF4B6E]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span>Bebas Iklan</span>
                  </li>
                </ul>

                <button
                  onClick={() => setShowPremium(true)}
                  className="w-full bg-white text-[#6095FF] px-4 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors"
                >
                  Berlangganan
                </button>
              </div>
            </div>

            {/* Right side - Image Carousel */}
            <div className="w-full px-12 mt-6 md:mt-0 md:flex-1 md:-mr-[200px]">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </section>

      <Premium isOpen={showPremium} onClose={() => setShowPremium(false)} />

      <Footer />
    </div>
  );
};

export default LandingPage;
