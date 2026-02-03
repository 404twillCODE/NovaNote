import type { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width class, default max-w-[1120px] */
  maxWidth?: string;
}

export function Container({
  className = '',
  maxWidth = 'max-w-[1120px]',
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidth} ${className}`} {...props}>
      {children}
    </div>
  );
}
