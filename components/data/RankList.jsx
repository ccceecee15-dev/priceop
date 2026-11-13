import React from 'react';
import { Meter } from './Meter.jsx';

export function RankList({ items, className = '', ...rest }) {
  return (
    <div className={`dr-rank ${className}`} {...rest}>
      {items.map((it) => (
        <div key={it.label} className={`dr-rank__row ${it.weak ? 'dr-rank__row--weak' : ''}`}>
          <div className="dr-rank__label">{it.label}</div>
          <Meter value={it.value} />
          <div className="dr-rank__val dr-num">{it.display ?? it.value}</div>
        </div>
      ))}
    </div>
  );
}
