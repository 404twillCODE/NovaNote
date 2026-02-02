export interface PluginManifest {
  schemaVersion: number;
  id: string;
  name: string;
  version: string;
  entry: string;
  permissions: string[];
}

export interface InstalledPlugin {
  id: string;
  enabled: boolean;
  grantedPermissions: string[];
  needsPermission?: boolean;
  path: string;
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
