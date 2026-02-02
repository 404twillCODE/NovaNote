import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-elevated border border-border rounded-nova-lg shadow-nova-sm p-4 transition-colors duration-[var(--nova-motion-fast)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-panel/50 border border-border/80 rounded-nova-lg shadow-nova-md backdrop-blur-[var(--nova-blur-panelBlur)] p-4 transition-colors duration-[var(--nova-motion-fast)] ${className}`}
      style={{ transitionTimingFunction: 'var(--nova-motion-ease)' }}
      {...props}
    >
      {children}
    </div>
  );
}
