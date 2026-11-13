import React from 'react';

export function NavItem({ icon, label, badge, active, sub, className = '', ...rest }) {
  if (sub) {
    return (
      <div className={`dr-nav__sub ${active ? 'dr-nav__sub--active' : ''} ${className}`} {...rest}>
        {label}
      </div>
    );
  }
  return (
    <div className={`dr-nav__item ${active ? 'dr-nav__item--active' : ''} ${className}`} {...rest}>
      {icon}
      <span style={{ flex: 1 }}>{label}</span>
      {badge}
    </div>
  );
}
