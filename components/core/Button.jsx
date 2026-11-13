import React from 'react';

/* Commit actions are achromatic graphite on purpose — see tokens/colors.css.
   Never restyle a primary button to copper; copper means identity/selection. */
export function Button({ variant = 'primary', size, block, icon, disabled, children, className = '', ...rest }) {
  const cls = [
    'dr-btn',
    `dr-btn--${variant}`,
    size === 'sm' ? 'dr-btn--sm' : '',
    block ? 'dr-btn--block' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={cls} disabled={disabled} {...rest}>
      {icon}
      {children}
    </button>
  );
}
