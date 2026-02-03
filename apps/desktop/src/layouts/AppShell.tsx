import { Link, Outlet } from 'react-router-dom';
import { Topbar } from '@novanote/ui';
import { AppSidebar } from '../components/AppSidebar';
import { NotesList } from '../components/NotesList';

export function AppShell() {
  return (
    <div className="flex h-screen flex-col bg-bg">
      <Topbar className="h-12 flex-shrink-0 items-center justify-between border-b border-border/80 backdrop-blur-[var(--nova-blur-panelBlur)] bg-elevated/80 px-4">
        <span className="font-semibold text-accent tracking-tight">NovaNote</span>
        <Link to="/settings" className="text-sm text-muted hover:text-text transition-colors duration-[var(--nova-motion-fast)]">
          Settings
        </Link>
      </Topbar>
      <div className="flex flex-1 min-h-0">
        <AppSidebar />
        <NotesList />
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
