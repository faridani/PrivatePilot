# Welcome to Private Pilot

This repository contains a VS Code extension that integrates with the Ollama AI backend to offer code suggestions, automated fixes, commenting, and an interactive chat interface.

## Repository Structure

```
PrivatePilot/
├── docs/                 – Design documents and TODOs
├── media/                – Images used in documentation
├── private-pilot-extension/
│   ├── src/
│   │   ├── extension.ts  – Main extension code
│   │   ├── prompts.ts    – Prompt strings for Ollama
│   │   └── common.ts     – Common functions and constants shared across the extension
│   ├── resources/        – Extension icons
│   ├── package.json      – Extension metadata and commands
│   └── tsconfig.json     – TypeScript configuration
└── README.md             – Project overview and build instructions
```

## Important Points

- **Extension Commands** live in `extension.ts`. These include code improvement, explanation, typo fixing, and more. Some commands currently contain placeholder comments for future Ollama integration.
- **Ollama Communication** happens in `getOllamaText` and `handleOllamaRequest`, which send HTTP requests to the configured endpoint.
- **Prompts** in `prompts.ts` define how requests are phrased for the AI. Any non-code feedback should be wrapped in code comments.
- The `docs/` folder houses the Product Requirements Document and a TODO list describing work in progress.

## What to Explore Next

1. **Understand VS Code Extension Basics** – Review activation events and commands in `package.json`. Study `extension.ts` to see how VS Code APIs are used.
2. **Learn the Ollama Integration** – Examine API request functions and prompts to understand how the extension communicates with the AI backend.
3. **Consult Documentation** – `docs/PRD.MD` and `docs/todo.md` give insight into the current roadmap and features planned.
4. **Experiment** – Follow the root README build instructions (`npm install`, `npm run compile`, `vsce package`) to run the extension in development mode.
5. **Dive into VS Code APIs** – Explore the official VS Code API documentation to deepen your understanding of editors, selections, and webviews.

Private Pilot is a work in progress: only some commands fully integrate with Ollama, while others still contain placeholders. Reviewing these areas offers a clear path for future contributions.
