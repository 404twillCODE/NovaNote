import type { HTMLAttributes } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  width?: string;
}

export function Sidebar({ className = '', children, width = '240px', ...props }: SidebarProps) {
  return (
    <aside
      className={`bg-elevated border-r border-border flex flex-col ${className}`}
      style={{ width }}
      {...props}
    >
      {children}
    </aside>
  );
}
