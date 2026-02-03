import type { HTMLAttributes } from 'react';

export interface ScreenshotFrameProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional label shown inside the frame (e.g. "Preview") */
  label?: string;
  /** Aspect ratio class, default aspect-video */
  aspect?: string;
  children?: React.ReactNode;
}

export function ScreenshotFrame({
  label = 'Screenshot',
  aspect = 'aspect-video',
  className = '',
  children,
  ...props
}: ScreenshotFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-nova-lg border border-border bg-elevated/60 shadow-nova-md backdrop-blur-[var(--nova-blur-panelBlur)] ${aspect} ${className}`}
      {...props}
    >
      {/* Gradient sheen overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
        }}
      />
      {children ?? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-muted">{label}</span>
        </div>
      )}
    </div>
  );
}
