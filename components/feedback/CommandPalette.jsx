import React from 'react';

export function CommandPalette({ open = true, onClose, placeholder = 'Search profiles, sources, screens…', groups, className = '', ...rest }) {
  if (!open) return null;
  return (
    <div className="dr-overlay" onClick={onClose}>
      <div
        className={`dr-modal dr-cmdk ${className}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        <input className="dr-cmdk__input" placeholder={placeholder} autoFocus />
        <div style={{ padding: '4px 6px 10px' }}>
          {groups.map((g) => (
            <div key={g.label}>
              <div className="dr-cmdk__group">{g.label}</div>
              {g.items.map((it, i) => (
                <button key={it.id ?? i} type="button" className={`dr-cmdk__row ${it.active ? 'dr-cmdk__row--on' : ''}`}>
                  {it.icon}
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.meta && <span style={{ fontSize: 11.5, color: 'var(--dr-ink-3)' }}>{it.meta}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
