import React from 'react';

export function Card({ interactive, selected, head, foot, children, className = '', ...rest }) {
  const cls = [
    'dr-card',
    interactive ? 'dr-card--interactive' : '',
    selected ? 'dr-card--selected' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      {head && <div className="dr-card__head">{head}</div>}
      {children != null && <div className="dr-card__body">{children}</div>}
      {foot && <div className="dr-card__foot">{foot}</div>}
    </div>
  );
}
