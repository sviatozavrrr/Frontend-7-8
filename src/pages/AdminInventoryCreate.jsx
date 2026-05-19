import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Розкоментуєш, коли буде бек
import styles from './AdminInventory.module.css'; 

export default function AdminInventoryCreate() {
  const navigate = useNavigate();
  // Стейт для текстових полів
  const [formData, setFormData] = useState({ inventory_name: '', description: '' });
  // Стейт для файлу
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  // Хендлери змін
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валідація
    if (!formData.inventory_name.trim()) {
      setError('Назва інвентарю — обовʼязкове поле!');
      return;
    }

    // Пакуємо дані для multipart/form-data
    const data = new FormData();
    data.append('inventory_name', formData.inventory_name);
    data.append('description', formData.description);
    if (photo) data.append('photo', photo);

    try {
      // ЗАГЛУШКА: імітуємо успішний запит (POST /register)
      console.log('Дані готові до відправки:', Object.fromEntries(data));
      alert('Інвентар успішно створено (фейк)!');
      navigate('/'); // Кидаємо юзера назад на таблицю
      
      // РЕАЛЬНИЙ ЗАПИТ (потім розкоментуєш):
      // await axios.post('/register', data, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      // navigate('/');
    } catch (err) {
      setError('Помилка при створенні 💀');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Додати новий інвентар</h1>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginTop: '20px' }}>
        <input 
          type="text" 
          name="inventory_name" 
          placeholder="Назва (обов'язково)" 
          value={formData.inventory_name} 
          onChange={handleChange} 
          className={styles.td}
        />
        <textarea 
          name="description" 
          placeholder="Опис" 
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
          Зберегти
        </button>
        <button type="button" onClick={() => navigate('/')} style={{ padding: '10px', cursor: 'pointer' }}>
          Скасувати
        </button>
      </form>
    </div>
  );
}