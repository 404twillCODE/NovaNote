import { GlassCard, SectionHeader } from '@novanote/ui';

export default function OpenSource() {
  return (
    <>
      <SectionHeader
        eyebrow="Transparency"
        title="Open Source"
        description="NovaNote is open source. Everything in one repo — build, inspect, and contribute."
      />

      <div className="space-y-6 mb-16">
        <GlassCard className="border-border/80">
          <h3 className="font-semibold text-text tracking-tight mb-2">License & governance</h3>
          <p className="text-muted text-base">
            Monorepo with web (marketing + galleries), desktop (Tauri), plugin SDK, design tokens,
            and core modules. One license, one place.
          </p>
        </GlassCard>
        <GlassCard className="border-border/80">
          <h3 className="font-semibold text-text tracking-tight mb-2">Plugin safety model</h3>
          <p className="text-muted text-base">
            Safe-by-default plugin host. Permissions are requested per capability (e.g. app:info, ui:panel, editor:read).
            You see exactly what each plugin can do before enabling.
          </p>
        </GlassCard>
        <GlassCard className="border-border/80">
          <h3 className="font-semibold text-text tracking-tight mb-2">Local-first data model</h3>
          <p className="text-muted text-base">
            Your notes live on your machine. Optional sync and cloud are not required. Local AI (Ollama) built in, not as a plugin.
          </p>
        </GlassCard>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-text tracking-tight mb-4">How to contribute</h2>
        <ol className="list-decimal list-inside space-y-3 text-muted">
          <li>Open issues for bugs or feature ideas.</li>
          <li>Submit PRs for code, docs, or design tweaks.</li>
          <li>Submit themes and plugins to the registry (see Docs).</li>
        </ol>
      </section>
    </>
  );
}
