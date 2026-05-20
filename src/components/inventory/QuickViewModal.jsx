export default function QuickViewModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  return (
   <div 
      className="fade-in-backdrop" // <--- Додали клас сюди
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} 
      onClick={onClose}
    >
      <div 
        className="fade-in-modal" // <--- І сюди
        style={{ background: '#fff', padding: '25px', borderRadius: '12px', maxWidth: '500px', width: '90%', position: 'relative', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
        >
          ❌
        </button>
        
        <img 
          src={item.photo} 
          alt={item.inventory_name} 
          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} 
        />
        
        <h2 style={{ marginTop: '20px', marginBottom: '10px', color: '#222', fontFamily: 'sans-serif' }}>
          {item.inventory_name}
        </h2>
        
        {/* Додано опис для розширеного перегляду 🪟 */}
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', margin: 0, fontFamily: 'sans-serif' }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}