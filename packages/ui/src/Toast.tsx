import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastProps {
  message: ReactNode;
  visible: boolean;
  type?: 'info' | 'success' | 'error';
}

export function Toast({ message, visible, type = 'info' }: ToastProps) {
  const typeClass =
    type === 'success'
      ? 'border-success/50 text-success'
      : type === 'error'
        ? 'border-danger/50 text-danger'
        : 'border-accent/50 text-accent';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-nova-md shadow-nova-lg border backdrop-blur-[var(--nova-blur-panelBlur)] bg-panel/90 ${typeClass}`}
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
