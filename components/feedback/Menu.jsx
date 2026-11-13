import React from 'react';

export function Menu({ label, items, className = '', ...rest }) {
  return (
    <div className={`dr-menu ${className}`} role="menu" {...rest}>
      {label && <div className="dr-menu__label">{label}</div>}
      {items.map((it, i) => (
        <button
          key={it.id ?? i}
          type="button"
          role="menuitem"
          className={`dr-menu__item ${it.active ? 'dr-menu__item--active' : ''}`}
          onClick={it.onSelect}
        >
          {it.icon}
          <div>
            <div className="dr-menu__title">{it.title}</div>
            {it.desc && <div className="dr-menu__desc">{it.desc}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}
