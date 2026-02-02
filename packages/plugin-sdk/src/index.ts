/**
 * NovaNote Plugin SDK – typed host bridge for plugins.
 * Plugins use host.call(method, payload) and host.on(event, cb).
 */

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

export interface HostResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface CommandDefinition {
  id: string;
  label: string;
  handler?: () => void | Promise<void>;
}

export interface PanelDefinition {
  id: string;
  title: string;
  url?: string;
}

export interface HostCallMap {
  'app.getInfo': { payload: void; result: { name: string; version: string } };
  'app.showToast': { payload: { message: string; type?: 'info' | 'success' | 'error' }; result: void };
  'commands.register': { payload: CommandDefinition; result: void };
  'ui.openPanel': { payload: { panelId: string }; result: void };
  'ui.closePanel': { payload: { panelId: string }; result: void };
  'editor.getDocumentText': { payload: void; result: string };
  'editor.getSelectionText': { payload: void; result: string };
  'editor.replaceSelectionText': { payload: { text: string }; result: void };
  'settings.get': { payload: { key: string }; result: unknown };
  'settings.set': { payload: { key: string; value: unknown }; result: void };
  'network.fetch': { payload: { url: string; options?: RequestInit }; result: Response };
}

export type HostEvent = 'panelOpened' | 'panelClosed' | 'documentChanged';

export interface EditorHost {
  call<K extends keyof HostCallMap>(
    method: K,
    payload: HostCallMap[K]['payload']
  ): Promise<HostResponse<HostCallMap[K]['result']>>;
  on(event: HostEvent, callback: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    EditorHost?: EditorHost;
  }
}

export function createHostBridge(
  call: EditorHost['call'],
  on: EditorHost['on']
): EditorHost {
  return { call, on };
}
