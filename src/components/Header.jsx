import { NavLink } from 'react-router-dom';

export default function Header() {
  // Динамічні стилі: isActive автоматично true, якщо url браузера збігається з 'to'
  const getLinkStyle = ({ isActive }) => ({
    color: isActive ? '#61dafb' : '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '8px 15px',
    borderRadius: '8px',
    background: isActive ? 'rgba(97, 218, 251, 0.1)' : 'transparent',
    border: isActive ? '1px solid #61dafb' : '1px solid transparent',
    transition: 'all 0.2s ease-in-out'
  });

  return (
    <header style={{ 
      background: '#222', 
      padding: '15px 30px', 
      display: 'flex', 
      gap: '20px', 
      marginBottom: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
      borderRadius: '12px'
    }}>
      <NavLink to="/" style={getLinkStyle}>⚙️ Адмінка</NavLink>
      <NavLink to="/gallery" style={getLinkStyle}>🖼️ Галерея</NavLink>
      <NavLink to="/favorites" style={getLinkStyle}>❤️ Улюблені</NavLink>
    </header>
  );
}