import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from '@novanote/ui';

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
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text mb-4">{plugin.name}</h1>
      <Card>
        <p className="text-muted mb-2">{plugin.description}</p>
        <p className="text-sm text-muted">by {plugin.author} · v{plugin.version}</p>
      </Card>
    </div>
  );
}
