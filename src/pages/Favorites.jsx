import { useState, useEffect } from 'react';
import styles from './Gallery.module.css'; // Юзаємо ті ж стилі
import Loader from '../components/Loader';

export default function Favorites() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Дістаємо наші улюблені ID з локал стораджа
  const [favIds, setFavIds] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Автозбереження при видаленні з улюблених
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favIds));
  }, [favIds]);

  // Імітація завантаження бази (як в Галереї)
  useEffect(() => {
    const fetchGallery = async () => {
      setTimeout(() => {
        setInventory([
          { id: 1, inventory_name: 'Dell XPS 15', description: 'Потужний ноутбук для розробки та графіки.', photo: 'https://placehold.co/400x300' },
          { id: 2, inventory_name: 'Крісло OfficePro', description: 'Ергономічне крісло для тривалої роботи за кодом.', photo: 'https://placehold.co/400x300' },
          { id: 3, inventory_name: 'Монітор LG 27"', description: '4K монітор з IPS матрицею та чудовою передачею кольору.', photo: 'https://placehold.co/400x300' },
          { id: 4, inventory_name: 'Механічна клавіатура', description: 'Тактильна механіка на лінійних свічах для швидкого набору.', photo: 'https://placehold.co/400x300' },
        ]);
        setIsLoading(false);
      }, 500);
    };
    fetchGallery();
  }, []);

  // Видалення з улюблених прямо на цій сторінці
  const removeFavorite = (id) => {
    setFavIds(favIds.filter(favId => favId !== id));
  };

  if (isLoading) return <Loader />;

  // ТА САМА ФІЛЬТРАЦІЯ 
  const favoriteItems = inventory.filter(item => favIds.includes(item.id));

  return (
    <div className={styles.container}>
      <h1>Мої улюблені айтеми ❤️</h1>
      
      {favoriteItems.length === 0 ? (
        <p>Ти ще нічого не додав в улюблені, бро.</p>
      ) : (
        <div className={styles.grid}>
          {favoriteItems.map((item) => (
            <div key={item.id} className={styles.card}>
              <button 
                onClick={() => removeFavorite(item.id)}
                className={styles.favButton}
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
      )}
    </div>
  );
}