// Skeleton-картка для стану завантаження галереї
export default function SkeletonCard() {
  return (
    <div style={s.card}>
      <div style={s.image} className="skeleton" />
      <div style={s.info}>
        <div style={s.line} className="skeleton" />
        <div style={{ ...s.line, width: '60%' }} className="skeleton" />
      </div>
    </div>
  );
}

// Рендерить N skeleton-карток
export function SkeletonGrid({ count = 6 }) {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #1e2433 25%, #2d3748 50%, #1e2433 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 6px;
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}

const s = {
  card: {
    border: '1px solid #2d3748',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#1e2433',
  },
  image: {
    width: '100%',
    height: '200px',
  },
  info: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  line: {
    height: '14px',
    width: '80%',
  },
};