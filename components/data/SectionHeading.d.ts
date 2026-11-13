import * as React from 'react';

/** A 15px section title with an optional dimmed count or qualifier beside it. */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** A count, or a short explanatory clause. */
  count?: React.ReactNode;
  className?: string;
}
export declare function SectionHeading(props: SectionHeadingProps): React.JSX.Element;
