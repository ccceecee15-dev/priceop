import * as React from 'react';

/** Renders one symbol from the brand sprite. Sizing comes from the parent component's CSS. */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Sprite symbol id, e.g. 'i-db', 'i-check', 'i-gauge'. See assets/dr-icons.svg. */
  name: string;
  /** Explicit px size. Omit inside Button/NavItem/etc, which size icons themselves. */
  size?: number;
  className?: string;
}
export declare function Icon(props: IconProps): React.JSX.Element;
