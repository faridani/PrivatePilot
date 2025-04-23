


Write the code for a VSCode extension called "Private Pilot" for Automated Code developement. below are the information you need and ask me more questions to get clarity on what you are creating
* The language should be TypeScript
* The user should be able to select a code block and right click and in the menu that apprears, there should be an item called "Private Pilot", when the user hovers over the menu item, there should the following items "Improve", "Explain this code", "Fix typos and grammar", "Write Comments", "Automated Review", . Clicking that item should refactor the code through calling an LLM backend 
* When the user right-clicks on an empty line, a menu shoud open that has an item called "Private Pilot", and the submenu should contain these items: "Auto Comment. Create Code. "Ask a question"

For now keep all the actions empty and just write the skeleton of the code 


Adding Ollama 

You are an experienced TypeScript developer. Write the package.json and extenion.ts for a vscode extension that allows me to select a code block, right click, open a menu item that says "re-write" and when I click on that it should send that code with a prompt "improve this code" to an Ollama backend and then replace the text with the text that was received from Ollama. You do not need to create tsconfig, readme and the LICENSE file. 

