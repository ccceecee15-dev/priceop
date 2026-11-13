import * as React from 'react';

/** A full-width identity-provider button for the sign-in panel. */
export interface SsoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The provider glyph, 16x16. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export declare function SsoButton(props: SsoButtonProps): React.JSX.Element;
