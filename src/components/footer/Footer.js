import React from 'react';
import '../footer/style/Footer.css'
import { faInstagram, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = () => {
  return (
    <footer className="footer text-white py-8 mt-24">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">

          {/* Sosmed */}
          <div>
            <h3 className="font-bold mb-4">Ikuti Kami</h3>
            <div className="flex space-x-1">
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-black transition"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-[#FCC729] text-xl" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-black transition"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-[#FCC729] text-xl" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-black transition"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-[#FCC729] text-xl" />
              </a>

              {/* Twitter */}
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-black transition"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-[#FCC729] text-xl" />
              </a>
          </div>

          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2">
            <li>
              <a href="#layanan" className="hover:text-black">Layanan</a>
            </li>
            <li>
              <a href="#agency" className="hover:text-black">Agency</a>
            </li>
            <li>
              <a href="#studi-kasus" className="hover:text-black">Studi Kasus</a>
            </li>
            <li>
              <a href="#sumber" className="hover:text-black">Sumber</a>
            </li>
            </ul>
          </div>

          {/* Lisensi */}
          <div>
            <h3 className="font-bold mb-4">Lisensi</h3>
            <ul className="space-y-2">
            <li>
              <a href="#kebijakan-privasi" className="hover:text-black">Kebijakan Privasi</a>
            </li>
            <li>
              <a href="#hak-cipta" className="hover:text-black">Hak Cipta</a>
            </li>
            <li>
              <a href="#alamat-email" className="hover:text-black">Alamat Email</a>
            </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-bold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:08973379917" className="hover:text-black">08973379917</a>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:Cihuykids@gmail.com" className="hover:text-black">Cihuykids@gmail.com</a>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 5.523-4.477 10-10 10S1 15.523 1 10 5.477 0 10 0s10 4.477 10 10z" />
                  <path d="M10 6a4 4 0 0 1 4 4h-2a2 2 0 1 0-2-2V6z" />
                </svg>
                <span>Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;