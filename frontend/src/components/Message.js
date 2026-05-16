import React from 'react';

const variantStyles = {
  danger: {
    background: 'rgba(255,71,87,0.1)',
    border: '1px solid rgba(255,71,87,0.25)',
    color: '#ff6b81',
    icon: 'fas fa-exclamation-circle',
  },
  success: {
    background: 'rgba(78,205,196,0.1)',
    border: '1px solid rgba(78,205,196,0.25)',
    color: '#4ecdc4',
    icon: 'fas fa-check-circle',
  },
  info: {
    background: 'rgba(168,85,247,0.1)',
    border: '1px solid rgba(168,85,247,0.25)',
    color: '#a855f7',
    icon: 'fas fa-info-circle',
  },
  warning: {
    background: 'rgba(255,230,109,0.1)',
    border: '1px solid rgba(255,230,109,0.25)',
    color: '#ffe66d',
    icon: 'fas fa-exclamation-triangle',
  },
};

const Message = ({ variant = 'info', children }) => {
  const style = variantStyles[variant] || variantStyles.info;

  return (
    <div
      style={{
        background: style.background,
        border: style.border,
        borderRadius: '12px',
        color: style.color,
        padding: '0.9rem 1.2rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        fontSize: '0.9rem',
        fontWeight: 500,
        marginBottom: '1rem',
      }}
    >
      <i className={style.icon} style={{ marginTop: '2px', flexShrink: 0 }}></i>
      <span>{children}</span>
    </div>
  );
};

export default Message;
