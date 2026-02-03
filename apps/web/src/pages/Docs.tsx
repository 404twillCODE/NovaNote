import { SectionHeader, GlassCard } from '@novanote/ui';

export default function Docs() {
  return (
    <>
      <SectionHeader
        eyebrow="Reference"
        title="Documentation"
        description="Plugin format, themes, and API reference."
      />
      <GlassCard className="border-border/80">
        <p className="text-muted">
          Docs index. Plugin format, themes, and API reference will live here.
        </p>
      </GlassCard>
    </>
  );
}
