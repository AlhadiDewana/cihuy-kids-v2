import React from 'react';
import '../components/style/Footer2.css'

const Footer2 = () => {
  return (
    <footer className="footer2 text-white py-8 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>Layanan</li>
              <li>Agency</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Lisensi</h3>
            <ul className="space-y-2">
              <li>Kebijakan Privasi</li>
              <li>Hak Cipta</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                {/* Phone Icon */}
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
                0307337917
              </li>
              <li className="flex items-center">
                {/* Mail Icon */}
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
                Cihuykids@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2