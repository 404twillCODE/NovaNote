import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard, HoverLift } from '@novanote/ui';

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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-text tracking-tight mb-2">Themes</h1>
      <p className="text-muted mb-8">Apple-dark and nova glow. Pick a theme.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {themes.map((t) => (
          <HoverLift key={t.id} lift={4}>
            <Link to={`/themes/${t.id}`}>
              <GlassCard className="h-full cursor-pointer border-border/80 hover:border-accent/30 transition-colors duration-[var(--nova-motion-fast)]">
                <h2 className="font-semibold text-text tracking-tight mb-2">{t.name}</h2>
                <p className="text-sm text-muted">{t.description}</p>
              </GlassCard>
            </Link>
          </HoverLift>
        ))}
      </div>
    </div>
  );
}
