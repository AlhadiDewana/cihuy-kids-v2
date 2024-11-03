import React from 'react';

const LandingPage2 = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Konten Sesuai Usia Itu Sangat Penting</h1>
            <p className="text-xl">
              Menurut berbagai penelitian, anak-anak di kondisi sekarang sangat membutuhkan konten yang berkualitas untuk mendukung tumbuh kembangnya.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-yellow-400 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Mendukung Perkembangan Otak yang Optimal</h2>
            <p className="text-lg">
              Konten yang sesuai usia membantu perkembangan otak anak dengan memberikan stimulasi yang tepat sesuai tahap perkembangannya.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-red-400 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Menghindari Paparan yang Tidak Sesuai</h2>
            <p className="text-lg">
              Konten yang tidak sesuai usia dapat menimbulkan kecemasan pada anak. Dengan konten terfilter, memberikan rasa aman dan kenyamanan dalam belajar.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-blue-400 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Memfasilitasi Perkembangan Sosial dan Emosional</h2>
            <p className="text-lg">
              Konten yang sesuai usia membantu anak-anak memahami nilai-nilai sosial dan emosional yang mendasar, membentuk perilaku positif secara bertahap.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-yellow-400 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Meningkatkan Kreativitas dan Keamanan Digital</h2>
            <p className="text-lg">
              Konten yang relevan dengan usia membuat anak lebih terlatih dalam aktivitas kreatif sambil tetap aman dari paparan yang berlebihan.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-red-400 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Melindungi Kesehatan Fisik dan Mental</h2>
            <p className="text-lg">
              Batasan usia dalam penggunaan media digital membantu menjaga keseimbangan aktivitas fisik dan kesehatan mental anak-anak.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-blue-400 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Memudahkan Pengawasan Orang Tua</h2>
            <p className="text-lg">
              Filter usia membantu orang tua dalam memantau konten anak, memastikan bahwa yang mereka akses sesuai dengan kebutuhan perkembangan mereka.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-400 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Navigasi</h3>
              <ul className="space-y-2">
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Lisensi</h3>
              <ul className="space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kontak</h3>
              <ul className="space-y-2">
                <li>+1234567890</li>
                <li>email@example.com</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage2;