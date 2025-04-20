// src/extension.ts
import * as vscode from 'vscode';

/**
 * This method is called when the extension is activated
 * @param context - The extension context provided by VSCode
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "private-pilot" is now active!');

  // Register commands for code selection actions
  const improveCodeCommand = vscode.commands.registerCommand('private-pilot.improve', handleImproveCode);
  const explainCodeCommand = vscode.commands.registerCommand('private-pilot.explain', handleExplainCode);
  const fixTyposCommand = vscode.commands.registerCommand('private-pilot.fixTypos', handleFixTypos);
  const writeCommentsCommand = vscode.commands.registerCommand('private-pilot.writeComments', handleWriteComments);
  const automatedReviewCommand = vscode.commands.registerCommand('private-pilot.automatedReview', handleAutomatedReview);

  // Register commands for empty line actions
  const autoCommentCommand = vscode.commands.registerCommand('private-pilot.autoComment', handleAutoComment);
  const createCodeCommand = vscode.commands.registerCommand('private-pilot.createCode', handleCreateCode);
  const askQuestionCommand = vscode.commands.registerCommand('private-pilot.askQuestion', handleAskQuestion);

  // Add all commands to the extension context
  context.subscriptions.push(
    improveCodeCommand,
    explainCodeCommand,
    fixTyposCommand,
    writeCommentsCommand,
    automatedReviewCommand,
    autoCommentCommand,
    createCodeCommand,
    askQuestionCommand
  );
}

/**
 * Gets the selected text from the active editor
 * @returns The selected text or null if no text is selected
 */
function getSelectedText(): string | null {
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
 * Gets the current cursor position from the active editor
 * @returns The cursor position or null if no editor is active
 */
function getCursorPosition(): vscode.Position | null {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return null;
  }

  return editor.selection.active;
}

/**
 * Handler for the "Improve" command
 */
async function handleImproveCode() {
  const selectedText = getSelectedText();
  if (!selectedText) {
    vscode.window.showInformationMessage('No code selected to improve.');
    return;
  }

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage('Improve code functionality triggered');
}

/**
 * Handler for the "Explain this code" command
 */
async function handleExplainCode() {
  const selectedText = getSelectedText();
  if (!selectedText) {
    vscode.window.showInformationMessage('No code selected to explain.');
    return;
  }

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage('Explain code functionality triggered');
}

/**
 * Handler for the "Fix typos and grammar" command
 */
async function handleFixTypos() {
  const selectedText = getSelectedText();
  if (!selectedText) {
    vscode.window.showInformationMessage('No code selected to fix typos.');
    return;
  }

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage('Fix typos functionality triggered');
}

/**
 * Handler for the "Write Comments" command
 */
async function handleWriteComments() {
  const selectedText = getSelectedText();
  if (!selectedText) {
    vscode.window.showInformationMessage('No code selected to write comments for.');
    return;
  }

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage('Write comments functionality triggered');
}

/**
 * Handler for the "Automated Review" command
 */
async function handleAutomatedReview() {
  const selectedText = getSelectedText();
  if (!selectedText) {
    vscode.window.showInformationMessage('No code selected for automated review.');
    return;
  }

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage('Automated review functionality triggered');
}

/**
 * Handler for the "Auto Comment" command
 */
async function handleAutoComment() {
  const cursorPosition = getCursorPosition();
  if (!cursorPosition) {
    vscode.window.showInformationMessage('No cursor position detected.');
    return;
  }

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage('Auto comment functionality triggered');
}

/**
 * Handler for the "Create Code" command
 */
async function handleCreateCode() {
  const cursorPosition = getCursorPosition();
  if (!cursorPosition) {
    vscode.window.showInformationMessage('No cursor position detected.');
    return;
  }

  // This would call the LLM backend in a real implementation  
  vscode.window.showInformationMessage('Create code functionality triggered');
}

/**
 * Handler for the "Ask a question" command
 */
async function handleAskQuestion() {
  const cursorPosition = getCursorPosition();
  if (!cursorPosition) {
    vscode.window.showInformationMessage('No cursor position detected.');
    return;
  }

  // This would prompt the user for a question and then call the LLM backend
  vscode.window.showInputBox({
    prompt: 'What would you like to ask?',
    placeHolder: 'Enter your question here...'
  }).then(question => {
    if (question) {
      // This would call the LLM backend in a real implementation
      vscode.window.showInformationMessage(`Ask question functionality triggered: ${question}`);
    }
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}