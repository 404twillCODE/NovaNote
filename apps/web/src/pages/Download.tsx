import { Link } from 'react-router-dom';
import { Button, GlassCard } from '@novanote/ui';

export default function Download() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-text tracking-tight mb-2">Download NovaNote</h1>
      <p className="text-muted mb-6">Desktop app built with Tauri. Fast and native.</p>
      <GlassCard className="mb-6 border-border/80">
        <p className="text-muted mb-4">
          Download the installer for your platform. Or build from source.
        </p>
        <p className="text-sm text-muted mb-4">
          Build from source: <code className="text-text px-1.5 py-0.5 rounded bg-elevated">pnpm build:desktop</code>
        </p>
        <Link to="/">
          <Button>Get NovaNote</Button>
        </Link>
      </GlassCard>
    </div>
  );
}
