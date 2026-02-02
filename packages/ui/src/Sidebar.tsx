import type { HTMLAttributes } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  width?: string;
}

export function Sidebar({ className = '', children, width = '240px', ...props }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col border-r border-border/80 backdrop-blur-[var(--nova-blur-panelBlur)] bg-elevated/80 ${className}`}
      style={{ width }}
      {...props}
    >
      {children}
    </aside>
  );
}
