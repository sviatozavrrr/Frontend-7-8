import { useState, useEffect } from 'react';
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import { SkeletonGrid } from '../components/SkeletonCard';
import QuickViewModal from '../components/inventory/QuickViewModal';
import styles from './Gallery.module.css';

export default function Gallery() {
  const { inventory } = useInventory();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Імітуємо короткий стан завантаження для skeleton
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (isLoading) return (
    <div className={styles.container}>
      <h1>Галерея Інвентарю</h1>
      <div className={styles.grid}>
        <SkeletonGrid count={6} />
      </div>
    </div>
  );

  if (inventory.length === 0) return (
    <div className={styles.container}>
      <h1>Галерея Інвентарю</h1>
      <div style={s.empty}>
        <span style={s.emptyIcon}>📦</span>
        <p style={s.emptyText}>Інвентар порожній</p>
        <p style={s.emptyHint}>Додай елементи через адмінку</p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1>Галерея Інвентарю</h1>

      <div className={styles.grid}>
        {inventory.map((item) => (
          <div key={item.id} className={styles.card} onClick={() => handleCardClick(item)}>
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
              className={styles.favButton}
            >
              {isFavorite(item.id) ? '❤️' : '🤍'}
            </button>
            <img src={item.photo} alt={item.inventory_name} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.title}>{item.inventory_name}</h3>
            </div>
          </div>
        ))}
      </div>

      <QuickViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}

const s = {
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '80px',
    gap: '8px',
  },
  emptyIcon: { fontSize: '48px' },
  emptyText: { fontSize: '18px', fontWeight: 600, color: '#e2e8f0', margin: 0 },
  emptyHint: { fontSize: '14px', color: '#64748b', margin: 0 },
};