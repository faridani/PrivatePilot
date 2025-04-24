@echo off
call npm install
call npm run compile
call vsce package
echo All commands executed successfully!