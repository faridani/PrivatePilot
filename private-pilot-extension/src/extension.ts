// src/extension.ts
import * as vscode from 'vscode';
import axios from 'axios';
import { improveCode } from './prompts';
import {
  typingDelay,
  getSelectedText,
  getCursorPosition,
  extractCodeFromResponse,
  getFallbackURL,
  FALLBACK_MODEL,
} from './common';

/**
 * This method is called when the extension is activated
 * @param context - The extension context provided by VSCode
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "private-pilot" is now active and it will only show one window !');
  console.log('Code Rewriter extension is now active');
  vscode.window.showInformationMessage('Code Rewriter extension is now active!');

  // Map command keys to their handler functions
  const commandHandlers: { [key: string]: (...args: any[]) => any } = {
    'private-pilot.improve': handleImproveCode,
    'private-pilot.contextualimprove': handleContextualImprove,
    'private-pilot.explain': handleExplainCode,
    'private-pilot.fixTypos': handleFixTypos,
    'private-pilot.writeComments': handleWriteComments,
    'private-pilot.automatedReview': handleAutomatedReview,
    'private-pilot.autoComment': handleAutoComment,
    'private-pilot.createCode': handleCreateCode,
    'private-pilot.askQuestion': handleAskQuestion,
    'private-pilot.rewriteCode': handleOllamaRequest,
  };

  // Register all commands and push to subscriptions
  for (const [command, handler] of Object.entries(commandHandlers)) {
    context.subscriptions.push(vscode.commands.registerCommand(command, handler));
  }
}

/**
 * Handler for the "Improve" command
 */
async function handleImproveCode() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('No active editor found.');
    return;
  }

  const selection = editor.selection;
  if (selection.isEmpty) {
    vscode.window.showInformationMessage('No code selected to improve.');
    return;
  }
  const selectedText = editor.document.getText(selection);

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage(`Improve code functionality triggered:\n${selectedText}`);

  const preprompt = improveCode + selectedText;
  // Simulate deleting and then typing
  const textToType = await getOllamaText(preprompt);

  if (textToType === null) {
    vscode.window.showErrorMessage('Failed to get improved code from Ollama');
    return;
  }

  // Delete the selected text
  await editor.edit((editBuilder: vscode.TextEditorEdit) => {
    editBuilder.delete(selection);
  });

  // Type out the new text character by character at the selection start
  let insertPos = selection.start;
  for (let i = 0; i < textToType.length; i++) {
    await typingDelay(); // Delay for typing effect
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
      editBuilder.insert(insertPos, textToType[i]);
    });

    // Handle position differently for newline characters
    if (textToType[i] === '\n') {
      // Move to beginning of next line
      insertPos = new vscode.Position(insertPos.line + 1, 0);
    } else {
      // Move right by one character on same line
      insertPos = insertPos.translate(0, 1);
    }
  }
  vscode.window.showInformationMessage('Selected text replaced the improved code.');
}

/**
 * Handler for the "Improve" command
 */
async function handleContextualImprove() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('No active editor found.');
    return;
  }

  const selection = editor.selection;
  if (selection.isEmpty) {
    vscode.window.showInformationMessage('No code selected to improve.');
    return;
  }
  const selectedText = editor.document.getText(selection);

  // This would call the LLM backend in a real implementation
  vscode.window.showInformationMessage(`Contextual improve code functionality triggered:\n${selectedText}`);

  const fulltext = editor.document.getText();

  const preprompt = `${improveCode}${selectedText}\n\nthe full context of the file that contains the codeblock is below\n\n${fulltext}`;
  // Simulate deleting and then typing
  const textToType = await getOllamaText(preprompt);

  if (textToType === null) {
    vscode.window.showErrorMessage('Failed to get improved code from Ollama');
    return;
  }

  // Delete the selected text
  await editor.edit((editBuilder: vscode.TextEditorEdit) => {
    editBuilder.delete(selection);
  });

  // Type out the new text character by character at the selection start
  let insertPos = selection.start;
  for (let i = 0; i < textToType.length; i++) {
    await typingDelay(); // Delay for typing effect
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
      editBuilder.insert(insertPos, textToType[i]);
    });

    // Handle position differently for newline characters
    if (textToType[i] === '\n') {
      // Move to beginning of next line
      insertPos = new vscode.Position(insertPos.line + 1, 0);
    } else {
      // Move right by one character on same line
      insertPos = insertPos.translate(0, 1);
    }
  }
  vscode.window.showInformationMessage('Selected text replaced with the contextually aware LLM .');
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
  vscode.window
    .showInputBox({
      prompt: 'What would you like to ask?',
      placeHolder: 'Enter your question here...',
    })
    .then((question: string | undefined) => {
      if (question && question.trim() !== '') {
        // This would call the LLM backend in a real implementation
        vscode.window.showInformationMessage(`Ask question functionality triggered: ${question}`);
      } else {
        vscode.window.showInformationMessage('No question provided.');
      }
    });
}

async function getOllamaText(prompt: string): Promise<string | null> {
  vscode.window.showInformationMessage('Ollama request triggered');
  console.log('getOllamaText request triggered...');

  try {
    const config = vscode.workspace.getConfiguration('codeRewriter');
    const ollamaEndpoint = config.get<string>('ollamaEndpoint') || getFallbackURL('api/generate');
    const ollamaModel = config.get<string>('ollamaModel') || FALLBACK_MODEL;

    const response = await axios.post(
      ollamaEndpoint,
      {
        model: ollamaModel,
        prompt: prompt,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    // Extract the improved code from the response
    if (response.data && response.data.response) {
      const improvedCode = extractCodeFromResponse(response.data.response);
      console.log('Improved code:', improvedCode);

      vscode.window.showInformationMessage('Code successfully returned from Ollama');
      return improvedCode;
    } else {
      vscode.window.showErrorMessage('Invalid response from Ollama');
      return '';
    }
  } catch (error) {
    let errorMessage = 'Failed to rewrite code';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Ollama API error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'Could not connect to Ollama. Make sure Ollama is running.';
      }
    }

    vscode.window.showErrorMessage(errorMessage);
    console.error('Code rewriting error:', error);
    return null;
  }
}
async function handleOllamaRequest(prompt?: string) {
  vscode.window.showInformationMessage('Ollama request triggered');
  console.log('Ollama request triggered...');
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
      vscode.window.showErrorMessage('No code selected');
      return;
    }

    const selectedText = editor.document.getText(selection);
    if (!selectedText) {
      vscode.window.showErrorMessage('Selected text is empty');
      return;
    }

    // Show progress notification
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Rewriting code...',
        cancellable: false,
      },
      async (progress: vscode.Progress<{ message?: string; increment?: number }>) => {
        progress.report({ increment: 0 });

        try {
          const config = vscode.workspace.getConfiguration('codeRewriter');
          const ollamaEndpoint = config.get<string>('ollamaEndpoint') || getFallbackURL('api/generate');
          const ollamaModel = config.get<string>('ollamaModel') || FALLBACK_MODEL;

          const response = await axios.post(
            ollamaEndpoint,
            {
              model: ollamaModel,
              prompt: prompt || `Improve this code:\n\n${selectedText}\n\nImproved code:`,
              stream: false,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          progress.report({ increment: 100 });

          console.log('API response:', response);

          // Extract the improved code from the response
          if (response.data && response.data.response) {
            const improvedCode = extractCodeFromResponse(response.data.response);
            console.log('Selected text:', selectedText);
            console.log('Improved code:', improvedCode);

            // Replace the selected text with the improved code
            await editor.edit((editBuilder: vscode.TextEditorEdit) => {
              editBuilder.replace(selection, improvedCode);
            });

            vscode.window.showInformationMessage('Code successfully rewritten');
          } else {
            vscode.window.showErrorMessage('Invalid response from Ollama');
          }
        } catch (error) {
          let errorMessage = 'Failed to rewrite code';

          if (axios.isAxiosError(error)) {
            if (error.response) {
              errorMessage = `Ollama API error: ${error.response.status} ${error.response.statusText}`;
            } else if (error.request) {
              errorMessage = 'Could not connect to Ollama. Make sure Ollama is running.';
            }
          }

          vscode.window.showErrorMessage(errorMessage);
          console.error('Code rewriting error:', error);
        }
      },
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Unexpected error: ${error}`);
    console.error('Unexpected error:', error);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
