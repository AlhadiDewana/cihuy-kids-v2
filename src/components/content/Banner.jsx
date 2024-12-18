import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Banner = ({ featuredContent }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            handleSlideChange((prev) => prev === featuredContent.length - 1 ? 0 : prev + 1);
        }, 5000);

        return () => clearInterval(timer);
    }, [featuredContent.length]);

    const handleSlideChange = (newIndex) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentSlide(newIndex);
            setIsAnimating(false);
        }, 300);
    };

    const nextSlide = () => {
        handleSlideChange(currentSlide === featuredContent.length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        handleSlideChange(currentSlide === 0 ? featuredContent.length - 1 : currentSlide - 1);
    };

    return (
        <div className="relative bg-[#FE4C64] mx-4 sm:mx-8 rounded-3xl overflow-hidden mb-8">
            <div className="p-4 sm:p-8 flex flex-col sm:flex-row justify-between items-center">
                <div className="text-white flex-1 bg-[#c93c4f] rounded-2xl p-4 sm:p-6">
                    <div className={`transform transition-all duration-300 ${
                        isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}>
                        <p className="text-sm sm:text-base mb-2">{featuredContent[currentSlide].tag}</p>
                        <h2 className="text-2xl sm:text-4xl font-bold mb-4">{featuredContent[currentSlide].title}</h2>
                        <p className="mb-6 text-sm sm:text-base max-w-md">{featuredContent[currentSlide].description}</p>
                        <button className="bg-white text-[#6095FF] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            {featuredContent[currentSlide].buttonText}
                        </button>
                    </div>
                </div>
                
                <div className="relative flex-1 mt-4 sm:mt-0 sm:ml-8">
                    <div className={`transform transition-all duration-300 ${
                        isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                    }`}>
                        <img 
                            src={featuredContent[currentSlide].image}
                            alt={featuredContent[currentSlide].title}
                            className="rounded-lg w-full h-[200px] sm:h-[300px] object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredContent.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSlideChange(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                            currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
