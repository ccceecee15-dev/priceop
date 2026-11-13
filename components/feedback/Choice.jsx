import React from 'react';

export function Choice({ icon, title, desc, className = '', ...rest }) {
  return (
    <button type="button" className={`dr-choice ${className}`} {...rest}>
      {icon}
      <div>
        <div className="dr-choice__title">{title}</div>
        {desc && <div className="dr-choice__desc">{desc}</div>}
      </div>
    </button>
  );
}
