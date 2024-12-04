import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/footer/Footer';
import kancil from '../../../assets/isi-web/bacaan/kancil.png'
import HeaderCont from '../../../components/Header/HeaderCont'

const ReadingPage = () => {

  return (
    <div className="min-h-screen bg-[#6095FF]">
      {/* Header/Navigation */}
      <HeaderCont />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-24">
        <div className="bg-[#FE4C64] rounded-2xl p-8 shadow-lg relative">

          {/* Chapter Title and Meta Info */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold mb-2 text-[#FCC729]">
              Kisah Petualangan si Cerdik Kancil
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 text-white">
              <span>Atisah, Desi Nurul Anggraini dkk</span>
              <span>📅 2017</span>
              <span>👀 7 Juta Kali Dibaca</span>
            </div>
          </div>

          {/* Story Content */}
          <div className="prose max-w-none space-y-4 text-white">
            <div className="mb-8">
              <img
                src={kancil}
                alt="Story of kancil"
                className="max-w-full mx-auto rounded-lg"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
                }}
              />
            </div>
            <div className="px-12">
              <p>
                Di pagi hari yang cerah ketika Kancil sedang asyik tertidur. Tiba­tiba dia dikagetkan oleh suara keras. “Akhirnya aku bisa makan kali ini. Jangan lari kau, Cil!” tiba­tiba sebuah suara diikuti erangan mengerikan muncul di belakang Kancil. Ternyata itu suara Harimau yang telah berdiri di belakang Kancil, siap untuk memangsanya.
                “Sebentar…sebentar… sabar dulu, teman. Kamu lihat aku yang kecil dan kurus kering begini pasti­lah tidak enak untuk dimakan,” dengan sabar Kancil menenangkan Harimau yang merasa kesal itu.
                {/* Continue the rest of the story */}
              </p>
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        <div className="bg-[#FCC729] rounded-lg p-6">
          <h2 className="text-white font-semibold mb-4">Herdin Lainnya</h2>
          <div className="space-y-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="bg-[#FE4C64] rounded-lg p-4 text-white hover:bg-opacity-90 transition-colors cursor-pointer">
                <div className="flex gap-4 flex-col sm:flex-row">
                  <div className="relative w-full sm:w-40 h-24 bg-black rounded-lg overflow-hidden">
                    <img
                      src="/api/placeholder/160/96"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
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
      <Footer />
    </div>
  );
};

export default ReadingPage;
