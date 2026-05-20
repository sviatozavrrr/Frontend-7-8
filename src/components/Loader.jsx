export default function Loader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <div className="spinner"></div>
      <h3 style={{ marginTop: '15px', color: '#555' }}>Завантажуємо лут...</h3>
    </div>
  );
}