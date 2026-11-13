import React from 'react';

export function NavRail({ brand, search, items, footer, width = 214, className = '', style, ...rest }) {
  return (
    <aside
      className={`dr-nav ${className}`}
      style={{ width, flex: 'none', display: 'flex', flexDirection: 'column', padding: '16px 0 4px', ...style }}
      {...rest}
    >
      {brand && <div style={{ padding: '2px 18px 16px' }}>{brand}</div>}
      {search && <div style={{ padding: '0 12px 12px' }}>{search}</div>}
      <nav style={{ display: 'flex', flexDirection: 'column' }}>{items}</nav>
      {footer && <div style={{ marginTop: 'auto' }}>{footer}</div>}
    </aside>
  );
}
