import { Link } from 'react-router-dom';
import { Button, Card, Topbar } from '@novanote/ui';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar className="justify-between">
        <span className="font-semibold text-accent">NovaNote</span>
        <nav className="flex gap-4 text-sm text-muted">
          <Link to="/home" className="hover:text-text">Home</Link>
          <Link to="/editor" className="hover:text-text">Editor</Link>
          <Link to="/settings" className="hover:text-text">Settings</Link>
        </nav>
      </Topbar>
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-text mb-4">Recents & Workspaces</h1>
        <Card className="mb-4">
          <p className="text-muted mb-4">Recents and workspaces (stub: data from storage later).</p>
          <Link to="/editor">
            <Button>New note</Button>
          </Link>
        </Card>
      </main>
    </div>
  );
}
