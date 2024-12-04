import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { X, Cloud } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { paymentAPI } from '../../api/payment';

const Konfirm = ({isOpen, onClose, onSuccess}) => {
    const { isAuthenticated } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState("1 Bulan");
    const [selectedBank, setSelectedBank] = useState("BCA");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/penawaranpremium');
    }

    useEffect(() => {
        if (!isAuthenticated) {
            onClose?.();
            navigate('/login', { 
                state: { 
                    returnUrl: '/konfirmasi-pembayaran',
                    message: 'Silakan login terlebih dahulu untuk melakukan pembayaran' 
                } 
            });
        }
    }, [isAuthenticated, navigate, onClose]);

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
            if (file.size > 50 * 1024 * 1024) {
                setError('Ukuran file tidak boleh lebih dari 50MB');
                return;
            }
            setSelectedFile(file);
            setError('');
        }
    };

    const handlePlanChange = (event) => {
        setSelectedPlan(event.target.value);
    };

    const handleBankChange = (event) => {
        setSelectedBank(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError('Pilih bukti pembayaran terlebih dahulu');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            const durationTypeMap = {
                "1 Bulan": "1_month",
                "1 Tahun": "12_month"
            };

            const amount = plans[selectedPlan]
                .replace('Rp', '')
                .replace('.', '')
                .replace(',00', '');

            formData.append('proofImage', selectedFile);
            formData.append('durationType', durationTypeMap[selectedPlan]);
            formData.append('amount', amount);
            formData.append('bankName', selectedBank);
            formData.append('accountName', userData);
            formData.append('status', 'pending');

            const response = await paymentAPI.createPayment(formData);
            
            if (response.data) {
                alert('Pembayaran berhasil dikirim dan menunggu konfirmasi admin');
                navigate('/content');
            }

        } catch (error) {
            console.error('Error submitting payment:', error);
            setError(error.response?.data?.error || 'Gagal mengirim bukti pembayaran');
        } finally {
            setLoading(false);
        }
    };

    const isLoggedIn = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userData = user?.name || 'cihuy';

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 relative overflow-y-auto max-h-[90vh] p-4 sm:p-6 lg:p-8">
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#6095FF] rounded-full hover:opacity-90 z-10"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {error && (
                    <div className="p-4 bg-red-100 text-red-700 mx-6 mt-6 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Informasi Pemilik Rekening</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Atas Nama</label>
                                <input 
                                    type="text"
                                    value={isLoggedIn ? `Hi, ${userData}` : 'Login'}
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

                    <div>
                        <h2 className="text-xl font-bold mb-4">Rekening Tujuan</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">BCA</label>
                                <input 
                                    type="text"
                                    value={banks.BCA}
                                    className="w-full p-2 bg-gray-100 rounded-md"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Mandiri</label>
                                <input 
                                    type="text"
                                    value={banks.Mandiri}
                                    className="w-full p-2 bg-gray-100 rounded-md"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">BRI</label>
                                <input 
                                    type="text"
                                    value={banks.BRI}
                                    className="w-full p-2 bg-gray-100 rounded-md"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Mengirim Bukti Pembayaran</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Bank Terpilih</label>
                                <select 
                                    value={selectedBank}
                                    onChange={handleBankChange}
                                    className="w-full p-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {Object.entries(banks).map(([bank, rekening]) => (
                                        <option key={bank} value={bank}>{bank} - {rekening}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                <div className="text-center">
                                    <Cloud className="mx-auto w-12 h-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">
                                        {selectedFile ? selectedFile.name : 'Pilih berkas atau seret & jatuhkan di sini'}
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

                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-8 w-full bg-[#6095FF] text-white py-3 rounded-md hover:bg-black transition-colors disabled:bg-gray-400"
                >
                    {loading ? 'Mengirim...' : 'Konfirmasi Pembayaran'}
                </button>
            </div>
        </div>
    );
};

export default Konfirm;
