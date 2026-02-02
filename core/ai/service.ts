/**
 * Stub AI service – can be toggled in settings.
 * When enabled, the app may call the Ollama connector.
 */

let enabled = false;

export function isAIEnabled(): boolean {
  return enabled;
}

export function setAIEnabled(value: boolean): void {
  enabled = value;
}
