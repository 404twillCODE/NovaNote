/**
 * Plugin host bridge for desktop app (JS layer). Dispatches to allowed methods and enforces permissions.
 */

import * as editorState from './editorState';

export interface HostResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export type Permission =
  | 'app:info'
  | 'app:toast'
  | 'commands:register'
  | 'ui:panel'
  | 'editor:read'
  | 'editor:write'
  | 'settings:read'
  | 'settings:write'
  | 'network:localhost';

export interface BridgeDeps {
  pluginId: string;
  grantedPermissions: Permission[];
  showToast: (message: string, type?: 'info' | 'success' | 'error') => void;
  openPanel: (panelId: string) => void;
  closePanel: (panelId: string) => void;
  appInfo: { name: string; version: string };
}

const pluginSettingsStore = new Map<string, Map<string, unknown>>();

function getPluginStore(pluginId: string): Map<string, unknown> {
  if (!pluginSettingsStore.has(pluginId)) {
    pluginSettingsStore.set(pluginId, new Map());
  }
  return pluginSettingsStore.get(pluginId)!;
}

export const registeredCommands = new Map<string, () => void | Promise<void>>();

export function createBridge(deps: BridgeDeps) {
  const { pluginId, grantedPermissions, showToast, openPanel, closePanel, appInfo } = deps;

  function hasPermission(perm: string): boolean {
    return grantedPermissions.includes(perm as Permission);
  }

  return async function handleCall(method: string, payload: unknown): Promise<HostResponse<unknown>> {
    try {
      switch (method) {
        case 'app.getInfo':
          if (!hasPermission('app:info')) return { ok: false, error: 'Permission denied' };
          return { ok: true, data: appInfo };

        case 'app.showToast':
          if (!hasPermission('app:toast')) return { ok: false, error: 'Permission denied' };
          const t = payload as { message: string; type?: 'info' | 'success' | 'error' };
          showToast(t.message, t.type);
          return { ok: true };

        case 'commands.register':
          if (!hasPermission('commands:register')) return { ok: false, error: 'Permission denied' };
          const cmd = payload as { id: string; label: string; handler?: () => void | Promise<void> };
          registeredCommands.set(cmd.id, cmd.handler ?? (() => {}));
          return { ok: true };

        case 'ui.openPanel':
          if (!hasPermission('ui:panel')) return { ok: false, error: 'Permission denied' };
          const op = payload as { panelId: string };
          openPanel(op.panelId);
          return { ok: true };

        case 'ui.closePanel':
          if (!hasPermission('ui:panel')) return { ok: false, error: 'Permission denied' };
          const cp = payload as { panelId: string };
          closePanel(cp.panelId);
          return { ok: true };

        case 'editor.getDocumentText':
          if (!hasPermission('editor:read')) return { ok: false, error: 'Permission denied' };
          return { ok: true, data: editorState.getText() };

        case 'editor.getSelectionText':
          if (!hasPermission('editor:read')) return { ok: false, error: 'Permission denied' };
          return { ok: true, data: editorState.getSelectionText() };

        case 'editor.replaceSelectionText':
          if (!hasPermission('editor:write')) return { ok: false, error: 'Permission denied' };
          const rep = payload as { text: string };
          editorState.replaceSelection(rep.text);
          return { ok: true };

        case 'settings.get':
          if (!hasPermission('settings:read')) return { ok: false, error: 'Permission denied' };
          const sg = payload as { key: string };
          const store = getPluginStore(pluginId);
          return { ok: true, data: store.get(sg.key) };

        case 'settings.set':
          if (!hasPermission('settings:write')) return { ok: false, error: 'Permission denied' };
          const ss = payload as { key: string; value: unknown };
          getPluginStore(pluginId).set(ss.key, ss.value);
          return { ok: true };

        case 'network.fetch':
          if (!hasPermission('network:localhost')) return { ok: false, error: 'Permission denied' };
          const nf = payload as { url: string; options?: RequestInit };
          try {
            const url = new URL(nf.url);
            if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
              return { ok: false, error: 'Only localhost is allowed' };
            }
            const res = await fetch(nf.url, nf.options);
            return { ok: true, data: res };
          } catch (e) {
            return { ok: false, error: String(e) };
          }

        default:
          return { ok: false, error: `Unknown method: ${method}` };
      }
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  };
}
