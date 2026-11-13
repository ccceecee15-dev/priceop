import * as React from 'react';

/** The signed-in user block, pinned to the bottom of the nav rail. */
export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode;
  email?: React.ReactNode;
  initials: string;
  /** A short role tag, e.g. "ADMIN". */
  role?: React.ReactNode;
  className?: string;
}
export declare function UserCard(props: UserCardProps): React.JSX.Element;
