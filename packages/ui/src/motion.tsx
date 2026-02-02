import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ease = [0.2, 0.8, 0.2, 1] as const;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return reduced;
}

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 0.24,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  /** Lift in px (default 3) */
  lift?: number;
}

export function HoverLift({ children, className = '', lift = 3 }: HoverLiftProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -lift }}
      transition={{ duration: 0.12, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.24, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface SlidePanelProps {
  children: React.ReactNode;
  open: boolean;
  from?: 'left' | 'right';
  className?: string;
}

export function SlidePanel({ children, open, from = 'right', className = '' }: SlidePanelProps) {
  const reduced = useReducedMotion();
  const x = from === 'right' ? '100%' : '-100%';
  return (
    <motion.div
      initial={false}
      animate={{
        x: open ? 0 : (reduced ? 0 : x),
        opacity: open ? 1 : (reduced ? 0 : 0.98),
      }}
      transition={{ duration: reduced ? 0 : 0.24, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
