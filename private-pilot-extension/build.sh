#!/bin/bash

if [ -n "$1" ] && [ "$1" != "install" ]; then
    echo "Invalid argument: $1"
    echo "Usage: $0 [install]"
    exit 1
fi

rm -rf *.vsix
command -v npm >/dev/null 2>&1 || { echo "npm is not installed. Aborting."; exit 1; }

npm install
npm run compile
npx vsce package

echo "All commands executed successfully!"


if [ "$1" == "install" ]; then
    VSIX_FILE=$(ls *.vsix | head -n 1)
    if [ -f "$VSIX_FILE" ]; then
        code --install-extension "$VSIX_FILE"
    else
        echo "No VSIX file found to install."
        exit 1
    fi
fi