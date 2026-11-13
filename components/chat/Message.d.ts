import * as React from 'react';

/**
 * A conversation turn. Agent turns are white with a notched top-left; user turns are copper-700.
 * @startingPoint section="Chat" subtitle="Agent and user turns with answer lineage" viewport="700x300"
 */
export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'agent' (default) or 'me'. */
  from?: 'agent' | 'me';
  /** A HexTile identifying the agent. Ignored for 'me'. */
  avatar?: React.ReactNode;
  /** A <Lineage> block. Agent turns only — see the prompt. */
  lineage?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export declare function Message(props: MessageProps): React.JSX.Element;
