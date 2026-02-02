import type { HTMLAttributes } from 'react';

export interface TopbarProps extends HTMLAttributes<HTMLElement> {}

export function Topbar({ className = '', children, ...props }: TopbarProps) {
  return (
    <header
      className={`h-12 bg-elevated border-b border-border flex items-center px-4 ${className}`}
      {...props}
    >
      {children}
    </header>
  );
}
