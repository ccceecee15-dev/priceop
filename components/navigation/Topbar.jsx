import React from 'react';

export function Topbar({ title, chip, actions, className = '', ...rest }) {
  return (
    <header className={`dr-topbar ${className}`} {...rest}>
      <div className="dr-topbar__title" style={{ flex: 1, minWidth: 0 }}>{title}</div>
      {chip}
      {actions}
    </header>
  );
}
