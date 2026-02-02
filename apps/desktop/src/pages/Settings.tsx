import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Topbar, GlassCard, Toggle, Button } from '@novanote/ui';

interface InstalledPlugin {
  id: string;
  name: string;
  enabled: boolean;
  grantedPermissions: string[];
}

export default function Settings() {
  const [pluginsEnabled, setPluginsEnabled] = useState(true);
  const [localAIEnabled, setLocalAIEnabled] = useState(false);
  const [theme, setTheme] = useState('nova-default');
  const [plugins] = useState<InstalledPlugin[]>([
    { id: 'hello-panel', name: 'Hello Panel', enabled: true, grantedPermissions: ['app:info', 'app:toast', 'commands:register', 'ui:panel', 'editor:read'] },
  ]);

  return (
    <div className="flex flex-col h-screen">
      <Topbar className="justify-between">
        <span className="font-semibold text-accent tracking-tight">NovaNote</span>
        <nav className="flex gap-6 text-sm text-muted">
          <Link to="/home" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Home</Link>
          <Link to="/editor" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Editor</Link>
          <span className="text-text">Settings</span>
        </nav>
      </Topbar>
      <main className="flex-1 p-6 overflow-auto max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-text tracking-tight mb-6">Settings</h1>

        <GlassCard className="mb-6 border-border/80">
          <h2 className="font-semibold text-text tracking-tight mb-4">Themes</h2>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setTheme('nova-default')}
              className={`w-full text-left px-4 py-3 rounded-nova-md border transition-colors duration-[var(--nova-motion-fast)] ${
                theme === 'nova-default'
                  ? 'border-accent/50 bg-accent/10 text-text'
                  : 'border-border/80 hover:border-border text-text'
              }`}
            >
              Nova Default
            </button>
          </div>
          <p className="text-xs text-muted mt-2">Only default for now. Apple-dark + nova glow.</p>
        </GlassCard>

        <GlassCard className="mb-6 border-border/80">
          <h2 className="font-semibold text-text tracking-tight mb-4">Plugins</h2>
          <Toggle label="Enable plugins" checked={pluginsEnabled} onChange={(e) => setPluginsEnabled(e.target.checked)} className="mb-4" />
          <div className="space-y-2 mb-4">
            {plugins.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/80 last:border-0">
                <span className="text-text">{p.name}</span>
                <Toggle checked={p.enabled} onChange={() => {}} />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mb-3">Permissions: shown per plugin (data-only for now).</p>
          <Button variant="secondary" className="text-sm">Load plugin from folder (dev)</Button>
        </GlassCard>

        <GlassCard className="mb-6 border-border/80">
          <h2 className="font-semibold text-text tracking-tight mb-4">Local AI</h2>
          <Toggle label="Enable local AI (Ollama)" checked={localAIEnabled} onChange={(e) => setLocalAIEnabled(e.target.checked)} />
          <p className="text-sm text-muted mt-2">When enabled, NovaNote can use Ollama for completions (placeholder).</p>
        </GlassCard>
      </main>
    </div>
  );
}
