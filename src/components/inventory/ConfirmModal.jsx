export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  // Якщо стейт false — нічого не рендеримо
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', minWidth: '300px', textAlign: 'center' }}>
        <h2>Точно видаляємо?</h2>
        <p>Цю дію не можна скасувати.</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>Відміна</button>
          <button onClick={onConfirm} style={{ padding: '8px 16px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Знести</button>
        </div>
      </div>
    </div>
  );
}