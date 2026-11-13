import * as React from 'react';

/**
 * A copper-tinted explanatory block with a 3px copper left edge.
 * @startingPoint section="Feedback" subtitle="Explanatory callout with a leading icon" viewport="700x130"
 */
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A 17x17 copper icon. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export declare function Callout(props: CalloutProps): React.JSX.Element;
