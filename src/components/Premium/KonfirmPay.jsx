import React, { useState } from "react";
import { X, Cloud } from 'lucide-react';

const Konfirm = ({isOpen, onClose}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState("1 Bulan");
    const [selectedBank, setSelectedBank] = useState("BCA");
    
    const plans = {
        "1 Bulan": "Rp70.000",
        "1 Tahun": "Rp7.000.000"
    };

    const banks = {
        "BCA": "8020210144",
        "Mandiri": "8020220144",
        "BRI": "8020230144"
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handlePlanChange = (event) => {
        setSelectedPlan(event.target.value);
    };

    const handleBankChange = (event) => {
        setSelectedBank(event.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#6095FF] rounded-full hover:opacity-90 z-10"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                <div className="p-8">
                    <div className="grid grid-cols-3 gap-8 text-black">
                        {/* Informasi Pengguna */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Informasi Pengguna</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1">Nama Pengguna</label>
                                    <input 
                                        type="text"
                                        value="Herdinata Dwi Putra"
                                        className="w-full p-2 bg-gray-100 rounded-md"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Email</label>
                                    <input 
                                        type="email"
                                        value="herdinatadwiputra@gmail.com"
                                        className="w-full p-2 bg-gray-100 rounded-md"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Jenis Paket Premium</label>
                                    <select 
                                        value={selectedPlan}
                                        onChange={handlePlanChange}
                                        className="w-full p-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="1 Bulan">1 Bulan</option>
                                        <option value="1 Tahun">1 Tahun</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Harga</label>
                                    <input 
                                        type="text"
                                        value={plans[selectedPlan]}
                                        className="w-full p-2 bg-gray-100 rounded-md"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rekening Tujuan */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Rekening Tujuan</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1">BCA</label>
                                    <input 
                                        type="text"
                                        value="8020210144"
                                        className="w-full p-2 bg-gray-100 rounded-md"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Mandiri</label>
                                    <input 
                                        type="text"
                                        value="8020220144"
                                        className="w-full p-2 bg-gray-100 rounded-md"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">BRI</label>
                                    <input 
                                        type="text"
                                        value="8020230144"
                                        className="w-full p-2 bg-gray-100 rounded-md"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Upload Bukti */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Mengirim Bukti Pembayaran</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1">{selectedBank}</label>
                                    <select 
                                        value={selectedBank}
                                        onChange={handleBankChange}
                                        className="w-full p-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="BCA">8020210144</option>
                                        <option value="Mandiri">8020220144</option>
                                        <option value="BRI">8020230144</option>
                                    </select>
                                </div>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                    <div className="text-center">
                                        <Cloud className="mx-auto w-12 h-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            Pilih berkas atau seret & jatuhkan di sini
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Format JPEG, PNG, PDF, dan MP4, hingga 50MB
                                        </p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".jpg,.jpeg,.png,.pdf,.mp4"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="mt-4 inline-block px-6 py-2 bg-[#6095FF] text-white rounded-md cursor-pointer hover:bg-black"
                                        >
                                            Pilih File
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="mt-8 w-full bg-[#6095FF] text-white py-3 rounded-md hover:bg-black transition-colors">
                        Konfirmasi Pembayaran
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Konfirm;