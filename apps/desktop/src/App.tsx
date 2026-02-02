import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Routes>
        <Route path="/onboarding/*" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
