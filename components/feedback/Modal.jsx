import React from 'react';

export function Modal({ open = true, onClose, head, children, foot, className = '', ...rest }) {
  if (!open) return null;
  return (
    <div className="dr-overlay" onClick={onClose}>
      <div
        className={`dr-modal ${className}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        {head && <div className="dr-modal__head">{head}</div>}
        {children != null && <div className="dr-modal__body">{children}</div>}
        {foot && <div style={{ padding: '4px 16px 18px', display: 'flex', gap: 8 }}>{foot}</div>}
      </div>
    </div>
  );
}
