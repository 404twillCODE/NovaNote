import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from '@novanote/ui';

const NAV = [
  { to: '/home', label: 'Home', icon: '⌂' },
  { to: '/editor', label: 'Editor', icon: '✎' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

const WORKSPACES = [{ name: 'My Notes', path: '/' }];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar width="260px" className="flex-shrink-0 border-r border-border/80 bg-elevated/80 backdrop-blur-[var(--nova-blur-panelBlur)]">
      <div className="p-4 border-b border-border/80">
        <Link
          to="/home"
          className="font-semibold text-accent tracking-tight text-lg hover:opacity-90 transition-opacity duration-[var(--nova-motion-fast)]"
        >
          NovaNote
        </Link>
      </div>
      <nav className="p-2">
        {NAV.map(({ to, label, icon }) => {
          const isActive = to === '/home' ? location.pathname === '/home' : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-nova-md text-sm transition-colors duration-[var(--nova-motion-fast)] ${
                isActive
                  ? 'bg-accent/15 text-accent font-medium'
                  : 'text-muted hover:text-text hover:bg-elevated/80'
              }`}
            >
              <span className="text-base opacity-80" aria-hidden>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border/80 my-2" />
      <div className="p-2">
        <p className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted">Workspaces</p>
        {WORKSPACES.map((w) => (
          <button
            key={w.name}
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-nova-md text-sm text-muted hover:text-text hover:bg-elevated/80 text-left transition-colors duration-[var(--nova-motion-fast)]"
          >
            <span className="text-base opacity-80" aria-hidden>📁</span>
            {w.name}
          </button>
        ))}
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-nova-md text-sm text-muted hover:text-text hover:bg-elevated/80 text-left transition-colors duration-[var(--nova-motion-fast)] mt-1"
        >
          <span className="text-base opacity-80" aria-hidden>+</span>
          New Workspace
        </button>
      </div>
    </Sidebar>
  );
}
