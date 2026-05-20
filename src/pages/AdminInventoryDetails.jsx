import { useParams, Link } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const { getItemById } = useInventory();
  const item = getItemById(id); // викликаємо на верхньому рівні, без useEffect

  if (!item) return (
    <div style={s.container}>
      <p style={s.notFound}>❌ Інвентар не знайдено</p>
      <Link to="/" style={s.backLink}>⬅ Назад до таблиці</Link>
    </div>
  );

  return (
    <div style={s.container}>
      <h1 style={s.title}>Деталі інвентарю</h1>

      <div style={s.card}>
        <img src={item.photo} alt={item.inventory_name} style={s.image} />
        <div style={s.info}>
          <span style={s.idBadge}>ID: {item.id}</span>
          <h2 style={s.name}>{item.inventory_name}</h2>
          <p style={s.description}>{item.description || 'Опис відсутній'}</p>
          <Link to="/">
            <button style={s.backBtn}>⬅ Назад до таблиці</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const s = {
  container: {
    padding: '40px',
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
  card: {
    display: 'flex',
    gap: '40px',
    background: '#1e2433',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    flexWrap: 'wrap',
  },
  image: {
    width: '360px',
    height: '360px',
    objectFit: 'cover',
    borderRadius: '12px',
    background: '#151b2e',
    border: '1px solid #2d3748',
    flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
    minWidth: '200px',
  },
  idBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    background: '#151b2e',
    border: '1px solid #2d3748',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#64748b',
    width: 'fit-content',
  },
  name: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#f1f5f9',
    margin: 0,
  },
  description: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#94a3b8',
    margin: 0,
    flex: 1,
  },
  backBtn: {
    padding: '10px 20px',
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    width: 'fit-content',
  },
  notFound: {
    color: '#f87171',
    fontSize: '16px',
    marginBottom: '16px',
  },
  backLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px',
  },
};