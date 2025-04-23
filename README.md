# PrivatePilot
IDE extension for private coding 


# Compile and Install 

```bash
npm install 
npm run compile 
vsce package
```

Then on your VScode, first select `extension.ts` and then click on `Run -> Start Debugging [F5]` 


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

This is a test 
