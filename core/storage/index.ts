/**
 * Temporary storage layer: recents, workspaces, settings.
 * Reads/writes to app data dir (caller provides base path).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

function ensureDir(filePath: string): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    if (!existsSync(filePath)) return fallback;
    const raw = readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(filePath: string, data: unknown): void {
  ensureDir(filePath);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export interface RecentEntry {
  path: string;
  title: string;
  lastOpened: number;
}

export interface WorkspaceEntry {
  id: string;
  path: string;
  name: string;
}

export interface AppSettings {
  theme?: string;
  pluginsEnabled?: boolean;
  localAIEnabled?: boolean;
}

const DEFAULT_RECENTS: RecentEntry[] = [];
const DEFAULT_WORKSPACES: WorkspaceEntry[] = [];
const DEFAULT_SETTINGS: AppSettings = {};

export function getRecents(baseDir: string): RecentEntry[] {
  return readJson(join(baseDir, 'recents.json'), DEFAULT_RECENTS);
}

export function setRecents(baseDir: string, recents: RecentEntry[]): void {
  writeJson(join(baseDir, 'recents.json'), recents);
}

export function getWorkspaces(baseDir: string): WorkspaceEntry[] {
  return readJson(join(baseDir, 'workspaces.json'), DEFAULT_WORKSPACES);
}

export function setWorkspaces(baseDir: string, workspaces: WorkspaceEntry[]): void {
  writeJson(join(baseDir, 'workspaces.json'), workspaces);
}

export function getSettings(baseDir: string): AppSettings {
  return readJson(join(baseDir, 'settings.json'), DEFAULT_SETTINGS);
}

export function setSettings(baseDir: string, settings: AppSettings): void {
  writeJson(join(baseDir, 'settings.json'), settings);
}
