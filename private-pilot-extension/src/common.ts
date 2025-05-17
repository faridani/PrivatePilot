import * as vscode from 'vscode';

// =======================
// Private Constants
// =======================
const TYPING_DELAY = 5; // Delay in milliseconds for typing effect
const FALLBACK_API_URL = 'http://localhost:11434/';

// =======================
// Exported Constants
// =======================
export const FALLBACK_MODEL = 'llama2';

// =======================
// Exported Functions
// =======================
export function getFallbackURL(path: string): string {
  return new URL(path, FALLBACK_API_URL).toString();
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param ms Number of milliseconds to delay.
 * @returns Promise that resolves after the delay.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates a typing effect by delaying execution.
 * @returns Promise that resolves after the typing delay.
 */
export async function typingDelay() {
  await delay(TYPING_DELAY);
}

/**
 * Gets the selected text from the active editor.
 * @returns The selected text or null if no text is selected.
 */
export function getSelectedText(): string | null {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return null;
  }
  const selection = editor.selection;
  if (selection.isEmpty) {
    return null;
  }
  return editor.document.getText(selection);
}

/**
 * Gets the current cursor position from the active editor.
 * @returns The cursor position or null if no editor is active.
 */
export function getCursorPosition(): vscode.Position | null {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return null;
  }
  return editor.selection.active;
}

/**
 * Extracts code from a markdown-formatted code block in a string response.
 * @param response The response string potentially containing a code block.
 * @returns The extracted code or the trimmed response.
 */
export function extractCodeFromResponse(response: string): string {
  const codeBlockMatch = response.match(/```(?:\w+)?\n([\s\S]+?)\n```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  return response.trim();
}
