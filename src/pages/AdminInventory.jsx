import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios'; // Розкоментуєш, коли піднімеш бекенд
import ConfirmModal from '../components/inventory/ConfirmModal';
import styles from './AdminInventory.module.css';

export default function AdminInventory() {
  // Стейт для даних, завантаження та помилок
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Стейт для модалки видалення
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Фетчинг даних при старті
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // Хардкод для тесту візуалу
        const mockData = [
          { id: 1, inventory_name: 'Dell XPS 15', description: 'Ноутбук для розробки, 32GB RAM', photo: 'https://placehold.co/60x60' },
          { id: 2, inventory_name: 'Крісло OfficePro', description: 'Ергономічне крісло з сіткою', photo: 'https://placehold.co/60x60' }
        ];
        
        // Імітація затримки мережі
        setTimeout(() => {
          setInventory(mockData);
          setIsLoading(false);
        }, 800);

        // Реальний запит (розкоментуй потім):
        // const response = await axios.get('/inventory');
        // setInventory(response.data);
        // setIsLoading(false);
      } catch (err) {
        setError('Відвалився бек або проблеми з мережею 💀');
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Відкриття модалки
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  // Підтвердження видалення
  const handleConfirmDelete = async () => {
    try {
      // Локально викидаємо елемент з масиву (фейк-видалення)
      setInventory(inventory.filter(item => item.id !== itemToDelete));
      
      // Реальний DELETE-запит:
      // await axios.delete(`/inventory/${itemToDelete}`); 
    } catch (err) {
      alert('Помилка при видаленні!');
    } finally {
      // Закриваємо модалку і чистимо стейт
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  // UI-стани
  if (isLoading) return <h2>Грузимо дані... ⏳</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className={styles.container}>
      <h1>Адмінка Інвентарю</h1>
      
      {/* Кнопка створення */}
      <Link to="/create">
        <button style={{ marginBottom: '15px' }}>+ Додати інвентар</button>
      </Link>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Фото</th>
            <th className={styles.th}>Назва інвентарю</th>
            <th className={styles.th}>Опис</th>
            <th className={styles.th}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className={styles.td}>
                <img src={item.photo} alt={item.inventory_name} className={styles.preview} />
              </td>
              <td className={styles.td}>{item.inventory_name}</td>
              <td className={styles.td}>{item.description}</td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  {/* Лінки на майбутні сторінки перегляду та редагування */}
                  <Link to={`/inventory/${item.id}`}>
                    <button>Переглянути</button>
                  </Link>
                  <Link to={`/edit/${item.id}`}>
                    <button>Редагувати</button>
                  </Link>
                  <button onClick={() => handleDeleteClick(item.id)}>Видалити</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Компонент модалки */}
      <ConfirmModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
}