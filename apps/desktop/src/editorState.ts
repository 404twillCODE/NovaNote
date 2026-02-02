/**
 * In-app editor state (mirrors core/editor/state for plugin bridge).
 */

let fullText = '';
let selectionStart = 0;
let selectionEnd = 0;

export function getText(): string {
  return fullText;
}

export function setText(text: string): void {
  fullText = text;
}

export function getSelection(): { start: number; end: number; text: string } {
  const start = Math.min(selectionStart, selectionEnd);
  const end = Math.max(selectionStart, selectionEnd);
  const text = fullText.slice(start, end);
  return { start, end, text };
}

export function setSelection(start: number, end: number): void {
  selectionStart = Math.max(0, start);
  selectionEnd = Math.min(fullText.length, end);
}

export function replaceSelection(replacement: string): void {
  const { start, end } = getSelection();
  fullText = fullText.slice(0, start) + replacement + fullText.slice(end);
  setSelection(start, start + replacement.length);
}

export function getSelectionText(): string {
  return getSelection().text;
}
