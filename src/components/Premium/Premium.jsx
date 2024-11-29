import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import premiumkids from '../../assets/Premium-kids.gif'
import { isAuthenticated } from '../../auth';
import Konfirm from "./KonfirmPay";
import { useAuth } from '../../context/AuthContext';

const Premium = ({isOpen=true, onClose}) => {  // Berikan default value true untuk isOpen
    
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    // Tambahkan handle close jika tidak ada onClose prop
    const handleClose = () => {
        // if (onClose) {
        //     onClose();
        // }
        navigate('/content'); // Selalu kembali ke halaman content
    };


    const handleBuyClick = () => {
        if (!isAuthenticated) {
            navigate('/login', { 
                state: { 
                    returnUrl: '/konfirmasi-pembayaran',
                    message: 'Silakan login terlebih dahulu untuk membeli premium' 
                } 
            });
            return;
        }
        // Jika sudah login, langsung ke halaman konfirmasi pembayaran
        navigate('/konfirmasi-pembayaran');
    };
    
    const features = [
        'Akses video tanpa batas',
        'Akses musik tanpa batas',
        'Akses game tanpa batas',
        'Akses bacaan tanpa batas'
    ];

    const plans = [
        {
            duration: '1 Bulan',
            price: 'Rp70.000',
            features: features
        },
        {
            duration: '1 Tahun',
            price: 'Rp7.000.000',
            features: features
        }
    ];


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
                {/* Close button */}
                <button 
                    onClick={handleClose}  // Gunakan handleClose
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#6095FF] rounded-full hover:opacity-90 z-10"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                <div className="grid md:grid-cols-[1fr,2fr] gap-6 p-6">
                    {/* Left side - Hero section */}
                    <div className="bg-[#6095FF] text-white p-8 rounded-lg">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">
                                Jelajahi Dunia Edukasi Tanpa Batas dengan Cihuy Kids Premium
                            </h2>
                            <p className="text-sm">
                                Nikmati pengalaman belajar tanpa batas yang aman dan menyenangkan, sehingga 
                                anak dapat mengeksplorasi dunia ilmu dan kreativitas dengan lebih bebas!
                            </p>
                            <div className="flex justify-center mt-8">
                                <img 
                                    src={premiumkids}
                                    alt="Kid illustration" 
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right side - Pricing cards */}
                    <div>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">
                            Premium untuk mengakses <br/> lebih banyak konten
                        </h1>
                        <div className="grid md:grid-cols-2 gap-4 mt-14">
                            {plans.map((plan) => (
                                <div key={plan.duration} className="bg-[#F2F2F2] rounded-lg shadow-md">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {plan.duration}
                                        </h3>
                                        <p className="text-xl font-bold mb-4 text-[#FE4C64]">
                                            {plan.price}
                                        </p>
                                        <div className="mb-6">
                                            <p className="text-sm text-gray-600 mb-2">
                                                Yang akan kamu dapatkan:
                                            </p>
                                            <ul className="space-y-2">
                                                {plan.features.map((feature) => (
                                                    <li key={feature} className="flex items-center text-sm text-blue-600">
                                                        <Check className="w-4 h-4 mr-2" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button 
                                            onClick={handleBuyClick}
                                            className="w-full bg-[#6095FF] hover:bg-black text-white py-2 px-4 rounded-md transition-colors"
                                        >
                                            Beli
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Premium;