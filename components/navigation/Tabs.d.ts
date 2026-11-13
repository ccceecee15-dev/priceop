import * as React from 'react';

/**
 * Underlined tabs for switching a view's content. Active is copper text + copper rule.
 * @startingPoint section="Navigation" subtitle="Underlined tabs with counts" viewport="700x110"
 */
export interface TabItem {
  /** Defaults to label. */
  id?: string;
  label: React.ReactNode;
  /** A dimmed trailing count. */
  count?: React.ReactNode;
}
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  /** The active item's id. */
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}
export declare function Tabs(props: TabsProps): React.JSX.Element;
