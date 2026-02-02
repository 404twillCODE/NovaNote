import { GlassCard } from '@novanote/ui';

const sections = [
  {
    title: 'Monorepo',
    description: 'Web (marketing + galleries), desktop (Tauri), plugin SDK, design tokens, and core modules.',
    icon: '📦',
  },
  {
    title: 'Plugins & AI',
    description: 'Safe-by-default plugin host. Optional local AI (Ollama) built in, not as a plugin.',
    icon: '🔌',
  },
  {
    title: 'Design system',
    description: 'Apple-dark + nova glow. Shared tokens, theme, and UI across web and desktop.',
    icon: '✨',
  },
];

export default function OpenSource() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-text tracking-tight mb-2">Open Source</h1>
      <p className="text-muted mb-8">NovaNote is open source. Everything in one repo.</p>
      <div className="grid gap-4 sm:grid-cols-1">
        {sections.map((s) => (
          <GlassCard key={s.title} className="border-border/80 flex gap-4 items-start">
            <span className="text-2xl opacity-80" aria-hidden>{s.icon}</span>
            <div>
              <h2 className="font-semibold text-text tracking-tight mb-1">{s.title}</h2>
              <p className="text-sm text-muted">{s.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
