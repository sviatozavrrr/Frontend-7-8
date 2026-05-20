import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';

const s = {
  container: {
    padding: '40px',
    maxWidth: '520px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: '#e2e8f0',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#f1f5f9',
    marginBottom: '32px',
    letterSpacing: '-0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    background: '#1e2433',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  input: {
    padding: '11px 14px',
    background: '#151b2e',
    border: '1px solid #2d3748',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '11px 14px',
    background: '#151b2e',
    border: '1px solid #2d3748',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  fileWrapper: {
    padding: '11px 14px',
    background: '#151b2e',
    border: '1px dashed #3d4a5c',
    borderRadius: '8px',
    color: '#64748b',
    fontSize: '13px',
    cursor: 'pointer',
  },
  btnSave: {
    padding: '12px',
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginTop: '8px',
  },
  btnCancel: {
    padding: '12px',
    background: 'transparent',
    color: '#94a3b8',
    border: '1px solid #2d3748',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  error: {
    color: '#f87171',
    fontSize: '13px',
    fontWeight: 500,
    padding: '10px 14px',
    background: 'rgba(239,68,68,0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(239,68,68,0.3)',
  },
};

export default function AdminInventoryCreate() {
  const navigate = useNavigate();
  const { addItem } = useInventory();
  const [formData, setFormData] = useState({ inventory_name: '', description: '' });
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('Файл не вибрано');
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setFileName(file ? file.name : 'Файл не вибрано');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.inventory_name.trim()) {
      setError("Назва — обов'язкове поле!");
      return;
    }
    const photoUrl = photo ? URL.createObjectURL(photo) : 'https://placehold.co/400x300';
    addItem({ ...formData, photo: photoUrl });
    navigate('/');
  };

  return (
    <div style={s.container}>
      <h1 style={s.title}>Додати інвентар</h1>

      <form onSubmit={handleSubmit} style={s.form}>
        {error && <p style={s.error}>{error}</p>}

        <label style={s.label}>
          Назва *
          <input
            style={s.input}
            type="text"
            name="inventory_name"
            placeholder="Введи назву..."
            value={formData.inventory_name}
            onChange={handleChange}
            onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
            onBlur={(e) => (e.target.style.borderColor = '#2d3748')}
          />
        </label>

        <label style={s.label}>
          Опис
          <textarea
            style={s.textarea}
            name="description"
            placeholder="Короткий опис..."
            value={formData.description}
            onChange={handleChange}
            onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
            onBlur={(e) => (e.target.style.borderColor = '#2d3748')}
          />
        </label>

        <label style={s.label}>
          Фото
          <label style={s.fileWrapper}>
            📎 {fileName}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </label>

        <button
          type="submit"
          style={s.btnSave}
          onMouseEnter={(e) => (e.target.style.background = '#2563eb')}
          onMouseLeave={(e) => (e.target.style.background = '#3b82f6')}
        >
          Зберегти
        </button>
        <button
          type="button"
          style={s.btnCancel}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => { e.target.style.borderColor = '#64748b'; e.target.style.color = '#e2e8f0'; }}
          onMouseLeave={(e) => { e.target.style.borderColor = '#2d3748'; e.target.style.color = '#94a3b8'; }}
        >
          Скасувати
        </button>
      </form>
    </div>
  );
}