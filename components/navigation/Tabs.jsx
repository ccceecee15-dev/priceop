import React from 'react';

export function Tabs({ items, value, onChange, className = '', ...rest }) {
  return (
    <div className={`dr-tabs ${className}`} role="tablist" {...rest}>
      {items.map((it) => {
        const id = it.id ?? it.label;
        const on = id === value;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={on}
            className={`dr-tab ${on ? 'dr-tab--active' : ''}`}
            onClick={() => onChange && onChange(id)}
          >
            {it.label}
            {it.count != null && (
              <span style={{ fontWeight: 500, color: 'var(--dr-ink-3)', marginLeft: 7 }}>{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
