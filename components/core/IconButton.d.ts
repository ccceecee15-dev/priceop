import * as React from 'react';

/** A square 32px icon-only control. Hovers to copper. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required — becomes aria-label and the tooltip. */
  label: string;
  /** A single 15x15 icon element. */
  children: React.ReactNode;
  className?: string;
}
export declare function IconButton(props: IconButtonProps): React.JSX.Element;
