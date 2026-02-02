import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-elevated border border-border rounded-nova-lg shadow-nova-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-panel/80 border border-border rounded-nova-lg shadow-nova-md backdrop-blur-nova-panel p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
