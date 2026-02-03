import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Topbar, GlassCard, Toggle, Button } from '@novanote/ui';

interface InstalledPlugin {
  id: string;
  name: string;
  enabled: boolean;
  grantedPermissions: string[];
}

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'plugins', label: 'Plugins' },
  { id: 'ai', label: 'AI' },
];

export default function Settings() {
  const [category, setCategory] = useState('general');
  const [pluginsEnabled, setPluginsEnabled] = useState(true);
  const [localAIEnabled, setLocalAIEnabled] = useState(false);
  const [theme, setTheme] = useState('nova-default');
  const [plugins] = useState<InstalledPlugin[]>([
    {
      id: 'hello-panel',
      name: 'Hello Panel',
      enabled: true,
      grantedPermissions: ['app:info', 'app:toast', 'commands:register', 'ui:panel', 'editor:read'],
    },
  ]);

  return (
    <div className="flex flex-col h-screen bg-bg">
      <Topbar className="flex-shrink-0 justify-between border-b border-border/80 backdrop-blur-[var(--nova-blur-panelBlur)] bg-elevated/80 px-4">
        <span className="font-semibold text-accent tracking-tight">NovaNote</span>
        <nav className="flex gap-6 text-sm text-muted">
          <Link to="/home" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Home</Link>
          <Link to="/editor" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Editor</Link>
          <span className="text-text">Settings</span>
        </nav>
      </Topbar>
      <div className="flex flex-1 min-h-0">
        <aside className="w-52 flex-shrink-0 border-r border-border/80 bg-elevated/50 p-4">
          <nav className="space-y-0.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`w-full text-left px-3 py-2.5 rounded-nova-md text-sm transition-colors duration-[var(--nova-motion-fast)] ${
                  category === c.id ? 'bg-accent/15 text-accent font-medium' : 'text-muted hover:text-text hover:bg-elevated/80'
                }`}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-8 max-w-2xl">
          {category === 'general' && (
            <section>
              <h2 className="text-xl font-semibold text-text tracking-tight mb-4">General</h2>
              <p className="text-sm text-muted">App behavior and defaults. (Placeholder.)</p>
            </section>
          )}
          {category === 'appearance' && (
            <section>
              <h2 className="text-xl font-semibold text-text tracking-tight mb-4">Appearance</h2>
              <GlassCard className="border-border/80 mb-4">
                <h3 className="font-medium text-text mb-3">Theme</h3>
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
                <p className="text-xs text-muted mt-2">Apple-dark + nova glow.</p>
              </GlassCard>
            </section>
          )}
          {category === 'plugins' && (
            <section>
              <h2 className="text-xl font-semibold text-text tracking-tight mb-4">Plugins</h2>
              <GlassCard className="border-border/80 mb-4">
                <Toggle
                  label="Enable plugins"
                  checked={pluginsEnabled}
                  onChange={(e) => setPluginsEnabled(e.target.checked)}
                  className="mb-4"
                />
                <div className="space-y-3">
                  {plugins.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between py-3 border-b border-border/80 last:border-0"
                    >
                      <div>
                        <span className="text-text font-medium">{p.name}</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.grantedPermissions.slice(0, 3).map((perm) => (
                            <span
                              key={perm}
                              className="text-xs px-1.5 py-0.5 rounded bg-elevated border border-border/80 text-muted"
                            >
                              {perm}
                            </span>
                          ))}
                          {p.grantedPermissions.length > 3 && (
                            <span className="text-xs text-muted">+{p.grantedPermissions.length - 3}</span>
                          )}
                        </div>
                      </div>
                      <Toggle checked={p.enabled} onChange={() => {}} />
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="mt-4 text-sm">
                  Load plugin from folder (dev)
                </Button>
              </GlassCard>
            </section>
          )}
          {category === 'ai' && (
            <section>
              <h2 className="text-xl font-semibold text-text tracking-tight mb-4">Local AI</h2>
              <GlassCard className="border-border/80">
                <Toggle
                  label="Enable local AI (Ollama)"
                  checked={localAIEnabled}
                  onChange={(e) => setLocalAIEnabled(e.target.checked)}
                  className="mb-3"
                />
                <p className="text-sm text-muted mb-4">
                  When enabled, NovaNote can use Ollama for completions (placeholder).
                </p>
                {localAIEnabled && (
                  <div className="space-y-3 pt-3 border-t border-border/80">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Mode</label>
                      <select className="w-full px-3 py-2 bg-panel border border-border rounded-nova-md text-text text-sm">
                        <option>Inline suggestions</option>
                        <option>Panel</option>
                      </select>
                    </div>
                    <Toggle label="Selection only" checked={false} onChange={() => {}} className="mb-2" />
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Model</label>
                      <select className="w-full px-3 py-2 bg-panel border border-border rounded-nova-md text-text text-sm">
                        <option>— Select model (Ollama) —</option>
                      </select>
                    </div>
                  </div>
                )}
              </GlassCard>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
