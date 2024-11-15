import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from "../components/footer/Footer";
import child1 from "../assets/landing 3/child-1.png"
import child2 from "../assets/landing 3/child-2.png"
import child3 from "../assets/landing 3/child-3.png"
import child4 from "../assets/landing 3/child-4.png"
import HeroImage from "../assets/landing 3/cover-3.png"
import "../page/Landing3.css"


const LandingPage3 = () => {
      return (
    
        <div className="w-full min-h-screen bg-white">
            <div className='landing-3'>
                {/* Header */}
                <Header/>
    
                {/* Hero Section */}
                <section className="relative text-white py-20">
                    <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0 text-start">
                        <h1 className="text-5xl font-bold mb-6">
                        Konten Sesuai Usia Itu Sangat Penting
                        </h1>
                        <p className="text-lg mb-8 max-w-lg">
                        Menurut berbagai penelitian, anak-anak di setiap tahap perkembangan membutuhkan konten yang berbeda untuk mendukung tumbuh kembangnya.               </p>
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
                {/* Explaination */}
                <div className="relative text-white py-20">
                  <div className="">
                    {/* Feature 1 */}
                    <div className=" child">
                      <div className="container px-4">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          {/* Left Image */}
                          <div className="md:w-1/2 relative">
                              <div className="absolute inset-0 bg-white rounded-full opacity-10 blur-lg transform -translate-x-4 translate-y-4"></div>
                              <img 
                              src={child1} 
                              alt="Child reading a book" 
                              className="relative z-10 max-w-m mx-auto"
                              style={{
                                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
                              }}
                              />
                          </div>
    
                          {/* Right Content */}
                          <div className="md:w-1/2 text-white text-start">
                              <h2 className="text-4xl font-bold mb-6">
                              Mendukung Perkembangan Otak yang Optimal
                              </h2>
                              <p className="text-xl leading-relaxed">
                              konten yang sesuai usia membantu perkembangan otak anak dengan
                              memberikan stimulasi yang tepat sesuai tahap perkembangannya.
                              </p>
                          </div>
                  </div>
                </div>
                    </div>
    
                    {/* Feature 2 */}
                    <div className=" child">
                      <div className="container px-4">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          {/* Right Content */}
                          <div className="md:w-1/2 text-white text-start">
                              <h2 className="text-4xl font-bold mb-6">
                              Mendukung Perkembangan Otak yang Optimal
                              </h2>
                              <p className="text-xl leading-relaxed">
                              konten yang sesuai usia membantu perkembangan otak anak dengan
                              memberikan stimulasi yang tepat sesuai tahap perkembangannya.
                              </p>
                          </div>
                          {/* Left Image */}
                          <div className="md:w-1/2 relative">
                              <div className="absolute inset-0 bg-white rounded-full opacity-10 blur-lg transform -translate-x-4 translate-y-4"></div>
                              <img 
                              src={child2} 
                              alt="Child reading a book" 
                              className="relative z-10 max-w-m mx-auto"
                              style={{
                                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
                              }}
                              />
                          </div>
                      </div>
                      </div>
                    </div>
    
                    {/* Feature 3 */}
                    <div className=" child">
                      <div className="container px-4">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          {/* Left Image */}
                          <div className="md:w-1/2 relative">
                              <div className="absolute inset-0 bg-white rounded-full opacity-10 blur-lg transform -translate-x-4 translate-y-4"></div>
                              <img 
                              src={child3} 
                              alt="Child reading a book" 
                              className="relative z-10 max-w-m mx-auto"
                              style={{
                                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
                              }}
                              />
                          </div>
    
                          {/* Right Content */}
                          <div className="md:w-1/2 text-white text-start">
                              <h2 className="text-4xl font-bold mb-6">
                              Memfasilitasi Perkembangan Sosial dan Emosional
                              </h2>
                              <p className="text-xl leading-relaxed">
                              konten yang sesuai usia membantu anak-anak memahami nilai-nilai sosial dan emosional yang mendasar, membentuk perilaku positif secara bertahap.
                              </p>
                          </div>
                        </div>
                      </div>
                    </div>
    
                    {/* Feature 4 */}
                    <div className=" child">
                      <div className="container px-4">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          {/* Right Content */}
                          <div className="md:w-1/2 text-white text-start">
                              <h2 className="text-4xl font-bold mb-6">
                              Meningkatkan Kreativitas dan Keamanan Digital</h2>
                              <p className="text-xl leading-relaxed">
                              konten yang relevan dengan usia membuat anak lebih terlibat dalam aktivitas kreatif sambil tetap aman dari paparan yang berlebihan.
                              </p>
                          </div>
                          {/* Left Image */}
                          <div className="md:w-1/2 relative">
                              <div className="absolute inset-0 bg-white rounded-full opacity-10 blur-lg transform -translate-x-4 translate-y-4"></div>
                              <img 
                              src={child4} 
                              alt="Child reading a book" 
                              className="relative z-10 max-w-m mx-auto"
                              style={{
                                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
                              }}
                              />
                          </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* Footer */}
                <Footer/>
            </div>
    
        </div>
      );
}

export default LandingPage3;