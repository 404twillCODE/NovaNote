import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Topbar, PageTransition, Container } from '@novanote/ui';

import Home from './pages/Home';
import Download from './pages/Download';
import OpenSource from './pages/OpenSource';
import Themes from './pages/Themes';
import ThemeDetail from './pages/ThemeDetail';
import Plugins from './pages/Plugins';
import PluginDetail from './pages/PluginDetail';
import Docs from './pages/Docs';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/download', label: 'Download' },
  { to: '/open-source', label: 'Open Source' },
  { to: '/themes', label: 'Themes' },
  { to: '/plugins', label: 'Plugins' },
  { to: '/docs', label: 'Docs' },
];

function NavLinks() {
  const location = useLocation();
  return (
    <nav className="flex items-center gap-8">
      {NAV_LINKS.map(({ to, label }) => {
        const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`relative py-4 text-sm transition-colors duration-[var(--nova-motion-fast)] ${
              isActive ? 'text-text font-medium' : 'text-muted hover:text-text'
            }`}
          >
            {label}
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full transition-opacity duration-[var(--nova-motion-fast)]"
              style={{ opacity: isActive ? 1 : 0 }}
              aria-hidden
            />
          </Link>
        );
      })}
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Topbar className="sticky top-0 z-40 justify-between border-b border-border/60 backdrop-blur-[var(--nova-blur-panelBlur)] bg-elevated/70">
        <Link to="/" className="font-semibold text-accent tracking-tight hover:opacity-90 transition-opacity duration-[var(--nova-motion-fast)]">
          NovaNote
        </Link>
        <NavLinks />
      </Topbar>
      <main className="py-12 md:py-16 lg:py-20">
        <Container className="space-y-[72px] md:space-y-[96px]">
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
        </Container>
      </main>
    </div>
  );
}
