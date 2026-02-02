import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from '@novanote/ui';

interface Theme {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
}

export default function ThemeDetail() {
  const { id } = useParams();
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => {
    fetch('/registry/themes.json')
      .then((r) => r.json())
      .then((list: Theme[]) => list.find((t) => t.id === id) ?? null)
      .then(setTheme)
      .catch(() => setTheme(null));
  }, [id]);

  if (!theme) return <div className="text-muted">Loading…</div>;
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text mb-4">{theme.name}</h1>
      <Card>
        <p className="text-muted mb-2">{theme.description}</p>
        <p className="text-sm text-muted">by {theme.author} · v{theme.version}</p>
      </Card>
    </div>
  );
}
