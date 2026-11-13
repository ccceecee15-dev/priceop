import * as React from 'react';

/**
 * One guardrail evaluation, shown passing or failing with its numbers.
 * @startingPoint section="Feedback" subtitle="Guardrail checks passing and failing" viewport="700x150"
 */
export interface RuleCheckProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The rule in the user's words, e.g. "Minimum margin after markdown". */
  name: React.ReactNode;
  /** The arithmetic — "limit 30% · actual 30.4% after cut". */
  detail?: React.ReactNode;
  /** Renders the rust failing state. */
  fail?: boolean;
  className?: string;
}
export declare function RuleCheck(props: RuleCheckProps): React.JSX.Element;
