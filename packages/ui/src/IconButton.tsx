import type { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label (required for icon-only buttons) */
  'aria-label': string;
  children: React.ReactNode;
}

export function IconButton({
  className = '',
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-nova-md text-muted hover:text-text hover:bg-elevated/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-[var(--nova-motion-fast)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
