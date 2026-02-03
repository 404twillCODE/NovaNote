import { Link, useLocation } from 'react-router-dom';
import { Input, Button } from '@novanote/ui';

const RECENTS = [
  { id: '1', title: 'Untitled', snippet: 'Start writing...', time: 'Just now', path: '/editor' },
];

export function NotesList() {
  const location = useLocation();
  return (
    <div className="w-[360px] flex-shrink-0 flex flex-col border-r border-border/80 bg-bg/50 overflow-hidden">
      <div className="p-3 border-b border-border/80">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted mb-2">Recents</h2>
        <Input
          placeholder="Search notes..."
          className="text-sm py-2"
        />
      </div>
      <ul className="flex-1 overflow-auto">
        {RECENTS.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
          <li key={item.id}>
            <Link
              to={item.path}
              className={`block px-4 py-3 border-b border-border/60 transition-colors duration-[var(--nova-motion-fast)] ${
                isSelected ? 'bg-accent/10' : 'hover:bg-elevated/60'
              }`}
            >
              <div className="font-medium text-text truncate">{item.title}</div>
              <div className="text-xs text-muted truncate mt-0.5">{item.snippet}</div>
              <div className="text-xs text-muted mt-1">{item.time}</div>
            </Link>
          </li>
          );
        })}
      </ul>
      <div className="p-3 border-t border-border/80">
        <Link to="/editor">
          <Button className="w-full">New Note</Button>
        </Link>
      </div>
    </div>
  );
}
