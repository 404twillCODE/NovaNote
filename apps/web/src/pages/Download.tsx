import { useState } from 'react';
import { Button, GlassCard, SectionHeader } from '@novanote/ui';

const PLATFORMS = [
  {
    id: 'windows',
    name: 'Windows',
    icon: '🪟',
    description: 'Windows 10/11',
    primaryLabel: 'Download for Windows',
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: '🍎',
    description: 'Apple Silicon & Intel',
    primaryLabel: 'Download for macOS',
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: '🐧',
    description: 'AppImage / build from source',
    primaryLabel: 'Download for Linux',
  },
];

export default function Download() {
  const [checksumsOpen, setChecksumsOpen] = useState(false);

  return (
    <>
      <SectionHeader
        eyebrow="Desktop"
        title="Download NovaNote"
        description="Desktop app built with Tauri. Fast and native. Pick your platform."
      />

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {PLATFORMS.map((p) => (
          <GlassCard key={p.id} className="border-border/80 flex flex-col">
            <div className="text-2xl mb-3" aria-hidden>{p.icon}</div>
            <h3 className="font-semibold text-text tracking-tight mb-1">{p.name}</h3>
            <p className="text-sm text-muted mb-4">{p.description}</p>
            <div className="mt-auto space-y-2">
              <Button className="w-full">{p.primaryLabel}</Button>
              <button
                type="button"
                className="w-full text-sm text-muted hover:text-text transition-colors duration-[var(--nova-motion-fast)]"
              >
                Release notes
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="border-border/80 mb-12">
        <button
          type="button"
          onClick={() => setChecksumsOpen((o) => !o)}
          className="w-full flex items-center justify-between text-left py-2"
        >
          <span className="font-medium text-text">Checksums</span>
          <span className="text-muted text-sm">{checksumsOpen ? '▼' : '▶'}</span>
        </button>
        {checksumsOpen && (
          <div className="pt-2 border-t border-border/80 text-sm text-muted font-mono">
            Placeholder: SHA256 checksums for each build will be listed here.
          </div>
        )}
      </GlassCard>

      <section>
        <h2 className="text-xl font-semibold text-text tracking-tight mb-3">Install experience</h2>
        <p className="text-muted max-w-2xl">
          After installing, NovaNote will open to a short onboarding flow: choose a workspace folder,
          pick a theme, and optionally enable plugins and local AI. You can change these later in Settings.
        </p>
      </section>
    </>
  );
}
