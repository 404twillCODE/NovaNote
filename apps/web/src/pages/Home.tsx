import { FadeIn } from '@novanote/ui';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <FadeIn>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-text mb-4">NovaNote</h1>
        <p className="text-muted mb-6">
          A modern note-taking app with plugin support, local AI, and a beautiful Apple-dark design.
        </p>
        <div className="flex gap-4">
          <Link to="/download">
            <button className="px-4 py-2 rounded-nova-md bg-accent text-bg font-medium hover:opacity-90">
              Download
            </button>
          </Link>
          <Link to="/open-source">
            <button className="px-4 py-2 rounded-nova-md bg-elevated border border-border text-text hover:bg-panel">
              Open Source
            </button>
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}
