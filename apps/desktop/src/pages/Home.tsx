import { Link } from 'react-router-dom';
import { Button, GlassCard, Topbar } from '@novanote/ui';

const recents = [
  { title: 'Untitled', path: '/editor', lastOpened: 'Just now' },
];

const workspaces = [
  { name: 'My Notes', path: 'C:\\Users\\...\\Notes' },
];

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar className="justify-between">
        <span className="font-semibold text-accent tracking-tight">NovaNote</span>
        <nav className="flex gap-6 text-sm text-muted">
          <span className="text-text">Home</span>
          <Link to="/editor" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Editor</Link>
          <Link to="/settings" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Settings</Link>
        </nav>
      </Topbar>
      <main className="flex-1 p-6 overflow-auto max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-text tracking-tight mb-6">Recents & Workspaces</h1>

        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted mb-3 tracking-tight">Recents</h2>
          <div className="space-y-3">
            {recents.map((r) => (
              <Link key={r.path} to={r.path}>
                <GlassCard className="cursor-pointer border-border/80 hover:border-accent/30 transition-colors duration-[var(--nova-motion-fast)]">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-text">{r.title}</span>
                    <span className="text-xs text-muted">{r.lastOpened}</span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted mb-3 tracking-tight">Workspaces</h2>
          <div className="space-y-3">
            {workspaces.map((w) => (
              <GlassCard key={w.name} className="border-border/80">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-text">{w.name}</span>
                  <span className="text-xs text-muted truncate max-w-[200px]">{w.path}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <Link to="/editor">
          <Button>New note</Button>
        </Link>
      </main>
    </div>
  );
}
