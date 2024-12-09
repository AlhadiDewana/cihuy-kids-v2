import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeaderCont from '../../../components/Header/HeaderCont';
import Footer from '../../../components/footer/Footer';


const GamePage = () => {
    const navigate = useNavigate();

    // Daftar game yang ingin ditampilkan
    const games = [
        {
            id: 1,
            title: 'Zoo Boom',
            description: 'Match cute animal cubes in this colorful puzzle game!',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/ZooBoomTeaser.jpg?v=0.2-766f7fc0", // URL gambar untuk thumbnail
            url: 'https://play.famobi.com/zoo-boom',
        },
        {
            id: 2,
            title: 'Bottle Flip',
            description: 'Flip, soar, and conquer in Bottle Flip - the ultimate test of timing and precision!',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/BottleFlipTeaser.jpg?v=0.2-766f7fc0", // URL gambar untuk thumbnail
            url: 'https://play.famobi.com/bottle-flip',
        },
        {
            id: 3, 
            title: 'Shopaholic Black Friday',
            description: 'Flip, soar, and conquer in Bottle Flip - the ultimate test of timing and precision!',
            thumbnail: "https://agamecdn.com/system/static/thumbs/spil_thumb_big/93373/webp_shopaholic-black-friday_200x120.webp?1731328303", 
            url: 'https://www.games.co.id/permainan_/shopaholic-black-friday',
        },
        {
            id: 4, 
            title: 'Pengu Slide',
            description: 'Slide to survive and fly to thrive in Pengu Slide - the ultimate penguin adventure game!',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/PenguSlideTeaser.jpg?v=0.2-eb120258", 
            url: 'https://play.famobi.com/pengu-slide',
        },
        {
            id: 5, 
            title: 'Bubble Tower 3D',
            description: 'If youre a friend of oldschool bubbleshooters then you will love Bubble Tower 3D.',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/BubbleTower3dTeaser.jpg?v=0.2-eb120258", 
            url: 'https://play.famobi.com/bubble-tower-3d',
        },
        {
            id: 6, 
            title: 'Pair Up 3D',
            description: 'Master the art of matching in Pair Up 3D! Dive into the captivating world of Pair Up 3D.',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/PairUp3dTeaser.jpg?v=0.2-eb120258", 
            url: 'https://play.famobi.com/pair-up-3d',
        },
        {
            id: 7, 
            title: '7 Words',
            description: 'If you like puzzles and crosswords, this is the perfect game for you!',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/7WordsTeaser.jpg?v=0.2-eb120258", 
            url: 'https://play.famobi.com/7-words',
        },
        {
            id: 8, 
            title: 'Guess Their Answer',
            description: 'Compete, guess, and conquer in Guess Their Answer - the ultimate trivia showdown!',
            thumbnail: "https://img.cdn.famobi.com/portal/html5games/images/tmp/GuessTheirAnswerTeaser.jpg?v=0.2-eb120258", 
            url: 'https://play.famobi.com/guess-their-answer',
        },
    ];

    // Fungsi untuk membuka game di tab baru
    const openGame = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#6095FF]">
            <HeaderCont />

            <div className="px-4 sm:px-8">

                {/* Game List Section */}
                <div className="bg-[#FCC729] mx-4 sm:mx-8 mb-8 rounded-lg p-6">
                    <h2 className="text-white text-xl font-semibold mb-4">
                        Daftar Game
                    </h2>
                    <div className="bg-[#FE4C64] rounded-3xl p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {games.map((gameItem) => (
                                <div
                                    key={gameItem.id}
                                    className="flex flex-col gap-4 items-center hover:bg-[#ff5c7d] p-4 rounded-xl transition-colors cursor-pointer"
                                    onClick={() => openGame(gameItem.url)} // Panggil fungsi openGame dengan URL game
                                >
                                    {/* Gambar Game */}
                                    <div className="relative w-full sm:w-40 h-24 bg-black rounded-lg overflow-hidden">
                                        <img
                                            src={gameItem.thumbnail}
                                            alt={gameItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    
                                    {/* Teks (Title & Description) */}
                                    <div className="text-center">
                                        <h3 className="text-white font-semibold">{gameItem.title}</h3>
                                        <p className="text-white/80 text-sm">{gameItem.description}</p>
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
