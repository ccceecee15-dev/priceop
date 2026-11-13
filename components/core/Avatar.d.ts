import * as React from 'react';

/** A round initials avatar with the copper identity gradient. */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Two characters. */
  initials: string;
  /** 'sm' = 30px; default 36px. */
  size?: 'sm';
  className?: string;
}
export declare function Avatar(props: AvatarProps): React.JSX.Element;
