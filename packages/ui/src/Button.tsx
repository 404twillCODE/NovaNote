import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-bg font-medium shadow-nova-sm hover:shadow-nova-glow focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-[box-shadow,transform] duration-[var(--nova-motion-fast)] ease-[var(--nova-motion-ease)] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-panel/60 text-text border border-border backdrop-blur-nova-panel hover:bg-panel/80 hover:border-[var(--nova-colors-accentTeal)]/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-[var(--nova-motion-fast)]',
  ghost:
    'bg-transparent text-text hover:bg-elevated/80 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-[var(--nova-motion-fast)]',
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base =
    'px-4 py-2.5 rounded-nova-md focus:outline-none disabled:opacity-50 focus-visible:outline-none';
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
