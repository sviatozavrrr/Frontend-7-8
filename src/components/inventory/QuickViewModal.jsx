export default function QuickViewModal({ isOpen, onClose, item }) {
  // Якщо стейт false або немає об'єкта — рендеримо порожнечу
  if (!isOpen || !item) return null;

  return (
    <div 
      onClick={onClose} 
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ background: '#fff', padding: '20px', borderRadius: '12px', maxWidth: '400px', width: '90%', textAlign: 'center' }}
      >
        <img src={item.photo} alt={item.inventory_name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} />
        <h2 style={{ margin: '15px 0 10px' }}>{item.inventory_name}</h2>
        
        {/* Тут можна додати опис, якщо треба */}
        
        <button 
          onClick={onClose} 
          style={{ marginTop: '15px', padding: '10px 20px', background: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
        >
          Закрити
        </button>
      </div>
    </div>
  );
}