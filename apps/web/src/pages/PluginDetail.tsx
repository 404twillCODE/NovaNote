import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlassCard } from '@novanote/ui';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
}

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
    <div className="max-w-3xl mx-auto">
      <Link to="/plugins" className="text-sm text-muted hover:text-text mb-4 inline-block transition-colors duration-[var(--nova-motion-fast)]">← Plugins</Link>
      <h1 className="text-3xl font-bold text-text tracking-tight mb-4">{plugin.name}</h1>
      {/* Screenshot area placeholder */}
      <div className="rounded-nova-lg border border-border bg-elevated/50 h-48 flex items-center justify-center text-muted text-sm mb-6">
        Screenshot placeholder
      </div>
      <GlassCard className="border-border/80">
        <p className="text-muted mb-2">{plugin.description}</p>
        <p className="text-sm text-muted">by {plugin.author} · v{plugin.version}</p>
      </GlassCard>
    </div>
  );
}
