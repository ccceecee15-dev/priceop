import React from 'react';

export function StatValue({ label, value, delta, deltaDirection, bench, className = '', ...rest }) {
  return (
    <div className={className} {...rest}>
      {label && <div className="dr-stat__label">{label}</div>}
      <div className="dr-kpi__value">{value}</div>
      {delta && (
        <div className={`dr-delta ${deltaDirection ? `dr-delta--${deltaDirection}` : ''}`}>{delta}</div>
      )}
      {bench && <div className="dr-bench">{bench}</div>}
    </div>
  );
}
