import * as React from 'react';

/** A keyboard shortcut chip, set in JetBrains Mono. */
export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}
export declare function Kbd(props: KbdProps): React.JSX.Element;
