import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import TopNavigation from '../../components/admin/TopNavigation';
import { useNavigate } from 'react-router-dom';

const KonfirmasiPembayaran = () => {
    const [entriesPerPage, setEntriesPerPage] = useState('6');


    // Data dummy, nantinya bisa diambil dari API
    const payments = [
        {
            id: "00006",
            nama: "Murray",
            email: "murray@gmail.com",
            harga: "Rp 70.000,00",
            jenisPaket: "Premium",
            rekeningTujuan: "Mandiri",
            status: "Diterima"
        },
        {
            id: "00002",
            nama: "Rosie Pearson",
            email: "rosie@gmail.com",
            harga: "Rp 70.000,00",
            jenisPaket: "Premium",
            rekeningTujuan: "Mandiri",
            status: "Diterima"
        },
        {
            id: "00003",
            nama: "Darrell Caldwell",
            email: "darrel@gmail.com",
            harga: "Rp 0",
            jenisPaket: "Free",
            rekeningTujuan: "Mandiri",
            status: "Tertunda"
        },
        // ... tambahkan data lainnya
    ];

    const handleViewBukti = (id) => {
        // Handler untuk melihat bukti transfer
        console.log('View bukti transfer for ID:', id);
    };

    const handleStatusChange = (id, status) => {
        // Handler untuk mengubah status
        console.log('Change status for ID:', id, 'to:', status);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar/>
            <div className="flex-1 overflow-auto">
                <TopNavigation/>
                <div className='flex-1 overflow-auto mx-6 my-6'>
                    <div className="mb-4 flex items-center ">
                        <label className="mr-2">Show</label>
                        <select 
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(e.target.value)}
                            className="border rounded p-1"
                        >
                            <option value="6">6</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <label className="ml-2">entries</label>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg shadow">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">NAMA PENGGUNA</th>
                                    <th className="p-3 text-left">EMAIL</th>
                                    <th className="p-3 text-left">HARGA</th>
                                    <th className="p-3 text-left">JENIS PAKET</th>
                                    <th className="p-3 text-left">REKENING TUJUAN</th>
                                    <th className="p-3 text-left">BUKTI TRANSFER</th>
                                    <th className="p-3 text-left">STATUS</th>
                                    <th className="p-3 text-left">KONFIRMASI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{payment.id}</td>
                                        <td className="p-3">{payment.nama}</td>
                                        <td className="p-3">{payment.email}</td>
                                        <td className="p-3">{payment.harga}</td>
                                        <td className="p-3">{payment.jenisPaket}</td>
                                        <td className="p-3">{payment.rekeningTujuan}</td>
                                        <td className="p-3">
                                            <button 
                                                onClick={() => handleViewBukti(payment.id)}
                                                className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                            >
                                                <Eye size={16} />
                                                View
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-sm
                                                ${payment.status === 'Diterima' ? 'bg-blue-100 text-blue-600' : 
                                                payment.status === 'Tertunda' ? 'bg-red-100 text-red-600' : 
                                                'bg-gray-100 text-gray-600'}`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleStatusChange(payment.id, 'Diterima')}
                                                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                                >
                                                    Diterima
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusChange(payment.id, 'Ditolak')}
                                                    className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                                                >
                                                    Ditolak
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>                  
                </div>
            </div>
        </div>
    );
};

export default KonfirmasiPembayaran;