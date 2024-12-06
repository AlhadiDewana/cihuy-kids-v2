import React, { useState } from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeaderCont from '../../../components/Header/HeaderCont';
import Footer from '../../../components/footer/Footer';
import balonkuImg from '../../../assets/isi-web/balonku.png';
import AudioPlayer from '../../../components/audio/AudioPlayer';

const MusicPage = () => {
    const [showPlayer, setShowPlayer] = useState(false);
    const navigate = useNavigate();

    const relatedMusic = [
        {
            id: 1,
            title: "Chapter One : The Vanishing of Will Byers",
            description: "On his way from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
            thumbnail: "/api/placeholder/160/96"
        },
        // Add other items as needed...
    ];

    const handleNavigate = (id) => {
        navigate(`/musik/${id}`);
    };

    const renderMusicItems = () => {
        return relatedMusic.map((music) => (
            <div
                key={music.id}
                className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => handleNavigate(music.id)}
            >
                <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                    <img
                        src={music.thumbnail}
                        alt={music.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-semibold">{music.title}</h3>
                    <p className="text-white/80 text-sm">{music.description}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen bg-[#6095FF]">
            <HeaderCont />

            <div className="px-4 sm:px-8">
                {/* Main Banner */}
                <div className="bg-[#FE4C64] mx-4 sm:mx-8 rounded-3xl overflow-hidden mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        {/* Left side content */}
                        <div className="p-6 sm:p-20 text-white text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#FCC729]">Balonku</h1>
                            <p className="text-sm mb-2">AT Mahmud dan Pak Kasur</p>
                            <p className="mb-4">5 Juta Kali Didengar</p>
                            <div className="flex gap-4 justify-center sm:justify-start">
                                <button
                                    onClick={() => setShowPlayer(true)}
                                    className="bg-white text-[#FE4C64] p-3 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Play className="w-6 h-6" />
                                </button>
                                <button className="text-white p-3 hover:text-gray-200 transition-colors">
                                    <Heart className="w-6 h-6 fill-white" />
                                </button>
                            </div>
                        </div>

                        {/* Right side image */}
                        <div className="w-full sm:w-[80%] h-[200px] sm:h-[350px] relative flex justify-center sm:justify-end items-center pr-8 mt-6 sm:mt-0">
                            <img
                                src={balonkuImg}
                                alt="Balonku"
                                className="w-full sm:w-[80%] h-full object-cover rounded-3xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Related Music Section */}
                <div className="bg-[#FCC729] mx-4 sm:mx-8 mb-8 rounded-lg p-6">
                    <h2 className="text-white text-xl font-semibold mb-4">
                        Musik lain yang banyak didengar orang
                    </h2>
                    <div className="bg-[#FE4C64] rounded-3xl p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {renderMusicItems()}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Audio Player */}
            <AudioPlayer
                show={showPlayer}
                title="Balonku"
                artist="p"
                thumbnail={balonkuImg}
            />
        </div>
    );
};

export default MusicPage;
