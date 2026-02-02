import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

export interface NovaRingProps {
  /** Size in px (default 40) */
  size?: number;
  /** Ring stroke width (default 2) */
  strokeWidth?: number;
  className?: string;
  /** Whether to show the pulse (default true) */
  active?: boolean;
}

export function NovaRing({
  size = 40,
  strokeWidth = 2,
  className = '',
  active = true,
}: NovaRingProps) {
  const reduced = useReducedMotion();
  const r = Math.max(0, (size - strokeWidth) / 2);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--nova-colors-accentteal)"
        strokeWidth={strokeWidth}
        strokeOpacity={0.4}
        initial={false}
        animate={active && !reduced ? { opacity: [0.4, 0.8, 0.4] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--nova-colors-accentblue)"
        strokeWidth={strokeWidth * 0.5}
        strokeOpacity={0.5}
        strokeDasharray={`${r * 0.5} ${r * 3.14}`}
        initial={false}
        animate={active && !reduced ? { rotate: 360 } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  );
}
