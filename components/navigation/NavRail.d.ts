import * as React from 'react';

/**
 * The dark graphite sidebar. Dark in BOTH light and dark themes.
 * @startingPoint section="Navigation" subtitle="Dark nav rail with brand, search and items" viewport="700x420"
 */
export interface NavRailProps extends React.HTMLAttributes<HTMLElement> {
  /** The logo lockup — assets/deeproot-logo.png at ~138px wide. */
  brand?: React.ReactNode;
  /** The ⌘K search affordance. */
  search?: React.ReactNode;
  /** NavItem / NavSub elements. */
  items?: React.ReactNode;
  /** Pinned to the bottom — normally a UserCard. */
  footer?: React.ReactNode;
  /** Default 214. */
  width?: number;
  className?: string;
}
export declare function NavRail(props: NavRailProps): React.JSX.Element;
