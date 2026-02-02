/**
 * Ollama connector placeholder.
 * When implemented: GET/POST to http://localhost:11434 (Ollama default).
 */

const OLLAMA_BASE = 'http://localhost:11434';

export async function isRunning(): Promise<boolean> {
  try {
    const r = await fetch(`${OLLAMA_BASE}/api/tags`, { method: 'GET' });
    return r.ok;
  } catch {
    return false;
  }
}

export async function listModels(): Promise<{ name: string }[]> {
  try {
    const r = await fetch(`${OLLAMA_BASE}/api/tags`, { method: 'GET' });
    if (!r.ok) return [];
    const data = (await r.json()) as { models?: { name: string }[] };
    return data.models ?? [];
  } catch {
    return [];
  }
}

export async function generate(prompt: string, model?: string): Promise<string> {
  try {
    const body = { model: model ?? 'llama2', prompt, stream: false };
    const r = await fetch(`${OLLAMA_BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) return '';
    const data = (await r.json()) as { response?: string };
    return data.response ?? '';
  } catch {
    return '';
  }
}
