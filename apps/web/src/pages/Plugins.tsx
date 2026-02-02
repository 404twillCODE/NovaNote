import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard, HoverLift } from '@novanote/ui';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
}

export default function Plugins() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  useEffect(() => {
    fetch('/registry/plugins.json')
      .then((r) => r.json())
      .then(setPlugins)
      .catch(() => setPlugins([]));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-text tracking-tight mb-2">Plugins</h1>
      <p className="text-muted mb-8">Extend NovaNote. Panels, commands, safe by default.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {plugins.map((p) => (
          <HoverLift key={p.id} lift={4}>
            <Link to={`/plugins/${p.id}`}>
              <GlassCard className="h-full cursor-pointer border-border/80 hover:border-accent/30 transition-colors duration-[var(--nova-motion-fast)]">
                <h2 className="font-semibold text-text tracking-tight mb-2">{p.name}</h2>
                <p className="text-sm text-muted">{p.description}</p>
              </GlassCard>
            </Link>
          </HoverLift>
        ))}
      </div>
    </div>
  );
}
