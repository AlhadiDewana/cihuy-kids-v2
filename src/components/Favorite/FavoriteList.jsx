import React, { useState, useEffect } from 'react';
import { favoriteAPI } from '../../api';
import ContentCard from '../content/ContentCard';

const FavoriteList = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const response = await favoriteAPI.getFavorites();
            setFavorites(response.data);
        } catch (error) {
            setError('Gagal memuat konten favorit');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (id) => {
        try {
            await favoriteAPI.removeFavorite(id);
            setFavorites(favorites.filter(fav => fav.id !== id));
        } catch (error) {
            setError('Gagal menghapus dari favorit');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Konten Favorit Saya</h2>
            {favorites.length === 0 ? (
                <p>Belum ada konten favorit</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(item => (
                        <ContentCard 
                            key={item.id}
                            content={item}
                            onRemoveFavorite={() => handleRemoveFavorite(item.id)}
                            isFavorited={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteList;