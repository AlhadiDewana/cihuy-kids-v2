import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../assets/icon.png'
import stickyLogo from '../assets/logo.png'; // Logo saat sticky
import userIcon from '../assets/profile-icon.png'; // Ikon normal
import userIconSticky from '../assets/profile-icon-sticky.png';
import HeroImage from '../assets/cover.png'

const LandingPage = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`header ${isSticky ? 'sticky' : ''}`}>
        <nav className="navbar">
          <div className="navbar-left">
            <img 
              src={isSticky ? stickyLogo : logo} // Menggunakan variabel yang diimport
              alt="Cihuy Kids Logo" 
              className="navbar-logo" 
            />
          </div>
          
          <div className="navbar-right">
            <img 
              src={isSticky ? userIconSticky : userIcon} // Menggunakan variabel yang diimport
              alt="User Icon" 
              className="navbar-user-icon" 
            />
            <button className={`navbar-button ${isSticky ? 'sticky-button' : ''}`}>
              Jelajahi
            </button>
          </div>
        </nav>
        <nav>
        <div className="navbar-center">
            <a href="#home">Selamat Datang</a>
            <a href="#a">Kenapa Konten Sesuai Usia itu Penting?</a>
            <a href="#access">Apa saja yang Bisa Diakses?</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative text-white py-20 mt-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
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
      <section className="py-20 mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#FF4B6E] mb-4">
            Konten Premium
          </h2>
          <p className="text-center text-blue-500 mb-12">
            Dapatkan Akses Penuh ke Dunia Seru dan Edukatif di Cihuy Kids Premium
          </p>

          <div className="flex flex-wrap items-center justify-between mt-24">
            <div className="w-full md:w-1/4 text-white p-8 rounded-lg mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Hanya</h3>
              <p className="text-3xl font-bold mb-4">Rp.70.000,00</p>
              <ul className="mb-6">
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Konten Eksklusif
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Bebas Iklan
                </li>
              </ul>
              <button 
                onClick={() => handleNavClick('berlangganan')}
                className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-blue-100 transition-colors"
              >
                Berlangganan
              </button>
            </div>

            <div className="w-full md:w-3/4 pl-0 md:pl-8">
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex-none w-48 h-64 bg-gray-200 rounded-lg shadow-lg">
                    <img 
                      src={`/api/placeholder/192/256`}
                      alt={`Content preview ${item}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <button className="w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"></button>
                <button className="w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"></button>
                <button className="w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"></button>
                <button className="w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"></button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Navigasi</h3>
              <ul className="space-y-2">
                {['layanan', 'agency', 'studi-kasus', 'sumber'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => handleNavClick(item)}
                      className="hover:text-yellow-400 transition-colors"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Lisensi</h3>
              <ul className="space-y-2">
                {['privacy', 'copyright', 'email'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => handleNavClick(item)}
                      className="hover:text-yellow-400 transition-colors"
                    >
                      {item === 'privacy' ? 'Kebijakan Privasi' :
                       item === 'copyright' ? 'Hak Cipta' : 'Alamat Email'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Kontak</h3>
              <ul className="space-y-2">
                <li>0897337917</li>
                <li>Cihuykids@gmail.com</li>
                <li>Indonesia</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;