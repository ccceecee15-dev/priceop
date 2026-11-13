import React from 'react';

export function SectionHeading({ children, count, className = '', ...rest }) {
  return (
    <div className={`dr-sec ${className}`} {...rest}>
      <h3>{children}</h3>
      {count != null && <span className="dr-sec__count">{count}</span>}
    </div>
  );
}
