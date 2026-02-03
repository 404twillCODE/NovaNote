import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlassCard, SectionHeader, ScreenshotFrame } from '@novanote/ui';

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
    <>
      <Link
        to="/themes"
        className="text-sm text-muted hover:text-text mb-6 inline-block transition-colors duration-[var(--nova-motion-fast)]"
      >
        ← Themes
      </Link>
      <div className="grid md:grid-cols-5 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <ScreenshotFrame
            label={theme.name}
            aspect="aspect-[4/3]"
            className="w-full sticky top-24"
          />
        </div>
        <div className="md:col-span-3">
          <h1 className="text-3xl font-semibold text-text tracking-tight mb-4">{theme.name}</h1>
          <p className="text-muted mb-4">{theme.description}</p>
          <p className="text-sm text-muted mb-8">by {theme.author} · v{theme.version}</p>
          <GlassCard className="border-border/80 p-4">
            <h3 className="font-medium text-text mb-2">Install</h3>
            <p className="text-sm text-muted mb-3">
              In NovaNote: Settings → Themes → Install from registry, or drag the theme package into the app.
            </p>
            <code className="text-xs text-muted bg-bg/80 px-2 py-1 rounded-nova-sm block">
              Theme ID: {theme.id}
            </code>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
