import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@novanote/ui';

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
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text mb-4">Plugins</h1>
      <div className="grid gap-4">
        {plugins.map((p) => (
          <Link key={p.id} to={`/plugins/${p.id}`}>
            <Card className="hover:border-accent transition-nova-fast cursor-pointer">
              <h2 className="font-semibold text-text">{p.name}</h2>
              <p className="text-sm text-muted">{p.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
