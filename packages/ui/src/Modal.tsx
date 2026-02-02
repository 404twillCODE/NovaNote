import type { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-elevated border border-border rounded-nova-lg shadow-nova-lg p-6 min-w-[320px] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-text font-semibold text-lg mb-4">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
