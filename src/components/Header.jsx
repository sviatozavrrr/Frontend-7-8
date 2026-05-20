import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ background: '#222', padding: '15px 30px', display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
        ⚙️ Адмін-панель
      </Link>
      <Link to="/gallery" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
        🖼️ Галерея
      </Link>
      <Link to="/favorites" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
        ❤️ Улюблені
      </Link>
    </header>
  );
}