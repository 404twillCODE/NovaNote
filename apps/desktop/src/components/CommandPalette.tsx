import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@novanote/ui';

const APP_COMMANDS = [
  { id: 'home', label: 'Go to Home', path: '/home', group: 'App' },
  { id: 'editor', label: 'New note', path: '/editor', group: 'App' },
  { id: 'settings', label: 'Open Settings', path: '/settings', group: 'App' },
];

const PLUGIN_COMMANDS = [
  { id: 'hello-panel', label: 'Open Hello Panel', group: 'Plugins' },
];

const ALL_COMMANDS = [...APP_COMMANDS, ...PLUGIN_COMMANDS];

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

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const filtered = query.trim()
    ? ALL_COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_COMMANDS;

  const byGroup = filtered.reduce<Record<string, typeof ALL_COMMANDS>>((acc, c) => {
    const g = c.group ?? 'Other';
    if (!acc[g]) acc[g] = [];
    acc[g].push(c);
    return acc;
  }, {});
  const flatIndex: (typeof ALL_COMMANDS)[][] = Object.values(byGroup);
  const flatList = flatIndex.flat();
  const safeHighlight = Math.min(highlight, Math.max(0, flatList.length - 1));
  const currentItem = flatList[safeHighlight];

  const runCommand = useCallback(
    (cmd: (typeof ALL_COMMANDS)[0]) => {
      if ('path' in cmd && cmd.path) navigate(cmd.path);
      onClose();
      setQuery('');
      setHighlight(0);
    },
    [navigate, onClose]
  );

  useEffect(() => {
    if (!open) return;
    setHighlight(0);
    setQuery('');
  }, [open]);


  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, Math.max(0, flatList.length - 1)));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === 'Enter' && currentItem) {
        e.preventDefault();
        runCommand(currentItem);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, currentItem, flatList.length, onClose, runCommand]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <motion.div
          className="w-full max-w-lg bg-elevated/95 border border-border rounded-nova-lg shadow-nova-lg overflow-hidden backdrop-blur-[var(--nova-blur-panelBlur)]"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: reduced ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -4 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="p-2 border-b border-border/80">
            <Input
              placeholder="Search commands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent focus:ring-0"
              autoFocus
            />
          </div>
          <div className="max-h-72 overflow-auto py-2">
            {Object.entries(byGroup).map(([group, items]) => (
              <div key={group} className="mb-2">
                <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
                  {group}
                </p>
                {items.map((cmd) => {
                  const index = flatList.indexOf(cmd);
                  const isHighlight = index === safeHighlight;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => runCommand(cmd)}
                      onMouseEnter={() => setHighlight(index)}
                      className={`w-full text-left px-3 py-2.5 text-sm transition-colors duration-[var(--nova-motion-fast)] ${
                        isHighlight ? 'bg-accent/15 text-accent' : 'text-text hover:bg-elevated/80'
                      }`}
                    >
                      {cmd.label}
                    </button>
                  );
                })}
              </div>
            ))}
            {flatList.length === 0 && (
              <p className="px-3 py-4 text-sm text-muted">No commands match.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
