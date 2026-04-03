import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('beauthe_favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('beauthe_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (product) => {
        const isAdding = !isFavorite(product.id);
        setFavorites(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                return prev.filter(p => p.id !== product.id);
            }
            return [...prev, product];
        });
        if (isAdding) {
            setIsFavoritesOpen(true);
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(p => p.id === productId);
    };

    const openFavorites = () => setIsFavoritesOpen(true);
    const closeFavorites = () => setIsFavoritesOpen(false);
    const clearFavorites = () => setFavorites([]);

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            isFavoritesOpen,
            openFavorites,
            closeFavorites,
            clearFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
