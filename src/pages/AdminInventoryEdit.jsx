import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import styles from './AdminInventory.module.css';

export default function AdminInventoryEdit() {
  const { id } = useParams(); // Витягуємо ID з URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ inventory_name: '', description: '' });
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Фетчимо поточні дані при монтуванні
  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        // ЗАГЛУШКА: імітуємо отримання даних з беку
        setTimeout(() => {
          setFormData({ inventory_name: 'Стара назва інвентарю', description: 'Тут був старий опис' });
          setIsLoading(false);
        }, 500);

        // РЕАЛЬНИЙ ЗАПИТ:
        // const response = await axios.get(`/inventory/${id}`);
        // setFormData({ inventory_name: response.data.inventory_name, description: response.data.description });
        // setIsLoading(false);
      } catch (err) {
        alert('Помилка завантаження даних');
      }
    };
    fetchCurrentData();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Оновлюємо текст (JSON)
      console.log(`PUT /inventory/${id} (JSON):`, formData);
      // await axios.put(`/inventory/${id}`, formData);

      // 2. Оновлюємо фото окремо (якщо юзер вибрав новий файл)
      if (photo) {
        const photoData = new FormData();
        photoData.append('photo', photo);
        console.log(`PUT /inventory/${id}/photo (FormData):`, photo);
        // await axios.put(`/inventory/${id}/photo`, photoData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }

      alert('Дані успішно оновлено!');
      navigate('/'); // Кидаємо назад в таблицю
    } catch (err) {
      alert('Помилка при оновленні 💀');
    }
  };

  if (isLoading) return <h2>Грузимо дані... ⏳</h2>;

  return (
    <div className={styles.container}>
      <h1>Редагувати інвентар #{id}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginTop: '20px' }}>
        <input 
          type="text" 
          name="inventory_name" 
          value={formData.inventory_name} 
          onChange={handleChange} 
          className={styles.td}
          required
        />
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className={styles.td}
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className={styles.td}
        />
        <button type="submit" style={{ padding: '10px', background: '#333', color: '#fff', cursor: 'pointer' }}>
          Зберегти зміни
        </button>
        <button type="button" onClick={() => navigate('/')} style={{ padding: '10px', cursor: 'pointer' }}>
          Скасувати
        </button>
      </form>
    </div>
  );
}