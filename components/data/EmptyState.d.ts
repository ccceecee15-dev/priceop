import * as React from 'react';

/** A dashed-border placeholder for a list with nothing in it. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}
export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;
