import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateItem } = useInventory();

  const [formData, setFormData] = useState({ inventory_name: '', description: '' });
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('Файл не вибрано');

  useEffect(() => {
    const item = getItemById(id);
    if (item) setFormData({ inventory_name: item.inventory_name, description: item.description });
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setFileName(file ? file.name : 'Файл не вибрано');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = { ...formData };
    if (photo) updates.photo = URL.createObjectURL(photo);
    updateItem(Number(id), updates);
    navigate('/');
  };

  return (
    <div style={s.container}>
      <h1 style={s.title}>Редагувати інвентар #{id}</h1>

      <form onSubmit={handleSubmit} style={s.form}>
        <label style={s.label}>
          Назва *
          <input
            style={s.input}
            type="text"
            value={formData.inventory_name}
            onChange={(e) => setFormData({ ...formData, inventory_name: e.target.value })}
            placeholder="Введи назву..."
            required
            onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
            onBlur={(e) => (e.target.style.borderColor = '#2d3748')}
          />
        </label>

        <label style={s.label}>
          Опис
          <textarea
            style={s.textarea}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Короткий опис..."
            onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
            onBlur={(e) => (e.target.style.borderColor = '#2d3748')}
          />
        </label>

        <label style={s.label}>
          Нове фото (необов'язково)
          <label style={s.fileWrapper}>
            📎 {fileName}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </label>

        <button
          type="submit"
          style={s.btnSave}
          onMouseEnter={(e) => (e.target.style.background = '#2563eb')}
          onMouseLeave={(e) => (e.target.style.background = '#3b82f6')}
        >
          Зберегти зміни
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
};