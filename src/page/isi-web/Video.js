import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import HeaderCont from '../../components/Header/HeaderCont';
import { videoAPI } from '../../api';

const getGoogleDriveThumbnailUrl = (url) => {
  if (!url) return '/api/placeholder/300/200';
  
  if (url.includes('drive.google.com')) {
    let fileId;
    if (url.includes('/file/d/')) {
      fileId = url.match(/\/file\/d\/([^/]+)/)?.[1];
    } else if (url.includes('id=')) {
      fileId = url.match(/id=([^&]+)/)?.[1];
    } else {
      fileId = url.match(/\/d\/(.*?)\/view/)?.[1];
    }
    
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }
  
  return url;
};

const getVideoEmbedUrl = (url) => {
  if (!url) return '';
  
  // Handle YouTube URLs
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
  
  // Handle Google Drive URLs
  if (url.includes('drive.google.com')) {
    let fileId;
    if (url.includes('/file/d/')) {
      fileId = url.match(/\/file\/d\/([^/]+)/)?.[1];
    } else if (url.includes('id=')) {
      fileId = url.match(/id=([^&]+)/)?.[1];
    }
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  
  return url;
};

const VideoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchVideoData = async () => {
      try {
        const response = await videoAPI.getVideoById(id);
        setVideo(response.data);

        const allVideosResponse = await videoAPI.getAllVideos();
        const filteredVideos = allVideosResponse.data.videos.filter(v => v.id !== id);
        setRelatedVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideoData();
  }, [id]);

  if (!video) return <div className="min-h-screen bg-[#6095FF] flex items-center justify-center">
    <div className="text-white">Loading...</div>
  </div>;

  return (
    <div className="min-h-screen bg-[#6095FF]">
      <HeaderCont/>

      <div className="max-w-6xl mx-auto p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="col-span-2">
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
          <div className="bg-[#FE4C64] rounded-lg p-6 text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                </svg>
                <span>Tanggal Rilis</span>
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
                <span className={`px-3 py-1 rounded-full text-sm ${
                  video.isPremium ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'
                }`}>
                  {video.isPremium ? 'Premium' : 'Free'}
                </span>
              </div>
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
          <div className="space-y-4">
            {relatedVideos.map((relatedVideo) => (
              <div 
                key={relatedVideo.id} 
                className="bg-[#FE4C64] rounded-lg p-4 text-white hover:bg-opacity-90 transition-colors cursor-pointer"
                onClick={() => navigate(`/video/${relatedVideo.id}`)}
              >
                <div className="flex gap-4">
                  <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                    <img 
                      src={getGoogleDriveThumbnailUrl(relatedVideo.thumbnailUrl)} 
                      alt={relatedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{relatedVideo.title}</h3>
                    <p className="text-sm text-white/80">{relatedVideo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoPage;