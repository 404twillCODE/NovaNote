import { Card } from '@novanote/ui';

export default function Download() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text mb-4">Download NovaNote</h1>
      <Card className="mb-4">
        <p className="text-muted mb-4">
          NovaNote desktop is built with Tauri. Download the installer for your platform.
        </p>
        <p className="text-sm text-muted">
          Build from source: <code className="text-text">pnpm build:desktop</code>
        </p>
      </Card>
    </div>
  );
}
