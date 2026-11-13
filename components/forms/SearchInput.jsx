import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function SearchInput({ className = '', ...rest }) {
  return (
    <div className={`dr-search ${className}`}>
      <Icon name="i-search" />
      <input className="dr-input" type="search" {...rest} />
    </div>
  );
}
