import * as React from 'react';

/** An absolutely-positioned dropdown. The parent must be position:relative. */
export interface MenuEntry {
  id?: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** A clause explaining the consequence of choosing it. */
  desc?: React.ReactNode;
  active?: boolean;
  onSelect?: () => void;
}
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A tracked uppercase group label. */
  label?: React.ReactNode;
  items: MenuEntry[];
  className?: string;
}
export declare function Menu(props: MenuProps): React.JSX.Element;
