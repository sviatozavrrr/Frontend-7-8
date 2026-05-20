import { useState, useEffect } from 'react';
import QuickViewModal from '../components/inventory/QuickViewModal';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Стейти для контролю модалки Quick View 🪟
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Ініціалізація улюблених з пам'яті браузера 💾
  const [favIds, setFavIds] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Автоматичне збереження при зміні списку ❤️
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favIds));
  }, [favIds]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setTimeout(() => {
          setInventory([
            { id: 1, inventory_name: 'Dell XPS 15', description: 'Потужний ноутбук для розробки та графіки.', photo: 'https://placehold.co/400x300' },
            { id: 2, inventory_name: 'Крісло OfficePro', description: 'Ергономічне крісло для тривалої роботи за кодом.', photo: 'https://placehold.co/400x300' },
            { id: 3, inventory_name: 'Монітор LG 27"', description: '4K монітор з IPS матрицею та чудовою передачею кольору.', photo: 'https://placehold.co/400x300' },
            { id: 4, inventory_name: 'Механічна клавіатура', description: 'Тактильна механіка нальних свічах для швидкого набору.', photo: 'https://placehold.co/400x300' },
          ]);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error('Помилка завантаження');
      }
    };
    fetchGallery();
  }, []);

  // Хендлер для відкриття модалки
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Перемикач стану улюбленого (додати/видалити)
  const toggleFavorite = (e, item) => {
    e.stopPropagation(); // Зупиняємо клік, щоб не тригерити модалку
    if (favIds.includes(item.id)) {
      setFavIds(favIds.filter(id => id !== item.id));
    } else {
      setFavIds([...favIds, item.id]);
    }
  };

  if (isLoading) return <h2>Грузимо галерею... ⏳</h2>;

  return (
    <div className={styles.container}>
      <h1>Галерея Інвентарю</h1>
      
      <div className={styles.grid}>
        {inventory.map((item) => (
          <div key={item.id} className={styles.card} onClick={() => handleCardClick(item)}>
            {/* Кнопка сердечка */}
            <button 
              onClick={(e) => toggleFavorite(e, item)}
              className={styles.favButton}
            >
              {favIds.includes(item.id) ? '❤️' : '🤍'}
            </button>

            <img src={item.photo} alt={item.inventory_name} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.title}>{item.inventory_name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Модалка Quick View */}
      <QuickViewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={selectedItem} 
      />
    </div>
  );
}