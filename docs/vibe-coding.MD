Write the code for a VSCode extension called "Private Pilot" for Automated Code developement. below are the information you need and ask me more questions to get clarity on what you are creating
* The language should be TypeScript
* It should call into a local Ollama instance to run the operations 
* The user should be able to select a code block and right click and in the menu that apprears, there should be an item called "Private Pilot", when the user hovers over the menu item, there should the following items "Improve", "Explain this code", "Fix typos and grammar", "Write Comments", "Automated Review", "Ask a question". Clicking on "Improve" should refactor the code through calling the Llamma model on the Ollama backend. For each menu item please just write the scafolding of the Ollama call and let me provide the prompt for it later in the code, your function should take the response and operate on the response for each menu item. 
* When the user right-clicks on an empty line, a menu shoud open that has an item called "Private Pilot", and the submenu should contain these items: "Auto Comment. "Create Code". "Ask a question"
* Also make an item for "Private Pilot" in the activity bar, when the user clicks on the "Private Pilot" icon it should open a Chat window. Where there is a text box for the user to type her chat text, when the user presses submit, the extension should send the user prompt to the Ollama backend and get the results from the backend and show to the user as a response


Use the following information about the repository in your package.json file:

"name": "private-pilot",
  "displayName": "Private Pilot",
  "description": "Automated code development assistant",
  "version": "0.1.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/faridani/PrivatePilot.git"
  },
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/faridani/PrivatePilot/issues"
  },
  "homepage": "https://github.com/faridani/PrivatePilot",
  "keywords": [
    "vscode",
    "extension",
    "private-pilot",
    "ollama",
    "chatgpt",
    "code-assistant"
  ],

