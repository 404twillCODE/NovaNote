import { Link } from 'react-router-dom';
import { Button, GlassCard, HoverLift } from '@novanote/ui';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <section className="py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-text tracking-tight mb-4">
          NovaNote
        </h1>
        <p className="text-lg text-muted mb-8 max-w-xl">
          Premium note-taking with plugins, local AI, and a beautiful Apple-dark design. Minimal. Powerful.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/download">
            <Button>Download</Button>
          </Link>
          <Link to="/open-source">
            <Button variant="secondary">Open Source</Button>
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid gap-4 sm:grid-cols-3 pt-8">
        <HoverLift lift={4}>
          <Link to="/download">
            <GlassCard className="h-full cursor-pointer border-border/80 hover:border-accent/30 transition-colors duration-[var(--nova-motion-fast)]">
              <h3 className="font-semibold text-text tracking-tight mb-2">Recents</h3>
              <p className="text-sm text-muted">Pick up where you left off. Your notes, always at hand.</p>
            </GlassCard>
          </Link>
        </HoverLift>
        <HoverLift lift={4}>
          <Link to="/themes">
            <GlassCard className="h-full cursor-pointer border-border/80 hover:border-accent/30 transition-colors duration-[var(--nova-motion-fast)]">
              <h3 className="font-semibold text-text tracking-tight mb-2">Themes</h3>
              <p className="text-sm text-muted">Nova Default and more. Apple-dark, nova glow.</p>
            </GlassCard>
          </Link>
        </HoverLift>
        <HoverLift lift={4}>
          <Link to="/plugins">
            <GlassCard className="h-full cursor-pointer border-border/80 hover:border-accent/30 transition-colors duration-[var(--nova-motion-fast)]">
              <h3 className="font-semibold text-text tracking-tight mb-2">Plugins</h3>
              <p className="text-sm text-muted">Extend with panels and commands. Safe by default.</p>
            </GlassCard>
          </Link>
        </HoverLift>
      </section>
    </div>
  );
}
