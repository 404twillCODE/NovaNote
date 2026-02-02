import { Routes, Route, Link } from 'react-router-dom';
import { Topbar } from '@novanote/ui';
import Home from './pages/Home';
import Download from './pages/Download';
import OpenSource from './pages/OpenSource';
import Themes from './pages/Themes';
import ThemeDetail from './pages/ThemeDetail';
import Plugins from './pages/Plugins';
import PluginDetail from './pages/PluginDetail';
import Docs from './pages/Docs';

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Topbar className="justify-between">
        <span className="font-semibold text-accent">NovaNote</span>
        <nav className="flex gap-4 text-sm text-muted">
          <Link to="/" className="hover:text-text">Home</Link>
          <Link to="/download" className="hover:text-text">Download</Link>
          <Link to="/open-source" className="hover:text-text">Open Source</Link>
          <Link to="/themes" className="hover:text-text">Themes</Link>
          <Link to="/plugins" className="hover:text-text">Plugins</Link>
          <Link to="/docs" className="hover:text-text">Docs</Link>
        </nav>
      </Topbar>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/open-source" element={<OpenSource />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/themes/:id" element={<ThemeDetail />} />
          <Route path="/plugins" element={<Plugins />} />
          <Route path="/plugins/:id" element={<PluginDetail />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
    </div>
  );
}
