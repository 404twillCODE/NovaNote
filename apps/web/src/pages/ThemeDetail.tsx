import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlassCard } from '@novanote/ui';

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
    <div className="max-w-3xl mx-auto">
      <Link to="/themes" className="text-sm text-muted hover:text-text mb-4 inline-block transition-colors duration-[var(--nova-motion-fast)]">← Themes</Link>
      <h1 className="text-3xl font-bold text-text tracking-tight mb-4">{theme.name}</h1>
      {/* Screenshot area placeholder */}
      <div className="rounded-nova-lg border border-border bg-elevated/50 h-48 flex items-center justify-center text-muted text-sm mb-6">
        Screenshot placeholder
      </div>
      <GlassCard className="border-border/80">
        <p className="text-muted mb-2">{theme.description}</p>
        <p className="text-sm text-muted">by {theme.author} · v{theme.version}</p>
      </GlassCard>
    </div>
  );
}
