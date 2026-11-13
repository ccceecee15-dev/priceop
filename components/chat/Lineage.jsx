import React from 'react';

export function Lineage({ sources, plan, className = '', ...rest }) {
  return (
    <div className={`dr-lineage ${className}`} {...rest}>
      {sources.map((s, i) => (
        <button key={s.id ?? i} type="button" className="dr-src">
          {s.icon}
          {s.label}
        </button>
      ))}
      {plan}
    </div>
  );
}
