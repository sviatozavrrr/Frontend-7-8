export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div style={s.backdrop} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <div style={s.iconWrap}>⚠️</div>
        <h2 style={s.title}>Точно видаляємо?</h2>
        <p style={s.text}>Цю дію не можна скасувати.</p>
        <div style={s.buttons}>
          <button
            style={s.btnCancel}
            onClick={onClose}
            onMouseEnter={(e) => { e.target.style.borderColor = '#64748b'; e.target.style.color = '#e2e8f0'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = '#2d3748'; e.target.style.color = '#94a3b8'; }}
          >
            Відміна
          </button>
          <button
            style={s.btnDelete}
            onClick={onConfirm}
            onMouseEnter={(e) => e.target.style.background = '#dc2626'}
            onMouseLeave={(e) => e.target.style.background = '#ef4444'}
          >
            Знести
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-out',
  },
  modal: {
    background: '#1e2433',
    border: '1px solid #2d3748',
    borderRadius: '16px',
    padding: '36px 32px',
    minWidth: '320px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    animation: 'slideUp 0.2s ease-out',
  },
  iconWrap: {
    fontSize: '36px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#f1f5f9',
    margin: '0 0 8px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  text: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 28px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  btnCancel: {
    padding: '10px 24px',
    background: 'transparent',
    color: '#94a3b8',
    border: '1px solid #2d3748',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  btnDelete: {
    padding: '10px 24px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
};