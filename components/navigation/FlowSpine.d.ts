import * as React from 'react';

/**
 * The workflow spine: Connect, Profile, Assess, Ask, Act — with position shown.
 * @startingPoint section="Navigation" subtitle="Workflow spine with done and current steps" viewport="700x110"
 */
export interface FlowStep {
  id?: string;
  label: React.ReactNode;
  /** Ticked green. Ignored on the current step. */
  done?: boolean;
}
export interface FlowSpineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: FlowStep[];
  /** The id of the step the user is on. */
  current?: string;
  /** Content pinned outside the scrolling spine — normally the scope label. */
  aside?: React.ReactNode;
  className?: string;
}
export declare function FlowSpine(props: FlowSpineProps): React.JSX.Element;
