import * as React from 'react';

/**
 * A large tappable option row — title, description, optional hexagon.
 * @startingPoint section="Feedback" subtitle="Option rows for a modal choice" viewport="700x180"
 */
export interface ChoiceProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Normally a small HexTile. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Say what picking this does — one clause. */
  desc?: React.ReactNode;
  className?: string;
}
export declare function Choice(props: ChoiceProps): React.JSX.Element;
