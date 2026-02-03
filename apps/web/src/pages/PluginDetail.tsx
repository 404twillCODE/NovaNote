import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlassCard, SectionHeader, ScreenshotFrame } from '@novanote/ui';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
}

const MOCK_PERMISSIONS = ['app:info', 'app:toast', 'commands:register', 'ui:panel', 'editor:read'];

export default function PluginDetail() {
  const { id } = useParams();
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  useEffect(() => {
    fetch('/registry/plugins.json')
      .then((r) => r.json())
      .then((list: Plugin[]) => list.find((p) => p.id === id) ?? null)
      .then(setPlugin)
      .catch(() => setPlugin(null));
  }, [id]);

  if (!plugin) return <div className="text-muted">Loading…</div>;

  return (
    <>
      <Link
        to="/plugins"
        className="text-sm text-muted hover:text-text mb-6 inline-block transition-colors duration-[var(--nova-motion-fast)]"
      >
        ← Plugins
      </Link>
      <div className="grid md:grid-cols-5 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <ScreenshotFrame
            label={plugin.name}
            aspect="aspect-[4/3]"
            className="w-full sticky top-24"
          />
        </div>
        <div className="md:col-span-3">
          <h1 className="text-3xl font-semibold text-text tracking-tight mb-4">{plugin.name}</h1>
          <p className="text-muted mb-4">{plugin.description}</p>
          <p className="text-sm text-muted mb-8">by {plugin.author} · v{plugin.version}</p>

          <GlassCard className="border-border/80 p-4 mb-6">
            <h3 className="font-medium text-text mb-3">Permissions</h3>
            <p className="text-sm text-muted mb-3">
              This plugin requests the following capabilities. You can revoke or grant when installing.
            </p>
            <ul className="space-y-2">
              {MOCK_PERMISSIONS.map((perm) => (
                <li key={perm} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-success/70 flex-shrink-0" />
                  <code className="text-muted bg-bg/60 px-1.5 py-0.5 rounded">{perm}</code>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="border-border/80 p-4">
            <h3 className="font-medium text-text mb-2">Install</h3>
            <p className="text-sm text-muted">
              In NovaNote: Settings → Plugins → Install from registry, or load from folder (dev).
            </p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
