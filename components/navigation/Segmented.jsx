import React from 'react';

export function Segmented({ items, value, onChange, className = '', ...rest }) {
  return (
    <div className={`dr-seg ${className}`} role="group" {...rest}>
      {items.map((it) => {
        const id = it.id ?? it.label;
        const on = id === value;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            className={`dr-seg__item ${on ? 'dr-seg__item--active' : ''}`}
            onClick={() => onChange && onChange(id)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
