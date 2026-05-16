import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 0',
        gap: '1.2rem',
      }}
    >
      {/* Custom animated loader ring */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.06)',
          borderTop: '3px solid #ff6b6b',
          borderRight: '3px solid #4ecdc4',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      <span
        style={{
          fontSize: '0.85rem',
          color: 'var(--clr-text-muted, #8585a0)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        Loading...
      </span>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
