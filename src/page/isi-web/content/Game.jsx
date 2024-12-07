import React, { useState } from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeaderCont from '../../../components/Header/HeaderCont';
import Footer from '../../../components/footer/Footer';
import game from '../../../assets/isi-web/game/banner.png';
import GameInstructions from '../../../components/game/HowToPlay';

const GamePage = () => {
    const [showInstructions, setShowInstructions] = useState(false);
    const navigate = useNavigate();

    // Daftar game terkait lainnya
    const relatedGames = [
        {
            id: 1,
            title: "Space Invaders",
            description: "Defend Earth from waves of alien invaders in this classic arcade game.",
            thumbnail: "https://example.com/images/space-invaders-thumbnail.jpg", // URL gambar untuk thumbnail
            url: "https://play.famobi.com/space-invaders"
        },
        {
            id: 2,
            title: "Tetris",
            description: "Place the falling blocks to clear the lines in this iconic puzzle game.",
            thumbnail: "https://example.com/images/tetris-thumbnail.jpg", // URL gambar untuk thumbnail
            url: "https://play.famobi.com/tetris"
        },
        {
            id: 3,
            title: "Candy Crush",
            description: "Match 3 candies to score points and move through levels.",
            thumbnail: "https://example.com/images/candy-crush-thumbnail.jpg", // URL gambar untuk thumbnail
            url: "https://play.famobi.com/candy-crush"
        },
        // Tambahkan game lainnya di sini
    ];

    // Daftar game yang ingin ditampilkan
    const games = [
        {
            id: 1,
            title: 'Zoo Boom',
            description: 'Match cute animal cubes in this colorful puzzle game!',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/ZooBoomTeaser.jpg?v=0.2-766f7fc0", // URL gambar untuk thumbnail
            level: 'Easy',
            url: 'https://play.famobi.com/zoo-boom',
        },
        {
            id: 2,
            title: 'Bottle Flip',
            description: 'Flip, soar, and conquer in Bottle Flip - the ultimate test of timing and precision!',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/BottleFlipTeaser.jpg?v=0.2-766f7fc0", // URL gambar untuk thumbnail
            level: 'Medium',
            url: 'https://play.famobi.com/bottle-flip',
        },
        // Tambahkan game lainnya di sini
    ];

    // Fungsi untuk membuka game di tab baru
    const openGame = (url) => {
        window.open(url, '_blank');
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
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#FCC729]">Flappy Bird</h1>
                            <p className="text-sm mb-2">5 Juta Kali Dimainkan</p>
                            <div className="flex gap-4 justify-center sm:justify-start">
                                <button
                                    onClick={() => setShowInstructions(true)}
                                    className="bg-white text-[#FCC729] px-6 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    Cara Bermainnya
                                </button>
                                <GameInstructions
                                    isOpen={showInstructions}
                                    onClose={() => setShowInstructions(false)}
                                />
                                <button className="text-white p-3 hover:text-gray-200 transition-colors">
                                    <Heart className="w-6 h-6" fill="white" />
                                </button>
                            </div>
                        </div>

                        {/* Right side image */}
                        <div className="w-full sm:w-[60%] h-[200px] sm:h-[300px] relative flex justify-center sm:justify-end items-center mt-6 sm:mt-0 pr-8">
                            <img
                                src={game}
                                alt="Flappy Bird"
                                className="w-full sm:w-[80%] h-full object-cover rounded-3xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Game List Section */}
                <div className="bg-[#FCC729] mx-4 sm:mx-8 mb-8 rounded-lg p-6">
                    <h2 className="text-white text-xl font-semibold mb-4">
                        Game Lainnya
                    </h2>
                    <div className="bg-[#FE4C64] rounded-3xl p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {games.map((gameItem) => (
                                <div
                                    key={gameItem.id}
                                    className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                                    onClick={() => openGame(gameItem.url)} // Panggil fungsi openGame dengan URL game
                                >
                                    <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                                        <img
                                            src={gameItem.thumbnail}
                                            alt={gameItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{gameItem.title}</h3>
                                        <p className="text-white/80 text-sm">{gameItem.description}</p>
                                        <p className="text-white/60 text-xs">Level: {gameItem.level}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rekomendasi Game Lainnya Section */}
                <div className="bg-[#FCC729] mx-4 sm:mx-8 mb-8 rounded-lg p-6">
                    <h2 className="text-white text-xl font-semibold mb-4">
                        Rekomendasi Game Lainnya
                    </h2>
                    <div className="bg-[#FE4C64] rounded-3xl p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedGames.map((game) => (
                                <div
                                    key={game.id}
                                    className="flex gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                                    onClick={() => openGame(game.url)} // Panggil fungsi openGame dengan URL game
                                >
                                    <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden">
                                        <img
                                            src={game.thumbnail}
                                            alt={game.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{game.title}</h3>
                                        <p className="text-white/80 text-sm">{game.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GamePage;
