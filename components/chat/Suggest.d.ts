import * as React from 'react';

/** A starter-question card for an empty conversation. */
export interface SuggestProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** A 16px copper icon. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export declare function Suggest(props: SuggestProps): React.JSX.Element;
