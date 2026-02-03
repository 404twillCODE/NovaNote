import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard, HoverLift, SectionHeader, ScreenshotFrame } from '@novanote/ui';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
}

const CATEGORY_CHIPS = ['All', 'Panels', 'Commands', 'Themes'];

export default function Plugins() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [category, setCategory] = useState('All');
  useEffect(() => {
    fetch('/registry/plugins.json')
      .then((r) => r.json())
      .then(setPlugins)
      .catch(() => setPlugins([]));
  }, []);

  return (
    <>
      <SectionHeader
        eyebrow="Extend"
        title="Plugins"
        description="Extend NovaNote with panels, commands, and more. Safe by default."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORY_CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-[var(--nova-motion-fast)] ${
              category === c
                ? 'bg-accent/20 text-accent border border-accent/40'
                : 'bg-elevated/60 text-muted border border-border/80 hover:text-text hover:border-border'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map((p) => (
          <HoverLift key={p.id} lift={4}>
            <Link to={`/plugins/${p.id}`}>
              <GlassCard className="h-full border-border/80 hover:border-accent/30 transition-colors duration-[var(--nova-motion-fast)]">
                <ScreenshotFrame
                  label={p.name}
                  aspect="aspect-video"
                  className="rounded-b-none border-b border-border/80"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-text tracking-tight mb-1">{p.name}</h2>
                  <p className="text-sm text-muted line-clamp-2">{p.description}</p>
                  <p className="text-xs text-muted mt-2">by {p.author}</p>
                </div>
              </GlassCard>
            </Link>
          </HoverLift>
        ))}
      </div>
    </>
  );
}
