import React, { useState, useEffect } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import Sidebar from '../../components/admin/navigation/Sidebar';
import TopNavigation from '../../components/admin/navigation/TopNavigation';
import { useNavigate } from 'react-router-dom';
import { paymentAPI } from '../../api';

const KonfirmasiPembayaran = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(6);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch payments data
    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await paymentAPI.getAllPayments();
            setPayments(response.data.payments);
        } catch (err) {
            setError('Failed to fetch payments');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewBukti = (image) => {
        const baseUrl = `/payment-proofs/`; // Lokasi folder publik
        const fullImageUrl = `${baseUrl}${image}`; // URL lengkap gambar
        setSelectedImage(fullImageUrl);
    };
    
    const handleStatusChange = async (id, status) => {
        try {
            await paymentAPI.updatePayment(id, { status });
            fetchPayments(); // Refresh data
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                await paymentAPI.deletePayment(id);
                fetchPayments(); // Refresh data
            } catch (error) {
                console.error('Error deleting payment:', error);
            }
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Pagination Logic
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentPayments = payments.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const totalPages = Math.ceil(payments.length / entriesPerPage);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen text-red-600">
            <div>Error: {error}. Please try again later.</div>
            <button onClick={fetchPayments} className="ml-4 bg-blue-500 text-white p-2 rounded">Retry</button>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar/>
            <div className="flex-1 overflow-auto">
                <TopNavigation/>
                <div className='flex-1 overflow-auto mx-6 my-6'>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
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
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg shadow">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">User ID</th>
                                    <th className="p-3 text-left">Duration</th>
                                    <th className="p-3 text-left">Amount</th>
                                    <th className="p-3 text-left">Bank</th>
                                    <th className="p-3 text-left">Account Name</th>
                                    <th className="p-3 text-left">Proof</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPayments.map((payment) => (
                                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{payment.id}</td>
                                        <td className="p-3">{payment.userId}</td>
                                        <td className="p-3">{payment.durationType}</td>
                                        <td className="p-3">{formatPrice(payment.amount)}</td>
                                        <td className="p-3">{payment.bankName}</td>
                                        <td className="p-3">{payment.accountName}</td>
                                        <td className="p-3">
                                            <button 
                                                onClick={() => handleViewBukti(payment.proofImage)}
                                                className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                            >
                                                <Eye size={16} />
                                                View
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-sm
                                                ${payment.status === 'success' ? 'bg-green-100 text-green-600' : 
                                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                                                'bg-red-100 text-red-600'}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                {payment.status === 'pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleStatusChange(payment.id, 'success')}
                                                            className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusChange(payment.id, 'failed')}
                                                            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                                        >
                                                            Reject
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(payment.id)}
                                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${pageNumber === currentPage ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-white p-4 rounded">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                        >
                            Close
                        </button>
                        <img src={selectedImage} alt="Payment Proof" className="max-w-full max-h-[80vh]" />
                    </div>
                </div>
            )}

        </div>
    );
};

export default KonfirmasiPembayaran;
