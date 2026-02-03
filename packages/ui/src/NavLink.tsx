import type { AnchorHTMLAttributes } from 'react';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** When true, shows active state (underline/glow) */
  isActive?: boolean;
  children: React.ReactNode;
}

export function NavLink({
  isActive = false,
  className = '',
  children,
  ...props
}: NavLinkProps) {
  return (
    <a
      className={`relative inline-block text-sm transition-colors duration-[var(--nova-motion-fast)] pb-0.5 ${
        isActive ? 'text-text font-medium' : 'text-muted hover:text-text'
      } ${className}`}
      {...props}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full transition-opacity duration-[var(--nova-motion-fast)]"
        style={{ opacity: isActive ? 1 : 0 }}
        aria-hidden
      />
    </a>
  );
}
