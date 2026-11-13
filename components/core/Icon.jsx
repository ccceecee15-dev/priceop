import React from 'react';

/* Intentional addition: a wrapper over the brand's 54-symbol SVG sprite
   (assets/dr-icons.svg). The sprite must be inlined once per document. */
export function Icon({ name, size, className = '', style, ...rest }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      style={size ? { width: size, height: size, ...style } : style}
      {...rest}
    >
      <use href={`#${name}`} />
    </svg>
  );
}
