import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Topbar, Card, Toggle, Button } from '@novanote/ui';

interface InstalledPlugin {
  id: string;
  name: string;
  enabled: boolean;
  grantedPermissions: string[];
  needsPermission?: boolean;
}

export default function Settings() {
  const [pluginsEnabled, setPluginsEnabled] = useState(true);
  const [localAIEnabled, setLocalAIEnabled] = useState(false);
  const [plugins] = useState<InstalledPlugin[]>([
    { id: 'hello-panel', name: 'Hello Panel', enabled: true, grantedPermissions: ['app:info', 'app:toast', 'commands:register', 'ui:panel', 'editor:read'] },
  ]);

  return (
    <div className="flex flex-col h-screen">
      <Topbar className="justify-between">
        <span className="font-semibold text-accent">NovaNote</span>
        <nav className="flex gap-4 text-sm text-muted">
          <Link to="/home" className="hover:text-text">Home</Link>
          <Link to="/editor" className="hover:text-text">Editor</Link>
          <span className="text-text">Settings</span>
        </nav>
      </Topbar>
      <main className="flex-1 p-6 overflow-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-text mb-6">Settings</h1>

        <Card className="mb-6">
          <h2 className="font-semibold text-text mb-4">Themes</h2>
          <p className="text-sm text-muted">Nova Default (only option for now).</p>
        </Card>

        <Card className="mb-6">
          <h2 className="font-semibold text-text mb-4">Plugins</h2>
          <Toggle label="Enable plugins" checked={pluginsEnabled} onChange={(e) => setPluginsEnabled(e.target.checked)} className="mb-4" />
          <div className="space-y-2 mb-4">
            {plugins.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-text">{p.name}</span>
                <Toggle checked={p.enabled} onChange={() => {}} />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mb-2">Permissions: shown per plugin (data-only for now).</p>
          <Button variant="secondary" className="text-sm">Load plugin from folder (dev)</Button>
        </Card>

        <Card className="mb-6">
          <h2 className="font-semibold text-text mb-4">Local AI</h2>
          <Toggle label="Enable local AI (Ollama)" checked={localAIEnabled} onChange={(e) => setLocalAIEnabled(e.target.checked)} />
          <p className="text-sm text-muted mt-2">When enabled, NovaNote can use Ollama for completions (placeholder).</p>
        </Card>
      </main>
    </div>
  );
}
