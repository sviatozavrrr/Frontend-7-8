import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
import styles from './AdminInventory.module.css';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Фетчимо деталі конкретного інвентарю [cite: 78]
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // ЗАГЛУШКА
        setTimeout(() => {
          setItem({
            id,
            inventory_name: 'Dell XPS 15',
            description: 'Ноутбук для розробки, 32GB RAM. Тягне всі робочі таски без фризів.',
            photo: 'https://placehold.co/400x400' // Велике зображення [cite: 84]
          });
          setIsLoading(false);
        }, 400);

        // РЕАЛЬНИЙ ЗАПИТ:
        // const response = await axios.get(`/inventory/${id}`);
        // setItem(response.data);
        // setIsLoading(false);
      } catch (err) {
        alert('Помилка завантаження деталей 💀');
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) return <h2>Грузимо деталі... ⏳</h2>;
  if (!item) return <h2>Інвентар не знайдено ❌</h2>;

  return (
    <div className={styles.container}>
      <h1>Деталі інвентарю #{item.id}</h1>
      
      <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
        <img 
          src={item.photo} 
          alt={item.inventory_name} 
          style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
        />
        <div style={{ maxWidth: '500px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>{item.inventory_name}</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{item.description}</p>
          
          <Link to="/">
            <button style={{ marginTop: '30px', padding: '10px 20px', cursor: 'pointer', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>
              ⬅ Назад до таблиці
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}