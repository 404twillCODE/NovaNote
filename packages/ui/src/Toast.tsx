import type { ReactNode } from 'react';

export interface ToastProps {
  message: ReactNode;
  visible: boolean;
  type?: 'info' | 'success' | 'error';
}

export function Toast({ message, visible, type = 'info' }: ToastProps) {
  if (!visible) return null;
  const typeClass =
    type === 'success'
      ? 'border-success text-success'
      : type === 'error'
        ? 'border-danger text-danger'
        : 'border-accent text-accent';
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 bg-elevated border rounded-nova-md shadow-nova-lg ${typeClass}`}
      role="status"
    >
      {message}
    </div>
  );
}
