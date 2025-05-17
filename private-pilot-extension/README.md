# Private Pilot VSCode Extension

## Overview
**Private Pilot** is a powerful VSCode extension designed to enhance developer productivity by integrating AI-driven assistance directly within the Visual Studio Code IDE. It can communicate with multiple large language model providers—including Ollama, OpenAI, Grok, and Claude—to deliver real-time code suggestions, automated bug fixes, intelligent code commenting, and an interactive chat interface to streamline your coding workflow.

**Version:** 0.3.0

## Features
- **Interactive Chat Interface**: Engage with the AI through a dedicated webview panel in VSCode, featuring a user-friendly text input and scrollable chat history.
- **Context-Aware Code Suggestions**: Receive tailored code recommendations based on your project's context and coding style.
- **Error Diagnosis & Fixes**: Automatically detect and suggest solutions for runtime and compile-time errors to improve code quality.
- **AI-Powered Code Templates**: Generate customizable code templates for common programming patterns.
- **Enhanced Code Commenting**: Automatically create detailed comments and documentation for functions, methods, and classes with configurable verbosity.
- **Project Management Integration**: Seamlessly connect with tools like Jira, GitHub Issues, and Trello to create and update tickets directly from your code.

## Installation
1. Open VSCode.
2. Navigate to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
3. Search for **Private Pilot**.
4. Click **Install** to add the extension.

Alternatively, install via the [VSCode Marketplace](https://marketplace.visualstudio.com/).

## Usage
1. **Activate the Extension**:
   - Locate the **Private Pilot** icon in the VSCode Activity Bar.
   - Click the icon to open the chat interface in a webview panel.
2. **Interact with the AI**:
   - Type your query in the text input box.
   - Press **Enter** or click the **Send** button to submit.
   - View the AI's response in the chat display area (user queries in blue, AI responses in green).
3. **Leverage AI Features**:
   - Get real-time code suggestions as you type.
   - Request automated bug fixes or code templates via the chat interface.
   - Generate comments or documentation by selecting code and using context-aware prompts.

## Configuration
- **Model Provider**: Choose between `ollama`, `openai`, `grok`, or `claude` in the extension settings. Each provider has its own endpoint and API key fields.
- **Verbosity Levels**: Customize the level of detail for AI-generated comments in the extension settings.
- **Project Management Tools**: Link your Jira, GitHub, or Trello accounts in the settings for seamless integration.

## Requirements
- **VSCode**: Version 1.60.0 or later
- **Node.js**: Required for development and building the extension
- **TypeScript**: Used for development
- **LLM Backend**: Ensure your chosen provider (Ollama, OpenAI, Grok, or Claude) is reachable. Some providers require an API key.

## Development
To contribute or customize the extension:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/private-pilot-vscode.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run compile
   ```
4. Run in development mode:
   - Open the project in VSCode.
   - Press `F5` to launch the extension in a new VSCode window.

### Project Structure
- `package.json`: Defines extension metadata, commands, and activation events.
- `tsconfig.json`: Configures TypeScript with CommonJS modules, ES2020 target, and source maps.
- `src/`: Contains the extension source code.

## Testing
- **Unit Tests**: Verify backend integration with mocked HTTP responses.
- **Integration Tests**: Validate VSCode and webview functionality.
- **End-to-End Tests**: Simulate full user interactions with the AI.

Run tests with:
```bash
npm run test
```

## Security
- **Secure Communication**: Uses HTTPS for Ollama backend requests (if supported).
- **Input Validation**: Prevents injection attacks and ensures safe query handling.
- **Error Handling**: Displays user-friendly messages for backend issues or invalid inputs.

## Troubleshooting
- **Backend Unreachable**: Ensure the Ollama backend is running and the endpoint is correctly configured.
- **No Response**: Check for empty or malformed queries and verify network connectivity.
- **Slow Responses**: Adjust the timeout settings or optimize the backend service.

## Feedback & Support
- **Issues**: Report bugs or suggest features on the [GitHub Issues page](https://github.com/your-repo/private-pilot-vscode/issues).
- **Feedback**: Share your experience via the [VSCode Marketplace reviews](https://marketplace.visualstudio.com/) or our community forum.
- **Contact**: Reach out to the development team at support@privatepilot.dev.

## Roadmap
- Enhanced AI model support for more accurate suggestions.
- Additional integrations with version control systems.
- Expanded template library for niche programming frameworks.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Built with the [VSCode Extension API](https://code.visualstudio.com/api).
- Powered by [Ollama](https://ollama.ai/) for AI capabilities.
- Special thanks to our contributors and early adopters!
