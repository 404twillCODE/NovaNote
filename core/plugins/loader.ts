import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { PluginManifest, InstalledPlugin } from './types';

const MANIFEST_FILE = 'plugin.json';
const ENTRY_FILE = 'dist/index.html';

export function loadInstalledRegistry(registryPath: string): InstalledPlugin[] {
  try {
    const data = readFileSync(registryPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveInstalledRegistry(registryPath: string, plugins: InstalledPlugin[]): void {
  const { writeFileSync, mkdirSync } = require('fs');
  const { dirname } = require('path');
  const dir = dirname(registryPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(registryPath, JSON.stringify(plugins, null, 2));
}

export function scanPluginsDir(pluginsDir: string): PluginManifest[] {
  const manifests: PluginManifest[] = [];
  if (!existsSync(pluginsDir)) return manifests;

  const entries = readdirSync(pluginsDir, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const pluginPath = join(pluginsDir, ent.name);
    const manifestPath = join(pluginPath, MANIFEST_FILE);
    const entryPath = join(pluginPath, ENTRY_FILE);
    if (!existsSync(manifestPath) || !existsSync(entryPath)) continue;

    try {
      const raw = readFileSync(manifestPath, 'utf8');
      const manifest = JSON.parse(raw) as PluginManifest;
      if (
        typeof manifest.schemaVersion !== 'number' ||
        !manifest.id ||
        !manifest.entry ||
        !Array.isArray(manifest.permissions)
      ) {
        continue;
      }
      manifests.push(manifest);
    } catch {
      // skip invalid plugin
    }
  }
  return manifests;
}

export function validateManifest(manifest: PluginManifest): boolean {
  return (
    manifest.schemaVersion === 1 &&
    typeof manifest.id === 'string' &&
    manifest.id.length > 0 &&
    typeof manifest.entry === 'string' &&
    Array.isArray(manifest.permissions)
  );
}

export function computeNeedsPermission(
  installed: InstalledPlugin,
  manifest: PluginManifest
): boolean {
  if (!installed.enabled) return false;
  for (const p of manifest.permissions) {
    if (!installed.grantedPermissions.includes(p)) return true;
  }
  return false;
}
