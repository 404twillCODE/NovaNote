import type { InputHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Toggle({ label, className = '', ...props }: ToggleProps) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="w-10 h-6 rounded-full bg-panel border border-border appearance-none cursor-pointer checked:bg-accent transition-nova-fast transition-nova-ease focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg [&:not(:checked)]:bg-panel"
        style={{ boxShadow: 'inset 0 0 0 2px var(--nova-colors-border)' }}
        {...props}
      />
      {label && <span className="text-text text-sm">{label}</span>}
    </label>
  );
}
