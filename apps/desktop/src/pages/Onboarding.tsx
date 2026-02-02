import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Card, Toggle, Input } from '@novanote/ui';

function Welcome() {
  const nav = useNavigate();
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold text-text mb-4">Welcome to NovaNote</h1>
      <p className="text-muted mb-6">Set up your workspace in a few steps.</p>
      <Button onClick={() => nav('/onboarding/workspace')}>Get started</Button>
    </div>
  );
}

function PickWorkspace() {
  const nav = useNavigate();
  const [path, setPath] = useState('');
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold text-text mb-4">Pick workspace folder</h1>
      <p className="text-muted mb-4">Choose a folder for your notes (stub: path is stored as string).</p>
      <Input
        placeholder="C:\Users\...\Notes"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="mb-4"
      />
      <div className="flex gap-4">
        <Button onClick={() => nav('/onboarding/theme')}>Next</Button>
        <Button variant="secondary" onClick={() => nav('/onboarding')}>Back</Button>
      </div>
    </div>
  );
}

function ChooseTheme() {
  const nav = useNavigate();
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold text-text mb-4">Choose theme</h1>
      <p className="text-muted mb-4">Nova Default is the only theme for now.</p>
      <Card className="mb-4 p-4 border-accent">Nova Default</Card>
      <div className="flex gap-4">
        <Button onClick={() => nav('/onboarding/toggles')}>Next</Button>
        <Button variant="secondary" onClick={() => nav('/onboarding/workspace')}>Back</Button>
      </div>
    </div>
  );
}

function Toggles() {
  const nav = useNavigate();
  const [plugins, setPlugins] = useState(true);
  const [localAI, setLocalAI] = useState(false);
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold text-text mb-4">Optional</h1>
      <p className="text-muted mb-4">Enable plugins and local AI.</p>
      <div className="space-y-4 mb-6">
        <Toggle label="Enable plugins" checked={plugins} onChange={(e) => setPlugins(e.target.checked)} />
        <Toggle label="Enable local AI (Ollama)" checked={localAI} onChange={(e) => setLocalAI(e.target.checked)} />
      </div>
      <div className="flex gap-4">
        <Button onClick={() => nav('/onboarding/finish')}>Next</Button>
        <Button variant="secondary" onClick={() => nav('/onboarding/theme')}>Back</Button>
      </div>
    </div>
  );
}

function Finish() {
  const nav = useNavigate();
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold text-text mb-4">You're all set</h1>
      <p className="text-muted mb-6">Start writing notes.</p>
      <Button onClick={() => nav('/home')}>Finish</Button>
    </div>
  );
}

export default function Onboarding() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="workspace" element={<PickWorkspace />} />
      <Route path="theme" element={<ChooseTheme />} />
      <Route path="toggles" element={<Toggles />} />
      <Route path="finish" element={<Finish />} />
    </Routes>
  );
}
