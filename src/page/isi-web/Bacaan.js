import React, { useState, useEffect } from 'react';
import { Settings, Bell, User, Bookmark, BookmarkCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/icon.png';
import Footer from '../../components/Footer';

const ReadingPage = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const [selectedAge, setSelectedAge] = useState('4-5 Tahun');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkTooltip, setBookmarkTooltip] = useState(false);

  // Cek status bookmark saat komponen dimount
  useEffect(() => {
    const checkBookmarkStatus = () => {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(chapterId));
    };

    checkBookmarkStatus();
  }, [chapterId]);

  const handleBookmark = async () => {
    try {
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      
      if (isBookmarked) {
        // Hapus bookmark
        bookmarks = bookmarks.filter(id => id !== chapterId);
        setIsBookmarked(false);
        setBookmarkTooltip(true);
        setTimeout(() => setBookmarkTooltip(false), 2000);
      } else {
        // Tambah bookmark
        bookmarks.push(chapterId);
        setIsBookmarked(true);
        setBookmarkTooltip(true);
        setTimeout(() => setBookmarkTooltip(false), 2000);
      }

      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      // Kalau mau menyimpan ke backend
      // await fetch('http://localhost:5000/api/bookmarks', {
      //   method: isBookmarked ? 'DELETE' : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({ chapterId })
      // });

    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCC729]">
      {/* Header/Navigation */}
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <img 
            src={logo}
            alt="Cihuy Kids Logo" 
            className="navbar-logo"
          />
          
          <select 
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="bg-transparent text-white rounded-full px-4 py-2"
          >
            <option value="4-5 Tahun">4-5 Tahun</option>
            <option value="6-7 Tahun">6-7 Tahun</option>
            <option value="8-9 Tahun">8-9 Tahun</option>
            <option value="10-12 Tahun">10-12 Tahun</option>
          </select>
        </div>

        <div className="flex items-center gap-6">
          <Settings className="w-6 h-6 text-white cursor-pointer" />
          <Bell className="w-6 h-6 text-white cursor-pointer" />
          <User onClick={() => navigate('/login')} className="w-6 h-6 text-white cursor-pointer" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-[#FFF8E7] rounded-2xl p-8 shadow-lg relative">
          {/* Bookmark Button */}
          <div className="absolute top-4 right-4">
            <button 
              onClick={handleBookmark}
              className="relative group"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-6 h-6 text-[#6095FF]" />
              ) : (
                <Bookmark className="w-6 h-6 text-gray-400 hover:text-[#6095FF]" />
              )}
              
              {/* Tooltip */}
              {bookmarkTooltip && (
                <div className="absolute right-0 top-8 bg-black text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                  {isBookmarked ? 'Ditambahkan ke bookmark' : 'Dihapus dari bookmark'}
                </div>
              )}
            </button>
          </div>

          {/* Chapter Title and Meta Info */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Chương 5: Siêu việt đạo phong (12)
            </h1>
            <div className="flex items-center text-sm text-gray-500 gap-4">
              <span>🗸 Đăng bởi: Thanh Thành</span>
              <span>📅 2019-06-12 23:09:48</span>
              <span>👀 1770 lượt xem</span>
            </div>
          </div>

          {/* Story Content */}
          <div className="prose max-w-none space-y-4 text-gray-800">
            <p>Mạn đêm dần buông xuống, Long Hội đã chết.</p>

            <p>Y bị treo ngược trên cột cờ, thì thế cụt tay bị đánh đến chẳng chịt thương tích, máu từ trên người tứ từ nhỏ xuống, bị gió đêm làm đông cứng lại thành băng tuyết đỏ thẫm.</p>

            <p>Thủ thế của những tướng lĩnh còn lại bị treo trên cột cờ phần lớn cũng đều như thế.</p>

            {/* Continue with more paragraphs */}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            <button className="bg-[#6095FF] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
              ← Chương trước
            </button>
            <button className="bg-[#6095FF] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
              Chương sau →
            </button>
          </div>
        </div>

        {/* Bookmark List Preview (Optional) */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Bookmark Anda</h2>
          <div className="space-y-4">
            {/* Render bookmark list here */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReadingPage;