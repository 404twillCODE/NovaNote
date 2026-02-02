import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 bg-panel border border-border rounded-nova-md text-text placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:border-transparent transition-[var(--nova-motion-fast)] ${className}`}
      {...props}
    />
  );
}
