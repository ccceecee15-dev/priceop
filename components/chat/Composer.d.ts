import * as React from 'react';

/** The question input. The send affordance is graphite, like every commit action. */
export interface ComposerProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  /** Left-aligned controls — mode menu trigger, attach, scope chip. */
  tools?: React.ReactNode;
  onSend?: () => void;
  className?: string;
}
export declare function Composer(props: ComposerProps): React.JSX.Element;
