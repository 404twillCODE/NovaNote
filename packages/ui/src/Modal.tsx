import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.div
            className="bg-panel/90 border border-border rounded-nova-lg shadow-nova-lg p-6 min-w-[320px] max-w-md backdrop-blur-[var(--nova-blur-panelBlur)]"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 4 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {title && (
              <h2 className="text-text font-semibold text-lg tracking-tight mb-4">{title}</h2>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
