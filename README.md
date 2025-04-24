# PrivatePilot
IDE extension for private coding 

**Private Pilot** is a powerful VSCode extension designed to enhance developer productivity by integrating AI-driven assistance directly within the Visual Studio Code IDE. Leveraging the Ollama AI backend, Private Pilot provides real-time code suggestions, automated bug fixes, intelligent code commenting, and an interactive chat interface to streamline your coding workflow.


<img src="media/privatepilot2.png" alt="Private Pilot Logo" width="200" height="200" />



# Compile and Install 

```bash
npm install 
npm run compile 
vsce package
```
On Windows machines you can simply run `build.bat` and on Mac/Linux you can just put the above commands in a shell file 

Then on your VScode, first select `extension.ts` and then click on `Run -> Start Debugging [F5]` 

On windows machine
or 

```bash
npm install
npm run compile
// install if you don't have VSCODE CLI 
npm install -g @vscode/vsce
``` 

If you're just testing this extension locally and don't plan to publish it, you can also use the --no-yarn and --no-git-tag-version flags to skip some validation:

```
vsce package --no-yarn --no-git-tag-version
OR Otherwise 
vsce package
```

Once the packaging is successful, you'll have a .vsix file that you can install in VSCode using the methods I described earlier:

From VSCode: Extensions view → ... menu → Install from VSIX
From command line: code --install-extension private-pilot-0.1.0.vsix


you'll have a .vsix file that you can install in VSCode using the methods I described earlier:

