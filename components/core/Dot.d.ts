import * as React from 'react';

/** A 6px status dot that inherits currentColor. Use inside Badge or beside a label. */
export interface DotProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}
export declare function Dot(props: DotProps): React.JSX.Element;
