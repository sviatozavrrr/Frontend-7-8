import { useState, useEffect } from 'react';

// Хук інкапсулює всю логіку улюблених
// Використовується в Gallery.jsx і Favorites.jsx
export function useFavorites() {
  const [favIds, setFavIds] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Автоматично зберігаємо при кожній зміні
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favIds));
  }, [favIds]);

  const isFavorite = (id) => favIds.includes(id);

  const toggleFavorite = (id) => {
    setFavIds(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const removeFavorite = (id) => {
    setFavIds(prev => prev.filter(f => f !== id));
  };

  return { favIds, isFavorite, toggleFavorite, removeFavorite };
}