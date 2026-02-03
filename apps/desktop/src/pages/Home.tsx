import { Link } from 'react-router-dom';
import { Button } from '@novanote/ui';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <h1 className="text-2xl font-semibold text-text tracking-tight mb-2">Recents & Workspaces</h1>
      <p className="text-muted text-sm max-w-sm mb-6">
        Your recent notes appear in the list. Open one to edit, or create a new note.
      </p>
      <Link to="/editor">
        <Button>New note</Button>
      </Link>
    </div>
  );
}
