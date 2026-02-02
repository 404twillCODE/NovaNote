import { Card } from '@novanote/ui';

export default function OpenSource() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text mb-4">Open Source</h1>
      <Card>
        <p className="text-muted">
          NovaNote is open source. The monorepo includes web (marketing + galleries), desktop (Tauri),
          plugin SDK, design tokens, and core modules for plugins, AI, and storage.
        </p>
      </Card>
    </div>
  );
}
