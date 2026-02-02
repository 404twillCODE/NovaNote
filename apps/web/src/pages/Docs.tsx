import { GlassCard } from '@novanote/ui';

export default function Docs() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-text tracking-tight mb-2">Documentation</h1>
      <p className="text-muted mb-6">Plugin format, themes, and API reference.</p>
      <GlassCard className="border-border/80">
        <p className="text-muted">
          Docs index. Plugin format, themes, and API reference will live here.
        </p>
      </GlassCard>
    </div>
  );
}
