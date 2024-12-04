import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../components/footer/Footer';
import HeaderCont from '../../../components/Header/HeaderCont';
import { videoAPI } from '../../../api';

const getGoogleDriveThumbnailUrl = (url) => {
  if (!url) return '/path/to/default-thumbnail.png';

  let fileId;
  if (url.includes('drive.google.com')) {
    fileId = url.match(/\/file\/d\/([^/]+)/)?.[1] || url.match(/id=([^&]+)/)?.[1];
  }

  return fileId
    ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    : '/path/to/default-thumbnail.png';
};

const getVideoEmbedUrl = (url) => {
  if (!url) return '';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be')) {
      videoId = url.split('/').pop().split('?')[0];
    } else if (url.includes('youtube.com')) {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId?.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes('drive.google.com')) {
    let fileId = url.match(/\/file\/d\/([^/]+)/)?.[1] || url.match(/id=([^&]+)/)?.[1];
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
  }

  return url;
};

const RelatedVideoCard = ({ video, onClick }) => (
  <div
    className="bg-[#FE4C64] rounded-lg p-4 text-white hover:bg-opacity-90 transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="flex gap-4">
      <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
        <img
          src={getGoogleDriveThumbnailUrl(video.thumbnailUrl)}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-8 h-8 text-white" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">{video.title}</h3>
        <p className="text-sm text-white/80">{video.description}</p>
      </div>
    </div>
  </div>
);

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await videoAPI.getVideoById(id);
        setVideo(response.data);

        const allVideosResponse = await videoAPI.getAllVideos();
        const filteredVideos = allVideosResponse.data.videos.filter((v) => v.id !== id);
        setRelatedVideos(filteredVideos);
      } catch (err) {
        setError('Gagal memuat data video. Silakan coba lagi nanti.');
        console.error('Error fetching video:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#6095FF] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading video details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#6095FF] flex items-center justify-center">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#6095FF]">
      <HeaderCont />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="col-span-1 lg:col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <iframe
                className="w-full aspect-video"
                src={getVideoEmbedUrl(video.videoUrl)}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h1 className="text-white mt-4 text-lg">{video.title}</h1>
          </div>

          {/* Video Info */}
          <div className="bg-[#FE4C64] rounded-lg p-6 text-white space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span>Tanggal Rilis:</span>
              <span>{new Date(video.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
            <div>
              <span className="block mb-2">Untuk Usia</span>
              <span className="bg-[#6095FF] text-white px-3 py-1 rounded-full text-sm">
                {video.ageRange} Tahun
              </span>
            </div>
            <div>
              <span className="block mb-2">Genre</span>
              <span className="bg-[#6095FF] text-white px-3 py-1 rounded-full text-sm">
                {video.category}
              </span>
            </div>
            <div>
              <span className="block mb-2">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  video.isPremium ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'
                }`}
              >
                {video.isPremium ? 'Premium' : 'Free'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#FE4C64] rounded-lg p-6 text-white">
          <h2 className="font-semibold mb-2">Deskripsi</h2>
          <p>{video.description}</p>
        </div>

        {/* Related Videos */}
        <div className="bg-[#FCC729] rounded-lg p-6">
          <h2 className="text-white font-semibold mb-4">Video Lainnya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {relatedVideos.map((relatedVideo) => (
              <RelatedVideoCard
                key={relatedVideo.id}
                video={relatedVideo}
                onClick={() => navigate(`/video/${relatedVideo.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoPage;
