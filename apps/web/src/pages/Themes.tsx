import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard, HoverLift, SectionHeader, ScreenshotFrame } from '@novanote/ui';

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
    <>
      <SectionHeader
        eyebrow="Design"
        title="Themes"
        description="Apple-dark and nova glow. Pick a theme from the gallery."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((t) => (
          <HoverLift key={t.id} lift={4}>
            <GlassCard className="border-border/80 overflow-hidden group">
              <Link to={`/themes/${t.id}`} className="block">
                <ScreenshotFrame
                  label={t.name}
                  aspect="aspect-video"
                  className="rounded-b-none border-b border-border/80"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-text tracking-tight mb-1">{t.name}</h2>
                  <p className="text-sm text-muted line-clamp-2 mb-2">{t.description}</p>
                  <p className="text-xs text-muted">by {t.author}</p>
                </div>
              </Link>
              <div className="px-4 pb-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--nova-motion-fast)]">
                <button type="button" className="text-sm text-accent hover:underline">
                  Install
                </button>
                <span className="text-muted">·</span>
                <Link to={`/themes/${t.id}`} className="text-sm text-muted hover:text-text">
                  Preview
                </Link>
              </div>
            </GlassCard>
          </HoverLift>
        ))}
      </div>
    </>
  );
}
