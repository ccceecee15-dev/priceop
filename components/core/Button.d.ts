import * as React from 'react';

/**
 * The brand's action control. Primary is achromatic graphite, not copper.
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost and danger actions" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = graphite commit action; ghost = copper text action. Default 'primary'. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** 'sm' for dense toolbars and table rows. */
  size?: 'sm';
  /** Full width, centred label — used in modals and the sign-in panel. */
  block?: boolean;
  /** A 15x15 icon element, rendered before the label. */
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}
export declare function Button(props: ButtonProps): React.JSX.Element;
