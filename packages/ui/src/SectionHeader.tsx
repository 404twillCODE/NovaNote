import type { HTMLAttributes } from 'react';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
  ...props
}: SectionHeaderProps) {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-wider text-muted mb-2">{eyebrow}</p>
      )}
      <h2 className="text-[28px] sm:text-[34px] font-semibold text-text tracking-tight leading-tight">
        {title}
      </h2>
      {description && <p className="mt-3 text-base text-muted max-w-2xl">{description}</p>}
    </div>
  );
}
