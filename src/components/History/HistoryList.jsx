import React, { useState, useEffect } from 'react';
import { historyAPI } from '../../api';
import ContentCard from '../content/ContentCard';

const HistoryList = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const response = await historyAPI.getHistory();
            setHistory(response.data);
        } catch (error) {
            setError('Gagal memuat riwayat');
        } finally {
            setLoading(false);
        }
    };

    const clearHistory = async () => {
        try {
            await historyAPI.clearHistory();
            setHistory([]);
        } catch (error) {
            setError('Gagal menghapus riwayat');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Riwayat Tontonan</h2>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Hapus Semua Riwayat
                    </button>
                )}
            </div>
            
            {history.length === 0 ? (
                <p>Belum ada riwayat tontonan</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.map(item => (
                        <ContentCard 
                            key={item.id}
                            content={item}
                            showTimestamp={true}
                            timestamp={item.viewedAt}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryList;