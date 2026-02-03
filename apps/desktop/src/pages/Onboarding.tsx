import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Button, GlassCard, Toggle, Input, PageTransition } from '@novanote/ui';

const STEPS = [
  { path: '', label: 'Welcome' },
  { path: 'workspace', label: 'Workspace' },
  { path: 'theme', label: 'Theme' },
  { path: 'toggles', label: 'Options' },
  { path: 'finish', label: 'Finish' },
];

function Stepper({ currentIndex }: { currentIndex: number }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Progress">
      {STEPS.map((step, i) => (
        <div
          key={step.path}
          className={`flex items-center gap-3 rounded-nova-md px-3 py-2 text-sm transition-colors duration-[var(--nova-motion-fast)] ${
            i === currentIndex ? 'bg-accent/15 text-accent font-medium' : 'text-muted hover:text-text'
          }`}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
            {i < currentIndex ? '✓' : i + 1}
          </span>
          {step.label}
        </div>
      ))}
    </nav>
  );
}

function Welcome() {
  const nav = useNavigate();
  return (
    <PageTransition>
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-text tracking-tight mb-3">Welcome to NovaNote</h1>
        <p className="text-muted mb-8">Set up your workspace in a few steps. Premium, minimal.</p>
        <Button onClick={() => nav('/onboarding/workspace')}>Get started</Button>
      </div>
    </PageTransition>
  );
}

function PickWorkspace() {
  const nav = useNavigate();
  const [path, setPath] = useState('');
  return (
    <PageTransition>
      <h1 className="text-2xl font-semibold text-text tracking-tight mb-2">Pick workspace folder</h1>
      <p className="text-muted mb-4 text-sm">Choose a folder for your notes (stub: path stored as string).</p>
      <Input
        placeholder="C:\Users\...\Notes"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="mb-6"
      />
      <div className="flex gap-3">
        <Button onClick={() => nav('/onboarding/theme')}>Next</Button>
        <Button variant="secondary" onClick={() => nav('/onboarding')}>Back</Button>
      </div>
    </PageTransition>
  );
}

function ChooseTheme() {
  const nav = useNavigate();
  return (
    <PageTransition>
      <h1 className="text-2xl font-semibold text-text tracking-tight mb-2">Choose theme</h1>
      <p className="text-muted mb-4 text-sm">Nova Default — Apple-dark with nova glow.</p>
      <GlassCard className="mb-6 p-4 border-accent/40 cursor-default">
        <span className="font-medium text-text">Nova Default</span>
      </GlassCard>
      <div className="flex gap-3">
        <Button onClick={() => nav('/onboarding/toggles')}>Next</Button>
        <Button variant="secondary" onClick={() => nav('/onboarding/workspace')}>Back</Button>
      </div>
    </PageTransition>
  );
}

function Toggles() {
  const nav = useNavigate();
  const [plugins, setPlugins] = useState(true);
  const [localAI, setLocalAI] = useState(false);
  return (
    <PageTransition>
      <h1 className="text-2xl font-semibold text-text tracking-tight mb-2">Optional</h1>
      <p className="text-muted mb-6 text-sm">Enable plugins and local AI.</p>
      <div className="space-y-4 mb-6">
        <Toggle label="Enable plugins" checked={plugins} onChange={(e) => setPlugins(e.target.checked)} />
        <Toggle label="Enable local AI (Ollama)" checked={localAI} onChange={(e) => setLocalAI(e.target.checked)} />
      </div>
      <div className="flex gap-3">
        <Button onClick={() => nav('/onboarding/finish')}>Next</Button>
        <Button variant="secondary" onClick={() => nav('/onboarding/theme')}>Back</Button>
      </div>
    </PageTransition>
  );
}

function Finish() {
  const nav = useNavigate();
  return (
    <PageTransition>
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-text tracking-tight mb-3">You're all set</h1>
        <p className="text-muted mb-8">Start writing notes.</p>
        <Button onClick={() => nav('/home')}>Finish</Button>
      </div>
    </PageTransition>
  );
}

export default function Onboarding() {
  const location = useLocation();
  const path = location.pathname.replace('/onboarding', '').replace(/^\//, '') || '';
  const currentIndex = STEPS.findIndex((s) => s.path === path);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg">
      <GlassCard className="w-full max-w-2xl border-border/80 bg-panel/50 backdrop-blur-[var(--nova-blur-panelBlur)] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-56 flex-shrink-0 p-6 border-b md:border-b-0 md:border-r border-border/80">
            <Stepper currentIndex={currentIndex >= 0 ? currentIndex : 0} />
          </div>
          <div className="flex-1 p-8 md:p-10">
            <Routes>
              <Route index element={<Welcome />} />
              <Route path="workspace" element={<PickWorkspace />} />
              <Route path="theme" element={<ChooseTheme />} />
              <Route path="toggles" element={<Toggles />} />
              <Route path="finish" element={<Finish />} />
            </Routes>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
