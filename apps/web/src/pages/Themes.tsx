import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@novanote/ui';

interface Theme {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
}

export default function Themes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  useEffect(() => {
    fetch('/registry/themes.json')
      .then((r) => r.json())
      .then(setThemes)
      .catch(() => setThemes([]));
  }, []);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text mb-4">Themes</h1>
      <div className="grid gap-4">
        {themes.map((t) => (
          <Link key={t.id} to={`/themes/${t.id}`}>
            <Card className="hover:border-accent transition-nova-fast cursor-pointer">
              <h2 className="font-semibold text-text">{t.name}</h2>
              <p className="text-sm text-muted">{t.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
