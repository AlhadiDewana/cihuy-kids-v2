import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import kancil from '../../assets/isi-web/bacaan/kancil.png'
import HeaderCont from '../../components/Header/HeaderCont'

const ReadingPage = () => {

  return (
    <div className="min-h-screen bg-[#6095FF]">
      {/* Header/Navigation */}
      <HeaderCont/>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-24">
        <div className="bg-[#FE4C64] rounded-2xl p-8 shadow-lg relative">

          {/* Chapter Title and Meta Info */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold mb-2 text-[#FCC729]">
            Kisah Petualangan si Cerdik Kancil
            </h1>
            <div className="flex items-center text-sm text-gray-500 gap-4 text-white">
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
              className="max-w-lg mx-auto"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
              }}
            />
          </div>
          <div className='px-12'>
            <p>D i pagi hari yang cerah ketika Kancil sedang asyik tertidur. Tiba­Tiba dia dikagetkan oleh suara keras.
              “Akhirnya aku bisa makan kali ini. Jangan lari kau, Cil!” tiba­tiba sebuah suara diikuti eranganmengerikan muncul di belakang Kancil. Ternyata itu suara Harimau yang telah berdiri di belakang Kancil,siap untuk memangsanya.
              “Sebentar…sebentar… sabar dulu, teman. Kamu lihat aku yang kecil dan kurus keringbegini pasti­ lah tidak enak untuk dimakan,” dengan sabar Kancil menenangkan Harimau yang merasa kesal itu.
              “Terus apa maksudmu? Kamu mau menipuku lagi?” tanya Harimau curiga.
              “Oh… tidak. Bukan begitu maksudku. Tapi boleh aku minta satu permintaan sebelum kamu me­ makanku. Aku ingin makan dulu sebentar. Kalau aku kenyang dagingku pasti lebih enak,” bujuk Kancil terus mengulur waktu sambil berpikirbagaimana caranya bisa meloloskan diri dari ancamanHarimau berbahaya ini.
              “Baiklah. Aku beri kamu kesempatan. Silakan kamu cari makanan di sekitar sini saja. Aku mengawasi agar kamu tidak lari,” ucap Harimau akhirnya mengalahmeski sebenarnya ia sudah sangatlapar.
              Kancil lalu mencoba mencari umbi­umbian di sekitar tempat itu. Namun langkahnya terhentiketika melihat seekor ular besar tengah tidur melingkar di bawah semak­semak belukar. Ular itu sepertinya tidak tahu dengan keributan yang baru saja terjadi.
              Kancil lalu duduk dengan tenang di dekat ular itu. Harimaujadi marah melihatnya. Bukannya mencari makananseperti permintaannya tadi, Kancil malah duduk­duduk santai dengan malas­ nya. Denganmarah Harimau mendekati Kancil.
              “Hai, Cil! Bagaimana sih, kamu? Bukannya tadi minta makan? Sudah kuizinkan, malah duduk­ duduk di sini,”bentak Harimau.
              “Ssst… sabar sahabatku. Dan tolong jangan berisik karena aku baru saja menemukan Sabuk Raja yang maha sakti itu,” timpalKancil.
              Ia menunjuk ke arah ular besar yang tengah melingkar tidakjauh dari tempatnya duduk.
              “Hei! Aku itu tidak bodoh, Cil! Ini ‘kan ular, bukansabuk,” seru Harimausemakin emosi.
              “Itu sabuk tapi yang terbuat dari kulit ular. Konon siapa saja yang memakainya, ia akan menjadipenguasa binatang di muka bumi ini. Kamu tidak tertarikmenjadi rajanya hewan?”jelas Kancil meyakinkan.
              Terus bagaimanacara memakainya?” tanya Harimau tidak sabar.
              “Oh, gampangitu. Kamu tinggalpakai saja dengan melingkarkan sabuk itu di perutmu,” jawab Kancil.
              “Benarkah yang kau ucapkanitu, Cil? Terus bolehkah saya memakai sabuk ini?” tanya Hari­ mau mulai tertarik denganpenjelasan Kancil.
              “Nanti dulu, saya tanyakan Raja dulu.” Kancil menjawab, “Nanti kalau diizinkan, saya akan menjeritkan ‘Pakailah.’”
              Kemudian kancil pergi dan tak lama kemudian dari kejauhankancil menjerit, “Pakailah.”
              Harimau lalu meraih ular besar yang sedang tidur itu untuk dijadikan sabuk di perutnya.
              Ularbesar itu menjadimarah karena tidurnyaterganggu. Tubuhnya langsung melilit Harimau. Ular dan Harimau bertarung seru.
              Harimau akhirnyasadar kalau dia baru saja ditipu Kancil. Tapi nasi sudah menjadi bubur. Ia berusaha sekuat tenaga melawanular. Dengan susah payah, Harimau akhirnya bisa meloloskan diri dari lilitan ular. Meski ia juga menderita luka akibat gigitanular di sekujur tubuhnya.
            </p>
          </div>

            {/* Continue with more paragraphs */}
          </div>
        </div>

       {/*rekomendasi*/}
       <div className="bg-[#FCC729] rounded-lg p-6">
          <h2 className="text-white font-semibold mb-4">Herdin Lainnya</h2>
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="bg-[#FE4C64] rounded-lg p-4 text-white hover:bg-opacity-90 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
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