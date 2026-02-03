import { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Toast, IconButton, SlidePanel } from '@novanote/ui';
import * as editorState from '../editorState';
import { createBridge } from '../pluginBridge';

const PLUGIN_GRANTS: Record<string, string[]> = {
  'hello-panel': ['app:info', 'app:toast', 'commands:register', 'ui:panel', 'editor:read'],
};

const TOOLBAR_ACTIONS = [
  { id: 'bold', label: 'Bold', icon: 'B' },
  { id: 'italic', label: 'Italic', icon: 'I' },
  { id: 'list', label: 'List', icon: '•' },
];

export default function Editor() {
  const [title, setTitle] = useState('Untitled');
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
        const win = e.source as Window;
        if (win && iframeRef.current?.contentWindow === win) {
          win.postMessage({ type: 'nova-host-response', id, response }, '*');
        }
      });
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [panelPluginId, showToast, openPanel, closePanel]);

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      {/* Minimal toolbar: note title + actions */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-2 border-b border-border/80 bg-elevated/50">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-text font-medium text-base border-none focus:outline-none focus:ring-0 placeholder:text-muted"
          placeholder="Note title"
        />
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="text-sm text-muted hover:text-text transition-colors duration-[var(--nova-motion-fast)]"
            aria-label="More actions"
          >
            ⋮
          </button>
        </div>
      </div>

      {/* Formatting toolbar */}
      <div className="flex-shrink-0 flex items-center gap-1 px-4 py-1.5 border-b border-border/60">
        {TOOLBAR_ACTIONS.map((a) => (
          <IconButton key={a.id} aria-label={a.label}>
            <span className="text-sm font-semibold">{a.icon}</span>
          </IconButton>
        ))}
      </div>

      {/* Editor + plugin panel */}
      <div className="relative flex flex-1 min-h-0">
        <div className="flex-1 min-w-0 flex flex-col p-4">
          <textarea
            className="flex-1 w-full bg-transparent text-text border-none rounded-nova-md p-2 resize-none focus:outline-none focus:ring-0 placeholder:text-muted text-base leading-relaxed"
            placeholder="Start writing..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSelect={(e) => {
              const el = e.target as HTMLTextAreaElement;
              editorState.setSelection(el.selectionStart, el.selectionEnd);
            }}
          />
        </div>

        <SlidePanel open={!!panelPluginId} from="right" className="absolute right-0 top-0 bottom-0 w-64 flex flex-col border-l border-border/80 bg-elevated/90 backdrop-blur-[var(--nova-blur-panelBlur)] shadow-nova-md z-10">
          <div className="flex-shrink-0 p-2 border-b border-border/80 flex justify-between items-center">
            <span className="text-sm text-muted">Plugin panel</span>
            {panelPluginId && (
              <button
                type="button"
                className="text-xs text-muted hover:text-text transition-colors duration-[var(--nova-motion-fast)]"
                onClick={closePanel}
              >
                Close
              </button>
            )}
          </div>
          <div className="flex-1 overflow-auto p-2 min-h-0">
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
        </SlidePanel>
      </div>

      <Toast message={toast?.message ?? ''} visible={!!toast} type={toast?.type} />
    </div>
  );
}
