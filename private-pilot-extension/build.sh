#!/bin/bash

command -v npm >/dev/null 2>&1 || { echo "npm is not installed. Aborting."; exit 1; }

npm install
npm run compile
npx vsce package

echo "All commands executed successfully!"
