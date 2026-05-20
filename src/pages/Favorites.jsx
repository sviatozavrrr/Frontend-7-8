import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import styles from './Gallery.module.css';

export default function Favorites() {
  const { inventory } = useInventory();
  const { favIds, isFavorite, removeFavorite } = useFavorites();

  const favoriteItems = inventory.filter(item => isFavorite(item.id));

  if (favoriteItems.length === 0) return (
    <div className={styles.container}>
      <h1>Мої улюблені ❤️</h1>
      <div style={s.empty}>
        <span style={s.emptyIcon}>🤍</span>
        <p style={s.emptyText}>Список улюблених порожній</p>
        <p style={s.emptyHint}>Додай елементи через галерею</p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1>Мої улюблені ❤️</h1>
      <p style={s.counter}>{favoriteItems.length} елем.</p>

      <div className={styles.grid}>
        {favoriteItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <button
              onClick={() => removeFavorite(item.id)}
              className={styles.favButton}
              title="Видалити з улюблених"
            >
              ❌
            </button>
            <img src={item.photo} alt={item.inventory_name} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.title}>{item.inventory_name}</h3>
            </div>
          </div>
        ))}
      </div>
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
  counter: { color: '#64748b', fontSize: '14px', marginBottom: '8px', textAlign: 'left' },
};