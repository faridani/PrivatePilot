import axios from 'axios';
import * as vscode from 'vscode';
import { extractCodeFromResponse, getFallbackURL, FALLBACK_MODEL } from './common';

export interface ModelProvider {
  generate(prompt: string): Promise<string>;
}

export class OllamaProvider implements ModelProvider {
  constructor(private endpoint: string, private model: string) {}

  async generate(prompt: string): Promise<string> {
    const response = await axios.post(
      this.endpoint,
      { model: this.model, prompt, stream: false },
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (response.data && response.data.response) {
      return extractCodeFromResponse(response.data.response);
    }
    throw new Error('Invalid response from Ollama');
  }
}

export class OpenAIProvider implements ModelProvider {
  constructor(
    private apiKey: string,
    private model: string,
    private endpoint: string = 'https://api.openai.com/v1/chat/completions',
  ) {}

  async generate(prompt: string): Promise<string> {
    const response = await axios.post(
      this.endpoint,
      {
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    if (response.data?.choices?.length) {
      const content = response.data.choices[0].message.content;
      return extractCodeFromResponse(content);
    }
    throw new Error('Invalid response from OpenAI');
  }
}

export class GrokProvider implements ModelProvider {
  constructor(
    private endpoint: string,
    private apiKey: string,
    private model: string,
  ) {}

  async generate(prompt: string): Promise<string> {
    const response = await axios.post(
      this.endpoint,
      { model: this.model, prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    if (response.data && response.data.response) {
      return extractCodeFromResponse(response.data.response);
    }
    throw new Error('Invalid response from Grok');
  }
}

export class ClaudeProvider implements ModelProvider {
  constructor(
    private endpoint: string,
    private apiKey: string,
    private model: string,
  ) {}

  async generate(prompt: string): Promise<string> {
    const response = await axios.post(
      this.endpoint,
      { model: this.model, prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    if (response.data && (response.data.completion || response.data.response)) {
      const content = response.data.completion ?? response.data.response;
      return extractCodeFromResponse(content);
    }
    throw new Error('Invalid response from Claude');
  }
}

export function getModelProvider(): ModelProvider {
  const config = vscode.workspace.getConfiguration('codeRewriter');
  const provider = (config.get<string>('provider') || 'ollama').toLowerCase();

  switch (provider) {
    case 'openai':
      return new OpenAIProvider(
        config.get<string>('openaiApiKey') || '',
        config.get<string>('openaiModel') || 'gpt-3.5-turbo',
        config.get<string>('openaiEndpoint') || 'https://api.openai.com/v1/chat/completions',
      );
    case 'grok':
      return new GrokProvider(
        config.get<string>('grokEndpoint') || '',
        config.get<string>('grokApiKey') || '',
        config.get<string>('grokModel') || 'latest',
      );
    case 'claude':
      return new ClaudeProvider(
        config.get<string>('claudeEndpoint') || '',
        config.get<string>('claudeApiKey') || '',
        config.get<string>('claudeModel') || 'claude-3-opus-20240229',
      );
    case 'ollama':
    default:
      return new OllamaProvider(
        config.get<string>('ollamaEndpoint') || getFallbackURL('api/generate'),
        config.get<string>('ollamaModel') || FALLBACK_MODEL,
      );
  }
}
