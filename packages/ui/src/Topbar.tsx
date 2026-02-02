import type { HTMLAttributes } from 'react';

export interface TopbarProps extends HTMLAttributes<HTMLElement> {}

export function Topbar({ className = '', children, ...props }: TopbarProps) {
  return (
    <header
      className={`h-12 flex items-center px-4 border-b border-border/80 backdrop-blur-[var(--nova-blur-panelBlur)] bg-elevated/80 ${className}`}
      {...props}
    >
      {children}
    </header>
  );
}
