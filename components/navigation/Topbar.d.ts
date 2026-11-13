import * as React from 'react';

/** The 62px view header: title, scope chip, actions. The title truncates with an ellipsis rather than wrapping. */
export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Kept to one line — long titles ellipsize, since the bar height is fixed. */
  title: React.ReactNode;
  /** The profile scope chip — makes explicit which profile the view follows. */
  chip?: React.ReactNode;
  /** Right-aligned buttons. */
  actions?: React.ReactNode;
  className?: string;
}
export declare function Topbar(props: TopbarProps): React.JSX.Element;
