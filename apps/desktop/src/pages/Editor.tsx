import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Topbar, Sidebar, Button, Toast } from '@novanote/ui';
import * as editorState from '../editorState';
import { createBridge } from '../pluginBridge';

const PLUGIN_GRANTS: Record<string, string[]> = {
  'hello-panel': ['app:info', 'app:toast', 'commands:register', 'ui:panel', 'editor:read'],
};

export default function Editor() {
  const [text, setText] = useState('');
  const [panelPluginId, setPanelPluginId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'error' } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const syncEditorToState = useCallback(() => {
    editorState.setText(text);
  }, [text]);

  useEffect(() => {
    syncEditorToState();
  }, [text, syncEditorToState]);

  const showToast = useCallback((message: string, type?: 'info' | 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const openPanel = useCallback((panelId: string) => setPanelPluginId(panelId), []);
  const closePanel = useCallback(() => setPanelPluginId(null), []);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type !== 'nova-host-call' || !panelPluginId) return;
      const { id, method, payload } = e.data;
      const grantedPermissions = PLUGIN_GRANTS[panelPluginId] ?? [];
      const handleCall = createBridge({
        pluginId: panelPluginId,
        grantedPermissions: grantedPermissions as import('../pluginBridge').Permission[],
        showToast,
        openPanel,
        closePanel,
        appInfo: { name: 'NovaNote', version: '0.0.1' },
      });
      handleCall(method, payload).then((response) => {
        const win = (e.source as Window);
        if (win && iframeRef.current?.contentWindow === win) {
          win.postMessage({ type: 'nova-host-response', id, response }, '*');
        }
      });
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [panelPluginId, showToast, openPanel, closePanel]);

  return (
    <div className="flex h-screen">
      <Sidebar width="200px" className="flex-shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/home" className="text-sm text-muted hover:text-text">← Home</Link>
        </div>
        <div className="p-4 text-sm text-muted">
          Sidebar (files tree later)
        </div>
      </Sidebar>
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar className="justify-between flex-shrink-0">
          <span className="font-semibold text-accent tracking-tight">Editor</span>
          <Link to="/settings">
            <Button variant="ghost" className="text-sm">Settings</Button>
          </Link>
        </Topbar>
        <div className="flex-1 flex min-h-0">
          <div className="flex-1 flex flex-col p-4">
            <textarea
              className="flex-1 w-full bg-bg text-text border border-border rounded-nova-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Start writing..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSelect={(e) => {
                const el = e.target as HTMLTextAreaElement;
                editorState.setSelection(el.selectionStart, el.selectionEnd);
              }}
            />
          </div>
          {/* Placeholder right sidebar slot for plugin panels */}
          <div className="w-64 border-l border-border bg-elevated flex-shrink-0 flex flex-col">
            <div className="p-2 border-b border-border flex justify-between items-center">
              <span className="text-sm text-muted">Plugin panel</span>
              {panelPluginId && (
                <button className="text-xs text-muted hover:text-text transition-colors duration-[var(--nova-motion-fast)]" onClick={closePanel}>Close</button>
              )}
            </div>
            <div className="flex-1 overflow-auto p-2">
              {panelPluginId ? (
                <iframe
                  ref={(el) => { iframeRef.current = el; }}
                  title={`Plugin: ${panelPluginId}`}
                  src={`/plugin-frame.html?plugin=${panelPluginId}`}
                  className="w-full h-full min-h-[200px] border-0 rounded-nova-md bg-panel"
                />
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted">No panel open.</p>
                  <Button variant="secondary" className="text-sm" onClick={() => setPanelPluginId('hello-panel')}>
                    Open Hello Panel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toast message={toast?.message ?? ''} visible={!!toast} type={toast?.type} />
    </div>
  );
}
