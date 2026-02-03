import type { HTMLAttributes } from 'react';

export interface SplitPaneProps extends HTMLAttributes<HTMLDivElement> {
  /** Left pane content */
  left?: React.ReactNode;
  /** Middle pane content */
  middle?: React.ReactNode;
  /** Right pane content */
  right?: React.ReactNode;
  /** Width of left column (default 260px) */
  leftWidth?: string;
  /** Width of middle column (default 360px) */
  middleWidth?: string;
}

export function SplitPane({
  left,
  middle,
  right,
  leftWidth = '260px',
  middleWidth = '360px',
  className = '',
  children,
  ...props
}: SplitPaneProps) {
  const content = children ?? (
    <>
      {left != null && (
        <div className="flex-shrink-0 border-r border-border/80 bg-elevated/80 backdrop-blur-[var(--nova-blur-panelBlur)] overflow-hidden" style={{ width: leftWidth }}>
          {left}
        </div>
      )}
      {middle != null && (
        <div className="flex-shrink-0 border-r border-border/80 overflow-hidden" style={{ width: middleWidth }}>
          {middle}
        </div>
      )}
      {right != null && <div className="flex-1 min-w-0 overflow-hidden">{right}</div>}
    </>
  );

  return (
    <div className={`flex h-full min-h-0 ${className}`} {...props}>
      {content}
    </div>
  );
}
