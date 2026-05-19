import { useState, useEffect } from 'react';
import QuickViewModal from '../components/inventory/QuickViewModal';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Стейти для контролю модалки Quick View
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Хардкод для візуалу
        setTimeout(() => {
          setInventory([
            { id: 1, inventory_name: 'Dell XPS 15', photo: 'https://placehold.co/400x300' },
            { id: 2, inventory_name: 'Крісло OfficePro', photo: 'https://placehold.co/400x300' },
            { id: 3, inventory_name: 'Монітор LG 27"', photo: 'https://placehold.co/400x300' },
            { id: 4, inventory_name: 'Механічна клавіатура', photo: 'https://placehold.co/400x300' },
          ]);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error('Помилка завантаження');
      }
    };
    fetchGallery();
  }, []);

  // Хендлер для кліку по картці
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (isLoading) return <h2>Грузимо галерею... ⏳</h2>;

  return (
    <div className={styles.container}>
      <h1>Галерея Інвентарю</h1>
      
      <div className={styles.grid}>
        {inventory.map((item) => (
          /* Вішаємо клік на всю картку */
          <div key={item.id} className={styles.card} onClick={() => handleCardClick(item)}>
            <img src={item.photo} alt={item.inventory_name} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.title}>{item.inventory_name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Підключаємо модалку Quick View */}
      <QuickViewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={selectedItem} 
      />
    </div>
  );
}