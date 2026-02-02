import { Routes, Route, Link } from 'react-router-dom';
import { Topbar, PageTransition } from '@novanote/ui';
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
        <span className="font-semibold text-accent tracking-tight">NovaNote</span>
        <nav className="flex gap-6 text-sm text-muted">
          <Link to="/" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Home</Link>
          <Link to="/download" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Download</Link>
          <Link to="/open-source" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Open Source</Link>
          <Link to="/themes" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Themes</Link>
          <Link to="/plugins" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Plugins</Link>
          <Link to="/docs" className="hover:text-text transition-colors duration-[var(--nova-motion-fast)]">Docs</Link>
        </nav>
      </Topbar>
      <main className="p-6 md:p-8">
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/download" element={<PageTransition><Download /></PageTransition>} />
          <Route path="/open-source" element={<PageTransition><OpenSource /></PageTransition>} />
          <Route path="/themes" element={<PageTransition><Themes /></PageTransition>} />
          <Route path="/themes/:id" element={<PageTransition><ThemeDetail /></PageTransition>} />
          <Route path="/plugins" element={<PageTransition><Plugins /></PageTransition>} />
          <Route path="/plugins/:id" element={<PageTransition><PluginDetail /></PageTransition>} />
          <Route path="/docs" element={<PageTransition><Docs /></PageTransition>} />
        </Routes>
      </main>
    </div>
  );
}
