import * as React from 'react';

/** A row in the nav rail. The active row gets a copper gradient wash and a 3px copper edge marker. */
export interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A 17x17 icon. Omit on sub-items. */
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** Usually a <Badge tone="brand">. */
  badge?: React.ReactNode;
  active?: boolean;
  /** Renders the indented child-row variant. */
  sub?: boolean;
  className?: string;
}
export declare function NavItem(props: NavItemProps): React.JSX.Element;
